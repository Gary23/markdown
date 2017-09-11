HTML5  新增API介绍
==

文件读取
--

##### javascript 阻止读取本地文件

@(HTML)

- 浏览器是不允许JS读取本地文件的，也就是用户电脑本地的文件。这是出于安全的考虑。
- 但是有的时候需要这种功能，上传图片预览  实际场景就是qq空间

- 传统的上传是通过flash上传至服务器，服务器将上传后的地址返回给浏览器，然后让js通过dom操作添加到图片标签上

-  缺点是如果上传的图片不合适，重新上传就要再走一个这个步骤，而且之前上传的图片也不会被删除，会存在服务器上

>#### FileList

- 通过FileList对象，可以让js直接读取本地文件，将读取到的文件放到页面上。不经过服务器，不需要网络
- FileList对象存储文件的信息。支持多个文件上传。

##### 上传一个文件查看FileList的信息
```
<input type="file" multiple class="file"/>
```
```
// 1
var file = document.querySelector('.file');
// 2
file.onchange = function(){
for(var k in this){
	console.log(k + '===' + this[k]);   // 3
}
// 4
console.log(this.files);    
}
```
1. 获取上传的表单
2. 选择文件打开之后会触发change事件,也就是检测表单的变化，有改变就会触发
3. 查看该dom对象的属性和值
4. **其中有个属性是files，记录着文件信息(FileList对象),因为是列表**，所以会有多个信息，属性是索引数字，值是文件信息

> ####   FileReader

- 是html5的内建对象，也就是说使用时需要new一下
- 也叫文件读取器，负责读取本地文件。
- 比如图片就是将图片处理成了base64编码格式，代替url地址

##### 上传一个图片显示在页面上
```
<input type="file" multiple class="file"/>
<img src="" alt="" id="img"/>
```
```
// 1
var file = document.querySelector('.file');

file.onchange = function(){
    var file = this.files[0];  // 2
    var fileReader = new FileReader();
    // 3
    fileReader.readAsDataURL(file);
    // 4
    fileReader.onload = function(){
        // 5
        document.querySelector('#img').src = this.result;
    }
}
```
1. 获取上传的表单
2. 获取第一个文件
3. 文件有的以二进制形式存在，有的以字符串形式存在。readAsDataURL()就是把文件以DataURL形式读取
4. onload  事件监听，当文件读取完成时调用，比如文件有好几兆，读取需要花时间
5. 读取完之后会将文件编译后的内容保存在result中，要放到页面上只能是readAsDataURL格式



全屏
--
- 让网页内容以一个全屏的形式展现，也可以是图片等元素
 1、Node.requertFullScreen()   开启全屏显示
 2、Node.cancelFullScreen()   关闭全屏显示
 3、Node.IsFullScreen   检测是否是全屏   是属性不是方法  返回true或者false
- 由于其兼容性原因。不同浏览器需要添加前缀。
 1、webkitRequertFullScreen      
 2、mozRequertFullScreen

##### 让整个html文档全屏的步骤

```
.box{
    width: 200px;
    height: 200px;
    background-color: pink;
}
/*全屏伪类，当整个文档全平时，把盒子改为蓝色*/
:-webkit-full-screen .box{
    background-color: blue;
}
```
```
<div class="box">
    <input type="button" class="open" value="全屏"/>
    <input type="button" class="cancel" value="关闭"/>
    <input type="button" class="check" value="是否全屏"/>
</div>
```
```
var open = document.querySelector('.open');
var cancel = document.querySelector('.cancel');
var check = document.querySelector('.check');
var box = document.querySelector('.box');

open.onclick = function(){
    // 1
    document.documentElement.webkitRequestFullScreen();
}
cancel.onclick = function(){
    // 2
    document.webkitCancelFullScreen();
}

check.onclick = function(){
    document.webkitIsFullScreen;
}
```
1. 获取整个dom文档节点，并让整个文档全屏
2. 在关闭窗口时不是节点了，而是使用document。


##### 让盒子全屏的效果的步骤

```
.box{
    width: 200px;
    height: 200px;
    background-color: pink;
}
/*全屏伪类，当盒子处于全屏状态时会颜色改为蓝色,类似.box:hover*/
.box:-webkit-full-screen{
    background-color: blue;
}
```
```
<div class="box">
    <input type="button" class="open" value="全屏"/>
    <input type="button" class="cancel" value="关闭"/>
    <input type="button" class="check" value="是否全屏"/>
</div>
```
```
var open = document.querySelector('.open');
var cancel = document.querySelector('.cancel');
var check = document.querySelector('.check');
var box = document.querySelector('.box');

open.onclick = function(){
    // 1
    box.webkitRequestFullScreen();
}
cancel.onclick = function(){
    // 2
    document.webkitCancelFullScreen();
}
check.onclick = function(){
    document.webkitIsFullScreen;
}
```
1. 让普通盒子全屏，盒子的宽高不变，空白区域都是黑色，但是可以通过css伪类选择器解决
2. 关闭普通盒子也是这个，而不是节点


