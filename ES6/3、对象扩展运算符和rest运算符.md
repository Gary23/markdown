---
title: 3、对象扩展运算和rest运算符
tags: ES6,javascript
notebook: ES6
---

## 对象扩展运算符

下面的例子是对象扩展运算符的写法，在函数中的参数的位置写 `...arg`（...后加任意字符），函数内部就可以用 `arg` 这个数组来获取参数，主要用于不确定参数长度的情况，实际和 `arguments` 的使用很像。

```js
function fun(...arg){
    console.log(arg[0]);
    console.log(arg[1]);
    console.log(arg[2]);
    console.log(arg[3]);
    // 打印 1,2,3,undefined
}

fun(1,2,3);
```

这里虽然代码上只修改了 `arr2`，但是由于 `arr1` 和 `arr2` 用一块内存空间，所以实际上也更改了 `arr1`。

```js
let arr1 = ['a','b','c'];
let arr2 = arr1;
console.log(arr2);  // ["a", "b", "c"]
arr2.push('d');
console.log(arr1);  // ["a", "b", "c", "d"]
```

如果想避免这种情况，需要将 `arr1` 的元素依次赋值给 `arr2`，并且 `arr2` 是一个新数组。es6提供了一种简单的写法。

```js
let arr1 = ['a','b','c'];
let arr2 = [...arr1];
console.log(arr2);  // ["a", "b", "c"]
arr2.push('d');
console.log(arr1);  // ["a", "b", "c"]
console.log(arr2);  // ["a", "b", "c", "d"]
```

`...arr2` 表示将 `arr1` 数组中的元素依次添加到 `arr2` 中，也就是说 `arr2` 是相当于新建一个数组，然后将 `arr1` 中的元素依次添加到新数组中。

## rest运算符

rest运算符的写法和对象扩展运算符的写法相同，使用场景稍有不同。

从示例可以看出，rest运算符适用于知道前面的一部分参数的数量，而又对于后面剩余的参数数量未知的情况。

```js
function fun(first,...arg){
    console.log(first);  // 0
    console.log(arg.length);  // 5

    for(let val of arg){
        console.log(val);  // 1,2,3,4,5
    }
}
fun(0,1,2,3,4,5);
```
