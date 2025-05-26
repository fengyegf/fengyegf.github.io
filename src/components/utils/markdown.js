/**
 * 处理 Markdown 自定义块
 * 支持 Diff 图像对比块和 Alert 提示块
 */

/**
 * 处理 Diff 类型的图像对比块
 * @param {string} html - 原始 HTML 内容
 * @returns {string} - 处理后的 HTML
 */
export const processDiffBlocks = (html) => {
  const diffBlockRegex =
    /:::Diff(?:{([^}]*)})?(?:{([^}]*)})?(?:{([^}]*)})?[\r\n]?([\s\S]*?):::/gi;

  return html.replace(
    diffBlockRegex,
    (match, variant1, variant2, variant3, content) => {
      // 解析内容，提取两个图片地址
      const parts = content.split("vs").map((part) => part.trim());

      if (parts.length !== 2) {
        return `<div class="alert alert-error">Diff格式错误: 需要使用 "vs" 分隔两个图片地址</div>`;
      }

      // 处理每个部分，提取URL和描述
      const extractImageInfo = (part) => {
        // 尝试匹配 Markdown 图像语法 ![alt](url)
        const mdImageRegex = /!\[(.*?)\]\(([^)]+)\)/;
        const mdMatch = part.match(mdImageRegex);

        // 尝试匹配 HTML img 标签
        const htmlImageRegex = /<img.*?src=["'](.*?)["'].*?>/i;
        const htmlMatch = part.match(htmlImageRegex);

        // 尝试匹配直接 URL (以 http:// 或 https:// 开头)
        const urlRegex = /(https?:\/\/[^\s"']+)/i;
        const urlMatch = part.match(urlRegex);

        if (mdMatch) {
          return {
            url: mdMatch[2].trim(),
            alt: mdMatch[1].trim() || "对比图",
          };
        } else if (htmlMatch) {
          return {
            url: htmlMatch[1],
            alt: "对比图",
          };
        } else if (urlMatch) {
          return {
            url: urlMatch[0],
            alt: "对比图",
          };
        } else {
          console.warn("无法识别图像格式:", part);
          return {
            url: "#",
            alt: "图像无效",
          };
        }
      };

      const image1 = extractImageInfo(parts[0]);
      const image2 = extractImageInfo(parts[1]);

      // 处理可选的样式参数
      let aspectRatio = "16/9"; // 默认比例

      if (variant1 && variant1.includes("aspect-")) {
        aspectRatio = variant1.replace("aspect-", "");
      } else if (variant2 && variant2.includes("aspect-")) {
        aspectRatio = variant2.replace("aspect-", "");
      } else if (variant3 && variant3.includes("aspect-")) {
        aspectRatio = variant3.replace("aspect-", "");
      }

      // 生成图像对比组件的HTML
      return `<figure class="diff aspect-${aspectRatio} rounded-lg overflow-hidden" tabindex="0">
        <div class="diff-item-1" role="img">
          <img alt="${image1.alt}" src="${image1.url}" />
        </div>
        <div class="diff-item-2" role="img" tabindex="0">
          <img alt="${image2.alt}" src="${image2.url}" />
        </div>
        <div class="diff-resizer"></div>
      </figure>`;
    }
  );
};

/**
 * 处理 Alert 类型的自定义块
 * @param {string} html - 原始 HTML 内容
 * @returns {string} - 处理后的 HTML
 */
export const processAlertBlocks = (html) => {
  const alertBlockRegex =
    /:::(info|warning|success|error)(?:{([^}]*)})?(?:{([^}]*)})?(?:{([^}]*)})?[\r\n]?([\s\S]*?):::/gi;

  return html.replace(
    alertBlockRegex,
    (match, type, variant1, variant2, variant3, content) => {
      // 转换类型为小写并标准化
      let blockType = type.toLowerCase();

      // 将类型映射到 DaisyUI 的 alert 类型
      const typeMap = {
        info: "info",
        warning: "warning",
        success: "success",
        error: "error",
      };

      const daisyType = typeMap[blockType] || "info"; // 默认使用info类型

      // 处理内容 - 保留HTML标记以支持更丰富的格式
      const cleanContent = content.trim();

      // 处理样式变体 (soft, outline, dash)
      let styleVariant = "";
      if ([variant1, variant2, variant3].includes("soft")) {
        styleVariant = " alert-soft";
      } else if ([variant1, variant2, variant3].includes("outline")) {
        styleVariant = " alert-outline";
      } else if ([variant1, variant2, variant3].includes("dash")) {
        styleVariant = " alert-dash";
      }

      // 处理是否显示图标
      const noIcon = [variant1, variant2, variant3].includes("noicon");

      // 根据不同类型选择不同的SVG图标
      let svgIcon = "";

      // 根据官方示例调整 SVG 类名
      let strokeClass = "";
      if (daisyType === "info") {
        strokeClass = "stroke-current"; // 默认 alert-info 用 stroke-current
      } else if (daisyType === "success") {
        strokeClass = "stroke-current"; // 默认 alert-success 用 stroke-current
      } else if (daisyType === "warning") {
        strokeClass = "stroke-current"; // 默认 alert-warning 用 stroke-current
      } else if (daisyType === "error") {
        strokeClass = "stroke-current"; // 默认 alert-error 用 stroke-current
      }

      if (!noIcon) {
        switch (daisyType) {
          case "info":
            svgIcon =
              '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>';
            break;
          case "warning":
            svgIcon =
              '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>';
            break;
          case "success":
            svgIcon =
              '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>';
            break;
          case "error":
            svgIcon =
              '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>';
            break;
        }
      }

      // 完全按照官方示例生成 Alert 组件 HTML
      return `<div role="alert" class="alert alert-${daisyType}${styleVariant}">
      ${
        !noIcon
          ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="${strokeClass} h-6 w-6 shrink-0">
        ${svgIcon}
      </svg>`
          : ""
      }
      <span>${cleanContent}</span>
    </div>`;
    }
  );
};

/**
 * 处理 Accordion 折叠面板
 * @param {string} html - 原始 HTML 内容
 * @returns {string} - 处理后的 HTML
 */
export const processAccordionBlocks = (html) => {
  // 使用正则表达式匹配 Accordion 块语法
  // 格式为 :::Accordion{标题}内容:::
  const accordionBlockRegex =
    /:::Accordion(?:{([^}]*)})?(?:{([^}]*)})?[\r\n]?([\s\S]*?):::/gi;

  // 为整组手风琴面板生成一个共享的ID
  const accordionGroupId = `accordion-group-${Math.random()
    .toString(36)
    .substring(2, 8)}`;

  // 跟踪当前文档中的手风琴索引
  let accordionIndex = 0;

  return html.replace(accordionBlockRegex, (match, title, variant, content) => {
    accordionIndex++;

    // 默认标题
    const accordionTitle = title || "点击展开";

    // 处理内容
    const cleanContent = content.trim();

    // 检查是否是默认展开
    const isDefaultOpen = variant === "open" || false;

    // 生成手风琴组件的 HTML，使用共享的name属性
    return `<div class="collapse bg-base-100 border border-base-300 my-3 rounded-lg">
      <input type="radio" name="${accordionGroupId}" ${
      isDefaultOpen && accordionIndex === 1 ? 'checked="checked"' : ""
    } />
      <div class="collapse-title font-semibold">${accordionTitle}</div>
      <div class="collapse-content text-sm">${cleanContent}</div>
    </div>`;
  });
};

/**
 * 处理图像，添加样式如圆角、阴影等
 * @param {string} html - 原始 HTML 内容
 * @returns {string} - 处理后的 HTML
 */
export const processImages = (html) => {
  // 匹配所有<img>标签
  const imgRegex = /<img(.*?)>/gi;

  return html.replace(imgRegex, (match, attributes) => {
    // 检查是否已经有类名
    const hasClass = attributes.includes('class="');

    // 检查是否包含特殊属性来确定样式
    const isRounded = attributes.includes("data-rounded");
    const hasShadow = attributes.includes("data-shadow");
    const isBordered = attributes.includes("data-border");
    const isCircle = attributes.includes("data-circle");

    // 根据属性构建样式类
    let classes = [];

    // 默认添加圆角
    classes.push("rounded-lg");

    // 添加条件样式
    if (isRounded) classes.push("rounded-xl");
    if (isCircle) classes.push("rounded-full");
    if (hasShadow) classes.push("shadow-lg");
    if (isBordered) classes.push("border border-base-300");

    // 如果已经有class属性，追加新类，否则创建class属性
    if (hasClass) {
      return match.replace(/class="([^"]*)"/, (m, cls) => {
        return `class="${cls} ${classes.join(" ")}"`;
      });
    } else {
      return match.replace("<img", `<img class="${classes.join(" ")}"`);
    }
  });
};

/**
 * 处理响应式图像容器
 * @param {string} html - 原始 HTML 内容
 * @returns {string} - 处理后的 HTML
 */
export const processImageContainers = (html) => {
  // 将独立的图像包装在响应式容器中
  const paragraphWithImageRegex = /<p>(<img[^>]*>)<\/p>/gi;

  return html.replace(paragraphWithImageRegex, (match, imgTag) => {
    return `<div class="my-4 flex justify-center">${imgTag}</div>`;
  });
};

/**
 * 处理 Expandable Gallery 可展开图片画廊
 * @param {string} html - 原始 HTML 内容
 * @returns {string} - 处理后的 HTML
 */
export const processExpandableGallery = (html) => {
  // 匹配 Gallery 块语法
  // 格式为 :::Gallery{height}{direction}内容:::
  const galleryBlockRegex =
    /:::Gallery(?:{([^}]*)})?(?:{([^}]*)})?(?:{([^}]*)})?[\r\n]?([\s\S]*?):::/gi;

  return html.replace(
    galleryBlockRegex,
    (match, variant1, variant2, variant3, content) => {
      // 解析内容，提取图片信息
      const imageRegex =
        /!\[(.*?)\]\(([^)]+)\)|<img.*?src=["'](.*?)["'].*?>|(https?:\/\/[^\s"']+\.(jpg|jpeg|png|gif|webp|svg))/gi;
      const images = [];
      let imageMatch;

      while ((imageMatch = imageRegex.exec(content)) !== null) {
        if (imageMatch[1] !== undefined && imageMatch[2] !== undefined) {
          // Markdown 格式 ![alt](url)
          images.push({
            url: imageMatch[2].trim(),
            alt: imageMatch[1].trim() || "画廊图片",
          });
        } else if (imageMatch[3] !== undefined) {
          // HTML img 标签
          images.push({
            url: imageMatch[3].trim(),
            alt: "画廊图片",
          });
        } else if (imageMatch[0].includes("http")) {
          // 直接URL
          images.push({
            url: imageMatch[0].trim(),
            alt: "画廊图片",
          });
        }
      }

      if (images.length === 0) {
        return `<div class="alert alert-error">Gallery格式错误: 未找到有效的图片</div>`;
      }

      // 处理可选参数
      let height = "400px"; // 默认高度
      let direction = "horizontal"; // 默认方向 (horizontal/vertical)

      // 检查高度参数
      [variant1, variant2, variant3].forEach((variant) => {
        if (variant && variant.includes("h-")) {
          height = variant.replace("h-", "") + "px";
        } else if (variant && variant.includes("height-")) {
          height = variant.replace("height-", "") + "px";
        }
      });

      // 检查方向参数
      if ([variant1, variant2, variant3].includes("vertical")) {
        direction = "vertical";
      }

      // 生成唯一ID
      const galleryId = `gallery-${Math.random().toString(36).substring(2, 8)}`;

      // 生成图片项目HTML
      const imageItems = images
        .map((image, index) => {
          return `<div class="gallery-item" data-index="${index}">
          <img src="${image.url}" alt="${image.alt}" loading="lazy" />
        </div>`;
        })
        .join("");

      // 根据方向生成不同的CSS样式
      const flexDirection = direction === "vertical" ? "flex-col" : "flex-row";

      // 生成Gallery组件的HTML和内联样式
      return `<div class="expandable-gallery ${flexDirection}" id="${galleryId}" style="height: ${height};">
        ${imageItems}
        <style>
          #${galleryId} {
            display: flex;
            gap: 2px;
            border-radius: 12px;
            overflow: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            min-height: ${height};
            max-height: ${height};
            padding: 0; /* 确保容器没有内边距 */
            margin: 0;
          }
          
          #${galleryId} .gallery-item {
            flex: 1;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
            position: relative;
          }
          
          #${galleryId} .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            margin: 0;
            padding: 0;
            vertical-align: top;
            transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
          }
          
          #${galleryId} .gallery-item:first-child img {
            border-top-left-radius: 12px;
            border-bottom-left-radius: 12px;
          }
          
          #${galleryId} .gallery-item:last-child img {
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px;
          }
          
          #${galleryId}.flex-col .gallery-item:first-child img {
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            border-bottom-left-radius: 0;
          }
          
          #${galleryId}.flex-col .gallery-item:last-child img {
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            border-top-right-radius: 0;
          }
          
          ${
            direction === "horizontal"
              ? `
          #${galleryId}:hover .gallery-item {
            flex: 0.5;
          }
          
          #${galleryId}:hover .gallery-item:hover {
            flex: 3;
          }
          `
              : `
          #${galleryId}:hover .gallery-item {
            flex: 0.5;
          }
          
          #${galleryId}:hover .gallery-item:hover {
            flex: 3;
          }
          `
          }
          
          #${galleryId} .gallery-item:hover img {
            transform: scale(1.02);
          }
          
          @media (max-width: 768px) {
            #${galleryId} {
              height: 250px !important;
              min-height: 250px !important;
              max-height: 250px !important;
              flex-direction: column;
            }
            
            #${galleryId} .gallery-item:first-child img {
              border-radius: 0;
              border-top-left-radius: 12px;
              border-top-right-radius: 12px;
            }
            
            #${galleryId} .gallery-item:last-child img {
              border-radius: 0;
              border-bottom-left-radius: 12px;
              border-bottom-right-radius: 12px;
            }
            
            #${galleryId}:hover .gallery-item {
              flex: 0.3;
            }
            
            #${galleryId}:hover .gallery-item:hover {
              flex: 2;
            }
          }
        </style>
      </div>`;
    }
  );
};

/**
 * 处理所有自定义块
 * @param {string} html - 原始 HTML 内容
 * @returns {string} - 处理后的 HTML
 */
export const processCustomBlocks = (html) => {
  // 先处理 Diff 块
  html = processDiffBlocks(html);

  // 处理 Alert 块
  html = processAlertBlocks(html);

  // 处理 Accordion 折叠面板
  html = processAccordionBlocks(html);

  // 处理 Expandable Gallery 可展开画廊
  html = processExpandableGallery(html);

  // 处理图像
  html = processImages(html);

  // 处理图像容器
  html = processImageContainers(html);

  // 这里可以添加更多自定义块处理

  return html;
};
