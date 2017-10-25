
## 结构

使用IScroll这个脚本库时，DOM树的结构要足够简单，移除不必要的标签，尽量避免过多的标签嵌套使用。

最优的使用iScroll的结构如下所示

```html
<div id="wrapper">
  <ul>
    <li></li>
    .....
  </ul>
</div> 
```

只有wrapper里的第一个子元素才可以滚动，如果你想要更多的元素可以滚动，那么你可以试试下面的这种写法

```html
<div id="wrapper">
  <div id="scroller">
    <ul>
      <li></li>
      ...
    </ul>
    <ul>
      <li></li>
      ...
    </ul>
  </div>
</div>
```

## 实例化IScroll

```js
<script>
  var myscroll=new IScroll("wrapper",{hScrollbar:false, vScrollbar:false});
</script>
```

第一个参数是滚动元素外层容器的选择器字符串，也可以是元素对象。

> 注意，IScroll使用的是querySelector 而不是 querySelectorAll，所以IScroll只会作用到选择器选中元素的第一个。如果你需要对多个对象使用IScroll，你需要构建自己的循环机制。

第二个参数是一个对象。

在初始化之后，可以通过options对象访问标准化值。如果设置了浏览器不支持的属性，那么即使在初始化时设置为`true`，在这里也会显示为`false`。

```js
console.log(myScroll.options);
```

## IScroll的核心参数

### options.useTransform

默认值是`true`

如果设置为`false`，将使用`top/left`属性这种老的方式进行滚动。 

这个属性在滚动器感知到Flash，iframe或者视频插件内容时会有用，但是需要注意：性能会有极大的损耗。

### options.useTransition

默认是`true`

使用css的`transition`实现动画效果(动量和弹力)，如果设置为`false`，将使用`requestAnimationFrame`代替，在旧设备上`transition`执行的更好

### options.HWCompositing

默认是为`true`

这个选项尝试使用`translate(0)`来把滚动器附加到硬件层，以此来改变css属性，在移动设备上将提高性能

> 如果不确定IScroll的最优配置，从性能角度出发，上面的所有选项都应该设置为true

## IScroll的基本参数

### options.bounce

默认值`true`

滚动到边界反弹动画，在旧的设备上禁用对实现平滑滚动有帮助。

### options.click

默认值是`false`

为了重写原生滚动条，iScroll禁止了一些默认的浏览器行为，比如鼠标的点击。如果你想你的应用程序响应click事件，那么该设置次属性为`true`。

### options.disableMouse、options.disablePointer、options.disableTouch

默认值是`false`

可以把你不需要的事件禁用（鼠标，指针、触摸事件），设置为`true`是禁用。

### options.eventPassthrough

有些时候你想保留原生纵向滚动条，但是想为横向滚动条增加IScroll功能。就可设置为true。

实现横向滚动的代码如下：

js部分

```js
var myScroll = new IScroll('#wrapper', {
    eventPassthrough: true,
    scrollX: true, 
    scrollY: false
});
```
html部分

```html
<div id="wrapper">
    <div id="scroller">
        <ul>
            <li>11111111111</li>
            ......
        </ul>
    </div>
</div>
```

css部分

```css
#wrapper {
    width: 100%;
    background: #eeeeee;
    overflow: hidden;
}

#scroller {
    z-index: 1;
    width: 1010px;
}

#scroller li {
    width: 100px;
    float: left;
    font-size: 14px;
    overflow: hidden;
    text-align: center;
}

```

### options.freeScroll

默认值是`false`

可以横轴和纵轴同时滚动，需要设置为`true`。代码实例如下：

js部分

```js
myScroll = new IScroll('#wrapper', {
    scrollX: true,
    freeScroll: true
});
```
html部分

```html
<div id="wrapper">
    <div id="scroller">
        <p>111111111111111111111111111111111111</p>
        ......
    </div>
</div>
```

css部分

```css
#wrapper {
    position: relative;
    height: 200px;
    width: 200px;
    background: #666;
    overflow: hidden;
}

#scroller {
    position: absolute;
    z-index: 2;
    width: 2000px;
    background: #fff;
}

p {
    font-size: 16px;
    line-height: 1;
    overflow: hidden;
}
```


### options.keyBindings

默认值`false`

设置为`true`时可以激活键盘绑定。

### options.invertWheelDirection

默认为`false`

当鼠标滚轮支持激活后，在有些情况下需要反转滚动的方向。（比如，鼠标滚轮向下滚动条向上）。

