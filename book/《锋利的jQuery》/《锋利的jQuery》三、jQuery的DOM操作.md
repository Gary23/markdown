# 插入节点

## append() 

向每个匹配的元素内部追加内容 `$('p').append('<b>你好</b>');`结果为`<p>一个p元素<b>你好</b></p>`。

## appendTo() 

将所有的匹配元素追加到指定的元素中，和append是相反的。`$('<b>你好</b>').appendTo('p');`结果为`<p>一个p元素<b>你好</b></p>`。

## prepend() 

向每个匹配的元素内部前置内容 `$('p').prepend('<b>你好</b>')` 结果为 `<p><b>你好</b>一个p元素</p>`。

## prependTo() 

将所有匹配的元素前置到指定的元素中。和prepend是相反的。 `$('<b>你好</b>').prependTo('p')` 结果为 `<p><b>你好</b>一个p元素</p>`。

## after() 

在每个匹配的元素之后插入内容。`$('p').after('<b>你好</b>')` 结果为 `<p>一个p元素</p><b>你好</b>`

## insertAfter() 

将所有匹配的元素插入到指定元素的后面，和after是相反的。`$('<b>你好</b>').insertAfter('p')` 结果为 `<p>一个p元素</p><b>你好</b>`

## before() 

在每个匹配的元素之前插入内容。 `$('p').before('<b>你好</b>')` 结果为 `<b>你好</b><p>一个p元素</p>`

## insertBefore() 

将所有匹配的元素插入到指定的元素的前面，和before是相反的。`$('<b>你好</b>').insertBefore('p')` 结果为 `<b>你好</b><p>一个p元素</p>`

# 删除节点

## remove() 

删除匹配元素本身和所有后代节点。返回值是所有删除的节点的引用，因此可以在以后再使用这些删除的元素。

`$('ul li:eq(1)').remove()`  获取第2个`<li>`元素节点后，将它从网页中删除。

该方法还可以传递参数，通过参数选择性的删除元素。

`$('ul li').remove('li[title!="菠萝"]');` 将`<li>`元素中属性title不等于菠萝的`<li>`元素删除。

## detach()

和remove()一样也是从DOM中去掉匹配的元素，但是不会从jQuery对象中删除，因而可以在将来再使用这些匹配的元素。和remove()不同的是，所有绑定的事件、附加的数据等都会保留下来。

## empty()

empty()并不是删除节点，而是清空节点，清空匹配元素的所有后代节点。

`$('ul li:eq(1)').empty()` 获取第2个`<li>`元素节点后，清空此元素里的内容。

# 复制节点

## clone()

通过`clone()`克隆一个节点，默认不可隆节点的事件，需要传参数true就可以同时复制节点中绑定的事件。

# 替换节点

## replaceWith() 和 replaceAll()

替换节点是`replaceWith()`和`replaceAll()`。如果在替换之前，已经为元素绑定事件，替换后原先绑定的事件将会与被替换的元素一起消失，需要在新元素上重新绑定事件。

`$('p').replaceWith('<span>替换为span元素</span>')` 将页面中的p元素替换为span元素。

`$('<span>替换为span元素</span>').replaceAll('p')` 用span元素去替换页面中的p元素。

# 包裹节点

## wrap()

将匹配的每个元素用其他标记包裹起来，而且它不会破坏原始文档的语义。

`$('strong').wrap('<b></b>');` 用`<b>`标签把`<strong>`元素包裹起来。结果为`<b><strong></strong></b> <b><strong></strong></b> <b><strong></strong></b>`。

## wrapAll()

将所有匹配的元素用一个标签包裹起来。

`$('strong').wrapAll('<b></b>');` 用`<b>`标签把页面中所有`<strong>`元素包裹起来。结果为`<b><strong></strong> <strong></strong> <strong></strong></b>`。

## wrapInner()

将匹配的每个元素的子内容用其他标签包裹起来。

