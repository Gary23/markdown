---
title: 4、class与style
tags: vue,前端框架
notebook: vue笔记
---

数据绑定一个常见需求是，操作元素的`class`列表，和它的`style`时，因为他们都是属性所以可以用 `v-bind` 处理他们

但是字符串拼接麻烦又易错。因此在`v-bind`用于`class`和`style`时，Vue专门增强了它。表达式的结果类型除了字符串之外，还可以是对象或数组。

# 绑定class

这里class是否为active取决于isActive是否为真
```html
<!--class="active"-->
<div v-bind:class="{ active: isActive }"></div>
```

可以在对象中传入更多属性用来动态切换多个class，此外，v-bind:class指令可以与普通的class属性共存
```html
<!--class="static active",如果为true就是class="static active text-danger"-->
<div class="static" v-bind:class="{ active: isActive, text-danger: hasError }">
</div>
```

通过一个对象获取class名
```html
<!--class="active text-danger"-->
<div v-bind:class="classObject"></div>
```

通过一个数组获取class名
```html
<!--class="active text-danger"-->
<div v-bind:class="[activeClass,errorClass]"></div>
```

上面三种写法在Vue中的数据处理：
```js
var app = new Vue({
    ...
    data: {
        isActive: true, 
        hasError: false,  
        activeClass: 'active',
        errorClass: 'text-danger',
        classObject: {    
            active: true,
            text-danger: true
        }
    },
    computed:{
        classObject:function(){
            return {
                active:this.isActive && !this.error,
            }
        }
    }
})
```

需要注意的是，`class`中如果包括用`-`连接的类名。一定要写为字符串的形式。

# 绑定style

`v-bind:style`的语法十分直观，看着非常像`css`，但其实是一个`js`对象。`css`属性名可以用驼峰式，或者配合引号的短横分隔命名。另外对于css3的前缀，vue会自动添加。

最直接的方式
```html
<!--color: red; font-size: 30px;-->
<div v-bind:style="{color:activeColor,fontSize:fontSize + 'px'}"></div>
```

直接绑定一个对象通常更好,也可以将多个对象用在一个元素上
```html
<!--color: red; font-size: 13px;-->
<div v-bind:style="styleObject"></div>
```

在Vue中的数据处理
```js
var app = new Vue({
    ...
    data:{
        activeColor:'red',
        fontSize:30,
        styleObject:{
            color:'red',
            fontSize:'13px'
        }
    }
})
```
