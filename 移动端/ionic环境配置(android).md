
## 系统环境搭建

### 安装java jdk

[点击这里下载 java jdk](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/448af025a2934b9a717c0b336db2e59eac9210544e98cc2a205dcf098d84f4147e4bb39e676a2025aecdc8b9629dfd1b?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-33.png&size=1024)

下载后双击打开安装

### 配置jdk环境变量

1. 增加系统变量 JAVA_HOME

2. 把jdk的安装路径复制即可

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/94cd128abb54455a169b7831873880fc72860239f77ff691a26b9755e9a142a9a54bb96c358c2c00dbb73867846e0e95?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-34.png&size=1024)

3. 新增系统变量 CLASSPATH，值为 `.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar`，注意复制开头的点。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/6681c68bb6514fa11af69e21ebac2462a039702a28054e4f83a89f94f31ad65e78f371a8d37e1dbe7ad0d7eb8d1b7c6d?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-35.png&size=1024)

4. 在Path系统变量的后面增加 `%JAVA_HOME%\bin`  注意每个路径之间用 ; 分开

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/bcab89a80c0bd270a51c759e90c74d6f7896dd208f3ae6f68767be76dd606284d6977d92cd0cc568ab2d68882b944b33?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-36.png&size=1024)

5. 打开cmd，输入javac能正常运行即可

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/b8b61ba2b3dfbb4acc6a8689960cc49ebc9732ef0856b3b667769995eb689041a9cf2572cadedbe8722b4ba7c7dc5a47?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-37.png&size=1024)

### 安装android adt

[点击这里下载 android sdk](http://www.android-studio.org/)

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/d9e382fa01b6398368151b3714279beb9859cb3a684f5a7ec8a03d635eb3a7c39326df374e537c70d11fd6d739f1e621?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-38.png&size=1024)

1. 安装完毕后在目录用管理员身份打开SDK Manager.exe。[建议设置国内镜像地址](http://www.androiddevtools.cn/)

2. 需要安装的更新有以下这些。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/055149b468a559a8eb34eb8fdc856b925e315ea061585cf7df68130d2e06bcf7bbdf1069326f7a68304d0515bb4221da?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-39.png&size=1024)

### 设置 android sdk 环境变量

1. 新建系统变量 ANDROID_HOME，值为android sdk的安装路径 

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/afdbe999d47c28a5cf454e34aeee6365a7b53f4cfd9e5353391610fb5c0d6b9bf2cac2c19919ba4fbb15c6bfddc1847b?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-40.png&size=1024)

2. 在Path系统变量后面增加 `%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools` 

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/761fa48fdb24d9684c6d41e2374176b4d4ac77f62d9e868435e1776273bd8f1768822a67d10a9c3a1eb6526820b8ae30?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-41.png&size=1024)

- 打开cmd 正常执行adb命令即可

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/234ff64c1381cc5581ff94d6aacfef5fac8f1937ab9e4d254969c9bbfa4e328267c5a064f78c98e7cca04bbc39ca477d?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-42.png&size=1024)


### 安装C++

直接在百度搜索即可。也可以下载Visual Studio只安装C++部分。

### node环境

- 直接在[node官网](https://nodejs.org/en/)或者[node中文网](http://nodejs.cn/)下载即可

### git环境

[git官网的下载页面](https://git-scm.com/download/win)

### 项目依赖环境搭建

#### cordova

打开cmd，下载npm install -g cordova

#### ionic

打开cmd，下载npm install -g ionic

## 项目搭建

### 创建项目模板

打开cmd，输入ionic  start  myApp (muApp是项目名)。

tabs是默认样式，还有Ionic  start  myApp  blank和Ionic start myApp sidemenu

### 打包App

#### 添加项目平台

进入刚才下载的项目，打开cmd，执行`ionic  platform  add  android`

#### 打包成apk

在项目目录下打开cmd执行`ionic build android`。打包成功后文件存放位置会有提示

## 添加项目平台报错的情况

### 如果命令框一直出现………………

1. ctrl+c 直接退出，下载.gradle.zip解压后放到 用户名->users下。

2. .gradle文件夹下应该有四个文件夹：caches、daemon、native、wrapper

3. 再运行`Ionic  platform  add  android`

### 出现Picked up _JAVA_OPTIONS: -Xmx512M

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/973ec9378e2db6ab9c9b9ccf9ae4a0b14296f72e8d20e7504514f3cc7f870ecb3970eb10cf5cdd73521cc819c486e4f9?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-43.png&size=1024)

1. 在.gradle文件夹建一个文件gradle.properties。

2. 记事本打开内容设置为 `org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=3072m`【最后面这个3072是我根据自己电脑运行内存修改的，因为之前报过错误not enough space什么的忘记了，电脑是2g内存，在想是不是不够内存运行虚拟机什么的所以我去维修点换成了3g，1g就1024，我3g所以就改成了3072，具体看自己电脑内存。】

3. 有可能是它在执行命令的时候download jar包的时候网络不好什么的，所以报错了缺少哪个文件失败了。反正我又重新来一遍了，因为资源都是下载在myApp里面的platform文件夹里【不完整】，所以我就整个都删掉了然后重新执行命令 `ionic platform add android`。

### 注意

以上错误改完后再运行`ionic  platform  add  android`，会提示`platform added` 已经被添加。只要删除目录下的platform文件夹就行，这里面就是打包的内容。
