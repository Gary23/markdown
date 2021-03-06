---
title: Git
tags: git,版本控制
notebook: git和blog 
---

# Git的三个区域介绍

## Git仓库

Git仓库目录就是Git用来保存项目的源数据和对象数据库的地方。Git中最重要的部分，从其它计算机克隆仓库时，拷贝的就是这里的数据。

## 工作目录

工作目录是对项目的某个版本独立提取出来的内容。这些从Git仓库的压缩数据库中提取出来的文件，放在磁盘上供用户使用或修改

## 暂存区

暂存区域是一个文件，保存了下次将提交的文件列表信息，一般在Git仓库目录中。有时候也被称作“索引”（Index）,不过一般说法还是叫暂存区。

# Git 本地版本管理

## 基本的Git工作流程

1. 在工作目录中国修改文件。

2. 暂存文件，将文件的快照放入暂存区域。

3. 提交文件，找到暂存区域的文件，将快照永久性存储到Git仓库目录。

## 操作方法和命令

## 本地仓库

根目录右键：**Git Bash Here**，打开Git Bash。

输入：**git init**     

就可以让git来管理目录。这个命令只是创建了一个名为 .git 的隐藏目录，这个目录就是存储我们历史版本的仓库。  

## 添加到缓存

**git add index.html**  
将index.html文件放到暂存区

**git add js css**  
将js和css文件夹的文档都放到暂存区

**git add * 或 -A**  
所有文件都放到暂存区

> git会自动过滤空目录。

## 查看状态

**git status**  
检测当前仓库文件的状态，红色表示被修改，放到暂存区的文件被标记成了绿色等待提交。

**git checkout  index.html**  
将index.html从暂存区还原到工作区。

## 提交

**git commit  -m  'frist'**  
已提交状态，-m是mark的意思，将暂存区的内容全部文件提交，将暂存区被标记成绿色的文件，全部提交到本地仓库存储，'frist' 是对本次提交内容的说明。

## 其他

**git log**  
查看存盘点，每次提交会生成一个随机id值

**git reset --hard id值**  
还原代码到该id值得版本

第一次使用git时需要配置。

**git config --global user.name pj.Yu**  
设置自己的名字。

**git config --global user.email 406490508@qq.com**  
设置自己的邮箱

# Git分支

## 为什么需要分支

同时开发多个需求的情况十分常见，比如当你正在专注开发一个功能时，突然有一个紧急的BUG需要来修复，这个时候我们当然希望在能够保存当前任务进度，再去修改这个BUG，等这个BUG修复完成后再继续我们的任务。通过Git创建分支来解决实际开发中类似的问题。

## 分支的好处

开发时在另一个分支上开发新功能A然后上线，然后再写另一个分支另外一个功能B，这时A功能有bug再去调试，不会影响其他分支的状态。

## 分支原理

当我们初始化仓库时候，实际上就是产生了第一次提交。Git会默认帮我们创建一个master的分支，每次commit操作生成一个新的版本（存盘点）。而且会生成一个sha值，master是主干，这些版本就是在主干上的存盘点，每一次的历史按本都是基于分支存在的。

## 分支功能实现

## 建立新的分支

**git branch share**  
建立一个名为share的分支，建立后现在还是在master主干上。

**git checkout share**  
切换到share分支，切换之前尽量先commit。

**git  branch**  
查看当前都有哪些分支。*号表示当前处于哪个分支。

**git checkout -b share**  
创建并切换到share分支

另外分支是有继承关系的。新建的自分支会继承父分支的所有提交历史。

## 合并两个分支

**git  merge  share**  
当前分支合并share分支。同一个文件被修改会产生冲突。

**<<<<<<<<<<< HEAD**  
冲突开始的位置

**===========**.  
之上是当前分支的代码，之下是share分支的代码

.**>>>>>>>>>>> share**  
冲突结束的位置

根据需求留下想要的代码，将标识符都删除掉就解决冲突了。

## 删除分支
**git branch -d share**  
删除share分支

## git的分支管理规范
   
1. 不要有太多的分支，分支太多管理起来太费劲，毕竟是多人开发制定策略太复杂

2. 要有一个稳定的平行分支，即master分支不要轻易修改，这个稳定的文分支不能有bug。

3. 要有一个开发分支(developer)，保证master分支的稳定性

