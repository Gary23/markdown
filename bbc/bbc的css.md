# 全局css样式

1. `html` 的背景为 `background: #FFFFFF`

2. `bod` 有默认的 `font-family`，`font-size`，`line-height`

3. `a` 有默认的 color 并且不显示下划线

4. `.wrap` 类用于固定宽度的容器，宽度为950px的版心

5. `.wrap-fluid` 类用于 100% 宽度，占据全部视口的容器，宽度为1200px的版心

# 栅格系统

## 栅格容器

1. 栅格分为最多16列

2. 暂定两种宽度的容器 `.wrap` 和 `.wrap-lg`，分别是950px和1200px。

3. 你的内容应当放置于“列（column）”内，并且，只有“列（column）”可以作为“行（row）”的直接子元素。

4. 类似 `.row` 和 `.col-4` 这种预定义的类，可以用来快速创建栅格布局。

5. 如果一“行（row）”中包含了的“列（column）”大于 16，多余的“列（column）”所在的元素将被作为一个整体另起一行排列。

6. 如果一个元素中使用了多个类，预定义类 `.col-*` 必须放在首位，否则一部分样式应用不上。

7. 在 `.wrap` 下，列要使用 `.col-` ,列宽50间距10。在 `.wrap-lg` 下，列要使用 `.col-lg-` ,列宽75间距10

## 列偏移

1. 使用 `.offset-*` 类可以将列向右侧偏移，通过增加元素左侧 `margin` 实现的。

2. 在 row 内第一列设置没有作用。

3. 每个 `offset-1` 的宽度和 `col-1` 是相同的。

## 列嵌套

如果要在 col 内部再去嵌套列，可以通过添加一个新的 `.row` 元素和一系列 `.col-*` 元素到已经存在的 `.col-*` 元素内。被嵌套的行（row）所包含的列（column）的个数不能超过 16。

```html
<section class="wrap">
    <div class="row">
        <div class="col-16">
            <div class="row">
                <div class="col-4">col-4</div>
                <div class="col-8">col-8</div>
                <div class="col-4">col-4</div>
            </div>
        </div>
    </div>
</section>
```

# 排版

## 页面主体

1. 标题样式：HTML中提供了 `.h1` 到 `.h6` 类，为的是给内联（inline）属性的文本赋予标题的样式。

2. 默认格式：全局字体大小为 12px，行高设置为 1.5。这些属性直接赋予 `<body>` 元素和所有段落元素。另外，`<p>` 元素还被设置了 1/2 行高 \(9px\) 的底部外边距。

3. 突出文字：通过添加 `.lead` 类可以让段落突出显示。

4. 标记文字：一般使用 `<mark>` 标签来标记文本，显示高亮效果，也可以使用 `.mark` 。

5. 删除字：对于被删除的文本使用 `<del>` 标签。

6. 无用字：对于没用的文本使用 `<s>` 标签。

7. 插入字：额外插入的文本使用 `<ins>` 标签。

8. 下划线字：为文本添加下划线，使用 `<u>` 标签，一般表示专有名词或拼写错误的单词。

9. 小号文字：使用 `<small>` 标签包裹，其内的文本将被设置为父容器字体大小的 85%，也可以使用 `.mark` 。

10. 着重字：通过 `<strong>` 标签增加 `font-weight` 值强调一段文本。

11. 斜体字：用 `<em>` 标签强调一段文本。

12. 列表：给 `<ul>` 元素增加  `.list-inline` 内部的 `<li>` 会横向排列

## 对齐

通过文本对齐类，可以简单方便的将文字重新对齐。

```html
<p class="text-left">左对齐文本。</p>
<p class="text-center">居中对齐文本。</p>
<p class="text-right">右对齐文本。</p>
<p class="text-justify">两端对齐</p>
<p class="text-nowrap">不折行文本</p>
```

# 表格

1. 基本实例：为任意 `<table>` 标签添加 `.table` 类可以为其赋予基本的样式：少量的内补（padding）和水平方向的分隔线。

2. 隔行变色：通过 `.table-striped` 类可以给 `<tbody>` 之内的每一行增加斑马条纹样式。

3. 表格的边框：添加 `.table-bordered` 类为表格和其中的每个单元格增加边框。

4. 鼠标悬停：通过添加 `.table-hover` 类可以让 `<tbody>` 中的每一行对鼠标悬停状态作出响应。

