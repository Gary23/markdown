1、NODE基础 模块化编程
==

1. 模块化的思想
--

> #### 全局函数

- js加载机制中,由上到下加载
- 如果遇上变量的声明 是全局作用域
- 当全局中出现两个同名变量时? 会被覆盖,  而不是先声明后不允许重复声明

例如：

  
body部分
```
<input type="text" name="name" value="">
  <script src="./city.js"></script><!--全局变量var city = '武汉'-->
  <script src="./city2.js"></script><!--全局变量var city = '湘潭'-->
```
js部分
```
var txt = document.querySelector('input');
txt.value = city; 
//现在city是湘潭还是武汉？
```

##### 全局函数的缺点：

@(nodejs)

- 文件引入顺序的依赖
- 全局变量的污染,无法使用多个同名变量
- 变量之间的关系不明显

> #### 命名空间

- 解决了同名函数命名冲突问题
- 对象将所有数据都向外暴露了,可以供外部修改,不安全
- 私有属性,一般不向外暴露,而是提供公共的访问方式

例如：
body部分
```
  <script src="./jack.js" charset="utf-8"></script>
  <!--    jack.js的内容
  var personJack = {
  username:'jack',
  money:'5000'
  }-->
  <script src="./rose.js" charset="utf-8"></script>
  <!--    rose.js的内容
  var personRose = {
  username:'rose',
  money:'8000'
  }-->
```
js部分
```
      personJack.money = '100'
      console.log('我是'+personJack.username+',我的工资是'+personJack.money)
      // 我是rose,我的身价是100,
      // 本来personJack.money = 5000，可是被上边的赋值污染，最重被覆盖成了100
      console.log('我是'+personRose.username+',我的工资是'+personRose.money)
      // 我是rose,我的工资是8000
```



##### 划分私有命名空间
* 1: 为了保证属性私有化,使用自执行函数,让变量是函数的作用域
* 2: 不再将变量直接暴露,而是提供对应的访问方式
* 3: 基于命名空间的保护,可以允许同名属性名称

jack.js部分
```
var personJack =
(function(){
  var money = 5000 ;   //属性被私有化
  function getMoney(){
    return money;
  }
  // return money 遇上同名冲突
  return   {
      username : 'jack',
      getMoney : getMoney
    };
})();
```
body部分
```
<script src="./jack.js" charset="utf-8"></script>
```
js部分
```

  personJack.getMoney() = '100'; //这里会报错，就不会造成污染了
  console.log('我是'+personJack.username+',我的工资是'+personJack.getMoney());      //直接拿属性获取不到

```

> ####扩展与维护

* 坚持开闭原则(对于添加开放,对于修改是封闭)
* 使用自执行函数,将对象传递进来,进行属性的添加(挂载新属性)
* window.cal||{} 是为了保证程序的健壮性

以计算器的案例来举例：
calulator.js 部分
```
var cal = (function(){
  return {
    add:function(x,y){
      return x + y;
    },
    sub:function(x,y){
      return x - y ;
    }
  }
 })();
```
body部分
```
第一个数:
<input id="x" type="text" name="name" value="">
<select id="opt">
    <option value="+">+</option>
    <option value="-">-</option>
    <option value="*">*</option>
    <option value="/">/</option>
</select> 
第二个数:
<input id="y" type="text" name="name" value="">
<button type="button" name="button" id="btn">=</button> 
结果: 
<input type="text" name="name" value="" id="result">
<script src="./calulator.js" charset="utf-8"></script>
```
js部分
```
var cal = (function(c){
    //添加乘法和除法功能
c.divide = function(x,y){    //查找机制是当前没有,就向上级查找
      return x/y;
}
c.multiply = function(x,y){
      return x * y;
}
      return c;    //将对象返回回去
})(window.cal||{});     //从当前window对象取cal对象,如果没有,就给空对象

var btn = document.getElementById('btn');
btn.onclick = function() {
    //1:获取文本框的值
    var x = parseInt(document.getElementById('x').value); //-0也可以
    var y = parseInt(document.getElementById('y').value);
    //2: 获取操作符
    var opt = document.getElementById('opt');
    var result = document.getElementById('result');
    //定义统计变量
    var sum = 0;
    //3:运算
    switch (opt.value) {
        case '+':
            //求和思想
            sum = cal.add(x, y);
            break;
        case '-':
            //求和思想
            sum = cal.sub(x, y);
            break;
        case '*':
            sum = cal.multiply(x,y);
            break;
        case '/':
            sum = cal.divide(x,y);
            break;
        default:
    }
    //4:显示
    result.value = sum;
}

```
> ####第三方依赖

