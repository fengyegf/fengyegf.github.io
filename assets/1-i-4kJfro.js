const t={title:"alist安装",published:"2024-08-02T00:00:00.000Z",image:"https://wp-cdn.4ce.cn/v2/vt15x0Z.jpeg",description:"安卓手机免root安装alist",tags:["alist","termux"],category:"安卓折腾记",draft:!1},e=`<h1>欢迎来到本期安卓改造计划本期</h1>
<h3>前言</h3>
<ol>
<li>实现命令安装 alist</li>
<li>自动化下载种子视频</li>
</ol>
<h3>准备工作</h3>
<ol>
<li>准备一台安卓手机</li>
<li>准备软件 termux</li>
</ol>
<h1>教程</h1>
<h3>安装 alist</h3>
<p>启动 termux 使用命令我们首先安装 alist</p>
<pre><code class="language-bash">pkg install alist
</code></pre>
<p>安装完成后我们使用命令启动 alist</p>
<pre><code class="language-bash">alist server
</code></pre>
<p>启动完成后我们使用浏览器访问 <a href="http://127.0.0.1:5244/">http://127.0.0.1:5244/</a> 用户名默认为 admin</p>
<p>我们输入</p>
<pre><code class="language-bash">alist admin
</code></pre>
<p>即可查看当前管理员密码管理密码在第一次启动时会显示在终端，我们可以自己接修改密码方便记忆</p>
<pre><code class="language-bash">alist admin set 你自己的密码
</code></pre>
<p>配置完成后我们使用浏览器访问 <a href="http://127.0.0.1:5244/">http://127.0.0.1:5244/</a> 即可进行登录操作登录成功后我们即可进行配置操作</p>
<h3>配置 Aria2 下载器</h3>
<p>这边我们需要使用 RimuruW 大佬的一键安装管理脚本我们在 termux 新开一个界面
我们输入</p>
<pre><code class="language-bash">bash -c &quot;$(curl -L https://raw.githubusercontent.com/RimuruW/Aria2-Termux/master/install.sh)&quot;
</code></pre>
<p>然后选择安装并配置自启动，然后输入 7 进行配置查看我们即可看到 RPC 密钥</p>
<h3>给 alist 配置 Aria2 下载器</h3>
<p>我们进入 alist 的主页面点击下面的管理进入后点击设置-&gt;其他在 Aria2 密钥处填入 RPC 密钥即可</p>
<h3>结尾</h3>
<p>这个东西也是花费了我好几天，希望各位小伙伴们能喜欢，其次就是我还想安装小雅来着的，但是小雅的安装有一个访问 doker 的网络问题，不知道为什么始终连接不上，等我在搞几天</p>
<h3>相关文章</h3>
<p><a href="https://blog.linioi.com/posts/aria2-for-termux/">Android 一键安装配置 Aria2</a></p>
<p><a href="https://github.com/RimuruW/Aria2-Termux"> Android 的 Aria2 一键安装管理脚本</a></p>
`,n=[{level:"1",content:"&#x6B22;&#x8FCE;&#x6765;&#x5230;&#x672C;&#x671F;&#x5B89;&#x5353;&#x6539;&#x9020;&#x8BA1;&#x5212;&#x672C;&#x671F;"},{level:"3",content:"&#x524D;&#x8A00;"},{level:"3",content:"&#x51C6;&#x5907;&#x5DE5;&#x4F5C;"},{level:"1",content:"&#x6559;&#x7A0B;"},{level:"3",content:"&#x5B89;&#x88C5; alist"},{level:"3",content:"&#x914D;&#x7F6E; Aria2 &#x4E0B;&#x8F7D;&#x5668;"},{level:"3",content:"&#x7ED9; alist &#x914D;&#x7F6E; Aria2 &#x4E0B;&#x8F7D;&#x5668;"},{level:"3",content:"&#x7ED3;&#x5C3E;"},{level:"3",content:"&#x76F8;&#x5173;&#x6587;&#x7AE0;"}];export{t as attributes,e as html,n as toc};
