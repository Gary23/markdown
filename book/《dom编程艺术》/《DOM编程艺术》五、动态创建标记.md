
---

title: 《DOM编程艺术》五、动态创建标记
date: 2017-06-03 10:25:52
tags: 《DOM编程艺术》

---

这一章节主要通过一些DOM方法，通过创建新元素和修改现有元素来改变网页结构，用DOM的方法改变标记。

## 1、创建元素节点和文本节点

DOM是文档的表示，DOM所包含的信息与文档里的信息一一对应，你只要学会问正确的问题，就可以从获取DOM节点上任何一个节点的细节。

DOM是一条双向车道，不仅可以获取文档的内容，还可以更新文档的内容，如果改变了DOM节点树，文档在浏览器里的呈现就会发生变化，所以与其说是创建标记，不如说是在改变DOM节点树，在DOM的角度来看，一个文档就是一颗节点树，如果想在节点树上添加内容，就必须插入新的节点，如果想添加一些标记文档，就必须插入元素节点。

比如现有一个HTML元素`<div id = "testdiv"></div>`，我要在其中插入一段文本，需要4个步骤。

1. 创建一个新的元素。

2. 把这个新的元素插入节点树。

3. 创建一个文本节点。

4. 把文本节点插入新元素的节点树。

```js
window.onload = function(){
    var pare = document.createElement('p');
    var testdiv = document.getElementById('testdiv');
    testdiv.appendChild(pare);
    var txt = document.createTextNode('Hello World');
    pare.appendChild(txt);
}
```

这些代码会在页面上显示"Hello World"，并且包含在`<div id = "testdiv"></div>`中。

首先用document.createElement方法创建一个`<p>`元素，创建以后`<p>`元素还不是任何一颗DOM树的组成部分，它只是游荡在javascript世界里的一个孤儿，这种情况被称为文档碎片(document frogment)，不过，这时`<p>`元素已经有了自己的DOM属性，比如nodeType和nodeName。

现在要让`<p>`元素成为testdiv的一个子节点，appendChild方法可以完成这一任务，这个方法的语法是`parent.appendChild(child)`。

最后我要给`<p>`元素增加文本内容，也就是创建一个文本节点并让其成为`<p>`元素的子节点，使用document.createTextNode方法可以实现，用法和document.createElement相同，同样这个本文节点也是一个孤儿节点，需要使用appendChild添加到`<p>`元素中。

其实我也可以改变上面的执行顺序，先创建两个节点，再依次加入DOM树中也是一样的。

## 2、重回图片库案例

现在图片库的html文件中有一个图片和一段文字仅仅是为showPic脚本服务的，既然这些元素的存在只是为了让DOM方法处理它们，那么用DOM方法来创建它们才是最合适的选择。动态创建需要完成的步骤如下：

1. 创建一个img元素节点。

2. 设置这个节点的id属性、src属性、alt属性。

3. 创建一个p元素节点。

4. 创建这个节点的id属性。

5. 创建一个文本节点。

6. 把这个本文节点追加到p元素上。

7. 把p元素和img元素插入到gallery.html文档。

```js
function preparePlaceholder(){
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById('imagegallery')) return false;
    var placeholder  = document.createElement('img');
    placeholder.setAttribute('id','placeholder');
    placeholder.setAttribute('src','images/placeholder.gif');
    placeholder.setAttribute('alt','my image gallery');
    var description = document.createElement('p');
    description.setAttribute('id','description');
    var desctext = document.createTextNode('Chose an image');
    description.appendChild(desctext);
    var gallery = document.getElementById('imagegallery');
    insertAfter(placeholder,gallery);
    insertAfter(description,placeholder);
}
```
现在我可以将html中图片展示的元素和文字描述的元素删除了。

为了确保退路，函数的第一部分仍是检测浏览器是否支持这些方法，这里主要说一下insterAfter方法，它的功能是把一个节点插入到另一个节点之后，DOM本身并没有提供这个方法，所以我们可以自己编写一个函数。

```js
function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
```

这个函数的步骤如下：

1. 这个函数有连个参数，第一个是要插入的新元素，第二个是目标元素。

2. 获取目标元素的父元素，存到parent变量。

3. 检测目标元素是不是其父元素的最后一个元素。

