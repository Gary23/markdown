---
title: HTML5（全局属性）
tags: HTML,H5
notebook: html
---

HTML中的全局属性就是可以用来配置所有元素共有的行为，这种属性称为全局属性，可以用在任何一个元素身上。

### 1、accesskey 属性

使用 accesskey 属性可以设定一个或几个用来选择页面上的元素的快捷键。

```html
<form action="">
    <p>
        Name: <input type="text" accesskey="a">                
    </p>
    <p>
        Password: <input type="password" accesskey="b">
    </p>
</form>
```

增加了 accesskey 后就可以通过快捷键来访问input文本框并输入内容。

除了firefox是用Alt + Shift + key快捷键之外，其他浏览器都是Alt + key。

### 2、contenteditable 属性

这个属性的用途是让用户能够修改页面上的内容。

```html
<p contenteditable="true">设置为 true 是可编辑的</p>
```

p 元素的 contenteditable 属性值设置为 true 时，用户可以单击文字编辑内容。设置为 false 时禁止编辑。

### 3、dir 属性

用来规定元素中文字的排列方向。有效值有两个：ltr(从左排列)、rtl(从右排列)。

```html
<p dir="ltr">从左开始排列文字</p>
<p dir="rtl">从右开始排列文字</p>
```

### 4、draggable 属性

draggable 属性是 HTML5 支持拖放操作的方式之一，用来表示元素是否可被拖放。

下面来看一个 draggable 拖动的实例。

```html
<style>
    #div1, #div2 {
        float:left; 
        width:100px; 
        height:35px; 
        margin:10px;
        padding:10px;
        border:1px solid #aaaaaa;
    }
</style>
<!-- 两个div是可拖动元素的放置区域 -->
<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)">
    <!-- img是可以拖动的元素，要设置 draggable -->
    <img src="xxxx.jpg" draggable="true" ondragstart="drag(event)" id="drag1" width="88" height="31">
</div>
<div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
```

```js
function allowDrop(ev)
{
    ev.preventDefault();
}

function drag(ev)
{
    ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev)
{
    ev.preventDefault();
    var data=ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
}
```

#### 设置元素为可拖放

首先，为了使元素可拖动，把要拖动元素的 draggable 属性设置为 true 。

#### 拖动什么 - ondragstart 和 setData()

然后，规定当元素被拖动时，ondragstart 属性调用了一个函数 drag(event) ，它规定了被拖动的数据。dataTransfer.setData() 方法设置被拖数据的数据名称和值。在这个例子中，数据名称是"Text"（名称是自定义的），值是可拖动元素的id。

#### 进行放置 - ondrop

当放置被拖数据时，会发生 drop 事件。在上面的例子中，ondrop 属性调用了一个函数，drop(event)。

- 调用 preventDefault() 来避免浏览器对数据的默认处理（drop 事件的默认行为是以链接形式打开）

- 通过 dataTransfer.getData() 方法获得被拖的数据。该方法将返回在 setData() 方法中设置为相同名称的任何数据。

- 被拖数据是被拖元素的 id ("drag1")

- 把被拖元素追加到放置元素（目标元素）中

### 5、dropzone 属性

dropzone 属性是 HTML5 支持拖放操作的方式之一，与 draggable 属性搭配使用。但是现在没有主流浏览器支持这个属性。

### 6、hidden 属性

hidden 是个布尔属性，浏览器对它的处理方式是隐藏该元素。

```html
<div hidden="true">这个元素将会被隐藏</div>
```

### 7、spellcheck 属性

spellcheck 属性用来表明浏览器是否应该对元素的内容进行拼写检查，这个属性只有用在用户可以编辑的元素上时才有意义。 spellcheck 属性可以接受的值有两个：true 和 false。至于拼写检查的实现方式则因浏览器而异。

```html
<textarea>This is some lalalala text</textarea>
```

### 8、tabindex 属性

HTML页面的键盘焦点可以通过按 Tab 键在各元素之间切换。用 tabindex 属性可以改变默认的转移顺序。

tabindex 设置为 -1 的元素不会在用户按下 Tab 键后被选中。没有设置 tabindex 的元素会在最后依次选中。

```html
<form action="">
    <label>Name: <input type="text" tabindex="2"></label>
    <label>City: <input type="text"></label>
    <label>Country: <input type="text" tabindex="1"></label>
    <input type="submit" value="" tabindex="3">
</form>
```

上面的例子中，按tab选择顺序是：Country、Name、提交按钮、City。

### 9、title 属性

title 属性提供了元素的额外信息，浏览器通常用这些东西显示工具条提示，这个在一些展示不全的文本标题也经常使用（鼠标移入会显示 title 属性的文字）。

```html
<a href="https://xxx.github.io/" title="我的个人网站">xxx.github.io</a>
```

### 10、lang 属性

lang 属性用于说明元素内容使用的语言。lang 属性必须使用有效的 ISO 语音代码，使用这个属性的目的在于，让浏览器调整其表达元素内容的方式，比如在使用了文字朗读器的情况下正确发音。

```html
<p lang="en">Hello - how are you?</p>
```

### 11、data-* 属性

data-* 属性用于存储私有页面后应用的自定义数据。

data-* 属性由以下两部分组成：

1. 属性名不要包含大写字母，在 data- 后必须至少有一个字符。

2. 该属性可以是任何字符串

```html
<ul>
    <li data-type="bird">Owl</li>
    <li data-animal-type="fish">Salmon</li> 
    <li data-animal-type="spider">Tarantula</li> 
</ul>
```

在javascript中获取自定义属性，注意连字符在js中要改为驼峰的写法。

```js
var lis = document.querySelectorAll('li');

console.log(lis[0].dataset.type);   // 打印bird
console.log(lis[1].dataset.animalType);   // 打印fish

lis[2].dataset.animalType = 'spider'  // 设置自定义属性
```

> class、id、style也属于全局属性，但是就不过多描述了