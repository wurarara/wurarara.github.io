---
layout:       post
title:        "Moonlight+Gerforce experience串流电脑音视频至手机"
author:       "林间伞下"
header-style: text
catalog:      true
tags:
    - 串流
---

![Moonlight](/img/moonlight.jpg "Moonlight")

## Moonlight简介
[**Moonlight**](https://github.com/moonlight-stream/moonlight-qt) 是一款开源软件。首先来看一下Github上的简介：

>Moonlight PC is an open source PC client for NVIDIA GameStream, as used by the NVIDIA Shield.

Moonlight是一款开源的利用Nvidia GameStream进行串流的软件。常规来说使用Nvidia GameStream串流除了需要一款支持GameStream的显卡以外，还需要Nvidia Shield设备的支持来接收串流。Moonlight就是做了Shield的工作。使能安装Moonlight的设备都能成为GameStream串流客户端。

## 开始串流

1. 准备支持GameStream的显卡

2. 设备间的串流需要你在两个设备都安装软件，这里也提供了 [**Android**](https://github.com/moonlight-stream/moonlight-android) 与 [**ios**](https://github.com/moonlight-stream/moonlight-ios) 的存储库。

3. 打开你的 GeForce Experience 进入设置找到 SHIELD 打开 GameStream。

4. 使用 moonlight 会出现一些端口的问题，使用作者提供的 [**Internet-Hosting-Tool**](https://github.com/moonlight-stream/Internet-Hosting-Tool/releases) 来自动配置网络以及检测问题、提供日志。具体看网站的介绍。

5. 打开手机上的 moonlight，会自动检测可用设备，检测不到的话点击右上角+号，输入你电脑的ip地址。

## 结束

要添加应用的话就在 SHIELD 页面那里的游戏与应用右下角有个添加。

到此就基本结束，具体的配置可以自己琢磨，软件提供中文。这里推荐打开"Use the touchscreen as a trackpad" ，打开后手机就相当于触控板，点哪里鼠标就跳到哪里，关闭的话，移动鼠标就需要你一直在手机屏幕上滑动。

## 推荐
这里是 [**官方文档**](https://github.com/moonlight-stream/moonlight-docs/wiki)

moonlight 进阶可以看一下这篇文章
>https://bbs.a9vg.com/thread-5365751-1-1.html