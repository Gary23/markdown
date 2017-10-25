
## 一个最简单的Vue的例子

Vue的核心是：允许采用简洁的模板语法、声明式的将数据渲染进DOM(与声明式相对应的是命令式)。

首先要创建一个模板，这是html模板(最简单的一种模板)

```html
<div id="app">
    <p v-on:click="clickHandle">{{ message }}</p>
</div>
```

下面是创建Vue的实例，参数是一个选项对象，可以包含数据、模板、挂载元素、方法、声明周期钩子等选项。

```js
var app = new Vue({
    el: '#app',        // 挂载元素
    data: {        // 代理数据,这里所有数据都具有响应的功能，新添加的就没有响应功能。
    message: 'Hello Vue'
    },
    methods: {        // 定义方法，用于执行函数，key:fun的格式
    // 可以把事件处理函数都放在这里
    clickHandle: function(){
        alert('click')
    }
    }
})
```

这样就渲染生成了一个简单的Vue应用，现在数据和DOM已经被绑定到了一起，所有元素都是响应式的。

数据是可以动态的修改的，修改之后页面中的显示也会随之渲染。

```js
app.message = '123'
```

这样页面中的Hello Vue就会变为123。这是利用的Object.delinedProperty中的getter和setter代理数据，监控对数据的操作。

## Vue渲染DOM树的过程

1. 读取html模板

2. 用Vue中的渲染函数，根据html模板的元素生成标签的节点、属性、子节点

3. 根据渲染函数生成一个虚拟的DOM树对象。

4. 将虚拟的DOM树编译为html中的DOM结构，在整个html的DOM结构中，只会改变虚拟DOM树对应的部分，DOM树的其他部分不受影响，但是如果是通过原生js修改的话，会导致整个DOM树重新加载。