地理定位
--
- 获取用户当前的地理信息，可以向用户推送一些服务，给用户周边的商家带来消费
- 基于位置的服务LBS（Location Base Service）

>####navigator

- 想获取地理信息是通过BOM进行获取的，也就是指的浏览器
- 通过navigator，这个对象存储着和浏览器相关的一些信息，userAgent比较常用，记录浏览器版本、内核信息
- navigator.geolocation  是html5新增的获取地理位置的对象
- 此对象对应着两个方法：
	1. getCurrentPosition() 获取当前的位置信息，只获取一次
	2. WatchPosition()  持续的获取位置信息，比如导航

#####使用方法介绍

```
// 1
navigator.geolocation.getCurrentPosition(success,error);
function success(){

}
function error(err){
    console.log(err);
}
// 2 
// 3
```
1. 需要两个回调方法，一个表示成功，一个表示失败
2. 失败原因
	- 在谷歌浏览器下要想使用地理定位必须要以服务器的方式访问。
	- 用谷歌浏览器时，在获取位置信息时需要谷歌的一个服务，但是谷歌浏览器在国内会被墙，
3. 但是在手机上的浏览器没问题，因为手机有gps，浏览器在获取用户地理位置时是有多种途径的.可以通过wifi、ip、GPS，依次检测，看看哪个能获取到。

#####实际开发案例
在实际开发中，根据api的文档来做，这里以百度为例

```
<div id="container"></div>
```

用百度地图的话，需要传递一个参数给这个url，注册成为开发者，获取AK值

```
<script src="http://api.map.baidu.com/api?v=2.0&ak=ak的值"></script>
```
      
```
// 1
// 2
// 3
navigator.geolocation.getCurrentPosition(function(position){
	var latitude = position.coords.latitude;  // 纬度
	var longitude = position.coords.longitude  // 纬度
// 4
console.log(position);

// 5
var map = new BMap.Map("container");  // 6
var point = new BMap.Point(latitude,longitude);
// 7
map.centerAndZoom(point,15);
// 8
// 9
var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif"),new BMap.Size(300,157));
// 10
var marker = new BMap.Marker(point,{icon:myIcon});
map.addOverlay(marker);
})

```
1. 在真正的实际开发中，geolocation只是获得用户的当前位置信息，但要发挥作用还是要借助第三方的服务器，比如百度地图的api。
2. 也就是通过这个方法获取用户的地理信息，传给百度地图，然后百度地图帮我们生成地图图像
3. 第一个函数表示成功的回调，在函数里传递一个参数，这个参数记录了地理位置信息
4. 查看地理信息
5. 这些都是写死的，使用百度地图的固定写法
6. div的id值，将地图放到这个盒子里，把经纬度传给百度
7. 居中并且缩放经纬度
8. 写到这里就可以出现地图了，并且会定位
9. 定义一个图片标记，本地传递一个图片，设定一个尺寸
10. 创建标注、调用方法

网络状态
--
- 可以监听网络是处于联网状态还是断网状态
- 应用场景：当前网络不佳的提示

>#### online和offline

- 监听在线的是事件 online  离线是 offline
- 要绑定在window上

##### 使用方法

```
// 1
window.addEventListener('online',function(){
    alert('网络已连接');
})
// 2
window.addEventListener('offline',function(){
    alert('网络已断开');
})
```
1. 当设备联网的时候会触发。
2. 当设备断开网络会触发。

历史管理
--
>####history

