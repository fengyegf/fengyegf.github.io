---
title: 把玩Open-AutoGLM
published: 2025-12-14
description: '尝试一下游玩和部分讲解'
image: 'https://www.catw.top/d/%E4%B8%BB%E7%BD%91%E7%9B%98/%E5%9B%BE%E5%83%8F/%E4%BA%8C%E6%AC%A1%E5%85%83/1742183218941_xwkh.jpg?sign=iTEyDs4-k_QORb7QW4_Uvix40-8nJ9G1e6UWVMdVm3w=:0'
tags: [大模型,随手记]
category: '人工智能'
draft: false 
lang: ''
---
# 开始
项目展示
::github{repo="zai-org/Open-AutoGLM"}
# 正文
首先还是老样子先玩后讲
```sh
git clone https://github.com/zai-org/Open-AutoGLM.git
```
进入目录，创建虚拟环境防止冲突
```python
python -m venv 环境名称
```
激活环境
```python
环境名称\Scripts\activate
```
激活成功后，命令行提示符通常会显示环境名称：
```python
python -m venv venv

venv\Scripts\activate

(venv) $
```
然后安装依赖
```python
pip install -r requirements.txt 
pip install -e .
```
# adb安装
在这里就不多说了
[文档](https://developer.android.com/tools/releases/platform-tools?hl=zh-cn)
# 安装 ADB Keyboard
手机安装一个这个
[ADB Keyboard](https://github.com/senzhk/ADBKeyBoard/blob/master/ADBKeyboard.apk)
## 开始游玩
第三方模型服务启动示例
```python
# 使用智谱 BigModel
python main.py --base-url https://open.bigmodel.cn/api/paas/v4 --model "autoglm-phone" --apikey "your-bigmodel-api-key" "打开美团搜索附近的火锅店"

# 使用 ModelScope
python main.py --base-url https://api-inference.modelscope.cn/v1 --model "ZhipuAI/AutoGLM-Phone-9B" --apikey "your-modelscope-api-key" "打开美团搜索附近的火锅店"
```

## 我遇到的问题
1. GBK 解码失败
我的解决方案也很简单，在对应文件加上强制使用UTF-8即可
这是错误片段
```pythin
Exception in thread Thread-13 (_readerthread):
    self._target(*self._args, **self._kwargs)
  File "D:\Python\Python310\lib\subprocess.py", line 1499, in _readerthread
    buffer.append(fh.read())
UnicodeDecodeError: 'gbk' codec can't decode byte 0xa8 in position 5176: illegal multibyte sequence
Traceback (most recent call last):
  File "F:\Open-AutoGLM\main.py", line 546, in <module>
    main()
  File "F:\Open-AutoGLM\main.py", line 516, in main
    result = agent.run(args.task)
  File "F:\Open-AutoGLM\phone_agent\agent.py", line 98, in run
    result = self._execute_step(task, is_first=True)
  File "F:\Open-AutoGLM\phone_agent\agent.py", line 144, in _execute_step
    current_app = get_current_app(self.agent_config.device_id)
  File "F:\Open-AutoGLM\phone_agent\adb\device.py", line 29, in get_current_app
    for line in output.split("\n"):
AttributeError: 'NoneType' object has no attribute 'split'
```
### 解决方案
在Open-AutoGLM\phone_agent\adb\device.py的`subprocess.run`代码上添加`encoding="utf-8", errors="ignore"`
这样就解决了
2. 运行到一半出现
```python
Traceback (most recent call last):
  File "F:\Open-AutoGLM\phone_agent\agent.py", line 176, in _execute_step
    response = self.model_client.request(self._context)
  File "F:\Open-AutoGLM\phone_agent\model\client.py", line 71, in request
    stream = self.client.chat.completions.create(
  File "F:\Open-AutoGLM\venv\lib\site-packages\openai\_utils\_utils.py", line 286, in wrapper
    return func(*args, **kwargs)
  File "F:\Open-AutoGLM\venv\lib\site-packages\openai\resources\chat\completions\completions.py", line 1192, in create
    return self._post(
  File "F:\Open-AutoGLM\venv\lib\site-packages\openai\_base_client.py", line 1259, in post
    return cast(ResponseT, self.request(cast_to, opts, stream=stream, stream_cls=stream_cls))
  File "F:\Open-AutoGLM\venv\lib\site-packages\openai\_base_client.py", line 1047, in request
    raise self._make_status_error_from_response(err.response) from None
openai.InternalServerError: Error code: 500 - {'error': {'code': 'InternalError.Algo', 'message': "Cannot connect to host 127.0.0.1:11434 ssl:default [Connect call failed ('127.0.0.1', 11434)]", 'type': 'api_error'}, 'request_id': '77f0d2dd-a572-4868-ae31-3b093ac9f275'}

Result: Model error: Error code: 500 - {'error': {'code': 'InternalError.Algo', 'message': "Cannot connect to host 127.0.0.1:11434 ssl:default [Connect call failed ('127.0.0.1', 11434)]", 'type': 'api_error'}, 'request_id': '77f0d2dd-a572-4868-ae31-3b093ac9f275'}
```
我不知道是我操作问题还是怎么的，他老是运行两次操作后会自动切换到本地
### 解决方案
给本地链接换成云端的

# 评价
emm,挺好的，我没有很多特别的问题，帮我简单完成签到还是很轻松的，软件适配我觉得中规中矩吧，因为我尝试在app列表中添加某些东西，大模型却表示在他的应用列表中没有这个软件，其次就是当前大模型都没办法摆脱提示词，依然需要靠提示词进行操作

# 小技巧
根具官方文档，有懒人小技巧
你可以使用Claude Code，配置 [GLM Coding Plan](https://bigmodel.cn/glm-coding) 后，输入以下提示词，快速部署本项目。
```cmd
访问文档，为我安装 AutoGLM
https://raw.githubusercontent.com/zai-org/Open-AutoGLM/refs/heads/main/README.md
```