4. 如果是就用appendChild把新元素追加到parent元素上。

5. 如果不是就把新元素插入到目标元素和其下一个兄弟元素之间，使用nextSibling属性获取这个元素的下一个兄弟元素，使用insertBefore方法把下一个元素插入到另一个元素之前，语法是`parentElement.insertBefore(newElement,targetElement)`。


## 3、Ajax

Ajax主要用于异步加载页面内容的技术，用Ajax可以做到只更新页面的一小部分，不必刷新整个页面。

Ajax的优势就是对页面的请求以异步的方式发送到服务器，而服务器不会用整个页面来相应请求，它会在后台处理请求，与此同时用户还能继续浏览页面并与页面交互，而脚本则可以按需加载内容。

### XMLHttpRequest对象

Ajax技术的核心就是XMLHttpRequest对象，这个对象充当着浏览器中的脚本与服务器之间的中间人的角色，以往的请求都是浏览器发出，而javascript通过这个对象也可与自己发送请求，同时也自己处理响应。

不同浏览器对实现XMLHttpRequest对象方式不太一样，为了解决兼容性问题，我们可以自己封装一个函数。

```js
function getHttpObject(){
    if(typeof XMLHttpRequest == 'undefind'){
        XMLHttpRequest = function(){
            try{
                return new ActiveXObject('Msxml2.XMLHTTP6.0');
            }catch(e){}
            try{
                return new ActiveXObject('Msxml2.XMLHTTP3.0');
            }catch(e){}
            try{
                return new ActiveXObject('Msxml2.XMLHTTP');
            }catch(e){}
            return false;
        }
    }
    return new XMLHttpRequest();
}

```

这个函数通过对象检测技术检测了XMLHttpRequest，如果失败则继续检测其他方法，最终返回一个false或新的XMLHttpRequest对象。

其中ActiveXObject是IE的实现方法，实现了一个名叫XMLHTTP的对象，IE版本中使用的XMLHTTP对象也不完全相同。

### XMLHttpRequest发送请求的方法

XMLHttpRequest对象有许多的方法，下面通过一个新的函数来具体看XMLHttpRequest的执行过程和方法，这里假设example.txt是接口的地址

```js
function getNewContent(){
    var request = getHttpObject();
    if(request){
        request.open('GET','example.txt',true);
        request.onreadystatechange = function(){
            if(request.readyState == 4){
                var txt = request.responseText;
            }
        }
        request.send(null);
    }else{
        alert('你的浏览器不支持XMLHttpRequest')
    }
}
```

首先最有用的就是open方法，用open方法来指定服务器上要访问的文件、指定请求类型、指定请求是否以异步的方法发送和处理。

onreadystatechange方法会在服务器给出回应的时候被触发执行，在这个函数中，可以根据服务器的具体响应做相应的处理。

send方法用于发送数据，通常写在指定请求的目标并明确如何处理响应之后。

### 服务器回响XMLHttpRequest的方法

服务器在向XMLHttpRequest对象发送回响时，该对象有许多属性可用。

readyState属性，浏览器会在不同阶段更新readyState属性的值。

- 0 表示未初始化。

- 1 表示正在加载。

- 2 表示加载完毕。

- 3 表示正在交互。

- 4 表示完成。

所以只要readyState属性的值变为4，就可以访问服务器发送回来的数据了。

responseText和responseXML属性用于保存服务器发送回来的数据，responseText用于保存文本字符形式的数据，responseXML用于保存Content-Type头部中制定为'text/xml'的数据。

另外，只要是依赖于服务器响应的脚本，都要写在onreadystatechange属性的函数中，因为在发送XMLHttpRequest请求之后，脚本仍然会继续执行，不会等待响应返回，如果把依赖服务器返回内容的代码写在onreadystatechange之后，可能会导致这些代码执行了但数据还没有获取到。send方法就是最好的证明，它会优先于onreadystatechange执行。


> Ajax应用的一个特色就是减少重复加载页面的次数，但这种缺少状态记录的技术会与浏览器的一些使用惯例产生冲突，导致用户无法使用后退按钮或者无法为特定状态下的页面添加书签，理想情况，用户每一次操作都应该得到一个清晰明确的结果，为此，web设计人员必须在向服务器发出请求和服务器返回相应时，给用户明确提示。
