3、nodejs中的3M
==

> #### 3M介绍

- NVM: nodejs的版本管理工具
            新项目用的新版本，老项目用的老版本，要维护老版本就用老版本的nodejs环境

- NPM: 第三方资源库，有很多第三方包。

- NRM: 辅助NPM干活的，比如NPM被墙了，可以通过NRM切换NPM的源。

> #### npm

##### npm命令行模块管理工具

@(nodejs)


以下XXX代表要安装的包的名字
- 初始化
	- npm init [-y] 初始化package.json文件
- 安装
	- npm install XXX --save-dev  代表开发环境依赖 devDependencies
	- npm install XXX --save    代表生产环境依赖   dependenies
- 恢复
	- npm install 开发生产依赖全部恢复
	- npm install --production  生产环境恢复的依赖恢复
- 卸载
	- npm uninstall XXX   只卸载包文件
	- npm uninstall XXX --save   卸载包文件和 dependencies 依赖
	- npm uninstall XXX --save-dev   卸载包文件和 devDependencies 依赖
- 基本使用
- npm docs XXX     当前包所留下的一个官网
- npm install XXX@版本号（最新版本是latest）
比如：应用 npm install jquery@2.5  实际上没有2.5这个版本号，但会显示出所有2.5之前的版本号

##### 全局命令

- npm install XXX -g       全局下载
- npm uninstall XXX -g       全局卸载
- npm root -g       包的安装路径
- npm config set prefix "D:/test"       更改npm的安装路径为D:/test
用户变量的path中也要改变原来的路径为"D:/test"，在这个文件夹下有cmd工具，作用是打开包。
- 包的加载机制：从当前文件夹开始，逐级向上查找node_modules文件夹，直至找到该盘符的根目录

##### 全局与项目环境使用
- 如果需要在命令行直接通过包的名称来使用的东西，就通过全局安装
- 如果需要在js文件中存在一句require就必须项目中安装

##### 关于环境的补充

- 开发环境：开发环境是程序员专门用于开发的服务器，配置可以比较随意，为了开发调试方便，一般打开全部错误报告
- 生产环境：是指正式提供对外服务的，一般会关掉错误报告，打开错误日志。将代码放到服务器上。
-  测试环境：服务器的机器上的src-->dist（也是生产环境用代码的地方）
-  系统开发的阶段顺序：开发-->测试-->上线，生产环境也就是通常说的真是环境。

> #### nrm

##### 基本操作

- 安装
	- npm install -g nrm   要在命令行用的都要全局安装
- 常用命令
	-  ls  显示当前目录有哪些源，通常用taobao就行
	-  add  增加源 比如：nrm temp http://baidu.com/
	-  del  删除源  比如： nrm del temp
	-  current  查看当前的源
	-  use  切换源  不要写网址，直接写名字

> #### nvm

##### 基本操作
- 安装
	- 安装nvm时候如果已经安装了node会提示需不需要管理，如果给nvm管理，会在nvm的程序会将控制的nodejs版本移动到自己的目录下并且会生成一个和自己同级的nodejs的快捷方式。
	- nvm安装时是通过path来得知电脑中有其他版本，所以不想被管理从path删除就行
	- 安装时有两个目录，第一个是设置nvm的目录，第二个是nodejs的目录（快捷方式的目录），但是推荐配置同级目录
- 常用命令
- nvm ls      显示当前管理的nodejs版本列表，*代表当前正在使用的nodejs版本。
- nvm version    显示nvm的版本
- nvm install 5.1.1   下载其他nodejs版本，可以只写5.1
- 假如电脑中本来有4.3.5，此时nvm ls    就有两个版本可选
- nvm use 4.3.5     可以切换当前的nodejs版本
- nvm unintall 4.3.5    如果安装失败可以卸载

> #### node 绿色安装

- 要安装多版本，但是如果电脑中本来就有了更高的版本，会阻止安装。需要卸载该版本，就可以成功安装旧版本，比如4.4.3。
- 要再安装5.1.1，会覆盖之前的4.4.3，不是因为安装时的路径，而是因为环境变量和注册表有记录4.4.3的路径，所以删除环境变量、把4.4.3的文件改下名字注册表就找不到了
- 安装完之后最好把5.1.1文件夹也改一下名字。再改一下path的路径。
 