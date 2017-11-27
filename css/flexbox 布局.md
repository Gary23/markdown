
# flexbox是什么

即使不知道视窗大小或者未知元素情况之下都可以智能的、灵活的调整和分配元素和空间两者之间的关系。简单的理解，就是可以自动调整，计算元素在容器空间中的大小。

# 使用flexbox

要开始使用flexbox，必须先让父元素变成一个flex容器，而此时子元素就变成了flex项目。

可以在父元素中设置`display:flex`或者`display:inline-flex`。这样一个flexbox格式上下文就启动了。

html结构
```html
<ul> <!--parent element-->
  <li></li> <!--first child element-->
  <li></li> <!--second child element-->
  <li></li> <!--third child element-->
</ul>
```

css样式
```css
ul {
    display: flex;
    border: 1px solid pink;
}
li {
    list-style: none;
    width: 100px;
    height: 100px;
    background-color: #8cacea;
    margin: 8px;
}
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/a0be427e384a9a7069151f21e0b8c9e825e0551dcb7250d41d832fd588249f180dcd843b6411c3ca7e4a3cdce6bfc75d?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-4.jpg&size=1024)

# flex容器属性

> flex-direction || flex-wrap || flex-flow || justify-content || align-items || align-content

当父元素设置为一个flex容器后，这几个属性可以直接使用在flex容器上。

## flex-direction

`flex-direction`属性控制flex项目沿着主轴(Main Axis)的排列方向。

这个属性具有四个值，分别是水平、垂直、水平反向、垂直反向

> row(默认) || column || row-reverse || column-reverse  

简单来说就是`flex-direction`属性让你决定flex项目如何排列，其实水平和垂直在flex中不是方向概念，它们常常被称为主轴(Main-Axis)和侧轴(Cross-Axis)

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/f968dc4b571984d4c224de47e4a29692bbdce40eebeeaeeff0f88ce3dbe2f9f69ff0906eea1eb05270ef881802949ec4?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-5.jpg&size=1024)

如果把`flex-direction`属性改为`column`，这时flex项目将沿着Cross-Axis从上到下垂直排列。

html结构
```html
<ul> <!--parent element-->
  <li></li> <!--first child element-->
  <li></li> <!--second child element-->
  <li></li> <!--third child element-->
</ul>
```

css样式
```css
ul {
    display: flex;
    flex-direction: column;
    border: 1px solid pink;
}

li {
    list-style: none;
    width: 100px;
    height: 100px;
    background-color: #8cacea;
    margin: 8px;
}
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/39b0138df2de493bef04e998807d0ef3e66a511d2ff512ebeba0fb19d20c4e76142ac73c385cf4e2afa4546159f90192?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-6.jpg&size=1024)

> 在`flex-direction`改变方向后，实际上是改变的Main-Axis和Cross-Axis两个轴的方向，如果设置`flex-direction: column;`，那么实际上就是Main-Axis和Cross-Axis调换了位置。这将会影响之后基于Main-Axis和Cross-Axis的所有flex属性的设置。

## flex-wrap

`flex-wrap`属性有三个属性值，分别是换行、不换行、反向换行

> wrap || nowrap(默认) || wrap-reverse  

flex的默认行为会在一行内容纳所有的flex项目，即使浏览器出现滚动条(当flex项目的总体宽度大于浏览器窗口宽度)。默认是不换行的。

当flex项目过多时，也不会换行，所以每个项目会被压缩。而且如果flex项目元素内有类似文字等内容会撑开flex项目，那么浏览器就会出现滚动条。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/c314199f2196190ec9600f4cb22ddafe3d2bb88a8caf68f35c3425874197a6ad72ae5d9a269e8e46c38c977944a3da04?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-7.jpg&size=1024)


如果希望flex容器在其flex项目达到一定数量能换行，将`flex-wrap`设置为`wrap`即可。当一行再不能包含所有列表项的默认宽度，就会多行排列。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/b7777cec09436557afc988de6a2cb37be79b7c796520b9bf6834a066b2db0904056445e9febb7a320aab4cbeace6e3ed?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-8.jpg&size=1024)

