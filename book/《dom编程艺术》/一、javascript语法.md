# 一、javascript语法

## 1、准备工作

javascript代码必须通过HTML文档才能执行，可以通过2种方式做到这点

1. 将javascript代码放到`<head>`标签之间，用`<script>`包裹。

2. 将javascript代码存放为一个扩展名为.js的独立文件。

>最典型的做法是在文档的`<head>`部分放一个`<script>`标签，并把它的src属性只想后缀名为.js的文件位置。但是最好的方法是把`<script>`标签放到`</body>`标签之前。这样能使页面更快的加载。如下：

```
<body>
	Markup goes here...
	<script src='./file.js'></script>
</body>
```

## 2、语法

### 语句

javascript与其他脚本语言一样，都由一系列指令构成，这些指令就叫做语句。只有按照正确的语法编写的语句才能得到浏览器正确的解释。

只要把语句放在不同的行上就可以分隔它们，如下：
```
first statement
second seatement
```
如果要把多条语句放到一行上，就需要用分号分隔它们，如下：
```
first statement; second statement;
```
一个良好的书写习惯应该不论是否一行，都在语句的末尾加上分号，如下：
```
first statement;
second statement;
```

### 注释

有些语句并不需要javascript解释器去解释并执行，比如一些仅供自己参考的信息，这类语句就是注释。

注释可以有效帮助我们了解代码流程，有多种方式在javascript脚本中插入注释。

1. 用两个斜线作为开头，如果使用这种注释方式，就要在每行都加两条斜线。
```
// 这是一条注释
// 这是第二条注释
```
2. 多行注释，在整个注释部分的开头加上一个`/*`，在末尾加上一个`*/`。
```
/*
 * 这是一段注释
 */
```
3. 类似html注释的方式
```
<!--这是一条注释
<!--这是第二条注释
```

> 不推荐第三种方式,需要单行注释就用第一种,需要注释一段内用就用第二种

### 变量

会发生变化的东西称为变量，例如人的姓名和生日是固定不变的，但心情和年龄会随着时间而改变，这些会变化的量可以用变量来表示。

比如可以把心情和年龄存入两个变量，给心情起个名字叫做mood，给年龄起个名字叫做age。
```
mood = "happy";
age = 27;
```


>当我现在查看变量mood时，它的值就是"happy"，我可以随时改变我的心情为"sad"，改变的值也是存在mood中，而我的心情不管是"happy"还是"sad"，它始终都存在mood变量中，可以随时用过mood来访问。


在代码中，需要使用变量时，最好先对其进行声明，javascript并没有要求必须声明变量，但提前声明是编程的一个良好的习惯。
```
var mood;
var age;
```
也可以一条语句生命多个变量
```
var mood,age;
```
可以把声明和赋值一次性完成
```
var mood = "happy";
var age = 27;
```
甚至可以更加简单
```
var mood = "happy",age = 27;
```
>在javascript语言中，变量和其他语法元素的名字是严格区分大小写的，名字是mood的变量和Mood或MOOD没有任何关系。

javascript语法不允许变量中包含空格或标点符号，只有$和_除外，不允许数组开头，所以较长的变量可以这样声明
```
var my_mood = "happy";
```
另一种方式是通过驼峰方式明明，第二个单词大写开头，这是函数名、方法名和对象属性命名的首选格式
```
var myMood = "happy";
```
>在上面这些语句中，单词"happy"是javascript语言中的一个字面量，也就是可以直接在javascript中写书来的数据，文本"happy"除了表示自己以外不表示任何别的东西，与此形成对比的是，单词var是一个关键字，my_mood是变量名。

## 3、数据类型

在javascript中，不同数据类型的值，声明和赋值语法完全相同，所以说javascript是一种弱类型语言。

### 字符串
字符串是由0个或多个字符构成，包括但不限于字母、数字、标点符号、空格，必须包含在引号里，单引号或双引号都可以，但必须成对出现，如果字符串中包含单引号那么最好用双引号包裹，反之亦然。
```
var mood = "dont't ask";
```
如果必须用和字符串内出现相同的引号，那么可以用转义符，用反斜线进行转义
```
var mood = 'don\'t ask';
```

