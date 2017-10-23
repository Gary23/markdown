---

title: 《可维护的js》二、编程实践
date: 2017-10-21 19:49:19
tags: 《可维护的js》

---

## 避免使用全局变量

在多人开发的环境中要尽量避免使用全局变量，一个原因是全局变量会造成全局污染(命名冲突)，第二个原因是函数中如果使用全局变量，那么换一个环境，或者全局变量被别人更改，函数将没法执行。

### 单全局变量

所以，我们可以使用单全局变量，例如jQuery库提供的的全局变量只有$和jQuery。我们可以将所有功能代码都挂载到这个全局对象上，比如：

```js
function Person(str) {
    this.name = str;
}
var name1 = new Person('tim');
    name2 = new Person('jack');
    name3 = new Person('mack');
```

上面这个代码创建了四个全局变量，单全局变量模式则只会创建一个全局对象，并将这些对象都赋值为它的属性。

```js
var obj = {};

obj.Person = function(str) {
    this.name = str;
}

obj.name1 = new obj.Person('tim');
obj.name2 = new obj.Person('jack');
obj.name3 = new obj.Person('mack');
```

这段代码只有一个全局对象就是obj。

#### 单全局变量的使用----命名空间

即使代码只有一个全局对象，也存在着全局污染的可能性。大多数使用单全局变量模式的项目同样包含命名空间的概念。所以扩展单全局对象时候应该按照功能将命名空间进行分组，比如 obj.DOM、obj.Event、obj.Mail 等等。这样看起来井然有序、语义明显。

如果每个js文件都需要给一个命名空间并挂载东西，我们可以使用一个方法来对全局对象扩展，并且保证这个命名空间是已经存在的，基本模式如下：

```js
var obj = {
    namespace: function(ns) {
        var parts = ns.split('.'),
            object = this,
            i, len;
        
        for (i = 0, len = parts.length; i < len; i++) {
            if (!object[parts[i]]) {
                object[parts[i]] = {};
            }
            object = object[parts[i]];
        } 

        return object;
    }
};
```

namespace这个方法可以传入一个表示命名空间对象的字符串，它会非破坏性的创建这个命名空间，如下：

```js
// 同时创建obj.Person和obj.Person.name
obj.namespace('Person.name');
// 使用这个命名空间
obj.Person.name = 'tim';

// 不会操作Person本身，同时会给它添加age，Person.name也是原封不动的
obj.namespace('Person.age');
obj.Person.age = 27;

console.log(obj.Person.name)  // 打印 tim
console.log(obj.Person.age)  // 打印 27

// 同样可以在方法调用之后立即给它添加新的属性，因为namespace会将传入的命名空间reutrn
obj.namespace('Person').interest = {};

```

只要每个文件都首先使用了namespace方法就可以保证命名空间总是存在的。在使用命名空间之前不必再去判断它是否存在。

#### 单全局变量的使用----模块

另一种基于单全局变量的扩充方法是使用模块，模块是一种通用的功能片段，它并没有创建新的全局变量或者命名空间，相反，所有的这些代码都存放于一个表示执行一个任务或发布一个接口的单函数中，可以用一个名称来表示这个模块，同样这个模块可以依赖其他模块。

js本身并没有模块的概念，但是有一些通用的模式用来创建模块，叫做异步模块定义(AMD模式)。可以指定模块名称、依赖和一个工厂方法，依赖加载完成后执行这个工厂方法。这些内容全部作为参数传入一个全局函数 define() 中，其中第一个参数是模块名称，然后是依赖列表，最后是工厂方法。

```js
define( 'Person', ['events', 'beta'], function(events, beta) {
    var obj = {};
    obj.Person = {
        name: 'tim'
    };

    return obj;
} )
```

当然也可以是匿名的，第一个参数模块名称可以省略，模块加载器会将文件名当做模块名称，xxxx.js。

想要使用AMD模块需要使用一个与之兼容的模块加载器，例如 RequireJS。RequireJS添加了另一个全局函数require()，用来加载指定的依赖和执行回调函数，比如：

