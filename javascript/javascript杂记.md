---
title: javascript（杂记）
tags: javascript
notebook: javascript
---

# this的基本用法

首先有一个函数

```js
function fn1(){
    alert(this);
}
```

直接调用则this指向window

```js
fn1();  // 指向window;
```

如果是被元素对象调用

```js
div.onclick = function(){
    var _this = this;    // 这个this指的就是div元素对象
    fn1();    // 这里打印的this值的就是window，因为上面fn1函数的环境就是在全局，所以如果直接调用函数，那么this都是window
}

div.onclick = fn1;    // 这里打印的this就是div元素对象，这里已经改变了fn1函数的环境，赋值给了div元素对象的事件属性中，环境自然也从全局变为div元素对象。
```

# 判断浏览器名称

```js
function myBrowser(){
    var userAgent = navigator.userAgent;   //取得浏览器的userAgent字符串
    if (userAgent.indexOf("Opera") > -1) {   //判断是否Opera浏览器
        return "Opera"
    };
    if (userAgent.indexOf("Firefox") > -1) { //判断是否Firefox浏览器
        return "FF";
    };
    if (userAgent.indexOf("Chrome") > -1){  //判断是否Chrome浏览器
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) { //判断是否Safari浏览器
        return "Safari";
    }
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1) {  //判断是否IE浏览器
        return "IE";
    };
}
```

# 火狐浏览器禁止页面滚动

```js
if (navigator.userAgent.toLowerCase().indexOf('firefox')>=0){
    if (e.preventDefault)
    e.preventDefault();
    e.returnValue = false;
}
```

# 鼠标滚轮事件

非FireFox浏览器是使用onmousewheel事件，而FireFox浏览器使用DOMMouseScroll事件。

非FireFox浏览器使用的是wheelDelta方法判断滚动方向，FireFox浏览器使用的是detail方法判断滚动方向。

wheelDelta:-120和detail:3 代表向下滚动。wheelDelta:120和detail:-3代表向上滚动。

```js
document.body.onmousewheel = function(event) {
    event = event || window.event;
    console.log(event.wheelDelta)
};

document.body.addEventListener("DOMMouseScroll", function(event) {
    console.log(event.detail)
});

```

# jquery兼容性的滚轮事件

```js
$('#scrollSelect-view').on("mousewheel DOMMouseScroll", function (e) {

    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||        // chrome & ie
                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));                  // firefox

    if (delta > 0) {
        // 向上滚
        console.log("wheelup");
    } else if (delta < 0) {
        // 向下滚
        console.log("wheeldown");
    }
});
```


# 自定义属性

有时候写方法时会定义大量变量，有的变量其实比较多余，很多数据可以存储到元素对象的自定义属性中去。这样不用去考虑作用域的问题，因为只要这个元素对象存在在这个方法内就可以去使用，但是最好只保存和这个元素对象有关的属性。

比如：下面代码就是，在事件处理函数内部只能获取i循环完毕之后的值，而通过把i的值作为元素对象的自定义属性赋值，就没有作用域的限制。

```js
for(var i = 0; i < 5; i++) {
    div.index = i;
    div[i].onclick = function(){
        alert(i);
        alert(this.index);
    }
}
```

# 排他思想和清空上一个

## 排他

通常在tab栏切换中经常用到排他，比如有10个选项，只有当前项才有背景色，通常颜色是通过一个类名挂钩到css中去设置的，那么排他就是每次先将所有导航选项的类名清空，然后只给当前点击的这个元素对象添加类名。

```js
for(var i = 0;i < Lis.length;i++){
    Lis[i].index = i;
    Lis[i].onclick = function(){
        // 这里开始排他
        for(var i = 0; i < Lis.length;i++){
            Lis[i].className = '';
        }
        // 单独设置当前选项
        Lis[this.index].className = 'active';
    };
};
```

## 清空上一个

这种效果除了排他之外还可以通过清除上一个选项来完成。创建一个变量存储上一个选中元素，在点击当前元素时候清空上一个类名，之后把自己赋值给这个变量，如此每次只需要清空一个元素的类名即可。

```js
var oElem = null;
// 初始化，默认第一个元素是当前项
Lis[0].className = 'active';
Elem = Lis[0];

for(var i = 0;i < Lis.length;i++){
    Lis[i].index = i;
    Lis[i].onclick = function(){
        // 这里开始清空上一个
        Elem.className = '';
        Elem = this;
        Lis[this.index].className = 'active';
    };
};
```


# jquery的stop()方法

`$(selector).stop(stopAll,goToEnd)`

stopAll    可选。规定是否停止被选元素的所有加入队列的动画。

goToEnd    可选。规定是否允许完成当前的动画。该参数只能在设置了 stopAll 参数时使用。

