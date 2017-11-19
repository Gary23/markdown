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

## 将配置数据从代码中分离出来

任何修改数据的操作都会有引入bug的风险，只修改一些数据的值约会带来一些不必要的风险，精心设计的应用应当将关键数据从主要的源码中抽离出来。这样修改源代码时才会更加放心。

### 什么是配置数据

配置数据在应用中是写死的值。

```js
function validate(value) {
    if (!value) {
        alert('Invalid value');
        location.href = '/error/invalid.php';
    }
}
```

这段代码中'Invalid value'这个值是用来给用户提示的。它可能会被修改，第二个是url，在开发过程中，当架构变更时则很有可能频繁修改url。类似这种写死在代码里并且将来可能会被修改的数据都认为是配置数据。比如：

- URL

- 需要展现给用户的字符串

- 重复的值

- 设置（比如每页的配置项）

- 任何可能发生变更的值

### 抽离配置数据

首先要将数据拿到外部。

```js
var config = {
    MSG_INVALID_VALUE : 'Invalid value',
    URL_INVALID : '/error/invalid.php'
}
function validate(value) {
    if (!value) {
        alert(config.MSG_INVALID_VALUE);
        location.href = config.URL_INVALID;
    }
}
```

这段代码将配置数据保存在了config对象中，将配置抽离出来意味着任何人都可以修改它们，而不会导致应用逻辑出错。

## 抛出自定义错误

### 在js中抛出错误

在js中抛出错误很有价值，因为web端调试的复杂性。可以使用throw操作符，将提供一个对象作为错误抛出，Error是最常用的。

```js
throw new Error('Something bad happened.');
```

错误信息将会抛出在浏览器的控制台中

### 抛出错误的好处

抛出自己的错误可以使用确切的文本供浏览器显示，除了行和列的号码，还可以包含任何你需要的有助于调试问题的信息，最好可以将函数名也添加到错误信息中。

```js
function getDivs(elem) {
    return elem.getElementsByTagName('div');
}
```

函数本意是查找传入元素下的所有div元素，但如果传入的参数是null，会看到一个类似'object expected'的含糊的错误信息。要实际定位到源文件才能知道错误原因，但通过抛出一个错误调试会更简单。

```js
function getDivs(elem) {
    if (elem && elem.getElementsByTagName) {
        return elem.getElementsByTagName('div');
    } else {
        throw new Error('getDivs() : Argument must be a DOM element.');
    }
}
```

这样只要参数不满足条件，就会抛出一个明确陈列错误发生的问题的信息。

### 何时抛出错误

理解了如何抛出只是等式的一个部分，另一部分就是理解什么时候抛出错误。由于js是弱类型语言，大量的开发者错误的假设自己应该实现每个函数的类型检查，这会对代码的整体性能造成影响，比如下面的函数：

```js
function addClass(elem, className) {
    if (!elem || typeof elem.className != 'string') {
        throw new Error('addClass() : First argument must be a DOM element.');
    }
    if (typeof className != 'string) {
        throw new Error('addClass() : Second argument must be a string.');
    }
    elem.className += ' ' + className;
}
```

函数本意是给elem参数添加一个类名，但其实函数中大部分代码都是检查。这种情况就要辨识代码中哪些部分在特定情况下最有可能导致失败，并只在那些地方抛出错误才是关键所在。所以在上面的函数中，最有可能引发错误的是elem参数是一个null值，因为如果第二个参数是null或其他值都不会抛出错误（js会将其强制转为字符串），所以只需要检查elem参数。

```js
function addClass(elem, className) {
    if (!elem || typeof elem.className != 'string') {
        throw new Error('addClass() : First argument must be a DOM element.');
    }
    elem.className += ' ' + className;
}
```

一些关于抛出错误很好的经验法则：

- 一旦修复了一个很难调试的错误，尝试增加一两个自定义错误，当再次发生错误时，这将有助于更容易的解决问题。

- 如果正在编写代码，思考一下：“我希望某些事件不要发生，如果发生，代码会有错误”。这时，“某些事情”就应该抛出一个错误。

- 如果正在编写的代码别人也会使用，思考一下他们使用的方式，在特定情况下抛出错误。

### try-catch

js提供了try-catch语句，它能在浏览器处理抛出错误之前来解析它。可能引发错误的代码放在try中，处理错误的代码放在catch中。

```js
try {
    // 会发生错误的代码
} catch(ex) {   
    // 处理错误的代码
}
```

