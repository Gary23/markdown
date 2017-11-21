在这一章主要是用上一章的思想改进图片库，所以我会把之前的javascript图片库案例拿来看看是不是符合上一章所说的规则。

# 1、支持平稳退化吗？

可以确定，图片库如果禁用了javascript功能，也已经留了退路，网页里的所有链接都是可用的，虽然用户体验游影响，但网页的功能并未受到损害，而如果当时在href中写的不是链接而是伪协议或是'#'，那么禁用javascript后它会无法使用。

# 2、javascript与html分离吗？

在图片库中它们确实是混在了一起，onclick直接插入到了html中，理想情况下，应该在外部文件里添加onclick事件处理函数。

我需要编写一个简短的函数把有关操作关联到onclick事件上，我想让函数完成以下工作：

1. 检查浏览器是否理解getElementsTagByName。

2. 检查浏览器是否理解getElementById。

3. 检查网页是否存在一个id为imagegallery的元素。

4. 遍历imagegalery元素中的所有链接。

5. 设置onclick事件，让它在有关链接被点击时完成以下操作。
    - 把这个链接作为参数传递给showPic函数。
    - 取消链接被点击时的默认行为。

```js
function prepareGallery(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById('imagegallery')) return false;
    var gallery = document.getElementById('imagegallery');
    var links = gallery.getElementsByTagName('a');
    for(var i = 0; i < links.length; i++){
        links[i].onclick = function(){
            showPic(this);
            return false;
        }
    }
}
```

为了方便获取元素，我将`<ul>`的id设为'imagegallery'。

函数的第一部分是检查点，如果不支持或没有检查的内容就离开，其实也可以写为`if(!document.getElementsByTagName || !document.getElementById) return false;`将两个检查写到一起，但是这样写代码太过冗长不利于阅读，所以将代码写在一行并不一定是个好主意。

代码中我用变量名存储获取到的元素，避免了代码写得太长，在给变量起名时，应该选择一些有意义的单词来命名，可以让代码更容易阅读和理解，并且一定要避免使用保留字和函数或方法名。

函数的最后是一个遍历，links存储了列表中的所有a元素，并且是一个伪数组，所以可以遍历得到每个a元素并且将onclick事件绑定给该元素，这样绑定之后，该事件处理函数的this就是绑定该事件的元素，至此可以从html中彻底删除onclick事件了。

# 3、共享onload事件

现在我还需要一个功能，就是要在DOM树加载完之后再执行上面的prepareGallery函数，如果只有一个函数用`window.onload = prepareGallery`即可，但如果有多个函数，就不能直接这样写，后面的会覆盖前面的，所以我还要再写一个函数完成这个绑定功能。

1. 把现有的window.onload事件处理函数的值存入变量oldonload。

2. 如果在这个处理函数上还没有绑定函数，就像平时那样把新函数添加给它。

3. 如果在这个处理函数上已经绑定了函数，就把新函数追加到现有指令的末尾。

```js
function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}
```

这个函数将把那些在页面加载完毕时执行的函数创建一个队列，参数func就是要执行的函数。

# 4、不要做太多的假设

下面我要改造一下showPic函数，因为我发现showPic函数并没有任何检查和测试，所以需要一些语句来检查这些元素是否存在。

showPic函数负责完成两件事：

1. 找出id属性是placeholder的图片并修改其src属性。这个是核心功能，必须完成的任务。

2. 找出id属性是description的元素并修改其第一个子元素的nodeValue属性。这个功能只是锦上添花，所以只要placeholder图片存在，即使description元素不在，切换显示新图片的操作也将照常进行。

```js
function showPic(whichpic) {
    if(!document.getElementById('placeholder')) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
    if(document.getElementById('description')){
        var text = whichpic.getAttribute('title');
        var description = document.getElementById('description');
        description.firstChild.nodeValue = text;
    }
    return true;
}
```
现在这个函数完成了检测，只要图片可以正常获取就返回true，但是还有一个问题，就是如果把placeholder图片从标记文档里删掉，无论点击imagegallery清单里的哪一个链接，都没有任何反应，这不符合平稳退化，此时应该让浏览器打开那个被点击的链接，而不是什么都不发生。

导致这个问题的原因是prepareGallery函数中是假设showPic肯定会切换图片成功，基于这一点才取消了a元素onclick事件的默认行为`links[i].onclick = function(){showPic(this);return false;}`，但是现在在showPic中，如果图片切换成功才返回true，如果图片切换失败会返回false。所以如果showPic返回了false就不应该取消点击事件，而是该让a元素的链接正常打开，让切换图片的操作照常进行。所以是否取消默认行为应该由showPic函数决定。

为了达到这个目的，应该先验证showPic的返回值，以便决定是否阻止默认行为，如果showPic返回true，那么更新placeholder，取消默认事件。如果showPic返回false，那么就不取消默认事件。在onclick事件处理函数中，我们可以利用逻辑非来对showPic的返回值进行取反。

