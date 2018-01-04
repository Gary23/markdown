---
title: 12、用Proxy进行预处理
tags: ES6,javascript
notebook: ES6
---

Proxy 就是代理的意思。

Proxy 在 ES6 中作用是增强对象和函数的生命周期。相当于于一种钩子函数，只不过是在处理任何对象之前进行的，所以叫做预处理。

es5 中对象的声明和使用：

```js
let obj = {
	add: function(val) {
		return val + 100;
	},
	name: 'tim'
}
console.log(obj.add(100))   // 200
console.log(obj.name)   // tim
```

如果想在对于对象的操作之前做一些操作，那么就要用到 Proxy。

Proxy 声明时传递两个参数，第一个就是对象本身，第二个就是预处理的内容。

预处理有 get set apply 三个操作，其中 get 和 set 是处理对象的属性，apply 是用于处理函数。

### Proxy 的 get 操作

get 就是在得到某一项东西之前预先处理的操作，在获取对象的某项属性时会触发 get 并执行函数，函数接收3个参数：

1. target：就是对象本身

2. key：就是这次获取的对象的 key

3. property：Proxy的原型

```js
let proxyGet = {
	get: function(target, key, property) {
		console.log('come in get');   // 在获取peo.name时会先执行这里
		return target[key];		
	}
}

let pro = new Proxy(obj, proxyGet);

console.log(pro.name);   // tim
```

在上面的例子中，获取 pro.name 时，会先去执行 get 的函数，pro.name 的值是根据这里 return 的信息来确定的，当然 get 方法的 return 并不会真的改变 pro 对象上 name 的属性值，如果 get 中没有 return 则会返回undefined。

### Proxy 的 set 操作

set 就是要改变对象的属性值得时候触发并执行，接收4个参数：

1. target：就是对象本身

2. key：要改变的属性的 key

3. value：要改变的值

4. receiver：这个属性的原始值

```js
let proxySet = {
	set: function(target, key, value, receiver) {
		console.log(` setting ${key} = ${value} `);   // 改变pro.name的值会先执行这里
		return target[key] = value;
	}
}

let pro1 = new Proxy(obj, proxySet);

pro1.name = 'jack';
console.log(pro1.name)  // jack，如果set中没有return则还是tim。
```

在改变 pro.name 的值时，也必须在 set 中 return 改变后的值，如果不 return 对象不会改变的。

### Proxy 的 apply 操作

apply 用于预处理函数，要注意 apply 是个方法，和 set、get 的写法不同。

调用 Proxy 会执行 apply ，接收3个参数：

1. target：函数本身

2. ctx：暂时用不到

3. args：调用 Proxy 时传递的实参。

```js
let target = function(abc) {
	return abc;
}

let handler = {
	apply(target, ctx, args) {
		console.log(target);
		console.log(ctx);
		console.log(args);
		return Reflect.apply(...arguments);
	}
}

let pro2 = new Proxy(target, handler)

console.log(pro2('I am tim'));

```

上面的例子中，`return Reflect.apply(...arguments);` 这是固定的写法，具体的分析将在以后附上。