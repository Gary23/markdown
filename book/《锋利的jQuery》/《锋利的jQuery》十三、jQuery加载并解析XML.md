---
title: 《锋利的jQuery》十三、jQuery加载并解析XML
tags: book,《锋利的jQuery》
notebook: 《锋利的jQuery》
---

# 语法

XML(eXtensible Markup Language)，于HTML一样，都属于SGML标准通用语言。

XML的语法如下：

1. 任何起始标签都必须有一个结束标签

2. 标签必须按照合理的顺序嵌套，和HTML相同的道理。

3. 所有属性都需要有值，并且需要在值上加上双引号。

4. XML文件只能有一个顶层元素，好比HTML的`<html>`元素。

很多时候XML不能正常解析是因为Content-Type没有设置好。要设置为text/xml，否则会按照默认的text/html方式处理，导致解析失败

# 解析XML

解析XML文档与解析DOM一样，也可以用`find()`、`children()`等函数来解析和用`each()`方法来进行遍历，另外也可以用`text()`和`attr()`方法来获取节点文本和属性（类似HTML的行内属性）。

```js
success: function(xml){
    var frag = $('<ul></ul>')
    $(xml).find('student').each(function(){     // 查找所有<student>节点并且遍历
        var id = $(this).children('id');    // 取得所有<id></id>子节点
        var id_value = id.text();       // 取得子节点文本
        var email = $(this).attr('email');         // 获取<student>元素上的email属性
        frag.append('<li>' + id_value + '-' + email + '</li>');        // 构造html字符串
    })
    frag.appendTo('#load');        // 最后添加到html文档中
}
```













