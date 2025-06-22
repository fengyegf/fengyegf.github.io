const n={title:"虚幻的高级控制绑定",published:"2025-06-22T00:00:00.000Z",description:"记录虚幻引擎的高级控制绑定系统",image:"https://wp-cdn.4ce.cn/v2/iDRRg2k.jpeg",tags:["Unreal Engine5"],category:"教程分享",draft:!1},e=`<p>本篇文章记录一下入坑高级控制绑定<a href="https://dev.epicgames.com/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine">相关文档</a>说实话我也不一定能讲清楚，主要我在学习过程中没有找到好的入坑视频，要不就是视频作者剪掉关键信息，我会分几篇来讲解</p>
<h1>基础的绑定</h1>
<p>选择骨骼网格体右键 -&gt;创建 -&gt; 控制绑定
<img src="https://wp-cdn.4ce.cn/v2/ch9bMWa.png" alt="image.png">
双击打开大概是这样看不懂没关系我们在开一个官方的
<img src="https://wp-cdn.4ce.cn/v2/ZNat8sB.png" alt="image.png">
嗯~~看不懂，但是没关系我们从简单的开始
<img src="https://wp-cdn.4ce.cn/v2/1MUCn15.png" alt="image.png">
我们先从下往上开始，我们看到官方的脚下有 3 个控制器分别对应</p>
<ul>
<li>箭头-&gt; 根骨骼</li>
<li>方框-&gt; 人物移动</li>
<li>六边形-&gt; 整体移动</li>
</ul>
<p>先学习官方的创建出 3 个(f2 修改后的命名需要回车才会生效否则会被还原)
:::Diff
<img src="https://wp-cdn.4ce.cn/v2/SCbCSG2.png" alt="image.png">
vs
<img src="https://wp-cdn.4ce.cn/v2/Z0fUBOb.png" alt="image.png">
:::
注意命名也要一样，任何按照官方的摆出层级关系
<img src="https://wp-cdn.4ce.cn/v2/sDVKeLA.png" alt="image.png">
记住调整大小一定是修改<strong>形状</strong>中的参数不是变换-&gt;当前</p>
<p>形状按照官方的选择自己在调整合适的参数即可</p>
<p>我们看到官方的是方形控制人物位置我们选择方形的控制器，拖入到蓝图中选择获取控制点，然后在选择将类型改成控制点，名称选择你需要的控制器然后我们选择你想要控制的骨骼拖入蓝图选择设置骨骼我们将执行链接到设置骨骼，将控制点的变换连接到设置骨骼的值上
<img src="https://wp-cdn.4ce.cn/v2/nkQCxyP.png" alt="image.png">
我们就可以控制了
要是看不懂请阅读官方文档<a href="https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-create-control-rigs-in-unreal-engine#%E7%94%A8%E6%8E%A7%E5%88%B6%E7%82%B9%E9%A9%B1%E5%8A%A8%E9%AA%A8%E9%AA%BC">点击查看</a>
恭喜超越了一部分人
那么就来到了引擎的特色传统，难度直线上升(这个直线上升的线大概是 90°)<a href="https://dev.epicgames.com/documentation/zh-cn/unreal-engine/rigging-with-control-rig-in-unreal-engine#%E7%BB%91%E5%AE%9A%E5%8A%9F%E8%83%BD">文档</a>好的还是特色文档简短的概括功能</p>
<p>为了方便理解我们拆开讲解</p>
<h1>全身 ik</h1>
<p>这个嘛和上面大同小异分别在角色的各个关键位置创建，包含:头，双手腕，双脚腕</p>
<p>向前解析连上新的全形体 ik 控制，在关键骨骼创建控制点后获取控制点，在全形体 ik 的执行器选择加号选择对应骨骼在连上变换即可和之前大同小异，全形体 ik 需要根骨骼如图
<img src="https://wp-cdn.4ce.cn/v2/B3ETbvs.png" alt="image.png">
接下来就是重复其他几个<a href="https://dev.epicgames.com/documentation/zh-cn/unreal-engine/control-rig-full-body-ik-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E8%AE%BE%E7%BD%AE">相关文档</a>
<img src="https://wp-cdn.4ce.cn/v2/rFwdICf.png" alt="image.png">
这样弄出即可就得到简易的全身了拖动任意控制点就可以看到类似小时候玩的某个玩具了
<img src="https://wp-cdn.4ce.cn/v2/NpiANx7.png" alt="image.png">
为了不那么抽象我们可以在骨骼设置对对应骨骼进行限制，使其自然一点具体<a href="https://dev.epicgames.com/documentation/zh-cn/unreal-engine/control-rig-full-body-ik-in-unreal-engine#%E9%AA%A8%E9%AA%BC%E8%AE%BE%E7%BD%AE">参考文档</a></p>
<p>:::Diff
<img src="https://wp-cdn.4ce.cn/v2/m34Bdm9.png" alt="image.png">
vs
<img src="https://wp-cdn.4ce.cn/v2/NA8lOK3.png" alt="image.png">
:::
方法为在全形体 ik 中我们对腰部骨骼进行刚度调整即可
<img src="https://wp-cdn.4ce.cn/v2/qAB4wzb.png" alt="image.png">
然后就是如何控制两个，我们有一个全形体 ik 和基础的控制，我们使用快捷键(s+左键)那么就懂了吧
更高级的玩法可能得等待我研究一下</p>
`,t=[{level:"1",content:"&#x57FA;&#x7840;&#x7684;&#x7ED1;&#x5B9A;"},{level:"1",content:"&#x5168;&#x8EAB; ik"}];export{n as attributes,e as html,t as toc};
