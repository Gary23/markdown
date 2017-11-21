
正则的意思就是让计算机能读懂我们想要的格式和规则。

初始化一个正则表达式

```js
var re = new RegExp('a');
```

简单的写法，推荐这种写法，但是如果写在函数里正则需要传参的话就必须用new的写法

```js
var re = /a/;
```

正则表达式是区分大小写的，如果不想区分在最后加i。

```js
var re = new RegExp('b','i');
```

或者

```js
var re = /b/i;
```

正则默认匹配成功就会结束，不会继续匹配，如果要全部查找需要全局匹配，在最后加g

```js
var re = new RegExp('b','g');
```

或者

```js
var re = /b/g;
```


# 正则的方法

## test

正则去匹配字符串，如果匹配成功就返回true，如果匹配失败就返回false。

写法：正则.test(字符串)。

```js
var str = 'abcdef';

var re = /b/;

alert(re.test(str);    //打印true
```

## search

正则去匹配字符串，如果匹配成功，就返回匹配成功的索引，如果匹配失败就返回-1。

search的写法：字符串.search(正则)

```js
var str = 'abcefg';

var re = /bcd/;   

var re1 = /B/;     

alert(str.search(re))     // 打印1，返回匹配到的首字符的索引

alert(str.search(re1))    // 打印-1
```

## match

正则去匹配字符串，如果匹配成功，就返回匹配成功的数组，如果匹配不成功，就返回null。

match的写法：字符串.match(正则)

```js
var str = '123abc456efg789';

var re = /\d\d/g;   

var re1 = /\d+/g;    

alert(str.match(re))      // 打印数组['12','45','78']

alert(str.match(re1))     // 打印数组['123','456','789']

var str1 = 'abc';

var re2 = /(a)(b)(c)/;

alert(str.match(re1))   // 打印['abc','a','b','c'],第一项是匹配的整体结果，后面依次是子项，不能加g

```

## replace

正则去匹配字符串，匹配成功的字符去替换新的字符串。

replace的写法：字符串.replace(正则,新的字符串)

```js
var str = 'aaa';

var re = /a/;

str = str.replace(re,'b');

alert(str)      // 打印baa

str = str.replace(re,function(str){
    alert(str)  // 函数的第一个参数就是匹配成功的字符a

    var result = 'b'
    
    return result;      // return要替换的字符
    
})
```

# 转义字符

比较常用的几个转译符

`\.` 真正的点，原本`.`是表示任意字符

`\n` 换行

`\s` 空格

`\S` 非空格

`\d` 数字

`\D` 非数字

`\w` 字符 ( 字符、数字、下划线 )

`\W` 非字符

`\b` 独立的部分(起始、结束、空格)，也就是要匹配是否在开头、是否在结尾、是否匹配到了空格。

`\B` 非独立的部分。

## 重复的子项

`\1`代表重复的第一个子项、`\2`代表重复的第二个子项，可以用于匹配字符中一堆重复的内容。

```js
var str = 'abca';

var re = /(a)(b)(c)\1/;

alert(re.test(str))    // 打印true，\1代表重复第一个子项，也就是a
```

# 量词

不确定的字符的个数用量词来表示。

`{}` 字符出现的范围，`{4,7}`就是至少出现4次、最多出现7次，`{4,}`是最少出现4次，`{4}`正好出现4次，

`+` 是至少出现一次，也可以写成`{1,}`

`?` 是0次或者1次，也可以写成`{0,1}`

`*` 至少出现0次，也可以写成`{0,}`

`|` 或的意思，和`||`相同

`()` 分组操作和匹配子项，分组操作和数学中的作用相同。

## 分组

```js
var str = '2017-6-3';

var re = /\d-+/g;

var re1 = /(\d-)+/g;

str.replace(re,function(str){
    alert(str)     // 打印'7-'和'6-'
})

str.replace(re1,function(str){
    alert(str)     // 打印'7-6-'
})

```

## 匹配子项

小括号里匹配的内容就是一个子项，有两个小括号就是有两个子项。

```js
var str = '2016-6-4';

var re - /(\d+)(-)/g;

str.replace(re,function(str1,str2,str3){
    alert(str1);    // 第一个参数是整个匹配的内容，'2016-','6-'
    
    alert(str2);    // 在str1的匹配结果中，第一个子项(括号)匹配到的内容 '2016','6'
    
    alert(str3);    // 在str1的匹配结果中，第二个子项(括号)匹配到的内容 '-','-'
})
```

# 字符类

就是一组相似的元素或字符，用`[]`来表示，`[]`中都是或的关系并且只代表一个字符。如果要代表多位可以在`[]`使用量词。

```js
var str = 'abc';

var re = /a[ade]c/;

alert(re.test(str))    // 打印true，中括号里匹配a或d或e都可以，但只能是一个字符

var str1 = 'abdc';

alert(re.test(str1))   // 打印false，只能匹配一个字符，也就是只占一个字符的位置，str1的第三位不是c所以是false
```

## 排除

用`^`表示，写在`[]`里边是排除的意思。

```js
var str = 'abc';

var re = /a[^ade]c/;

alert(re.test(str))    // 打印false，这里其实和非操作比较像，是指匹配的元素不能是a||d||e。
```

## 范围

是要匹配的字符的范围。比如a-z、0-9、A-Z。

```js
var str = 'abc';

var re = /a[a-z]c/;

alert(re.test(str))  // 打印true，只要第二个字符是a-z的范围内都可以匹配到 
```

# 边界

`^` 正则最开始的位置。

`$` 正则最后结束的位置。

# 常用的表单验证

匹配中文：`[\u4e00-\u9fa5]`

行首位空格：`^\s*|\s*$`

Email：`^\w+@[a-z0-9]+(\.[a-z]+){1,3}$`

网址：`[a-zA-Z]+://[^\s]*`

QQ号：`[1-9][0-9]{4,9}`

邮政编码：`[1-9]\d{5}`

身份证：`[1-9]\d{14}|[1-9]\d{17}|[1-9]\d{16}x`