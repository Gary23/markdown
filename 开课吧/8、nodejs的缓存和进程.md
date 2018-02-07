---
title: 8、nodejs的缓存和进程
tags: 
notebook: kkb
---

## nodejs 的缓存

### 缓存涉及到的头信息

1. 第一次请求时，服务器会给客户端返回 Last-Modified，就是这个请求文件的修改日期。只有服务器反回了这个信息，下一次客户端请求才会带有 If-Modified-Since 信息。

2. 第二次的请求头多了三个项目 Cache-Control、If-Modified-Since(主要作用：通知服务器这个请求文件的修改日期，以此让服务器判断这个文件在这个日期后是否有所修改。)、If-None-Match。

3. 第二次响应头只要发一个304和基本的一些通用信息就可以。

### 在服务端获取文件修改日期

需要用到 fs 模块的 stat 方法，有两个参数：

1. 文件的相对路径。

2. 回调函数，第一个参数是失败信息，第二个参数是文件的信息。

```js
const fs = require('fs');

fs.stat(`www/1.html`, (err, stat) => {
    if (err) {
        console.log('获取文件信息失败');
    } else {
        console.log(stat);
    }
})
```

最终打印的文件的信息如下：

```js
Stats {
  dev: 1354579079,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: undefined,
  ino: 28147497671105668,
  size: 282,
  blocks: undefined,
  atimeMs: 1517228763135,
  mtimeMs: 1517228975481,
  ctimeMs: 1517228975482.1638,
  birthtimeMs: 1517228752364.605,
  atime: 2018-01-29T12:26:03.135Z,
  mtime: 2018-01-29T12:29:35.481Z,
  ctime: 2018-01-29T12:29:35.482Z,
  birthtime: 2018-01-29T12:25:52.365Z
}
```

有关于时间的属性就是 atime、mtime、ctime。这三个都是 Date 对象。其中 mtime 就是文件的修改时间。

通过 `stat.mtime.toGMTString()` 方法将时间转为格林尼治的格式 `Mon, 29 Jan 2018 12:29:35 GMT` 才可以在头信息里使用。

### 缓存实现代码

给客户端返回304的逻辑如下：

1. 使用 fs.stat() 方法，读取文件，一下逻辑都写在读取文件后的回调里。

2. 判断客户端的请求头是否有 If-Modified-Since 信息。没有则是第一次请求，立即返回文件。

3. 如果有 If-Modified-Since 信息则判断客户端文件修改时间和服务器文件修改时间，若后者大于前者，则文件有更新，立即返回文件给客户端，若后者小于等于前者则返回304信息。

```js
const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((request, response) => {
    let {pathname} = url.parse(request.url);

    fs.stat(`www${pathname}`, (err, stat) => {
        if (err) {
            response.writeHead(404);
            response.write('Not Found');
            response.end();
        } else {
            // 判断客户端的请求有没有 If-Modified-Since，没有的话就是第一次请求文件
            if (request.headers['if-modified-since']) {
                // 获取服务器和客户端的文件的修改时间
                let oDate = new Date(request.headers['if-modified-since']);
                let time_client = Math.floor(oDate.getTime() / 1000);
                let time_server = Math.floor(stat.mtime.getTime() / 1000);

                // 如果服务器时间比客户端时间大，就需要更新
                if (time_server > time_client) {
                    // 更新文件给客户端和第一次返回是一样的
                    sendFileToClient();
                } else {
                    response.writeHead(304);
                    response.write('Not Midified');
                    response.end();
                }
            } else {
                sendFileToClient();
            }

            function sendFileToClient() {
                let rs = fs.createReadStream(`www${pathname}`);

                let mtime = stat.mtime.toGMTString();
                response.setHeader('last-modified', mtime);

                rs.pipe(response);
            
                rs.on('error', err => {
                    response.writeHead(404);
                    response.write('Not Found');
                    response.end();
                })
            }
        }
    })
}).listen(8080);
```

第一次请求会按照文件实际大小将其返回

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/9f8b621b73fff6944852480b6b38536c71bf7508405bcd86cc3af8425498ab816be3e414680af49dd53451c8006ae2cf?pictype=scale&from=30113&version=2.0.0.2&uin=406490508&fname=20180130-1.PNG&size=1024)

当第二次之后再去请求，如果文件没有变化，则只会返回 http 信息的大小，文件本身会直接从客户端硬盘中获取，极大节约了网络带宽。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/cc82a7ca3577d437508e63b11491ec2ce91b24f297191f21fac69b86cf94b4b6d527647ad2b23c8989b976bbf07c7cdd?pictype=scale&from=30113&version=2.0.0.2&uin=406490508&fname=20180130-2.PNG&size=1024)


### 缓存策略

在缓存的领域，缓存策略是要比缓存实现更重要的东西，有些隐私的东西不能去缓存，比如银行卡信息等。是否需要缓存是服务器可以告诉客户端的，通过 Cache-Control 实现。 expires 则可以设置缓存的时效。

## nodejs 的多进程

### 什么是进程

一个程序中可以有很多个进程，第一个启动的就是主进程，主进程结束了程序就结束了。所以主进程需要保护，只是做简单的工资，就是派生子进程，子进程才负责干活。子进程的数量和cpu的核心数相同即可，开多了并没有用。

主进程也叫守护进程，子进程也叫作工作进程。

### 什么是线程

一个进程也有很多线程，第一个开启的线程就叫主线程，主线程结束进程就这结束了

### 进程和线程的区别

- 进程：进程之间严格隔离；成本高、速度慢（每开一个新的进程需要创建一个新的空间）；安全（进程之间隔离，互不影响）；通信麻烦，写代码简单。性能略高（充分的利用了cpu资源）。

- 线程：线程间共享空间和代码；成本低、速度快（共享空间，不需要创建）；不安全（一个进程死了，内部线程就都死了）；通信相对简单（因为在一个空间中），写代码复杂。

### 多进程的奇怪特点

1. 普通程序不能创建进程，只有系统进程才能创建进程。

2. 进程是分裂出来的，只有主进程能分裂。

3. 分裂出来的两个进程，执行的是同一套代码。

4. 父子进程之间，可以共享句柄（对资源的占用，端口号就是一个句柄，所以它们共享一个端口号）。

### 多进程的操作

实现多进程需要用到 cluster 模块，首先需要引入 `const cluster = require('cluster');` ，执行 `cluster.fork();` 即可分裂出其他进程，但是只有主进程才可以分裂，所以需要 `cluster.isMaster` 判断。

另外前面说过子进程的数量和cpu核心数相同即可，所以需要引入 os 模块查看cpu核心数，通过 `os.cpus().length` 方法。

查看进程的信息需要引入 process 模块，这里只需要查看pid。

```js
const cluster = require('cluster');
const os = require('os');
const http = require('http');
const process = require('process');

if (cluster.isMaster) {   // cluster.isMaster 是个布尔值
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();    // 创建和cpu核心数相同数量的子进程
    }
    console.log('主进程');   // 打印一遍
} else {
    console.log('子进程');   // 打印四遍，而且都是8080端口，
    http.createServer((request, response) => {
        console.log(process.pid);   // 打印当前使用的进程的pid
        response.write('aaa');
        response.end();
    }).listen(8080);
}
```

从上面打印 process.pid 可以看出，只有第一个进程满了之后才会开启第二个进程，以此类推，这是因为进程频繁切换开销大，这就是进程的调度问题。












