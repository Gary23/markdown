# 基本格式化

## 缩进

对于大多数编程风格来说，代码缩进有两种主张。

## 制表符缩进

优点是一个制表符就是一个缩进层级，一对一的关系很符合逻辑，不同编辑器都可以设置制表符的展现长度(通常是4个字符)。

缺点是系统对制表符的解释不一致，不同系统用编辑器打开文件时制表符长度不同。

以vscode为例下图就是制表符的缩进，这是一个制表符的长度(一个缩进层级)。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/884f176f6a1c32cc14e3cb70cf32365084606166fb9220bf002a8660f2775f8be86fe2a77ecfdbee18e5986a4c0c1829?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20171018-1.PNG&size=1024)

## 空格缩进

优点是在所有系统和编辑器中，文件的展现不会有差异。编辑器中可以配置一个tab代表几个空格(此时tab不代表制表符而是代表空格)。

缺点是修改麻烦，制表符的宽度可以在编辑器设置，但空格的缩进只能手动更改。

以vscode为例下图就是空格的缩进，这是四个空格的缩进(一个缩进层级)。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/92953397417fe10e5ee45fd34fdb7bc83d8ef416df6fe8d7ba7f37dccd0524a604533c93cf0580511d349f29a9c8d6cc?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20171018-2.PNG&size=1024)

> 重点在这里，不论使用那种，都要保持代码的统一，不要两种混用，不要两种混用，不要两种混用！

## 语句结尾

javascript代码的语句要不独占一行，要不就以分号结尾，但是这里推荐以分号结尾，大部分检测工具也是这样建议的。

## 行的长度

如果代码的行太长，编辑器就会出现横向滚动条或者折行，都是比较别扭的显示方式。大部分规范都建议长度不要超过80个字符。

## 换行

当一行的长度达到了单行最大字符数限制时，就需要手动换行，最好的方式是在运算符后换行，并且下一行增加两个缩进层级。

```js
// 好的做法：运算符后换行，第二行两个缩进层级
callFun(document, element, window, 'some string value',
        true, 123);
    //do something

// 不好的做好：第二行只有一个缩进层级
callFun(document, element, window, 'some string value',
    true, 123);
    //do something

// 不好的做法：在运算符之前换行
callFun(document, element, window, 'some string value'
        ,true, 123);
    //do something

```

## 空行

通常代码不应该是一大段揉在一起的连续文本，两端不同语义的代码可以用空行分隔，一般建议在如下场景使用空行分隔：

1. 在方法之间

2. 在方法中的局部变量和第一条语句之间

3. 在多行或单行注释之前

4. 在方法的逻辑片段之间插入空行，提高可读性

## 变量和函数

变量的命名应该尽可能短并且抓住要点，比如 name、length、message 等等。如果要写成驼峰形式应该用名词作为前缀词。

函数的命名应该用动词最为前缀词，比如 can、has、is、get、set 。

构造函数是一个例外，因为常用来创建某个类型的实例，所以构造函数也常常是名词，为了与普通函数和变量区分，构造函数的命名应该首字母大写，比如 Person、AnotherName 等等。

## 常量

在ES6之前其实js并没有常量的概念，所以为了区分变量和常量，可以将常量使用大写字母和下划线来命名，比如：

```js
if(count < MAX_COUNT) {
    // do something
}
```
 
# 语句和表达式

## case语句的连续执行

switch中的case语句通常应该以 break、return、throw 结尾以跳出判断，但实际上连续的case执行也是被认可的。只要程序逻辑够清晰即可。

```js
switch(a){
    case "first":
    case "second":
        // do something
        break;
    
    case "third":
        // do something

        /* fall through */
    default:
        // do something
}
```

这段switch中有两个连续执行，第一个是程序在执行完第一个case后会继续执行第二个，从逻辑上来讲这是合理的。因为第一个case中并没有要执行的语句。
第二个是 case "third" 执行后继续执行 default 里的语句。这里要注意，这虽然是可以的，但最好添加一条注释，注明这不是代码中的一个错误。

## for...in 循环

for...in 循环有一个问题，就是它不仅遍历对象的实例属性(instance property)，同样还遍历从原型继承来的属性，所以最好使用 hasOwnProperty() 方法来为for...in循环过滤出实例属性。因为我们并不能保证其他程序员有没有在该对象的原型上增加什么属性。

```js
for (i in object) {
    if (object.hasOwnProperty()) {
        console.log(i);
        console.log(object[i]); 
    }
}
```

还有for...in循环原本是用来遍历对象的。最好不要用其遍历数组。

# 变量、函数和运算符

## 声明变量

var声明变量并没有标准，个人倾向于将所有var语句合并为一个语句，每个变量独占一行，赋值运算符应当对齐(更适合使用空格缩进)。

```js
var value  = 10,
    result = value + 10,
    i,
    len;
```

## 函数声明

首先，函数的调用应该放到函数声明之后，虽然放到之前运行并没有错，但是看起来会显得怪异。

在函数内部的局部函数声明应当紧接变量声明之后。

```js
function fun() {
    var value  = 10,
        result = value + 10,
        i,
        len;
    
    function doSomething() {

    }
}
```

函数的声明不能放在判断语句中，因为它们在不同浏览器中的运行结果也不相同。

```js
if (flag) {
    function doSomething() {
        alert('Hi');
    }
}else{
    function doSomething() {
        alert('Hello');
    }    
}
```

大多数浏览器会自动使用第二个声明。而firefox则根据flag的结果选用合适的函数声明。

## 立即调用的函数

匿名函数可以在声明时立即调用，并且可以将调用结果赋值给变量。

```js
var value = function () {
    return 'Hi';
}();
```

上面这种写法即可立即调用函数并将返回值赋值给value变量，但是这会给阅读带来困惑，如果函数很长必须阅读到最后才知道这个函数是否调用，如果没注意到还以为是将整个匿名函数赋值给了value变量，所以推荐下面这种写法。

```js
var value = (function () {
    return 'Hi';
}());
```

当我们看到函数被括号包裹，就自然会知道这是立即调用的匿名函数。

## 基本包装类型

基本包装对象的主要作用是让基本类型的值具有对象般的行为，比如：

```js
var name = 'tim';
console.log(name.toUpperCase());  // 打印 TIM
```

尽管这是一个字符串，是基本类型而不是对象，但仍然可以用toUpperCase()之类方法(即将字符串当做对象来对待)。这是因为在本条语句背后，js引擎创建了String类型的新实例，紧跟着就被销毁了，当再次需要时就会创建另一个对象，所以会有如下情况：

```js
var name = 'tim';
name.author = true; 
console.log(name.author)  // 打印 undefined
```

按照之前的说法，第二行结束后，author属性就不见了，因为这是临时生成的，第二行结束后就销毁了。而在第三行又生成了新的。所以基本包装类型尽可能不要使用，避免开发时候的思路在对象和基本类型值之间跳来跳去。