当try中发生了一个错误时，程序会立刻停止，跳到catch块中，并传入一个错误对象，检查该对象可以确定从错误中恢复的最佳运作。

### 错误类型

目前共有7种错误类型。

1. Error 所有错误的基本类型。实际上引擎从来不会抛出该类型的错误。

2. EvalError 通过eval()函数执行代码发生错误时跳出

3. RangeError 一个数字超出它的边界时抛出，例如一个长度为-20的数组。

4. ReferenceError 期望的对象不存在时抛出，比如试图在一个null对象引用上调用一个函数。

5. SyntaxError 给eval()函数传递的代码中有语法错误时抛出

6. TypeError 变量不是期望的类型时抛出。比如 new 10

7. URIError 给encodeURI()、encodeURIComponent()、decodeURI()或者decodeURIComponent()等函数传递格式非法的URI字符串时抛出。

通过检查特定的错误类型可以更可靠的处理错误

```js
try {
    // 会发生错误的代码
} catch(ex) {
    if (ex instanceof TypeError) {
        // 处理TypeError错误
    } else if (ex instanceof ReferenceError) {
        // 处理ReferenceError错误
    } else {
        // 其他处理
    }
}

```

当然，如果使用new Error实例化一个错误信息，就丧失了区分自己抛出的错误和浏览器错误的能力。解决方案是创建自己的错误类型，让它继承自Error。

```js
function MyError(message) {
    this.message = message;
}
MyError.prototype = new Error();
```

设置prototype为Error的一个实例，这样对js来说它就是一个错误对象了。接下来就可以抛出一个错误对象了。

```js
throw new MyError("Hello world!");
```

这个方法最大的好处是可以在错误类型检测中检测到这个类型。

```js
try {
    // 有些代码引发了错误
} catch(ex) {
    if (ex instanceof MyError) {
        // 处理自己的错误
    } else {
        // 其他处理
    }
}
```

但是该方法在IE8及更早的浏览器中不会显示自定义的错误类型，只会显示那个通用的"Exception thrown but not caught"消息。但是这点缺点实际上也不足为道了。

## 不是你的对象不要动

### 原则

js中原则上有一些对象是不能修改的，包括：

- 原生对象(Object、Array等)

- DOM对象(document)

- 浏览器对象模型(window)

- 类库的对象

对于这些对象要遵守不覆盖方法、不新增方法、不删除方法的原则。因为大多数情况我们不是一个人在写一个项目，随意操作会给团队挖坑。而且如果随意在上面的对象上新增方法很可能会与js或者类库以后更新的方法名称冲突。

### 更好的途径 

如果要对非自己拥有的对象进行修改，最好的方式是基于对象的继承和基于类型的继承。

#### 基于对象的继承

也经常叫做原型继承，一个对象继承另一个对象是不需要调用构造函数的，Object.create()是实现这种继承最简单的方式。

```js
var person = {
    name: 'tim',
    sayName: function() {
        alert(this.name);
    }
};

var myPerson = Object.create(person);
myPerson.sayName();  // 弹出'tim'
```

这种继承方式就如同myPerson的原型设置为person，从此可以访问person的属性和方法，而且重新定义属性和方法会自动切断对person.sayName()的访问。

```js
myPerson.sayName = function() {
    alert('jack');
};

myPerson.sayName();  // 弹出'jack'
person.sayName();   // 弹出'tim'
```

Object.create()方法可以指定第二个参数，该参数是对象类型，可以将对象中的属性和方法添加到新的对象中。

```js
var myPerson = Object.create(person, {
    name: {
        value: 'gary'
    }
});

myPerson.sayName();  // 弹出gary
```

#### 基于类型的继承

区别就是基于类型的继承是通过构造函数实现的，而非对象。这意味着需要访问被继承对象的构造函数。

```js
function MyError(message) {
    this.message = message;
}

MyError.prototype = new Error();
```

这是前面的一个例子，MyError继承自Error。给MyError.prototype赋值为一个Error实例后，每个MyError实例都会从Error那里继承它的属性和方法。

```js
var error = new MyError('Something bad happened.');

console.log(error instanceof Error);  // true
console.log(error instanceof MyError);  // true
```

上面的Error是js的原生类型，而在开发者定了以构造函数的情况下，基于类型的继承也是最合适的。一般需要两步：首先，原型继承；然后，构造器继承。构造器继承是调用类的构造函数时传入新建的对象作为其this的值。例如：

```js
function Person(name) {
    this.name = name;
}

function Author(name) {
    Person.call(this, name);   // 继承构造器
}

Author.prototype = new Person();
var author = new Author('jack');
alert(author.name);  // 弹出'jack'
```