4. 所有的功能分支(feature)从developer创建，功能写完后合并到developer，但不能直接合并到master，因为要保证始终有一个没有bug的稳定分支

5. 所有功能开发完成后新建发布分支(release)，用作测试，测试完全没问题就合并到master分支。


# Git 协同开发

多个人共同开发，改完代码后放到共享仓库，其他人就可以取到代码。借助一个远程仓库，大家可以共享代码、历史版本等数据

## 在自己电脑创建一个共享仓库

Git要求**共享仓库是一个以.git结尾的目录**。

1. **mkdir repo.git** 创建以.git结尾的repo文件夹目录

2. **cd repo.git** 进入这个目录

3. **git init --bare** 初始化一个共享仓库，也叫裸仓库 注意选项--bare

4. 假设自己的本地仓库和repo是同级目录，回到自己的本地仓库执行  **git push ../repo.git master** 就把master分支的代码共享到了共享库中

5. 从共享仓库里取出内容  另一个开发者执行 **git pull ./repo.git master** 获取共享仓库的master分支。

6. 将本地仓库上传到服务器：git push 用户名@IP地址:/路径名 master。

以上是以自己电脑为例创建了一个共享仓库，而在实际中，**gitHub**就是一个共享仓库功能的网站

gitHub提供共享仓库的功能，类似于一个博客空间

## 在gitHub中新建一个仓库

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/01b9027ad082480b4ecaf5c3d409b1669c7ce659ea1121640d6bab9d45dc16ec59ec3e1c848ed864295f6979aa83574e?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-1.jpg&size=1024)

首先创建一个新的项目，要输入项目名，项目描述，是否公开。其实就相当于新建一个共享库。

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/b658772ba6bbbab37dd0b23106c82297c3c8220aa654739332ffa57c42cfad64bf3ee9a9f157550d014c4490bd79f257?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-2.jpg&size=1024)

以表格形式创建一个仓库，并且会提供给我们一个仓库地址。

由于主机名太长，可以简写成主机名。以后只填写主机名就行，就不用写远程仓库地址了。

**git remote**
管理远程地址用

**git remote add "主机名" "远程仓库地址"**
添加远程主机  其实就是给远成仓库地址起一个比较短的名字

**git remote show "主机名"**  
查看这个主机名对应的主机名是谁

**git remote** 
显示所有主机名

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/2b986b6310f8871bd5510d7e00358cc515a9d96645960fa508f1930864885cb4c22eccd824f7e4006244ce2eec5929e5?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-3.jpg&size=1024)

地址下面会告诉用户应该怎样操作，如何创建.git并上传等设置，这里根据自己的实际情况，并不是每一步骤都要设置，有可能之前已经设置好了

![image](http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/a982aefd65ce1404b046fc07890e5612070551e26984b013f339185807b1f8ff2c65f5c439e17e63377cfc1bd03b869c?pictype=scale&from=30012&version=2.0.0.2&uin=406490508&fname=20170904-4.jpg&size=1024)

设置之后就可以push了，但是这时会有权限问题，也就是公钥和私钥，需要将本电脑的公钥传到gitHub上。

为了免密码共享代码需要通过SSH来实现：
创建公钥：**ssh-keygen -t rsa** 一直回车。在用户的文件里创建了一文件夹.ssh里边创建了对公钥和私钥.pub是公钥。

将公钥放到gitHub对应账号下，在个人设置里有SSH的选项，复制进去就行。相当于在自己电脑和gitHub之间建立了连接。私钥不需要管
如果有两台电脑就要添加两个SSH key

权限解决之后就可以随意  **git push gitHun仓库地址  分支** 和 **git pull gitHun仓库地址  分支**

**git push origin login:master**  
把本地的login分支的修改共享到远程的master分支上去  如果远程没有这个分支就会创建一个。


# fork功能

gitHub除了创建共享仓库，还有一个目的是coding，大家一起来共享代码

这里的项目都是公开的开源项目，除了自己可以维护功能，其他来自全世界的人都可以共同进行开发，并且其他开发者可以对原有的项目进行修改

但是程序员水平参差不齐，所以项目不允许其他人直接修改。需要先forking一份到自己的目录下，然后通过克隆、pull、push等操作，修改自己目录下的这份副本。

