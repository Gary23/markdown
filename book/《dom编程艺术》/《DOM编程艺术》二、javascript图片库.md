---
title: 《DOM编程艺术》二、javascript图片库
tags: book,《DOM编程艺术》
notebook: 《DOM编程艺术》
---
从这一篇开始会逐步完成一个图片库的案例，但我们不能直接把所有的图片直接放到一个页面里，因为图片下载的时间较长，用户需要等待很长时间去加载一个网页，所以我们需要一个图片库，把整个图片库的浏览链接集中安排在主页里，只在用户点击了这个主页里的某个图片链接时才把相应的图片加载。

# 1、建立基础的HTML结构

```html
<!DOCTYPE html>
<html lang = "en">
<head>
    <meta charset = "utf-8"/>
    <title>Image Gallery</title>
</head>
<body>
    <h1>Snapshots</h1>
    <ul>
        <li>
            <a href = "images/fireworks.jpg" title = "A fireworks display">Fireworks</a>
        </li>
        <li>
            <a href = "images/coffee.jpg" title = "A cup of black offee">Coffee</a>
        </li>
        <li>
            <a href = "images/rose.jpg" title = "A red,red rose">Rose</a>
        </li>
        <li>
            <a href = "images/bigen.jpg" title = "The famous clock">Big Ben</a>
        </li>        
    </ul>
</body>
</html>
```

![image](http://upload-images.jianshu.io/upload_images/5140754-159984e01005f539?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 2、改进图片库

这个网页现在的功能是：

1. 清单列表中的每个链接分别指向不同的图片，点击跳转到相应的图片页面。

2. 从图片返回列表要借助于浏览器的back功能。

需要改进的地方：

1. 点击某个链接时，能留在这网页而不是转到另一个窗口。

2. 点击某个链接时，能在这个网页上同时看到那张图片及原有清单列表。

3. 点击某个链接时，在图片的下方显示改图片的描述文字。

完成上述目标要完成的几项改进：

1. 通过增加一个占位图片的办法在这个主页上为图片预留一个浏览区域。

2. 点击某个链接时，拦截这个网页的默认行为。把占位图片替换为与那个链接相对应的图片。

3. 点击某个链接时，获取链接的描述文字，保存到图片下方的位置。


## 第一步、增加占位图片

html部分

```html
<img id = "placeholder" src = "images/placeholder.jpg" alt = "my image galley"/>
```

js部分

```js
function showPic(whichpic){
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
}
```
为了把占位图片替换为要查看的图片，需要一个方法来改变它的src属性。
参数whichpic代表一个指向某个图片的a元素，变量source是参数a元素的href属性值，变量placeholder是占位图片的元素对象。

> 我们还有另一种方法，也就是非DOM方法，直接用`placeholder.src = source;`，效果等同于`placeholder.setAttribute("src",source);`，我选择DOM方法的原因是setAttribute是第1级DOM，它的兼容性和可移植性更好，DOM本身适用于任何一种标记语言，DOM是一种适用于多种环境和多种程序设计语言的通用型API，而非DOM方法只能适用于web浏览器，所以在以后的选择时，尽量选择DOM方法。


最后将该方法单独存为一个叫做show_pic.js的文件并引用。在实际开发中，可以将多个功能放到一个js文件中，这样可以减少对站点的请求次数，提高性能。

```js
<script src="script/script.js"></script>
```

## 第二步、事件处理函数

事件处理函数的作用是在特定事件发生时，调用特定的javascript代码。这个案例中要使用的是onclick点击事件。

```html
 <a href = "images/fireworks.jpg" onclick = "showPic(this);return false;" title = "A fireworks display">Fireworks</a>
```

在每一条链接上增加onlcick事件和处理程序。showPic就是之前写好的方法，将this作为参数传进去，this这里指的就是a元素对象。

`return false`的作用是阻止默认行为被调用，a元素的默认行为是打开一个新窗口，我不需要这个效果，所以要组织。

> 事件处理函数的工作机制：在给某个元素添加了事件处理函数后，一旦事件发生，javascript代码便会执行，这些被调用的javascript代码可以返回一个值，这个值将被传递给事件处理函数，具体到此案例中，当onclick被触发时，如果执行的代码返回true，onclick事件处理函数就会认为这个链接被点击了，如果返回false，onclick事件处理函数就认为这个链接没有被点击，所以当onclick认为没有点击链接，自然也不会打开一个新链接。

## 第三步、增加图片描述文字

现在我要用DOM给图片增加一段描述，这段描述的位置在img标签之后，同时也起到了占位符的作用

```html
<p id="description">Choose an image</p>
```

为了实现这个功能也需要扩展一下showPic函数。

1. 获取a标签的title属性值，并存入变量text。

2. 获取描述文本的元素，id值为description的p元素，保存到变量description。

3. 把description对象的第一个子节点的nodeValue属性值设置为变量text的值。

```js
function showPic(whichpic){
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  placeholder.setAttribute("src",source);
  var text = whichpic.getAttribute('title');    // 1
  var description = document.getElementById('description');     // 2
  description.firstChild.nodeValue = text;      // 3
}
```

这里设置描述文本我使用的是nodeChild属性，nodeChild属性可以设置和获取文本元素的文本内容。需要注意的是必须是文本节点。

比如description是一个元素节点，那么`description.nodeChild`获取的就是null，用description的子节点才有效`description.firstChild.nodeChild`，这里description只有一个子节点并且是文本节点，所以使用firstChild和lastChild都一样，如果description有好几个子元素，要获取其中的某个可以用children[index]来获取。


## 最终效果

最后我们增加一些css样式来美化一下页面,创建style.css文件并引入html文件中。

```css
body {
  font-family: "Helvetica","Arial",serif;
  color: #333;
  background-color: #ccc;
  margin: 1em 10%;
}

h1 {
  color: #333;
  background-color: transparent; 
}

a {
  color: #c60;
  background-color: transparent;
  font-weight: bold;
  text-decoration: none;
}

ul {
  padding: 0;
}

li {
  float: left;
  padding: 1em;
  list-style: none;
}

img {
  display: block;
  clear:both;
}
```

以下是script.js文件的最终内容

```js
function showPic(whichpic){
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  placeholder.setAttribute("src",source);
  var text = whichpic.getAttribute('title');
  var description = document.getElementById('description');
  description.firstChild.nodeValue = text;
}
```


html文件的最终结构如下

```html
<!DOCTYPE html>
<html lang = "en">
<head>
    <meta charset = "utf-8"/>
    <title>Image Gallery</title>
    <link rel="stylesheet" type="" href="./css/style.css">
</head>
<body>
    <h1>Snapshots</h1>
    <ul>
        <li>
            <a href = "images/fireworks.jpg" onclick = "showPic(this);return false;" title = "A fireworks display">Fireworks</a>
        </li>
        <li>
            <a href = "images/coffee.jpg" onclick = "showPic(this);return false;" title = "A cup of black offee">Coffee</a>
        </li>
        <li>
            <a href = "images/rose.jpg"  onclick = "showPic(this);return false;" title = "A red,red rose">Rose</a>
        </li>
        <li>
            <a href = "images/bigben.jpg" onclick = "showPic(this);return false;"  title = "The famous clock">Big Ben</a>
        </li>        
    </ul>
    <img id = "placeholder" src = "images/placeholder.gif" alt = "my image galley"/>

    <p id="description">Choose an image</p>

    <script src="script/script.js"></script>
</body>
</html>
```

页面的最终效果如下，点击i链接可以改变图片和描述文字。
![image](http://upload-images.jianshu.io/upload_images/5140754-1844bb7a65ebc8ed?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

