
---

title: wamp安装
date: 2017-09-11 17:26:21
tags: 后台相关

---

## wamp安装


### wamp的简介

#### wamp

- Windows + Apache + Mysql + PHP。继承安装环境，即在window下的apache、php和mysql的服务器软件。

#### Apache

- Apache是世界使用排名第一的Web服务器软件。它可以运行在几乎所有广泛使用的计算机平台上。

- 由于其跨平台和安全性被广泛使用，是最流行的Web服务器端软件之一。

#### MySQL

- MySQL是一个关系型数据库管理系统，由瑞典MySQL AB 公司开发，目前属于 Oracle 旗下公司。

- MySQL 最流行的关系型数据库管理系统，在 WEB 应用方面MySQL是最好的 RDBMS (Relational Database Management System，关系数据库管理系统) 应用软件之一。

#### PHP

- php 的运行环境。


### wamp的配置

#### 配置ip

1. 需要配置wamp\bin\apache\Apache2.2.21\conf下的httpd.conf文件。

2. 在Allow from 127.0.0.1下面的一行添加一行Allow from all。

#### 默认文件地址

1. 网页默认是放在wamp/www文件夹下才能使用ip地址访问，这个文件夹的位置可以更改，还是httpd.conf文件。

2. 修改DocumentRoot 后面跟文件路径，将文件路径改为自己要设置的即可，Directiry也要和DocumentRoot相同。

#### hosts

1. 在实际中访问网页都是通过域名来访问。

2. 浏览器会先去找C:\Windows\System32\drivers\etc下的hosts文件。在这里找不到才会取到外网找，所以可以在这里做拦截，比如在文件最后添加一行127.0.0.1       www.taobao.com。那么通过浏览器访问www.taobao.com就会跳转到Apache的默认目录。同理www.jd.com也可以这样设置

#### 开启虚拟主机

1. 如果要做到jd和taobao访问的是本地不同网页，要修改httpd.conf文件的Include conf/extra/httpd-vhosts.conf，将前面的备注取消 Virtual hosts的备注也取消。

2. 然后打开extra文件下下的httpd-vhosts.conf文件。修改以下三项，以taobao 为例：DocumentRoot：taobao.com、ServerName：www.taobao.com、ServerAlias：路径/taobao，其他无需修改。如果要增加就复制这段配置后再修改。

3. 在Apache默认路径下新建taobao文件夹，并建立index文件，Apache默认会打开文件夹下面的index，如果没有index会显示该文件夹下的所有目录。

4. 通过ip地址访问会访问httpd-vhosts.conf的第一个地址。

> 需要注意的是以上每项修改完之后都要重启一下Apache服务。
