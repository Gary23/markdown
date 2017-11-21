
# 为什么需要gulp

1. 多个开发者共同开发一个项目，每位开发者负责不同的模块，这就会造成一个完整的项目实际上是由许多的“代码版段”组成的。

2. 使用less、sass等一些预处理程序，降低CSS的维护成本，最终需要将这些预处理程序进行解析。

3. 合并css、javascript，压缩html、css、javascript、images可以加速网页打开速度，提升性能。

这一系列的任务完全靠手动完成几乎是不可能的，借助构建工具可以轻松实现。这种工具就是gulp。

构建工具就是指通过简单吗配置就可以帮我们实现合并、压缩、校验、预处理等一系列任务的软件工具

# gulp下载和配置

1. gulp是基于node和npm的，在安装了node的基础上。执行 **npm install gulp -g**  即可在电脑上安装。

2. 在需要构建的文件夹目录下，执行**npm init** 进行初始化，会生成package.json文件。

3. 在本地目录下载 **npm install gulp --save-dev**  save时为了保存依赖关系

4. 在项目下新建文件**gulpfile.js**，构建的逻辑都写在这里边。

# gulp基本命令

以下的编辑器的内容都是写在 **gulpfile.js** 中的。这里以压缩css文件为例。


**第一步**
在gulp是通过require()来引包.
会自动在当前目录寻找node_modules并进去找gulp。

```js
var gulp = require('gulp')

var cssmin = require('gulp-cssmin')

var autoprefixer = require('gulp-autoprefixer')
```

**第二步**
定义一个任务，名字取为css。

```js
gulp.task('css',function(){
    // 通过gulp.src以参数的形式表示文件存放位置
    // {base:'./'}是基准目录，也就是放到/release/css/main.css，如果不加基准目录就是/release/main.css
    gulp.src('./css/main.css',{base:'./'})
        // pipe是管道的意思,cssmin的参数是.之前返回的结果
        .pipe(cssmin())    
        // 加c3的浏览器兼容前缀，根据当前版本往前倒5个版本          
        .pipe(autoprefixer({            
            browsers:['last 5 versions']         
        }))
        // 选择压缩后存放文件的位置
        .pipe(gulp.dest('./release'))      
});
```

总结：
`gulp.task()` 定义任务

`gulp.src()` 寻找资源

`gulp.pipe()` 管道

`gulp.dest()` 存储目录



# 常用插件介绍

**gulp-less** 编译LESS文件

**gulp-autoprefixer** 添加CSS私有前缀

**gulp-cssmin** 压缩CSS

**gulp-rename**重命名

**gulp-imagemin** 图片压缩

**gulp-uglify** 压缩Javascript

**gulp-concat** 合并

**gulp-htmlmin** 压缩HTML

**gulp-rev** 添加版本号

**gulp-rev-collector** 内容替换

**gulp-useref**  处理文件合并后的引用问题

**gulp-if**  合并文件之后压缩

以上代码将在下面的案例中做使用说明。

