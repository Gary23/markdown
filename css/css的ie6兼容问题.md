# css的ie6兼容问题

@(CSS)


---

title: css的ie6兼容问题
date: 2017-06-13 13:45:13
tags: css笔记

---

## png图片的兼容性

png的图片在ie6下默认不是透明的，所以需要处理一下。

1. 使用DD_belatedPNG插件，需要在script中调用，`DD_belatedPNG.fix("selector1,selector2")`，缺点是不支持body元素。

2. 第二种方法是使用ie6的滤镜属性，这个属性body也可以使用。`_background-image:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="XX.png",sizingMethod="crop");`，因为只需要ie6支持所以用了hack。

## float在ie6的兼容问题

有如下结构

```html
<style>
.box {
    width: 400px;
    border: 1px solid #000000;
    overflow: hidden;
}

.left {
    float: left;
    background-color: red;
}

.right {
    float: right;
    background-color: blue;
}

h2 {
    height: 30px;
}
</style>

<div class="box">
    <div class="left">
        <h2>左边</h2>
    </div>
    <div class="right">
        <h2>右边</h2>
    </div>
</div>
```
将.left和.right分别左右浮动并设置颜色、h2元素设置高度应该是如下效果。

![enter image description here](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/c5d316903851fe3601d00f7c1924caa55afa3716bdafc94eae2733f4b614b39660a826fadfffcd908c960ce073c7fb66?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-40.png&size=1024)

但在ie6下会显示成这样，

![enter image description here](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/ffeafa79fe0a8051ae92a9d6db19c1e7f2cf9a3fbb9b953b1ed069906f62a376a059350837f5b64691380bb6bed9fbc7?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-41.png&size=1024)

ie6下在浮动的元素下的元素h2设置高度，会独占整行，因为h2是块级元素，但我希望的是浮动元素被内容撑开。这时只要设置样式`h2{float:left}`就可以解决这个问题。

另外假设父元素的宽度够长，如果子元素中第一个元素浮动并且宽度为200px，那么第二个元素即是设置了margin-left:200px;那么会有也间隙，所以既然要并排显示那么就都设置浮动，不要一个浮一个不浮。

## ie6浏览器子元素超出宽度问题

在标准浏览器子元素比父元素宽高大时，会超出父元素，但不会改变父元素大小，但是在ie6下回直接撑大父元素，会导致整个布局乱掉，所以ie6下布局一定要注意子元素的尺寸问题。

## 块级元素嵌套规则

p标签、h标签、td标签是不能嵌套块级元素的，如果在ie6下嵌套了还会莫名多生成一个块级元素占用空间，布局也会乱掉。

## margin的兼容性问题

### margin-top的传递问题

在子元素中设置margin-top那么父元素也会掉下来。

1. 给父元素设置边框。
2. 给父元素设置overflow:hidden。(标准浏览器、ie7及以上浏览器)
3. 给父元素设置zoom:1;(ie7及以下浏览器)
4. 在ie7及以下浏览器设置父盒子的宽和高也可以解决。

### 上下margin的叠压问题

同级元素如果有上下margin的设置，那么上下两个元素会导致上面元素的下margin和下面元素的上margin重叠。

解决方法是不要设置margin,而是设置某一个方向的margin，比如margin-top、margin-bottom。

## inline-block的兼容性问题

ie7及以下浏览器不识别display:inline-block属性。所以在ie7及以下浏览器要用行内块需要设置`*display:inline;*zoom:1;`。*号是只让ie7、ie6识别。

## ie6的最小高度问题

在ie6浏览器下最小高度是19px；如果要设置小于19px的元素，那么首先要设置具体高度，然后要加`*overflow:hidden`属性。剪裁掉多出的部分。

## ie6双边距的问题

当元素浮动后，再设置margin-left那么就会产生双倍边距。解决办法是给浮动元素设置`*display:inline`。

## ie6浏览器li的间隙

ie6浏览器下li元素内部的子元素如果浮动，li之间就会产生4px的间隙。解决方法是给li元素增加`*vertical-align:top;`属性。

## ie6文字溢出的bug

ie6下两个浮动元素中间有注释或者内联元素，并且两个浮动元素宽度相加和父级宽度相差在6px以内，就会导致浮动元素内的文字溢出一个重复的，并且每多一个内联元素或者注释就会多出一个重复文字。

1. 让两个浮动元素之间没有内联元素和注释。
2. 如果只有一个浮动元素设置了宽度另一个没有宽，那么比父盒子的宽小3px即可。
3. 如果两个浮动元素都设置了宽，那么两个元素加起来要比父盒子的宽小6px。

## ie6相对定位于overflow:hidden的问题

ie6下当子元素比父元素大时，并且子元素设置了相对定位，那么父盒子即使使用overflow:hidden也无法剪裁子元素。

只有将父盒子也设置为相对定位才可以剪裁。

## ie6绝对定位奇数问题

当父元素设置相对或者绝对定位并且宽高为奇数，那么在ie6中子元素设置绝对定位即使left/right和top/bottom设置为0，也会有1px的距离。

所以ie6下要使用定位父盒子必须是偶数。

## ie6浮动元素和绝对定位的问题

父元素设置相对定位，如果子元素设置浮动撑满整个父元素的空间，那么此时再有一个同级子元素设置绝对定位则这个元素会消失。

1. 造成这个原因的是同级的问题，那么再绝对定位元素外面套一层元素就可解决。
2. 也可以让浮动的子元素宽加起来比父元素少6px，那么绝对定位的元素也可以显示出来。

## ie6下input间隙问题

input作为子元素时，父盒子不设高度，那么input设置高度后撑开父盒子会造成上下分别1px的间隙，漏出父盒子。

解决方法是设置input左浮动