
`XMLHttpRequest`对象是Ajax的核心，它有许多的属性、方法和事件以便于js处理和控制HTTP的请求与响应。

## readyState属性

当一个XMLHttpRequest被创建后，通过readyState属性可以查看此次请求的状态。


值 | 说明
---|---
0 | 初始化状态：此时，已经创建了一个`XMLHttpRequest`对象，但是没有初始化。
1 | 准备发送状态：已经调用了`open()`方法，并且`XMLHttpRequest`对象已经准备好将一个请求发送到服务器。
2 | 已发送状态：已经通过`send()`方法把一个请求发送到服务器端。
3 | 正在接受状态：已经接到HTTP的响应头部信息，但是消息体部分还没有完全接收到。
4 | 完成响应状态：已经完成了`HttpResponse`响应的接收。

## responseText属性

包含客户端接收到的HTTP响应的文本内容。`readyState`为0、1、2时是一个空字符串，`readyState`为3时响应中包含客户端还未完成的响应信息，`readyState`为4时才是完整的信息。

## responseXML属性

只有当`readyState`为4时，并且响应头部的Content-Type的MIME类型被指定为XML(text/xml)时，该属性才会有值并且被解析为一个XML文档。

## status属性

描述了HTTP的状态码，只有在`readyState`为3或者4时才可以使用该属性，否则会报错。

## statusText属性

和上面相同，只是描述了HTTP的状态码文本，而不只是状态码。

## open()方法

`XMLHttpRequest`对象是通过调用`open()`方法来进行初始化工作的。调用该方法将得到一个可以用来进行发送的对象。

该方法有五个参数 `open(method,uri,async,username,password)`。

1. `method`：该参数是必须提供的，用于确定`GET`发送还是`POST`发送，该参数要大写。

2. `uri`：用于指定`XMLHttpRequest`对象把请求发送到的服务器相应的URI。

3. `async`：用于指定是否请求是异步的，默认值是`true`，发送同步请求需要设置为`false`。

4. 如果服务器要验证访问用户的情况，那么可以设置`username`及`password`。


## send()

调用`send()`方法可以将`open()`方法设定的参数请求进行发送。`send()`方法在`readyState`属性值为1时，即是在`open()`之后才可以调用。

`send()`的参数可以作为POST方式发送的参数，在调用`send()`之前，先使用`setRequestHeader()`方法设置`Content-Type`的头部。


## abort()方法

该方法可以暂停一个`HttpRequest`的请求发送或者`HttpResponse`的接收，并将`XMLHttpRequest`设置为初始化状态。

## setRequestHeader()方法

用来设置头部信息，当`readyState`属性值为1时，可以在调用`open()`方法后调用这个方法，该方法的格式为：`setRequestHeader(header, value)`。    
                                                                                                                                                                      
## getRequestHeader()方法

检索响应的头部值，仅当`readyState`值为3或者4时才可以调用这个方法，否则会返回一个空字符串。