自己改完以后经过自己测试，没问题的话可以申请原有项目合并自己的修改。**申请合并是pull requests选项，在gitLab中是Merge Requests选项**。要填写合并哪个项目的哪个分支，还要填写更改的说明，和发邮件类似，这样发送请求就成功了。

对方会受到申请并且检验，如果对方觉得改的不错，同意后可进行合并，否则拒绝

# 克隆远程仓库

当仓库已经有项目了，项目已经开始开发了，可以执行克隆操作。 

**git clone "仓库地址"**  
拿下来的就是仓库了  就不用再执行init了

克隆下来后，查看分支，当前只有 master 分支，因为克隆的就是主干分支。

**git fetch "仓库地址"**  
这时就把其他分支都拿下来了

**git branch -A** 
可以看远程仓库的分支，除了主干都是红色的

总结来看，我如果使用git clone "仓库地址"  相当于完成了以下步骤：
mkdir 目录  ->  cd 目录  ->  git init  ->  git remote add origin "仓库地址"  ->  git pull origin master

# gitLab

通过gitHub管理仓库实在是太方便了，可是只能免费使用公开仓库，私有仓库又是需要交“保护费”的，而gitLab就是免费私有的这么一个网站。

gitLab也是一个可以通过Web界面管理仓库的网站程序，我们可以把它架设到公司自已的服务器上，实现仓库私有化，这也是大部分公司通常采用的方法，其使用方法与gitHub十分相似。

由于操作和gitHub一样，就取一部分使用作为笔记记录，比如在公司内开发的应用场景，在公司内的代码肯定是要私有化的，而gitHub又是收费的，所以用gitLab更常用

## 给项目添加成员

进入一个项目后，右上角的设置有个Menbers选项，就是成员的意思，如果希望有个人一起合作写这个项目，就可以邀请并分配权限，通常分配Developer权限。现在对方就可以随意push代码，但是不能操作master分支。

## 分组

很多时候我们需要创建一个分组，相当于建立一个群。Groups，在左边的菜单栏里。

分组可以直接添加分组成员，步骤和项目添加成员相同。

在分组里可以建立项目，作为小组的成员也会自动生成一个项目目录，大家就可以一起开发这个项目，之后的步骤和上面相同。

## Protexted Branches

受保护的分支，默认情况下保护的是master分支， 也可以自行根据权限设置保护的分支。

# gitignore 忽略文件

有些文件不需要提交，比如笔记，图片等。这时就可以忽略掉

忽略方式：创建一个没有文件名的.gitignore后缀文件，通过另存为来保存。也可以用命令行创建将要忽略的文件名存进去，就忽略了。

# 比较差异

当内容被修改时，我们无法确定修改哪些内容时，可以通过git diff来进行差异比较。

**git difftool**
比较暂存区和修改的文件的差异，接一个sha值比较暂存区和历史记录的差异,两个sha值就是历史版本和历史版本的差异


# 回滚（撤销）操作

如果刚刚上传完后又发现一个bug， 可以用 **git reset** 把某一个版本的代码还原到工作目录

--hard 工作区会变，历史会变，暂存区也会变
--soft 只会变历史区域的代码，即是回滚在工作区也看不见。
--mixed 历史会变，暂存区也会变，工作区不变

工作区指的能看的见的代码，.git目录就是仓库区域，暂存区也在.git目录下就是index文件。

**git checkout**
可以从某一个版本取出某一个特定的文件。

**git checkout SHA值 -- index.html**   
只拿出index到工作区中，其他文件不变 历史不变。

# 更新仓库

在项目开发过程中，经常性的会遇到远程（共享）仓库和本地仓库不一致，我们可以通过 **git fetch** 命令来更新本地仓库，使本地仓库和远程（共享）仓库保持一致。

**git fetch  “远程主机”**  或者   **git fetch “远程主机” “分支名称”**获取的更新会保存在本地仓库中，但是并没有体现到我们的工作目录中，需要我们再次利用 **git merge** 来将对应的分支合并（融合）到特定分支。
用 **git merge remotes/主机名/分支名** 当前分支合并remotes/主机名/分支名

也可以用 **git pull 主机名 分支名** ，这个命令等于做了两个操作：
**git fetch** 和 **git merge origin/某个分支**
                                       
**git branch -a** 
便可以查看所有(本地+远程仓库)分支了

**git push origin --delete 分支名称**
删除远程分支




