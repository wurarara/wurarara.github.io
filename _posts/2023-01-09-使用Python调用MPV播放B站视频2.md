---
layout:       post
title:        "使用Python调用MPV播放B站视频（二）"
author:       "林间伞下"
header-img: "img/home-bg.jpg"
header-mask: 0.4
header-style: text
catalog:      true
tags:
    - MPV
---

书接[**上文**](https://wurarara.github.io/posts/使用Python调用MPV播放B站视频1)，精简掉了bat文件，全程在python执行，不多说直接上代码

```python
import sys
import os
from you_get import common as you_get                #导入you-get库

cookies_bl = "双引号之间输入cookies文件地址"
sys.argv = ['you-get','-c',cookies_bl]
video_url = input("input URL: ")
url = video_url     #需要下载的视频地址
sys.argv = ['you-get', '-i', url,'--no-proxy']          #读取视频信息
you_get.main()

format_msg = input("input format_msg: ")
sys.argv = ['you-get','--format={}'.format(format_msg),'-u',url,'--no-proxy']   #读取视频真实链接
you_get.main()

video_url = input("Please enter the real video URL: ")
audio_url = input("Please enter the real audio URL: ")
cmd = 'mpv "' +  video_url + '" --audio-file="' + audio_url +  '" --referrer="https://www.bilibili.com" --no-ytdl'
os.system(cmd)

```


目前有个问题是，播放时会在python文件的地址下自动下载B站视频的字幕文件。还有一个无伤大雅的问题就是打开python文件后需要手动F5运行文件，如果有解决方法可以在GitHub提交~

## **结语**
这个教程到此结束了，写这个教程的目的，主要的重点还是在python命令一键调用MPV播放，因为手动输入太麻烦了，复制视频链接、输入各种指令获取cookies、获取视频信息、获取真实链接、最后再调用MPV，再把真实链接复制进去...而且网上没查到相关的脚本教程，you-get的教程也基本上都是命令行，写py文件的话找起来也很麻烦，所以就写了这个方便大家参阅。<br>再精简的话，应该就是最后一步不用手动复制吧？我是做不到了<T.T>。

>话说之前还讲到，这份代码理论上大部分网站都可以用来着？改的话大概是，如果用不到cookies的话就把那俩行注释掉，最后 --referrer=“” 里的链接改一下就好了？不过you-get好像也有不支持的网站，就这样吧~bye~
