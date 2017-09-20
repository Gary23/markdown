# Canvas(2d)

---

title: Canvas(2d)
date: 2017-09-20 09:42:09
tags: html

---


## 简介

### 概念

H5提供的一个新的标签元素。相当于画纸

### 描述

canvas是指可以在其上面绘制图形（通过js）、图像以及制作动画的标签。canvas不具有绘图能力，只是用来展示（渲染）

### 兼容

在浏览器不支持canvas时，会将其当做div标签来解析，在IE低版本中会将其当做文本节点来解析。

## 基本使用

### 创建一个画布

 `<canvas>内容</canvas>`，其中内容如果浏览器不支持就会显示。

 在创建一个canvas标签时，如果没有指定宽高，默认是300*150。
 
 只能用canvas本身的宽高属性去定义宽高，而且不加单位，直接写值。如果用css样式去指定宽高，会在默认值得基础上进行缩放，而在缩放时，并没有增加canvas的内部的像素点的个数。

### 获取绘制工具（canvas提供的）

#### `getConText`方法

```js
var convas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')     // 值有两个，2d和WebGL
```

2d：获取绘制平面图形的工具。

WebGL：获取绘制立体图形的工具。

### canvas的坐标系规则

原点在canvas的左上角，水平方向是x轴，垂直方向是y轴

### 绘制工具的API方法

#### `moveTo(x,y)`

移动笔触方法，x确定点的横坐标，y确定点的纵坐标

#### `lineTo(x,y)`

画线的方法，从当前笔触所在点连线到指定点。

### 绘制直线的步骤

1. 移动笔触moveTo

2. 画线lineTo

3. 描边strike()，填充fill()。

### 练习：绘制一个矩形

```js
// 绘制矩形
var canvas = document.getElementById('canvas')
	ctx = canvas.getContext('2d')
var x, y
var w, h
x = 50  // 矩形的x轴值
y = 50  // 矩形的y轴值
w = 150 // 矩形的宽
h = 100 // 矩形的高

// 移动笔触至矩形的顶点
// 并依次连线到矩形的其他各个顶点
ctx.moveTo(x, y)
ctx.lineTo(x + w, y)
ctx.lineTo(x + w, y + h)
ctx.lineTo(x, y + h)
ctx.lineTo(x, y)
// ctx.stroke()
ctx.fill()
```


## 路径的概念

### 使用方法

`stroke` 或者 `fill` 开头具有描边和填充功能。浏览器没法识别是不是一个新路径。

`closePath()` 闭合路径，将路径闭合并形成一个封闭空间。

```js
// 绘制三角形
ctx.moveTo(50,50)
ctx.lineTo(250,250)
ctx.lineTo(50,250)
// 让路径自动闭合，必须写在路径最后。这样就不用写原点了，而且避免了锯齿问题
ctx.closePath()
ctx.strokeStyle = 'pink'
ctx.stroke()
```

`beginPath()` 开辟新的路径，告诉解析器这是一个新路径，这样不会影响上一个路径。

```js
// 绘制三角形
ctx.beginPath()
ctx.moveTo(300,50)
ctx.lineTo(450,200)
ctx.lineTo(300,200)
ctx.closePath()
ctx.strokeStyle = 'blue'
ctx.stroke()
```
这里如果不用 `beginPath()` 的话，上面的那个三角也会变成蓝色。不只是颜色属性，如果不用 `beginPath()` 的话所有属性都会被最后一个绘制的图形覆盖。

所以 `beginPath()` 就是让浏览器知道上个这个路径是新的开始和上一个没有关联。

### 注意

1. 只有在需要开始新路径时，调用 `beginPath()`。

2. 在需要将图形闭合，形成封闭的图形，那么久可以调用 `closePath()` 方法。

3. 这两个方法并不一定要成对出现。

4. 除了 `stroke()` 或者 `fill()` 开的方法之外，都只会绘制路径，此时需要手动调用 `stroke()` 或者 `fill()` 方法。

## 线性相关的属性

### 使用方法

`lineWidth`：设置线宽，值是数值；

`strokeStyle`：设置线条颜色，值可以为16进制、颜色字符串、rgb、渐变色。

`fillStyle`：设置填充颜色

`lineCap`：设置线段两端的样式，有三个值。

 - `butt`：默认值，没有样式

 - `round`：设置线的两端是突出的圆弧

 - `square`：设置线的两端为突出的方形

`lineJoin`：设置线的相交线的拐点

 - `round`：线相拐点是圆弧

 - `bevel`：线相拐点是平角

 - `miter`：线相拐点是尖角，是默认值


### `lineCap`和`lineJoin`的练习

```js
// lineCap和lineJoin的练习
ctx.moveTo(50, 50)
ctx.lineTo(250, 150)
ctx.lineTo(450, 50)
ctx.lineWidth = 20
ctx.lineCap = 'round' //线的两端是突出的圆弧
ctx.lineJoin = 'round' //线的拐点是圆弧
ctx.stroke()

ctx.beginPath()
ctx.moveTo(50, 100)
ctx.lineTo(250, 200)
ctx.lineTo(450, 100)
ctx.lineCap = 'square' // 线的两端是突出的方形
ctx.lineJoin = 'miter' // 线的拐点是尖角 ， 默认
ctx.stroke()

ctx.beginPath()
ctx.moveTo(50, 150)
ctx.lineTo(250, 250)
ctx.lineTo(450, 150)
ctx.lineCap = 'butt' // 线的两端没有样式 吗，默认
ctx.lineJoin = 'bevel' // 线的拐点是平角
ctx.stroke()
```

### 渐变色练习

```js
// 渐变色练习
for (var i = 0; i < 255; i++) {
    ctx.beginPath()
    ctx.moveTo(50,50+i)
    ctx.lineTo(300,50+i)
    ctx.strokeStyle = "rgb("+ i +",0,0)"
    ctx.stroke()
}
```

## 非零环绕原则

目的是确认某一块区域是否需要填充。

从这个当前区域选取任意点，然后从该点到整个图形外部绘制一条射线，观察和这条射线相交的所有的线段，如果该相交的**线段是顺时针穿过这条射线，那么计数+1**，**如果是逆时针穿过，那么计数-1**，**如果计数为0，那就不填充该区域，如果计数非0，那么就填充该区域**。

从左只有穿过或从上至下穿过都是顺时针，反之是逆时针。

### 练习

```js
// 顺时针绘制
ctx.moveTo(50,50)
ctx.lineTo(500,50)
ctx.lineTo(500,500)
ctx.lineTo(50,500)
ctx.closePath()
// 逆时针绘制
ctx.moveTo(80,80)
ctx.lineTo(80,470)
ctx.lineTo(470,470)
ctx.lineTo(470,80)
ctx.closePath()
ctx.fill()
```

### 奇偶原则

就是看相交线的个数，如果为奇数，就填充；否则就不填充。
