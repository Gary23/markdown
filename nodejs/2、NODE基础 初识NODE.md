2、NODE基础 初识NODE
==

nodejs启程
--

> #### javascript 总结

##### javascript的运行环境

@(nodejs)

- 浏览器的js的解析引擎（比如chrome是v8）
- nodejs平台上运行

##### 浏览器运行的javascript可以做什么
- 操作DOM
- 操作BOM
- 表单验证
- 发送ajax请求
- 页面特效

##### 浏览器运行的javascript不可以做什么
 - 操作文件
 - 操作数据库
 - 接收请求
 - 操作系统的底层

##### 总结

- javascript能做的就是前台的一些东西。因为js是运行在浏览器的引擎中，而像java这种语言是运行在服务器
- 所以语言的能力就取决于运行的环境（宿主环境）
- javascript在浏览器中运行，就能够操作服务器的一些操作
- java等后台语言在服务器运行，就能够操作服务器的一些操作
-  数据库sql，在数据库运行就能够操作数据库

> #### chrome和nodejs的实现结构

##### chrome的实现结构

- 上层：
	- chrome中的html和css由WebKit引擎解析
	- javascript由v8引擎解析

- 中间层：
	- 调配上层和下层的应用层

- 下层：
	- 内存、硬盘、网卡等硬件

##### nodejs的实现结构

- 和chrome差别就是负责显示的渲染引擎部分
- 从架构的方面来说没有html和css的部分，所以也就不需要javascript的DOM和BOM。
- 从代码的角度来说没有document和window对象
- 所以通过判断有没有document和window对象就可以知道代码运行在浏览器环境中还是nodejs中。

> #### node简介

##### node的特点

- nodejs是由瑞恩.达尔推出的
- nodejs并不能算是一种语言，算是运行时的平台。运行时：
	- 可以用js语言来编码
	- v8解析和执行
	- 底层调用资源
	- 跨越平台
- nodejs直接把v8引擎移植了过来，事件驱动、非阻塞IO模型、高效轻便
- bower 可以下载前端的资源
- npm 可以下载后端的资源

##### node可以做什么
- 操作文件
- 操作数据库
- 接收请求
- 操作系统底层
- 数据持久化（连接数据库）

##### 和php的区别
- 在web开发中，其他语言要接收请求，还需要服务器来运行代码。
- 而nodejs则不需要服务器，本身这个平台就可以称作服务器

##### node的应用场景

- 多人的游戏服务器
- 基于浏览器的聊天程序
- 开发单页面的程序
- 基于JSON支持的API

nodejs实际上：
- 适合开发IO密集（网络数据和输出，比如聊天、购物等系统）
- 不适合开发CPU密集（需要大量的计算，耗损CPU资源，比如商品折扣和活动的计算）
- 会有判断是不是需要复杂计算的业务，不需要直接返回，需要的交给java服务器，计算之后再返回

> #### cmd 基本命令介绍

##### cmd路径

- 文件存在于当前的目录下，直接 node  文件名。例如：node quickStart.js
- 文件不在当前的目录下：
	- 绝对路径
	- ./ 相对路径
	- shift + 鼠标右键，直接在此处打开命令行

##### cmd命令行基本命令

- dir：浏览当前目录的文件和文件夹
- cd：打开目录
- cd.. ：返回上级
- cd  / ：返回根目录
- tab：自动补全
- cls：清屏
- shutdown -s -t 毫秒值：在多少毫秒内关机
- shutdown -a ：解除自动关机


环境变量
--
- 考虑一个问题：为什么在cmd中输入node -v就能执行并且显示出版本号呢，而如果没有就报错呢。
原因是：
	- 	当输入命令行时，默认是补上bat或exe，如果找到了就执行，找不到就报错。
	- 	在这个问题中，node -v  它的查找机制是  优先从当前路径下找exe或bat，如果找不到就问环境变量中的path，在path中再找不到就报错。

- 修改path里的路径
	- 直接编辑path可以直接修改
	- 通过变量修改：可以新建一个变量，名字可以自定义，比如NODE_PATH，值就是对应的路径就是程序所在的路径，最后要让NODE_PATH与path产生关联，在path中增加一项，%NODE_PATH%，两边要加百分号。

- REPL(read-eval-print-loop)环境操作
	- 通过node启动
	- 在内部执行的都是全局的操作
	- 应用场景：测试API
	- 可以通过[1,2,3,4,5].slice和.splice通过返回值来实验

全局对象和作用域
--

> #### 全局对象

- 全局对象：
    global、process、Buffer、require、exports、module、console、__ filename、__dirname
```
console.log(process)    //描述的是当前程序运行的信息
console.log(__filename)     //当前文件的绝对路径
console.log(__dirname)      // 当前文件所在的目录
console.log(module)    //封装了当前模块的对应信息
//  因为每个模块都有自己的引入描述，每个module都是描述自己模块的信息，所以每个module比较都是false
```
- 在nodejs中global就相当于浏览器中的window,所以直接拿来用就行，不需要用global.

> #### 全局对象和伪全局对象

- 伪全局对象，每个模块单独的 ：require、exports、module、__ filename、__dirname   
伪全局对象在运行的时候所有模块各自有各自的值

- 真全局对象，所有模块通用的 ：process、console、Buffer、global   
  真全局对象在程序运行的时候，所有模块共享一个值

> #### 模块作用域

- CommonJS 是一种规范（服务端语言的规范）。定义了模块如何管理(Module)，操作文件的能力，操作数据库连接，接收处理请求的能力。
- nodejs就是按照CommonJS的规范来实现的
- Module约等于CMD，CMD的实现就是seajs

![enter image description here](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/673c2e828b376de7eaa802dc222581f93ff9cb5be4e06af8820aca0ba19643654fcba54067d2447d3f95cc58651f294e?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-14.png&size=1024)

- 在Common.js 中一个文件就是一个模块
- 一个模块声明的变量是模块（匿名函数）的作用域。相当于在一个单独的匿名作用域内的变量

```
var sa = require('./spaceA');
console.log(sa);	//spaceA
//模块内声明的变量属于模块作用域(function)
```