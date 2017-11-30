---
title: 《锋利的jQuery》一、认识jQuery
tags: book,《锋利的jQuery》
notebook: 《锋利的jQuery》
---
# window.onload和$(document).ready()

`window.onload`：必须等网页中所有的内容加载完毕后(包括图片)才能执行，不能同时编写多个。

`$(document.ready())`：网页中所有DOM结构绘制完毕后就执行，可能DOM元素关联的东西并没有加载完，可以同时编写多个，可以简写为`$(function(){})`

# jQuery对象和DOM对象的转换

jQuery转为DOM对象有两种方法，即`[index]`和`get(index)`。

```js
var box = $('#box')[0];

var box1 = $('#box1').get(0);
```

DOM转为jQuery对象,只需要用$()把DOM对象包装起来,**$()就是一个jQuery对象的制造工厂**。

```js
var box = document.getElementById('box');

var $box = $(box);
```

# $快捷方式的更改

$是jQuery的快捷方式，为防止冲突，也可以自定义这个快捷方式。

## 交给其他js库

假如jQuery库在其他库之后引入，在其他库和jQuery库加载完成后就可以使用`jQuery.noConflict()`将变量$的控制权交给其他js库，如果先引入jQuery就不需要`jQuery.noConflict()`方法，直接写`$`即可。

```html
<body>
    <p id="pp">Test-prottype</p>
    <p>Test-jQuery</p>
    <!--引入prototype-->
    <script src="lib/prototype.js"></script>
    <!--引入jQuery-->
    <script src="../jquery1.9.1.min.js"></script>
    <script>
        jQuery.noConflict();   // 将变量$的控制权移交给prototype.js
        
        jQuery(function(){     // 使用jQuery
            jQuery('p').click(function(){    
                alert( jQuery(this).text() )
            })
        })

        $('pp').style.display = 'none';         // 使用prototype隐藏元素
    </script>
</body>
```

## 防止`$`冲突

第一种方法：想确保jQuery不会与其他库冲突，可以自定义一个快捷方式。

```html
<body>
    <p id="pp">Test-prottype</p>
    <p>Test-jQuery</p>
    <!--引入prototype-->
    <script src="lib/prototype.js"></script>
    <!--引入jQuery-->
    <script src="../jquery1.9.1.min.js"></script>
    <script>
        var $j = jQuery.noConflict();       // 自定义一个快捷方式
        
        $j(function(){          // 利用刚自定义的快捷方式使用jQuery
            $j('p').click(function(){
                alert($j(this).text());
            })
        })
        
        $('pp').style.display = 'none';         // 使用prototype隐藏元素
    </script>
</body>
```

第二种方法：如果不想自定义名称，同时又想避免冲突可以这样。

```html
<body>
    <p id="pp">Test-prottype</p>
    <p>Test-jQuery</p>
    <!--引入prototype-->
    <script src="lib/prototype.js"></script>
    <!--引入jQuery-->
    <script src="../jquery1.9.1.min.js"></script>
    <script>
        jQuery.noConflict();   // 将变量$的控制权移交给prototype.js
        
        jQuery(function($){     // 将$通过参数传入
            $('p').click(function(){
                alert($(this).text());
            })
        })
        
         $('pp').style.display = 'none';         // 使用prototype隐藏元素
    </script>
</body>
```


# 判断是否获取到了某元素

在原生javascript中通过这样来判断页面中是否有这个元素

```js
if(document.getElementById('tt')){
    document.getElementById('tt').style.color = 'red';
}
```

在jQuery中因为$()获取的是一个对象，所以不能直接判断这个对象是否存在

```js
if($('#tt')){
    // 这里将永远判断为true，因为jQuery对象一直存在
}
```

应该这样判断

```js
if($('#tt').length > 0){
    
}
```

或者

```js
if($('#tt')[0]){
    
}
```

