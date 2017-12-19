---
title: flex实现常用布局
tags: css,flex,布局
notebook: css
---

### 下面例子中公共的css样式

```html
<style>
    * {
        padding: 0;
        margin: 0;
    }
    article {
        min-height: 300px;
        background-color: #108ee9;
    }
    header,footer {
        background-color: #7dbcea;
    }
    aside {
        background-color: #3ba0e9;
    }
    header, footer, article, aside {
        color: #fff;
        min-height: 60px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
```

### Sticky Footer

经典的上-中-下布局。

当页面内容高度小于可视区域高度时，footer 吸附在底部；当页面内容高度大于可视区域高度时，footer 被撑开排在 content 下方。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/277d4658883153d0f616f9aaf64eafdf30483761773d5ce79ac04e4c28244d23143f929d31e50b243747573e5aca9725?pictype=scale&from=30113&version=2.0.0.2&uin=406490508&fname=20171219-1.png&size=1024)

```html
<style>
    body {
        min-height: 100vh;
        display: flex;
        flex-direction: cloumn;
    }
    article {
        flex: auto;
    }
</style>
<body> 
    <header>HEADER</header> 
    <article>CONTENT</article> 
    <footer>FOOTER</footer> 
</body>

```

### Fixed-Width Sidebar

在上-中-下布局的基础上，加了左侧定宽 sidebar。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/21d01862a752d1c204e2fe7644b4cc78af1dc830b53c6fd2c387d86a87e777fe112bfce66c102c275f98b9b61f1b5f26?pictype=scale&from=30113&version=2.0.0.2&uin=406490508&fname=20171219-2.png&size=1024)

```html
<style>
    body {
        min-height: 100vh;
        display: flex;
        flex-direction: cloumn;
    }
    .content {
        flex: auto;
        display: flex;
    }
    .content article{
        flex: auto;
    }
    .content aside {
        flex: none;
        width: 200px;
    }
</style>
<body> 
    <header>HEADER</header> 
    <div class="content"> 
        <aside>ASIDE</aside> 
        <article>CONTENT</article> 
    </div> 
    <footer>FOOTER</footer> 
</body>
```

### Sidebar

左边是定宽 sidebar，右边是上-中-下布局。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/3508fda8ec06885b32d935f2706e5099c7b791ca88631113700d28680f0d7ab042cb5779f0a414b096d68ae66f4ba7a8?pictype=scale&from=30113&version=2.0.0.2&uin=406490508&fname=20171219-3.png&size=1024)

```html
<style>
    body { 
        min-height: 100vh; 
        display: flex; 
    } 
    aside { 
        flex: none; 
        width: 200px;
    } 
    .content { 
        flex: auto; 
        display: flex; 
        flex-direction: column; 
    } 
    .content article { 
        flex: auto; 
    }

</style>

<body> 
    <aside>ASIDE</aside> 
    <div class="content"> 
        <header>HEADER</header> 
        <article>CONTENT</article>
        <footer>FOOTER</footer> 
    </div> 
</body>

```

### Sticky Header

还是上-中-下布局，区别是 header 固定在顶部，不会随着页面滚动。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/baaf00d3c48b7b056e76bd70efea1fb1c09186178baa73b023df48f64227df3c7d705e21b39b379e7cebc47918676ba2?pictype=scale&from=30113&version=2.0.0.2&uin=406490508&fname=20171219-4.png&size=1024)

```html
<style>
    body { 
        min-height: 100vh; 
        display: flex; 
        flex-direction: column; 
        padding-top: 60px; 
    } 
    header { 
        height: 60px; 
        position: fixed; 
        top: 0; 
        left: 0; 
        right: 0; 
        padding: 0; 
    } article { 
        flex: 
        auto; 
        height: 
        1000px; 
    }

</style>
<body> 
    <header>HEADER</header> 
    <article>CONTENT</article> 
    <footer>FOOTER</footer> 
</body>

```

### Sticky Sidebar

左侧 sidebar 固定在左侧且与视窗同高，当内容超出视窗高度时，在 sidebar 内部出现滚动条。左右两侧滚动条互相独立。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/88e36eaa3fb0418f31615dac6a9163be67f8c2014bae8b17c7763c2c78bbfdcf61e17391663aea81a7ba045f81dbba88?pictype=scale&from=30113&version=2.0.0.2&uin=406490508&fname=20171219-5.png&size=1024)

```html
<style>
    body { 
        height: 100vh; 
        display: flex; 
    } 
    aside { 
        flex: none; 
        width: 200px; 
        overflow-y: auto; 
        display: block; 
    } 
    .content { 
        flex: auto; 
        display: flex; 
        flex-direction: column; 
        overflow-y: auto; 
    } 
    .content article { 
        flex: auto; 
    }
    p {
        margin: 20px 0; 
    }

</style>
<body> 
    <aside> 
        ASIDE 
        <p>item</p> 
        <p>item</p> 
        <!-- many items --> 
        <p>item</p> 
    </aside> 
    <div class="content"> 
        <header>HEADER</header> 
        <article>CONTENT</article> 
        <footer>FOOTER</footer> 
    </div> 
</body>

```