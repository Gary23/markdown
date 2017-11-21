
# DOM操作的一些常用属性和方法

元素节点的nodeType是1

属性节点的nodeType是2

文本节点的nodeType是3

## 节点的获取

childNodes：获取某个元素下的所有子节点，包含文本节点和元素节点。

children：获取某个元素下的所有元素子节点。

nextElementSibling：获取元素的下一个兄弟元素节点。

previousElementSibling：获取元素的上一个兄弟元素节点。

firstElementChild：获取元素下的第一个元素子节点。

lastElementChild：获取元素下的第一个元素子节点。

parentNode：获取元素的父节点。

nodeValue：查看节点的属性值。

nodeName：查看节点的属性名。

nodeType：查看节点的类型。

## 属性的获取和设置

offsetParent：获取最近有定位属性的祖先节点。如果没有直接获取body。

offsetLeft：左外边框到有定位的最近的父级元素的内边框的距离。不带px单位。父级没有带定位的就是到body的距离。

offsetTop：上外边框到有定位的最近的父级元素的内边框的距离。不带px单位。父级没有带定位的就是到body的距离。

getAttribute()：获取元素的行内设置的属性值。参数是属性名。

setAttribute()：设置元素的行内设置的属性值。参数是属性名和属性值。

removeAttribute()：删除元素的行内设置的属性值。参数是属性名。

getBoundingClientRect()：  当前元素距离body的四个方向的距离和宽高的对象。获取的值会随着页面滚动位置而改变。值是不带单位的。

clientWidth：获取元素不计算边框的宽度。`document.documentElement.clientWidth`是浏览器窗口可是区域的宽度。

clientHeight：获取元素不计算边框的高度。`document.documentElement.clientHeight`是浏览器窗口可是区域的高度。

offsetWidth：获取元素计算边框的宽度。

offsetHeight：获取元素计算边框的高度。

## 操作节点

document.createElement()：创建一个元素节点，参数是元素的名称，字符串格式。

appendChild()：将一个元素节点添加到另一个元素节点的最后，格式为`父节点.appendChild(要添加的节点)`。

insertBefore()：将一个元素节点添加到一个元素节点的指定子节点的前面。格式为`父节点.insertBefore(要添加的节点,添加到这个节点之前)`，假如第二个参数是不存在的，节点将会添加到父节点的最后。

removeChild()：删除一个指定的元素子节点，如果指定的节点找不到会报错。格式为`父节点.removeChild(要删除的节点)`。

replaceChild()：替换一个元素节点，格式是`父节点.replaceChild(要添加的节点,被替换的节点)`。

cloneNode()：克隆一个元素节点，默认只会克隆节点本身，不会克隆它的子节点，如果要将这个节点下的所有子节点也都克隆需要传参数true，格式为`要克隆的节点.cloneNode(true)`。

> appendChild()、insertBefore()、replaceChild()在操作一个已有元素时，是将已有元素移动，而不是复制一份进行操作。

## 操作表格

对于表格的操作javascript提供了一些简单的获取方式。

假设table是已经获取到的表格元素。

table.tHead：获取表格头部。

table.tFoot：获取表格底部。

table.tBodies：获取表格主体。

table.tBodies[n](tHead、tFoot).rows[n]：获取表格的行，就是tr。

table.tBodies[n](tHead、tFoot).rows[n].cells[n]：获取单元格，就是td。