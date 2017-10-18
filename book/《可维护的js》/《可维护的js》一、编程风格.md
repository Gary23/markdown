---

title: 《可维护的js》一、编程风格
date: 2017-10-18 21:24:04
tags: 《可维护的js》

---

## 基本格式化

### 缩进

对于大多数编程风格来说，代码缩进有两种主张。

#### 制表符缩进

优点是一个制表符就是一个缩进层级，一对一的关系很符合逻辑，不同编辑器都可以设置制表符的展现长度(通常是4个字符)。

缺点是系统对制表符的解释不一致，不同系统用编辑器打开文件时制表符长度不同。

以vscode为例下图就是制表符的缩进，这是一个制表符的长度(一个缩进层级)。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/884f176f6a1c32cc14e3cb70cf32365084606166fb9220bf002a8660f2775f8be86fe2a77ecfdbee18e5986a4c0c1829?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20171018-1.PNG&size=1024)

#### 空格缩进

优点是在所有系统和编辑器中，文件的展现不会有差异。编辑器中可以配置一个tab代表几个空格(此时tab不代表制表符而是代表空格)。

缺点是......，至少在现在常用的编辑器下并没有发现有什么缺点。

以vscode为例下图就是空格的缩进，这是四个空格的缩进(一个缩进层级)。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/92953397417fe10e5ee45fd34fdb7bc83d8ef416df6fe8d7ba7f37dccd0524a604533c93cf0580511d349f29a9c8d6cc?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20171018-2.PNG&size=1024)

> 重点在这里，不论使用那种，都要保持代码的统一，不要两种混用，不要两种混用，不要两种混用！

### 语句结尾

javascript代码的语句要不独占一行，要不就以分号结尾，但是这里推荐以分号结尾，大部分检测工具也是这样建议的。

### 行的长度

如果代码的行太长，编辑器就会出现横向滚动条或者折行，都是比较别扭的显示方式。大部分规范都建议长度不要超过80个字符。

### 换行

当一行的长度达到了单行最大字符数限制时，就需要手动换行，最好的方式是在运算符后换行，并且下一行增加两个缩进层级。

```js
// 好的做法：运算符后换行，第二行两个缩进层级
callFun(document, element, window, 'some string value',
        true, 123);
    //do something

// 不好的做好：第二行只有一个缩进层级
callFun(document, element, window, 'some string value',
    true, 123);
    //do something

// 不好的做法：在运算符之前换行
callFun(document, element, window, 'some string value'
        ,true, 123);
    //do something

```

### 空行

通常代码不应该是一大段揉在一起的连续文本，两端不同语义的代码可以用空行分隔，一般建议在如下场景使用空行分隔：

1. 在方法之间

2. 在方法中的局部变量和第一条语句之间

3. 在多行或单行注释之前

4. 在方法的逻辑片段之间插入空行，提高可读性

### 变量和函数

 