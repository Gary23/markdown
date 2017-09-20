# Canvas-2d的应用

---

title: Canvas-2d的应用
date: 2017-09-20 10:07:57
tags: html

---


## 绘制网格

```js
for (var i = 0; i <= 1000; i+=20) {
    ctx.moveTo(100,100+i)
    ctx.lineTo(1100,100+i)
    ctx.stroke()
    ctx.moveTo(100+i,100)
    ctx.lineTo(100+i,1100)
    ctx.stroke()
}
```

## 绘制坐标轴

```js
// 绘制坐标轴
var padding = 30
ctx.moveTo(canvas.width - padding, canvas.height - padding)
ctx.lineTo(padding, canvas.height - padding)
ctx.lineTo(padding, padding)
ctx.strokeStyle = "rgb(50,200,240)"
ctx.stroke()
// 绘制箭头
var h = 20,
    w = 20
ctx.beginPath()
ctx.moveTo(canvas.width - padding - w, canvas.height - padding - h / 2)
ctx.lineTo(canvas.width - padding, canvas.height - padding)
ctx.lineTo(canvas.width - padding - w, canvas.height - padding + h / 2)
ctx.strokeStyle = "rgb(50,200,240)"
ctx.stroke()
ctx.moveTo(padding - w / 2, padding + h)
ctx.lineTo(padding, padding)
ctx.lineTo(padding + w / 2, padding + h)
ctx.stroke()
```

## 绘制矩形
 
`ctx.fillRect(x,y,width,height)` 和 `ctx.strokeRect(x,y,width,height)` 

- 是左上角的坐标，根据宽高自动绘制

```js
ctx.beginPath()
ctx.fillStyle = 'pink'
ctx.fillRect(50,50,200,200)

ctx.beginPath()
ctx.strokeStyle = 'pink'
ctx.strokeRect(50,50,200,200)
```

## 绘制圆弧

1. `ctx.arc(x,y,radius,start angle，end angle，anit-clockwise(true/false))`

 - x,y  是指定圆心坐标

 - radius  确定圆弧的半径

 - start angle  指定该圆弧的起始弧度

 - end angle  指定圆弧终止的弧度

 - anit-clockwise(true/false) 是否逆时针绘制圆弧，默认是false

```js
ctx.beginPath();
ctx.strokeStyle = 'pink';
ctx.arc(300,300,100,0,Math.PI,true);
ctx.stroke()
```
        
2. `ctx.arcTo(x1,y1,x2,y2,radius)`

 - moveTo(x,y)这个点到arcTo(x1,y1,x2,y2,radius)这两个点，画两条线相交

 - 由(x,y)(x1,y1)(x2,y2) 确定线段，绘制以radius为半径的，并且和上面两条线段相切的圆弧

```js
// 画布的长宽为1000*600  绘制一个圆角矩形
ctx.beginPath()
ctx.fillStyle = 'orange'
ctx.moveTo(100,0)
ctx.arcTo(1000,0,1000,900,100)    // 第一个圆弧
ctx.arcTo(1000,600,900,600,100)    // 第二个圆弧
ctx.arcTo(0,600,0,0,100)       // 第三个圆弧
ctx.arcTo(0,0,1000,0,100)       // 第四个圆弧
ctx.fill()
```

> 注意：移动了笔触再绘制圆弧时，当前笔触的点会和绘制圆弧的起始点进行连线。（画了两个圆弧，默认会将结束的圆弧点和下一个开始圆弧的点相连。）

3. 弧度制

- 360度表示一圈，

- 2 * Math.PI 表示一圈

- 360度 = 2 * Math.PI

- 一弧度：Math.PI / 180

- 一度：180 / Math.PI

## 绘制文字


1. `ctx.fillText("text",x pos , y pos , maxwidth(optional))`

2. `ctx.strikeText("text",x pos , y pos , maxwidth(optional))`

- text 要绘制的文本内容

- (x,y) 要指定绘制文本的位置

- maxwidth  指定文本的最大宽度