```js
// 加载上面创建的Person
require(['Person'], function( obj ) {
    console.log(obj.person.name);  // 打印 tim
})
```

### 零全局变量

如果是一段不会被其他脚本访问到的完全独立的脚本，或者这段代码不需要提供任何接口也不需要被其他代码依赖，才会不需要创建全局变量，实现方法就是一个立即执行的匿名函数。

```js
(function(win) {
    var doc = win.document;
    // do something
}(window))
```

## 避免空比较

在js中尽量不要检测数据类型时候与null比较，除非期望的值真的是null，则可以直接和null进行比较。

```js
var elem = document.getElementById('box');
if (elem !== null) {
    elem.callName = 'found';
}
```

如果DOM元素不存在，则elem得到的值为null。所以这个方法要么返回一个节点要么返回一个null。这时null是可预见的一种输出，则可以使用null来检测。

### 检测基本类型

检测基本类型最好的方法是使用typeof，他可以检测：string、number、boolean、undefined。但是不能用来检测null，会返回object。

### 检测引用类型

引用类型也称作对象，js中除了基本类型外都是对象。检测引用值的类型的最好方法是 instanceof 运算符。

```js
// 检测日期
if (value instanceof Date) {

}

// 检测正则
if (value instanceof RegExp) {

}
``` 

instanceof 不仅检测对象的构造器，还检测原型链。所以任何引用类型去 instanceof Object 都返回 true。instanceof 也可以检测自定义的类型。

```js
function Person(name) {
    this.name = name;
}
var me = new Person('tim');
console.log(me instanceof Person);  // 打印 true
console.log(me instanceof Object);  // 打印 true
```

有一点需要注意，instanceof 在浏览器中的两个frame之间是不能互相检测的，即便都有Person。但是frameA的实例放到frameB中是检测不到的。他们引用自不同的地址，可以看作是一份拷贝的实例。

另外函数和数组这两个类型一般也用不到instanceof。

### 检测函数

从技术上来看，js中的函数是引用类型，也确实存在Function构造函数，但是最好的方法使用typeof去检测函数。因为typeof可以跨frame。

```js
function fun() {}
console.log(typeof fun === 'function');  // 打印true
```

但是在IE8及更早的IE浏览器中不能用typeof来检测DOM的方法，比如：document.getElementById()方法会返回object而不是function。因为这些老的浏览器没有将DOM实现为内置的js方法，所以在这些浏览器中需要用in运算符来检测DOM方法。

```js
if('querySelector' in document){

}
```

### 检测数组

检测数组最好的方法是 Array.isArry() 方法。

```js
var arr = [];
console.log(Array.isArray(arr))  // 打印 true
```

对于旧浏览器我们可以自己扩展一个isArry方法。

```js
function isArray(value) {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === '[object Array]';
    }
}
```

`Object.prototype.toString.call(value) === '[object Array]'` 就是isArray的实现方式，这条语句适用于所有浏览器去检测数组。


### 检测属性

检测对象的属性，先来看几个不好的写法：

```js
// 不好的写法，检测假值
if (object[propertyName]) {

}

// 不好的写法，和null比较
if (object[propertyName] != null) {

}

// 不好的写法：和undefined比较
if (object[propertyName] != undefined) {

}
```

上面的几个检测都是通过检测这个属性的值来判断，这是不对的，应该只通过判断属性名来检测属性是否存在。这里最好的方法是使用in运算符。

```js
var object = {
    count: 0
};

if ('count' in object) {
    // 执行代码
}
```

in运算符回去检测原型链，但是如果只想检测对象的实例属性，可以使用 hasOwnProperty() 方法。需要注意在旧的浏览器中，DOM对象并非继承自Object，因此DOM对象也不包含这个方法，也就是说在DOM对象调用 hasOwnProperty() 之前最好先检测其是否存在。

```js
// 所有非DOM对象
if (object.hasOwnProperty('count')) {
    // 执行代码
}

// 如果不确定是否为DOM对象及是否为旧浏览器
if ('hasOwnProperty' in object && object.hasOwnProperty('count')) {
    // 执行代码
}
```