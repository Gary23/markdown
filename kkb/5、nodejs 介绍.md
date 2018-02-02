---
title: 5、nodejs 介绍
tags: 
notebook: kkb
---


## nodejs 介绍

nodejs 和 js 一样都是单线程、单进程，因为性能不是 nodejs 的强项，强项是简单。性能肯定不如c或者java。nodejs 兼顾性能但是是在不增加复杂度的前提下，所以使用了非阻塞的异步交互。

### nodejs和其他语言的不同

1. nodejs的对象、语法和前台的js一模一样，只不过使用习惯不同，侧重点不同。
2. 性能还可以，和PHP比还是可以的，和c肯定没法比。主要是因为V8引擎比较快。
3. 其他语言和前台配合不如 nodejs 方便。
4. 和java比，java的库支持非常丰富，有很多靠谱的框架可以直接拿来用，nodejs 没有太多的框架可用。

### nodejs 用处

1. 可以用来做服务器，小型的项目适合，大型项目一般用来做中间层。
2. 也可以来做工具，比如构建、测试工具，比如：gulp、WebPack，还有数据抓取。
3. 爬虫，专门抓取别人网站的数据，比如新闻、帖子。

### 中间层的优点

1. 安全性
2. 增加性能
3. 为了和前台交互数据，配合方便，从后台获取数据，做一些封装，方便前台获取数据

### nodejs基本操作

1. nodejs 中只有一种文件就是 js 文件。

2. nodejs 改了代码要停止一下服务在开启才能生效。

3. 打开js文件： node xxx.js。

### nodejs 缓存的概念

第一次客户端请求某个资源只会告诉服务器需要的资源名，服务器会给几个信息并返回资源：

1. cache-control：缓存的控制权，有no-cache就是不缓存。
2. expirse：有效期，预计数据多久到期
3. date：资源的标准时间

客户端第二次及之后再次请求就会告知服务器，要获取的资源我本地有一份并高度服务器文件的日期，服务器会判断这个日期，没变过就是返回304，改变了就返回200并返回资源，服务器会配置好这个资源缓存多久。

> 服务器通常的做法是读取文件的修改日期，比较客户端给的日期，如果比客户端给的日期靠后那就说明文件已经改变。

## nodejs 的模块

nodejs 内部有很多系统模块，在官方文档有介绍。nodejs 实验中依赖模块的，对于模块的使用情况也就是对 nodejs 的掌握情况。

当然也可以引一些自定义的模块。nodejs 中通过 require 引入模块。

### http/https 模块

nodejs 搭建服务器肯定是需要遵守 http 协议，这里需要引入 http 模块。

引入后通过 createServer 方法创建一个服务，浏览器请求时会执行它的回调

```js
const http = require('http');
// 有客户端请求时就会执行回调
let server = http.createServer(() => {
	console.log('有人执行我了');
})
```

执行 `node xxx.js` 命令结束会回到输入的状态，但是服务器不应该结束，应该一直运行着，这就需要监听，通过 listen 方法创建一个端口号实现监听。

```js
server.listen(8080);
```

> **监听**：同一个服务器可以运行很多程序，每个程序会有个端口号，监听就是监听端口，来判断要访问哪个程序，端口号不能重复。默认端口号跟着协议走的：http 默认是80，ftp 默认是21，mysql 默认是3306

此时，浏览器通过 localhost:8080 就可以访问，命令行会打印 '有人执行我了'，但是浏览器会一直处于等待状态，需要通过 createServer 方法的回调给浏览器传数据。有两个参数

1. request：在客户端是发送请求，而在服务器来说是接收的意思
2. response：在客户端是响应，而在服务器来说是发送的意思，在这里需要用到的就是 response 给客户端数据

```js
let server = http.createServer((request, response) => {
	console.log('有人执行我了');
	response.write('aaa');   // 给前台发送数据
	response.end();   // 告诉客户端发送结束，这时浏览器才会断开这次连接
})
```

> 注意这个 response.end() 不能写在外面，因为 createServer 是异步操作。有浏览器访问才会执行回调的。

有个小问题，就是高级浏览器会在这里打印两次 '有人执行我了'，因为高级浏览器会去自动尝试加载favicon.icon 文件。

```js
let server = http.createServer((request, response) => {
	console.log(request.url);   // 打印 / 和 /favicon.icon
	response.write('aaa');
	response.end(); 
})
```

