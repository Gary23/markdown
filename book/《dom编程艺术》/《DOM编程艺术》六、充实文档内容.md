---
title: 《DOM编程艺术》六、充实文档内容
tags: book,《DOM编程艺术》
notebook: 《DOM编程艺术》
---

这一章将继续在实践中应用动态创建标记

# 1、不应该做什么

从技术上讲，可以把任何内容动态添加到网页上，但重要的内容不要这么做，因为这样一来，javascript就没有任何空间去平稳退化，如果缺乏javascript的支持，用户会永远看不到重要的内容，而且各大搜索引擎也不支持javascript。

渐进增强和平稳退化两项原则要牢记在心，在这里再次总结一下这两项重要的原则。

## 渐进增强

应该从最核心的部分，也就是从内容开始，应该根据内容使用标记实现良好的结构，然后再逐步加强这些内容，这些增强工作既可以是通过css改进呈现效果，也可以是通过DOM添加各种行为，如果你正在使用DOM添加核心内容，那么添加的时机未免太迟，核心内容应在刚开始写文档时就成为文档的组成部分。

## 平稳退化

渐进增强的实现必然支持平稳退化，如果你按照渐进增强的原则去充实内容，你为文档添加的样式和行为自然就支持平稳退化。那些缺乏必要的css和DOM支持的访问者仍可以访问到你的核心内容，如果用javascript去添加这些内容，它就没法支持平稳退化，不支持javascript就看不到内容。

# 2、内容

和往常一样，任何网页都以内容为出发点，现在拿下面这段内容作为出发点。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>解释文档DOM</title>
    <style>
        body {
            font-family:'Helvetica','Arial',sans-serif;
            font-size: 10pt;
        }
        abbr {
            text-decoration: none;
            border: 0;
            font-style: normal;
        }
    </style>
</head>
<body>
    <h1>什么是DOM</h1>
    <p><abbr title="万维网联盟">W3C</abbr>将<abbr title="文档对象模型">DOM</abbr>定义为:</p>
    <blockquote cite="http://www.w3.org/DOM/">
        <p>一个平台和语言中立的接口，将允许程序和脚本动态访问和更新的内容，结构和风格的文档。</p>
    </blockquote>
    <p>这是一个<abbr title="应用程序设计接口">API</abbr>可以用来浏览<abbr title="超文本标记语言">HTML</abbr>和<abbr title="可扩展标记语言">XML</abbr>文档。</p>
</body>
</html>
```


![image](http://upload-images.jianshu.io/upload_images/5140754-996c476903d03451?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


`<abbr>`标签用于缩略语的显示，默认情况会显示为带有下划线或下划点，但是通过css的设置已经代替了浏览器的默认样式。

`<abbr>`的title属性在浏览器里是隐藏的，有些浏览器会在你把鼠标指针悬停在缩略语上时，将它的title属性显示为一个弹出式的提示消息，这也是浏览器所使用的默认行为，而不同浏览器的默认样式也不尽相同。所以就像刚才用css样式去代替浏览器默认样式那样，我们也可以用DOM去改变浏览器的默认行为。

# 3、显示缩略语

下面我要做的是将`<abbr>`标签中的title属性集中起来显示在一个页面，我希望得到的定义列表是这个样子：

```html
<dl>
    <dt>W3C</dt>
    <dd>万维网联盟</dd>
    <dt>DOM</dt>
    <dd>文档对象模型</dd>
    <dt>API</dt>
    <dd>应用程序设计接口</dd>
    <dt>HTML</dt>
    <dd>超文本标记语言</dd>
    <dt>XML</dt>
    <dd>可扩展标记语言</dd>