### options.momentum

默认值`true`

在用户快速触摸屏幕时，你可以开/关势能动画。关闭此功能将大幅度提升性能。

### options.mouseWheel

默认值`false`

是否监听鼠标滚轮事件。

### options.preventDefault

默认值`true`

当事件触发时是否执行`preventDefault()`。此属性应该设置为`true`。

### options.preventDefault

默认值`false`

是否显示为默认的滚动条。

### options.scrollX、options.scrollY

`scrollX`默认值`false`，`scrollY`默认值`true`

`scrollX`为是否进行横向滚动，`scrollY`为是否进行纵向滚动

### options.startX、options.startY

默认值0

默认情况下iScroll从0, 0 (top left)00位置开始，通过此属性可以让滚动条从不同的位置开始滚动。

### options.tap

默认`false`

设置此属性为`true`，当滚动区域被点击或者触摸但并没有滚动时，可以让iScroll抛出一个自定义的tap事件。

## 滚动条

滚动条不只是像名字所表达的意义一样，在内部它们是作为indicators的引用。

一个指示器侦听滚动条的位置并且现实它在全局中的位置，但是它可以做更多的事情。

### options.scrollbars

激活滚动条，代码如下：

```js
var myScroll = new IScroll('#wrapper', {
    scrollbars: true
});
```

### options.fadeScrollbars

默认值`false`

设置为`true`则滚动条使用淡入淡出的方式，不适用淡入淡出比较节省资源。

### options.interactiveScrollbars

默认值`false`

设置为`true`可以让滚动条能拖动

### options.resizeScrollbars

默认值`true`

滚动条尺寸改变基于容器和滚动区域的宽/高之间的比例。此属性设置为`false`让滚动条固定大小。这可能有助于自定义滚动条样式

### options.shrinkScrollbars

有效值是`clip`和`scale`

`clip`是移动指示器到它容器的外面，效果就是滚动条收缩起来，简单的移动到屏幕以外的区域。属性设置为此值后将大大的提升整个iScroll的性能。

`scale`关闭属性`useTransition`，之后所有的动画效果将使用`requestAnimationFrame`实现。指示器实际上有各种尺寸，并且最终的效果最好。

如果页面在多种设备上运行最好使用`scale`，在旧的设备上应该设置为`clip`。

### 滚动条样式

如果不喜欢默认的滚动条样式，可以自定义。

第一步是设置选项`scrollbars`的值为`custom`。

以下内容是自定义滚动条需要设置的css类名

#### .iScrollHorizontalScrollbar

这个样式应用到横向滚动条的容器。这个元素实际上承载了滚动条指示器。

#### .iScrollVerticalScrollbar

和上面的样式类似，只不过适用于纵向滚动条容器。

#### .iScrollIndicator

真正的滚动条指示器。

#### .iScrollBothScrollbars

这个样式将在双向滚动条显示的情况下被加载到容器元素上。通常情况下其中一个（横向或者纵向）是可见的。

## 指示器

上面所有关于滚动条的选项实际上是包装了一个底层的选项indicators。它看起来或多或少像这样

```js
var myScroll = new IScroll('#wrapper', {
    indicators: {
        el: [element|element selector]
        fade: false,
        ignoreBoundaries: false,
        interactive: false,
        listenX: true,
        listenY: true,
        resize: true,
        shrink: false,
        speedRatioX: 0,
        speedRatioY: 0,
    }
});
```

### options.indicators.el

这是一个强制性的参数，它保留了指向滚动条容器元素的引用，容器里的第一个子元素就是指示器，而且滚动条可以在文档的任何地方，它不需要在滚动条包装器内。

格式如下：

```js
indicators: {
    el: document.getElementById('indicator')
}
```

或者

```js
indicators: {
    el: '#indicator'
}
```

### options.indicators.ignoreBoundaries

默认值`false`

这个属性告诉指示器忽略它容器所带来的边界，比如想让指示器是滚动条速度的两倍，指示器将很快到达它的结尾，这个属性被用在视差滚动。


### options.indicators.listenX、options.indicators.listenY

默认值`true`

指示器的横向和纵向被侦听。可以设置一个或者都设置

### options.indicators.speedRatioX、options.indicators.speedRatioY

默认值0

指示器移动的速度和主要滚动条大小的关系，默认情况下是设置为自动。基本不需要改变的参数。

### options.indicators.fade、options.indicators.interactive、options.indicators.resize、options.indicators.shrink