除此之外，还有一个值`wrap-reverse`。它让flex项目在容器中多行排列，只是方向是相反的。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/0a1358406ea6f73d9f8471c847ad08411325d355d7295b0d1afea3efe2cd6053e2be6ef1b14015e8c4f05f8f0f9e9cd1?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-9.jpg&size=1024)

## flex-flow

`flex-flow`是`flex-direction`和`flex-wrap`两个属性的连写属性。

> 就好比`border: 1px solid red`的概念

`flex-flow: row wrap`相当于`flex-direction: row; flex-wrap: wrap;`的写法。

## justify-content

`justify-content`属性主要定义了flex项目在Main-Axis上的对齐方式，有五个值可选：

> flex-start(默认) || flex-end || center || space-between || space-around

`justify-content: flex-start;`是让所有flex项目靠Main-Axis开始边缘(左对齐)，也就是默认。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/8c07713c9d3e1bbea17e76b22461a464e4559ca3603d1242739e0e0dd6ecd42ffd18c7a707edb791de19ab05d1720cc6?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-10.jpg&size=1024)

`justify-content: flex-end;`是让所有flex项目靠Main-Axis结束边缘(右对齐)。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/a2751ece700f228e26f22d0c586846dbaa2c59cc93dac069517ce0376045d25ed7078c6b14b26e901291a10cb3e352d4?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-11.jpg&size=1024)

`justify-content: center;`让所有flex项目排在Main-Axis的中间(居中)

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/be628325ad4d218b617e7523cf4869330bf18e0cfd82ca4fd1f8e764076634b0684ce279d0c51ce539d15211c61c39c9?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-12.jpg&size=1024)

`justify-content: space-between;` 让除了第一个和最后一个flex项目的两者间间距相同(两端对齐)

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/8032071f92aabc701e8c9264cf9e1e89c9bf3c0a5a3fa0ab0a04fb87233d96746c378fea1c4834edcd44f05901eb902a?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-13.jpg&size=1024)

`justify-content: space-around;`让每个flex项目具有相同的空间，相当于是给每个flex项目相同的`margin-left`和`margin-right`

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/99887e97f6bbaab135ddab6e644c5ade60467f18995de7f5235c648b09640f174c62f170e02640edc05bf106cd118251?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-14.jpg&size=1024)

## align-items

`align-items`属性类似于`justify-content`属性，主要是控制flex项目在Cross-Axis对齐方式，有五个可选值：

> flex-start || flex-end || center || stretch(默认) || baseline

`align-items: stretch;`在没有设置flex高度的情况下，让所有的flex项目高度和flex容器高度一样。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/6e679ec79c6ba95371cbd8ea1a0ddf929891fa0405335d6aa43862326c631d1c57c30a26ecf3016413c78db6df5cf872?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-15.jpg&size=1024)

`align-items: flex-start;`让所有flex项目靠Cross-Axis开始边缘(顶部对齐)

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/9b1dd7cfddb9814bc2fdf95debb204598833d8355c9e8b69fc78150861a75383a45ae9b9e3e29a9a68e07d5b2694b5be?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-16.jpg&size=1024)

`align-items: flex-end;`让所有flex项目靠Cross-Axis结束边缘(底部对齐)

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/5f86ae18f13556eba9e190475a3974fd0bf24ac80b79606a3df9af3a30fa84a69815d37055415ea34bfba4fe7bac470c?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-17.jpg&size=1024)

`align-items: center;`让flex项目在Cross-Axis中间(居中对齐)

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/adb052cb93736d1da0524cb8466acf50246c6aa1ea1814eb80e30dec262c23fd0408f33abfc342d278eed9491d291b7b?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-18.jpg&size=1024)

`align-items: baseline;`让所有flex项目在Cross-Axis上沿着他们自己的基线对齐

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/802a98295d7774aa9e76f105250ab85277bbbacb45dda61d72840235e0a43de90f22b8301525c28d68aa807f0a7342c7?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-19.jpg&size=1024)

