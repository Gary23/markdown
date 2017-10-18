
---

title: bbc的tool.js
date: 2017-09-11 17:26:21
tags: bbc

---

## 工具类函数 tools.js

### 判断是否为 dom 元素

函数： isElement(dom)

作用： 判断参数是否为一个 dom 元素。

参数： 

- jQuery对象或dom对象

返回值： (Boolean)是 dom 对象返回 true，否则返回 false。

```js
//判断是否为dom元素
function isElement(dom) {
    if(dom instanceof jQuery) {
        dom = dom[0];
    }
    if(!dom) return false;
    return dom.nodeName && dom.nodeType === 1;
}
```

使用isElement：

```html
<div id="box"></div>
```

```js
var box = document.getElementById('box');
var flag = isElement($('#box'));   // true
var falg1 = isElement(box);    // true
var flag2 = isElement('#box')   // false
```

### 模板字符替换

函数： substitute(string, object)

作用： 以json直接量替换字符串中的 {xx} 部分，可看做一个简单的html模板

参数： 

- string：要被替换的字符串 

- object：对应的json直接量

返回值： (String)被替换后的字符串

```js
function substitute(string, object) {
    return string.replace(/\\?\{([^{}]+)\}/g, function(match, name){
        if (match.charAt(0) === '\\') return match.slice(1);
        return (object[name] != null) ? object[name] : '';
    });
}
```

使用substitute：

```js
var config = {
    data : {value : '123',text:'abc'},
    template : '<label>{text}</label><input type="text" value="{value}"/>'
};

var s = substitute(config.template,config.data);

console.log(s);
// 打印: <label>abc</label><input type="text" value="123"/>
```

### 页面最大 z-index

函数： maxZindex(scope, increase)

作用： 获取页面所有元素中最大的z-index是多少

参数： 

- scope：查找范围的dom元素，这里dom元素不是指的父元素，而是直接含有定位属性的元素。

- increase：增量

返回值： (Number)最终计算的结果

```js
function maxZindex(scope, increase) {
    scope = scope || 'div';
    scope = $(scope);
    var max = 0;
    if(scope.length) {
        var pos = scope.filter(function(i,el){
            // 如果el不是一个dom对象，或者是'script', 'link', 'base', 'style'中的一个就没必要去管
            if(!isElement(el) || ['script', 'link', 'base', 'style'].indexOf(el.tagName.toLowerCase()) > -1) return;
            // 判断el有没有'absolute','relative','fixed'中的一个属性
            return ['absolute','relative','fixed'].indexOf($(el).css('position')) > -1;
        });
        // 获取有定位的元素中最大的z-index值
        if(pos.length) {
            for(var i=0, j=pos.length;i<j;i++) {
                var z = pos.eq(i).css('z-index');
                max = Math.max(max, isNaN(z) ? 0 : z);
            }
        }
    }
    if(increase) max += parseInt(increase);
    // z-index的最大值是2147483647
    return Math.min(max, 2147483647);
}

```

使用maxZindex：

```js
var maxZ = maxZindex('div',10);

console.log(maxZ);     // 假如页面中的div元素定位最高为100，那么会打印110
```

### 获取配置项

函数： dataOptions(element, prefix)

作用： 从元素的 data- 属性中组织出配置项，以JSON方式输出，主要是对 data-xxx-xxx 这种两个-及以上连接的属性，目的就是只保留最后一个 xxx 作为属性名。

参数： 

- element: 要获取的目标dom元素。

- prefix: 必需，前缀，在 data- 后面、要获取的配置项名前面。

返回值： (JSON)最终配置项

```js
function dataOptions1(element, prefix){
    if(!prefix) return false;
    // prefix参数的值为select
    // 这里通过data后，像data-select-time会被解析为selectTime，去取消-改为驼峰
    var data = $(element).data(),
        out = {}, inkey,
        replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
    // replace是为了获取驼峰写法/select([A-Z])/
    prefix = new RegExp('^' + prefix.toLowerCase());
    for (var key in data) {
        // 匹配所有带有select的属性，key现在是驼峰写法selectT
        if (prefix.test(key)){    
            inkey = key.replace(replace, function(_, a){
                // 将selectT替换为小写t
                return a.toLowerCase();        
            });
            out[inkey] = data[key];
        }
    }
    return out;
}
```

使用dataOptions1：

```html
<div class="test" data-select-time="3000" data-select-name="box">
    1111111111111111
</div>
```

```js
var obj = dataOptions1('.test','select')

console.log(obj)

// 打印 { name: "box",time: 3000 }
```

### 倒计时时钟

函数： countdown(element, options)