5. 状态类：通过这些状态类可以为行或单元格设置颜色：`.selected`当前被选中的行、 `.active`鼠标悬停在行上时所设置的颜色、 `.success`标识成功或积极的动作、 `.info`标识普通的提示信息或动作、 `.warning`标识警告或需要用户注意、 `.danger`标识危险或潜在的带来负面影响的动作。这些是设置在 `<tr>` 标签上的

# 表单

## 基本实例

1. 单独的表单控件会被自动赋予一些全局样式。

2. 一个相关完整的表单项组以 `.form-row` 为类名，以获得整洁的排列。

3. 最后一项表单项组可以加 `.form-row-last` 类（可选），以去除底部的外边距。

4. 标题以 `<label>` 包裹，并设置 `.form-label` 类以使标题右对齐，为增大表单的焦点区域为 `<label>` 增加 `for` 属性，并以 `for_` 开头对应表单元素的 id 属性。

5. 紧接着 `.form-act` 元素，用以包裹表单元素。

6. 所有设置了 `.input-block` 类的 `<input>`、`<textarea>` 和 `<select>` 元素都将被默认设置宽度属性为 `width: 100%;`。

```html
<form action="" method="post" role="form">
    <div class="form-row">
        <label for="for_username" class="form-label">用户名：</label>
        <span class="form-act">
            <input type="text" name="" value="" id="for_username">
        </span>
    </div>
    <div class="form-row">
        <label for="for_email" class="form-label">邮箱：</label>
        <span class="form-act">
            <input type="email" name="" value="" id="for_email">
        </span>
    </div>
    <div class="form-row">
        <label for="for_input_file" class="form-label">上传文件</label>
        <span class="form-act">
            <input type="file" id="for_input_file">
        </span>
    </div>
    <div class="form-row-last">
        <label class="form-act">
            <input type="checkbox">复选框
        </label>
    </div>
</form>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/5dc63c6d9e2e836997c9956afb54292a051d454622abab32e95e51cfe008ed0763eba0d73f9cd23acac1846135515391?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-40.JPG&size=1024)

## 纵向表单

纵向表单是指标题和表单控件之间分行显示，此模式只需要在 `<form>` 标签加类名 `.form-vertical` 即可，其它结构与基本实例保持一致。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/92fafa60559ad1aa0e9942906154875fde8c7512f90bbce6aca55faba599edb885a697af2b9041644f5406fdbcbcca30?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-45.JPG&size=1024)

## 栅格化表单

把基本表单与栅格布局结合在一起，创建出符合栅格化标准的表单，需要对类名做一些改变。

```html
<form action="" method="post" role="form">
    <div class="form-row row">
        <label for="for_username" class="form-label col-2">用户名：</label>
        <span class="col-5">
            <input type="text" name="" value="" id="for_username">
        </span>
    </div>
    <div class="form-row row">
        <label for="for_email" class="form-label col-2">邮箱：</label>
        <span class="col-5">
            <input type="email" name="" value="" id="for_email">
        </span>
    </div>
    <div class="form-row row">
        <label for="for_input_file" class="form-label col-2">上传文件：</label>
        <span class="col-5">
            <input type="file" id="for_input_file">
        </span>
    </div>
    <div class="form-row-last row">
        <label for="" class="form-label col-2"></label>
        <label class="col-5">
            <input type="checkbox">复选框
        </label>
    </div>
</form>
```

`<label>`元素的 `.form-label` 和表单容器的 `.form-act` 类名可以去掉可以保留，建议 `.form-label` 不要去掉。

在每个 `.form-row` 类名的元素上增加类名 `.row`，在 `<label>` 和表单的容器上增加 `col-*` 的类名。

也可以选择只对输入框有效果：

```html
<div class="form-row">
    <label for="for_username" class="form-label">用户名：</label>
    <span class="form-act row input-row">
        <input type="text" name="" value="" id="for_username" class="col-5">
    </span>
