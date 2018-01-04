---
title: 9、Symbol在对象中的作用
tags: ES6,javascript
notebook: ES6
---

### Symbol

Symbol 是 es6 中新增加的数据类型。是原始数据类型。

Symbol 的声明：

```js
let s = Symbol();
console.log(typeof s);   // Symbol

let skill = Symbol('web');
console.log(skill);   // Symbol(web)   Symbol类型
console.log(skill.toString());   // Symbol(web)  这里转为了字符串
```

### Symbol 在对象中的应用

Symbol 在 node 中的用处比较大，在页面中的用处不是很大。

先来看看在对象中对 key 的构建：

```js
let key = Symbol();
let key1 = Symbol();

let obj = {
	[key]: 'html',
	[key1]: 'js'
}

console.log(obj);   // {Symbol(): "web"}
console.log(obj[key]);    // html
console.log(obj[key1]);    // js
```

Symbol 构建 key 也不能使用 obj.key 来获取 value，必须用 obj[key]。

Symbol 在写页面时的应用主要就是对于对象元素的保护作用。

```js
let obj1 = {
	name: 'tim',
	skill: 'web',
	age: 18
}

console.log(obj1);   // {name: "tim", skill: "web", age: 18}

for (let k in obj1) {
	console.log(obj1[k]);  // 依次打印 tim  web  18
}
```

这时如果我不想让对象中的某个数据被遍历出来，要对其保护，就可以使用 Symbol

```js
let obj2 = {
	name: 'tim',
	skill: 'web'
}

let age = Symbol();

obj2[age] = 18;

console.log(obj2);   // {name: "tim", skill: "web", Symbol(): 18}

for (let k in obj2) {
	console.log(obj2[k]);  // 只打印 tim  web
}
```
