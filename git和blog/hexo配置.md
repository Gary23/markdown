# hexo配置

---

title: hexo配置
date: 2017-06-01 11:31:26
tags: blog和git

---

## 安装hexo

### 安装过程

使用以下命令下载hexo

`$ npm install hexo-cli -g`

如果在安装过程中遇到以下错误

`ERROR Deployer not found : github`

则运行以下命令,或者你直接先运行这个命令更好。

`$ npm install hexo-deployer-git --save`

新建hexo的文件夹，以后的博客相关的操作都在这个文件夹里边，不要有中文目录。在该文件夹内部执行下面命令

`$ hexo init`

安装依赖包

`$ npm install`

### hexo常用的命令

1. `$ hexo g` 完整命令为hexo generate，用于生成静态文件。

2. `$ hexo s` 完整命令为hexo server，用于启动服务器，主要用来本地预览。

3. `$ hexo d` 完整命令为hexo deploy，用于将本地文件发布到github上。

4. `$ hexo n` 完整命令为hexo new，用于新建一篇文章。

查看hexo的本地服务器网页

`http://localhost:4000/`

### 连通github

github中的项目名称必须是name.github.io格式

编辑本地hexo目录下的_config.yml文件。以下配置的name要改成自己的

```text
deploy: 
  type: git
  repository: http://github.com/name/name.github.io.git
  branch: master
```

配置好之后使用`$ hexo g`和`$ hexo d`发布到github。第二个命令会要求输入github的账号密码。如果成功的话打开name.github.io就可以查看博客了。

最好已经搞定了ssh配置，否则每次都要输入密码。

### 正式发布博客

按照自己的意愿修改完后，执行`$ hexo g`，`$ hexo s`，打开localhost:4000看看效果。

新建一篇博客`$ hexo new "my new post"`

在`\hexo\source\_post`中打开my-new-post.md，开始编辑。

```text
title: my new post #可以改成中文的，如“新文章”
date: 2015-04-08 22:56:29 #发表日期，一般不改动
categories: blog #文章文类
tags: [博客，文章] #文章标签，多于一项时用这种格式，只有一项时使用tags: blog
---
#这里是正文，用markdown写，你可以选择写一段显示在首页的简介后，加上
<!--more-->#在<!--more-->之前的内容会显示在首页，之后的内容会被隐藏，当游客点击Read more才能看到。
```

写完文章后，使用`$ hexo g`生成静态文件。`$ hexo s`在本地预览效果。`$ hexo d`同步到github，然后使用http://name.github.io进行访问。

### 清除缓存

清除缓存文件db.json和已生成的静态文件public。如果发现您对站点的更改无论如何也不生效，您可能需要运行该命令。

`$ hexo clean`

### 文章的各种格式

https://hexo.io/zh-cn/docs/tag-plugins.html


## next主体设置

### 下载主题

`$ cd your-hexo-site`打开电脑的hexo站点目录。
`$ git clone https://github.com/iissnan/hexo-theme-next themes/next`

在hexo的配置文件中设置`theme: next`。

### 主题设定

在主题配置文件中可以设置三种主题。

```text
scheme: Muse || Mist || Pisces
```

### 语言设置

在hexo配置文件中设置`language: zh-Hans`。这是简体中文，英文是en。

### 设置菜单

菜单设置包括三个部分，菜单项、菜单项显示文本、菜单项对应图标。在主题配置文件中设置

```text
menu:
  home: /   #主页
  archives: /archives   #归档页
  #about: /about    #关于页
  categories: /categories   #分类页
  tags: /tags   #标签页
  commonweal: /404.html     #公益404
```

现在菜单的文字是固定的，如果要修改文字要打开themes\next\languages\zh-Hans.yml去设置对应中文名称，也可以新建。

图标设置在主题配置文件下,与菜单设置一一对应。

```text
menu_icons:
  enable: true
  # Icon Mapping.
  home: home
  #about: user
  categories: th
  tags: tags
  archives: archive
  commonweal: heartbeat
```

### 设置侧栏

通过修改主题配置文件控制侧栏行为，一个是侧栏位置，一个是侧栏显示时机。

侧栏位置：

```text
sidebar:
  position: left
```

侧栏的行为

```text
sidebar:
  display: post #目录列表时显示 || always #一直显示 || hide # 一直隐藏 || remove #完全移除
```

### 设置头像

主题配置文件中

```text
avatar: /images/avatar.png  # 路径是next/source/images/
```

### 昵称和描述

站点配置文件中author参数是昵称，description参数是站点的描述


### 设置字体

在主题配置文件中查找font字段修改。各项所指定的字体将作为首选字体，当他们不可用时会自动 Fallback 到 NexT 设定的基础字体组：

- 非代码类字体：Fallback 到 "PingFang SC", "Microsoft YaHei", sans-serif

- 代码类字体： Fallback 到 consolas, Menlo, "PingFang SC", "Microsoft YaHei", monospace

### 添加菜单栏的页面

打开hexo的目录站点下，运行`hexo new page categories`，这样就新建了categories页面，其他菜单类似，新建之前先去删除之前的。

### 侧边栏社交

在主题配置文件中设置

设置显示文本和链接地址

```text
social:
  GitHub: https://github.com/your-user-name
  微博: http://weibo.com/your-user-name
```

设定链接的图标

```text
social_icons:
  GitHub: github
  微博: weibo
```

设置友情链接

```text
links_title: Links
links:
  MacTalk: http://macshuo.com/
  Title: http://example.com/
```

###　设置动画效果

在主题配置文件中设置，要等到js加载完才会显示动画和内容。

```text
use_motion: true  # 开启动画效果
use_motion: false # 关闭动画效果
```

### 设置动画背景

自带两种动画效果，在主题配置文件中设置

```text
# canvas_nest
canvas_nest: true //开启动画
canvas_nest: false //关闭动画

# three_waves
three_waves: true //开启动画
three_waves: false //关闭动画
```

### 添加百度/谷歌/本地 自定义站点内容搜索

安装 hexo-generator-searchdb，在站点的根目录下执行以下命令`npm install hexo-generator-searchdb --save`

hexo站点配置文件新增配置

```text
search:
  path: search.xml
  field: post
  format: html
  limit: 10000
```

主题站点配置文件设置

```text
# Local search
local_search:
  enable: true
```