</div>
```

只需要在表单的容器上增加 `. row` 和 `.input-row` 类名，在表单元素上增加 `col-*` 。

## 被支持的控件

## 输入框

1. 包括大部分表单控件、文本域控件、所有html5类型的输入控件。只有正确设置了 `type` 属性的输入控件才能被赋予正确的样式。

2. 输入框焦点：某些表单控件的默认 `outline` 样式移除，然后在 `:focus` 状态下改变 `border-color`。

3. 被禁用的输入框：为输入框设置 `disabled` 属性可以防止用户输入，并能对外观做一些修改，使其更直观。

4. 只读输入框：为输入框设置 `readonly` 属性可以禁止用户输入，并且输入框的样式也是禁用状态。

## 多选框和单选框

设置了 `disabled` 属性的单选或多选框都能被赋予合适的样式。对于一组多选或单选框可以用 `.radio`、`.radio-inline`、`.checkbox`、`.checkbox-inline` 类包裹。

```html
<div class="checkbox">
    <label for="">
        <input type="checkbox" value="option1">
        选项1,请确认
    </label>
</div>
<div class="checkbox">
    <label for="">
        <input type="checkbox" value="option2" disabled>
        选项2,禁止选取
    </label>
</div>
<div class="radio">
    <label for="">
        <input type="radio" value="option1" checked name="radios">
        选项1,默认选择
    </label>
</div>
<div class="radio">
    <label for="">
        <input type="radio" value="option2" name="radios">
        选项,请确认
    </label>
</div>
<div class="radio">
    <label for="">
        <input type="radio" value="option3" name="radios" disabled>
        选项1,禁止选取
    </label>
</div>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/d9945bc0b8241f68a28945e94d2cb0e7f09a18ac8dc9cd0f2414296a9d1c3e994dbbae3526be28d9db69218af3c34c97?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-46.JPG&size=1024)

```html
<label for="" class="checkbox-inline">
    <input type="checkbox" id="inlineCheckbox1" value="option1">选项1
</label>
<label for="" class="checkbox-inline">
    <input type="checkbox" id="inlineCheckbox2" value="option2">选项2
</label>
<label for="" class="checkbox-inline">
    <input type="checkbox" id="inlineCheckbox3" value="option3">选项3
</label>
<br>
<br>
<label for="" class="radio-inline">
    <input type="radio" name="inlineRadios" id="inlineCheckbox1" value="option1">选项1
</label>
<label for="" class="checkbox-inline">
    <input type="radio" name="inlineRadios" id="inlineCheckbox2" value="option2">选项2
</label>
<label for="" class="checkbox-inline">
    <input type="radio" name="inlineRadios" id="inlineCheckbox3" value="option3">选项3
</label>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/de4360b8d68d532eb06581457a5fabc817ec430b898ab1a6c21c2e9364324af5ed52efc1cddf0bb5fc85d79819a3afca?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-47.JPG&size=1024)

## 下拉列表框

使用默认选项或添加 multiple 属性可以同时显示多个选项。

```html
<select class="input-xln">
    <option>选项1</option>
    <option>选项2</option>
    <option>选项3</option>
    <option>选项4</option>
    <option>选项5</option>
</select>
<br>
<br>
<select multiple class="input-xln">
    <option>选项1</option>
    <option>选项2</option>
    <option>选项3</option>
    <option>选项4</option>
    <option>选项5</option>
</select>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/21fa4273bfa9fd87ae59f3fc0e1c4d71c6d454a9c4bdd078c9116f46556d94e9ddc769ed84e645ef540f6da360b6e255?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-48.JPG&size=1024)

## 状态校验

B2B2C 对表单控件的校验状态，如 `error` 和 `success` 状态，都定义了样式。使用时，添加 `.has-error` 或 `.has-success` 类到这些控件的父元素即可。

任何包含在此元素之内的标题，输入框和信息提示都将接受这些校验状态的样式。

```html
<div class="form-row has-success">
    <label for="for_inputsuccess" class="form-label">输入正确</label>
    <div class="form-act">
        <input type="text" id="for_inputsuccess">
        <span class="icon-checkmark caution">通过</span>
    </div>
</div>

<div class="form-row has-error">
    <label for="for_inputerror" class="form-label">输入错误</label>
    <div class="form-act">
        <input type="text" id="for_inputerror">
        <span class="icon-alert caution">此项必填</span>
    </div>
</div>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/9fd16563fde4cf170d5153011dceec57809d8204f295e10c238d1355ece952c7d519f40f97c4af2cf44c5219cb533869?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-49.JPG&size=1024)

```html
<div class="has-success">
    <div class="checkbox-inline">
        <label for="">
            <input type="checkbox" class="x-chcek" id="for_checkboxsuccess" value="option1">
            复选框通过验证
        </label>
    </div>
    <span class="icon-checkmark caution">通过</span>
