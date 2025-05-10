const e={title:"screen",published:"2024-12-16T00:00:00.000Z",description:"screen 命令使用",image:"https://wp-cdn.4ce.cn/v2/yzJB4N3.jpeg",tags:["Linux","命令"],category:"教程分享"},n=`<h1>screen 的功能</h1>
<ul>
<li>会话恢复</li>
<li>多窗口</li>
<li>会话共享</li>
</ul>
<h1>安装</h1>
<pre><code class="language-bash"># CentOS
yum install screen
# Debian/Ubuntu
apt install screen
</code></pre>
<h1>命令查看</h1>
<pre><code class="language-bash">screen -help
</code></pre>
<p>1.终端列表</p>
<pre><code class="language-bash">screen -ls
</code></pre>
<p>2.新建终端</p>
<pre><code class="language-bash">screen -S 终端名称
</code></pre>
<p>3.退出当前终端(保持后台运行)</p>
<p>我们按<code>Ctril+a</code>再按<code>d</code></p>
<p>4.回到终端</p>
<pre><code class="language-bash">screen -r 终端的PID或者name
</code></pre>
<ol start="5">
<li>杀掉指定终端会话</li>
</ol>
<p>如果需要结束某个后台运行的 <code>screen</code> 会话，可以使用以下命令：</p>
<pre><code class="language-bash">screen -X -S 终端名称(或PID) quit
</code></pre>
<ol start="6">
<li>分屏操作</li>
</ol>
<p><code>screen</code> 支持在同一个会话中分割屏幕以便同时查看多个窗口：</p>
<ul>
<li>
<p><strong>水平分屏</strong>：<br>
按下 <code>Ctrl+a</code>，然后按 <code>S</code></p>
</li>
<li>
<p><strong>垂直分屏</strong>：<br>
按下 <code>Ctrl+a</code>，然后按 <code>|</code> (部分键盘可能需要先按 <code>Shift+\\</code> 来输入竖线)</p>
</li>
<li>
<p><strong>切换光标到另一屏幕</strong>：<br>
按下 <code>Ctrl+a</code>，然后按 <code>Tab</code></p>
</li>
<li>
<p><strong>关闭当前分屏</strong>：<br>
按下 <code>Ctrl+a</code>，然后按 <code>X</code></p>
</li>
</ul>
<ol start="7">
<li>保存屏幕日志</li>
</ol>
<p>可以记录当前 <code>screen</code> 会话的所有输出：</p>
<pre><code class="language-bash">Ctrl+a :logfile 文件名
Ctrl+a :log on
</code></pre>
<p>要停止日志记录：</p>
<pre><code class="language-bash">Ctrl+a :log off
</code></pre>
<ol start="8">
<li>自定义 <code>screen</code> 配置</li>
</ol>
<p><code>screen</code> 支持通过配置文件 <code>.screenrc</code> 自定义快捷键和行为。配置文件通常存放在用户的主目录下，示例如下：</p>
<pre><code class="language-bash"># 开启时自动显示屏幕列表
startup_message off
# 设置默认窗口名称
shelltitle &quot;$ |bash&quot;
# 映射快捷键（示例为绑定 F9 键到分屏功能）
bindkey -k k9 split
</code></pre>
<p>编辑后，重新启动 <code>screen</code> 即可生效。</p>
`,c=[{level:"1",content:"screen &#x7684;&#x529F;&#x80FD;"},{level:"1",content:"&#x5B89;&#x88C5;"},{level:"1",content:"&#x547D;&#x4EE4;&#x67E5;&#x770B;"}];export{e as attributes,n as html,c as toc};