# 使用懒加载插件

使用的 jquery.lazyload

调用下载好的插件

```js
$(function(){
    $("img.imglazyload").lazyload({
        threshold : 200,
        effect : "fadeIn"
    });
});
```

html部分，一定要在外层包一个div并且设置宽高，不要用图片去撑开。

```html
<div class="item-image">
    <img class="imglazyload" data-original="图片地址">
</div>
```

# js中的NaN

1. NaN是一个数字类型但不是一个数值。
2. 出现NaN肯定是进行了非法操作而不是获取数值有错，如果获取数值有错是undefind。
3. NaN与自己本身也是不相等的。
4. NaN转为布尔是false。
5. NaN本身的意思是'不是一个数值'

isNaN可以判断某些类型是不是一个数字类型。如果判断到是一个数字为false(不是一个数值这个判定是错的)，而不是数字类型的是true(不是一个数值这个判定是对的)。

NaN在判断时是在内部使用Number()方法转换，所以是不是数字类型的依据主要是看Number()转出的是什么类型。比如布尔值、空字符串、字符串数字都会被认为是数字类型而返回false。


# js的作用域基础

作用域实际上是浏览器js解析器的一种工作方式。

浏览器的js解析器在读取javascript代码时会先提升变量和函数，再去逐行解读代码。这是每个作用域的解析步骤。

## 预解析

根据var、function、参数 找一些东西。

首先js解析器会搜索所有var和function找到所有变量，var声明的变量提升时值都是未定义，提升function时候会将整个函数代码块一起提升。

当var和function重名时，会保留function，覆盖var,但是如果两个以上同名的function，那么就看声明的先后顺序了。

## 逐行解析

变量提升之后，js解析器会开始逐行解析代码，这时只有表达式可以改变变量的值，用下边的案例来说明。

```js
alert(a);   // function a(){alert(4);}
var a = 1;
alert(a);   // 1
function a(){alert(2);}
alert(a);   // 1
var a = 3;
alert(a)    // 3
function a(){alert(4);}
alert(a);   // 3

a();    // 报错
```

第一个alert打印出函数的原因是变量提升的规则，后面的a打印的都是变量的值而不是函数，因为变量赋值是一种表达式，而函数只是一个声明并不是表达式。并且因为现在a是一个数值，所以调用时自然会报错。

## 多组script

自上而下的作用域大部分指的是多组script标签，如下代码

```js
<script>
    alert(a);   // 报错
</script>
<script>
    var a = 1;
</script>
<script>
    alert(a);   // 1
</script>
/
```


如果碰到这种情况，js解析器会对每个script代码块进行独立预解析和逐行解析，第一块script的代码还没声明a，第二块script的代码声明和赋值了，这时到第三块script代码块时a已经声明并赋值了，所以直接会打印1。

## 函数

由内而外主要指函数，一个函数也是一个单独的作用域，javascript中，函数是唯一能分隔作用域的。

```js
var a = 1;
function fn1(){
    alert(a);
    var a = 2;
}
fn1();      // undefined
alert(a);   // 1
```

```js
var a = 1;
function fn1(){
    alert(a);
    a = 2;
}
fn1();      // 1
alert(a);   // 2
```

第一个例子中在函数内部声明了a，那么在fn1中的a变量就和上级作用域的a变量没有任何关系了。按照预解析的步骤这里打印的是undefined。

第二个例子没有声明a变量，所以在fn1作用域中就找不到a，这时就会去上级作用域中寻找，上级作用域声明了a并且赋值为1了，所以打印1。

如果是下面这种情况

```js
var a = 1;
function fn1(a){
    alert(a);
    a = 2;
}
fn1();      // undefined
alert(a);   // 1
```

```js
var a = 1;
function fn1(a){
    alert(a);
    a = 2;
}
fn1(a);     // 1
alert(a);   // 2
```

参数其实就是一个局部变量，第一个例子没有传参，参数就相当于var a;  第二个例子传了参数就相当于var a = 1;

一个函数的解析顺序是先从参数开始的。

下面看一个最常见的案例

```js
for(var i = 0; i < 3; i++){
    btn[i].onclick = function(){
        alert(i);   // 3
    }
}
```

最开始我以为这里打印的i是会随着遍历打印出0,1,2的，但实际上onclick函数中相当于一个独立的作用域，这个作用域中没有声明i变量，所以就要去上级作用域去获取，那为什么是3呢，因为函数只有在点击时才会调用，只有调用时才会发生预解析和逐步解析，这时去获取i的值上级作用域早已遍历完毕。


# js运算符%取余的应用

下面的例子中要在li元素中添加背景色，颜色存储在arr数组。如果不用取余运算符只能写两层for循环，而使用取余运算，可以直接让取余后的值自己循环。

