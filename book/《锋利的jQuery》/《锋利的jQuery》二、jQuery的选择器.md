
## 基本选择器


| 选择器 | 描述 | 返回 | 示例 |
|---|---|---|---|
| #id | 根据给定的id匹配一个元素 | 单个元素 | `$('#test')`选取id为test的元素 |
| .class | 根据给定的类名匹配元素 | 集合元素 | `$('.test')`选取所有class为test的元素 |
| element | 根据给定的元素名匹配元素 | 集合元素 | `$('p')`选取所有`<p>`元素 |
| * | 匹配所有元素 | 集合元素 | `$('*')`选取所有元素 |
| selector1,selector2...` | 将每个选择器匹配到的元素合并后一起返回 | 集合元素 | `$('div,span,p.myClass')`选取所有`<div>``<span>`和拥有class为myClass的`<p>`标签的一组元素 |

## 层次选择器

层次选择器用来获取后代元素、子元素、相邻元素和同级元素等。

| 选择器 | 描述 | 返回 | 示例 |
|---|---|---|---|
| $('ancestor descendant') | 选取ancestor元素里所有的descendant(后代)元素 | 集合元素 | `$('div span')`选取`<div>`里的所有的`<span>`元素 |
| $('parent>child') | 选取parent元素下的child(子)元素 | 集合元素 | `$('div>span')`选取`<div>`元素下元素名是`<span>`的子元素 |
| $('prev + next') | 选取紧接在prev元素后的next元素 | 单个元素 | `$('.one + div')`选取class为one的下一个`<div>`同级元素，可以用`$('.one').next('div')`代替 |
| $('prev~siblings') | 选取prev元素之后的所有siblings元素 | 集合元素 | `$('#two~div')`选取id为two的元素后面的所有`<div>`同级元素，可以用`$('#two').nextAll('div')`代替 |


## 过滤选择器

通过特定的过滤规则来选定元素。

### 基本过滤选择器

| 选择器 | 描述 | 返回 | 示例 |
|---|---|---|---|
| :first | 选取第一个元素 | 单个元素 | `$('div:first')`选取所有`<div>`元素中第1个`<div>`元素 |
| :last | 选取最后一个元素 | 单个元素 | `$('div:last')`选取所有`<div>`元素中的最后一个`<div>`元素 |
| :not(selector) | 去除所有与给定选择器匹配的元素 | 集合元素 | `$('input:not(.myClass)')`选取class不是myClass的`<input>`元素 |
| :even | 选取索引是偶数的所有元素 | 集合元素 | `$('input:even')`选取索引是偶数的`<input>`元素 |
| :odd | 选取索引是奇数的所有元素 | 集合元素 | `$('input:odd')`选取索引是奇数的`<input>`元素 |
| :eq(index) | 选取索引等于index的元素 | 单个元素 | `$('input:eq(1)')`选取索引等于1的`<input>`元素 |
| :gt(index) | 选取索引大于index的元素(不包括index本身) | 集合元素 | `$('input:gt(1)')`选取索引大于1的`<input>`元素 |
| :lt(index) | 选取索引小于index的元素(不包括index本身) | 集合元素 | `$('input:lt(1)')`选取索引小于1的`<input>`元素 |
| :header | 选取所有标题元素 | 集合元素 | `$(':header')`选取网页中所有标题元素 |
| :animated | 选取当前正在执行动画的所有元素 | 集合元素 | `$('div:animated')`选取正在执行动画的`<div>`元素 |
| :focus | 选区当前获取焦点的元素 | 集合元素 | `$(':focus')`选取当前获取焦点的元素 |

### 内容过滤选择器

| 选择器 | 描述 | 返回 | 示例 |
|---|---|---|---|
| :contains(text) | 选取含有文本内容为'text'的元素 | 集合元素 | `$('div:contains('我')')`选取含有文本'我'的`<div>`元素 |
| :empty | 选取不包含子元素或者文本的空元素 | 集合元素 | `$('div:empty')`选取不包含子元素(包含文本元素)的`<div>`空元素 |
| :has(selector) | 选取含有选择器所匹配的元素的元素 | 集合元素 | `$('div:has(p)')`选取还有`<p>`元素的`<div>`元素 |
| :parent | 选取含有子元素或者文本的元素 | 集合元素 | `$(div:parent)`选取拥有子元素(包含文本元素)的`<div>`元素 |

### 可见性过滤选择器

| 选择器 | 描述 | 返回 | 示例 |
|---|---|---|---|
| :hidden | 选取所有不可见的元素 | 集合元素 | `$(':hidden')`选取所有不可见的元素，包括`visibility:hidden`、`display:none`、`type='hidden'` |
| :visible | 选取所有可见的元素 | 集合元素 | `$('div:visible')`选取所有可见的`<div>`元素 |

### 属性过滤选择器

| 选择器 | 描述 | 返回 | 示例 |
|---|---|---|---|
| [attribute] | 选取拥有此属性的元素 | 集合元素 | `$('div[id]')`选取拥有属性id的`<div>`元素 |
| [attribute=value] | 选取属性的值为value的元素 | 集合元素 | `$('div[title=test]')`选择属性title为'test'的`<div>`元素 |
| [attribute!=value] | 选取属性的值不等于value的元素 | 集合元素 | `$('div[title!=test]')`选取属性title不等于'test'的`<div>`元素(没有title属性的元素也会被选取) |
| [attribute^=value] | 选取属性的值以value开始的元素 | 集合元素 | `$('div[title^=test]')`选取属性title以'test'开始的`<div>`元素 |
| [attribute$=value] | 选取属性的值以value结束的元素 | 集合元素 | `$('div[title$=test]')`选取属性title以'test'结束的`<div>`元素 |
| [attribute*=value] | 选取属性的值含有value的元素 | 集合元素 | `$('div[title*=test]')` 选取属性title含有'test'的`<div>`元素 |
| [attribute<span>¦</span>=value] | 选取属性等于给定字符串或以该字符串为前缀(该字符串后跟一个连字符'-'的元素) | 集合元素 | $(div[title<span>¦</span>='en'])选取title属性等于en或以en为前缀的`<div>`元素 |
| [attribute~=value] | 选取属性用空格分隔的值中包含一个给定值的元素 | 集合元素 | `$(div[title~='uk'])`选取属性title用空格分隔的值中包含字符uk的元素 |
| [attributeN] | 用属性选择器合并成一个复合属性选择器，满足多个条件。每选择一次，缩小一次范围 | 集合元素 | `$('div[id][title$='test']')`选取拥有属性id，并且属性title以'test'结束的`<div>`元素 |

### 子元素过滤选择器

| 选择器 | 描述 | 返回 | 示例 |
|---|---|---|---|
| :nth-child(index/even/odd/equation) | 选取每个父元素下的第index个子元素或者奇偶元素(index从1算起) | 集合元素 | `:eq(index)`只匹配一个元素，而`:nth-child`将为每一个父元素匹配子元素，并且`:nth-child(index)`的index是从1开始的，而`:eq(index)`是从0算起的 |
| :first-child | 选取每个父元素的第1个子元素 | 集合元素 | `:first`只返回单个元素，而`:first-child`选择符将为每个父元素匹配第1个子元素。例如`$('ul li:first-child');`选取每个`<ul>`中第1个`<li>`元素 |
| :last-child | 选取每个父元素的最后一个子元素 | 集合元素 | 区别和上面相同，`$('ul li:last-child');`选取每个`<ul>`中最后一个`<li>`元素 |
| :only-child | 如果某个元素是它父元素中唯一的子元素，那么将会被匹配。如果父元素中含有其他元素，则不会被匹配 | 集合元素 | `$(ul li:only-child)`在`<ul>`中选取是惟一子元素的`<li>`元素 |

### 表单属性过滤选择器

| 选择器 | 描述 | 返回 | 示例 |
|---|---|---|---|
| :enabled | 选取所有可用元素 | 集合元素 | `$('#form1 :enabled');`选取id为form1的表单内所有可用的元素 |
| :disabled | 选取所有不可用元素 | 集合元素 | `$('#form1 :disabled');`选取id为form2的表单内的所有不可用的元素 |
| :checked | 选取所有被选中的元素 | 集合元素 | `$('input:checked');`选取所有被选中的`<input>`元素 |
| :selected | 选取所有被选中的选项元素 | 集合元素 | `$(select option:selected);`选取所有被选中的选项元素 |

## 表单选择器

为了使用户能够更加灵活的操作表单，可以使用表单选择器，更加方便的获取到表单的某个类型的元素。

| 选择器 | 描述 | 返回 | 示例 |
|---|---|---|---|
| :input | 选取所有`<input>`、`<textarea>`、`<select>`、`<button>`元素| 集合元素 | `$(':input')`选取所有`<input>`、`<textarea>`、`<select>`、`<button>`元素 |
| :text | 选取所有的单行文本框 | 集合元素 | `$(':text')`选取所有的单行文本框 |
| :password | 选取所有的密码框 | 集合元素 | `$(':password')`选取所有的密码框 |
| :radio | 选取所有的单选框 | 集合元素 |`$(':radio')`选取所有的单选框  |
| :checkbox | 选取素有的多选框 | 集合元素 | `$(':checkbox')`选取素有的多选框 |
| :submit | 选取所有的提交按钮 | 集合元素 | `$(':submit')`选取所有的提交按钮 |
| :image | 选取所有的图像按钮 | 集合元素 | `$(':image')`选取所有的图像按钮 |
| :reset | 选取所有的重置按钮 | 集合元素 | `$(':reset')`选取所有的重置按钮 |
| :button | 选取所有的按钮 | 集合元素 | `$(':button')`选取所有的按钮 |
| :file | 选取所有的上传域 | 集合元素 | `$(':file')`选取所有的上传域 |
| :hidden | 选取所有不可见元素 | 集合元素 | `$(':hidden')`选取所有不可见元素 |

## 使用选择器的注意事项

### 含有'·'、'#'、'('或']'等特殊字符

碰到id或者class属性值带有这些特殊字符的需要转译之后才能使用，不能直接写

`$('#box#b')`这种不经过转译的写法是错误的，应该写为`$('#box\\#b')`，通过`\\`进行转译。
