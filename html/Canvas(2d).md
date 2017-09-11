# Canvas(2d)

@(HTML)


1. 简介
--

1. **概念：**H5提供的一个新的标签元素。相当于画纸
2. **描述：**canvas是指可以在其上面绘制图形（通过js）、图像以及制作动画的标签。canvas不具有绘图能力，只是用来展示（渲染）
3. **兼容：**在浏览器不支持canvas时，会将其当做div标签来解析，在IE低版本中会将其当做文本节点来解析。

2. 基本使用
--
> #### 创建一个画布

 **`<canvas>`**内容**`</canvas>`**，其中内容如果浏览器不支持就会显示。
 1. 在创建一个canvas标签时，如果没有指定宽高，默认是300*150。
 2. 只能用canvas本身的宽高属性去定义宽高，而且不加单位，直接写值。如果用css样式去指定宽高，会在默认值得基础上进行缩放，而在缩放时，并没有增加canvas的内部的像素点的个数。

> #### 获取绘制工具（canvas提供的）

**`getConText`** 方法

	```
	var convas = document.querySelector('canvas')
	var ctx = canvas.getContext('2d')  
	// 值有两个，2d和WebGL
	```
2d：获取绘制平面图形的工具
WebGL：获取绘制立体图形的工具

> #### **canvas的坐标系规则**

 1. 原点在canvas的左上角
 2. 水平方向是x轴，垂直方向是y轴

> #### **绘制工具的API方法**

 1. 移动笔触方法：**`moveTo(x,y)`**x确定点的横坐标，y确定点的纵坐标
 2. 画线的方法：**`lineTo(x,y)`**从当前笔触所在点连线到指定点。

> #### **绘制直线的步骤**

 1. 移动笔触moveTo
 2. 画线lineTo
 3. 描边strike()，填充fill()。

> #### 练习：绘制一个矩形

```
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


3. 路径的概念
--
> #### 使用方法

1. **`stroke`**或者**`fill`**开头具有描边和填充功能。浏览器没法识别是不是一个新路径


2. **`closePath()`** 闭合路径，将路径闭合并形成一个封闭空间

```
// 绘制三角形
ctx.moveTo(50,50)
ctx.lineTo(250,250)
ctx.lineTo(50,250)
// 让路径自动闭合，必须写在路径最后。这样就不用写原点了，而且避免了锯齿问题
ctx.closePath()
ctx.strokeStyle = 'pink'
ctx.stroke()
```

3. **`beginPath()`** 开辟新的路径，告诉解析器这是一个新路径，这样不会影响上一个路径。

```
// 绘制三角形
ctx.beginPath()
ctx.moveTo(300,50)
ctx.lineTo(450,200)
ctx.lineTo(300,200)
ctx.closePath()
ctx.strokeStyle = 'blue'
ctx.stroke()
// 这里如果不用beginPath()的话，上面的那个三角也会变成蓝色。不只是颜色属性，如果不用beginPath()的话所有属性都会被最后一个绘制的图形覆盖。
// 所以beginPath()就是让浏览器知道上个这个路径是新的开始和上一个没有关联。
```

**功能：**
 1. 将图形起始点与终止点进行连线。将图形形成一个封闭的图形。
 2. 会自动处理封闭图形的锯齿。

> #### 注意：

 1. 只有在需要开始新路径时，调用**`beginPath()`**。
 2. 在需要将图形闭合，形成封闭的图形，那么久可以调用**`closePath()`**方法。
 3. 这两个方法并不一定要成对出现。
 4. 除了**`stroke()`**或者**`fill()`**开的方法之外，都只会绘制路径，此时需要手动调用**`stroke()`**或者**`fill()`** 方法

4. 线性相关的属性
--
> #### 使用方法

1. **`lineWidth`**：设置线宽，值是数值；
2. **`strokeStyle`**：设置线条颜色，值可以为16进制、颜色字符串、rgb、渐变色。
3. **`fillStyle`**：设置填充颜色
4. **`lineCap`**：设置线段两端的样式，有三个值。
 1. **`butt`**：默认值，没有样式
 2. **`round`**：设置线的两端是突出的圆弧
 3. **`square`**：设置线的两端为突出的方形
5. **`lineJoin`**：设置线的相交线的拐点
 1. **`round`**：线相拐点是圆弧
 2. **`bevel`**：线相拐点是平角
 3. **`miter`**：线相拐点是尖角，是默认值

> #### **lineCap和lineJoin的练习**
```
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

> #### 渐变色练习

```
// 渐变色练习
for (var i = 0; i < 255; i++) {
    ctx.beginPath()
    ctx.moveTo(50,50+i)
    ctx.lineTo(300,50+i)
    ctx.strokeStyle = "rgb("+ i +",0,0)"
    ctx.stroke()
}
```

5. 非零环绕原则
--
1. 目的：确认某一块区域是否需要填充。
2. 描述：从这个当前区域选取任意点，然后从该点到整个图形外部绘制一条射线，观察和这条射线相交的所有的线段，如果该相交的**线段是顺时针穿过这条射线，那么计数+1**，**如果是逆时针穿过，那么计数-1**，**如果计数为0，那就不填充该区域，如果计数非0，那么就填充该区域**。
3. 总结：从左只有穿过或从上至下穿过都是顺时针，反之是逆时针。

练习：

```
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

4. 奇偶原则、
 就是看相交线的个数，如果为奇数，就填充；否则就不填充。


6. canvas-2d的应用
--
> #### **绘制网格**

```
for (var i = 0; i <= 1000; i+=20) {
    ctx.moveTo(100,100+i)
    ctx.lineTo(1100,100+i)
    ctx.stroke()
    ctx.moveTo(100+i,100)
    ctx.lineTo(100+i,1100)
    ctx.stroke()
}
```

> ####  **绘制坐标轴**

```
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