</div>

<div class="has-error">
    <div class="checkbox-inline">
        <label for="">
            <input type="checkbox" class="x-check" id="for_checkboxerror" value="option1">
            复选框验证失败
        </label>
    </div>
    <span class="icon-alert caution">此项必填</span>
</div>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/1aac524df6a9d9568cb70116b198c95e2b72392d05004d1c510532c97867ba7eec0489852b23e4955f372cb0a42bcbb9?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-50.JPG&size=1024)

## 输入框图标

在需要为输入框内添加图标时，常规做法是为其父元素添加 `.has-figure` 类并给相应的图标添加 `.input-figure` 类。

```html
<div class="form-row">
    <label for="for_input_user" class="form-label">输入用户名：</label>
    <span class=" has-figure col-5">
        <input type="text" class="input-block" id="for_input_user">
        <i class="icon-user input-figure"></i>
    </span>
</div>

<div class="form-row">
    <label for="for_input_pass" class="form-label">密码：</label>
    <span class=" has-figure col-5">
        <input type="password" class="input-block" id="for_input_pass">
        <i class="icon-lock input-figure"></i>
    </span>
</div>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/44ebed2e4469de62730dc515f62e2d6dbc5092e1193493d25e41c2ce79380f4f20a0eb14062cf3aa012ae66a98f093a3?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-51.JPG&size=1024)

还可以针对校验状态为输入框添加额外的图标。只需为其父元素添加 `.has-figure` 类并给相应的图标添加 `.input-figure` 类即可。

```html
<div class="form-row has-error has-figure">
    <label class="form-label" for="for_inputerror">输入错误</label>
    <span class="has-figure col-5">
        <input type="text" class="input-block caution-input" id="for_inputerror">
        <span class="icon-alert input-figure"></span>
    </span>
</div>
<div class="form-row has-success has-figure">
    <label class="form-label" for="for_inputsuccess">输入正确</label>
    <span class="has-figure col-5">
        <input type="text" class="input-block" id="for_inputsuccess">
        <span class="icon-checkmark-a input-figure"></span>
    </span>
</div>
```

## 控件尺寸

通过 `.input-lg` 类似的类可以为控件设置高度，通过 `.col-*` 或 `.input-ln` 类似的类可以为控件设置宽度（长度）。

### 高度尺寸

创建大一些或小一些的表单控件以匹配按钮尺寸。

```html
<input class="input-lg" type="text" placeholder=".input-lg" name="" value="">
<input type="text" placeholder="默认" name="" value="">
<input class="input-sm" type="text" placeholder=".input-sm" name="" value="">
<select name="" id="" class="input-lg"></select>
<select name="" id="" ></select>
<select name="" id="" class="input-sm"></select>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/33676f7d52cb225b01707db0993e80cb132555c296c86da3d83fd577e3e833a74a2d783c798bd9a2ce958c62b60a00eb?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-52.JPG&size=1024)

### 调整列（column）尺寸

用栅格系统中的列（column）包裹输入框或其任何父元素，都可很容易的为其设置宽度。

```html
    <div class="row input-row">
        <input type="text" class="col-3" placeholder=".col-3">
        <input type="text" class="col-4" placeholder=".col-4">
        <input type="text" class="col-5" placeholder=".col-5">
    </div>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/721499e45b87b464ae090fd7dc863ef2bc72d946d96b127f0b3f594366b9518888df320ac0092cec95a57623b689f6b9?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-53.JPG&size=1024)

### 调整输入框的长度

为输入框加入 `.input-ln` 类似的类以调节输入框的长度。

```html
<input type="text" class="input-xxst" placeholder=".input-xxst">
<br>
<input type="text" class="input-xst" placeholder=".input-xst">
<br>
<input type="text" class="input-st" placeholder=".input-st">
<br>
<input type="text" class="input-me" placeholder=".input-me">
<br>
<input type="text" class="input-ln" placeholder=".input-ln">
<br>
<input type="text" class="input-xln" placeholder=".input-xln">
<br>
<input type="text" class="input-xxln" placeholder=".input-xxln">
<br>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/0337e4e5dba61e85145905a52d4fdad6902ac4c24c950b9310f6ca4a33ba63b9e5a30f4465a47148add6a8de8362fc15?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-54.JPG&size=1024)

## 辅助文本

针对表单控件的块\(block\)级辅助文本

