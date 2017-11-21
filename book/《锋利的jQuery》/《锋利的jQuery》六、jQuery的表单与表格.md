
# 表单的应用

## 表单的组成部分

1. 表单标签：包含处理表单数据所用的服务器端程序URL以及数据提交到服务器的方法。

2. 表单域：包含文本框、密码框、隐藏域、多行文本框、复选框、单选框、下拉选择框和文件上传框等。

3. 表单按钮：包括提交按钮、复位按钮和一般按钮，用于将数据传送到服务器上或者取消传送，还可以用来控制其它定义了处理脚本的处理工作。

## 文本框

单行文本框有失去和获取焦点事件。

```js
$('input').focus(function(){
    
}).blur(function(){
    
})
```

也可以不传参数直接`focus()`和`blur()`，可以直接让文本框失去和获得焦点。

## 复选框

jQuery可以控制复选框的就是是否被选择，checked属性如果为true就是被选中，为false就是没有选中。而最常用的就是全选、反选、全不选这三种按钮控制复选框的状态。

```js
// 全选
$('input:checkbox').prop('checked','true');

// 全不选
$('input:checkbox').prop('checked','false');

// 反选
$('input:checkbox').each(function(){
    $(this).prop('checked',!$(this).prop('checked'));
    // 这里也可以直接用原生来写
    // this.checked = !this.checked;
})
```

还有一种复选框是 全选/全不选，这是用一个复选框控制其他复选框选项的状态。

```js
// 全选和全不选
$('#allChecked').click(function(){
    $('input:checkbox').prop('checked',$(this).prop('checked'))
})

// 在其他选项被取消勾选后，全选的状态也应该改为false
$('input:checkbox').click(function(){
    var flag = true;
    if(!$(this).prop('checked')){
        flag = false;
    }
    $('#allChecked').prop('checked',flag);
})

```

## 下拉框

下拉框的应用通常是在左右两个`<select>`元素中相互移动`<option>`选项，常用的包括将选中项添加到右边/左边，全部添加到右边/左边。还有双击移动选中的选项。


选项从左边`<select>`移动到右边`<select>`

```js
// 获取选中的选项
var $options = $('#select1 option:selected');
// 追加给对方，appendTo方法会移动且删除原来的元素。
$options.appendTo($('#select2'));

```

全部添加到右边

```js
// 获取全部选项
var $options = $('#select1 option');
// 追加给对方
$options.appendTo($('#select2'));
```

双击某个选项添加给对方
```js
$('#select1').dblclick(function(){
    var $options = $(this).find('option:selected');
    $options.appendTo('#select2')
})
```

## 表单验证

表单注册最常用的地方就是登录注册，比如有些设置为required的必填项要检查其是否填写正确。

```js
$('form:input').blur(function(){
    var $parent = $(this).parent();
    // 需要先将上次的提示删除
    $parent.find('span').remove();
    
    // 验证用户名
    if($(this).is('#username')){
        if(this.value == '' || this.value.length < 6){
            var errMsg = '至少要输入6位的用户名';
            $parent.append('<span class="tips error">' + errMsg + '</span>');
        }else{
            var okMsg = '输入正确';
            $parent.append('<span class="tips success">' + okMsg + '</span>');
        }
    }
    
    // 其他密码、邮箱等验证都是类似的，只是判断规则不同
    ......
})

// 表单提交时对整个表单再做一次验证
$('#submit').click(function(){
    $('form:input').blur();
    var numErr = $('form:input .error').length;
    if(numErr){
        // 阻止表单提交
        return false;
    }
    alert('注册成功')
})

```

除了在表单`blur`时判断，也可以在其输入文字时进行实时判断。

```js
$('form:input').blur(function(){
    // 上面的事件处理程序，这里就不再重复写了
}).keyup(function(){
    // 输入文字时执行blur的事件处理程序，triggerHandler不会触发blur的浏览器默认事件，所以不会真的失去焦点导致无法输入
    $(this).triggerHandler('blur')  
})
```

# 表格的应用

## 表格变色

## 普通的隔行变色

css部分
```css
.even {
    background:#fff38f;
}
.odd {
    background:#ffffff;
}
```

js部分
```js
$('tbody > tr:odd').addClass('odd');  // 奇数行
$('tbody > tr:even').addClass('even');   // 偶数行
```

> `:odd`和`:even`选择器的索引是从0开始，所以第一行是偶数。

## 单选框控制表格行高亮

有种表格的选择是，点击当前行之后，当前行会变色，有可能在第一列是一个单选框，也需要被选中。

```js
$('tbody>tr').click(function(){
    // 给当前行增加selected样式
    $(this).addClass('selected').siblings().removeClass('selected').end().find(':radio').attr('checked',true);
})
// 初始化表格时让默认选中的行业要变色
$('table :radio:checked').parent().parent().addClass('selected')
```

> 这里使用了`end()`方法，当执行`siblings()`时，`this`已经被改变为当前元素的兄弟元素，而使用`end()`则会让`this`重新回归原本的元素。

## 复选框控制表格高亮

和上面的样式相似，只是单选改为复选框

```js
$('tbody>tr').click(function(){
    // 判断是否被选中，有selected类名就是被选中了
    var hasSelected = $(this).hasClass('selected');
    // 如果选中移除selected类，否则就加上
    $(this)[hasSelected?'removeClass':'addClass'].('selected');
    // 查找内部的checkbox，设置相对应的属性
    $(this).find(':checkbox').attr('checked',!hasSelected);
})
// 初始化表格时让默认选中的行业要变色
$('table :checkbox:checked').parent().parent().addClass('selected')

```

## 表格的内容筛选

相对是在表格内部进行姓名的搜索，输入'王'就显示出所有名字带有'王'字的行。

```js
$('#inputName').keyup(function(){
    $('table tbody tr').hide().filter(':contains("' + ( $(this).val() ) + '")').show();
}).keyup();  // 打开页面时自动执行一次
```

> `:contains()`是匹配包含指定文本的元素，在这里指的是输入的文字，`filter()`是在`this`中筛选出符合条件的元素集合

# 其他应用

## 网页字体大小

假设字体的放大和缩小都是span标签，文字内容元素的id为para。

```js
$('span').click(function(){
    var thisEle = $('#para').css('font-size');
    var textFontSize = parseInt(thisEle,10);
    // 获取现在的字号的单位
    var unit = thisEle.slice(2);
    var cName = $(this).attr('class');
    // 根据按钮的类名判断是放大还是缩小
    if(cName == 'bigger'){
        textFontSize += 2;
    }else if(cName == 'smaller'){
        textFontSize -= 2;
    }
    $('#para').css('font-size',textFontSize + unit);
})

```