- 针对BOM的window.history对象我们可以管理历史记录。
- 可用于单页面应用(SPA(Single Page Application) ，无刷新改变页面内容，模仿原生app。
- 在DOM操作中，通过按钮更改页面的内容后，一刷新后还是按钮之前的样子，有的网站刷新后不变就是通过历史管理来实现的
    
#####直接更改href，浏览器会刷新
```
<input type="button" value="看地址变没变" id="btn"/>
```
```
var btn = document.getElementById('btn');
// 地址发生变化，页面刷新了
btn.onclick = function(){
    location.href = 'http://www.baidu.com';
}
```
#####用历史管理的效果
```
<input type="button" value="看地址变没变" id="btn"/>
```
```
var btn = document.getElementById('btn');
// 1
btn.onclick = function(){
	// 2
    history.pushState(null,'标题','./test.html');
}
```
1. 新增一条历史记录(后退能回到之前的地址
2. 参数说明
	- 第一个参数是传递数据，数据是以对象的形式传递的,没有数据传就写null。
	- 第二个是网页的标题，暂不支持
	- 第三个是新的历史


#####replaceState的区别

```
<input type="button" value="看地址变没变" id="btn"/>
```
```
var btn = document.getElementById('btn');
// 1
btn.onclick = function(){
    history.replaceState(null,'标题','./test.html');
    // 2
}
</script>
</body>
```
1. 参数都一样
2. 区别，replaceState没有新增加历史，而是替换掉了原地址，不能后退

##### onpopstate事件
```
<input type="button" value="看地址变没变" id="btn"/>
```
```
var btn = document.getElementById('btn');
btn.onclick = function(){
    history.pushState({name:'tom'},'','test.html')
}
// 1
window.onpopstate = function (ev){
    console.log(ev);  // 2
}
```
1. 当历史发生变化时会触发，上面的按钮改变地址的时候，这里的事件就触发了
2. 查看事件对象的内容
	- state属性是pushState传递的数据
	- 只有地址变为test.html时候才会传递,没有传递数据显示null
	- 作用是每次返回相应页面都会传递数据，让数据不变。


web存储
--
- 通常存储数据是存在变量或者对象里，变量是要占内存的，所以存储量比较大的数据不适合放在变量里
- 换另外一种存储方式，用html5新增的数据存储方法。window.sessionStorage和window.localStorage
- 而且数据不仅要存，还要可存可删

>####sessionStorage
   
##### 添加、读取、删除、清空的使用方法  
```
<!-- 添加 -->
<p>
    <label for="">
        键:<input type="text" class="key">
    </label>
    <label for="">
        值:<input type="text" class="val">
    </label>
    <input type="button" class="set" value="设置">
</p>
<!-- 读取 -->
<p>
    <label for="">
        值: <output class='val'>&nbsp;</output>
    </label>
    <label for="">
        键:<input type="text" class="key">
    </label>
    <input type="button" class="get" value="读取">
</p>
<!-- 删除 -->
<p>
    <label for="">
        键:<input type="text" class="key">
    </label>
    <input type="button" class="remove" value="删除">
</p>
<!-- 清空 -->
<p>
    <input type="button" class="clear" value="清空">
</p>
```
```
<script src="jquery-1.12.4.min.js"></script>
```
    

```

// 1
$('.set').on('click',function(){
    // 2
    var key = $(this).parent().find('.key').val();
    var val = $(this).parent().find('.val').val();
    window.sessionStorage.setItem(key,val);
})
// 3
$('.get').on('click',function(){
    // 4
    var key = $(this).parent().find('.key').val();
    var val = $(this).parent().find('.val');
    val.val(window.sessionStorage.getItem(key));
})
// 5
$('.remove').on('click',function(){
    // 6
    var key = $(this).parent().find('.key').val();
    window.sessionStorage.removeItem(key);
})
// 7
$('.clear').on('click',function(){
    // 8
    window.sessionStorage.clear();
})
```
1. 添加数据
2. 存储一个数据，数据是以键值对形式存在的。
3. 读取数据
4. 读取数据的值，只需要输入key就行
5. 删除数据
6. 删除数据，需要输入key的值
7. 全部清除
8. 全部清空不需要传参数

>####localStorage

- 用法和sessionStorage用法相同，区别是声明周期不同
- sessionStorage是关闭浏览器就被清除
- localStorage永远都是在的，除非手动清除数据
- sessionStorage只能在同一个页面下存储和读取数据
- localStorage可以在多页面之间存储和读取数据

    
应用缓存
--

- 用html和css模拟原生应用和实际原生的区别是原生应用在没有网络时候也能打开看到内容，只是内容不更新
而模拟的话会直接打不开网页，不能显示。
- 这个可以通过应用缓存来解决。
- 需要一个缓存清单。其中资源是被缓存起来的，需要明确告诉浏览器要缓存谁不要缓存谁，浏览器按照缓存清单来确认该缓存哪个。

#####创建

- 新建一个txt文档，改名XXX.appcache
- 顶行写：
	- CACHE MANIFEST
- 在html标签添加：
```
<html lang="en" manifest="./study.appcache">
```
#####文件内容
- 要缓存的内容：
CACHE:
    ./image/img1.jpg
    ./image/img2.jpg
    ./image/img3.jpg
    ./image/img4.jpg
    ./css/main.css
    
- 正常情况浏览器会优先读取缓存的内容，这样服务器更新了的话还会读取缓存。而写在NETWORK中的文件列表会让浏览器优先去服务器获取
NETWORK:
    ./css/main.css
*代表所有文件
    
- 回滚，当我们找不到某个资源时，可以去找一个备份资源
FALLBACK:
    ./online.html ./offline.html

#####管理
- chrome浏览器可以模拟网络，Network中右边的选项可以下拉选择，可以测试断网环境
- 管理缓存内容：
在chrome浏览器打开：chrome://appcache-internals   工具和离线模式来调试管理应用缓存
所有缓存列表写的的文件都有显示，可以手动清除，然后在下一次联网时候会再次生成


        
        
    
    
    


