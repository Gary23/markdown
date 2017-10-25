

| 参数名称 | 类型 | 说明 |
| --- | --- | --- |
| accepts | Map | 内容类型发送请求头，告诉服务器什么样的响应会接受返回。如果accepts设置需要修改，推荐在$.ajaxSetup()方法中做一次。 |
| async | Boolean | 默认设置下（默认为true），所有请求均为异步请求。如果需要发送同步请求，要将此选项设置为false，跨域不支持同步操作。 |
| beforeSend | Function | 发送请求前可修改XMLHttpRequest对象的函数，返回false可取消本次请求，`function(XMLHttpRequest){ this是请求时传递的option参数 }` |
| cache | Boolean | 默认true，当跨域时默认为false，false时将不会从浏览器缓存中加载请求信息 |
| complete | Function | 请求完成后的回调函数，`function(XMLHttpRequest, textStatus){ this是请求时传递的option参数 }` |
| contents | Map | 以"{ 字符串: 正则表达式 }"配对的对象，用来确定jQuery将如何解析响应，给定其内容类型。 |
| contentType | String | 当发送信息至服务器时，内容编码类型默认为"application/x-www-form-urlencoded" |
| context | Object | 这个对象用于设置Ajax相关回调函数的上下文，也就是回调函数this的设置，默认是传递的option参数 |
| converters | Map | 一个数据类型对数据类型转换器的对象。每个转换器的值是一个函数，返回相应的转化值。 |
| crossDomain |  | 同域请求为false，跨域请求为true，如果要通过JSONP请求同域应该设置为true。 |
| data | Object或String | 发送到服务器的数据 |
| dataFilter | Function | 给Ajax返回的原始数据进行预处理的函数。`function(data, type){ data是Ajax返回的原始数据，type是调用$.ajax时提供的dataType参数，最后需要return data }` |
| dataType | String | 预期服务器返回的数据类型。如果不指定将根据MIME信息返回，可用类型：xml、html、script、json、jsonp、text |
| error | Function | 请求失败时被调用的函数 `function(XMLHttpRequest, textStatus, errorThrown){ this是请求时传递的option参数 }` |
| global | Boolean | 是否触发全局Ajax事件，默认为true。 |
| Headers | Map | 一个额外的"{ 键: 值 }"对映射到请求一起发送，此设置被设置之前beforeSend函数被调用，因此，消息头中的值设置可以在覆盖beforeSend函数范围内的任何设置 |
| ifModified | Boolean | 默认:false 仅在服务器数据改变时获取新数据，使用HTTP包Last-Modified头信息判断，也会检查服务器指定的'etag'来确定数据没有被修改过 |
| isLocal | Boolean | 允许当前环境被认定为"本地"(比如系统文件)，即使jQuery默认情况下不会承认它。以下协议目前目前公认为本地：file、*-extension、widget。如果要修改isLocal，建议在$.ajaxSetup()中做 |
| jsonp | String | 在一个jsonp请求中重写回调函数的名字，这个值用来替代在"callback=?"这种GET货POST请求中URL参数里的"callback"部分，jsonp可是设置为false，为了阻止在URL中加入callback参数，但仍然要设置jsonpCallback参数。 |
| jsonpCallback | String，Function | 为jsonp请求指定一个回调函数名，这个值将用来取代jQuery自动生成的随机函数名。 |
| mimeType | String | 一个mime类型用来覆盖XHR的MIME的类型 |
| password | String | 用于响应HTTP访问认证请求的密码 |
| processData | Boolean | 默认为true，默认情况下，发送的数据将被转换为对象(实际上是非字符串)以配合默认内容类型"application/x-www-form-urlencoded"。如果要发送DOM树信息或者其他不希望转换的信息，要设置为false。 |
| scriptCharset | String | 只有当请求dataType为"jsonp"或者"script"，并且type时GET时才会用于强制修改字符集(charset)。通常在本地和远程的内容编码不同时使用。 |
| statusCode | Map | 一组数值的HTTP代码和函数对象，当响应时调用了相应的代码，例如，如果响应状态是404，将触发以下报警：`statusCode: { 404: function(){ alert('page not found') } }` |
| success | Function | 请求成功后的回调函数，三个参数，返回的数据、描述状态的字符串、jqXHR对象 |
| timeout | Number | 设置请求超时时间(毫秒)，此设置将覆盖$.ajaxSetup方法的全局设置。 |
| traditional | Boolean | 如果想要用传统的方法来序列化数据，那么就设置为true，可以参考jQuery.param方法。 |
| Type | String | 请求方式(POST或GET)，默认为GET，跨域只能是GET方式。 |
| url | String | 发送请求的地址，默认为当前页面 |
| username | String | 用于响应HTTP访问认证请求的用户名 |
| xhr | Function | 回调创建XMLHttpRequest对象，当可用时默认为ActiveObject（IE）中，否则为XMLHttpRequest |
| xhrFields | Map | 一对"文件名-文件值"在本机设置XHR对象。例如，如果需要德华，可以用它来设置withCredentials为true的跨域请求 |
