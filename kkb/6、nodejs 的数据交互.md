---
title: 6、nodejs 的数据交互
tags: 
notebook: kkb
---

## nodejs 的数据交互

给客户端返回状态码：response.writeHead(404);

### nodejs 服务器的基本搭建

这里用之前介绍的 http 模块额 fs 模块搭建一个基本的框架例子。

```js
const http = require('http');
const fs = require('fs');

let server = http.createServer((request, response) => {
    // readFile 的第一个参数是相对路径
    fs.readFile(`www${request.url}`, (err,data) => {
        if (err) {
            response.writeHead(404);   // 返回状态码
            response.write('Not Found');
        } else {
            response.write(data);
        }
        response.end();
    })
})

server.listen(8080);
```

这个只是一个简单的例子，下面会搭建一个相对来说功能更全一些的数据交互的实例。

### nodejs 接收数据方式

在 nodejs 中处理 get 和 post 数据的方式是不同的，假设html中以表单的方式提交数据

```html
<form action="http://localhost:8080/aaa" method="get">   // post例子中记得这里要改
    用户：<input type="text" name="user"><br>
    密码：<input type="password" name="pwd"><br>
    <input type="submit" value="提交">
</form>
```

#### get方式

通过 request.url 就可以获取到 get 数据 

```js
// /aaa?user=admin&pwd=123456
console.log(request.url);
```

那么现在只需要解析 url 上的参数即可，首先引入url模块，使用 parse 解析获取的 url。

```js
let {pathname, query} = url.parse(request.url, true);
console.log(pathname);   // /aaa
console.log(query);    // { user: 'admin', pwd: '123456' }
```

#### post

post 数据比较大，所以一般会将数据包切成一堆小包，原因有两点

1. 方便所有数据，防止因为一个数据太大导致其他数据不能传输
2. 容错更好，如果一个文件损坏了很难定位，如果切割成小包则只发送失败的这个包就行

这里需要 request 的 on 方法来监听事件，需要 data（一段数据到达）事件 和 end（数据传输结束） 事件。

处理post数据还需要引入 querystring 模块，用于解析数据。

```js
let str = "";
// 有一段数据到达了
request.on('data', data => {
    str += data;
})

// 结束了
request.on('end', () => {
    let post = querystring.parse(str);
    // user=admin&pwd=12456 { user: 'admin', pwd: '12456' }
    console.log(str, post);
})
response.end();
```

> 另外，get提交和post提交是可以并存的，post提交时也可以在url上拼接数据，后台可以都接收到。

### 接口

对于服务器来说最核心的部分是数据库。数据库的安全性很重要。

前台需要数据库的数据，但是不能直接访问，因为前台没有安全性。这时就需要中间的接口来帮助前台获取数据库的数据。现在通过一个最基础的用户注册和登录的例子，看一下基础的接口写法

首先需要定一下接口，接口确定后，就按照这个信息在前台发送请求。

**用户注册**

- /reg?user=xxx&pwd=xxx
- => {err: 0, msg: '说明'}

**用户登录**

- /login?user=xxx&pwd=xxx
- => {err: 0, msg: '说明'}

定好接口后，可以开始写后台逻辑，对于后台来说一切来自前台的数据都不可信，要过滤掉所有可能出问题的可能，不能犯懒。

```js
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

let users = {};    // 暂存登录注册数据用

let server = http.createServer((request, response) => {
    // get
    let {pathname, query} = url.parse(request.url, true);
    // post
    let str = '';
    request.on('data', data => {
        str += data;
    });

    request.on('end', () => {
        let post = querystring.parse(str);
        // 所有东西要写在这里，在这里才能保证数据接收完了
        let {user, pwd} = query['user']?query:post;
        switch (pathname) {
            case '/reg':    // 注册
                if (!user) {
                    response.write('{"err": "1", "msg": "必须填写用户名"}');
                } else if (!pwd) {
                    response.write('{"err": "1", "msg": "必须填写密码"}');
                } else if (!/^\w{8,32}$/.test(user)) {
                    response.write('{"err": "1", "msg": "用户名非法"}');
                } else if (/'|"/g.test(pwd)) {
                    response.write('{"err": "1", "msg": "密码非法"}');
                } else if (users[user]) {
                    response.write('{"err": "1", "msg": "用户名已被占用"}');
                } else {
                    users[user] = pwd
                    response.write('{"err": "0", "msg": "注册成功"}');
                }
                response.end();
                break;
            case '/login':     // 登录
                if (!user) {
                    response.write('{"err": "1", "msg": "必须填写用户名"}');
                } else if (!pwd) {
                    response.write('{"err": "1", "msg": "必须填写密码"}');
                } else if (!/^\w{8,32}$/.test(user)) {
                    response.write('{"err": "1", "msg": "用户名非法"}');
                } else if (/'|"/g.test(pwd)) {
                    response.write('{"err": "1", "msg": "密码非法"}');
                } else if (!users[user]) {
                    response.write('{"err": "1", "msg": "用户不存在"}');
                } else if (users[user] != pwd) {
                    response.write('{"err": "1", "msg": "用户名或密码错误"}');
                } else {
                    response.write('{"err": "0", "msg": "登录成功"}');
                }
                response.end();
                break;
            default:       // 文件
                fs.readFile(`www${pathname}`, (err,data) => {
                    if (err) {
                        response.writeHead(404);
                        response.write('Not Found');
                    } else {
                        response.write(data);
                    }
                    response.end();
                })
        }
    })
})

server.listen(8080);

```

后台逻辑写完之后，就开始写前台部分，这里认为直接默认引入 jQuery。这里因为主要是侧重了解接口，所以前台没有对数据做判断，但实际中前台虽然没有安全性但也要进行数据校验，这纯粹是为了用户体验，后台才是为了安全。

```html
用户：<input type="text" name="user" id="user"><br>
密码：<input type="password" name="pwd" id="pwd"><br>
<input type="submit" value="注册" id="reg">
<input type="submit" value="登录" id="login">

<script>
$(function() {
    function valiData(url, type, dataType, data) {
        $.ajax({
            url: url,
            type: type || 'get',
            data: data || {},
            dataType: dataType || 'text',
            success: function(data) {
                if (data.err) {
                    alert(`错误：${data.msg}`);
                } else {
                    alert(`成功：${data.msg}`);
                }
            },
            error: function() {
                alert('错误')
            }
        })
    }


    $('#reg').click(function() {
        valiData('/reg','post', 'json', {
            user: $('#user').val(),
            pwd: $('#pwd').val()
        });
    })

    $('#login').click(function() {
        valiData('/login','post','json', {
            user: $('#user').val(),
            pwd: $('#pwd').val()
        });
    })
})
    
</script>
```