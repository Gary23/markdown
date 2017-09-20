# SVN

## VisualSVN

SVN服务器：运行Subversion服务的计算机。

SVN服务器分为命令行工具和图形化工具，VisualSvn就是一款图形化工具。

> 安装时，默认使用443端口，如果被占用了就换成8443。

### 创建用户或组

在Users右键选择Create User，创建用户。

### 创建版本库及设定权限

一般每个项目对应一个版本库

步骤：

1. 在Repositories右键Create New Repositories，创建一个新项目。

2. 在Repositories name步骤输入项目名称。

3. 在Repositories Structure步骤选择仓库结构，Empty是指空仓库。

4. 在Repositories Access Permissions步骤选择权限，Nobody是没有人能访问，All Subversion是所有用户有读和写的全选，Customize是自定义用户和其权限。

### TortoiseSVN

SVN的客户端，用户通过SVN客户端同步服务器交互，TortoiseSVN是一款图形化工具。

> 如果在文件夹单机鼠标右键有TortoiseSVN选项就是安装成功了。

## SVN基本协作流程

客户端在操作之前要先走一些流程，这里有一些名词：

- 检出项目：checkout

- 增加文件或目录：add(增加)，commit(提交)。

- 修改文件或目录：commit(提交)。

- 删除文件或目录：commit(提交)。

- 更新文件或目录：updata(更新)。

- 查看版本日志：log(日志)。

### 检出操作

在本地文件夹中右键选择SVN Checkout选项。从服务器把代码下载下来。

在URL of repository填入仓库地址。

> 在VisualSVN中的项目右键选择Copy URL to Clipboard将地址复制出来去粘贴。

在CHeckout directory选择检出的本地目录。

在Checkout Depth中选择深度，Fully recursive是把项目全部下载。

Revison是表选择哪个版本，HEAD revison是最新的版本。

接下来需要输入账号密码完成操作。

> 操作完成后，当前操作的文件夹中右键就不会再有SVN Checkout选项。已经执行过一遍了就不会再有了

### 更新操作

文件夹鼠标右键选择SVN Updata操作即可从服务器更新最新版本的代码。

当修改了源代码，客户端要先把修改的文件通过在修改后的文件上右键TortoiseSVN --- 'add'操作把文件添加到待提交列表中。

> 只有新建的文件需要手动add操作，增删改之后的文件都不需要手动add。

接下来通过在文件夹中右键 SVN commit 操作把待提交列表中的项目提交到远程仓库中。提交时Message是填写提交日志的。

> **在提交之前一定要记得先updata**，目的是避免和别人冲突。

### 查看版本日志

在文件夹的空白处右键TortoiseSVN---show log操作查看。

### 更新到某个版本

在需要更新的文件右键TortoiseSVN---updata to revision。
HEAD revision是最新版本，Revision是选择版本，点击show log选择。最后确定。

> 可以随时恢复到之前的版本。

### 解决冲突

当别人改好了文件commit之后我这里也在编辑相同的文件，这时我更改完了准备提交，而服务器上的文件已经改变，那么提交前Updata时会有错误Conflicted提示是哪个文件，此时不能点ok。

> 会生成两个文件，一个是本地的版本，一个是服务器的版本。

解决冲突就是在文件夹空白处右键TortoiseSVN---Resolve，双击打开冲突的文件。

左边的Theirs是他们的，右边的Mine是我的。黄色的部分是冲突部分，红色是冲突的内容。

选择Theirs或Mine右键选择use this txt block就是选择用这个版本的。
还可以选择Mine在Theirs之前或者Theirs在Mine之前。