</dl>
```

用DOM来具体实现这个定义列表的步骤如下：

1. 遍历这份文档中的所有`<abbr>`元素。

2. 保存每个`<abbr>`元素的title属性。

3. 保存每个`<abbr>`元素包含的文本。

4. 创建一个`<dl>`自定义列表元素。

5. 遍历刚才保存的title属性和`<abbr>`元素的文本。

6. 创建一个`<dt>`标题元素。

7. 把`<abbr>`元素的文本插入到这个`<dt>`元素。

8. 创建一个`<dd>`列表项元素。

9. 把title属性插入到这个`<dd>`元素。

10. 把`<dt>`元素追加到第4步创建的`<dl>`元素上。

11. 把`<dd>`元素追加到第4步创建的`<dl>`元素上。

12. 把`<dl>`元素追加到explanation.html文档的body元素上。

按照上面的思路我将编写一个displayAbbreviations函数，并存入Enrich_document_content.js中。

```js
function displayAbbreviations(){
    if(!document.getElementsByTagName || !document.createElement || !document.createTextNode){
        return false;
    }
    // 取得所有缩略词
    var abbreviations = document.getElementsByTagName('abbr');
    if(abbreviations.length < 1) return false;
    var defs = new Array();
    // 便利这些缩略词
    for(var i = 0;i < abbreviations.length; i++){
        var current_abbr = abbreviations[i];
        var definition = current_abbr.getAttribute('title');
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    // 创建定义列表
    var dlist = document.createElement('dl');
    // 遍历定义
    for(key in defs){
        var definition = defs[key];
        // 创建定义标题
        var dtitle = document.createElement('dl');
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        // 创建定义描述
        var ddesc = document.createElement('dd');
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        // 把它们添加到定义列表
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    // 创建标题
    var header = document.createElement('h2');
    var header_text = document.createTextNode('缩略词');
    header.appendChild(header_text);
    // 把标题添加到页面主体
    document.body.appendChild(header);
    // 把定义列表添加到页面主体
    document.body.appendChild(dlist);
}
```

![image](http://upload-images.jianshu.io/upload_images/5140754-4ca4b7ab91f50082?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

现在已经可以在页面显示出这个定义列表，不要忘记使用addLoadEvent函数加载。下面解析一下这个函数。

第一步仍然是检查我用到的DOM方法是否被支持。

第二步是遍历获取到的所有`<abbr>`元素，为了防止html中没有`<abbr>`元素，所以在遍历之前也做了检查，避免javascript报错。

第三步用数组保存`<abbr>`元素的文本和title属性，当一个元素中只有一个子节点，用lastChild获取其子节点是一个好的方法，这里将文本作为数组的下标使用，将字符串作为数组的下标也是一种常用的方式，不要被数组的下标通常为数字就被禁锢住想法。

第四步用for...in循环，去遍历之前的数组，for...in是遍历用字符串作为下标的数组的首选，将下标(key)和下标对应的值(value)添加到`<dt>`和`<dl>`元素中。

第五步是将这个定义列表和标题插入到body中，这一步没什么特别的。


# 4、displayAbbreviations函数的兼容性问题

按理说这个函数即检查了方法、又全部使用的DOM方法，应该不存在兼容性问题，但问题还是有，就是有的浏览器不支持`<abbr>`元素，如果是这样那么不仅没有缩略语列表，还会导致javascript报错。

出现这个隐患，如果现在去替换`<abbr>`元素太过麻烦，不论何时，要替换html中的元素都不应该作为首选。所以保证displayAbbreviations函数在IE中能够平稳退化没这个方案实现起来最简单，也就是如果浏览器不支持`<abbr>`元素就可以提前退出。

接下来要解决这个兼容性问题，做到平稳退化，我要在第一个for循环中加入一个判断。`if(current_abbr.childNodes.length < 1) continue;`这条语句会让当前元素没有子节点的话就进入下一次循环，不支持`<abbr>`元素的浏览器在统计`<abbr>`元素的子节点个数总会返回错误值。

此时因为defs数组是空的，所以它将不会创建出任何`<dt>`和`<dd>`元素，在for...in循环之后，写一个函数出口，`if(dlist.childNodes.length < 1) return false;`如果dlist没有子节点，那么直接跳出函数，这样就避免了报错的可能性。以下是改进后的代码

```js
function displayAbbreviations(){
    if(!document.getElementsByTagName || !document.createElement || !document.createTextNode){
        return false;
    }
    // 取得所有缩略词
    var abbreviations = document.getElementsByTagName('abbr');
    if(abbreviations.length < 1) return false;
    var defs = new Array();
    // 便利这些缩略词
    for(var i = 0;i < abbreviations.length; i++){
        var current_abbr = abbreviations[i];
        if(current_abbr.childNodes.length < 1) continue;
        var definition = current_abbr.getAttribute('title');
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    // 创建定义列表
    var dlist = document.createElement('dl');
    // 遍历定义
    for(key in defs){
        var definition = defs[key];
        // 创建定义标题
        var dtitle = document.createElement('dl');
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        // 创建定义描述
        var ddesc = document.createElement('dd');
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        // 把它们添加到定义列表
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if(dlist.childNodes.length < 1) return false;
    // 创建标题
    var header = document.createElement('h2');
    var header_text = document.createTextNode('缩略词');
    header.appendChild(header_text);
    // 把标题添加到页面主体
    document.body.appendChild(header);
    // 把定义列表添加到页面主体
    document.body.appendChild(dlist);
}
```

如果浏览器不支持`<abbr>`标签，也不会出任何错误，但是也会看不到缩略语列表，不过缩略语列表也算不上页面必不可少的组成部分，如果真的是必不可少的内容，从一开始就应该把它包括在标记里。

# 5、显示文献来源链接表

在这个案例中，还有另一个增强文档的例子，先来看看html中这段标记。

```html
<blockquote cite="http://www.w3.org/DOM/">
    <p>一个平台和语言中立的接口，将允许程序和脚本动态访问和更新的内容，结构和风格的文档。</p>
</blockquote>
```

`<blockquote>`元素包含一个cite属性，它可以是一个URL地址，告诉人们`<blockquote>`元素的内容引自哪里，从理论上讲这是一个文献资料与县官网页链接起来的好办法。但实际上浏览器会完全忽略cite属性，所以我要把这些信息收集起来，以一种更有意义的方式把它们显示在网页上。

按照以下步骤完成displayCitetions函数，并存入Enrich_document_content.js文件中。

1. 遍历这个文档里所有`<blockquote>`元素。

2. 从`<blockquote>`元素提取出cite属性的值。

3. 创建一个标识文本是source的链接。

4. 把这个链接赋值为`<blockquote>`元素的cite属性值。

5. 把这个链接插入到文献节选的末尾。

```js
function displayCitetions(){
    if(!document.getElementsByTagName || !document.createElement || !document.createTextNode){
        return false;
    }
    // 取得所有引用
    var quotes = document.getElementsByTagName('blockquote');
    // 遍历引用
    for(var i = 0;i < quotes.length;i++){
        // 如果没有cite属性，继续循环
        if(!quotes[i].getAttribute('cite')) continue;
        // 保存cite属性
        var url = quotes[i].getAttribute('cite');
        // 取得引用中的所有元素节点
        var quoteChildren = quotes[i].getElementsByTagName('*');
        // 如果没有元素节点进入下一次循环
        if(quoteChildren.length < 1) continue;
        // 取得引用中的最后一个元素节点
        var elem = quoteChildren[quoteChildren.length - 1];
        // 创建标记
        var link = document.createElement('a');
        var link_text = document.createTextNode('source');
        link.appendChild(link_text);
        link.setAttribute('href',url);
        var superscript = document.createElement('sup');
        superscript.appendChild(link);
        // 把标记添加到引用中的最后一个元素节点
        elem.appendChild(superscript)
    }
}
```

![image](http://upload-images.jianshu.io/upload_images/5140754-04b88cc3122d9a80?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


函数执行完毕后这个`<blockquote>`元素的引用将会添加到段落最后的source上标中。下面来解析一下这个函数。

第一部分是筛选出cite属性，再去获取`<blockquote>`元素的最后一个子节点，这里`<blockquote>`的lastChild有可能是个换行符，所以在函数中是获取的`<blockquote>`下的所有元素对象，这样就可以方便的获取`<blockquote>`的最后一个子元素。

第二部分是创建链接和插入链接，最终让`<sup>`元素包含`<a>`元素，而`<a>`元素href属性保存了cite的属性值，也就是一个url地址。最后将`<sup>`元素插入到`<blockquote>`元素的最后。

