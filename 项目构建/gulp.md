---
title: gulp
tags: gulp,自动化,构建
notebook: 项目构建
---

# 为什么需要gulp

1. 多个开发者共同开发一个项目，每位开发者负责不同的模块，这就会造成一个完整的项目实际上是由许多的“代码版段”组成的。

2. 使用less、sass等一些预处理程序，降低CSS的维护成本，最终需要将这些预处理程序进行解析。

3. 合并css、javascript，压缩html、css、javascript、images可以加速网页打开速度，提升性能。

这一系列的任务完全靠手动完成几乎是不可能的，借助构建工具可以轻松实现。这种工具就是gulp。

构建工具就是指通过简单吗配置就可以帮我们实现合并、压缩、校验、预处理等一系列任务的软件工具

# gulp下载和配置

1. gulp是基于node和npm的，在安装了node的基础上。执行 **npm install gulp -g**  即可在电脑上全局安装。

2. 在需要构建的文件夹目录下，执行**npm init** 进行初始化，会生成package.json文件。

3. 在本地目录下载 **npm install gulp --save-dev**  save时为了保存依赖关系

4. 在项目下新建文件**gulpfile.js**，构建的逻辑都写在这里边。

# gulp基本命令

以下的编辑器的内容都是写在 **gulpfile.js** 中的。这里以压缩css文件为例。

**第一步**

gulp是通过require()来引包.
会自动在当前目录寻找node_modules并进去找gulp。

```js
var gulp = require('gulp')  // 从node_modules目录中引入gulp插件

var cssmin = require('gulp-cssmin')   // 从node_modules目录中引入gulp-cssmin插件

var autoprefixer = require('gulp-autoprefixer')
```

**第二步**

定义一个任务并起一个名字，这里比如名字取为css。

```js
gulp.task('css',function(){

    gulp.src('./css/main.css',{base:'./'})
        // cssmin的参数是.之前返回的结果
        .pipe(cssmin())    
        // 加c3的浏览器兼容前缀，根据当前版本往前倒5个版本          
        .pipe(autoprefixer({            
            browsers:['last 5 versions']         
        }))
        .pipe(gulp.dest('./release'))      
});
```

上面的任务中用到了几个基本的gulp的方法。

**gulp.task()** 定义任务，通过任务对不同资源进行处理操作。

**gulp.src()** 寻找资源，需要操作的文件的存放位置，这里第二个参数可选，是将src中的目录作为一个基准目录，这里存储目录是'./release'，再拼接上基准目录就是'./release/css/main.css'，如果不加基准目录则最终存储目录就是/release/main.css。

**gulp.pipe()** 管道，在管道中使用之前声明引入的插件来实现构建任务，会将前一个管道的结果当做参数传到下一个管道。可以看做是链式编程的意思。

**gulp.dest()** 存储目录，构建完成的文件存放的目录。

# 构建示例

## 引用下载的插件包

这里是一些比较常用的插件，后面的示例会演示这些插件的使用方式。

```js
var gulp = require('gulp');
// less转css
var less = require('gulp-less');
// 加c3前缀
var autoprefixer = require('gulp-autoprefixer');
// 压缩css文件
var cssmin = require('gulp-cssmin');
// 压缩图片
var imagemin = require('gulp-imagemin');
// 文件重命名
var rename = require('gulp-rename');
// 更改js文件后html里的引用修改
var useref = require('gulp-useref'); 
// 筛选文件
var gulpif = require('gulp-if');
// 压缩js文件
var uglify = require('gulp-uglify');
// 文件合并
var concat = require('gulp-concat');
// 压缩html文件
var htmlmin = require('gulp-htmlmin');
// 文件改名（处理缓存）
var rev = require('gulp-rev');
// 替换文件的引用链接
var revCollector = require('gulp-rev-collector');
```

## gulp的部分方法演示

### 任务依赖

有一些任务需要完成之前某个任务之后再去执行，这就是依赖关系，gulp.task方法的第二个参数可以配置这种依赖关系。

```js
gulp.task('all', ['a', 'b'], function() {
    
})
```

要注意的是这里all不会等a,b执行完了再开始执行，而是让a,b先执行，然后立马开始执行all任务，也就是一种异步的执行，如果想让a,b执行结束再去执行all就需要在a,b任务中增加return 

```js
gulp.task('a', function(){
    // return gulp.src()......
})

gulp.task('b', function(){
    // return gulp.src()......
})
```

### 默认任务

默认任务是指在命令行中只输入gulp就执行的默认任务。

```js
gulp.task('default', function() {
    console.log('默认任务');
})
```

### 处理html文件任务

```js
gulp.task('html',function() {
    gulp.src(['./index.html', './views/*.html'], {base: './'})
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true, minifyJS: true, minifyCSS: true}))    // htmlmin插件需要传入一个配置参数，collapseWhitespace是删除空白行，removeComments是删除注释，minifyJS是压缩html中的js，minifyCSS是压缩html中的css
        .pipe(gulp.dest('./release'));
})
```

### 处理浏览器缓存

浏览器判断是否加载内容的标准就是url地址有没有更改。也就是引用的文件名。rev 插件可以给文件加个后缀的名字，只有当文件内容改变的时候才会改变，否则名字不会改变。下面以css任务举例：