>良好的编程习惯是，不管单引号还是双引号，最好在整个脚本中保持一致，如果一会用单引号，一会用双引号，会难以阅读和理解。

### 数值类型
数值类型不用限定必须是整数，javascript允许带小数点的数值，带小数的数值也被称为浮点型
```
var num1 = 100;
var num2 = 33.25;
```
也可以使用负数
```
var num3 = -20;
```

### 布尔值
布尔值只有2个值可选，true和false，可以理解为yes和no，或者1和0。使用布尔值千万不要用引号包起来。
```
var married = "true";
```
这是错误的，这里的true只是一个字符串。正确的应该是：
```
var married = true;
```

### 数组
前面数据类型在同一时间只能有一个值，而数组可以存储一组值，一组当中的每个值都是这个数组的一个元素。
```
var arr = Array(4);
```
这是标准的数组声明方式，括号里是数组的长度(length)，长度指的就是元素的个数。
也可以不指定长度，因为大部分时候是不能预知需要多少元素的
```
var arr = Array();
```
创建空数组后，添加元素的操作称为填充，填充时候要给出新元素的值和在数组中存放的位置，这个位置也叫下标或者索引(index)。
```
var arr = Array();
arr[0] = "Tom";
```
中括号里的就是下标，而且第一个下标是从0开始的。首先，创建一下四个元素。
```
var arr = Array();
arr[0] = "Tom";
arr[1] = "John";
arr[2] = "Paul";
arr[3] = "Jack";
```
现在可以通过下标值"2"获取元素"paul"

还有一种更加简单的方式，声明时直接写入元素，用逗号分隔元素，下标按顺序分配。
```
var arr = Array("Tom","John","Paul","Jack");
```
也可以用如下的方式
```
var arr = ["tom","John","Paul","Jack"];
```
可以存入数值类型
```
var year = [1940,1950,1960];
```
多种数据类型混在一起
```
var lennon = ["John",1940,true];
```
甚至是一个变量
```
var name = "John";
var arr = [name];
```
数组中包含另一个数组
```
var lennon = ["John",1940,true];
lennon[3] = ["Tom","Jack"];
```
通过`lennon[3][0]`可以访问到"Tom"

数组的下标也不局限于数值，也可以是字符串，这种数组被称为**关联数组**
```
var lennon = Array();
lennon["name"] = "John";
lennon["year"] = 1980;
```
>虽然关联数组让代码更具可读性，但是并不推荐在数组中这样使用，实际上，**所有变量都是某种类型的对象**，比如一个布尔值就是Boolean类型的对象，一个数组就是Array类型的对象，所以我用关联数组的方式实际是修改了Array对象的属性，而不是Array类型的对象的值，**更改属性应该使用对象类型，而不是数组类型**

### 对象

与数组类似，对象也是通过一个变量表示一组值，对象的每个值都是对象的一个和属性。
```
var lennon = Object();
lennon.name = "Tom";
lennon.year = 1980;
```
对象使用Object关键字创建，使用"."l哎设置和获取属性，更加简洁的写法：
```
var lennon = {name:"Tom",year:1980};
```
lennon对象中没有下标，可直接通过属性名name或year获取值，大大提高了代码可读性。
```
var lennon = {name:"Tom",year:1980};
var year = lennon.year;
var name = lennon.name;
```

## 3、操作

### 算术操作符
操作符是javascript为完成各种操作而定义的一些符号，例如加"+"、减"-"、乘"*"、除"/"，可以用()把不同的操作分隔开来，基本规则和数学的四则运算相同。

变量也可以包含操作：
```
var totla = (1 + 4) * 5;
```
变量也可以直接进行操作
```
var temp_fahrenheit = 95;
var temp_celsius = (temp_fahrenheit - 32) / 1.8;
```
操作符的缩写
```
var year = 27;
year++;
year--;
```
`year++`是`year = year + 1`的缩写，同样`year--`是'year = year - 1'的缩写

"+"除了用作加法，还可以用作连接符，连接2个字符串。
```
var message = "I am feeling" + "happy";
```
这种字符串拼接也可以通过变量完成
```
var mood = "happy";
var message = "I am feeling" + mood;
```
如果是字符串和数值拼接，只能得到一个更长的字符串，并不会相加
```
var str = "10" + 20;
```
得到的值是"1020"，而不是30，这也是弱类型语言的特点之一。

