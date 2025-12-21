---
title: NitroGen部署评鉴
published: 2025-12-21
description: '面向通用游戏代理的开放基础模型'
image: 'https://wp-cdn.4ce.cn/v2/OHK397G.png'
tags: [大模型,人工智能]
category: '教程分享'
draft: false 
lang: ''
---
# 前言
[NitroGen](https://nitrogen.minedojo.org/) 是一种统一的视觉到动作模型，用于直接从原始帧进行视频游戏，将视频游戏画面作为输入，输出手柄信号，模型通过大规模模仿学习，对人类游戏视频进行训练。NitroGen 在专为手柄作设计的游戏（如动作、平台跳跃和竞速游戏）上效果最佳，而在高度依赖鼠标和键盘的游戏（如即时战略、MOBA）上效果较差。

额 。。 教程应该还算新鲜，或者是其他地方已经有教程了，因为部署不算特别困难吧，主要还是评鉴

## 部署
``` bash
git clone https://github.com/MineDojo/NitroGen.git
cd NitroGen
pip install -e .
```
然后你可以在[huggingface](https://huggingface.co/nvidia/NitroGen)下载模型
```bash
hf download nvidia/NitroGen ng.pt
```
或者使用
```bash
pip install huggingface_hub[hf_transfer]  # 可加速下载
huggingface-cli download nvidia/NitroGen ng.pt --local-dir .
```
国内也可以在[modelscope](https://www.modelscope.cn/models/nv-community/NitroGen)镜像下载

到目录下放置模型即可

```text
F:\NitroGen\
├── 📁 .cache/                  
├── 📁 assets/                   
├── 📁 debug/                    
├── 📁 nitrogen/                  
├── 📁 nitrogen.egg-info/         
├── 📁 out/                       
├── 📁 scripts/                   
├── 📄 LICENSE                   
├── 📄 ng.pt                     # 你的模型文件 (1.97 GB)
├── 📄 pyproject.toml            
└── 📄 README.md                 
```

项目分为一个推理和一个运行代理，我们首先启动推理
```bash
python scripts/serve.py <path_to_ng.pt>  
```
像是我当前目录结构那么启动命令就是
```bash
python scripts/serve.py ng.pt
```
启动后会下载一个文件大概2~3G

然后就是启动你的游戏和运行代理了启动你想玩的游戏，并且支持手柄，并(使用虚幻引擎开发的)不知道为什么，我测试中虚幻引擎打造的游戏兼容较好，又或者我没玩明白，别喷即可，要是其他游戏你运行上了算你厉害即可

运行代理命令
```bash
python scripts/play.py --process '<game_executable_name>.exe'
```
参数必须是你想玩的游戏的精确执行名。你可以在Windows任务管理器中右键点击游戏进程（Ctrl+Shift+Esc），然后选择。

额，我在这里启动首先遇到的第一个错误就是`AttributeError: module 'numpy' has no attribute 'long'`
解决方案就是换了将所有 `dtype=np.long` 替换为 `dtype=np.int_`

我测试的游戏有几个，主要是我也没多少游戏好测试，在推理状态下整体占用不高，但是游戏大概是4.5 FPS波动
## 点评
整个测试下来没有太多惊喜，反而我觉得大模型在使用手柄进行输出时很抽象，通过打印控制参数，发现抖动还是很严重的，其次就是平滑问题，因为噪声导致无法很好的过度，很抽象，额也有可能是我玩的游戏是大模型从来没见过玩过的如`看门狗2`我本来想试试经典`GTA`但是有反作弊这个是依靠注入dll文件实现的，注入就被弹了，后续尝试了`地平线`，`求生之路`emm，映射前面的主题，这些有的是注入失败，有的是没有反应，还有的就直接崩了，emm


## 声明
我看到在演示中是有如`赛博朋克`我映射`GTA`发现不行就映射`看门狗`,可能2d的会好一点但是我没有，这就是本期内容

## 官方演示视频

<iframe width="100%" height="468" src="https://nitrogen.minedojo.org/assets/videos/rollouts.mp4" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
