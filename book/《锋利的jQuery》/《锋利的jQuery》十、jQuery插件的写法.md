

编写插件的目的是给已有的一系列方法或函数做一个封装，以便在其他地方重复使用，方便后期维护和提高开发效率。

## 插件的种类

### 1.封装对象方法的插件

这种插件是将对象方法封装起来，用于通过选择器获取jQuery对象进行操作，是最常见的一种插件。比如`parent()`、`appendTo()`、`addClass()`等。

### 2.封装全局函数的插件

可以将独立的函数加载到jQuery的命名空间之下。例如`$.ajax()`、`$.trim()`等。

### 3.选择器插件

个别情况下，会需要使用到选择器插件，虽然jQuery的选择器十分强大，但还是会需要扩充一些自己喜欢的选择器。

## 插件的基本要点

插件的文件名推荐命名为`jquery.[插件名].js`。

所有的对象方法都应该附加到jQuery.fn对象上，而所有的全局函数都应该附加到jQuery对象本身上。

在插件内部，`this`只想的是当前通过选择器获取的jQuery对象，例如`click()`方法指向的是DOM元素。可以通过this.each来遍历所有元素。

插件应该返回一个jQuery对象，以保证插件的可链式操作。除非插件需要返回的是一些需要获取的量，例如字符串或者数组。

避免在插件内部使用$作为jQuery对象的别名，而应该用完整的jQuery来表示。这样可以避免冲突，如果使用$作为jQuery的别名，要用必报来避免冲突。

## 插件中的闭包

利用闭包的特性，既可以避免内部临时变量影响全局空间，又可以在插件内部继续使用$作为jQuery别名。

```js
(function($){        // 将$作为匿名函数的形参
    // 这里编写插件的代码
    var foo;
    var bar = function(){
          // 在匿名函数内部的函数都可以访问foo，即便是在匿名函数的外部调用bar()的时候，也可以在bar()的内部访问到foo，但在匿名函数的外部直接访问foo是做不到的。
    }

    // 下面的语句让匿名函数内部的函数bar()返回到全局可访问的范围内，这样就可以在匿名函数的外部通过调用jQuery.BAR()来访问内部定义的函数bar()，并且内部函数bar()也能访问匿名函数内的变量foo。
    $.BAR = bar;
})(jQuery)        // jQuery作为实参传递给匿名函数
```

## jQuery的插件机制

jQuery提供了两个用于扩展jQuery功能的方法，`jQuery.fn.extend()`方法和`jQuery.extend()`方法。第一个方法用于封装对象方法的插件，第二个适用于封装全局函数插件和选择器插件。这两个方法都接收一个参数，类型是Object。

`jQuery.extend()`除了扩展插件能用到，还有一个用处是扩展已有的对象，也就是传递两个参数，类型都是object，第二个对象会和第一个对象合并，相同的属性第二个会覆盖第一个。

```js
var settings = { validate: false , limit: 5 , name: 'foo' };
var options = { validate: true , name: 'bar' };
var newObj = jQuery.extend(settings,options);
console.log(newObj)      // { validate: true , limit: 5 , name: 'bar' }
```

所以`jQuery.extend()`方法经常用于设置插件方法的一些默认参数。

## 编写jQuery插件

### 封装jQuery对象插件

#### 设置和获取颜色的插件

首先编写设置和获取颜色的插件color。该插件的功能是：
1. 设置匹配元素的颜色
2. 获取匹配的元素(元素集合中的第一个)的颜色。

由于是在jQuery对象上扩展方法所以使用`jQuery.fn.extend`，这里要注意的是插件扩展内部的this指的是jQuery对象而不是普通的dom对象，然后插件如果不是返回字符串之类的特定值，应当使其具有可链接性，为此要直接返回这个this对象。
```js
(function($){
    $.fn.extend({
        'color': function(value){
            if(value == undefined){      
                return this.css('color');      // 获取颜色。css方法本身就默认返回第一个的颜色
            }else{        
                return this.each(function(){
                    $(this).css('color',value);     // 设置颜色，由于this是jQuery对象，所以不需要each遍历
                })
            }
        }
    });
})(jQuery)
```

