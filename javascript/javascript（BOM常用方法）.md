
---

title: javascript（BOM常用方法）
date: 2017-06-01 17:29:52
tags: javascript

---

## BOM操作的常用属性和方法

open()：打开一个新的页面，格式为`open(页面的url,打开的方式)`，如果url为空则打开一个空白页面。如果打开方式为空，默认为新窗口方式打开。这个方法返回新窗口的window对象。

close()：关闭一个页面，但是这个方法有点兼容性问题，firefox默认无法关闭，chrome默认直接关闭，ie：询问用户。

navigator.userAgent：返回浏览器的名称和版本。

location：浏览器地址信息，本身不是字符串，是object格式。

location：就是url地址本身。

location.search：url中?后面的内容。

location.hash：url中#后面的内容。

#### 窗口尺寸与大小

可视区的尺寸：`document.documentElement.clientWidth`和`document.documentElement.clientHeight`。

滚动条滚动的距离：`document.documentElement.scrollTop`和`document.documentElement.scrollLeft`。在chrome浏览器中要使用`document.body.scrollTop`和`document.body.scrollLeft`。

元素内容的宽高：`div.scrollHeight`和`div.scrollWidth`。

文档的宽高：`document.documentElement.offsetHeight`和`document.documentElement.offsetWidth`。也可以使用`document.body.offsetHeight`和`document.body.offsetWidth`。

#### 事件

onscroll：当滚动条滚动的时候触发。

onresize：当浏览器尺寸改变的时候触发。

onfocus：当元素获取焦点时触发。

onblur：当元素失去焦点时触发。

focus()：给元素设置焦点。

blur()：让元素失去焦点。

select()：选择指定元素里面的文本内容。只能选择用户可以输入的内容。

onmousemove：鼠标在一个元素上移动时触发。

onkeydown：当键盘按键按下的时候触发。能够响应用户输入的元素才支持键盘事件，和焦点事件一样。如果按下不抬起来会连续触发。

onkeyup：当键盘按键抬起时触发。

oncontextmenu：当右键菜单显示出来时触发。

event事件对象：当一个事件发生时，这个对象发生的这个事件有关的一些详细的信息都会临时保存到event对象中，以便在需要时使用。

#### 事件绑定

标准浏览器的方法：`div.addEventListener(事件名称，事件处理函数，捕获/冒泡);`。false是冒泡，true是捕获。

1. 有捕获。

2. 事件名称没有on。

3. this指向调用该函数的对象。

4. 事件执行的顺序是正序。

非标准浏览器方法：`div.attachEvent('on'+事件名称，事件处理函数)`;

1. 没有捕获。

2. 事件名称有on。

3. this指向window(可以通过call()来解决这个问题)。

4. 事件执行的顺序是倒序。

#### 事件取消

非标准浏览器方法：`div.dettachEvent('on'+事件名称,事件处理函数);`

标准浏览器方法：`div.removeEventListener(事件名称，事件处理函数，捕获/冒泡)`

#### 事件流

事件流和样式位置没关系，和html的结构有关系

事件冒泡：当一个元素接收到事件的时候，会把它接收到的所有事件传播给它的父级，一直到顶层(window)。父级元素只要有相关的事件处理函数，那么就会被执行。阻止冒泡设置事件函数：`event.cancelBubble = true;`

冒泡最主要的作用是父元素和子元素都需要的事件处理函数，只需要绑定给父元素就可以了，而如果希望只有子元素才执行的事件处理函数可以通过设置阻止冒泡来接解决。


事件捕获：捕获和冒泡相反，是从最外层元素传播到目标元素。其他并没什么不同。

控制事件是捕获还是冒泡是由addEventListener中的第三个参数决定的，false为冒泡事件监控是出去的由内向外的，true为捕获事件监控是进来的由外向内的。

#### cookie

cookie的作用就是存储数据。长时间去保存一个值，比如用户上次访问的时间等。

当用户访问了某个网站时候，可以通过cookie向访问者的电脑上存储数据，每个浏览器存储的位置不同，所以不同浏览器存储的cookie不能互相通用。

cookie的存储是以域名的形式区分的，也就是说每个网站的cookie文件是不同文件夹存放的，一个域名下的cookie也可能有多个文件。所以每个cookie文件是可以设置名字的。否则cookie文件会很大很乱。

`document.cookie = 'username=ypj';`这就设置了一个cookie文件的名字和值。

`document.cookie;`读取当前网站下的下所有的cookie的内容，是字符串格式。


一个域名下存放cookie的个数是有限制的，不同浏览器存放的个数不同。

每个cookie存放的内容大小也是有限制的，也是根据浏览器不同限制也不同。

默认情况下，cookie的周期是整个浏览器结束进程的时候。

如果想长时间存放一个cookie，需要在设置这个cookie的时候同时给他设置一个过期的时间。当过期后cookie就会被销毁。

```js
var oDate = new Date();
oDate.setDate(oDate.getDate() + 5);  // 保存5天
document.cookie = 'username=ypj;expires=' + oDate.toGMTString()  // 将oDate又object转为string;
```

cookie在存储特殊字符的时候可能会出现问题，需要通过encodeURI()编码来解决。解码使用decodeURI()方法。参数都是字符。

用js读取cookie时候只能获取整个字符串，没法直接获取某个cookie的键值，同样设置的时候也不方便，所以可以写两个方法来方便操作。

获取cookie

```js
function getCookie(key){
    var arr1 = document.cookie.split(';');
    for(var i = 0;i < arr1.length;i++){
        var arr2 = arr1[i].split('=');
        if(arr2[0] == key){
            return decodeURI(arr[1]);
        }
    }
}
```

设置cookie

```js
function setCookie(key,value,t){
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + t);
    document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString();
}
```

删除cookie

```js
function removeCookie(key){
    setCookie(key,'',-1);
}
```