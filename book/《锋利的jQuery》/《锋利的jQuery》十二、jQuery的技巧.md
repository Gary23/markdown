---
title: 《锋利的jQuery》十二、jQuery的技巧
tags: book,《锋利的jQuery》
notebook: 《锋利的jQuery》
---

# 禁用页面的右键菜单

```js
$(function(){
    $(document).on('contextmenu',function(){
        return false;
    })
})
```

# 返回头部动画

```js
$.fn.scrollTo = function(speed,elem){
    var targetOffset = $(this).offset().top;
    elme.stop().animate({
        scrollTop: targetOffset,
    },speed);
    return this;
}

$('.goto').click(function(){
    $('body').scrollTo(500,$('html body'));
    return false;
})
```

# 模拟输入框的placeholder

```js
$(function(){
    $('input.text1').val('输入搜索内容');
    textFill($('input.text1'));

    function textFill(input){
        var originalvalue = input.val();
        input.focus(function(){
            if($.trim(input.val()) == originalvalue){
                input.val('');
            }
        }).blur(function(){
            if($.trim(input.val()) == ''){
                input.val(originalvalue);
            }
        })
    }
})
```

# 获取鼠标位置

```js
$(function(){
    $(document).mousemove(function(e){
        $('#xy').html('x: ' + e.pageX + '| y: ' + e.pageY);
    })
})
```

# 判断元素是否存在

```js
$(function(){
    if($('#id').length){
        // do something
    }
})
```

# 点击div也可以跳转

```html
<div><a href="index.html">index</a></div>
```

```js
$('div').click(function(){
    window.location = $(this).find('a').prop('href');
    return false;
})
```

# 根据浏览器大小添加不同样式

```js
$(function(){
    function checkWindowSize(){
        if($(window).width() > 1200){
            $('body').addClass('large');
        }else{
            $('body').removeClass('large');
        }
    }

    $(window).resize(checkWindowSize)
})
```

# 设置div在屏幕中央

```js
$.fn.center = function(){
    this.css('position','absolute');
    this.css('top',($(window).height() - this.height()) / 2 + $(window).scrollTop() + 'px' );
    this.css('left',($(window).width() - this.width()) / 2 + $(window).scrollLeft() + 'px' );
}
```

# 关闭所有动画效果

```js
$(function(){
    $.fx.off = true;

})
```

# 检测鼠标左键和右键

```js
$('#xy').mousedown(function(e){
    alert(e.which)   // 1是鼠标左键 2是鼠标中键 3是鼠标右键
})
```

# 设置全局Ajax参数

```js
$('#load').ajaxStart(function(){
    showLoading();    // 显示 loading
    disableButtons();    // 禁用按钮
});

$('#load').ajaxComplete(function(){
    hideLoading();    // 隐藏loading
    enableButtons();   // 启用按钮
})
```

# 获取选中的下拉框

```js
$('#someElement').find('option:selected');
$('#someElement option:selected');
```

# $.proxy()的使用

```html
<div id="panel" style="display:none;">
    <button>Close</button>
</div>
```

```js
$('#panel').fadeIn(function(){
    $('#panel button').click(function(){
        $(this).fadeOut();
        console.log(this);
    })
})
```
以上代码中因为 `this` 指向了 `button` 所以会隐藏 `button` 元素，而不是 `#panle` 元素。

```js
$('#panel').fadeIn(function(){
    $('#panel button').click($.proxy(function(){
        $(this).fadeOut();
        console.log(this);
    },this));
})
```

这样利用 `$.proxy()` 方法可以将this改变为 `#panel` 。


# 限制输入框的字数

```js
$.fn.maxLength = function(max){
    this.each(function(){
        var type = this.tagName.toLowerCase();
        var inputType = this.type ? this.type.toLowerCase() : null;
        if(type == 'input' && inputType == 'text' || inputType == 'password'){
            // 标准的maxLength
            this.maxLength = max;
        }else if(type == 'textarea'){
            this.onkeyup = function(e){
                console.log(this.value.length);
                if(this.value.length > max){
                    console.log(11);
                    this.value = this.value.substring(0,max);
                }
            }
        }
    })
}
```

# 删除元素内部的html标签，只留下文本内容

```js
$.fn.stripHTML = function(){
    var regexp = /<("[^"]*"|'[^']*'|[^'">])*>/gi;
    this.each(function(){
        $(this).html($(this).html().replace(regexp,''));
    })
    return $(this);
}
```