arr的长度是3，i是0开始每次+1，那么arr数组每次的索引就是：`arr[0%3=0],arr[1%3=1],arr[2%3=2],arr[3%3=0],arr[4%3=1],arr[5%3=2],arr[6%3=0]`，这样就达到了遍历颜色数组的目的。这种操作很适合于在一个数组的遍历内部又需要遍历另外一个数组的情况。

```js
var li = document.getElementsByTagName('li');
var arr = ['yellow','pink','orange'];
for(var i = 0; i < li.length; i++){
    li[i].style.backgroundColor = arr[i%arr.length];
}
```

下面扩展一下这个案例，加上任意li元素点击后变色，再去点击另一个li，另一个li元素变色，上一个li元素变回原来的颜色。通常这种功能会用排他来做，这次不用排他，使用取余操作来写。

```js
var li = document.getElementsByTagName('li');
var arr = ['yellow','pink','orange'];
var elem = null;

for(var i = 0; i < li.length; i++){
    li[i].index = i;
    li[i].style.backgroundColor = arr[i%arr.length];

    li[i].onclick = function(){
        if(elem){
            elem.style.backgroundColor = arr[elem.index%arr.length];
        }
        elem = this;
        this.style.backgroundColor = 'gray';
    }
}
```

排他是将所有li元素变色，再去更改当前点击的元素的背景色，而这种思路是记录上一次点击的元素，在下一次点击时只改变上一次点击的元素的背景色就可以了。这里elem.index和i的作用是相同的。

另外取余操作还可以换算时间，比如现在要将70秒转为分钟，那么可以这样写

```js
var s = 70;
var m = Math.floor( 70/60 + '分' + 70%60 + '秒');
```

# js获取浏览器计算后的属性值

像width或者height这种属性直接获取只能得到行内样式，如果不写在行内就获取不到，使用getComputerStyle可以获取浏览器计算后的样式，也就是被浏览器渲染之后得到的元素实际的属性的值。格式是`getComputerStyle(element).width;`

但是这个方法在ie6、7、8不兼容。这三个非标准浏览器使用的currentStyle属性。格式是`element.currentStyle.width;`。

不要用这两个方法去获取没有设置过的属性。

不能用这两个属性去获取复合样式，比如要获取背景色不要用background而是要用backgroundColor，不论css是怎么写的，都要写具体的属性。因为如果写background的话会获取到所有这个属性可以设置的属性值，如果css没写的会获取到默认的。

另外在firefox浏览器4.0版本之前，getComputerStyle的参数要写两个，第二个参数可以随便写比如`getComputerStyle(element,'').width;`或`getComputerStyle(element,true).width;`，总之只要写一个参数就可以。


# jq中的即使搜索事件

在jq中实现input搜索框的即时搜索和其他即时性的改变需要用到input和propertychange(兼容ie8及以下浏览器)事件。

input是标准的浏览器事件，一般应用于input元素，当input的value发生变化就会发生，无论是键盘输入还是鼠标黏贴的改变都能及时监听到变化。

propertychange只要当前对象属性发生改变都会触发，所以使用propertychange时最好排除一下不想触发事件的元素。


# window.parent

在b.html页面使用iframe的时候，引入一个Html页面名称暂定为a.html，呢么在a.html中，window指的是a的window对象，而window.parent指的就是b.html的window对象。

# 监听DOM树加载完成的事件

DOM的加载顺序：

1. 解析HTML结构。

2. 加载外部脚本和样式表文件。

3. 解析并执行脚本代码。

4. 构造HTML DOM模型。

5. 加载图片等外部文件。

6. 页面加载完毕

`DOMContentLoaded`事件 可以在DOM模型加载完成后就执行代码，而不用等到加载完图片或外部文件

# 移动端获取屏幕的宽高

`document.documentElement.clientWidth` 和 `document.documentElement.clientHeight` 
这个得到的是设备像素可见宽高，比如iPhone 5里为320和504。


# 当图片路径有误加载失败则删除图片或父元素

```js
function imgIsError(img,parent) {
	$(img).each(function() {
		$(this).load(function(){
			if (this.height === 0) {
				removeElem(this, parent);
			}
		})
		$(this).error(function(){
			removeElem(this, parent)
		})
	})

	function removeElem(self, elem) {
		if (elem) {
			$(self).closest(elem).remove();
		} else {
			$(self).remove();
		}
	}
}

imgIsError('img','div.item');
```

# 移动端调用手机通话

```html
<a href="tel:18661790878"></a>
```

# 移动端调用手机qq

uin对应的是qq号，这个链接测试在微信中不好用。

```html
<a href="mqqwpa://im/chat?chat_type=wpa&uin=462845926&version=1&src_type=web&web_src=oicqzone.com"></a>
```