另一个快捷操作是"+="，加法和赋值的缩写
```
var year = 2017;
var message = "The year is";
message += year;
```
`message += year`相当于`message = message + year`

### 条件语句
使用条件语句可以用来设定一个条件，只有满足这一条件才能让后面的语句执行，最常见的语句是if语句。
```
if(condition){
	statements;
}
```
条件必须放到if后面的()中，条件的结果永远只是一个布尔值，{}中的语句无论多少，只能在条件结果为true时才能执行。

执行语句放到{}只是为了让代码更容易阅读，并不是javascript的语法要求，所以如果只有一条执行语句，也可以不用加{}，直接写语句。
```
if(1 < 2) alert("The world has gone mad!");

if(1 < 2) {
	alert("The world has gone mad!");
}
```
这两种语句的意思是相同的，而条件的结果是false，所以后面的语句不会被执行。

if语句可以有一个else子句，else之后的语句会在给定条件为false时执行。
```
if(1 > 2){
	alert("The world has gone mad!");
}else{
	alert("All is well with the world");
}
```
因为给定条件是false，所以会执行`alert("All is well with the world");`

### 比较操作符

javascript还提供了许多只能用在条件语句里的操作符，比如">"、"<"、">="、"<="、"= ="，其中要注意的是"="是赋值操作符，而"= ="是才是比较两个值的大小。如果在某个条件里使用了单个"="，那么只要赋值成功，条件的结果就是true。
```
var num1 = 1;
var num2 = 2;
if(num1 = num2){
	alert("We both feel the same");
}
```
在这里本意是比较两个值是否相等，但这里错误的使用了赋值操作，所以结果是会一直为true，后面的语句也会一直被执行。正确的写法是 if(num1 == num2)。

相等操作符"= ="并不表示严格相等，只是比较值的意义，而严格比较要用"==="，不仅比较值还会比较值的类型。
```
var a = false;
var b = " ";
a == b;		// 返回true
a === b;	// 返回false
```
false和空字符串的含义相同，但数据类型不同。

还有一种操作符和"= ="相反，不等于比较的操作符"!="，也有严格不等于比较"!=="。

### 逻辑操作符

逻辑操作的操作对象是布尔值，每个逻辑操作返回的也是一个布尔值。
逻辑操作有三种：&&、||、！，分别是与、或、非。

- 逻辑与操作&&只有在操作符的两边都是true才会返回true，只要有一个是false，整个就返回false。

- 逻辑或操作||只要两边的操作数有一个为true，就返回true，两边都是false，才会返回false。

- 逻辑非操作只能用于单个操作数，结果是把操作数的布尔值取反，原来是true就返回false，原来是false就返回true。

### 循环语句

if语句或许是最重要的语句，但唯一的缺点是不能完成重复性的操作，如果要多次运行语句就要用到循环语句。

#### while循环
```
while(condition){
	statements
}
```
只要给丁的条件式true，花括号里的代码就会一直执行while语句的语法和if非常相似。
```
var count = 0;
while(count < 10){
	alert(count);
	count++;
}
```
在这里会打印count变量10次，每次count的值+1，直到不满足count < 10的条件为止，所以最终count的值是10。
>需要注意的是内部执行语句通过count++这条语句改变count的值，否则如果count的值一直不变，循环会永远执行下去，所以要在执行语句中控制条件判断中的变量的值。

#### do...while循环

while循环中，如果条件为false，那么语句一次也不会被执行，如果我们需要语句至少被执行一次，do循环就是最佳选择。
```
do{
	statements
}while(condition)
```
在判断条件前，会先执行一遍内部语句。
```
var count = 1;
do{
	alert(count);
	count++;
}while(count < 1)
```
在这个例子中，条件永远部位true，但用了do循环，内部语句可以执行一次。

#### for循环

