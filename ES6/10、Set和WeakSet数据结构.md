---
title: 10、Set和WeakSet数据结构
tags: ES6,javascript
notebook: ES6
---

## Set

Set 是一种数据结构，内容是数组，最主要的功能是去重。

### Set 声明

```js
let setArr = new Set(['html', 'js', 'css', 'html']);

console.log(setArr);   // Set(3) {"html", "js", "css"}
```

打印的内容是 `{"html", "js", "css"}`，没有打印出重复的 html，这就是 Set 的数据结构，就和 json 一样，都是一种数据结构。

### Set 的增删查

```js
setArr.add('web');
console.log(setArr);  // Set(4) {"html", "js", "css", "web"}
console.log(setArr.has('html'));   // true
console.log(setArr.has('javascript'));   // false
setArr.delete('html');   
console.log(setArr);   // Set(3) {"js", "css", "web"}
setArr.clear();
console.log(setArr);   // Set(0) {}
```

### Set 的输出

用 for...of 的形式遍历输出

```js
for (let item of setArr) {
	console.log(item);   // html  js  css
}
```

用 forEach 的形式遍历输出

```js
setArr.forEach((value) => console.log(value));   // html  js  css
```

### Set 的长度

```js
console.log(setArr.size);  // 3
```

## WeakSet

和 Set 的区别就是 Set 只能存放数组，而 WeakSet 只能存放对象，但是存放的方式不同，不能在 new 的时候直接传入，而是通过 add 添加。

```js
let weakObj = new WeakSet();   // 在这里直接传入对象会报错

let obj1 = {a:'html',b:'js'};

weakObj.add(obj1);

console.log(weakObj);   // {{a: "html", b: "js"}}
```

WeakSet 也是不允许重复值的，但是这里有个坑，接着上面代码来看一下。

```js
let obj2 = {a:'html',b:'js'};

weakObj.add(obj2);

console.log(weakObj);   // {{a: "html", b: "js"},{a: "html", b: "js"}}

let obj3 = obj2;

weakObj.add(obj3);

console.log(weakObj);   // {{a: "html", b: "js"},{a: "html", b: "js"}}
```

这里只添加了 obj2 这个对象而没有添加 obj3，因为 obj1 和 obj2 不是在同一个内存地址，所以这里认为不是重复的对象，而 obj3 和 obj2 用的是同一块地址存储的，所以 obj3 就被认为是重复的无法添加。