## align-content

`align-content`必须用于多行的flex容器，也是用来控制flex项目在flex容器里的排列方式，效果和`align-items`相似，可选五个值：

> flex-start || flex-end || center || stretch(默认)

`align-content: stretch;`会拉伸flex项目，让他们沿着Cross-Axis适用flex容器可用的空间。
![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/6ef3c8e310b377d3af436216e373b1cb38c55f769854a36a366213d80fdf28f30a420dd560c2a7ac5205e83531607020?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-20.jpg&size=1024)

`align-content: flex-start;`让多行flex项目靠Cross-Axis开始边缘。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/85f33a3d6d96f29f54b85c9cd286de65ba661f75ff8adb1317b12c0fbf531c7f6918b31bf968d3d1d5fd1bade5934ee1?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-21.jpg&size=1024)

`align-content: flex-end;`让多行flex项目靠Cross-Axis结束位置

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/b8100e32d95231a996d3529e9c75477e0e9a3b4e4501d0207ecef0a825d8f03f860ff008c9c4bf7ae2145761c65e9cba?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-22.jpg&size=1024)

`align-content: center;`让多行flex项目在Cross-Axis中间

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/5f8cacd1b6fa645515af91e08884d3b1d562d207ba45f411cb736e5afef729ea883eb3698e43d5cb36410467139e2fb7?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-23.jpg&size=1024)


# flex项目属性

> order || flex-grow || flex-shrink || flex-basis

## order

允许flex项目在一个flex容器中重新排序，基本上可以改变flex项目的顺序从一个位置移到另一个地方。

这也意味着flex项目的位置改变在html中不需要改变源代码。

`order`的默认值是0，也可以接收一个正值或一个负值。数值越大的flex项目排序越往后，如果两个以上flex项目有相同的`order`值，flex项目重新排序是基于html源文件的位置进行排序

```html
<ul>
    <li style="font-size:24px;">列表项1</li>
    <li style="font-size:24px;">列表项2</li>
    <li style="font-size:24px;">列表项3</li>
    <li style="font-size:24px;">列表项4</li>
    <li style="font-size:24px;">列表项5</li>
</ul>
```

