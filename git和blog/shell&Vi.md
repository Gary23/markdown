---
title: shell&Vi
tags: shell,版本控制
notebook: git和blog
---

# 壳和核的概念

## 概念

shell俗称为壳，在cmd中输入的命令就称为shell。

壳的概念是为了区别于核kemel，而核是通过壳才能驱动运行的，假如核是汽车那么壳就是车钥匙。再比如播放视频，双击打开就是壳的部分，壳来驱动存放在硬盘的视频来播放运行视频文件，播放视频就是核。它接收用户命令，然后调用相应的应用程序。

> 结论：用户 -> 壳 -> 核 -> 硬件

## 壳的分类

## 图形界面GUI

通过提供友好的可视化界面，调用相应应用程序。图形界面的代表就是windows等操作系统，相当于一个壳。

## 命令行cli

通过键盘输入特定命令的方式，调用相应的应用程序。在windows有cmd、powershell。在linux有sh(Bourne shell)、bash(Bourne Again shell)


# bash命令

在window系统下使用bash，需要一个软件，这个软件模拟（还有很多其他软件）集成了bash大部分命令

windows要支持bash的命令才可以，所以要在windows使用要装GIT和bash，这两个也可以分开装

## 格式

命令[-options] [参数]，如 tar zxvf demo.tar.gz

## 查看帮助

命令 --help

## bash常见命令

**pwd（Print Working Directory）**        
查看当前目录

**cd（Change Directory）**
切换目录。打开e盘：cd  /e 或者 打开web文件夹： cd  web；返回上一级：cd  ..

**ls（List）**
查看当前目录下的内容。ls  -al(all list) , 查看web文件夹下的内容：ls  web 。

**mkdir（Make Directory）**
创建文件夹。创建一个blog目录：mkdir  blog。

**touch**
创建文件。创建一个index.html文件：touch  index.html

**cat**
查看文件的全部内容。查看文件里编辑的内容：cat  index.html

**less**
查看文件的部分内容。文件里的内容太长可以用less命令：less  index.html。  可以分页查看，q是退出功能、空格翻页。

**rm(Remove)**
删除文件。rm  index.html。 加-rf可以删除有子文件的文件夹：rm -rf blog。 小心使用，删除的内容不回回收站。

**rmdir(Remove Directory)**
删除文件夹。rmdir  web。 只能删除空文件夹，不常用

**mv（move）**
移动文件或重命名。移动：mv  index.html  ./demo ；重命名：mv  index.html  test.html。

**cp（copy）**
复制文件。复制时可以顺便改名：cp index.html  ./demo/test.html

**head**
查看文件内容的前几行。查看前5行内容：head  -5  index.html。

**tail**
查看文件内容的后几行。查看后5行内容：tail  -5  index.html。

**tab**
自动补全。连按两次会将所有匹配内容显示出来。

**history**
查看操作历史

**ssh**
远程登录。在下面的部分会介绍

**> 和 >>**
重定向>是覆盖，>>是追加。将原本应该输出在屏幕上的内容输出到README.md中：history  >  README.md。 可以实现复制文件夹里的内容：test.txt > test1.txt。

**wget**
下载。wget https://nodejs.org/dist/v4.4.0/node-v4.4.0.tar.gz。

**tar**
解压缩。tar zxvf node-v4.4.0.tar.gz。只能解压gz格式

**curl**
网络请求。curl http://www.baidu.com

**whoami**
查看当前操作系统的用户名

**|**
管道符可以将多个命令连接使用。把上一次命令的执行结果当成下一次命令的参数

**grep**
匹配内容。去index.txt中找出匹配index字符的行内容：grep index index.txt (可以匹配正则表达式)。 配合管道符使用。在ls返回的结果中（很多文件）中查找包含index字符的内容行：ls  |  grep  index  (ls  |  就当做第二个参数来使用)


# Vi编辑器

如同windows下的记事本，vi编辑器是linux下的编辑器。通过它们我可以创建、编辑文件。它是一个随系统一起安装的文本编辑软件。

vi在编辑文本内容时，在不同模式下进行的操作是不同的，有三种模式：插入模式、命令模式、底行模式。

打开vi编辑器默认是命令行模式，在命令行模式输入 i 或 a 就进入了输入模式，输入模式按 ESC 就回到了命令行模式，命令行模式输入 : 就进入了底行模式，底行模式按 ESC 就回到了命令行模式。

## vi编辑器的常用操作：

**打开/创建文件**
vi 文件路径

## 底行模式
**w** 
保存，w 文件名 另存为

**q** 
退出

**wq** 
保存并退出

**e!** 
撤销更改，返回到上一次保存的状态

**q!** 
不保存强制退出

**set nu** 设置行号

## 命令模式

**ZZ** 
保存并退出

**u** 
撤销操作，可多次使用

**dd** 
删除当前行

**yy** 
复制当前行

**p** 
粘贴内容

**ctrl+f** 
向前翻页

**ctrl+b** 
向后翻页

**i** 
进入编辑模式，当前光标出插入

**a** 
进入编辑模式，当前光标后插入

**A** 
进入编辑模式，光标移动到行尾

**o** 
进入编辑模式，当前行下面插入新行

**O** 
进入编辑模式，当前行上面插入新行


# ssh协议

## 概念

SSH是一种网络协议，用于计算机之间的加密登录，在自己的电脑上登录远程服务器。这种协议存在多种实现，就好比HTTP是一个协议它是通过浏览器来实现。linux下使用OpenSSH，在windows下使用PuTTY。

通过ip就可以访问到远程服务器：ssh student@192.168.21.70  使用student这个用户名来登录192.168.21.70这个服务器，当然这个用户是提前创建好的。

## 加密

## 对称性加密

经过算法将原始数据加密，接收方接收到之后解密，两方通过秘钥加密和解密。在第一次发送时会先将秘钥传递到接收方，所以虽然很好用但是秘钥可能会被拦截。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/af71b5eabff9dc24f8a0a72d5414637bc944fd268d5e93e05bcfa48fdf97b119c8babdb7c15f596cf73c333aa6aeb853?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-5.jpg&size=1024)


## 非对称性加密

加密和解密使用的不是同一个秘钥。本地电脑创建一对秘钥，分别是公钥和私钥，可以通过公钥加密数据，这样只能用对应的私钥来解密。也可以通过私钥加密只能用对应的公钥来解密。

第一次登陆远程计算机时，会将远程计算机的公钥下发下来，保存在本地。这时登陆远程计算机，密码就可以用公钥加密发送。当远程服务器接收到公钥加密的数据后，会自动使用私钥进行加密。


![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/919498cf24ae09abbc5b7c36d2a95082abcdd22700e6888a86735d99726cd96ed56c7df40ec444d4b0a721871384cafe?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-6.jpg&size=1024)
