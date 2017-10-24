
---

title: 《锋利的jQuery》四、jQuery的事件
date: 2017-07-06 08:53:57
tags: 《锋利的jQuery》

---

## 加载DOM

jQuery中`$(document).ready()`方法运行时代表DOM已经加载完毕，用此方法代替`window.onload`方法可以极大地提高web应用程序的响应速度。

此方法的另一种写法是`$(function(){})`。

## 事件绑定

使用`bind()`来进行事件绑定。格式为`bind( type,[data],fn )`。

第一个参数是事件类型，不需要加`on`。

第二个参数是可选参数，是传递给事件对象的额外数据对象。

第三个参数是事件处理函数。

```js
$('#box').bind('click',function(){
    
})
```

还有一种简写方式

```js
$('#box').click(function(){
    
})
```

`bind()`还可以为一个元素绑定多个事件：`$('#box').bind('mouseover mouseout',function(){})`。






## 合成事件

### hover()

用于模拟光标悬停事件，格式为`hover(enter,leave)`，当光标移动到元素上时，会触发指定的第一个函数，当光标移出这个元素时，会触发指定的第二个函数。

```js
$('#box').hover(function(){
    // 光标移入
},function(){
    // 光标移出
})
```

### toggle()

用于模拟鼠标连续单击事件，格式为`toggle(fn1,fn2...fnN)`，第一次单机触发指定的第一个函数，再点击同一元素时，触发第二个函数，如果有更多函数则依次触发直到最后一个函数，随后的每次单机都重复对这几个函数的轮番调用

```js
$('#box').toggle(function(){
    // 第一次点击
},function(){
    // 第二次点击
},function(){
    // 第三次点击，下次点击将从第一次开始
})
```

这个方法还有另一种用法，可以切换元素的可见状态，如果元素是可见的，点击后则为隐藏，如果是隐藏的，点击后则为可见的。

```js
$('#box').toggle(function(){
    $(this).next().toggle();
},function(){
    $(this).next().toggle();
})
```

## 事件冒泡

通过事件对象的`stopPropagation()`方法来阻止事件冒泡。

```js
$('span').bind('click',function(event){
    event.stopPropagation();
})
```

> jQuery中并不支持事件捕获

### 阻止默认行为

通过事件对象的`preventDefault()`方法来阻止元素的默认行为。

有时候元素的默认行为需要阻止，比如阻止链接的跳转和阻止表单的提交，此时就需要用到此方法。

```js
$('span').bind('click',function(event){
    event.preventDefault();
})
```

> 如果既需要阻止冒泡也需要阻止默认行为，可以在事件处理函数中简写为`return false`。

## 事件对象的属性

jQuery对事件对象进行了封装，不存在兼容性问题，下面介绍几个常用的属性

### event.type

该方法的作用是可以获取到事件的类型

```js
$('#box').click(function(event){
    console.log(event.type)   // 打印'click'
})
```

### event.preventDefault()

阻止默认的事件行为

### event.stopPropagation()

阻止事件的冒泡行为

### event.target

获取到触发事件的元素

```js
$('#box').click(function(event){
    console.log(event.target)   // 打印整个$('#box')元素
})
```

### event.reatedTarget

获取比如`mouseover`和`mouseout`事件发生所相关的元素，对于`mouseout`，`event.relatedtarget`指向将进入的页面元素；而`mouseover`, 指向的是刚掠过的页面元素。

和`event.target`的区别是，一个是触发事件的主体元素，一个是存在过渡的事件的相关主体之一。

### event.pargeX和event.pageY

获取到光标相对于页面的x坐标和y坐标

### event.which

在鼠标点击事件中获取到鼠标的左、中、右键，在键盘相关事件中获取键盘的按键。

```js
$('#box').mousedown(function(event){
    console.log(event.which)   // 1=鼠标左键  2=鼠标中键  3=鼠标右键
})

$('#box').keydown(function(event){
    console.log(event.which)   // 获取按下的那个按键
})
```

### event.metaKey

在键盘事件中获取ctrl按键。

## 移除事件

通过`unbind()`方法来移除元素的方法，格式为`unbind([type],[data])`

第一个参数是事件类型，第二个参数是将要移除的函数

如果没有参数则删除所有绑定事件

如果提供了事件类型作为参数，则只删除该类型的绑定事件。

如果把在绑定时传递的处理函数作为第二个参数，则只有这个特定的事件处理函数会被删除。

```js
$('#box').bind('click',fun1 = function(){
    // 绑定一个点击事件
})

$('#btn').click(function(){
    $('#box').unbind('click',fun1);   // 删除绑定函数fun1  
})
```

另外jQuery还提供了一种简写方法，当事件处理函数触发一次后，立即删除，就是`one()`方法，使用方法和`bind()`相同。

## 模拟操作

### 常用模拟

以上的事件都是需要用户去操作才能触发的，jQuery中还可以模拟用户的操作，可以使用`trigger()`方法完成模拟操作。

`$('#btn').trigger('click');`这样就模拟了点击事件，也可以直接简写为`$('#btn').click();`

`trigger(type,[data])`方法有两个参数，第一个参数是要出发的事件类型，第二个参数是要传递给事件处理函数的附加数据，以数组形式传递。通常可以通过传递一个参数给回调函数来区别这次事件是代码触发的还是用户触发的。

```js
$('#btn').click(function(event,msg1,msg2){
    alert(msg1 + msg2);     // 页面加载时打印12,
})

$('#btn').trigger('click',['1','2'])

```

`trigger()`方法有一个问题，那就是会触发事件的浏览器默认行为，比如`$('input').trigger('focus');`，我想触发表单的`focus`事件处理函数，但是不想真的让表单获取焦点，这时就可以使用`triggerHandler()`方法，`$('input').triggerHandler('focus');`这样既会触发表单的获取焦点的处理函数，还不会让表单获取焦点。

### 事件的命名空间

可以把为元素绑定的多个事件类型用命名空间规范起来。

```js
$('#box').bind('click.plugin',function(){
    
})

$('#box').bind('mouseover.plugin',function(){
    
})

$('#box').bind('dbclick',function(){
    
})

$('#btn').click(function(){
    $('#box').unbind('.plugin');     // 删除$('#box')元素带有.plugin命名空间的事件
})
```

这样添加命名空间后，在删除事件时只需要删除指定命名空间即可，没有指定该命名空间的事件不会被删除。

命名空间还有另外一种用法，元素绑定相同的事件类型，然后以命名空间的不同可以按需调用。

```js

$('#box').bind('click',function(){
    
})

$('#box').bind('click.pligin',function(){
    
})

$('#btn').click(function(){
    $('#box').trigger('click!');
})
```

如果点击`$('#box')`会同时触发`click`事件和`click.plugin`事件。如果点击`$('#btn')`元素则只触发`click`事件，因为`trigger('click!');`中的叹号是匹配所有不包含命名空间的方法。
