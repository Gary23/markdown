
---

title: 《DOM编程艺术》一、DOM
date: 2017-04-13 22:27:25
tags: 《DOM编程艺术》

---

## 1、DOM的含义

- 文档(D)，指的是document，当创建了一个网页并把它加载到web浏览器中时，DOM就在幕后悄然而生，DOM把我们编写的网页文档转换为一个文档对象。

- 对象(O)，指的就是javascript中的三种对象，用户定义对象、内建对象、宿主对象。

- 模型(M)，可以理解为模型Model或者地图Map，我们可以通过javascript代码来读取这张地图。

要理解模型或者地图的概念，首先我们要理解DOM是把一份文档表示为一棵树。以下面文档为例。

```html
<!DOCTYPE html>
<html lang = "en">
    <head>
        <meta charset = "utf-8">
        <title>Shopping list</title>
    </head>
    <body>
        <h1>What to buy</h1>
        <p title = "a gentle reminder">Don't forget to buy this stuff</p>
        <ul id = "purchases">
            <li>A tin of beans</li>
            <li class = "sale">Cheese</li>
            <li class = "sale">Milk</li>
        </ul>
    </body>
</html>
```

上面的一长串代码可以理解为以下的DOM树
![image](http://upload-images.jianshu.io/upload_images/5140754-e4ce5829e8f2fa46?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

从上图可以看出，html永远是一个文档的开始，可以看作是树根，再深一层就是head和body，它们位于一层，所以是兄弟关系(sibling)，它们都有各自的子元素(child)，有着共同的父元素(parent)。

实际上用parent、silbling、child就可以代表整个DOM树的结构，比如ul是ul是body的child元素，而ul又是li的parent元素，ul和p是sibling元素，并且这棵树上的每个元素都是一个DOM节点。

## 2、节点

上面介绍了DOM的概念，由图也可以看出，DOM树是由一个个节点组成的，这些就是DOM节点。分为三种类型。

- 元素节点           
    标签的名字就是元素节点，例如"p"、"ul"、"body"等等。

- 文本节点                    
    被元素包括的文本内容就是文本节点，比如上面文档中被<li>包含的"A tin of beans"。

- 属性节点                    
    属性节点用来对元素做出更具体的描述，比如<p>的title属性，也包括id和class属性，属性节点也总是被包含在元素节点内部。

那么我们如何区分这三种节点呢？可以使用nodeType属性。
nodeType属性总共有12种可取值，但其中仅有3种有实用价值。
- 元素节点的nodeType属性值是1

- 属性节点的nodeType属性值是2

- 文本节点的nodeType属性值是3

实际使用中可以通过元素对象的nodeType属性值来判断节点类型。

## 3、获取元素

有3种DOM方法可以获取元素节点，分别是通过元素id、通过标签名、通过class获取。

### 通过id名获取

这个方法将返回一个与给定id属性值的元素节点对应的元素对象，它是document对象特有函数。
```
document.getElementById('box');
```
获取id属性值是'box'的元素对象。

> 这里一直再说元素对象这个概念，其实就是指的html元素，但是在DOM里html元素都是DOM节点。而DOM节点本身就是一个对象，所以叫做元素对象。
另外函数和方法其实也是一个概念，对象的方法其实就是一个函数。

### 通过标签名获取

这个方法返回一个对象数组，与getElementById不同的是，这个返回的是一个数组，返回的数组中，每个元素都是获取到的元素对象，可以用length属性查出这个数组的长度。

```js
document.getElementsByTagName('li');
```

这个方法允许把一个通配符作为它的参数，可以获取文档里的所有元素，也可以和getElementById结合使用

```js
var box = document.getElementById('box');
var lis = box.getElementsByTagName('*');
```

这样可以获取id为box的元素下的所有元素对象。

### 通过class获取

这是HTML5中新增的方法，可以通过class名获取元素，返回的也是一个对象数组。

```js
document.getElementsByClassName('sale important');
```

获取class属性为sale和important的元素对象，这个元素必须同时有这两个class名，顺序无所谓。也可以和getElementById结合使用。

```js
var box = document.getElementById('box');
var sales = box.getElementsByClassName('sale');
```

获取id值为box的元素下的所有class名为sale的元素。

> 需要注意的是这个方法比较新，所以用的时候要小心，为了弥补这个不足，我们可以自己封装一个获取class名的方法以适用于旧版浏览器。

**获取class名的兼容性处理**

```js
function getElementsByClassName(node, className) {
    if (node.getElementsByClassName) {
        return node.getElementsByClassName(className);
    } else {
        var results = new Array();
        var elems = node.getElementsByClassName('*');
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].className.indexOf(className) != -1) {
                results[results.length] = elems[i];
            }
        }
        return results;
    }
}
```

这个函数接收两个参数，node表示搜索起点，className是要搜索的class名，这个方法不足的地方是不适用多个class名。

## 4、获取和设置属性

已经了解了三种获取元素节点的方法，现在可以去获取它们的属性。


### 获取属性

```js
var paras = document.getElementsByTagName('p');
for(var i = 0;i < paras.length;i++){
    var title_text = paras[i].getAttribute('title');
    if(title_text != null){
        alert(title_text);
    }
}
```

getAttribute用于获取属性，需要用元素节点去调用，参数是要获取的属性名，如果调用的元素节点里没有要查找的属性就会返回null。

### 设置属性

```js
var paras = document.getElementsByTagName('p');
for(var i = 0;i < paras.length;i++){
    paras[i].setAttribute('title','brand new title text');
    alert(paras[i].getAttribute('title'));
}
```

setAttribute用于设置属性，不管调用的元素原来有没有设置的属性，最终都会被设置上，用setAttribute对文档做出修改后，在浏览器中查看源代码仍是改变前的属性，这就是DOM的工作模式，对页面内容更新却不需要在浏览器里刷新。