```js
links[i].onclick = function(){
    return !showPic(this);
}
```

现在这个函数已经相当完善，虽然它们的长度有所增加，但它们对标记的依赖和假设已经比原来少多了，尽管如此，在showPic函数里仍存在一些需要处理的假设。

1. 如果a元素的title属性存在，变量text将被赋值a元素的title属性，如果不存在，变量text将被赋值为一个空字符串。

2. 假设placeholder元素是否是一张图片，可以用nodeName属性来测试，要注意的是，nodeName属性总是返回的值总是大写字母。

3. 假设description元素的第一个子元素是一个文本节点，可以用nodeType属性来检测，如果nodeType的值是3，就是一个文本节点。

```js
function showPic(whichpic) {
    if (!document.getElementById('placeholder')) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName != 'IMG') return false;
    placeholder.setAttribute("src", source);
    if (document.getElementById('description')) {
        var text = whichpic.getAttribute('title') ? whichpic.getAttribute('title') : '';
        var description = document.getElementById('description');
        if(description.firstChild.nodeType == 3){
            description.firstChild.nodeValue = text;
        }
    }
    return true;
}
```

showPic的代码变得更多了，在实际中，你需要自己决定是否真的需要这些检查，它们针对的是html文档有可能不再你的控制范围内的情况，但理想情况下，脚本不应该对html文档的内容和结构做太多假设。

# 5、键盘访问事件

前面的代码只能用鼠标操作，而浏览器web页面也是可以用键盘进行操作的，有个名叫onkeypress的事件处理函数就是专门用来处理键盘事件的，按下键盘的任何一个按键都会触发onkeypress事件。

如果想把onkeypress事件加到上面的案例并完成和onclick相同的操作，只需要这样写`links[i].onkeypress = links[i].onclick;`，但是在这个案例中我认为并不需要键盘访问事件，有onclick事件足矣，我想说的是，在这里完全体现出了javascript和html分离带来的方便，如果像是最开始那样把javascript写在html中，将不得不去修改每行html语句，而现在只要在javascript代码中加一条语句即可。

# 6、DOM Core和HTML-DOM

至此，我在编写javascript代码时只用到了以下几个DOM方法：getElementById、getElementsByTagName、getAttribute、setAttribute。

这些方法都是DOM Core的组成部分，它们并不是专属javascript语言，支持DOM的任何一种程序设计语言都可以使用它们，它们的用途也并非仅限于处理网页，它们可以用来处理任何一种标记语言(比如XML)编写出来的文档。
像onclick属于HTML-DOM，它们在DOM Core出现之前很久就已经为人们所熟知，比如HTML-DOM提供了一个forms对象，写法是`document.forms`可以代替`document.getElementsByTagName(forms)`。还有`element.src`可以代替`element.getAttribute`。

它们的区别是HTML-DOM只能处理web文档，我使用DOM Core也是因为其兼容多种类型的文档，其实这个完全是根据使用场景来选择，并没有绝对的对错之分。

# 7、增加css

```css
body {
    font-family: "Helvetica","Arial",serif;
    color: #333;
    background-color: #ccc;
    margin: 1em 10%;
}

h1 {
    color: #333;
    background-color: transparent;
}

a {
    color: #c60;
    background-color: transparent;
    font-weight: bold;
    text-decoration: none;
}

ul {
    padding: 0;
}

li {
    float: left;
    padding: 1em;
    list-style: none;
}
img{
    display: block;
}

#imagegallery {
    list-style: none;
    overflow: hidden;
}

#imagegallery li {
    display: inline;
}

#imagegallery li a img {
    border: 0;
}
```

# 8、把图片的文字链接改为缩略图

```html
<!DOCTYPE html>
<html lang = "en">
<head>
    <meta charset = "utf-8"/>
    <title>Image Gallery</title>
    <link rel="stylesheet" type="" href="./css/style.css">
</head>
<body>
    <h1>Snapshots</h1>
    <ul id="imagegallery">
        <li>
            <a href = "images/fireworks.jpg" title = "A fireworks display">
                ![](images/thumbnail_fireworks.jpg)
            </a>
        </li>
        <li>
            <a href = "images/coffee.jpg" title = "A cup of black offee">
                ![](images/thumbnail_coffee.jpg)
            </a>
        </li>
        <li>
            <a href = "images/rose.jpg" title = "A red,red rose">
                ![](images/thumbnail_rose.jpg)
            </a>
        </li>
        <li>
            <a href = "images/bigben.jpg" title = "The famous clock">
                ![](images/thumbnail_bigben.jpg)
            </a>
        </li>        
    </ul>
    <img id = "placeholder" src = "images/placeholder.gif" alt = "my image galley"/>
    <p id="description">Choose an image</p>

    <script src="script/script.js"></script>
</body>
</html>
```
