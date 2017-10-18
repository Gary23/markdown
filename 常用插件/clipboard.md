
---

title: clipboard
date: 2017-08-30 14:17:04
tags: 常用插件

---


这里传入的参数是复制按钮的选择器。

```js
// 一键复制
var clipboard = new Clipboard('#copy');
```

复制成功的回调函数：

```js
// 复制成功
clipboard.on('success', function(e) {
    // 这里可以显示复制成功的提示
});
```

复制失败的回调函数：

```js
// 复制失败
clipboard.on('error', function(e) {
    // 复制失败的提示，复制失败时可以让用户手动复制
});
```

根据之前的测试，安卓和ios上都没遇到什么问题，安卓都是6.0以上的机器，ios都是8.0以上，手上并没有旧机器测试，总之不能复制时还是可以给出提示让其手工全选复制的。

