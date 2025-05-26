const n={title:"ssh安装",published:"2024-10-21T00:00:00.000Z",description:"安卓手机使用ssh",image:"https://wp-cdn.4ce.cn/v2/l8qzVis.jpeg",tags:["termux"],category:"安卓折腾记",draft:!1},e=`<h1>前言</h1>
<h4>本期教程纯粹我闲的，出一期</h4>
<h1>准备工作</h1>
<ul>
<li>termux</li>
<li>Tabby Terminal</li>
</ul>
<h1>步骤</h1>
<ol>
<li>安装 openssh
我们打开 termux，输入</li>
</ol>
<pre><code class="language-sh">pkg install openssh
</code></pre>
<p>然后输入 sshd 开启 ssh 功能 2. 配置 sshd
输入</p>
<pre><code class="language-sh">ifconfig
</code></pre>
<p>拿到 ip 地址</p>
<img src="https://github.com/MLeaf-coder/FY/blob/main/termux/1.png?raw=true"/>
<p>:::info
本期是内网 ssh 互连不是 公网 ssh，也就是两台设备都需要在同一 WiFi 上
:::
拿到 ip 后我们设置 ssh 的连接密码</p>
<pre><code class="language-sh">passwd
</code></pre>
<p>设置密码</p>
<p>:::info
手机上 termux 开启的 sshd 服务用的是 8022 端口，而不是常用的 22 端口
:::
然后我们打开 Tabby 点击设置-&gt;配置和连接-&gt;新建-&gt;新配置-&gt;ssh 连接</p>
<p>然后输入你的 ip+密码</p>
<img src="https://github.com/MLeaf-coder/FY/blob/main/termux/2.png?raw=true"/>
<p>配置完成，保存连接即可，连接成功如图</p>
<img src="https://github.com/MLeaf-coder/FY/blob/main/termux/3.png?raw=true"/>
<h3>相关链接</h3>
<ol>
<li><a href="https://tabby.sh/">tabby</a></li>
</ol>
`,t=[{level:"1",content:"&#x524D;&#x8A00;"},{level:"4",content:"&#x672C;&#x671F;&#x6559;&#x7A0B;&#x7EAF;&#x7CB9;&#x6211;&#x95F2;&#x7684;&#xFF0C;&#x51FA;&#x4E00;&#x671F;"},{level:"1",content:"&#x51C6;&#x5907;&#x5DE5;&#x4F5C;"},{level:"1",content:"&#x6B65;&#x9AA4;"},{level:"3",content:"&#x76F8;&#x5173;&#x94FE;&#x63A5;"}];export{n as attributes,e as html,t as toc};
