
---

title: Cookie基础
date: 2017-09-20 11:39:48
tags: 后台相关

---

## Cookie的原理

服务器记录用户上次的登录信息，服务器需要一个类似橱柜的空间存储，橱柜的每个区域要通过钥匙才能打开。

钥匙存储在用户的计算机上，要取信息相当于拿着钥匙去访问服务器。钥匙上有个id号，通过这个id号就知道是哪个柜子的钥匙，这样就能拿到柜子里面的数据。

用户手上的这把钥匙就叫做Cookie。

我们需要Cookie的原因是http协议是一种无状态的协议，服务器从网络连接上无法获知用户身份，那就只能给每个用户一把钥匙。

session就是保存用户数据的橱柜，保存在服务端。要记录用户登录的状态信息，也就是存储在session。

## Cookie的过程

1. 浏览器发送了一个请求，这个过程中做了一个封装请求报文。转成二进制，通过tcp协议传输层传输给服务器。

2. 在服务器解析，将二进制数据转换请求报文。通过url和请求方式做对应处理。

3. 中间件是架设在一次请求与相应之间做的事情。请求过来之后session是接收请求后，将响应做了加工。在响应头添加了一个字段set-cookie: ......  。客户端会接受到相应的响应报文。

4. 客户端浏览器在接收到set-cookie的时候会在客户端生成一个文件，里面的内容是connect.sid=.........。本次连接结束。

5. 这个sid就代表了橱柜的id值。再一次访问，浏览器会根据域来找到对应的cookie，把内容加入请求头。

6. 带着cookie去访问网页，就可以用cookie带着的sid去找到存在网站的相应的session信息。

7. cookie是一个技术。session是基于该技术，通过connect.sid找到对应的数据


## 查看某个网站颁发的Cookie

在Console中输入JavaScript:alert (document. cookie)就可以了（需要有网才能查看）。

JavaScript浏览器会弹出一个对话框显示本网站颁发的所有Cookie的内容。

## Cookie的所有属性

**String name**
该Cookie的名称。Cookie一旦创建，名称便不可更改

**Object value**
该Cookie的值。如果值为Unicode字符，需要为字符编码。如果值为二进制数据，则需要使用BASE64编码

**int maxAge**
该Cookie失效的时间，单位秒。如果为正数，则该Cookie在maxAge秒之后失效。如果为负数，该Cookie为临时Cookie，关闭浏览器即失效，浏览器也不会以任何形式保存该Cookie。如果为0，表示删除该Cookie。默认为–1

**boolean secure**
该Cookie是否仅被使用安全协议传输。安全协议。安全协议有HTTPS，SSL等，在网络上传输数据之前先将数据加密。默认为false

**String path**
该Cookie的使用路径。如果设置为“/sessionWeb/”，则只有contextPath为“/sessionWeb”的程序可以访问该Cookie。如果设置为“/”，则本域名下contextPath都可以访问该Cookie。注意最后一个字符必须为“/”

**String domain**
可以访问该Cookie的域名。如果设置为“.google.com”，则所有以“google.com”结尾的域名都可以访问该Cookie。注意第一个字符必须为“.”

**String comment**
该Cookie的用处说明。浏览器显示Cookie信息的时候显示该说明

**int version**
该Cookie使用的版本号。0表示遵循Netscape的Cookie规范，1表示遵循W3C的RFC 2109规范

## Cookie的有效期

Cookie的 `maxAge` 决定着Cookie的有效期，单位为秒（Second）。Cookie中通过`getMaxAge()` 方法与 `setMaxAge(int maxAge)` 方法来读写maxAge属性。

如果 `maxAge` 属性为正数，则表示该Cookie会在 `maxAge` 秒之后自动失效。浏览器会将 `maxAge` 为正数的Cookie持久化，即写到对应的Cookie文件中。无论客户关闭了浏览器还是电脑，只要还在 `maxAge` 秒之前，登录网站时该Cookie仍然有效。下面代码中的Cookie信息将永远有效。

```js
Cookie cookie = new Cookie("username","helloweenvsfei");   // 新建Cookie
cookie.setMaxAge(Integer.MAX_VALUE);    // 设置生命周期为MAX_VALUE
response.addCookie(cookie);    // 输出到客户端
```

如果 `maxAge` 为负数，则表示该Cookie仅在本浏览器窗口以及本窗口打开的子窗口内有效，关闭窗口后该Cookie即失效。`maxAge` 为负数的Cookie，为临时性Cookie，不会被持久化，不会被写到Cookie文件中。Cookie信息保存在浏览器内存中，因此关闭浏览器该Cookie就消失了。Cookie默认的 `maxAge` 值为–1。

