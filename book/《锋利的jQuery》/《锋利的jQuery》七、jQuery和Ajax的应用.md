
---

title: 《锋利的jQuery》七、jQuery和Ajax的应用
date: 2017-07-23 22:48:00
tags: 《锋利的jQuery》

---

在jQuery中对Ajax进行了封装，在jQuery中`$.ajax()`属于最底层方法，第二层是`$.post()`、`load()`、`$.get()`方法，第三层是`$.getScript()`和`$.getJson()`方法。通常第二层的方法使用频率最高。

## load()方法

`load()`方法能载入远程html页面到dom中。

格式为：`load( url , [data] , [callback] )`

url：请求html页面的地址。

data: 可选参数，发送至服务器的数据。

callback：可选参数，请求完成后的回调，不论请求成功或者失败。

### 载入html文档

假设有一个test.html的页面，那么只需要这样写就能引入这个test到当前页面。

当前页面的html部分
```html
<div id=""resText></div>
```
当前页面发送请求

```js
$('#resText').load('text.html');
```

### 筛选载入html文档

上面是将test.html的所有内容都加载进来，如果只需要加载一部分那么只需要改变url参数即可，格式为：`url selector`。

只将test.html页面中类名为`.para`的元素加载进来。

```js
$('#resText').load('text.html .para')
```

### 回调函数

`load()`的回调有三个参数，分别是：

responseText：请求返回的内容。

textStatus：请求状态：success、error、notmodified、timeout 四种。

XMLHttpRequest： XMLHttpRequest对象。

## $.get()和$.post()方法

使用get的方式进行异步请求，格式为：`$.get( url , [data] , [callback] , [type] )`。

url：请求的文件地址。

data：可选参数，发送至服务器的数据，会附加到url地址中。

callback：可选参数，载入成功时回调函数，只有当Response返回的状态是success才能调用。

type：可选参数，服务器返回的格式，包括 xml、html、script、json、text、_default。

### 回调函数

回调函数只有当数据成功返回(success)才能被调用，这点和`load()`方法不同，回调函数有两个参数，分别是`data`、`textStatus`。

`data`是成功后返回的数据，`textStatus`是请求状态。

## $.getScript()和$.getJson()方法

`$.getScript()`用于加载一个新的js文件，和写一个`<script>`标签的效果是一样的，但因为在页面初次加载时就取得所有js文件是没有必要的，所以就需要这个方法。

`$.getScript()`的第一个参数是js文件的地址，第二个参数是回调函数，回调只会在js文件成功加载后才会运行。

`$.getJson()`用于获取json文件，使用方法和`$.getScript()`相同。只是在回调函数中可用一个参数来获取json的内容。

## $.ajax()方法

`$.ajax()`是jQuery最底层的ajax实现，上面的所有方法都可以用这个方法代替。

`$.ajax()`的参数是一个对象，对象中的每个参数都是可选的，具体的参数如下：


| 参数名称 | 类型 | 说明 |
|---|---|---|
| url | string | 默认是当前页面，发送请求的地址 |
| type | string | 请求方式，默认为get方式 |
| timeout | number | 设置请求超时的时间，单位是毫秒 |
| data | object或string | 发送到服务器的数据 |
| dataType | string | 预期服务器返回的数据类型，如果不指定，jQuery将自动根绝http的MIME信息返回responseXML或responseText，可选择的格式有：xml(xml文档)、html(纯html文本，包含的script标签会在插入dom时执行)、script(返回纯文本js代码，不会自动缓存结果，如果是跨域请求，则post方式都会转为get方式)、json(返回json数据)、jsonp(跨域获取数据，使用jsonp形式调用函数时，url地址的最后一个参数名是callback，值是?，这个?将由jQuery替换为正确的函数名，用以执行回调函数)、text(纯文本) |
| beforeSend | function | 发送请求前可以更改XMLHttpRequest对象的函数，例如添加自定义http头，在beforeSend中返回false可以取消本次ajax的请求，改函数的唯一参数就是XMLHttpRequest对象，this是本次ajax请求时传递的options参数 |
| complete | function | 请求完成后调用的回调函数，失败和成功都会调用，第一个参数是XMLHttpRequest对象，第二个参数是描述成功请求类型的字符串，this是本次ajax请求时传递的options参数 |
| success | function | 请求成功后的回调函数，第一个参数是返回的数据，第二个参数是描述状态的字符串，this是本次ajax请求时传递的options参数 |
| error | function | 请求失败时调用的函数，第一个参数是XMLHttpRequest对象，第二个参数是错误信息，第三个参数是捕获的错误对象，this是本次ajax请求时传递的options参数 |
| global | boolean | 默认为true，表示是否触发全局ajax事件，设置为false将不会触发。 |


> 需要注意的是，如果将传递给服务器的数据使用字符串拼接的方式拼接到`url`上，必须使用`encodeURIComponent()`方法转码，如果是写到`data`属性则不需要。


## 序列化元素

### serialize()方法

在提交表单的时候，需要给服务器传表单中的数据，如果表单的内容比较多，一个个获取比较麻烦，jQuery提供了一个简化的方法`serialize()`,它能够将dom元素的内容序列化为字符串，用于ajax请求。例如表单的id为form，那么可以将ajax的data属性直接写为`$('#form').serialize()`。

### serializeArray()方法

和`serialize()`方法类似，但是`serializeArray()`方法不是返回字符串，而是将DOM元素序列化后，返回json格式的数据。

html代码
```html
    <input type="checkbox" name="user" value="1" checked>
    <input type="checkbox" name="user" value="2" checked>
    <input type="checkbox" name="user" value="3">
    <input type="checkbox" name="user" value="4">
```

js代码
```js
    var fields = $(":checkbox").serializeArray();
    console.log(fields);   // 打印一个数组[ {name:'user',value:'1'} , {name:'user',value:'2'} ]
```

### $.param()方法

这是`serialize()`方法的核心，用以将一个数组或对象按照key/value进行序列化。比如将一个普通对象序列化

```js
var obj = { a:1,b:2,c:3 };
var k = $.param(obj);
console.log(k);      // 输出a=1&b=2&c=3    
```

## Ajax全局事件

通过jQuery提供的一些自定义全局函数，能够为各种与Ajax相关的事件注册回调函数。

例如当请求开始时，会触发`ajaxStart()`方法的回调函数，当请求结束时，会触发`ajaxStop()`方法的回调函数。这些都是全局方法，因此无论创建它们于代码何处，只要有Ajax请求发生时，就会触发它们。

html代码
```html
<div id="loading">加载中...</div>
```

js代码

```js
$('#loading').ajaxStart(function(){
    $(this).show();
})

$('#loading').ajaxStop(function(){
    $(this).hide();
})
```

还有另外几个方法：

| 方法名称 | 说明 |
|----|----|
| ajaxComplete(callback) | Ajax请求完成时执行的函数 |
| ajaxError(cakkback) | Ajax请求发生错误时执行的函数，捕捉到的错误可以作为最后一个参数传递 |
| ajaxSend(callback) | Ajax请求发送前执行的函数 |
| ajaxSuccess(callback) | Ajax请求成功时执行的函数 |

> 如果不想让Ajax触发这些全局方法，可以将`global`设置为`false`，在jQuery1.5版本之后可以设置：
```js
$.ajaxPrefilter(function(options){
    options.global = true;
})
```
