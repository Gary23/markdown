
---

title: 《锋利的jQuery》十一、jQuery性能优化
date: 2017-08-16 22:18:00
tags: 《锋利的jQuery》

---

## 使用合适的选择器

以下选择器是按照性能由高到低排序的

### $('#id')

使用id来定位DOM元素无疑是最佳提高性能的方式，因为jQuery将直接调用`document.getElementById()`方法，如果用id无法直接获取元素那么可以用`$('#id').find()`方法。为了提高性能，最好从最近的id开始找。

### $('div')

标签选择器性能也是不错的，是第二选择。jQuery将直接调用`document.getElementsByTagName()`。

### $('.class')

这个方法如果是ie9以上或标准浏览器会调用`document.getElementsByClassName()`，对于旧的浏览器将使用DOM搜索的方式，所以相比前两个比较耗费性能。

### $('[attribute=value]')

对于利用属性来定位DOM元素，没有js方法直接实现。基本是通过`querySelectorAll()`方法实现，如果是旧浏览器会使用DOM搜索的方法。总体来说性能并不理想，尽量避免使用。

### $(':hidden')

和上面用属性定位DOM元素类似，这种伪类选择器也没有js方法直接实现，并且jQuery需要搜索每一个元素来定位这个选择器，同样性能不理想，如果必须要用可以在前面加一个id选择器缩小搜索范围。

> 如果要查看性能区别，可以使用一个在线工具[jsPerf](http://jsperf.com/id-vs-class-vs-tag-selectors/2)。

## 缓存对象

在书写jQuery代码时经常看到如下代码：

```js
$('#traffic_light input.on').on('click',function(){...});
$('#traffic_light input.on').css('border','1px solid yellow');
$('#traffic_light input.on').css('background-color','orange');
$('#traffic_light input.on').fadeIn('show');
```

这种思维是无可厚非的，但这样导致的结果是jQuery会在创建每一个选择器的过程中，查找DOM，创建多个jQuery对象。比较好的书写方式如下：

```js
var $active = $('#traffic_light input.on');   // 缓存对象
$active.on('click',function(){...});
$active.css('border','1px solid yellow');
$active.css('background-color','orange');
$active.fadeIn('show');
```

当然如果采用链式操作将更加简洁，但这里只是强调缓存对象。总之不要让同样的选择器多次出现在代码中。

## 循环时的DOM操作

使用jQuery可以很方便的添加、删除或修改DOM节点，但是在一些循环，比如`for()`、`while()`、或者`$.each()`中处理节点时，下面有个实例指的注意：

```js
var top_100_list = [...],   // 假设这里是100个独一无二的字符串
$myList = $('#myList');   // jQuery选择到<ul>元素
for(var i = 0, l = top_100_list.length; i < l; i++){
    $myList.append('<li>' + top_100_list[i] + '</li>');
}
```

上面的代码中将每个遍历生成的新元素都作为节点添加到容器`$('#myList')`中，这样操作也是非常耗性能的，更好的方法是尽可能的减少DOM操作，这里应该将整个遍历生成的元素都拼接成字符串，最后统一添加到`$('#myList')`中：

```js
var top_100_list = [...],
$myList = $('#myList'),
top_100_li = '';
for(var i = 0, l = top_100_list.length; i < l; i++){
    top_100_li += '<li>' + top_100_list[i] + '</li>';
}
$myList.html(top_100);
```

> 这里如果不使用缓存对象，对性能的损耗将更加严重，将会产生100个jQuery对象。

## 数组方式使用jQuery对象

jQuery对象会感觉像是一个定义了索引和长度的数组，在性能方面，建议使用`for`或`while`循环来处理，而不是使用`$.each()`，这样能使代码更快。

另外，检查长度也是检查jQuery对象是否有效的的方式：

```js
var $content = $('#content');

if($content.length){
    // do something
}
```

## 事件代理

假设有一张表格，要为每个`<td>`增加一个事件，点击变色：

```js
$('#myTable td').click(function(){
    $(this).css('background','red');
})
```

假设有100个`<td>`元素，在使用方式上将绑定100个事件，这将带来很负面的性能影响。更好的方式是利用事件冒泡。向它们的父级绑定一次一次事件：

```js
$('#myTable').click(function(e){
    var $clicked = $(e.target);
    $clicked.css('background','red');
})
```

也可以使用`on`方法来绑定：

```js
$('myTable').on('click','td',function(){
    $(this).css('background','red');
})
```

## 使用join()来拼接字符串

可以用`join()`的方式来代替`+`的方式来拼接字符串，更有助于性能优化，尤其是长字符串处理的时候。

```js
var arr = [];
for(var i = 0; i <= 1000; i++){
    arr[i] = '<li>' + i + '</li>'
}
$('#list').html(arr.join(''));
```

## 尽量使用原声的js方法

下面的代码是用来判断多选框是否被选中：

```js
var $cr = $('#cr');
$cr.click(function(){
    if($(this).is(':checked')){
        console.log('被选中')
    }
})

```

这里用了`is()`方法来判断多选框是否被选中，但其实可以直接使用原声的js方法：

```js
var $cr = $('#cr');

$cr.click(function(){
    if(this.checked){
        console.log('被选中')
    }
})
```

第二种方法不需要拐外抹角的去调用许多函数。还有更多类似的操作：

`$(this).css('color','red');`优化成`this.style.color = 'red';`。

`$('<p></p>')`优化成`$(document.createElement('p'))`。