作用： 通用倒计时，包括倒计时所在容器，倒数秒数，显示方式，回调。

参数： 

- element: 要显示的位置的dom元素 

- options: 配置参数，包含以下参数： 
 
- start：倒计时的秒数 
 
- secondOnly：显示方式（是否只显示秒） 

- callback：倒计时完成后的回调

返回值： 无

```js
function countdown(element, options){
    var self = this;
    options = $.extend({
        start: 60,
        secondOnly: false,
        callback: null
    }, options || {});
    var t = options.start;      
    var sec = options.secondOnly;
    var fn = options.callback;
    var d = +new Date();
    var diff = Math.round((d + t * 1000) / 1000);   
    this.timer = timeout(element, diff, fn);    
    this.stop = function() {
        clearTimeout(self.timer);
    };

    function timeout(element, until, fn) {
        var str = '',
            started = false,
            left = {d: 0, h: 0, m: 0, s: 0, t: 0},
            current = Math.round(+new Date() / 1000),
            data = {d: '天', h: '时', m: '分', s: '秒'};

        left.s = until - current;  

        if (left.s < 0) {
            return;
        }
        else if(left.s == 0) { 
            // fn && fn();
            fn && fn.call(element,null);
        }
        if(!sec) {
            if (Math.floor(left.s / 86400) > 0) {
              left.d = Math.floor(left.s / 86400);  
              left.s = left.s % 86400; 
              str += left.d + data.d; 
              started = true;   
            }
            if (Math.floor(left.s / 3600) > 0) {
              left.h = Math.floor(left.s / 3600); 
              left.s = left.s % 3600; 
              started = true;
            }
        }
        if (started) {
          str += ' ' + left.h + data.h; 
          started = true;
        }
        if(!sec) {
            if (Math.floor(left.s / 60) > 0) {
              left.m = Math.floor(left.s / 60); 
              left.s = left.s % 60; 
              started = true;
            }
        }
        if (started) {
          str += ' ' + left.m + data.m;
          started = true;
        }
        if (Math.floor(left.s) > 0) {   
          started = true;
        }
        if (started) {
          str += ' ' + left.s + data.s;
          started = true;
        }

        $(element).html(str);
        return setTimeout(function() {timeout(element, until,fn);}, 1000);
    }
}
```

使用countdown：

```js
countdown($('#box'),{
    start: 6000,
    secondOnly: false,
    callback: function(){
        // do something;
    }
})
```

### 获取元素的内补或外补

函数： $.fn.patch(type)

作用： 获取元素内边距、外边距或边框宽度

参数： 

- type：获取哪一部分样式，可以为padding、margin、border，不传参数是三个都获取。

返回值： (JSON)根据type计算出的最终结果{x:number, y:number}，x是left+right，y是top+bottom

```js
$.fn.patch = function (type) {
    var el = this;
    var args;
    if (type) {
        args = $.makeArray(type);    // 将参数转换为真数组
    }
    else {
        args = ['margin', 'padding', 'border'];
    }
    var _return = {
        x: 0,
        y: 0
    };

    // 这里遍历2次（x、y）
    $.each({x: ['left', 'right'], y: ['top', 'bottom']}, function(p1, p2) {
        // 这里遍历2次（['left', 'right']和['top', 'bottom']）
        $.each(p2, function(i, p) {
            try {
                // 遍历三次（'margin', 'padding', 'border'），或者是1次（参数）
                $.each(args, function(i, arg) {
                    // ['margin', 'padding', 'border']的left、right、top、bottom
                    arg += '-' + p;        
                    // 如果是border只需要获取width就行，因为border 有很多其他属性
                    if (arg.indexOf('border') == 0) arg += '-width';
                    _return[p1] += parseInt(el.css(arg)) || 0;
                });
            } catch(e) {}
        });
    });
    return _return;
};
```

使用patch：

```html
<style>
    .test{
        margin: 10px;
        padding: 10px 20px;
        border: 2px solid #000;
    }
</style>
<div class="test" data-select-time="3000" data-select-name="box">
1111111111111111
</div>
```

```js
var result =  $('.test').patch()

console.log(result);    

// 打印 { x: 64, y: 44}
```


### dom 9点定位

函数： $.fn.locate(options)

作用： 根据9个方位由一个dom定位到另一个dom上的位置

参数： - options：配置项的JSON直接量，包括： - relative：调用元素的父元素，默认为body - x：定位dom的x轴的位置，默认为center，可选left、right - y：定位dom的y轴的位置，默认为center，可选top、bottom  - pos：定位方式，可选absolute和fixed，默认absolute  - offset：设置偏移量，默认是 0。

返回值： (DOM)自身