* 依赖没有文档说明:  根据报错一个个的来整
* 依赖注入: 将自己逐级向上查找,转换为,通知外部传入
  + (window.$||{},wndow.q||{},wndow.t||{});  将需要的对象在参数列表声明

比如：
third.js 部分：
```
(function($,q,t){
  // 这里一万行代码
    $('body').css('background-color','green'); //报错行数是一样
  // 这里再一万行代码
})(window.$||{},window.q||{},window.t||{});//实际是传参，单也可以通过传参来对外显示出这段代码所依赖的第三方包，
```
body部分：
```
<body>
  <script src="./jquery-1.11.1.min.js" charset="utf-8"></script>
  <script src="./third.js" charset="utf-8"></script>
</body>
```

##### 模块化的特点
综上所述，模块化就是一个个功能组合起来称为一个项目，每个模块的功能单一，
模块化的好处: 
	* 生产效率高，因为每个模块专注一个功能。
	* 便于维护，某个模块出了问题直接去修改那个模块
	* 便于扩展
	* 复用性高

2. 模块化分类
--
> #### CMD&AMD

- 都是是模块化代码开发的规范
* CMD  推崇同步加载 加载机制: 延迟加载(滞后/懒加载)，什么时候用什么时候加载
* AMD  推崇异步加载 加载机制: 前置加载(优先加载)，要用什么就加载什么
* 先要根据规范才有实现 --> 模块化加载框架：seajs 和 requireJS
* 按模块化加载框架写的代码都是遵守模块化代码规范的
* seajs 和 requireJS都是在没有模块化概念的年代为了养成我们模块化开发的习惯而做的框架，便于代码的管理。可以说是做了推动作用。

> #### Seajs  介绍

