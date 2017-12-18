---
title: HTML5（全局属性）
tags: HTML,H5
notebook: html
---

HTML中的全局属性就是可以用来配置所有元素共有的行为，这种属性称为全局属性，可以用在任何一个元素身上。

#### 1、accesskey 属性

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

#### 2、contenteditable 属性

这个属性的用途是让用户能够修改页面上的内容。

```html
<p contenteditable="true">设置为 true 是可编辑的</p>
```

p 元素的 contenteditable 属性值设置为 true 时，用户可以单击文字编辑内容。设置为 false 时禁止编辑。

#### 3、dir 属性

用来规定元素中文字的排列方向。有效值有两个：ltr(从左排列)、rtl(从右排列)。

```html
<p dir="ltr">从左开始排列文字</p>
<p dir="rtl">从右开始排列文字</p>
```

#### 4、draggable 属性

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