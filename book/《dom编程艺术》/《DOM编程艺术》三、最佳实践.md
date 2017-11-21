# 1、平稳退化和渐进增强

## 什么是平稳退化

不管你想通过javascript个改变哪个网页的行为，都必须三思而后行，首先要确认，为这个网页增加这种额外的行为是否有必要。

在所有的javascript特效当中，最臭名昭著的莫过于那些在人们打开网页时弹出的广告窗口，不幸的是有不少用户为此干脆彻底禁用了javascript，这是一个典型的滥用javascript的例子，从技术上讲弹窗解决了如何向用户发送信息，但在实践中，频繁弹出的广告窗口却让用户不胜其烦，令人欣慰的是这一问题已经收到了所有人的关注，那些不遵守用户至上原则的网站都在自取灭亡。

所以如果要使用javascript就要确认，这么做会对浏览体验产生怎样的影响，最重要的是，如果用户的浏览器不支持或禁用了javascript的情况下仍能顺利浏览你的网址，这就是平稳退化。虽然某些功能无法使用，但最基本的操作仍能顺利完成。

## 举个例子

以弹出窗口的例子来说明平稳退化的思想。这里并不是指在加载网页时弹出，而是点击后弹出，例如服务条款，邮费列表等等。

javascript使用window.open(url,name,features)来创建新的浏览器窗口。

- 参数1：新窗口里页面的url地址，省略这个参数就是一个空白网页。

- 参数2：新窗口的名字，代码可以通过这个名字与新窗口交互。

- 参数3：以逗号分隔的字符串，包括新窗口尺寸(工具条、菜单条、初始显示位置等等)。

```js
function popUp(winURL){
    window.open(winURL,"popup","width=320,height=480");
}
```
这个函数将打开一个320x480像素的新窗口"popup"。

使用popUp函数的一个办法是使用伪协议。

> 真协议用来在因特网上的计算机之间传输数据包，比如HTTP、FTP协议等，协议则是一种非标准化的协议。

```html
<a href = "javascript:popUp('http://www.example.com/');return false;">Example</a>
```

通过"javascript:"为协议调用popUp()函数。

```html
<a href = "#" onclick = "popUp('http://www.example.com/');return false;">Example</a>
```

这是内嵌式的事件处理函数，这个链接的href没什么用，所以用"#"，表示一个空连接，实际工作由onclick完成。

但是以上两种方法都很糟糕，因为它们都不能平稳退化。有以下两点原因。

1. 用户如果禁用了javascript功能，这样的链接将毫无作用。

2. 第二点是不利于搜索引擎排名，搜索机器人浏览web页的目的是把各种网页添加到搜索引擎的数据库，很少有机器人能理解javascript代码。

其实为javascript代码预留退路很简单，给href设置真实的URL地址。

```html
<a href = "http://www.example.com/" onclick = "popUp('http://www.example.com/');return false;">Example</a> 
```

这样即使javascript被禁用，这个链接也不是失效的，只是功能上打了点折扣，这是一个经典的平稳退化的例子。

## 渐进增强

所谓"渐进增强"就是用一些额外的信息层去包裹原始数据，按照"渐进增强"原则创建出来的网页几乎都符合"平稳退化"原则，在一个网页中，良好的内容就是一切，只有正确的使用标记语言才能对内容做出准确的描述，CSS指令构成了一个表示层使文档呈现出各种模式，但即使去掉这个表示层，文档的内容也依然可以访问。

# 2、分离javascript

就像css那样把style写到html文档中，虽然可以用，但是这种做法弊大于利，最好的方法是把样式信息存入一个外部文件。在文档的head部分用`<link>`标签调用这个文件，这样更容易阅读和理解，样式信息也更容易更改，不用去文档里逐一搜索和替换，这个结论同样适用于javascript。

现在我要把上面弹窗例子中的onclick事件分离出来。具体步骤如下：

1. 把文档里的所有链接全放入一个数组里。

2. 遍历数组。

3. 如果某个链接的class属性等于popup，就表示这链接在被点击时应该调用popUp()函数

```js
window.onload = function(){
    if(!document.getElementsByTagName) return false;
    var links = document.getElementsByTagName('a');
    if(links.length > 0){
        for(var i = 0;i < links.length;i++){
            if(links[i].getAttribute('class') == 'popup'){
                links[i].onlcick = function(){
                    popUp(this.getAttribute('href'));
                    return false;
                }
            }
        }
    }
}
```

以上代码把调用popUp()函数添加到有关的链接上，存入一个外部javascript文件中。

> 这里使用了window.onload事件，当onload事件触发时代表整个文档已经加载完毕，当然也包括DOM树，我要让HTML文档先加载这样才可以生成DOM树，起码要在DOM树生成后才可以加载javascript文件，否则获取不到文档中的各个元素，即使把javascript文件放到body的底部，也不能保证哪个先加载结束，浏览器可能一次加载多个文件，因为javascript加载时文档可能还没加载完成，所以DOM也没有加载完，很多功能会无法使用。

# 3、向后兼容性

上面的代码中，针对访问者可能未启用javascript功能的情况，需要进行对象检测，在这里用if语句检测访问者的浏览器是否支持document.getElementsByTagName方法。如果不支持，就不会再继续执行，直接return false;这是一种很常见的向后兼容的方法，适用于很多地方。

# 4、性能考虑

在上面案例的for循环开始前检测是否获取到了a元素，没有的话后面的代码也没必要执行，这里将所有a元素存入link变量。出入对性能考虑，我们应该检查查询DOM中某些元素的操作，搜索整个DOM树对性能并没有好处，总之把搜索结果保存在一个全局变量里，或者把一组元素直接以参数形式传递给函数，是最好的方法。

> 另外，js文件在HTML标签中的位置对页面初次加载时间也有很大影响，通常我习惯放在head中，但位于head中的脚本会导致浏览器无法并行加载其他文件。
根绝HTTP规范，浏览器每次从一个域名中最多可能同时下载两个文件，所以把script标签放到文档末尾，</body>之前可以让页面加载更快