通过上面的打印信息很明显看出，不仅访问了 localhost:8080 根目录，还会访问 localhost:8080/favicon.ico，因为高级浏览器会默认这个图标放在根目录。


### assert 模块

assert 是断言模块，一个很实用的模块。常用的方式传两个参数

1. 第一个参数是条件，
2. 第二个参数是一段话，如果条件不为真，就打印这段话

```js
const assert = require('assert');

function sum(a, b) {
	assert(arguments.length == 2, '必须传2个参数');
	assert(typeof a == 'number' && typeof b == 'number', '参数必须为数字');

	return a + b;
}
```

```js
console.log(sum(6,10));    // 16
console.log(sum('6',10));    // 必须传2个参数
console.log(sum());    // 必须传2个参数
```

### Buffer 模块

Buffer 曾经是一个独立模块，现在应是 nodejs 本身的一部分了。

作为一个后台语言经常需要去处理二进制数据，而高级语言不适合处理二进制数据，Buffer 就是处理二进制数据用的。

### File System 模块

文件系统，就是读写文件用，可以做读文件、写文件、删文件、创建目录、遍历目录等操作。

```js
const fs = require('fs');
```

最常用的就是读文件 fs.readFile 和写文件 fs.writeFile。文件操作需要一定时间，所以肯定是异步操作。 不过 fs 模块也有同步的方式，官网可查。

**读文件**

fs.readFile有两个参数。

1. 第一个参数是文件的位置，是相对路径
2. 第二个参数是回调，回调接收2个参数，第一个是错误信息，第二个是读取成功后的文件内容，文件内容是二进制状态。

```js
fs.readFile('1.txt', (err, data) => {
    if (err) {
		console.log('文件有错误');
	} else {
		console.log(data);   // data是二进制的状态，可以直接发送给客户端
	}
})
```

`console.log(data)` 会以二进制方式打印1.txt的内容 `<Buffer 31 32 33 34 35 36>`.

`console.log(data.toString())` 会以文本的方式打印1.txt的内容 123456，但是 toString 仅限于确定是文本文件的时候才可以用，如果文件不是文本的话数据会损坏。


**写文件**

fs.writeFile 有三个参数。

1. 第一个参数是文件要存放的位置
2. 第二个参数是文件的内容
3. 第三个参数是回调，回调只接收错误信息一个参数

```js
fs.writeFile('2.txt', 'abcdefg', err => {
	if (err) {
		console.log('写入文件错误')
	} else {
		console.log('成功');
	}
})
```

### C++ Addons 模块

即想要 nodejs 的方便，还想用 C 的高性能，C++ Addons 就可以用 C 写一些插件给 nodejs 用。

### Child Processes、Clister、Process 模块

js 是单进程，单线程的语言，通过 Child Processes、Clister、Process 三个模块可以变为多进程。

### ECMAScript Modules 模块

不是真正意义上的模块，指的的 nodejs 的模块化系统，比如 require 就是 ECMAScript Modules 的功能，它不是一个单独的模块。

### Command Line Options 模块

命令行的参数，比如在终端输入命令时候想带一些参数，比如 `node xxx.js -value` 这种。这里的参数 value 就可以通过 Command Line Options 读取。

### Crypto 模块

作用是加密，从理论上说实际是签名，提供了 md5、sha1 等常用的单向散列算法。

通过 createHash 方法可以创建一个转码对象，参数就是转码的类型，比如'md5'，'sah1'等。

这个对象的 update 方法就可以实现转码，参数就是需要转码的字符串。

最后通过 digest 输出转码结果，参数是进制。

```js
const crypto = require('crypto');

// 字符串转md5，也可以额转sha1
let obj = crypto.createHash('md5');

obj.update('123456');

// 以hex十六进制的形式显示
console.log(obj.digest('hex'));   // e10adc3949ba59abbe56e057f20f883e
```

一些在线 md5 解密通常都是撞库，只要库中的内容够多，就有可能会匹配上，为了防止解密可以多套几层 md5。

```js
function md5(str) {
	let str = crypto.createHash('md5');
	obj.update(str);
	return obj.digest('hex');
}

console.log(md5(md5('123456')));    // 14e1b600b1fd579f47433b88e8d85291
```

如果仍然觉得不够安全可以再多套几层，或者在编译之后拼接一些无规则的字符串。

### OS 模块

查看机器的系统信息

```js
const os = require('os');

console.log(os.cpus());   // 因为是多核cpu，所以是 cpus 而不是 cpu。
```