* 引入框架js文件
* seajs.use("../static/hello/src/main"); (可以省略.js后缀)
* 一个js文件通过 module.exports = 向外返回的对象,让外部拿到 
* 外部需要拿到对象 通过require('./spinning');
* 由于需要用到module 当前模块得声明成define(function(require, exports, module)

> #### 基本操作

* 1: 引包

```
 <!--1:引入seajs文件-->
  <script src="../seajs-3.0.0/dist/sea.js" charset="utf-8"></script>
```

* 2: use 开启入口模块

```
<script type="text/javascript">
    <!--2:use 启动模块-->
    seajs.use('./main');//后缀可以不加js后缀
</script>
```

* 3: 定义一个模块define(function(require, exports, module){})
main.js文件部分
```
//3:定义一个模块
define(function(require,exports,module){
  console.log('main.js被加载了');
  //4: 引入模块
  var xiaohong = require('./xiaohong');
  console.log(xiaohong);
})
```

* 4: 引入模块 require
* 5: 导出模块 module.export
xiaohong.js文件部分
```
define(function(require,exports,module){
    console.log('xiaohong.js被加载了');
  //5: 需要向外导出
    module.exports = '小红';
})
```

最终的加载顺序是：
在控制台依次打印
main.js被加载了
xiaohong.js被加载了
小红


3. 常用对象
--

> #### define参数的三种方式

body部分
```
<body>
  <script src="../seajs-3.0.0/dist/sea.js" charset="utf-8"></script>
  <script type="text/javascript">
	    seajs.use('./main');   //启动main
  </script>
</body>
```
main.js部分（灰色的不是注释）
```
define(function(require,exports,module){
   var a = require('./a')
   console.log(a)
});
```
a.js 部分：
* 直接传入字符串 
```
define('看看这样行不行');    
```

* 传入对象

```
define({name:'jack',age:18});
```

* 传入函数，最常规的就是用这种 

```
define(function(require,exports,module){
})
```

> #### exports和module.exports的小问题

通过前面的代码会发现exports这个参数一直没有用到，那么这哥们是干吗用的呢？
```
define(function(require,exports,module){
	module.exports = 'def';    // 返回def
	exports = 'abc';    //返回一个空对象
	console.log(module.exports == exports)   //返回true
	// 既然是true 意义何在?  
	exports.name = 'abc'   // 这样就能返回abc了，是对象的形式。因为exports就是为了提供简写形式的挂载属性，这是个对象，只能挂载属性，不能直接赋值
})
```
* 最终返回module.exports ,如果直接给对象赋值,会导致内存指向改变,用exports.挂载属性是可以的
* 应用场景:
  + module.exports 赋值/挂载属性
  + exports 属性的挂载
  + 如果实在搞不懂之间的区别就直接用module.exports就好了
* 看图module和exports_1

![enter image description here](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/03cfd5e091942061a81d4f004cbafda70b79846d40ffb6fdac8c4270f072a55b789df2cb1df29f0f31d6894856f70678?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-15.png&size=1024)


> #### Use的2种方法

1. 引入main.js再由main加载其他的（默认传递一个参数）
```
seajs.use('./main');//直接开启一个入口模块
```
2. 一开始就将其他所有文件都加载（传递多个参数 ,返回值一一对应传递的数组参数顺序）

html部分
```
console.log('准备起航');
seajs.use(['./a','./b'],function(a,b){    //异步执行 
  console.log(a);   //a.js
  console.log(b);   //b.js
});
console.log('准备降落');
```
a.js 文件部分
```
define(function(require,exports,module){
    console.log('a.js被加载了');
    module.exports = 'a.js';
})
```
b.js 文件部分
```
define(function(require,exports,module){
    console.log('b.js被加载了');
    module.exports = 'b.js';
})
```
最终执行顺序：
准备起航
准备降落
a.js被加载了
b.js被加载了
a.js
b.js
由此可以证明这是异步加载，如果是同步，准备降落是在最后

use是异步的 让用户不觉得整个页面加载慢，让用户不觉得加载慢。如果是同步，万一引入的慢会阻塞整个网页。

而且也能发现js是同步优先执行，准备起航和准备降落就是同步的。

![enter image description here](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/c4d2c0f9bf7500a9ddc33d139cc35dbcda8850d31ec893f0c49e877d450c3a488fee5db2f74e4bd9a8c05024337c8f11?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-16.png&size=1024)

> #### require特点

html 部分
```
seajs.use(['./main'],function(a){//异步执行 
});
```
main.js 部分
```
define(function(require,exports,module){
    require('./b.js');  
    require('./b.js');
    require('./b.js');
//上面只加载一次，因为require加载机制中,模块优先从缓存中获取,如果缓存中存在,就取,不存在就加载


// require 也存在异步执行，只是默认是同步 通过aync()调用
  console.log('引入以前');   // 同步，执行
  require.async('./b.js');    // 异步，闪过
  require.async('./b.js');    // 异步，闪过
  require.async('./b.js');    // 异步，闪过
  console.log('引入以后');   // 同步，执行
})
```
b.js 文件部分
```
define(function(require,exports,module){
    console.log('b.js被加载了');
    module.exports = 'b.js';
})
```

* require加载机制中,模块优先从缓存中获取,如果缓存中存在,就取,不存在就加载
* 默认是同步，如果用异步就调用require.aync()
* 不管异步调用多少次,都是同步优先
* 异步就是不阻塞后续代码执行

> #### 3种路径类别



* 补上.js也可以  相对路径./main.js

```
seajs.use(['./main.js']
```

* 绝对路径 C:/Users/tujunxiong/Desktop/node01/code/11_path/main.js
  + 还可以是url路径 http://baidu.cn/xxx.js

```
seajs.use(['C:/Users/tujunxiong/Desktop/node01/code/11_path/main.js']
```

* base路径 默认就是seajs加载的路径 dist路径
  + 部能够以./开头
  + 不能够以盘符开头
  + 不能够以/开头
  + 直接是一个名成 后面可以连接/

```
seajs.use(['tmp/a.js']
```


> #### seajs的高级配置


通过config函数传递参数
```
// 在tmp文件夹下有个a.js文件
seajs.config({
  base:'C:/Users/ypj/Desktop/code/tmp/',
  alias:{
    'jack':'C:/Users/ypj/Desktop/code/tmp/a.js'
  }
  paths:{
    'dirA' : 'C:/Users/ypj/Desktop/code/tmp'
  }
  })

```

三个主要的配置
* alias 起一个别名,可以是绝对路径 不能是目录只能是文件，是一个对象

```
seajs.use(['jack'])
```
* paths 给目录起一个别名，只能是路径，也是一个对象
  
```
seajs.use(['dirA/a'])
```

* base 基础路径

```
seajs.use(['a'])
```

* 应用场景: 目录层级过深,或者跨盘符的情况就可以使用

> #### 前端模块自动化整合

* 目的是：减少请求,js代码合并
* 但是合并的时候,如何区分模块
* 要用的包：gulp、gulp-concat、gulp-seajs-transport、gulp-useref
* 本身index.html 可以引入具体的文件,辨识

下面在src目录下新建一个项目
html部分：
```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>seajs真实开发</title>
</head>
<body>
用户名：<input type="text" name="name"/>
密码： <input type="password" name="name"/>
<button>登录</button>
<!-- build:js js/seajs.js -->
<script src="../../seajs-3.0.0/dist/sea.js"></script>
 <!-- endbuild -->
<script>
    seajs.use('./js/main');
</script>
</body>
</html>
```
main.js部分

```
define(function(require,exports,module){
    var b = require('./b');
    console.log(b);
})
```
b.js部分

```
define(function(require,exports,module){
    module.exports = 'b.js'
})
```
- 
- 项目文件结构是：
src
..|----- js文件夹         
..|...........|----- main.js
..|...........|----- b.js
..|----- index.html


* 下面将src目录下的内容构建到dist目录

gulp的步骤
1. npm init -y
2. npm i  gulp-seajs-transport gulp gulp-concat gulp-useref --save
3. 新建文件gulpfile.js

```
var gulp = require('gulp');
var gulp_concat = require('gulp-caoncat');
// 这是专门用来合并seajs模块的包
var transport = require('gulp-seajs-transport');
var useref = require('gulp-useref');

// js文件合并
gulp.task('concat',function(){
	gulp.src('src/js/*.js')
	.pipe(transport())
	.pipe(gulp_concat('main.js'))
	.pipe(gulp.dest('dist/js'))
})

gulp.task('moveHtml',function(){
	gulp.src('src/index.html')
	.pipe(useref())
	.pipe(gulp.dest('dest'))
})

gulp.task('default',['concat','moveHtml'],function(){
	
})
```

4. 运行gulp，执行gulpfile.js里的命令。

用gulp-seajs-transport包合并main. js文件后：
```
define("main",[],function(require,exports,module){
    var b = require('./b');
    console.log(b);
})

define("b",[],function(require,exports,module){
    module.exports = 'b.js'
})
```



> #### seajs

* 引入
* 启动模块 seajs.use([依赖的模块1,依赖的模块2],function(模块1的返回值,模块2的返回值){...});
* define(function(require,exports,module){..});
* 接受模块返回值 require('模块名')
* 导出对象  module.exports = '导出对象'

> #### requireJS

* 引包

```
  <script src="../require.js" charset="utf-8"></script>
```

* 启动模块 requirejs([依赖的模块1,依赖的模块2],function(模块1的返回值,模块2的返回值){...})
  + requirejs,引入的时候必须是数组, 其他模块define的时候也用数组
```
  <script type="text/javascript">
  // 第一个参数必须是数组
    requirejs(['./main'],function(main){
    
    });
  </script>
```

* define([依赖的模块1,依赖的模块2],(模块1的返回值,模块2的返回值){...})
* 接受模块的返回值,function的参数中接受<模块1的返回值>
- requireJS加载机制：当main.js即将被加载前，requireJS首先判断他是否有依赖，如果有依赖，先加载依赖项
```
// main.js文件
define(['./a'],function(a){
  console.log('a.js被加载了');//2
  console.log(a);//3
});		//CMD加载a.js要前置,代码提前声明，用数组可以依赖多个模块。
// 在这里，因为依赖前置，所以先执行a.js。
```

* 向外导出 函数内直接return

```
define(function(){
  console.log('a.js被加载了');//1
  return 'a.js';
});
```

> #### seajs和 requireJS比较

##### seajs
* 引入
* 启动模块 **`seajs.use([依赖的模块1,依赖的模块2],function(模块1的返回值,模块2的返回值){...});`**
* **`define(function(require,exports,module){...});`**
* 接受模块返回值 require('模块名')
* 导出对象  module.exports = '导出对象'

##### requirejs
* 引入
* 启动模块 **`requirejs([依赖的模块1,依赖的模块2],function(模块1的返回值,模块2的返回值){...})`**
  + requirejs,引入的时候必须是数组, 其他模块define的时候也用数组
* **`define([依赖的模块1,依赖的模块2],(模块1的返回值,模块2的返回值){...})`**
* 接受模块的返回值,function的参数中接受<模块1的返回值>
* 向外导出 函数内直接return

#####  seajs和requirejs的区别
* 代码的样子: requirejs 依赖项8声明前置,seajs声明滞后
* 加载机制: requirejs 加载前置,seajs 加载滞后(何时用何时加载)
* CMD 和 AMD CMD推崇同步,AMD推崇异步
* 时间换空间，需要让性能快的话就用异步，需要节约性能何时用才加载就需要同步，节约内存