```css
li:nth-child(1) {
    order: 2;
}
li:nth-child(2) {
    order: 1;
}
li:nth-child(3) {
    order: 3;
}
li:nth-child(4) {
    order: 3;
}
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/d8712d57f62fcced8578c1c1e72e5c64c6ecfd14aaa6f1f4c784a61c057055316015d954668ea3e491a80eaf9080e83e?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-24.jpg&size=1024)

## flex-grow和flex-shrink

`flex-grow`属性控制flex项目在容器有多余的控件如何放大。默认值0。

`flex-shrink`属性控制flex项目在容器没有额外空间又如何缩小。默认值1。

取值范围是0或者大于0的任何正数值，这个数值是设置flex项目在容器中所占比。

首先来看`flex-grow: 0;`的效果

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/493c9d0c04d5217d65b8fb5e09b1be7e2a385d1ea81f453781ee49c31dc43650ff7adab4dd86c787e9313cb3774c6401?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-25.jpg&size=1024)

flex容器有多余的空间，这时将`flex-grow: 1;`即可让flex忽略自己本身的宽度，平均分配flex内部的空间，通过这个数值也可以改变每个flex项目所占空间的占比。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/f331ec93c61fe0d765f115b9ff2966ea67508a8a384b6eb0dcaee48243464a14965e48976f4673a6ec9dd4b83e1a1543?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-26.jpg&size=1024)

而`flex-shrink`属性和`flex-grow`属性是相反的，现在设置`flex-shrink: 0;`看一下。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/bd8b1c98c3d07f3797ff41d88f7a303536f1d35cc9a3bb2dd1605f41792bbe576859057a192bf04caf9b6e3dc45a76cc?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-27.jpg&size=1024)

如果像是这样flex项目的宽度多出了flex容器，那么就需要将`flex-shrink: 1;`，这样会压缩flex项目的宽度，让其平均分配flex容器的空间，数值也是flex的占比。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/fbced702f50424ba3592a9ec6ac1524b4630bb2a0a35b7c45137b11fe7ac50b1be1cf234972c8cabb7633e2d4dddf084?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-28.jpg&size=1024)

## flex-basis

`flex-basis`属性可以指定flex项目的初始大小，也就是在`flex-grow`和`flex-shrink`调整之前的大小。

`flex-basis`默认值是`auto`，可以取任何用于width属性的值，比如`% || em || rem || px`等等。但是如果要设置为0的话也要带有单位，`flex-basis: 0;`这种写法是错误的。

`flex-basis: auto;` 这是默认情况flex项目的宽度。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/5044cc7d421a789ce00347a363c4676277936ce0bd2d08d2efd10237b7debc70d99c17db5b05854ebfdbffc62611efe8?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-29.jpg&size=1024)

可以看出flex项目的宽度就是由内容撑开，而使用`flex-basis: 150px;`这样flex的宽度就被设置为了固定的150px;

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/c4cd7fceb31fab18b7d95c3dc1244686b16cd188f87565a59db90fef5a4579910c741832c8cc61d7717e1d1c3bbc7d1d?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-30.jpg&size=1024)

## flex连写

`flex`是`flex-grow`、`flex-shrink`、`flex-basis`三个属性的连写。

`flex: 0 1 auto;`相当于`flex-grow: 0; flex-shrink: 1; flex-basis: auto;`

## align-self

`align-self`可以改变一个弹性项目沿着侧轴的位置，而不影响相邻的弹性项目。该属性的可选值为：

> auto(默认) || flex-start || flex-end || center || baseline || stretch。

`align-self: flex-end;`、`align-self: center;`、`align-self: flex-start;`三个值的效果。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/730fe7341647e00fbd471ac2735d09b65a982032ded29dd46a0e4845893c1d31d882ca0cb29cceb4c0b3de9c04063275?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-31.jpg&size=1024)

`align-self: stretch;`会将目标flex项目拉伸，以沿着Cross-Axis填满flex容器的可用空间。
![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/3cfca2d46b3ce8f6e5974a63e002dbc1cfbfa5535b82655ec1631b77900aa1d7fccbb4439e05bdf2d5b6d185141b2537?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-32.jpg&size=1024)

`align-self:baseline;`将目标flex项目沿着基线对齐，在这里效果和`flex-start`效果相同。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/63f5b2161e3359bd6adcb4314d625b5f051edb3abd845f183ca56de1818a7bc6e7140df121059d04cdf2aa0b3411a62d?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-33.jpg&size=1024)

最后一个是`align-self: auto;`是将目标flex项目的值设置为父元素的`align-items`的值，或者如果该元素没有父元素的话，就设置为`stretch`。

# 相对和绝对flex项目

相对和绝对flex项目主要区别在于间距和如何计算间距，相对flex项目内的间距是根据它的内容大小来计算的，而在觉得flex项目中，只根据flex属性来计算。

先来看相对flex，flex项目设置`flex: auto`，这个设置和`flex: 1 1 auto;`是相同的，这样flex项目就是基于其包含内容的大小而计算的。下面的图中每个flex项目的内容不同，其占的宽度也不相同。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/2aacd77beec4fb2dc722a1a090d36e17032fa68213dc6c051ca10f3ef82514f53fd23d1073055e1254f4d62a47a397d4?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-34.jpg&size=1024)

下面来设置成绝对的flex项目，`flex: 1;`这个设置和`flex: 1 1 0;`效果是一样的。`flex-basis: 0;`的情况下，flex项目会基于`flex-grow`来计算自己的空间，而`flex-grow: 1;`，所以每个flex所占空间相同。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/ed54f15b31ba7397b54e4ca8fbf9108fa4223b7bdfee172fbdcf8065b8ceaab0f60d49db101f51f7684dd9daefec38c0?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-35.jpg&size=1024)

从上面可以得出结论，绝对flex项目的宽度只基于flex属性，相对flex的宽度基于内容的大小。