```js

//双dom9点定位，支持绝对定位和固定定位
$.fn.locate = function (options) {
    options = $.extend({
        relative: document.body, // 应该是父元素
        x: 'center', //left center right
        y: 'center',  // top center riht
        pos: 'absolute', // 定位方式
        //top center bottom
        offset: { //偏移量
            x: 0,
            y: 0
        }
    }, options);

    var left,
        top,
        x,
        y,
        offset = options.offset,
        el = $(options.relative),   // el是父元素
        $this = $(this).css('position', options.pos),   // 调用元素的定位方式
        h = $this.height(),     // 调用元素的高度
        w = $this.width(),      // 调用元素的宽度
        // innerHeight不含边框和外边距
        elH = (el.is('body') ? $('body') : el).innerHeight(),       // 判断父元素是不是body，获取父元素的高度
        elW = el.innerWidth();      // 获取父元素的宽度

    // 绝对定位
    if (options.pos === 'absolute') {
        //left定位
        switch (options.x) { 
            case 0:
            case 'left':
                x = 0;
                break;
            case 'right':
                x = elW - w;
                break;
            default:
                x = parseInt((elW - w) / 2); // 默认居中
                break;
        }

        // top定位
        switch (options.y) { 
            case 0:
            case 'top':
                y = 0;
                break;
            case 'bottom':
                y = elH - h;
                break;
            default:
                y = parseInt((elH - h) / 2);
                break;
        }
        // 定位的数值加上父元素的边距  el.scrollLeft()???
        left = Math.max(0, Math.floor(x + (el.offset() ? el.offset().left : 0) + el.scrollLeft()));

        top = Math.max(0, Math.floor(y + (el.offset() ? el.offset().top : 0) + el.scrollTop()));

        if ($.isPlainObject(offset)) {
            left += offset.x || 0;
            top += offset.y || 0;
        }

        $this.css({
            left: left,
            top: top
        });
    // 固定定位只能居中
    } else if (options.pos === 'fixed') {
        left = '50%';
        top = '50%';

        $this.css({
            left: left,
            top: top,
            marginLeft: -w / 2,
            marginTop: -h / 2
        });
    }
    return this;
};
```

### 数组some方法

函数： Array.some(fn, thisArg)

作用： 为不支持数组some方法的浏览器增加some方法，使得回调中执行的结果只要有一个为真值，就返回true，否则为false。它只对数组中的非空元素执行指定的函数，没有赋值或者已经删除的元素将被忽略。 some 不会改变原有数组。

参数： - fn：要对每个数组元素执行的回调函数，此函数可以有三个参数：当前元素，当前元素的索引和当前的数组对象。 - thisArg：在执行回调函数时定义的this对象。如果没有定义或者为null，那么将会使用全局对象。

返回值： (Boolean)根据执行结果返回true或false

```js

if (!Array.prototype.some) {
    Array.prototype.some = function(fn, thisArg) {
        var i = 0, n = this.length;
        
        for (; i < n; i++) {
            // 给isBigEnough传值
            if (i in this && fn.call(thisArg, this[i], i, this)) {
                return true;
            }
        }
        return false;
    };
}
```

使用some方法：

```js
function isBigEnough(element, index, array) {
    // 这里是判断数组是否有比10大的数字
    return (element >= 10);
}
var passed = [2, 5, 8, 1, 4].some(isBigEnough); 
// false
```

### 数组every方法

函数： Array.every(fn, thisArg)

作用： 为不支持数组every方法的浏览器增加every方法，使得回调中执行的结果必须全部为真值，才返回true，否则为false。它只对数组中的非空元素执行指定的函数，没有赋值或者已经删除的元素将被忽略。 every 不会改变原有数组。

参数： - fn：要对每个数组元素执行的回调函数，此函数可以有三个参数：当前元素，当前元素的索引和当前的数组对象。 - thisArg：在执行回调函数时定义的this对象。如果没有定义或者为null，那么将会使用全局对象。

返回值： (Boolean)根据执行结果返回true或false

```js
if (!Array.prototype.every) {
    Array.prototype.every = function(fn, thisArg) {
        var i = 0, n = this.length;
        for (; i < n; i++) {
            if (i in this && !fn.call(thisArg, this[i], i, this)) {
                return false;
            }
        }
        return true;
    };
}
```

使用some方法：

```js
function isBigEnough(element, index, array) {
    // 这里是判断数组的元素是否全部大于10
    return (element >= 10);
}

var passed = [12, 5, 8, 130, 44].every(isBigEnough);
// false
var passed1 = [12, 54, 18, 130, 44].every(isBigEnough);
// true
```