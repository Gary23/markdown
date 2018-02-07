---
title: 7、nodejs 的文件解析和压缩
tags: 
notebook: kkb
---

## nodejs 的文件解析和压缩

前台文件上传也是post方式。

上传文件的前台代码

```js
<form action="http://localhost:8080/upload" method="post" enctype="multipart/form-data">
    <input type="text" name="user">
    <input type="password" name="pwd">
    <input type="file" name="f1">
    <input type="submit" value="提交">
</form>
```

### 接收文件

在之前的代码中，是直接用字符串拼接的方式获取的数据，但是这种方式获取文件会有问题。

以下是读取的文本文件，所以可以正常显示出来。如果是任何非文本的文件就会乱码，所以字符串拼接的方式不能用于接收文件。

```
------WebKitFormBoundaryiD9Tk9AvzrA5GToo
Content-Disposition: form-data; name="user"

admin
------WebKitFormBoundaryiD9Tk9AvzrA5GToo
Content-Disposition: form-data; name="pwd"

123456
------WebKitFormBoundaryiD9Tk9AvzrA5GToo
Content-Disposition: form-data; name="f1"; filename="文件数据解析.txt"
Content-Type: text/plain

123aaa
------WebKitFormBoundaryiD9Tk9AvzrA5GToo--
```

上传的文件读取的都是二进制数据，二进制数据不能当做字符串拼接，也无法直接在控制台打印。所以需要将它维持在二进制状态下去操作，这里可以使用 `BUffer.concat(Array)`。

```js
// 通过数组保存每段数据，BUffer.concat() 的参数是数组
let arr = [];
request.on('data', data => {
    arr.push(data);
})
request.on('end', () => {
    let data = Buffer.concat(arr);
    // 如果是文本文件可以用 data.toString() 查看
    console.log(data);
    response.end();
})
```

### 解析数据的格式

```js
------WebKitFormBoundaryiD9Tk9AvzrA5GToo
Content-Disposition: form-data; name="user"

admin
------WebKitFormBoundaryiD9Tk9AvzrA5GToo
Content-Disposition: form-data; name="pwd"

123456
------WebKitFormBoundaryiD9Tk9AvzrA5GToo
Content-Disposition: form-data; name="f1"; filename="文件数据解析.txt"
Content-Type: text/plain

123aaa
------WebKitFormBoundaryiD9Tk9AvzrA5GToo--
```

根据上面的数据可以简化为下边的格式，现在可以来根据这个格式做一些数据解析，注意这里的 `\r\n` 代表回车。如果是文件的话会有两个描述信息。

```js
<分隔符>\r\n数据描述\r\n\r\n数据值\r\n
<分隔符>\r\n数据描述\r\n\r\n数据值\r\n
<分隔符>\r\n数据描述1\r\n数据描述2\r\n\r\n文件内容\r\n
<分隔符>--
```

### 解析数据的步骤

1. 用 `<分隔符>` 切开数据，会得到一个数组。

```js
[
    空,
    \r\n数据描述\r\n\r\n数据值\r\n,
    \r\n数据描述\r\n\r\n数据值\r\n,
    \r\n数据描述1\r\n数据描述2\r\n\r\n文件内容\r\n,
    --
]
```

2. 可以看出第一项和最后一项没有任何用处，所以丢弃数组的头尾元素。并且数组每个元素的头尾也是没有用处的，所以丢弃每一项的头尾 `\r\n`

```js
[
    数据描述\r\n\r\n数据值,
    数据描述\r\n\r\n数据值,
    数据描述1\r\n数据描述2\r\n\r\n文件内容
]
```

3. 用每一项第一次出现的 `\r\n\r\n` 切分，只用第一次是为了避免文件内容中也含有 `\r\n\r\n`。

```js
// 这里会得到如下两种格式的数组。
[
    [数据描述, 数据值],
    [数据描述, 数据值],
    [数据描述1\r\n数据描述2文件内容]
]
```

4. 通过判断描述里面有没有 `\r\n`，如果有就是文件类数据：`[数据描述1\r\n数据描述2文件内容]`，没有就是普通数据：`[数据描述, 数据值]`。

5. 分析数据描述，文件：通过 uuid 模块创建一个随机文件名并写入内容。普通数据：取出 key 和 value 。

### 解析步骤的方法

上面的解析步骤实际就是需要对Buffer数据进行三种操作。

1. 查找：`new Buffer(str).indexOf(str|Buffer)` indexOf 的参数既可以是字符串，也可以是另一个buffer

2. 截取：`new Buffer('xxxxxxx').slice(start, end)`   slice 参数是开始索引和结束索引，注意结束位置的索引是从 1 开始算而不是 0。

3. 切分：类似split，现在还不支持 split 方法，只能自己动手封装一个。

**split方法实现**

```js
Buffer.prototype.split = Buffer.prototype.split || function(b) {
    let arr = [];

    let cur = 0;
    let n = 0;
    while ( (n = this.indexOf(b, cur)) != -1 ) {
        arr.push(this.slice(cur, n));
        cur = n + b.length;
    }

    arr.push(this.slice(cur));
    
    return arr;
}
```

将这个方法命名为 common.js，在需要用到的 js 文件中引用 `const common = require('./common');`

**uuid**

uuid 也叫作 guid，这是一个东西，作用是生成一个不会重复的值，有三个版本