### Path 模块

用于处理路径相关的内容，常用的有三个：dirname目录部分、basename文件名、extname扩展名。

```js
const path = require('path');

let str = '/var/local/aaa/1.php';   // 假设有这么一个路径

console.log(path.dirname(str));   // /var/local/aaa
console.log(path.basename(str));   // 1.php
console.log(path.extname(str));   // .php
```


### Events 模块

Events 是事件队列模块，nodejs 不具备前台那种与用户交互的事件，nodejs 的事件是数据到达、文件加载完成等。

Events 模块通常是用它的 EventEmitter 函数，监听使用 on 方法，派发使用 emit 方法。两个方法的参数是对应的。

1. 第一个参数都是自定义的事件名
2. on 的第二个参数就是一个函数，emit 从第二个参数开始就是给 on 函数传递参数，其实这里就和函数调用很相似，区别就是 Events 可以解耦。

```js
const Event = require('events').EventEmitter;
let ev = new Event();

// 1.监听（接收）
ev.on('msg', function(a, b, c) {
	console.log(`收到了事件：`, a, b, c);   // 收到了事件： 12 5 88
})
// 2. 派发（发送）
ev.emit('msg',12, 5, 88)
```

### Query String 模块

一个很有用的模块，Query String 不只是一个模块还是一个学名，指的就是 url 上 ? 之后的查询字符串。

使用 parse 方法可以直接解析成 json 格式，参数是一个字符串。

```js
const querystring = require('querystring');

let obj = querystring.parse('rsv_n=2&rsv_sug=21&rsv_sug1=16&rsv_sug7=100');

console.log(obj);
/**
{ 'rsv_n': '2',
  rsv_sug: '21',
  rsv_sug1: '16',
  rsv_sug7: '100' }
 */
```

### URL 模块

Query String 模块虽然好用，但实际上 URL 模块更常用一些。因为 Query String 只能解析 ? 后面的字符串，而 URL 可以解析整个 URL。

同样是用 parse 方法，有两个参数。

1. 第一个参数是要解析的字符串
2. 第二个方法是个布尔值，为 true 时则代表也解析 Query String 为 json，默认是 false，Query String 是字符串。

```js
const url = require('url');

let obj = url.parse('http://www.gary23.cn:8080?rsv_n=2&rsv_sug=21&rsv_sug1=16&rsv_sug7=100', true);

console.log(obj);
/**
Url {
	protocol: 'http:',
	slashes: true,
	auth: null,
	host: 'www.gary23.cn:8080',
	port: '8080',
	hostname: 'www.gary23.cn',
	hash: null,
	search: '?rsv_n=2&rsv_sug=21&rsv_sug1=16&rsv_sug7=100',
	query: { rsv_n: '2', rsv_sug: '21', rsv_sug1: '16', rsv_sug7: '100' },
	pathname: '/',
	path: '/?rsv_n=2&rsv_sug=21&rsv_sug1=16&rsv_sug7=100',
    href: 'http://www.gary23.cn:8080/?rsv_n=2&rsv_sug=21&rsv_sug1=16&rsv_sug7=100'
}
 */
```

其中 query 这个属性中的值和 Query String 解析后是一样的。

### Net 模块

是 nodejs 实现 TCP 的模块

### UDP/Datagram

是 nodejs 实现 UDP 的模块

### DNS 模块

域名解析操作的模块。通过 resolve 方法可以得到一个域名的 IP 地址，有2个参数。

1. 要解析的域名
2. 回调函数，接收错误信息和解析后的 IP，这里 IP 是一个数组，因为一个域名可能绑定多个 IP。

```js
const dns = require('dns');

dns.resolve('www.baidu.com', (err, res) => {
	if (err) {
		console.log('解析失败');
	} else {
		console.log(res);   //[ '61.135.169.121', '61.135.169.125' ]
	}
})
```

> DNS 的工作原理：客户端输入 www.baidu.com ，通过 DNS 协议会解析为一个 IP 地址然后才能连接到百度的服务器，而这个 IP 是一种根服务器来解析后返回给客户端的，其实就是一个很大的数据库，保存每个域名对应的 IP。

### Stream 模块

Stream 是一种流操作，只要是连续的数据都叫做流，比如视频流、音频流、文件流、语音流。


### TLS/SSL 模块

用于加密、安全，http 就是靠 SSL 才称为 https。

### ZLIB 模块

用于压缩操作。