for循环和while很像，就像while的一个变体，可以把上边的while改写为这样
```
for(var count = 0;count < 10;count++){
	alert(count);
}
```
执行结果相同，代码的结构比while更加清晰，for循环最常用的场景是对数组进行遍历操作
```
var arr = Array("John","Tom","Paul","Jack");
for(var count = 0;count < arr.length;count++){
	alert(arr[count]);
}
```
打印的4条内容正好对应数组里的4个元素，arr.length是数组的长度，count在这里作为数组的下标使用，执行顺序是：
1. 声明count并赋值为0
2. 判断count是否小于arr数组的长度，如果为true则继续
3. 执行alert(arr[0]); 也就是打印数组里的第一个元素
4. 最后count++; 改变count的值为1再去判断，以此循环

### 函数

如果需要多次使用一段代码，可以把它们封装成一个函数，函数是一组允许在你的代码里随时调用的语句，实际上每个函数都是一个短小的脚本。

函数还可以接收数据，并且用这些数据完成预定的操作，我们把传递给函数的数据称为参数。
```
function name(arguments){
	statements;
} 
```

>其实javascript中有许多内建函数，前面的alert就是内建函数，作用是弹出对话框显示调用alert时传入的参数，这些函数也可以被称作方法。

提前声明好函数后可以在任意位置调用
```
function multiply(num1,num2){
	var total = num1 + num2;
	alert(total);
}
multipy(10,2);
```
执行结果打印出20。

函数不仅可以接收数据，还可以返回数据，比如返回一个数值、字符串、数组、布尔值等等。
```
function multiply(num1,num2){
	var total = num1 + num2;
	return total;
}
var mul = multiply(10,2)
```
这个函数将返回参数计算后的数据。所以变量mul的值就是20。

>函数最好用驼峰的方式命名，并不是javascript的规范，而是一种良好的书写习惯，我得习惯是变量用下划线连接2个单词，函数用驼峰，这样在一段代码中，哪个是函数名、哪个是变量名一目了然。

####变量的作用域
我最开始提到的变量，既可以是全局的，也可以是局部的，而它们之间的区别就是作用域不同。

- 全局变量
可以在脚本的任何地方被引用，也包括函数内部，所以全局变量的作用域就是整个脚本。

- 局部变量
只存在于声明它的那个函数的内部，在这个函数的外部是无法引用它的，局部变量的作用域仅限于某个特定的函数内。

>如果在某个函数中使用var声明变量，那这个变量也就是一个局部变量，如果在函数内部使用一个新的变量并没有用var声明，就是引入了一个全局变量，如果脚本中已经有了该变量，会改变这个变量的值，但是全局变量无法使用局部变量。

```
var total = 50;
function square(num){
	total = num * num;
	return total;
}
var number = square(20);
alert(total);
```
total是全局变量，我得本意是得到函数内部的返回值，但是由于没有用var声明，导致全局变量total的值被改变。正确的写法如下：
```
function square(num){
	var total = num * num;
	return total;
}
```
total变得安全了。

>在一长段代码中，使用var声明会有效的避免全局污染。

### 对象

在前面已经简单介绍了对象，对象是包含了数据的集合，包含在对象里的数据可以通过两种形式访问，属性和方法。

>属性是隶属于某个特定对象的变量，方法是只有某个特定对象才能调用的函数。所以可以说对象就是由属性和方法组合在一起而构成的数据实体

在javascript中，属性和方法都用"."去访问。
比如有一个函数Person，那么用new操作符就可以创建一个Person实例
```
function Person(){
    this.name = 'tim';
    this.age = 20;
}

var tim = new Person();
```
Person函数中有一些方法，这时通过tim就可以访问
```
var age = tim.age;     //20
```

#### 内建对象

上面所说的Person只是一个虚构的例子，而在实际中，javascript也一共了一些内建对象，数组就是其中一个，`new Array()`就创建了数组对象，length属性也是继承自Array的属性。

>这里Array即是一个函数也是一个对象，具体细节要接触到原型才能解释清楚，目前只需要了解我们通过new操作符可以创建一个函数的实例即可。

#### 宿主对象

除了内建对象，javascript脚本里还可以用一些已经定义好的其他对象，这些对象是由浏览器提供的，也称作宿主对象。

宿主对象包括Form、Image和Elment等，可以获取网页上的表单、图像、各种元素的信息。最常用的是document，后面会介绍。



