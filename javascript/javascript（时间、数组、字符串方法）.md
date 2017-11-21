
# 日期对象

## 常用方法

`new Date()` 获取当前时间

以下获取的都是数值类型，get是获取时间，将get改为set后面的不变就是设置时间。

`getFullYear()` 获取年

`getMonth()` 获取月份，从0开始算

`getDate()` 获取天

`getDay()` 获取星期几，0是周日

`getHours()` 获取小时

`getMinutes()` 获取分钟

`getSeconds()` 获取秒

`getMilliseconds()` 获取毫秒

`getTime()` 时间戳，返回从1970年1月1日0点0分0秒0毫秒开始计算的毫秒时间。

`getTimezoneOffset()` 获取本地时间与格林威治标准时间的分钟差。

`parse()` 返回从1970年1月1日到指定日期(字符串)的毫秒数。

`UTC()`  根据世界时间返回从1970年1月1日到指定日期(字符串)的毫秒数。

> 以上获取时间的方法在get后加上UTC就是根据世界时间获取，例如`getUTCHours()`就是根据世界时间返回小时数。

## 获取一个时间点

设定一个时间点`new Date(2017,4,22,22,48,20);` 得出的是毫秒。

也可以通过`new Date('November 10,2013 22:3:0');`来获取。主要是用来计算倒计时用到。

## 秒的转换

秒转为天：`Math.floor(秒 / 86400)`

秒转为小时：`Math.floor(秒 % 86400 / 3600)`

秒转为分钟：`Math.floor(秒 % 86400 % 3600 / 60)`

秒转为秒：`秒 % 60`

## 英文的月份

一月 January、二月 February、三月 March、四月 April、五月 May、六月 June、七月 July、八月 August、九月 September、十月 October、十一月 November、十二月 December。


# 字符串的方法

## length

字符串长度，字符串里的空格也占用一个长度

## charAt()

返回字符串索引位置的字符，如果不传参数默认获取第一个。

```js
var str = 'abs';
alert(str.charAt(1))   // b
alert(str.charAt())   // a
```

## charCodeAt()

返回字符串索引位置的字符的Unicode值。使用方法同上。

## charCodeAt()

使用方式和charAt相同，区别是返回的是字符的编码值

## String.fromCharCode()

参数里输入一个编码，返回相对应的字符，多个编码用逗号间隔

## indexOf()

返回查找字符在字符串中的索引位置，没找到返回-1。

`'str'.indexOf('t') //1 `返回t在字符串str中的索引位置。

`'strstr'.indexOf('t',2) // 4`从strstr字符串的索引2的位置r之后开始找t的位置。不能是负数。

indexOf()每次只能返回查找到的第一个索引位置，如果要查找所有的索引位置需要写一个循环

```js
var str = 'aaabaaababaaaaaaaabaaab';
var s = 'b';
var i = 0;
while( str.indexOf(s,i) != -1 ){
    alert( str.indexOf(s,i) );
    i = str.indexOf(s,i) + s.length;
}
```

这个循环会打印b在字符串中的所有索引位置

## lastIndexOf()

和indexOf()相对应，indexOf()是从左往右找，lastIndexOf()是从右往左找。第二个参数索引值也是从右向左查找。

## 字符串的大小比较

中文字符也是可以进行比较的，比如`'山东' > '青岛'`，比较的是第一个字符的编码值的大小，也就是山的编码值和青的编码值的比较，和后面的所有字符没有关系。

同样的道理，`'aaaabbbb' > 'c'`，比较的是a和c的大小，和后面字符没有关系。`'1000' > '2'`比较的也是1和2的编码值的大小。

## substring()

截取类方法，对字符串当中的某些文字进行截取。负数会直接当0来处理。

传入一个参数时，从字符串的参数数值的索引位置开始截取后面的所有内容。

传入两个参数时，截取字符串参数一的索引到参数二的索引之间的字符。另外，如果第二个参数比第一个参数小那么会自动调换两个参数的位置。

```js
var str = 'abcdefg';
alert(str.substring(4);  // efg  
alert(str.substring(0,2);  // ab  
```

## slice()

和substring()用法基本一样。但是传两个参数时不会交换位置。

和substring()方法不同的是：

只传入一个参数并且是负数，那么就是从字符串的最后开始截取。

传入两个参数，通常第一个是负数第二个也是负数，截取两个参数索引之间的字符

```js
var str = 'abcdefg';
alert(str.slice(-1))  // f
alert(str.slice(-4,-2))  // cd
```

## toUpperCase()

字符串转为大写，只能针对英文

## toLowerCase()