这几个选项和已经介绍过的滚动条中的一样，可以参考下面这个案例

js部分

```js
myScroll = new IScroll('#wrapper', {
    startX: -359,    // 初始位置
    startY: -85,
    scrollY: true,    // 横向纵向可同时滚动
    scrollX: true,
    freeScroll: true,    
    mouseWheel: true,
    indicators: {        
        el: document.getElementById('minimap'),    // 指向滚动条容器元素的引用，容器里的第一个子元素就是指示器
        interactive: true        // 让指示器可滚动
    }
});
```

html部分

```html
<div id="wrapper">
    <div id="scroller">
    </div>
</div>
<div id="minimap">
    <div id="minimap-indicator">
    </div>
</div>
```

css部分

```css
#wrapper {
    position: absolute;
    z-index: 1;
    width: 235px;
    height: 321px;
    top: 0;
    left: 0;
    background: #555;
    overflow: hidden;
}
#scroller {
    position: absolute;
    z-index: 1;
    width: 797px;
    height: 1087px;
    background: url(ermine.jpg);
}
#minimap {
    position: absolute;
    z-index: 1;
    width: 235px;
    height: 321px;
    background: url(ermine.jpg);
    background-size: 235px 321px;
    top: 0px;
    left: 245px;
}
#minimap-indicator {
    position: absolute;
    z-index: 1;
    border: 1px solid #fe0;
    box-shadow: 0 0 5px #000;
    background: rgba(255,255,255,0.15);
}
```

### 视差滚动

视差滚动时指示器的一个功能，指示器是一个遵循主滚动条移动和动画的层。增加这个功能就可以创建任意数量的指示器和视差滚动。

js部分

```js
myScroll = new IScroll('#wrapper', {
    mouseWheel: true,
    indicators: [{
        el: document.getElementById('starfield1'),
        resize: false,
        ignoreBoundaries: true,
        speedRatioY: 0.4
    }, {
        el: document.getElementById('starfield2'),
        resize: false,
        ignoreBoundaries: true,
        speedRatioY: 0.2
    }]
});
```

html部分

```html
<div id="wrapper">
    <div id="scroller">
    </div>
</div>
<div id="starfield1" class="starfield">
    <div id="stars1"></div>
</div>
<div id="starfield2" class="starfield">
    <div id="stars2"></div>
</div>
```

css部分

```css
#wrapper {
    position: absolute;
    z-index: 3;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
}

#scroller {
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 4000px;
    overflow: hidden;
    background: url(galaxies1.png);
}

#starfield1 {
    z-index: 2;
}

.starfield {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
}

.starfield div {
    position: absolute;
    width: 100%;
    overflow: hidden;
}

#stars1 {
    z-index: 2;
    height: 3000px;
    background: url(galaxies2.png);
}

#stars2 {
    z-index: 1;
    height: 2000px;
    background: url(stars.jpg);
}
```

### 滚动的接口

可以通过下面的方法滚动到指定位置

#### scrollTo(x, y, time, easing)

初始化IScroll之后会创建一个`myScroll`实例(名字是自己定义的变量)，可以通过`myScroll.scrollTo(0, -100)`滚动到任意位置。因为左上角永远是0，所以向下滚动一定是负数

参数`time`和`easing`是可选项，他们控制滚动周期（毫秒）和动画的擦除效果。动画擦除对象是`IScroll.utils.ease`，可擦除动画类型有`quadratic`, `circular`, `back`, `bounce`, `elastic`。

示例：`myScroll.scrollTo(0, -100, 1000, IScroll.utils.ease.elastic);`

#### scrollBy(x, y, time, easing)

和上面一个方法类似，但是可以传递X和Y的值从当前位置进行滚动。

`myScroll.scrollBy(0, -10)`会在当前位置向下滚动10个像素。

#### scrollToElement(el, time, offsetX, offsetY, easing)

在这个方法中只有一个强制的参数就是el。传递一个元素或者一个选择器，IScroll将尝试滚动到这个元素的左上角位置。

`time`是可选项，用于设置动画周期。

`offsetX` 和 `offsetY`定义像素级的偏移量，如果把这两个参数设置为true，元素将会位于屏幕的中间。

`easing`和之前的一样。

## 对齐

iScroll能对齐到固定的位置和元素。

### options.snap

按照页面容器大小自动分割滚动条

```js
var myScroll = new IScroll('#wrapper', {
    snap: true
});
```

也可以设置滚动条将要对齐的元素的选择器