1. v1，时间戳，时间戳很容易重复。
2. v3，加命名空间，多台机器可以加每台机器的命名，防止时间戳冲突，但是一台机器用这个没意义。
3. v4，随机数，几乎不可能重复。这里就需要用v4

uuid 引用时需要加版本号：`const uuid = require('uuid/v4');`

### 代码实现解析步骤

```js
const http = require('http');
const common = require('./common');
const fs = require('fs');
const uuid = require('uuid/v4');

let server = http.createServer((request, response) => {
    
    let arr = [];

    request.on('data', data => {
        arr.push(data);
    })

    request.on('end', () => {
        let data = Buffer.concat(arr);  // data 是接收的全部数据
        
        let post = {};   // 存普通数据
        let file = {};   // 存文件信息
        if (request.headers['content-type']) {
            let contentType = request.headers['content-type'].split('; ')[1];
            if (contentType) {
                // boundary就是分隔数据字符
                let boundary = `--${contentType.split('=')[1]}`;

                // 第一步：用分隔数据的字符切开数据，会得到一个数组。
                let arr = data.split(boundary);

                // 第二步：所以丢弃数组的头尾元素、并且丢弃数组每一项的头尾
                arr.shift();
                arr.pop();
                arr = arr.map(item => item.slice(2, item.length - 2));

                arr.forEach(item => {
                    // 第三步：用每一项第一次出现的 `\r\n\r\n` 切分
                    let n = item.indexOf('\r\n\r\n');

                    let disposition = item.slice(0, n);
                    let content = item.slice(n + 4);
                    disposition = disposition.toString()

                    // 第四步：判断文件和普通数据
                    if (disposition.indexOf('\r\n') == -1) {
                        // 第五步：分析数据描述
                        content = content.toString();
                        let name = disposition.split('; ')[1].split('=')[1];
                        name = name.substring(1, name.length - 1);
                        post[name] = content;

                    } else {
                        // 第五步：分析数据描述
                        let [line1, line2] = disposition.split('\r\n');
                        let [, name, filename] = line1.split('; ');
                        let type = line2.split(': ')[1];

                        name = name.split('=')[1]
                        name = name.substring(1, name.length - 1);

                        filename = filename.split('=')[1]
                        filename = filename.substring(1, filename.length - 1);

                        let path = `upload/${uuid().replace(/\-/g,'')}`;      // replace可不做，只是为了取消文件名的-

                        fs.writeFile(path, content, err => {    // 写入文件
                            if (err) {
                                console.log('错误');
                            } else {
                                file[name] = [filename, type, path];    // 文件信息的json
                                console.log(file);
                                console.log('成功');
                            }
                        })
                    }
                });
            }
        }
        response.end();
    })
})

server.listen(8080);
```

现在服务器已经可以正常的接收上传的数据了，但是仍有瑕疵。

现在的问题：

1. readFile 会等所有数据都读完了才会回调，相当于所有数据全读到内存中再去回调，极其占用内存。

2. 资源利用极其不充分。应该读取一些数据就发送一些数据。而不是全部读取结束后采取发送，更好的方式是使用流，流操作就是读一点就发送一点。

### 流

流操作对资源利用比较合理。接收数据的时候会读一部分就处理一部分，不需要等文件全部接收完再去处理。

流分为三种：

1. 读取流：fs.createReadStream，request

2. 写入流：fs.createWriteStream，response

3. 读写流：一个方向读取数据另一个方向写入数据，比如：压缩、加密

**流的基本操作**

流的方向必须是从 Read 到 Write，不能反方向。

用流创建一个文件。

```js
const fs = require('fs');

let rs = fs.createReadStream('1.jpg');
let ws = fs.createWriteStream('2.jpg');

rs.pipe(ws);   // 生成一个 2.jpg 文件。

rs.on('error', function() {
    console.log('错误');
})

ws.on('finish', function() {
    console.log('完成');
})
```

用流操作 http 请求。

```js
const http = require('http');
const fs = require('fs');

let server = http.createServer((request, response) => {
    let rs = fs.createReadStream(`www${request.url}`);

    rs.pipe(response);    // 因为 request, response 也是流对象，所以可以直接将读取的 html 返回向 客户端

    rs.on('error', function() {    // 处理错误的情况
        response.writeHead(404);
        response.write('404');

        response.end();
    })
})

server.listen(8080);
```


### zlib

这里还有个小问题，就是通常我们将文件内容返回给客户端时是要压缩的，这样比较节省带宽，压缩需要用到 zlib 模块。

**基本使用**

用流创建一个文件时的压缩。

```js
const fs = require('fs');
const zlib = require('zlib');   // 引入压缩模块

let rs = fs.createReadStream('jquery.js');
// 这里因为生成的是二进制文件，所以不能直接 jquery.js
let ws = fs.createWriteStream('jquery.js.gz');
// 创建压缩流对象
let gz = zlib.createGzip();
// 先流向压缩对象，再流向写入对象。
rs.pipe(gz).pipe(ws);
```

用流操作 http 请求时进行压缩。

```js
const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

let server = http.createServer((request, response) => {
    let rs = fs.createReadStream(`www${request.url}`);
    // 告知浏览器通过 gzip 的方式解析
    response.setHeader('content-encoding', 'gzip');
    // 压缩过程
    let gz = zlib.createGzip();
    rs.pipe(gz).pipe(response);

    rs.on('error', function() {
        response.writeHead(404);
        response.write('404');

        response.end();
    })
})

server.listen(8080);
```

