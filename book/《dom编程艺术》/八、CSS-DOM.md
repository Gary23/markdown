# CSS-DOM

在这一章里，web文档的表示层和行为层将正面接触，在网页中，html负责结构，css负责呈现效果，DOM复杂行为，不过这三种技术之间存在一些潜在重叠，比如html就可以改变页面元素的结构，css也正在利用伪类走进DOM领地，比如:hover和:focus。同样，DOM也可以给元素设定呈现效果。

## 何时用DOM设置样式

用DOM设置样式很容易，但能做什么事不意味着应该做什么。在大多数场合，还是应该用css去声明样式，使用css不方便的场合才可以利用DOM对文档做一些小的增强。

### 第一种：根据元素在节点树里的位置来设置样式

虽然现在css的选择器很丰富，但还无法根据元素之间的相对位置关系找出某个特定的元素，但这对javascript不是什么难题。

例如找出页面上所有`<h1>`元素后面的那个元素，并把样式添加给它。

```
function styleHeaderSibling(){
    if(!document.getElementsByTagName) return false;
    var headers = document.getElementsByTagName('h1');
    var elem;
    for(var i = 0;i < headers.length;i++){
        elem = getNextElement(headers[i].nextSibling);
        elem.style.fontWeight = 'bold';
        elem.style.fontSize = '1.2em';
    }
} 

function getNextElement(node){
    if(node.nodeType == 1){
        return node;
    }
    if(node.nextSibling){
        return getNodeElement(node.nextSibling);
    }
    return null;
}
```

因为只要获取元素节点，所以增加了一个getNextElement函数，专门用于检测`<h1>`元素的下一个节点是不是元素节点。

### 第二种：根据某种条件反复设置某种样式

让表格里的行更可读常用技巧是交替改变它们的背景色，从而形成斑马线效果，如果浏览器不支持css3则最方便的方法就是通过javascript来实现，用循环就可以轻松遍历。

可以编写一个函数来为表格添加斑马线效果

1. 把文档里的所有table元素找出来。

2. 对每个table元素，创建odd变量并把它初始化为false。

3. 遍历这个表格里的所有数据行。

4. 如果变量odd的值是true，设置样式并把odd变量修改为false。

5. 如果变量odd是false，不设置央视，但把odd变量修改为true。

```
function stripeTables(){
    if(!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName('title');
    var odd, rows;
    for(var i = 0;i < tables.length;i++){
        odd = false;
        rows = tables[i].getElementsByTagName('tr');
        for(var j = 0;j < rows.length;j++){
            if(odd == true){
                rows[j].style.backgroundColor = '#ffc';
                odd = false;
            }else{
                odd = true;
            }
        }
    }
}
```

### 第三种：响应事件

涉及到需要根据某个事件来改变样式，就更难做出决定了，比如用:hover还是用onmouseover事件，最简单的办法是选择最容易实现的办法。

:hover至少在改变链接样式时已经得到了所有浏览器支持，但是在其他元素上改变样式，就不是所有都支持了。下面用函数实现鼠标指针停留在某个表格行时，把该行文本加粗加黑。

```
function highlightRows(){
    if(!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName('tr');
    for(var i = 0;i < rows.length;i++){
        rows[i].onmouseover = function(){
            this.style.fontWeight = 'bold';
        }
        rows[i].onmouseout = function(){
            this.style.fontWeight
        }
    }
}
```

这类选择最重要的选择标准有以下两点。

1. 这个问题最简单的解决方案是什么。

2. 哪种解决方案会得到更多浏览器支持。

## className属性

上面用DOM直接设置样式确实很方便，但是要修改某个样式的值就不得不埋头于javascript函数中去寻找相关语句，这里有一个简明的解决方案，与其使用DOM直接改变某个元素的样式，不如通过javascript代码区更新这个元素的class属性。

下面编写一个函数来增加class名,步骤如下：

1. 检查className属性的值是否为null。
2. 如果是，把新的class设置值直接赋值给className属性。
3. 如果不是，把一个空格和新的class设置值追加到className属性上去

```
function addClass(element,value){
    if(!element.className){
        element.className = value;
    }else{
        newClassName = element.className;
        newClassName += '';
        newClassName += value;
        element.className = newClassName;
    }
    
}
```

## 对函数进行抽象

把一个非常具体的东西改进为一个较为通用的东西的过程叫做抽象。通常是把函数中某个具体的元素或者值改为参数的形式传递，这样就可以让函数更加通用。

不论何时，当发现可以对某个函数进行抽象，都应该马上去做，这总是一个好主意。