```js
var myScroll = new IScroll('#wrapper', {
    snap: 'li'
});
```

### goToPage(x, y, time, easing)

`x`和`y`呈现想滚动到横向轴或者纵向轴的页面数，如果需要咋单个纬度上使用滚动条，只需要为你不需要的轴上传递0值。

`time`属性是动画周期，可选项

`easing`属性是滚动到指定点使用的擦除功能类型，参照option.bounceEasing对象，可选项

在一秒钟内沿着横向滚动到第10页 `myScroll.goToPage(10, 0, 1000);`


## 缩放

为了使用缩放功能，你最好使用iscroll-zoom.js脚本。

### options.zoom

默认值`false`

此属性设置为`true`启用缩放功能。

### options.zoomMax

默认值4

最大缩放级数

### options.zoomMin

默认值1

最小缩放级数

### options.startZoom

默认值1

初始的缩放级数

### options.wheelAction

鼠标滚轮的动作可以设置为`zoom`，这样在滚动滚轮时缩放操作会代替原来的滚动操作。

放大的示例：

js部分

```js
myScroll = new IScroll('#wrapper', {
    zoom: true,
    scrollX: true,
    scrollY: true,
    mouseWheel: true,
    wheelAction: 'zoom'
});
```

html部分

```html
<div id="wrapper">
    <div id="scroller">
        <p>111111111111111111111111111</p>
        ......
    </div>
</div>
```

css部分

```css
#wrapper {
    position: absolute;
    z-index: 1;
    top: 50px;
    bottom: 50px;
    left: 50px;
    right: 50px;
    background: #ccc;
    overflow: hidden;
}

#scroller {
    position: absolute;
    z-index: 1;
    width: 100%;
}
```

### zoom(scale, x, y, time)

`scale`是缩放因子

`x` 和 `y`是缩放关注点，即缩放的中心。如果没有指定，这个中心就是屏幕中心。

`time`是毫秒级别的动画周期,可选



> 缩放功能使用的CSS的转换功能。iScroll只能在支持此CSS功能的浏览器上执行。
一些浏览器（特别是基于webkit的）采取的快照缩放区域就放在硬件合成层(比如当你申请转换)。该快照作为纹理的缩放区域,它几乎不能被更新。这意味着您的纹理将基于 scale 1 进行缩放,将导致文本和图像模糊,清晰度低。
一个简单的解决方案是使用实际分辨率双倍（或者三倍）装载内容，然后 放到一个按照scale(0.5)比例缩小的div中。这种方法大多数情况下能适用。


## 刷新

IScroll需要知道包装器和滚动器确切的尺寸，在IScroll初始化的时候进行计算，如果元素大小发生了变化，需要告诉IScroll DOM发生了变化。

```js
ajax('page.php', onCompletion);

function onCompletion () {
    // 更新DOM
    setTimeout(function () {
        myScroll.refresh();
    }, 0);
};
```
这里调用`refresh()`使用了零秒等待，如果你需要立即刷新IScroll边界就是如此使用。当然还有其他方法可以等待页面重绘，但零超时方式相当稳定。


## 自定义事件

使用`on(type, fn)`方法注册事件

```js
myScroll = new IScroll('#wrapper');
myScroll.on('scrollEnd', doSomething);
```

可用的事件列表如下：

- beforeScrollStart，在用户触摸屏幕但还没有开始滚动时触发。

- scrollCancel，滚动初始化完成，但没有执行。

- scrollStart，开始滚动

- scroll，内容滚动时触发，只有在scroll-probe.js版本中有效，请参考onScroll event。

- scrollEnd，停止滚动时触发。

- flick，用户打开左/右。

- zoomStart，开始缩放。

- zoomEnd，缩放结束。

## 滚动条信息

iScroll存储了很多有用的信息，您可以使用它们来增强应用场景，可以说要用IScroll做一个功能这个信息是必不可少的。

最常用到的信息有

- `myScroll.x / y` 当前位置

- `myScroll.directionX / Y` 最后的方向（-1 down / right，0 still，1 up / left） 

- `myScroll.currentPage` 当前对齐捕获点


在回调中，通过`this`就可获取到所有的滚动条信息。
```js
myScroll = new IScroll('#wrapper');
myScroll.on('scrollEnd', function () {
    if ( this.x < -1000 ) {
        // do something
    }
});
```

## 销毁

在不需要使用iScoll的时候调用iScroll实例的公共方法destroy()可以释放一些内存。

```js
myScroll.destroy();
myScroll = null;
```