---
title: css写作建议
tags: css
notebook: css 
---

### 1. css渲染规则

关于css选择器的渲染规则，实际是从右到左，比如 `.box p a{color: red}` ，渲染过程大概是：

1. 找到所有a元素

2. 沿着a元素的父元素查找p元素，然后再沿着p元素查找.box

3. 中途找到了符合匹配规则的节点就加入结果集，如果找到html元素都没有匹配到，就不再遍历这条路径，从下一个a元素开始重复这个查找匹配。

这种方式要比从左到右节省很多时间，因为从右开始的话从第一步就筛选掉了很多不匹配的元素，而从左开始的话要遍历所有子节点，层级越深，要查找的子节点越多，时间都浪费在了失败的匹配上。

jQuery从1.3版本开始使用的Sizzle引擎，它按照了CSS选择器的匹配规则（从右至左）进行DOM元素的查找与匹配（当然其中做了很多优化），性能得到了很大的提升。

### 2. 嵌套层级不要超过3级

一般情况下，元素的嵌套层级不能超过3级，过度的嵌套会导致代码变得臃肿，沉余，复杂。导致css文件体积变大，还会造成性能浪费，影响渲染的速度！而且过于依赖HTML文档结构。这样的css样式，维护起来，极度麻烦，如果以后要修改样式，可能要使用!important覆盖。

### 3. 图片要设置width和height

如果页面有使用img标签，那么img很建议设置width和height。目的是为了在网速差或者其它原因加载不出图片的时候，保证布局不会乱。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/ff71bf3f35a7b78401db99dc45176938770e570af6da67c423da11fb566de28509f77d5dce5015e276666b2883b68c3f?pictype=scale&from=30113&version=2.0.0.2&uin=406490508&fname=20171220-5.png&size=1024)

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/7f2256d6f15980c473e073f95ff393323fe3880d25c5be8bfcc6466cb54dd4cb0d1d97db8dac3f933ada349b87dc83e5?pictype=scale&from=30113&version=2.0.0.2&uin=406490508&fname=20171220-6.png&size=1024)

关于设置width和height，有几点要注意：

1. PC站，建议在img标签的属性设置width和height。这样避免加载不出css而错位

2. 手机站，建议用css设置img的width和height，因为手机站要做适配，在属性设置width和height不灵活，比如使用rem布局，在属性那里设置不了width和height。

3. 如果图片不固定，但是有一个max-width和max-height，那么建议在img的父元素设置width和height。img根据父元素的width和height设置max-width和max-height。

### 4. 慎用*通配符

在做网页的时候经常会使用下面两种方式重置样式，以此来消除标签的默认布局和不同浏览器对于同一个标签的渲染。

`*{margin：0；padding：0;}`

上面这种方式，代码少，但是性能差，因为渲染的时候，要匹配页面上所有的元素！很多基础样式没有margin和padding的元素，比如div，li等。都被匹配，完全没必要！

`body,dl,dd,h1,h2,h3,h4,h5,h6,p,form,ol,ul{margin：0；padding：0;}`

这种方式，代码稍微多，但是性能比上面的方式好，在渲染的时候，只匹配body,dl,dd,h1,h2,h3,h4,h5,h6,p,form,ol,ul这里面的元素，这些元素带有margin和padding，需要重置！

总之，如果真的是要匹配所有节点才需要用通配符，但是极少有这种情况。像 `.test * {color: red;}` 这种例子，color属性本来也可以被继承，自然不需要通配符来匹配。

### 5. 合并

1. 合并公用的样式，比如项目的头部，底部，侧边栏这些，一般都是公用的，这些可以写在一个公用样式表上。比如main.css。

2. 面所说的main.css是每一个页面都需要引入，而比如样式重置表reset.css也是每一个页面都需要用到的，那么建议main.css和reset.css合并成一个文件，给页面引入！减少请求！

3. 每个页面对应的样式为独立的文件，比如首页对应的是index.css。产品列表页对应的样式是product-list.css。那么index.css就只在首页引入，其它页面不引入，因为引入纯属浪费请求资源！其他页面对应的样式也是这个处理方式！index.css，product-list.css等其它页面的样式就保留单独的文件，不作合并处理！

### 6. css在head引入

浏览器在所有的 stylesheets 加载完成之后，才会开始渲染整个页面，在此之前，浏览器不会渲染页面里的任何内容，页面会一直呈现空白。这也是为什么要把 stylesheet 放在头部的原因。如果放在 HTML 页面底部，页面渲染就不仅仅是在等待 stylesheet 的加载，还要等待 html 内容加载完成，这样一来，用户看到页面的时间会更晚。

### 7. css3动画的优化建议

1. CSS3动画或者过渡尽量使用transform和opacity来实现动画，不要使用left和top。

2. 动画和过渡能用css3解决的，就不要使用js。如果是复杂的动画可以使用css3+js（或者html5+css3+js）配合开发，效果只有想不到，没有做不到。

动画不宜过多，尤其是手机网站，否则会出现性能的问题，比如cpu一下子就被占用满了，掉帧等。而且，不建议给每一个元素都使用硬件加速。

### 其他建议

- body设置最小宽度

- 把常用样式抽封装成公用样式

- 不要在ID选择器前面进行嵌套或写标签

- 避免使用@import。







