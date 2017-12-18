---
title: javascript（JSON）
tags: javascript,JSON
notebook: javascript
---

### JSON.stringify()

用于把一个json格式的对象转为字符串。相当于将一个对象序列化的过程。

#### 直接使用

```js
var obj = [
    {
        name:'Jansen1', age:18, sex:'boy'
    },
    {
        name:'Jansen1', age:18, sex:'boy'
    },
    {
        name:'Jansen1', age:18, sex:'boy'
    }
];

JSON.stringify(obj);

```
输出结果：
`"[{"name":"Jansen1","age":18,"sex":"boy"},{"name":"Jansen1","age":18,"sex":"boy"},{"name":"Jansen1","age":18,"sex":"boy"}]"`

可以看到，通过该操作就可以把obj序列化为字符串啦。

#### 第二个参数 replacer

JSON.stringify() 方法不仅可以序列化字符串，还可以根据条件进行序列化。

当参数为一个数组的时候，则包含在这个数组中的属性名才会被序列化成字符串。

```js
JSON.stringify(obj, ['name','age']);
```

输出结果：
`"[{"name":"Jansen1","age":18},{"name":"Jansen1","age":18},{"name":"Jansen1","age":18}]"`

当参数为一个函数的时候，会传入每个成员的键和值，被序列化的值的每个属性都会经过该函数的转换和处理。被序列化的值也就是函数的返回值。

```js
JSON.stringify(obj, function(key,val){
    if (key !== 'sex') {
        return val;
    }
})
```

输出结果:
`"[{"name":"Jansen1","age":18},{"name":"Jansen1","age":18},{"name":"Jansen1","age":18}]"`

#### 第三个参数 space

文本添加缩进、空格和换行符,如果space是个数字，则代表有多少空格，最大值是10，若小于1则表示没有空格。

```js
JSON.stringify(obj,null,4);
```
输出结果:
```
"[
    {
        "name": "Jansen1",
        "age": 18,
        "sex": "boy"
    },
    {
        "name": "Jansen1",
        "age": 18,
        "sex": "boy"
    },
    {
        "name": "Jansen1",
        "age": 18,
        "sex": "boy"
    }
]"
```

输出的代码按照层级很清楚，每个层级是4个空格。

### JSON.parse()

JSON.parse只拥有两个参数，第一个就是序列化后的字符串，第二个就是筛选对象。

现在如果再有这样的需求，把一个JSON对象下的所有属性为sex中的boy替换为male，girl替换为female，age大于20的age条目不显示，那么就很好处理啦。

```js
var testJSON = [
    { 
        "name": "Jansen1", "age": 18, "sex": "boy" 
    }, 
    { 
        "name": "Jansen2", "age": 2, "sex": "boy"
    }, 
    { 
        "name": "Jansen3", "age": 19, "sex": "girl" 
    }, 
    { 
        "name": "Jansen4", "age": 22, "sex": "boy" 
    }, 
    { 
        "name": "Jansen5", "age": 22, "sex": "girl" 
    }
];

var newJSON = JSON.parse(JSON.stringify(testJSON, function(key, val) {
    if (key === 'sex') {
        return val === 'boy' ? 'male' : 'female';
    }
    if (key === 'age' && val < 20) {
        return val;
    } else if (key !== 'age') {
        return val;
    }
}, 4))

```

输出结果:

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/3ac6d8b64ce25629f340c320d3198e00afce0bcbf9433b448374b18e52a41cba6003e4496e9329adc6bdada2bb58e7cd?pictype=scale&from=30113&version=2.0.0.2&uin=406490508&fname=20171218-9.PNG&size=1024)