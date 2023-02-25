---
layout:       post
title:        "使用Python调用MPV播放B站视频（一）"
author:       "林间伞下"
header-style: text
catalog:      true
tags:
    - MPV
---


## **使用MPV播放B站视频**

作为一个业余编程小白，这次的确是废了不少功夫......

以Windows为例

## **安装MPV**
首先是去[**下载MPV**](https://mpv.io/installation/)，用的是shinchiro编译好的Windows builds by shinchiro (releases and git)
>mpv目前没有官方编译的版本，第三方shinchiro编译的算公认的半官方版

我把下载下来的文件夹放到了桌面，然后将文件夹路径添加到环境变量，这就基本完成了。

>1. 接下来在这个文件夹里创建一个 portable_config 的文件夹，该目录具有最高级的优先级，存在此文件夹时，其它路径的配置文件都会被忽略。
>2. 然后在 /portable_config/ 内新建一个 mpv.conf 和 input.conf 的文件，文本编码为 UTF-8<br>最后路径为：X:/xx/你的MPV文件夹/portable_config/mpv.conf<br>最后路径为：X:/xx/你的MPV文件夹/portable_config/input.conf
>3. 最后就是配置mpv.conf 和 input.conf 文件了，这个网上很多就不赘述了，右键从记事本打开就可以编辑了，这里推荐 [**Notepad**](https://github.com/rizonesoft/Notepad3) 替代系统的记事本。

不过这里还是放一下我的配置，因为用到了 [**Anime4k**](https://github.com/bloc97/Anime4K) ，免得大家再找。

mpv.conf

```
# 关闭软解
#hwdec=no
# 尽可能所有格式先尝试硬解
#hwdec-codecs=all
# 输出log日志在桌面
#log-file="~~desktop/mpv.log"



# 使用d3d11va硬解（原生模式）
hwdec=d3d11va

#开启缓存
cache=yes
#最大向后缓存大小（KiB或MiB）
demuxer-max-bytes=64MiB
#用内存而不是磁盘缓存
cache-on-disk=no
#缓存时间
#cache-secs=8

# 加载视频文件的外部字幕文件方式。（fuzzy为模糊名，exact为精确名）
sub-auto=fuzzy

#设置默认打开的窗口大小为1280x720
geometry=1280x720

# 播放完毕后不自动退出
keep-open=yes

#变速播放时的音调修正
audio-pitch-correction=yes

# 自动加载同名外置音轨
audio-file-auto=fuzzy

# 存储icc缓存以加速二次启动
icc-cache-dir="~~/icc_cache"

 # 使用内置的预设的较高画质方案
profile=gpu-hq

# 存储着色器缓存以加速二次启动
gpu-shader-cache-dir="~~/shaders_cache"

# 自动加载同名外置字幕
sub-auto=fuzzy

# 截图的输出路径在桌面
screenshot-directory="~~desktop/"

# 查看文件信息
TAB script-binding stats/display-stats

# 启用校色，默认64x64x64。
icc-profile-auto
icc-3dlut-size=256x256x256

# 应用系统icc文件进行色彩修正
icc-profile-auto

#将字幕渲染到视频源分辨率并随视频一起缩放并进行色彩管理
blend-subtitles=video

#画面拉伸算法更改为 EWA Lanczos，即 madVR 中所谓 Jinc
scale=ewa_lanczossharp

#启用 interpolation 来消除帧率问题造成的卡顿
video-sync=display-resample
interpolation
tscale=oversample

#自动识别并加载非标准写法的外挂字幕
sub-auto=fuzzy

#设置置顶播放
#ontop=yes

#开启gpu渲染
profile=gpu-hq

# 设定程序启动后的默认音量
volume=20


# 记忆上次播放的位置
save-position-on-quit

# 优化4k视频播放
opengl-pbo=yes

#设置ua，对于一些流媒体可能比较好一点
user-agent="Mozilla/5.0"
```

input.conf

```
# 双击左键 播放/暂停
#MBTN_LEFT_DBL  cycle pause

#左键无响应
MBTN_LEFT         ignore

#左键双击全屏
MBTN_LEFT_DBL     cycle fullscreen

#右键暂停/播放
MBTN_RIGHT        cycle pause

# 滚轮上下滑动调节音量
WHEEL_UP      add volume 5
WHEEL_DOWN    add volume -5

# 空格键 播放/暂停
SPACE cycle pause

# 查看文件信息
TAB script-binding stats/display-stats

#右键菜单
#MOUSE_BTN2 script-message-to contextmenu_gui contextmenu_tk

# 查看着色器
CTRL+` show-text "Shaders: ${glsl-shaders}"

CTRL+1 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Restore_CNN_M.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_M.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_S.glsl"; show-text "Anime4K: Mode A (Fast)"

CTRL+2 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Restore_CNN_Soft_M.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_M.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_S.glsl"; show-text "Anime4K: Mode B (Fast)"

CTRL+3 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Upscale_Denoise_CNN_x2_M.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_S.glsl"; show-text "Anime4K: Mode C (Fast)"

CTRL+4 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Restore_CNN_M.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_M.glsl;~~/shaders/Anime4K_Restore_CNN_S.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_S.glsl"; show-text "Anime4K: Mode A+A (Fast)"

CTRL+5 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Restore_CNN_Soft_M.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_M.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Restore_CNN_Soft_S.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_S.glsl"; show-text "Anime4K: Mode B+B (Fast)"

CTRL+6 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Upscale_Denoise_CNN_x2_M.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Restore_CNN_S.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_S.glsl"; show-text "Anime4K: Mode C+A (Fast)"

CTRL+0 no-osd change-list glsl-shaders clr ""; show-text "GLSL shaders cleared"
```

其中我已经用中文标记了功能，Anime4K这里讲一下，快捷键是 CTRL+数字键0~6，1~6是切换着色器，0是清除着色器，需要注意的是这里的数字键不是小键盘上的键位而是字母键盘上方的数字键。
>Anime4K对于不同段位的显卡有不同的配置文件写法，具体的可以参考网上，这里贴一个（ https://www.bilibili.com/read/cv13643303 ）

>高端GPU用这些（如GTX 1080, RTX 2070, RTX 3060, Vega 56, 5700XT, 6600XT）
```
CTRL+1 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Restore_CNN_VL.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_VL.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_M.glsl"; show-text "Anime4K: Mode A (HQ)"
CTRL+2 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Restore_CNN_Soft_VL.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_VL.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_M.glsl"; show-text "Anime4K: Mode B (HQ)"
CTRL+3 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Upscale_Denoise_CNN_x2_VL.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_M.glsl"; show-text "Anime4K: Mode C (HQ)"
CTRL+4 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Restore_CNN_VL.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_VL.glsl;~~/shaders/Anime4K_Restore_CNN_M.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_M.glsl"; show-text "Anime4K: Mode A+A (HQ)"
CTRL+5 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Restore_CNN_Soft_VL.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_VL.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Restore_CNN_Soft_M.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_M.glsl"; show-text "Anime4K: Mode B+B (HQ)"
CTRL+6 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Upscale_Denoise_CNN_x2_VL.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Restore_CNN_M.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_M.glsl"; show-text "Anime4K: Mode C+A (HQ)"
CTRL+0 no-osd change-list glsl-shaders clr ""; show-text "GLSL shaders cleared"
```

>中端GPU（如GTX 970, GTX 1060, RX 570,GTX1650)
```
CTRL+1 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Restore_CNN_M.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_M.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_S.glsl"; show-text "Anime4K: Mode A (Fast)"
CTRL+2 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Restore_CNN_Soft_M.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_M.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_S.glsl"; show-text "Anime4K: Mode B (Fast)"
CTRL+3 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Upscale_Denoise_CNN_x2_M.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_S.glsl"; show-text "Anime4K: Mode C (Fast)"
CTRL+4 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Restore_CNN_M.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_M.glsl;~~/shaders/Anime4K_Restore_CNN_S.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_S.glsl"; show-text "Anime4K: Mode A+A (Fast)"
CTRL+5 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Restore_CNN_Soft_M.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_M.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Restore_CNN_Soft_S.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_S.glsl"; show-text "Anime4K: Mode B+B (Fast)"
CTRL+6 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Upscale_Denoise_CNN_x2_M.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Restore_CNN_S.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_S.glsl"; show-text "Anime4K: Mode C+A (Fast)"
CTRL+0 no-osd change-list glsl-shaders clr ""; show-text "GLSL shaders cleared"
```

>以上是官方给出的示例，如果是核显或者入门级独显，如Vega8,UHD 630,Geforce 840M这种，最好使用更低一级的glsl文件，如
```
CTRL+1 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Restore_CNN_S.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_S.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_S.glsl"; show-text "Anime4K: Mode D (Fast)"
CTRL+2 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Restore_CNN_Soft_S.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_S.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_S.glsl"; show-text "Anime4K: Mode E (Fast)"
CTRL+3 no-osd change-list glsl-shaders set "~~/shaders/Anime4K_Clamp_Highlights.glsl;~~/shaders/Anime4K_Upscale_Denoise_CNN_x2_S.glsl;~~/shaders/Anime4K_AutoDownscalePre_x2.glsl;~~/shaders/Anime4K_AutoDownscalePre_x4.glsl;~~/shaders/Anime4K_Upscale_CNN_x2_S.glsl"; show-text "Anime4K: Mode F (Fast)"
CTRL+0 no-osd change-list glsl-shaders clr ""; show-text "GLSL shaders cleared"
```

### **安装FFmpeg**
[**官网**](https://ffmpeg.org/)
1. 安装完添加到环境变量
2. 结束


***

<center>
以下章节从第3步的代码部分起，请移步<b><a href="https://wurarara.github.io/2023/01/09/使用Python调用MPV播放B站视频2">下文</a></b>，命令精简到了一个python文件中
</center>

***

### **使用python的you-get库在MPV看Bilibili的视频**
python的安装和配置我就不赘述了<br>[**you-get官网**](https://you-get.org/)
1. pip install you-get（安装完后进入you-get目录搜索commen.py，把23行注释掉）
```python
# 前面加个#就可以了，虽然我不知道是干什么的，不过不注释掉，我下面写的py代码就报错<-.->
# ps:当时真是费了我好长时间
sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf8')
```
2. [**chrome web store**](https://chrome.google.com/webstore/category/extensions) 安装插件：EditThisCookie，登录B站后进入一个视频的播放页，右键选中菜单中的EditThisCookie，选择扳手（设置），选择 options，找到 Choose the preferred export format for cookies，选择 Netscape HTTP Cookies File，然后回到刚才的页面导出cookies，新建cookies.txt文件，粘贴进去。
3. 写一段python代码，命名为bilibili.py。

```python
import sys
import os
from you_get import common as you_get                #导入you-get库

cookies_bl = "双引号中填入cookies.txt的地址"
sys.argv = ['you-get','-c',cookies_bl]    #-c指令获取你保存的cookies
video_url = input("input URL: ")
url = video_url     #视频地址
sys.argv = ['you-get', '-i', url,,'--no-proxy']          #-i指令获取url下视频的信息。
you_get.main()

format_msg = input("input format_msg: ")    #用户输入你想选择的格式，具体输入内容就是- format:后面的，比如dash-flv360、flv720这样的
sys.argv = ['you-get','--format={}'.format(format_msg),'-u',url,'--no-proxy']  #获取指定格式视频的真实链接
you_get.main()

os.startfile(r'单引号中填入bilibili.bat的地址')   #打开bat批处理，下方第4条就是
```


![upload-image]({{ "/assets/img/2023.01.08/1.png" | relative_url }})


>python代码我看不懂太多，不要问我。我在网上抄了主体，然后细化了一下。这里为了方便大家修改代码，简单说一下我的理解：‘-c’ ‘-i’这种的就是you-get的命令，修改命令的话自己翻官方文档就可以了，当然,我不知道能不能改，我抄的是（ https://www.cnblogs.com/cthon/p/12880112.html ） 可以参考一下。以防万一，把代码也搬过来。

```python
#单个下载
import sys
from you_get import common as you_get #导入you-get库
 
directory = '/data/Download' #设置下载目录
url = 'https://www.bilibili.com/video/av93104638?p=1' #需要下载的视频地址
sys.argv = ['you-get', '-o', directory, url] #sys传递参数执行下载，就像在命令行一样；‘-o’后面跟保存目录。
you_get.main()

#列表下载
import sys
from you_get import common as you_get                #导入you-get库
 
directory = '/data/Download'                          #设置下载目录
url = 'https://www.bilibili.com/video/av93104638?p=1'      #需要下载的视频地址
sys.argv = ['you-get', '-o', directory, url, '-l']          #sys传递参数执行下载，就像在命令行一样；‘-o’后面跟保存目录。
you_get.main()

#用的时候自己分开
```
4.写一个bat批处理，命名为bilibili.bat。

```bat
@echo off
rem This is a "paly bilibili video by mpv" program.

echo Please enter the real video URL
set /p video_url=
echo Please enter the real audio URL
set /p audio_url=
start mpv "%video_url%" --audio-file="%audio_url%" --referrer="https://www.bilibili.com" --no-ytdl

rem 代码很短，具体功能就是让你输入上面python代码获取的真实地址
```
>这里说一下，获取的真实链接一般是两个（看开头的http就知道从哪里开始）,上面的是视频链接，下面的是音频链接，bat批处理也会提示你输入两次。但是有的只获取到一个，我也懒得改代码了，遇到这种情况，视频和音频链接都写这一个就可以了。
到此就结束了，你可以写一个bat批处理打开python文件，或者把py文件直接放在桌面，我这里就默认打开方式是自带的IDLE编辑器，打开后直接F5就可以运行了。

```bat
rem 打开指定地址的指定文件

@echo off 
cd 你放py文件的文件夹的地址（不用加引号）
start bilibili.py
```

## **结语**

教程不是很长，就是代码挺多的，当时也费了我这个业余人士好大劲才写出来，其中py文件和bat文件的各种报错、不能运行，甚至运行完报错......（虽然能用，但是运行完报错就没法自动打开bat了，因为我把自动打开bat写在程序运行完之后了。），当然，我知道其实用bat打开python再打开bat，很白痴，不过其中很多问题我暂时解决不了了，比如
1. 其实一开始我想用一个bat就行的，但是不会写，一直报错，而且运行到you-get命令的时候会自动打开python命令行，运行完直接关了，我设想的本来是全程在系统自带的cmd里运行的，但是跳转到python然后运行完直接关掉的话没法复制真实链接了，百般思索，尝试，无果，放弃......
2. 然后我想用bat调用py文件，也失败，没办法全程在cmd运行，会自动打开IDLE......
3. 想直接用python命令行运行py文件，也失败，因为语法不一样......
4. 即使按照本文的方法运行，但最后他还会自动下载b站弹幕，不知道为什么......
5. ......
 
总之,还有很多问题，虽然麻烦了很久不过总算能用。理论上基本所有？网站都可以这样播放，之后尝试一下，可以的话放到下一篇简单说一下。

写到最后我突然想到，上面写的这个bat文件好像没什么卵用......而且全部挪到python里好像除了4没法解决以外，都没啥问题了......算了就当熟悉一下bat命令吧，之后新开一篇文章把他改到py文件里（T.T）。

最后，希望能帮助到有需要的人~

## 参考
[1] : [ yumefx ](https://www.yumefx.com/?p=2175)

[2] : [ you-get下载b站视频 ](https://www.cnblogs.com/cthon/p/12880112.html)

[3] : [ Anime4K v4.0配置（配合MPV使用） ](https://www.bilibili.com/read/cv13643303)

[4] : [ Linux下用mpv在B站看番（二）：you-get ](https://fspark.me/archives/Linux-mpv-bilibili-bangumi-you-get.html)

[5] : [ [VCB-Studio 科普教程 2.3] 跨平台播放器 mpv 配置入门 ](https://vcb-s.com/archives/7594)

[6] : [mpv手册汉化版](https://hooke007.github.io/official_man/index.html)