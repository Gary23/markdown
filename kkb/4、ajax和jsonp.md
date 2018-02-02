---
title: 4、ajax和jsonp
tags: 
notebook: kkb
---

## ajax

### 状态码

**readyState 状态码**

- 0  new XMLHttpRequest的时候
- 1  open的时候
- 2  已发送
- 3  已接收-http的header
- 4  已接收-http的body

**Status（http状态码）**

浏览器和服务器是通过数字表达状态。

- 1xx  消息
- 2xx  成功
- 3xx  重定向，比如`baidu.com`会定向到`www.baidu.com`
    a. 301：永久重定向，浏览器永远不会再次请求旧的地址，永久重定向不可控，很危险，修改困难
    b. 302：临时重定向，浏览器下次还会请求这个旧的地址，基本用的都是临时重定向
    c. 304：没有修改过，其实也就是重定向到硬盘，也就是缓存的意思
- 4xx  请求错误（错在客户端）
- 5xx  服务端错误
- 6xx  扩展，可以自定义

> 所谓缓存，客户端并不是直接从硬盘中获取，客户端依然会向服务器发送请求，并且会告诉服务器上次获取这个文件的时间，服务器会判断这个时间之后这个文件是否更新，如果更新了传个新的，如果没有更新就返回304，客户端从硬盘中获取。

### Content-Type

Content-Type 是 ajax 模拟的表单和真实表单的区别之处。

Content-Type 是内容类型，这里声明的是什么，服务器就会按照什么解析数据，也就是在表单中的 enctype 属性

Content-Type 的三种类型：

1. text/plain：提交的是纯文本，后台接收后不要求解析，基本用不着。
2. application/x-www-form-urlencoded：这是这一种特殊编码的类型，urlencoded 这种类型就是 key=value&key=value 这种格式。通常数据都是这种格式上传。
3. multipart/form-data：定界符分隔各个数据，适用于文件上传

ajax在这里要模拟表单提交，所以就要写成和表单一样

### 内部怎么写

```js
function ajax(options) {
    if (!options.url) { return false };
    options.data = options.data || {};
    options.dataType = options.dataType || 'text';

    let arr = [];
    for (key in options.data) {
        arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(options.data[key])}`);
    }
    let strData = arr.join('&');

    let xhr = new XMLHttpRequest();
    if (options.type == 'get') {
        xhr.open('GET', options.url + '?' + strData, true); // false是同步，如果设置成同步，浏览器会给警告，浏览器会阻止使用同步
        xhr.send();
    } else {
        xhr.open('POST', options.url, true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(strData);
        
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                let data = xhr.responseText;
                switch (options.dataType) {
                    case 'json':
                        if (window.JSON && JSON.parse) {
                            data = JSON.parse(data);
                        } else {
                            data = eval('(' + str + ')');
                        }
                        break;
                    case 'xml':
                        data = xhr.responseXML;
                        break;
                }
                options.success && options.success(data);
            } else {
                options.error && options.error(xhr);
            }
        }
    }
}
```

调用上面的函数：

```js
ajax({
    url: '1.php',
    data: {a:12,b:13},
    dataType: 'text',
    type: 'get',
    success: function(str) {
        console.log(str);
    },
    error: function() {
        alert('error')
    }
});
```

> XMLHttpRequest 对象只支持高级浏览器，`var xhr = new ActiveXObject('Microsoft.XMLHttp');` 这是兼容IE6的写法，不过现在不太用兼容IE6了。

```php
<?php
    echo $_GET['a'] + $_GET['b'];
?>
```

## jsonp

jsonp 通常是用来跨域，这种方式以后会越用越少，因为过于开放，安全性有问题。用 ajax 的 cors 跨域是更好的方式。

jsonp 的本质：

```js
<input type="text" name="" id="txt">
<ul id="result"></ul>

<script>
    // 接收到结果后处理的回调函数
    function show(json) {
        let list = document.querySelector('#result');
        list.innerHTML = '';
        json.s.map(item => {
            let oli = document.createElement('li');
            oli.innerHTML = item;
            list.appendChild(oli);
        })
    }
    // 动态创建script标签，请求搜索的文字
    window.onload = function() {
        let input = document.querySelector('#txt');

        input.oninput = function() {
            let oS = document.createElement('script');
            oS.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${encodeURIComponent(this.value)}&cb=show`;
            document.head.appendChild(oS);
        }
    }
</script>
```

jsonp的本质就是提前准好一个回调函数，创建一个 script 请求对方的 url，等着对方来调用回调函数并传参数。