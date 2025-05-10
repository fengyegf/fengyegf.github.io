const e={title:"实时换脸",published:"2025-02-01T00:00:00.000Z",description:"讲解Deep-Live-Cam的实时换脸安装配置",image:"https://wp-cdn.4ce.cn/v2/NyM7v8p.jpeg",tags:["人工智能","教学"],category:"教程分享",draft:!1},n=`<h1>介绍</h1>
<p>Deep-Live-Cam 是实时换脸的<a href="https://github.com/hacksider/Deep-Live-Cam">开源项目</a></p>
<p>该项目实现了实时换脸和一键式视频深度伪造，在这个项目之初我就去部署过，但是当时技术不是很到位，部署一直没搞明白，不过在我深度学习 ai 后，我发现他发布了 2.0 版本，看了一下他没有发布直接运行的文件但是有一个付费订购的软件包，说的是可以在没有任何技术基础上运行，也就是下载解压运行，看了一下价格 20$/月，对于我来说这 20 刀还是很贵的，都 100 多了，那么还是老样子我们开始操作</p>
<h1>安装配置</h1>
<ul>
<li>python 3.10(他的推荐是这个版本)</li>
<li>pip</li>
<li>git</li>
<li>ffmpeg</li>
<li>Visual Studio 2022 Runtimes (Windows)</li>
</ul>
<p>总体来说还算简单，那么我们开始解决最难的几个</p>
<h2>ffmpeg</h2>
<p>ffmpeg 是一个强大的，开源的，视频库，功能十分强大</p>
<h3>安装 ffmpeg</h3>
<p>我们到<a href="https://ffmpeg.org/download.html">ffmpeg</a>下载对应的版本，找不到的可以到<a href="https://github.com/BtbN/FFmpeg-Builds/releases">github</a>下载</p>
<p>下载后我们需要添加到环境中</p>
<p>在 windows 中，我们找到开始菜单-&gt;搜索-&gt;编辑系统环境变量-&gt;环境变量-&gt;系统变量-&gt;path-&gt;新建-&gt;输入下载的 ffmpeg 的目录\\bin-&gt;确定-&gt;确定</p>
<p>:::Info
一定是 ffmpeg 的\\bin 目录下
:::</p>
<p>我们可以在命令行中输入 ffmpeg -version</p>
<p>实在不知道咋办的点击<a href="https://blog.csdn.net/Natsuago/article/details/143231558">这里</a>，知道没有图片不能活，但是我博客带宽不行好吧，将就点，给你们找了一篇博客，还算详细</p>
<h2>Visual Studio 2022 Runtimes (Windows)</h2>
<p>呃，这个是 Microsoft C++ 生成工具，这个怎么说呢，我因为要学 ue 引擎所以我是有<a href="https://visualstudio.microsoft.com/zh-hans/vs/">Visual Studio</a>,我是直接当插件安装的，这个的原作者提供了一个直接去下载的<a href="https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/">链接</a>，具体咋用咱也不知道，凭感觉吧，下载后双击运行，然后选择安装，安装完成后重启电脑应该能解决问题</p>
<h1>开始</h1>
<p>首先我们克隆仓库</p>
<pre><code class="language-bash">git clone https://github.com/hacksider/Deep-Live-Cam.git
</code></pre>
<p>下载模型</p>
<ol>
<li><a href="https://huggingface.co/hacksider/deep-live-cam/resolve/main/GFPGANv1.4.pth">GFPGAN v1.4 版本</a></li>
<li><a href="https://huggingface.co/hacksider/deep-live-cam/resolve/main/inswapper_128_fp16.onnx">inswapper_128_fp16.onnx</a></li>
</ol>
<p>将这些文件放在 “models” 文件夹中(没有文件夹就创建)</p>
<p>进入目录安装依赖</p>
<pre><code class="language-bash">cd Deep-Live-Cam
pip install -r requirements.txt
</code></pre>
<p>没有 GPU 的话运行</p>
<pre><code class="language-bash">python run.py
</code></pre>
<p>有 GPU 的话你可能需要 CUDA 执行提供程序 （Nvidia）</p>
<pre><code class="language-bash">pip uninstall onnxruntime onnxruntime-gpu
pip install onnxruntime-gpu==1.16.3
</code></pre>
<p>用法为</p>
<pre><code class="language-bash">python run.py --execution-provider cuda
</code></pre>
<p>但是吧 cuda 对于 windows 好像只有 x86_64 的，emm 你们可以下载试试还是老样子对应的安装详细博客<a href="https://blog.csdn.net/chen565884393/article/details/127905428">这里</a></p>
<p>命令行参数</p>
<pre><code class="language-bash">options:
  -h, --help                                               显示帮助信息并退出
  -s SOURCE_PATH, --source SOURCE_PATH                     选择源图像
  -t TARGET_PATH, --target TARGET_PATH                     选择目标图像或视频
  -o OUTPUT_PATH, --output OUTPUT_PATH                     选择输出文件或目录
  --frame-processor FRAME_PROCESSOR [FRAME_PROCESSOR ...]  帧处理器（可选：face_swapper, face_enhancer 等）
  --keep-fps                                               保持原始帧率
  --keep-audio                                             保持原始音频
  --keep-frames                                            保持临时帧
  --many-faces                                             处理每一张人脸
  --map-faces                                              映射源和目标的面部
  --mouth-mask                                             遮罩嘴部区域
  --video-encoder {libx264,libx265,libvpx-vp9}             调整输出视频编码器
  --video-quality [0-51]                                   调整输出视频质量
  --live-mirror                                            显示实时镜头，如前置摄像头的画面
  --live-resizable                                         实时摄像头画面可调整大小
  --max-memory MAX_MEMORY                                  最大内存使用量（单位：GB）
  --execution-provider {cpu} [{cpu} ...]                   可用的执行提供者（可选：cpu 等）
  --execution-threads EXECUTION_THREADS                    执行线程数
  -v, --version                                            显示程序的版本号并退出
</code></pre>
<p>不出意外你们应该就得到了一个完美的实时换脸了
<img src="https://github.com/user-attachments/assets/af825228-852c-411b-b787-ffd9aac72fc6" alt="easysteps">
步骤图</p>
<p>祝各位玩的开心</p>
`,p=[{level:"1",content:"&#x4ECB;&#x7ECD;"},{level:"1",content:"&#x5B89;&#x88C5;&#x914D;&#x7F6E;"},{level:"2",content:"ffmpeg"},{level:"3",content:"&#x5B89;&#x88C5; ffmpeg"},{level:"2",content:"Visual Studio 2022 Runtimes (Windows)"},{level:"1",content:"&#x5F00;&#x59CB;"}];export{e as attributes,n as html,p as toc};