Author类型继承自Person，属性name实际上是由Person类管理的，所以Person.call(this, name)允许Person构造器继续定义该属性。Person构造器是在this上执行的，this指向一个Author对象，所以最终的name定义在这个Author对象上。

#### 门面模式

门面模式为一个已存在的对象创建一个新的接口。门面是一个全新的对象，其背后有一个已存在的对象在工作。门面有时也叫包装器，它们用不同的接口来包装已存在的对象。比如jQuery就使用了一个门面。

```js
function DOMWrapper(element) {
    this.element = element;
}

DOMWrapper.prototype.addClass = function(className) {
    this.element += " " + className;
}

var wrapper = new DOMWrapper(document.getElementById('box'));
wrapper.addClass('selected');

```

DOMWrapper 类型期望传递给其构造器的是一个DOM元素，该元素会保存起来以便以后引用，

### 阻止修改

ECMAScript5中引入了几个方法来防止对对象的修改，有三种锁定修改的级别：锁定(禁止扩展)、密封(禁止删除)、冻结(禁止修改)。每种级别都有两个方法，一个用来实施，一个用来检测是否用了相应的操作。

锁定对象：

```js
var person = {
    name: 'tim'
};

Object.preventExtension(person);   // 锁定对象
console.log(Object.isExtensible(person));    // false，已经锁定，不能被扩展所以是false
person.age = 25;   // 添加不上，如果在严格模式下还会抛出错误
```

密封对象：

```js
Object.seal(person);    // 密封对象
console.log(Object.isExtensible(person));  // false  被密封的对象同时也是不可扩展的
console.log(Object.isSealed(person));    // true  已经被密封，所以打印true
delete.person.name;   // 无法删除对象，严格模式下会报错
```

冻结对象：

```js
Object.freeze(person);   // 冻结对象
console.log(Object.isExtensible(person));    // false，被冻结的对象同时也不可扩展
console.log(Object.isSealed(person));    // true  同上也被密封
console.log(Object.isFrozen(person));    // true  被冻结
person.name = 'Greg';   // 不会修改，在严格模式下报错
```

使用时最好使用严格模式，如果别人在使用你的对象时不知道已经锁定了，进行扩展修改及删除操作并不知道已经锁定而又不报错将会令人沮丧，而抛出错误将会明确的支出原因。

## 浏览器嗅探

### user-agent

为了保证js的正确执行，user-agent检测应该是没有办法的办法，因为新浏览器的发布代表着user-agent也要更新才能保证良好的用户体验。而最安全的办法是只检测旧浏览器，例如要针对IE8之前的版本执行一些特殊操作，那么就检测旧的浏览器user-agent而不要去检测更高的版本。谁也不能确定未来的更新会不会改变user-agent。

总之，user-agent有合理使用的场景，但是要慎用，如果一定要用那么唯一安全的方式是针对旧的或者某个特定版本的浏览器做检测，绝不该针对最新版本或者未来的浏览器做检测。

### 检测特性

检测特性是一种比检测user-agent更聪明的做法。原理是为特定浏览器的特性进行测试。

```js
function getById(id) {
    var element;
    if (document.getElementById) {
        element = document.getElementById(id);
    } else if (document.all) {
        element = document.all[id];
    } else if (document.layers) {
        element = document.layers[id];
    }
    return element;
}
```

特性的检测不依赖于所使用的浏览器，而仅仅依赖特性是否存在。也说明了正确的特性检测的一些重要组成部分：

1. 探测标准的方法。

2. 探测不同浏览器的特定写法。

3. 当被探测的方法均不存在时提供一个合乎逻辑的备用方法。

### 避免特性推断

意思是根据一个特性的存在就推断另一个特性是否存在，问题是这只是一个假设并非事实。例如：

```js
if (document.getElementsByTagName) {
    element = document.getElementById(id);
} else if (window.ActiveXObject) {
    element = document.all(id);
}
```

这都是糟糕的特性推断，最起码两者也要有薄弱的关系才行。通常只需要在使用方法之前检测是否可用即可，不要试图推断特性的关系。

### 避免浏览器推断

```js
if (document.all) {
    id = document.uniqueID;
} else {
    id = Math.random();
}
```

这是一个糟糕的判断，通过检测document.all间接的判断浏览器是否为IE并使用IE的属性。然而仅靠document.all并不能推断就一定是IE浏览器。所以通过特性推断出是某个浏览器是糟糕的做法。