> #### 绘制矩形
 
 1. **`ctx.fillRect(x,y,width,height)`** 
  
  - x,y 是左上角的坐标，根据宽高自动绘制
 
 2. **`ctx.strokeRect(x,y,width,height)`** 参数同上

```
ctx.beginPath()
ctx.fillStyle = 'pink'
ctx.fillRect(50,50,200,200)

ctx.beginPath()
ctx.strokeStyle = 'pink'
ctx.strokeRect(50,50,200,200)
```

> #### 绘制圆弧

1. **`ctx.arc(x,y,radius,start angle，end angle，anit-clockwise(true/false))`**
 - x,y  是指定圆心坐标
 - radius  确定圆弧的半径
 - start angle  指定该圆弧的起始弧度
 - end angle  指定圆弧终止的弧度
 - anit-clockwise(true/false) 是否逆时针绘制圆弧，默认是false

```
ctx.beginPath();
ctx.strokeStyle = 'pink';
ctx.arc(300,300,100,0,Math.PI,true);
ctx.stroke()
```
        
2. **`ctx.arcTo(x1,y1,x2,y2,radius)`**
 - moveTo(x,y)这个点到arcTo(x1,y1,x2,y2,radius)这两个点，画两条线相交
 - 由(x,y)(x1,y1)(x2,y2) 确定线段，绘制以radius为半径的，并且和上面两条线段相切的圆弧

```
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


**注意：**移动了笔触再绘制圆弧时，当前笔触的点会和绘制圆弧的起始点进行连线。（画了两个圆弧，默认会将结束的圆弧点和下一个开始圆弧的点相连。）

3. 弧度制
     - 360度表示一圈，
     - 2 * Math.PI 表示一圈
     - 360度 = 2 * Math.PI
     - 一弧度：Math.PI / 180
     - 一度：180 / Math.PI

> #### 绘制文字


1. **`ctx.fillText("text",x pos , y pos , maxwidth(optional))`**
2. **`ctx.strikeText("text",x pos , y pos , maxwidth(optional))`**

	**参数：**
	- text 要绘制的文本内容
	- (x,y) 要指定绘制文本的位置
	- maxwidth  指定文本的最大宽度

3. **`ctx.font`**属性：指定字体和大小 格式："20px 字体"
4. **`ctx.textAlign`**  默认是start   start和left是一样的   end和right是一样的
       - start
       - end
       - left    对齐方式相对于基点的位置
       - right
       - center
5. **`ctx.textBaseline`** （中文用的很少）  文字相对于基线的位置调整，一般用middle
       - alphabetic 默认
       - top
       - hanging
       - ideographic
       - bottom
       - middle



7. drawImage  绘制图像
--
使用时要等图片加载完再绘制，要不然绘制的是空的，可以用load事件，两种方式：

```
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

> ####**用法：**

1. **普通的渲染图像**

	**`drawImage(imObj,x,y)`**
	在canvas的x,y位置上渲染指定的imgObj。宽高是按照图像的宽高
```
var img = new Image();
img.src = 'imgs/1.png'
img.addEventListener('load',function(){
    ctx.drawImage(img,100,200)
})
```

2. **缩放绘制图像**
	**`drawImage(imgObj,x,y,width,height)`**
	在canvas的(x,y)位置上，根据指定的宽和高来渲染imgObj图像。设定的时候要保持原比例，假如width设定的是300，那么高就等于：**`img.height / img.width * 300`**
```
var img = new Image();
img.src = 'imgs/1.png'
img.addEventListener('load',function(){
    ctx.drawImage(img,100,200,200,200)   //img对象，原点位置，长宽
})
```


3. **切片绘制图像**
  **`drawImage(imgObj,sx,sy,swidth,sheight,x,y,width,height)`**	
  **`sx,sy,swidth,sheight`** 实在原图片上的sx,sy的位置切片一个带下为swidth宽和sheight高的图像。将切出来的图像绘制在canvas的x,y的位置上，并且指定width为宽height为高。

```
var img = new Image();
img.src = 'imgs/1.png'
img.addEventListener('load',function(){
    ctx.drawImage(img,img.width/2,img.height/2,img.width/2,img.height/2,200,200,50,50)   
    // 图片对象，设定图片的原点，参照原点的长宽切图片，放在画布的原点，显示的长宽
})
```

8. 坐标系变换
--
整个坐标轴就按照移动后的计算，两种移动方式都要写在渲染之前

1. **`ctx.translate(x,y)`**平移坐标系
	将坐标系的原点平移到x,y的位置，平移之后原点就变了，x,y的位置就变成了新的原点。是相对于之前的起始点移动。

```
ctx.beginPath();
ctx.translate(100,100);
ctx.fillRect(300,200,200,200);
```

2. **`ctx.rotate(radian)`**旋转坐标系
	以当前原点旋转坐标系到指定的弧度（radian），如果为负数就是逆时针旋转，如果为整数就是顺时针旋转

```
ctx.beginPath();
ctx.translate(300,300);
ctx.rotate(Math.PI/2)
ctx.fillRect(0,0,200,200);

```


9. 清除画布
--
**`ctx.clearRect(x,y,width,height)`**
清除由x,y为原点width和height确定的矩形内部的所有的图形。

10 .状态保存与恢复
--
1. **`ctx.save()`** 将上一次的状态保存起来。
2. **`ctx.restore()`** 将最近一次保存起来的状态恢复，第一次执行恢复上一次，在执行恢复上上次，再执行恢复上上上次。

```
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