```html
<span class="help-block">表单项的帮助提示信息</span>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/8b4d3f399d7ec9c0c3e4afca6465406afcbe43998c876010db8d096536b01c6e48309ee327b71ff19bb5829bf1509738?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-55.JPG&size=1024)

## 输入框组

针对一些特殊功能或组件，定义了一些输入框组合，以 `.input-comb` 作为父容器，在内部加入 `.input-comb-addon` 元素作为功能图标，然后放入内容。

```html
<div class="input-comb">
    <input type="text" class="input-me">
    <span class="input-comb-addon"><i class="icon-calendar"></i></span>
</div>
<br>
<div class="input-comb">
    <span class="input-comb-addon">@</span>
    <input type="text" class="input-me">
</div>
<br>
<div class="input-comb">
    <span class="input-comb-addon">¥</span>
    <input type="text" class="input-me">
    <span class="input-comb-addon"></span>
</div>
<br>
<div class="input-comb input-comb-lg">
    <span class="input-comb-addon">¥</span>
    <input type="text" class="input-st">
    <span class="input-comb-addon">.00</span>
</div>
<br>
<div class="input-comb">
    <input type="search" class="input-ln">
    <button type="button" class="btn-input-comb-btn"><span><span>搜索</span></span></button>
</div>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/be02d9b84a9f0f08b34fdaf2915c2df30232903c47e0788a48537f80e36fef2546d791e17c0ed1ef3ba801d74f57317e?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-56.JPG&size=1024)

# 按钮

## 预定义样式

使用下面列出的类可以快速创建一个带有预定义样式的按钮。

```html
<button type="button" class="btn">
    <span><span>确定</span></span>
</button>

<a href="" class="btn">
    <span><span>查看</span></span>
</a>

<button type="button" class="btn btn-flat">
    <span><span>确定</span></span>
</button>

<a href="" class="btn btn-flat">
    <span><span>查看</span></span>
</a>

<button type="button" class="btn btn-simple">
    <span><span>确定</span></span>
</button>

<a href="" class="btn btn-simple">
    <span><span>查看</span></span>
</a>

<br><br>

<button type="button" class="btn btn-primary">
    <span><span>提交</span></span>
</button>

<a href="" class="btn btn-primary">
    <span><span>提交</span></span>
</a>

<button type="button" class="btn btn-success">
    <span><span>成功</span></span>
</button>

<a href="" class="btn btn-success">
    <span><span>成功</span></span>
</a>

<button type="button" class="btn btn-info">
    <span><span>信息</span></span>
</button>

<a href="" class="btn btn-info">
    <span><span>信息</span></span>
</a>

<button type="button" class="btn btn-warning">
    <span><span>警告</span></span>
</button>

<a href="" class="btn btn-warning">
    <span><span>警告</span></span>
</a>

<button type="button" class="btn btn-danger">
    <span><span>危险</span></span>
</button>

<a href="" class="btn btn-danger">
    <span><span>危险</span></span>
</a>

<br><br>

<button type="button" class="btn btn-caution">
    <span><span>到货通知</span></span>
</button>

<a href="" class="btn btn-caution">
    <span><span>到货通知</span></span>
</a>

<button type="button" class="btn btn-link">
    <span><span>继续</span></span>
</button>

<button type="button" class="btn btn-import">
    <span><span>去付款</span></span>
</button>

<a href="" class="btn btn-import">
    <span><span>去付款</span></span>
</a>

<button type="button" class="btn btn-major">
    <span><span>加入购物车</span></span>
</button>

<a href="" class="btn btn-major">
    <span><span>加入购物车</span></span>
</a>

<button type="button" class="btn btn-caution">
    <span><span>到货通知</span></span>
</button>

<a href="" class="btn btn-caution">
    <span><span>到货通知</span></span>
</a>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/7fb6a171c449446bf543f62208c7ebeb6ab63803a09ffe38383595d9ea5aa522ecf34aa3f907638713df81b93f4c6297?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-57.JPG&size=1024)

## 尺寸

需要让按钮具有不同尺寸可以使用 `.btn-sm`、`.btn-lg` 或 `.btn-xl` 可以获得不同尺寸的按钮。

```html
<button type="button" class="btn btn-simple btn-sm">
    <span><span>清空购物车</span></span>
</button>

<a href="" class="btn btn-simple btn-sm">
    <span><span>继续购物</span></span>
