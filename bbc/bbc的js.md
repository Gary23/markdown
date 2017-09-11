# bbc的js

@(工作)


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

var config = {
	data : {value : '123',text:'abc'},
	template : '<label>{text}</label><input type="text" value="{value}"/>'
};

var s = substitute(config.template,config.data);

console.log(s);
// 打印: <label>abc</label><input type="text" value="123"/>
```

### 解析JS代码

函数： evalScripts(string, content, execScript)

作用： 解析文本中js代码，并可以立即执行，应该是接收到一段html文档，内部包含script标签包含的js代码，这个方法可以获取script标签的js代码并执行。

参数： 

- string：要解析的字符串 

- content：解析后的字符串插入到此dom元素(不需要可以传null) 

- execScript：是否立即执行JS代码

返回值： (String)解析后的字符串(html代码)，script标签的内容不会返回

```js
function evalScripts(string, content, execScript){
    if(!string) return;
    var scripts = '';
    var text = string.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function(){
		// arguments[1]是去掉<script>后的js语句
        scripts += arguments[1] + '\n';
        return '';
	});
	// execScript为true则内容为空否则内容是js代码
	$(content).html(execScript ? text : string);
	// $.globalEval()会立即在全局执行一段js代码。
    execScript && $.globalEval(scripts);
    return text;
}

var str = '<script>alert(1);<\/script>';

evalScripts(str,'script',true);

// 在页面打印 1
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

```html
<div class="test" data-select-time="3000" data-select-name="box">
	1111111111111111
</div>
```

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

### 获取元素的内补或外补

函数： $.fn.patch(type)

作用： 获取元素内边距、外边距或边框宽度

参数： 

- type：获取哪一部分样式，可以为padding、margin、border，不传参数是三个都获取。

返回值： (JSON)根据type计算出的最终结果{x:number, y:number}，x是left+right，y是top+bottom

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
$.fn.patch = function (type) {
    var el = this;
    var args;
    if (type) {
        args = $.makeArray(type);	// 将参数转换为真数组
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

var result =  $('.test').patch()

console.log(result);	

// 打印 { x: 64, y: 44}
```


### dom 9点定位

函数： $.fn.locate(options)

作用： 根据9个方位由一个dom定位到另一个dom上的位置

参数： - options：配置项的JSON直接量，包括： - relative：要定位到的元素，默认为body - x：定位dom的x轴的位置，默认为中心 - y：定位dom的y轴的位置，默认为中心

返回值： (DOM)自身





