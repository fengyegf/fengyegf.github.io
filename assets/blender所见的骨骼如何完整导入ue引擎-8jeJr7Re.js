const n={title:"blender所见的骨骼如何完整导入ue引擎",published:"2025-06-20T00:00:00.000Z",description:"简单讲解如何将blender中绑定好的骨骼完整导入不会掺杂其他的",image:"https://wp-cdn.4ce.cn/v2/1fgOJTm.png",tags:["blender","Unreal Engine5"],category:"教程分享",draft:!1},t=`<p>本期简单讲解一下如何将你看到的骨骼按照当前状态完整导入，不会出现多余骨骼</p>
<h1>首先看看默认</h1>
<p>也就是什么都不干的情况下使用 fbx 导出，在导入引擎</p>
<h2>效果如下</h2>
<p>:::Diff
<img src="https://wp-cdn.4ce.cn/v2/qp47jt7.png" alt="blender骨骼">
vs
<img src="https://wp-cdn.4ce.cn/v2/6l5SXh1.png" alt="引擎骨骼">
:::</p>
<p>我们理想的<strong>效果</strong>应该是</p>
<p>:::Diff
<img src="https://wp-cdn.4ce.cn/v2/qp47jt7.png" alt="blender骨骼">
vs
<img src="https://wp-cdn.4ce.cn/v2/Rh0adZf.png" alt="引擎骨骼">
:::</p>
<p>主要修改点为骨骼的叶骨
<img src="https://wp-cdn.4ce.cn/v2/9qbgl0R.png" alt="image.png">
其余轴向可以参考也可以不管
其实这个骨骼也是很迷</p>
`,p=[{level:"1",content:"&#x9996;&#x5148;&#x770B;&#x770B;&#x9ED8;&#x8BA4;"},{level:"2",content:"&#x6548;&#x679C;&#x5982;&#x4E0B;"}];export{n as attributes,t as html,p as toc};
