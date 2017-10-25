
## word-spacing 单词间距

判断是否是单词的依据是有没有空格

## 行高的测量方式

假如文字是12px，行高是16px，那么文字上下空隙分别是2px，假如行高是15px，那么上方是1px，下方是2px。

## white-space 强制不换行

值为nowrap为强制不换行，默认是normal。

## text-indent  首行缩进。

通常设置em，这样文字尺寸改变了也不用该缩进值，只需要设置2em便一直是2个字的距离。

## 文字和空格的大小

字体本身原本是一张张的图片，通过一定的编码方式确定是哪个文字，文字和文字之间本身也有一定的缝隙，算上缝隙才算是一个文字的大小，所以文字大小最好是从上到下测量。而宋体中一个空格的大小差不多是一个文字的一半。

## 伪类的顺序

a:link 未访问过,a:visited 访问过后,a:bover 鼠标移入,a:active 鼠标按下。

## clear属性

给一个元素加上clear属性，那么对应方向上的元素就不会浮动了。值可以设置为left|right|both|none|inherit。
clear:both是左右两侧都不能浮动。

## 清除浮动的方法

清除浮动是为了让元素回归文档流，回归到同一层级。

### 加高度

给浮动元素的父元素加一个固定的高度。缺点是扩展性不好。有时候高度不能写死。

### 父级浮动

给浮动元素的父元素加浮动，缺点是父元素的父元素仍然会有问题，当前元素的父元素同时也是更上级元素的子元素。而且`margin:0 auto;`会失效

### inline-block

给浮动元素的父元素加inline-block，缺点也是`margin:0 auto;`会失效

### 使用空白元素

在浮动元素的后面增加一个没有内容的块级元素设置css为clear:both。缺点是只要清除浮动就要放一个空白元素，而且ie6仍会有2px的默认高度。

### br

在浮动元素后面增加一个`<br clear="all" />`。缺点也是只要清除浮动就要放一个空白元素。

### 伪类清除浮动

假设浮动元素的父元素添加一个class名为clearfix。

```
.clearfix {
    *zoom:1;
}
.clearfix:after {
    content:'';
    display:block;
    clear:both;
}
```
zoom是为了兼容ie浏览器，当设置了zoom之后会检索设置对象的缩放比例，所设置的元素就会扩大或缩小，高度就被重新计算了，所以可以清除浮动，*号是hack的写法，只有ie6、7浏览器可以识别。

### overflow

给浮动元素的父元素设置overflow:hidden。原理是触发BFC。缺点是比浮动长的内容会被直接剪裁掉。


## BFC和haslayout

**BFC(block formatting context)**:BFC是块级元素格式化上下文。是标准浏览器块级元素的标准(除了ie6、7、8之外都是标准浏览器)。

**haslayout**:ie浏览器特有的。

只要触发了这两个其一，那么这个触发的区域就是一个独立的区域不受外界影响，也可以理解为元素就不会脱离标准文档流了。

触发BFC的情况

1. float的值不会none。
2. overflow的值不为visble(这就是overflow:hidden可以清楚浮动的原理，让其触发BFC)。
3. display的值为table-cell、table-caption、inline-block中的任何一个。
4. position的值不为relative和staic。
5. width|height|min-width|min-height的值不是auto的时候。

触发haslayout的情况

1. zoom的值不会normal的时候。给ie浏览器设置zoom:1清楚浮动就是为了触发haslayout。

## css hack

- `\9`所有ie10及以下的浏览器。`\9`是写在属性值的后面。

- `*`ie7及以下浏览器，写在属性的开头。

- `_`ie6及以下浏览器，写在属性的开头。

hack的书写顺序要从高版本往低版本写，因为css是按照顺序执行，后面的覆盖前面的，所以先做统一处理，最后再去处理个别低版本浏览器。另外hack不是一个标准的方法，所以一般不要使用。

## 禁止选中文字

不同的浏览器设置的内容不一样，user-select不是一个W3C的标准，浏览器的支持不完成，需要对不同的浏览器进行调整。

user-select有2个值（none表示不能选中文本，text表示可以选择文本）

```css
-moz-user-select:none;    /*火狐*/

-webkit-user-select:none;    /*webkit浏览器*/

-ms-user-select:none;    /*IE10*/

-khtml-user-select:none;    /*早期浏览器*/

user-select:none;

```

ie6至ie9还没发现有css属性支持

## opacity的兼容性

opacity是设置透明度，标准写法是`opacity:1;`,兼容ie的写法是`　filter:alpha(opacity=100);`