字符串转为小写，只能针对英文

## split()

将字符串分割为数组。参数是按照什么字符分割，如果不传参数默认会将整个字符串当做一个数组的一个元素。

```js
var str = 'www.baidu.com';
alert(str.split('.'))  // ['www','baidu','com'];

var str1 = 'abc';
alert(str1.split(''))   // ['a','b','c'];
```

第二个参数是限制截取多少段。

```js
var str = '2017-05-27-19-47';
alert(str.split('-',3));   // ['2017','05','27']
```

## replace()

替换字符串，第一个参数是要查找的字符串，也可以通过正则表达式查找。第二个参数是要替换的内容。

```js
var str = 'abcdefg';
console.log(str.replace('abc','ccc'))    // 打印cccdefg
console.log(str.replace(/^a/,'ccc'))     // 打印cccbcdefg
```

# 数组的方法

## push()

在数组最后一位添加一个元素，返回值是增加后的数组的长度。

## unshift()

在数组第一位插入一个元素，返回值是增加后的数组的长度。ie6、ie7不支持这个方法的返回值。

## pop()

从数组的最后删除一个元素，返回值是删除的那个元素。

## shift()

从数组的开头删除一个元素，返回值是删除的那个元素。

## splice()

splice方法可以删除、替换、添加

删除时候可以传两个参数，第一个是开始删除的索引，第二个是删除的长度。返回值是删除的元素。

替换的话将要替换的内容写在第二个参数之后。返回值仅是被删除的内容。

添加的时候第一个参数是要添加的后面那个元素的索引，第二个参数是0，代表不替换，要添加的元素写在第二个参数之后。没有返回值

```js
var arr = ['a,'b','c','d','e'];
arr.splice(0,2)   // arr = ['c','d','e']
arr.splice(0,2,'z','x')   // arr = ['z','x','c','d','e']
arr.splice(1,0,'x')   // arr = ['a','x','b','c','d','e']
```

## slice()

返回从原数组中指定开始下标到结束下标之间的元素组成的新数组。只传一个参数那就是获取到最后，不会改变原数组

```js
var arr = [1,2,3,4,5,6];
console.log(arr.slice(2))      // 打印[3,4,5,6]
console.log(arr.slice(2,4))      // 打印[3,4]
```

## sort()

对数组进行排序，默认全部按照字符串的规则进行排序，会将数字转为字符串，然后按照字符串的比较方式，由小到大排序。

```js
var arr = [4,3,2,30];
arr.sort();  // arr = [2,3,30,4]
```

要按照数值类型来排序的话需要在sort内部写一个函数

```js
arr = [4,3,2,30];
arr.sort(function(a,b){
    return a - b
})
```
这里用a-b代表从小到大排序，意思是第一个数减第二个数。

也可以b-a是从大到小排序。是第二个数减第一个数。

只要return 为true，那么就会换位置。

## join()

将数组转为字符串，用传入的参数去分割数组每个元素，组成一个字符串，如果不传参数默认用逗号分割。

## concat()

将多个数组拼接起来，参数可以传过个，传几个就连接几个，会拼成一个新的数组，不会改变原来的数组。

```js
var arr1 = [1,2,3];
var arr2 = [4,5,6];
alert(arr1.concat(arr2));  // [1,2,3,4,5,6]    
```

## reverse()

颠倒数组内部元素的位置。对字符串也可以进行操作，只是从头到尾颠倒位置。不会进行比较。

```js
var arr = [1,2,3,4];
arr.reverse();    // arr = [4,3,2,1]
```

## toString()

把数组转换为字符串，字符串包含逗号。

# Math系列方法

## Math.round()

对参数进行四舍五入操作。

## Math.abs()

返回参数的绝对值。

## Math.ceil()

对参数进行向上取整

## Math.floor()

对参数进行向下取整

## Math.max()

传两个参数，返回两数中的最高值

## Math.min()

传两个参数，返回两数中的最低值

## Math.pow()

传递两个参数，第二个参数是幂，返回第一个参数的几次幂

## Math.sqrt()

返回参数的平方根

## Math.random()

产生0-1之间的随机数

随机数方法经常使用，比如要生成5-10之间的随机数

当求一个x-y之间的数公式就是：`Math.round( Math.random() * ( y - x ) + x )`

```js
Math.round( Math.random() * 5 + 5 )
```

通常第二个数是区间中下限的数，第一个数是区间上限的数与第二个加的数的差值。现在生成的就是5-10之间的随机数，并且包括5和10本身，如果想不包含5那就调整第一个数，想不包含10那就调整第二个数。