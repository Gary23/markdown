
# show()和hide()

`hide()`方法是让元素隐藏，执行时候其实有两步，第一步是记住元素隐藏前的`display`属性值，第二步是将`display`设置为`none`。

`show()`方法会获取`hide()`第一步获取的那个属性并重新设置给元素的`display`属性。

这两个方法可以接收一个速度参数，显示和隐藏的毫秒值，`$('#box').hide(1000)`这样`$('#box')`元素从显示到隐藏会经过1000毫秒的动画过度，不会突然消失，执行过渡时，会同时改变元素的高度、宽度和不透明度，直至这三个属性都为0最后元素css会改为`display: none`。

参数也可以直接传入`'slow'`、`'normal'`、`'fast'`，分别代表600毫秒、400毫秒、200毫秒。也可以传入毫秒数。

# fadeIn()和fadeOut()

与`show()`方法不同的是，这两个方法只改变不透明度。`fadeOut()`方法会在指定的一段时间内降低元素的不透明度，直到`display:none`。`fadeIn()`方法则相反。

# slideUp()和slideDown()

改变元素的高度，如果一个元素是`display:none`，当调用`slideDown()`时，这个元素将由上至下延伸显示。`slideUp()`方法正好相反。元素将由下至上缩短隐藏。

> 以上几种动画第一个参数是速度，都可以传`'slow'`、`'normal'`、`'fast'`参数或者直接传入毫秒数。第二个参数是easing，是动画的运动方式，可选`'swing'、'linear'`分别是慢-快-慢和匀速。第三个参数是callback回调函数。

# 自定义动画animate()

常用格式为`animate(params,speed,easing,callback)`。

`params`:一个包含样式属性及值的对象。例如`{top:'200px',left:'200px'}`

`speed`:速度参数，可选参数。

`easing`:设置动画的节奏，可选值是`swing`慢-快-慢和`linear`匀速，可选参数。

`callback`:在动画完成时执行的函数，可选参数。

## 定义一个普通的动画

```js
$('#box').click(function(){
    $(this).animate({left:'500px'},3000);
})
```

## 累加、累减动画

```js
$('#box').click(function(){
    $(this).animate({left:'+=500px'},3000);
})
```

在当前位置累加500px;当然也可以累减。

## 多重动画

同时改变元素的高度的位置。

```js
$('#box').click(function(){
    $(this).animate({
        left:'500px',
        height:'200px'
    },3000);
})
```

先改变元素的位置，移动完成后再改变元素的高度。在left执行完之前不会改变height的值。这种有先后顺序执行的动画称为动画队列。

```js
$('#box').click(function(){
    $(this).animate({
        left:'500px'
    },3000).animate({
        height:'200px'
    },3000);
})
```

> 这里如果在最后直接写`.css(...)`，那么会不等动画执行，直接执行css的改变。`css()`方法不会加入队列，只有动画的方法才能加入队列。如果想让非动画方法方法加入队列就要写在回调函数里。


# 停止动画

格式为：`stop([clearQueue],[gotoEnd])`

`clearQueue`和`gotoEnd`都是可选参数，布尔值。

`clearQueue`代表是否要清空未执行完的动画队列。`gotoEnd`代表是否将正在执行的动画跳转到末状态。

## 判断动画执行状态

使用animate要避免动画重复累计的执行，可以提前进行判断。

```js
if(!$('#box')is(':animate')){
    // 如果没有动画正在执行就加入新动画。
}

```

## 延迟动画

在动画执行过程中，如果想延迟执行，可以使用`delay()`方法。可以将队列中的函数延迟执行，参数是毫秒值。

```js
$('#box').click(function(){
    $(this).animate({
        left:'500px'
    },3000)
    .delay(1000)
    .animate({
        height:'200px'
    },3000);
})
```

# 用于交互的动画方法

## toggle()

格式为：`toggle(speed,easing,callback)`

`toggle()`方法可以切换元素的可见状态。如果元素是可见的，则切换为隐藏的；如果元素是隐藏的，则切换为可见的。相当于先后执行了`show()`和`hide()`。

## slideToggle()

格式为：`slideToggle(speed,easing,callback)`

通过高度变化来切换匹配元素的可见性，这个动画效果只调整元素的高度。相当于先后执行了`slideUp()`和`slideDown()`方法。

可以设置参数speed、callback。

## fadeTo()

格式为：`fadeTo(speed,opacity,easing,callback)`

把元素的不透明度以渐进的方式调整到指定的值。只调整元素的不透明度。

## fadeToggle()

格式为：`fadeToggle(speed,easing,callback)`

通过不透明度来切换匹配元素的可见性，只能调整不透明度，相当于先后执行了`fadeOut()`和`fadeIn()`方法。