```js
var gulp = require('gulp');
//less转css
var less = require('gulp-less')     
// 加c3前缀
var autoprefixer = require('gulp-autoprefixer')     
// 文件改名
var rev = require('gulp-rev')       
// 压缩css文件
var cssmin = require('gulp-cssmin')    
// 压缩图片
var imagemin = require('gulp-imagemin')     
// 文件重命名
var rename = require('gulp-rename')     
// 更改js文件后html里的引用修改
var useref = require('gulp-useref')     
// 筛选文件
var gulpif = require('gulp-if')     
// 压缩js文件
var uglify = require('gulp-uglify')     
// 内容替换
var revCollector = require('gulp-rev-collector')    

// 处理css文件
gulp.task('css',function(){
    return gulp.src('./public/less/main.less')
        .pipe(less())       // 首先将less转为css
        .pipe(cssmin())     // 转为css之后就可以对css文件进行压缩
        .pipe(autoprefixer({
            browsers:['last 5 versions']
        }))
        .pipe(rev())        // 给css改名字，防止浏览器从缓存读取文件
        .pipe(gulp.dest('./release/public/css'))
        .pipe(rev.manifest())      // 生成css新旧文件名的对应关系的json文件
        .pipe(rename('css-manifest.json'))      // 将文件改名，防止保存时重命名被覆盖
        .pipe(gulp.dest('./release/rev'));
})

//处理图片任务
gulp.task('image',function(){
    return gulp.src(['./public/images/**/*','./uploads/*'],{base:'./'})    // 图片有两个文件夹
        .pipe(imagemin())       // 图片压缩
        .pipe(rev())        // 给图片改名字，防止浏览器从缓存读取文件
        .pipe(gulp.dest('./release'))
        .pipe(rev.manifest())     // 生成图片新旧文件名的对应关系的json文件
        .pipe(rename('image-manifest.json'))
        .pipe(gulp.dest('./release/rev'))
})

//处理js文件
/**
uesref的用法：
第一种  以下被注释包裹的部分是html文件的引用部分，意思是将下面三个js文件合并成all.js文件。
./script/all.js保存位置中的./是指相对于html文件的当前目录下
<!--build:js ./script/all.js-->
     <script src="./scripts/app.js"></script>
     <script src="./scripts/controllers.js"></script>
     <script src="./scripts/directives.js"></script>
<!--endbuild-->
<!--build:js ./libs/angular.min.js-->
     <script src="./bower_components/angular/angular.js"></script>
     <script src="./bower_components/angular-route/angular-route.js"></script>
<!--endbuild-->

第二种  和第一种相同，只是换成了css文件
<!--build:css ./public/css/main.css-->
    <link rel="stylesheet/less" href="./public/less/main.less">
<!--endbuild-->

第三种  将被包裹的部分删除
<!--build:remove-->
    <script src="./public/libs/less.js"></script>
endbuild
*/
gulp.task('useref',function(){
    return gulp.src('./index.html')    //最终是要替换页面中的引用
        .pipe(useref())
        .pipe(gulpif('*.js',uglify()))    // 对合并后的文件进行筛选，再进行压缩
        .pipe(gulpif('*.js',rev()))     // 防止浏览器从缓存取文件,js也要改名
        .pipe(gulp.dest('./release'))   // 将index.html放到release中，useref的注释的目录是根据index文件的位置保存的，
                                        // 所以html位置变了，那几个合并的文件的位置也就在release中了
        .pipe(rev.manifest())
        .pipe(rename('js-manifest.json'))
        .pipe(gulp.dest('./release/rev'))
})

// 内容替换(图片、js、css文件名都改了，那么html中的引用的名字也要改一下才行)
gulp.task('rev',function(){
    gulp.src(['./release/rev/*.json','./release/index.html'],{base:'./release'})     // 新旧名字对应都在json文件里
        // 如果不加base那json就和html一样保存在release根目录下了
        // 表示将./release后面的路径保存到release目录下
        .pipe(revCollector())
        .pipe(gulp.dest('./release'))
})


// 以上内容是每个都需要执行，也可以写成一次性执行
// rev必须等之前的执行完了才能执行，这样会先执行数组里的，再执行rev
gulp.task('rev',['css','image','useref'],function(){
    gulp.src(['./release/rev/*.json','./release/index.html'],{base:'./release'})
        .pipe(revCollector())
        .pipe(gulp.dest('./release'))
})
// 但是问题是执行数组里的三个需要时间，但是它们还没执行完，rev就执行了,在上面的构建里加return就可以解决

// 其他任务（api、字体等不需要修改的）
gulp.task('other',function(){
    gulp.src(['./api/*','./public/fonts/*','./public/libs/*','./views/*'],{base:'./'})
        .pipe(gulp.dest('./release'));
})

```

