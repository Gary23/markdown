---
title: HTML5（操作本地文件）
tags: HTML5,文件上传
notebook: html
---

前端无法像原生APP一样直接操作本地文件，否则的话打开个网页就能把用户电脑上的文件偷光了，所以需要通过用户触发，用户可通过以下三种方式操作触发：

1. 通过input type=”file” 选择本地文件

2. 通过拖拽的方式把文件拖过来


### 1、input 方法

通常还会自定义一个按钮，然后盖在它上面，因为type=”file”的input不好改变样式。如下代码写一个选择控件，并放在form里面。

```html
<form>
    <input type="file"id="file-input"name="fileContent">
</form>
```

然后就可以用FormData获取整个表单的内容

```js
$("#file-input").on("change",function(){
    console.log(this.value);
    var formData = newFormData(this.form);
    formData.append("fileName",this.value);
    console.log(formData);
});
```

打印结果是这样的

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/2ccdf99174835f953a58621b2c0173943240593f21db32606d57725d6ffa7e782bdee69a11d571da81f4334e98d2d769?pictype=scale&from=30113&version=2.0.0.2&uin=406490508&fname=20171223.PNG&size=1024)

这里的路径其实是个假的路径，也就是说浏览器没法获取文件真实的存放位置，FormData看上去是一个空的，但实际上是有内容的，只是开发者不能对其查看、修改、删除。

而使用FileReader可以读取整个文件的内容。用户选择文件之后，input.files就可以得到用户选中的文件。

```js
$("#file-input").on("change",function(){
    var fileReader = newFileReader(),
		fileType = this.files[0].type;
		
    fileReader.onload = function(){
        if(/^image\/[jpeg|png|gif]/.test(fileType)){
            // 读取结果在fileReader.result里面
            $('<img src=' + this.result + '>').appendTo("body");
        }
    }
    // 打印原始File对象
    console.log(this.files[0]);
    // base64方式读取
    fileReader.readAsDataURL(this.files[0]);    
});

```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/27db1d3c01f7b76a6a084df7287aaa1bfa209cc02337f96a230c060c5cfd842dc70a56bfadcdb5550e874f3845428835?pictype=scale&from=30113&version=2.0.0.2&uin=406490508&fname=20171223-2.PNG&size=1024)

包含了文件的修改时间、文件名、文件的大小、文件的mime类型等。如果需要限制上传文件的大小就可以通过判断size属性有没有超，单位是字节。

而要判断是否为图片文件就可以通过type类型是否以image开头，并且是图片文件的后缀名。

然后实例化一个FileReader，调它的readAsDataURL并把File对象传给它，监听它的onload事件，load完读取的结果就在FileReader的result属性里了。它是一个base64格式的，可直接赋值给一个img的src。

### 2、拖拽的方式

```html
<div class="img-container">
	drop your image here
</div>
```

将图片拖拽到这个框中
![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/3e5f20f1710660ccec5d07fdcdace20058b32273b12323a1ea57795ac1f757afc2b92512a02ea74db5e3e8ce31297f28?pictype=scale&from=30113&version=2.0.0.2&uin=406490508&fname=20171223-3.png&size=1024)


然后监听它的拖拽事件

```js
$(".img-container").on("dragover",function(event){
	event.preventDefault();
}).on("drop",function(event){
	event.preventDefault();
	var fileReader = new FileReader()
	// 数据在event的dataTransfer对象里
	var file = event.originalEvent.dataTransfer.files[0];
	var fileType = file.type;

	fileReader.onload = function(){
		if(/^image\/[jpeg|png|gif]/.test(fileType)){
			// 读取结果在fileReader.result里面
			$('<img src=' + this.result + '>').appendTo("body");
		}
	}

	// 然后就可以使用FileReader进行操作
	fileReader.readAsDataURL(file);

	// 或者是添加到一个FormData
	var formData = new FormData();
	formData.append("fileContent",file);
})
```


数据在drop事件的event.dataTransfer.files里面，拿到这个File对象之后就可以和输入框进行一样的操作了，即使用FileReader读取，或者是新建一个空的formData，然后把它append到formData里面。

### 处理结果

上面，我们使用了两种方式获取文件内容，最后得到：

1. FormData格式

2. FileReader读取得到的base64

如果直接就是一个FormData了，那么直接用ajax发出去就行了，不用做任何处理，必须是POST的方式发送。

```js
var form = document.querySelector("form"),
    formData = new FormData(form);

formData.append("fileName","photo.png");
 
var xhr = newXMLHttpRequest();
// 假设上传文件的接口叫upload
xhr.open("POST","/upload");
xhr.send(formData);

```

如果用jQuery的话，要设置两个属性为false

```js
$.ajax({
    url: "/upload",
    type: "POST",
    data: formData,
    processData: false,  // 不处理数据
    contentType: false   // 不设置内容类型
});

```

因为是上传文件，所以需要form的enctype为multipart/form-data、method为post。所以如果是用默认表单空间提交的话需要设置`<form enctype="multipart/form-data" method="post">`。而如果用ajax提交，xhr.send的是FormData类型话，它会自动设置enctype。

普通的post编码是application/x-www-form-urlencoded，它和GET一样，发送的数据里面，参数和参数之间使用&连接，比如：key1=value1&key2=value2。而上传文件用的这种post编码是multipart/form-data，参数和参数之间是且一个相同的字符串隔开的，比如：——WebKitFormBoundary72yvM25iSPYZ4a3F。这个字符通常会取得比较长、比较随机，因为要保证正常的内容里面不会出现这个字符串，这样内容的特殊字符就不用做转义了。

未完成....