## 超出2行隐藏(强制2行)

首先css有三个属性：

`overflow:hidden`超出的内容隐藏。

`text-overflow:ellipsis`溢出用省略号显示

`white-space:nowrap`溢出不换行

这样只能强制一行显示，如果要强制2行显示要用css3的属性。

`display:-webkit-box`将对象作为弹性伸缩盒子模型显示

`webkit-box-orient:vertical`设置伸缩盒子的子元素排列方式(从上到下垂直排列子元素)

`-webkit-line-clamp:2`显示的行数，不能单独出现。

最后css样式如下：

```css
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp:2;
```

## css命名参考

头：header head

内容：content container

尾：footer

导航：nav navigation

侧栏：sidebar aside

栏目：column

页面外围控制整体布局宽度：wrapper wrap

左右中：left right middle center

登录条：login

标志：logo

广告：banner

页面主体：main body main-content page-main

热点：hot

新闻：news

下载：download

子导航：subnav

菜单：menu dropmenu

子菜单：submenu

标题：title ttl caption small-caption

摘要：summary

搜索：search

友情链接：friend-link flink

页脚：footer

版权：copyright

滚动：scroll

标签页：tab

文章列表：list

栏目标题：title

服务：service

注册：register

投票：vote

加入我们：joinus

状态：status status-bar

按钮：btn-

图标：ico- icon-

滚动：scroll

标签页：tab

文章列表：list

弹出层：pop popup

对话框：dialog dlg

状态提醒：success error alert notice caution

提示信息：msg message message-box

当前的：active act current curr selected on

小技巧：tips

注释：note　notice

指南：guide


## 移动端弹窗时暴力禁止html滚动

```css
html.lock-html {
    height: 100%;
    overflow: hidden;
}
```

## 实现文字竖向排版

### 模拟竖排文字

对文字对象的宽度设置只能排下一个文字的宽度距离，让文字一行排不下两个文字使其文字自动换行，就形成了竖立排版需求。

### writing-mode属性

`writing-mode` 有两套属性，一套是IE私有的，另一套是CSS规范属性。

#### CSS规范属性

```css
writing-mode: horizontal-tb;    /* 默认值 */
writing-mode: vertical-rl;
writing-mode: vertical-lr;
```
`vertical-rl` 表示文本是垂直方向(vertical)展示，然后阅读的顺序是从右往左(rl:right-left)，跟我们古诗的阅读顺序一致。

`vertical-lr` 表示文本是垂直方向(vertical)展示，然后阅读的顺序还是默认的从左往右(lr:left-right)，也就是仅仅是水平变垂直。

![enter image description here](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/59520336b7c28190b615fc5b7f17a94e84b8a80e2fe33267303cb2a5079267e63bdb0ef955e23bcf600d2cfc62311b50?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-24.png&size=1024)

#### IE私有属性

```css
writing-mode: lr-tb | rl-tb | tb-rl | bt-rl | tb-lr | bt-lr | lr-bt | rl-bt | lr | rl | tb
```

IE下的属性特别多，但是需要关注的只有这几个：

如果是IE8及以上浏览器：`lr-tb` 、`tb-rl` 、`tb-lr`，分别对应于CSS规范中的 `horizontal-tb` 、`vertical-rl 、`vertical-lr`。

如果是IE7浏览器：`lr-tb` 和 `tb-rl` 分别对应CSS规范的 `horizontal-tb` 和 `vertical-rl`。

![enter image description here](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/a702cce905d871e58e72b214eccc3d00957920bcdb2daa514f0e70205b8d934a7e01d90ad3d9b5b95d298a12fd4a4ce8?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-25.png&size=1024)

## css的计算属性calc()

`calc()` 可以使用百分比、em、px和rem单位值计算出一个值应用于元素上，这样一来你就不用考虑元素DIV的宽度值到底是多少，而把这个烦人的任务交由浏览器去计算。比如说“width:calc(50% + 2em)”。

`calc()` 的表达式都写在括号里，支持四则运算，运算符前后要加空格，在IE浏览器只能兼容到IE9。这个属性最大的用处就不使用`box-sizing` 的情况下，元素的宽度如果设置为 100% 之后再设置 `margin` 、 `padding`、`border` 会导致元素实际宽度大于100%，而使用`clae()` 属性可以解决计算的麻烦，直接可以写为 `width: calc( 100% - margin * 2 - padding * 2 - border * 2 )`即可算出盒子的实际宽度并应用于元素。