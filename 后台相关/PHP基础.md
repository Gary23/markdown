@(ajax)

PHP基础
==

变量
--
- 在php中代码必须写在<?php    ?>中，php里可以写逻辑，而且是运行在服务器，运行之后再返回到页面。
- php定义变量不用var，但第一个字符必须是$，用echo可以输出这个变量。
```
<?php
$username = "zhangsan";
echo $username;  
?>
```



数据类型
--
##### 数据类型的分类
- php中常用的类型分为：字符串、整型、浮点型、boolean型、数组型、对象、null。

> #### 数组类型和数组的遍历

- 这里重点介绍数组类型。数组类型分为两种：普通数组和关联数组。
- array()是php提供的，用来定义数组的。

##### 普通数组
	```
	<?php
	$array1 = array(1,2,3);
	var_dump($array1);
	
	// 遍历方式
	for($i=0;$i<count($array1);$i++){
	    var_dump($array1[$i]);
	}
	?>
	```

##### 关联数组

- 关联数组就是数组里面放的数据有关联关系，以键值对关联。
- key和val用=>连接，代替js中的：
- 我们以键值对  key:val， 我通过key就可以获取到值

```
<?php
    $array2 = array("username"=>"tom","age"=>"18");
    // 遍历
    foreach($array2 as $key=>$val){
        echo $key;
        echo $val;
    }
?>
```

##### 二维数组

```
<?php
    $array3 = array(
        array("username"=>"tom","age"=>"18"),
        array("username"=>"jack","age"=>"28"),
    );
    // 遍历
    for($i=0;$i<count($array3);$i++){
        foreach($array3[$i] as $key=>$val){
            echo $key;
            echo $val;
        };
    };

?>
```

运算符
--

- 运算符基本与js中使用方法一致。
- 在php中连接符不是''+''，而是''.''

```
$username = "zhang";
$username1 = "san";
echo $username.$username1;
```


5. 函数
--
- 函数的定义和调用和js类似
```
<?php
    function fun(){
        echo "tom";
    };
    
    fun();
?>
```
- 可以在行参设定一个变量并附上默认值，打印出的就是默认值

```
<?php
    function fun($username = "rose"){
        echo $username;
    };
    fun();    // 打印出rose
?>
```

- 行参中设定了默认值之后在调用时传实参，会覆盖行参的默认值。

```
<?php
    function fun($username = "rose"){
        echo $username;
    };

    fun("jack");     // 打印jack
?>
```

常用PHP函数
--

##### 向客户端输出
- 客户端发来轻轻，php向客户端输出数据。
- echo 输出字符串
- print_r(array) 输出数组
- var_dump(array) 输出数组详细信息

##### php中常见的函数
- count(array); 统计数组的长度，和js的length类似。
- file_get_contents("这里写文件的路径"); 获取文件里边的内容，返回的是字符串，可以读取各种文件。
- in_array("要查找的字符串",array); 判断数组中是否存在某个元素，有的话输出1，没有就不输出。
- array_key_exists("key",array); 判断数组是否存在某个key,主要用于关联数组。 