如果 `maxAge` 为0，则表示删除该Cookie。Cookie机制没有提供删除Cookie的方法，因此通过设置该Cookie即时失效实现删除Cookie的效果。失效的Cookie会被浏览器从Cookie文件或者内存中删除。

```js
Cookie cookie = new Cookie("username","helloweenvsfei");   // 新建Cookie
cookie.setMaxAge(0);   // 设置生命周期为0，不能为负数
response.addCookie(cookie);   // 必须执行这一句
```

## Cookie的修改、删除

Cookie并不提供修改、删除操作。如果要修改某个Cookie，只需要新建一个同名的Cookie，添加到response中覆盖原来的Cookie。

如果要删除某个Cookie，只需要新建一个同名的Cookie，并将maxAge设置为0，并添加到response中覆盖原来的Cookie。注意是0而不是负数。负数代表其他的意义。读者可以通过上例的程序进行验证，设置不同的属性。

## Cookie的域名

Domain就是域，根据域来选择相应Cookie，域Domain的值是网站的地址。

Cookie具有不可跨域名性。根据Cookie规范，浏览器访问Google只会携带Google的Cookie，而不会携带Baidu的Cookie。Google也只能操作Google的Cookie，而不能操作Baidu的Cookie。

浏览器判断一个网站是否能操作另一个网站Cookie的依据是域名。Google与Baidu的域名不一样，因此Google不能操作Baidu的Cookie

正常情况下，同一个一级域名下的两个二级域名如www.google.com和images.google.com也不能交互使用Cookie，因为二者的域名并不严格相同。如果想所有google.com名下的二级域名都可以使用该Cookie，需要设置Cookie的domain参数，例如：

```js
Cookie cookie = new Cookie("time","20080808"); // 新建Cookie
cookie.setDomain(".helloweenvsfei.com");  // 设置域名
cookie.setPath("/");  // 设置路径
cookie.setMaxAge(Integer.MAX_VALUE);  // 设置有效期
response.addCookie(cookie);   // 输出到客户端
```

## Cookie的路径

Domain属性决定运行访问Cookie的域名，而path属性决定允许访问Cookie的路径（ContextPath）。例如，如果只允许/sessionWeb/下的程序使用Cookie，可以这么写：

```js
Cookie cookie = new Cookie("time","20080808");  // 新建Cookie
cookie.setPath("/session/");  // 设置路径
response.addCookie(cookie);   // 输出到客户端
```

设置为“/”时允许所有路径使用Cookie。path属性需要使用符号“/”结尾。name相同但domain相同的两个Cookie也是两个不同的Cookie。

注意：页面只能获取它属于的Path的Cookie。例如/session/test/a.jsp不能获取到路径为/session/abc/的Cookie。使用时一定要注意。
     
## Cookie的安全属性

HTTP协议不仅是无状态的，而且是不安全的。使用HTTP协议的数据不经过任何加密就直接在网络上传播，有被截获的可能。

使用HTTP协议传输很机密的内容是一种隐患。如果不希望Cookie在HTTP等非安全协议中传输，可以设置Cookie的secure属性为true。浏览器只会在HTTPS和SSL等安全协议中传输此类Cookie。下面的代码设置secure属性为true：

```js
Cookie cookie = new Cookie("time", "20080808"); // 新建Cookie
cookie.setSecure(true);   // 设置安全属性
response.addCookie(cookie);  // 输出到客户端
```

提示：secure属性并不能对Cookie内容加密，因而不能保证绝对的安全性。如果需要高安全性，需要在程序中对Cookie内容加密、解密，以防泄密
    
## JavaScript操作Cookie

Cookie是保存在浏览器端的，因此浏览器具有操作Cookie的先决条件。浏览器可以使用脚本程序如JavaScript或者VBScript等操作Cookie。

这里以JavaScript为例介绍常用的Cookie操作。例如下面的代码会输出本页面所有的Cookie。

```js
<script>document.write(document.cookie);</script>
```

由于JavaScript能够任意地读写Cookie，有些好事者便想使用JavaScript程序去窥探用户在其他网站的Cookie。不过这是徒劳的，W3C组织早就意识到JavaScript对Cookie的读写所带来的安全隐患并加以防备了，W3C标准的浏览器会阻止。

JavaScript读写任何不属于自己网站的Cookie。换句话说，A网站的JavaScript程序读写B网站的Cookie不会有任何结果。
    
    
    



