#### 表格隔行变色插件

```js
(function($){
    $.fn.extend({
        'alterBgColor': function(options){
            options = $.extend({
                odd: 'odd',        // 偶数行样式
                even: 'even',      // 奇书行样式
                selected: 'selected'       // 选中行样式
            },options);
            $('tbody>tr:odd' , this).addClass(options.odd);
            $('tbody>tr:even' , this).addClass(options.even);
            $('tbody>tr' , this).click(function(){
                // 判断当前是否选中
                var hasSelected = $(this).hasClass(options.selected);
                // 如果选中，则移出selected类，否则就加上selected类
                $(this)[hasSelected ? 'removeClass' : 'addClass'](options.selected).find(':checkbox').prop('checked',!hasSelected);
             });
             // 如果单选框默认情况下是选择的，则高亮
             $('tbody>tr:has(:checked)' , this).addClass(options.selected);
             return this;       // 返回this，可以继续链式操作
        }
    });
})(jQuery)
```

> 需要注意的是上面两个插件内部this都是可以匹配多个元素，但是如果遇到只能匹配一个元素的时候，要each遍历匹配的jQuery对象，而在each内部，this就是dom对象不是jQuery对象了。

### 封装全局函数

这类插件是在jQuery命名空间内部添加一个函数。

增加两个函数，用于去除左侧空格和右侧空格。
```js
(function($){
    $.extend({
        ltrim: function(text){
            // 假如text是undefined等非正确参数，就取空字符串，防止replace方法报错
            return (text || '').replace(/^\s+/g,'');
        },
        rtrim: function(text){
            return (text || '').replace(/\s+$/g,'');
        }
    })
})(jQuery)
```
由于是全局函数，所以要由jQuery或者$调用，不能用jQuery对象去调用。

```js
$.ltrim('         text');
$.rtrim('text        ');
```

### 自定义选择器

jQuery提供了一套方法让用户客户以通过制作选择器插件来使用自定义选择器。jQuery选择器执行的步骤如下：

1. jQuery的选择符解析器首先会使用一组正则表达式来解析选择器

2. 针对解析出的每个选择符执行一个选择器函数

3. 根据这个函数返回的是`true`还是`false`来决定是否保留这个元素。

按照上面的步骤，以`$('div:gt(1)')`来举例：

1. 选择器首先获取所有的`div`元素

2. 逐个将这些`div`元素作为参数，连同括号里的1等一些参数一起传递给`gt`对应的选择器函数进行判断

3. 如果`gt`对应的选择器函数返回`true`则这个`div`元素保留，如果返回`false`则不保留，这样得到的结果就是一个符合要求的`div`元素集合

现在来看一下最关键的`gt`的选择器函数：

```js
gt: function(a,i,m){
     return i > m[3] - 0;
}
```
选择器一共接受三个参数：

第一个参数为a，指向的是当前遍历到的dom元素。

第二个参数为i，指的是当前遍历到的dom元素的索引值，从0开始。

第三个参数m最为特别，它是由jQuery正则解析引擎进一步解析后的产物(用match匹配出来的)，m是一个数组。在这时m[3]的值就是'1'。
m[0]的值是`:gt(1)`
m[1]的值是`:`
m[2]的值是`gt`
m[4]在上面的例子没有体现，假如是`div:l(ss(dd))`这样一个选择器，m[4]就指向了`(dd)`这部分，另外这里的m[3]的值就是`ss(dd)`。

#### 编写一个between选择器

例如使用`$('div:between(2,5)')`能实现获取索引3、4元素的功能。

选择器仅仅是`jQuery.expr[':']`对象的一部分，所以这里是将`between`函数扩展到`jQuery.expr[':']`对象中。
```js
(function($){
    $.extend(jQuery.expr[':'],{
        between: function(a,i,m){
            var tmp = m[3].split(',');    // 将m[3]'最小值,最大值'改为['最小值','最大值']
            return tmp[0] - 0 < i && i < tmp[1] - 0;      // 将索引与最小和最大值进行比较，符合要求的返回true，这里-0 是隐式转换的意思
        }
    })
})(jQuery)
```