</a>

<button type="button" class="btn btn-simple btn-lg">
    <span><span>清空购物车</span></span>
</button>

<a href="" class="btn btn-simple btn-lg">
    <span><span>继续购物</span></span>
</a>

<button type="button" class="btn btn-simple btn-xl">
    <span><span>清空购物车</span></span>
</button>

<a href="" class="btn btn-simple btn-xl">
    <span><span>继续购物</span></span>
</a>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/33245aa40b95a99b912e140e481a2440056a958b7e7838f04fef747ada50b3b409bf269f9a59db655a2458e5054f6d3b?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-58.JPG&size=1024)

> 满屏按钮： `.btn-block` 类可以将按钮设为父元素100%的宽度。  
> 圆角按钮： `.btn-rounded` 类来为按钮增加圆角效果。  
> 禁用按钮： `.disabled` 类可以让样式变灰，但是ie9以下的版本比较难看。

# 辅助类

## 文本颜色

通过各种不同颜色的文本来表达不同的语义，你可以添加 `.text-*` 类来达到此效果。

```html
<p class="text-muted">一篇文档用text-muted类</p>
<p class="text-success">一篇文档用text-success类</p>
<p class="text-info">一篇文档用text-info类</p>
<p class="text-warning">一篇文档用text-warning类</p>
<p class="text-danger">一篇文档用text-danger类</p>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/80405562a36ec773a97faa9d42d25a4d8a84c4cbd8a97289ba05dcf5adfdf06d414e435fe7c5d7be26233bb4f84a83f0?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-59.JPG&size=1024)

## 背景颜色

类似于文本颜色类，你也可以通过添加不同的 `.bg-*` 类来表达不同的语义。\(PS:不知道为何实际css中设置仍然是前景色\)

```html
<p class="bg-yellow">文本的背景颜色bg-yellow类</p><br>
<p class="bg-alert">文本的背景颜色bg-alert类</p><br>
<p class="bg-success">文本的背景颜色bg-success类</p><br>
<p class="bg-info">文本的背景颜色bg-info类</p><br>
<p class="bg-warning">文本的背景颜色bg-warning类</p><br>
<p class="bg-danger">文本的背景颜色bg-danger类</p><br>
<p class="bg-error">文本的背景颜色bg-error类</p><br>
<p class="bg-selected">文本的背景颜色bg-selected类</p><br>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/f565ce154a178efce9673f36c0c7c982323517ec54d5d2258a2988695886be294d60e12c58fe88cd4364072349693fcf?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-60.JPG&size=1024)

## 关闭和三角符号

通过使用一个象征关闭的图标，可以让模态框和警告框消失。

通过使用三角符号可以指示某个元素具有下拉菜单的功能。注意，向上弹出式菜单中的三角符号是反方向的。

```html
<button type="button" class="close">
    <span aria-hidden="true">&times;</span><span class="hide">关闭</span>
</button>

<span class="caret"></span>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/25f65aa6e4c0512a9299289114eee83c92bf460be7c9cab1438c00ef938e83bbf31c22cf295c86490f272e814e231a97?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-61.JPG&size=1024)

## 浮动

左浮动和有浮动使用的类名，内部都使用了`!important`。

清除浮动有两种方式：第一种是在父元素加 `.clearfix` 类，第二种是在后方元素加入 `.clear` 元素。

```html
<div class="clearfix">
    <div class="pull-left">...</div>
    <div class="pull-right">...</div>
</div>
<div class="clear"></div>
```

## 显示隐藏内容

对于元素的显示和隐藏分别使用 `.show` 和 `.hide` 类切换。也加入了 `!important`。请注意它们只适合块级元素的切换。

对于元素是否可见，还可以使用 `.visible` 和 `.hidden` 来实现，区别是它们会继续占用原来的位置和大小。

```html
<div class="show">...</div>
<div class="hide">...</div>
<div class="visible">...</div>
<div class="hidden">...</div>
```

## 图像占位文本

利用 .text-hide 类隐藏文本内容，以便用图像替换。

```html
<h1 class="text-hide">自定义标题</h1>
```

# 路径导航

在一个带有层次的导航结构中标明当前页面的位置。各路径间的分隔符通过 CSS 的 :before 生成，无需再次添加。

```html
<ol class="breadcrumb">
  <li><a href="#">首页</a></li>
  <li><a href="#">商品列表</a></li>
  <li class="active">商品品牌</li>