3. `ctx.font` 

- 指定字体和大小 格式："20px 字体"

4. `ctx.textAlign`  默认是start   start和left是一样的   end和right是一样的

- start

- end

- left    对齐方式相对于基点的位置

- right

- center

5. `ctx.textBaseline` （中文用的很少）  文字相对于基线的位置调整，一般用middle

- alphabetic 默认

- top

- hanging

- ideographic

- bottom

- middle



## drawImage  绘制图像

使用时要等图片加载完再绘制，要不然绘制的是空的，可以用load事件，两种方式：

```js
a:
var img = document.querySelector('image');
img.addEventListener('load',function(){
	ctx.drawImage(img,50,50);
})

b:
var img = new Image()
img.src = '路径'
img.'onload' = function(){
	ctx.drawImage(img,50,50)
}

```

以下三种用法都要等页面加载完毕之后再去绘制

### 普通的渲染图像

`drawImage(imObj,x,y)`

在canvas的x,y位置上渲染指定的imgObj。宽高是按照图像的宽高

```js
var img = new Image();
img.src = 'imgs/1.png'
img.addEventListener('load',function(){
    ctx.drawImage(img,100,200)
})
```

### 缩放绘制图像

`drawImage(imgObj,x,y,width,height)`

在canvas的(x,y)位置上，根据指定的宽和高来渲染imgObj图像。设定的时候要保持原比例，假如width设定的是300，那么高就等于：`img.height / img.width * 300`

```js
var img = new Image();
img.src = 'imgs/1.png'
img.addEventListener('load',function(){
    ctx.drawImage(img,100,200,200,200)   //img对象，原点位置，长宽
})
```

### 切片绘制图像

`drawImage(imgObj,sx,sy,swidth,sheight,x,y,width,height)`

`sx,sy,swidth,sheight` 是在原图片上的sx,sy的位置切片一个带下为swidth宽和sheight高的图像。将切出来的图像绘制在canvas的x,y的位置上，并且指定width为宽height为高。

```js
var img = new Image();
img.src = 'imgs/1.png'
img.addEventListener('load',function(){
    ctx.drawImage(img,img.width/2,img.height/2,img.width/2,img.height/2,200,200,50,50)   
    // 图片对象，设定图片的原点，参照原点的长宽切图片，放在画布的原点，显示的长宽
})
```

## 坐标系变换

整个坐标轴就按照移动后的计算，两种移动方式都要写在渲染之前

### 平移坐标系

`ctx.translate(x,y)` 

将坐标系的原点平移到x,y的位置，平移之后原点就变了，x,y的位置就变成了新的原点。是相对于之前的起始点移动。

```js
ctx.beginPath();
ctx.translate(100,100);
ctx.fillRect(300,200,200,200);
```

### 旋转坐标系

`ctx.rotate(radian)`

以当前原点旋转坐标系到指定的弧度（radian），如果为负数就是逆时针旋转，如果为整数就是顺时针旋转

```js
ctx.beginPath();
ctx.translate(300,300);
ctx.rotate(Math.PI/2)
ctx.fillRect(0,0,200,200);

```


## 清除画布

`ctx.clearRect(x,y,width,height)`

清除由x,y为原点width和height确定的矩形内部的所有的图形。

## 状态保存与恢复

`ctx.save()` 将上一次的状态保存起来。

`ctx.restore()` 将最近一次保存起来的状态恢复，第一次执行恢复上一次，在执行恢复上上次，再执行恢复上上上次。

```js
ctx.beginPath();
ctx.lineWidth = 20;
ctx.strokeStyle = 'orange'
ctx.strokeRect(100,100,600,200)
ctx.save();
ctx.strokeStyle = 'hotpink'
ctx.strokeRect(120,120,560,160)
ctx.save();
ctx.strokeStyle = 'red'
ctx.strokeRect(140,140,520,120)
ctx.restore();
ctx.strokeRect(160,160,480,80)
ctx.restore();
ctx.strokeRect(180,180,440,40)
```