```js
gulp.task('css',function(){
    gulp.src('./css/main.css',{base:'./'})
        .pipe(cssmin())    
        .pipe(rev())
        .pipe(gulp.dest('./release'))   // 如果文件内容有变动则更改文件名
        .pipe(rev.manifest())   // 记录旧文件名和新文件名的对应关系
        .pipe(gulp.dest('./release/rev'))   // 保存记录对应关系的文件
});
```



### 文件合并后html里的引用修改

有时候多个js文件或者css文件在开发环境是多个文件，而在生产环境为了减少请求可以合并为一个。合并之后html中的引用也要随之改变，这里示例这种情况的任务：

```js
gulp.task('useref', function(){
    gulp.src('./index.html')  // 要修改的html文件
        .pipe(useref())   // 根据html文件中的注释执行，这个任务顺便还直接将js文件合并了
        .pipe(gulp.dest('./release'));
})
```

下面是html文件中需要修改的部分，最主要的是注释部分，all.js就是合并后的文件，如果是css文件就将 build:js 改为 build:css 。注意这里在html修改路径时，要以转译后的html文件位置写相对路径。

```html
<!--build:js ./script/all.js-->
<script src="./scripts/app.js"></script>
<script src="./scripts/controllers.js"></script>
<script src="./scripts/directives.js"></script>
<!--endbuild-->
```

这里useref任务会执行两个任务，第一个是合并这三个js文件，第二个是根据html的注释更改文件的引用。下面再来看下第三个作用，删除引用

```html
<!--build:remove-->
<script src="./public/less.js"></script>
<!--endbuild-->
```

## 一个gulp构建的完整实例（声明和引用省略）

### 筛选操作

在gulp任务中也可以进行if判断，通过判断执行任务的文件的名称来执行某些特定的任务，就拿上面的useref来举个例子。

```js
gulp.task('useref', function(){
    gulp.src('./index.html')  
        .pipe(useref())   
        .pipe(gulpif('*.js', uglify()))  // 如果执行任务的文件是*.js则进行压缩任务处理
        .pipe(gulp.dest('./release'));
})
```



### 处理css文件任务

```js
// 处理css文件
gulp.task('css',function(){
    return gulp.src('./public/less/main.less')
        .pipe(less())       // 首先将less转为css
        .pipe(cssmin())     // 转为css之后就可以对css文件进行压缩
        .pipe(autoprefixer({    // 添加css3前缀
            browsers:['last 5 versions']
        }))
        .pipe(rev())        // 给css改名字，防止浏览器从缓存读取文件
        .pipe(gulp.dest('./release/public/css'))
        .pipe(rev.manifest())      // 生成css新旧文件名的对应关系的json文件
        .pipe(rename('css-manifest.json'))      // 将文件改名，防止保存时重命名被覆盖
        .pipe(gulp.dest('./release/rev'));
})
```

### 处理图片文件任务

```js
//处理图片任务
gulp.task('image',function(){
    return gulp.src(['./public/images/**/*','./uploads/*'],{base:'./'})    // **代表递归，用于多级目录。
        .pipe(imagemin())       // 图片压缩
        .pipe(rev())        // 给图片改名字，防止浏览器从缓存读取文件
        .pipe(gulp.dest('./release'))
        .pipe(rev.manifest())     // 生成图片新旧文件名的对应关系的json文件
        .pipe(rename('image-manifest.json'))
        .pipe(gulp.dest('./release/rev'))
})
```

### 处理js文件任务

```js
gulp.task('useref', function() {
    return gulp.src('./index.html')
        .pipe(useref())  // 替换html中的js引用，自带合并功能
        .pipe(gulpif('*.js', uglify()))   // 筛选压缩js文件
        .pipe(gulpif('*.js', rev()))   // 给js文件改名
        .pipe(gulp.dest('./release'))
        .pipe(rev.manifest())   // 生成新旧文件对应关系
        .pipe(rename('js-manifest.json'))   // 给文件改名
        .pipe(gulp.dest('./release/rev'));
})
```

### 改变引用的文件名

之前修改了文件的名称，那么在html中的引用也要改变，下面这个是改变文件引用时的文件名的例子，先找到之前保存好的对应关系的文件，任务会自动替换引用中的文件名。

```js
// 先执行之前三个任务，运行gulp rev就可执行之前三个任务
gulp.task('rev', ['css', 'image', 'useref'], function(){
    // 对应关系文件，需要替换操作的文件(已经被压缩)
    gulp.src(['./release/rev/*.json', './release/index.html'], {base: './release'})
        .pipe(revCollector())
        .pipe(gulp.dest('./release'));
})
```

### 其他任务

在这里移动一些其他不需要操作的文件。

```js
gulp.task('other'), function() {
    gulp.src(['./api*/*', './public/font/*', './public/libs/*', './view/*.html'], {base: './'})
        .pipe(gulp.desc('./release'));
})
```

### 默认任务

```js
gulp.task('default', ['rev', 'other'])
```

这里如果方法内没有必要的逻辑，可以省略填写第三个参数