</ol>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/cb918c9f0890d8ff993c38973969510de4fd2d208807ba1d1c0e2915230763d7be14acb0097d1d657f14a9fc912a8256?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-62.JPG&size=1024)

# 分页

带有展示页码的分页组件，或者可以使用简单的翻页组件。

## 标准的分页

```html
<div class="pager">
  <span class="flip prev disabled">&lsaquo;</span>
  <a href="#" class="flip">1</a>
  <a href="#" class="flip">2</a>
  <a href="#" class="flip active">3</a>
  <span class="ellipsis">...</span>
  <a href="#" class="flip">4</a>
  <a href="#" class="flip">5</a>
  <a href="#" class="flip next">&rsaquo;</a>
</div>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/b1e0275e62279faec35a77b3a0b4286e682327bb1f496ff0c4b0e871473cdb0a520b7dbd3505e0d5348e953e3f69f202?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-63.JPG&size=1024)

## 更小的分页

加入 `.page-sm` 就会得到更小尺寸的分页

```html
<div class="pager pager-sm">
  <span class="flip prev disabled">&lsaquo;</span>
  <a href="#" class="flip">1</a>
  <a href="#" class="flip">2</a>
  <a href="#" class="flip active">3</a>
  <span class="ellipsis">...</span>
  <a href="#" class="flip">4</a>
  <a href="#" class="flip">5</a>
  <a href="#" class="flip next">&rsaquo;</a>
</div>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/3009f86d9f8d26a7b9f4735008ac97f6347ad381b83d3caafe8e01a6a6a08ee4b6185f34dde201f00584537042454585?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-64.JPG&size=1024)

# 标签

```html
<span class="label">新</span>
<span class="label label-disabled">新</span>
<span class="label label-primary">新</span>
<span class="label label-success">新</span>
<span class="label label-info">新</span>
<span class="label label-warning">新</span>
<span class="label label-danger">新</span>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/352a566aa8d7d3a13c80d41e41504170e3946d3d197b237779742b34915cebd36c7fc85aecc3c8fdcdc6a8ef588dd2eb?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-65.JPG&size=1024)

# 指示

给链接、导航等元素嵌套 .point 元素，可以很醒目的展示新的或未读的信息条目。

```html
<span class="point">5</span>
<span class="point">10</span>
<span class="point">245</span>
<span class="point point-disabled">0</span>
<span class="point point-sm">5</span>
<span class="point point-sm">10</span>
<span class="point point-sm">245</span>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/864a691acb9b21b1d44057b7431a7416148cf763b80329ab3eaa34c1b410676f9228ee9a4bd4e69ffd38ffc42bab4b95?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-66.JPG&size=1024)

# 警告框

将任意文本包裹在以下类中就能组成一个警告框，每个类分别代表不同的警告信息。

```html
<div class="alert"><span class="icon-alert"></span> alert提示提醒注意！</div>
<div class="info"><span class="icon-info"></span> info提示提醒注意！</div>
<div class="warning"><span class="icon-tip"></span> warning提示提醒注意！</div>
<div class="danger"><span class="icon-close-b"></span> danger提示提醒注意！</div>
<div class="success"><span class="icon-checkmark-c"></span> success提示提醒注意！</div>
```

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/fce5e9b5deb129d540cf70d74eac843b331fe081469db23d35a4209ec06a1cf674ba79251bf6d8e7b1b96e7ce4f8b601?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-67.JPG&size=1024)

# 字体图标

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/df4736c6eb9b4ce4501d804d520a50789de284aa8d1b92ed2b2c3c0c3c8a1c9c148d943ed281b89079e068d2263a9c8c?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-68.PNG&size=1024)

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/717b553a97aa1ca165ee4a215c3ed34206da72438fe10227648e85bfe86553651ea935558748b324c3e5f994fb08ded1?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-69.PNG&size=1024)

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/f279c888f4c04127ac933a7ad3d85773dd74757b3d5d4098e80a7018c20a115dfa5d3343999742b733261f1e4c3dbc1b?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-70.PNG&size=1024)

# 增加的css

* `.ablock` ：`display: block; width: 100%; height: 100%;`

* `.line-clamp1`: 文本一行显示。

* `.line-clamp2`: 文本两行显示。

* `.price-font`：¥符号的字体样式，带这个符号的元素都要加这个类。