`$('strong').wrapAll('<b></b>');` 元素`<strong>`内的内容被一对`<b>`标签包裹了。结果为``<strong><b></b></strong> <strong><b></b></strong> <strong><b></b></strong>`。

# 属性操作

## attr()和prop()

用于获取和设置属性，只传一个参数是获取一个属性的值，传两个参数是设置属性，要设置多个属性可以传入一个对象。

`prop()`比较适合用于设置和获取html元素的固有属性，而`attr()`比较适合设置和获取自定义属性。

最主要的区别是表单元素的属性，比如`checked`和`selected`，这也是固有属性，这种通常我会希望如果没有设置或者用户操作没有选中则返回false，设置了或者选中了则返回true。

```js
// 用input这个标签举例子来看一下两者主要区别
<input type="checkbox" name="" id="ipt"/>
console.log($("input").attr("checked"))      // 打印undefined
console.log($("input").prop("checked"))      // 打印false
```
```js
<input type="checkbox" name="" id="ipt" checked/>
console.log($("input").attr("checked"))      // 打印checked
console.log($("input").prop("checked"))      // 打印true
```

## removeAttr()和removeProp()

只需要传一个参数，要删除的属性名。

`removeAttr()`会删除整个属性，而`remobeProp()`只会让该属性的值变为undefined，而且`removeProp()`对自定义属性无效。

# 样式操作

## addClass()

此方法用来追加样式，在匹配元素原有类名基础之上追加一个类名，`$('p').addClass('active')`

## removeClass()

删除类名，当不传参数时是删除匹配元素对象的所有类名，`$('p').removeClass();`就是删除所有p元素的所有类名。

也可以删除指定类名，`$('p').removeClass('high');`删除所有p元素的high类名。

## toggleClass()

替换类名，即如果传入的类名存在便删除，如果不存在就追加，`$('p').toggleClass('active')`

## hasClass()

判断匹配的元素对象中是否还有某个类名，返回的是布尔值，`$('p').hasClass('active')`

# 设置和获取内容

## html()

用于读取和设置匹配元素的html内容，和innerHTML方法的效果类似。不传参数即是获取。

## text()

用于读取和设置匹配元素的文本内容，和innerText方法类似，但是text()兼容所有浏览器，而innerText不兼容firefox。

## val()

用于读取和设置文本框、下拉列表、单选框、多选框元素的值，其中如果元素为多选，则会返回一个包含所有选择的值的数组。

如果不传参数则是获取值，传入参数是设置元素的值，由于val()专门针对表单元素，所以可以对下拉列表、单选框、多选框进行操作。

```js
$('#multiple').val('选项二');   //让下拉列表默认选择第二个选项，参数就是选项的文本内容
$(':checbox').val(['check2','check3'])      // 多选框，默认选择第二和第三项，多个参数用数组形式设置。
```

# 遍历节点

## children()

此方法用来获取匹配元素的所有子元素的个数，这个方法只考虑子元素而不考虑后代元素。

## next()

获取匹配元素后面紧邻的同辈元素。

## prev()

获取匹配元素前面紧邻的同辈元素。

## siblings()

获取匹配元素前后所有的同辈元素，不包含自己。

## closest()

获取最近的匹配元素，首先检查当前元素是否匹配，如果匹配则直接返回元素本身。如果不匹配则逐级向上查找直到找到匹配元素，如果什么都没找到返回一个空jQuery对象。

## parent()、parents()

parent()是获取匹配元素的父级元素，只返回一个节点。

parents()是获取匹配元素的祖先元素，返回多个节点。

## find()

搜索所有匹配元素下的指定的元素。

## filter()

获取匹配元素中符合参数表达式的元素，和`find()`不同的是`find()`是去后代中匹配，而`filter()`是在当前元素中去匹配。

还可以传入一个函数，函数内部return一个判断表达式，若为true，则返回表达式匹配的元素。

## nextAll()

获取匹配元素之后的所有同辈元素

## prevAll()

获取匹配元素之前的所有同辈元素

# CSS-DOM

## css()

传入一个css属性就可以获取匹配元素的css属性值，不论行内还是外部引用的都可以获取。

传入两个参数，第一个是属性，第二个是属性值则可以设置匹配元素的css样式，也可以直接传入一个对象。对于带-符号的属性要用驼峰的写法，并且属性最好加上引号。

## width()、height()

直接获取匹配元素的宽度和高度，不带单位，而且这里获取的宽高和css设置无关，是元素在页面中实际的宽高。

也可以传递一个值设置高度和宽度，值的格式是字符串。

## offset()

获取元素在当前视窗的相对偏移，返回值是一个对象，即top和left，只对可见元素有效。

## position()

获取元素相对于最近的一个position样式属性设置为relative或者absolute的祖父节点的相对偏移，也是返回一个对象并且又top和left。

## scrollTop()、scrollLeft()

获取元素的滚动条距顶端的距离和距左侧的距离。

可以给这两个方法指定一个参数，控制元素的滚动条滚动到指定位置。
