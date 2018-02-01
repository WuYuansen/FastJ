LUploader v1.1移动端图片压缩上传插件
==========
纯原生js的移动端图片压缩上传插件，不依赖任何库
##用法
在html页面中引入input标签，通过自定义属性`data-LUploader`绑定点击触发的标签id，写法如下：
```
...
<div class="LUploader" id="demo1">
        <div class="LUploader-container">
            <input data-LUploader='demo1' data-form-file='basestr' data-upload-type='front' type="file" />
            <ul class="LUploader-list"></ul>
        </div>
        <div>
            <div class="icon icon-camera font20"></div>
            <p>单击上传</p>
        </div>
    </div>
...
```
通过将某个自定义属性如`data-form-file`赋值`basestr`来决定上传base64字符串参数名，其他自定义属性赋值来决定其他post参数键值如`data-upload-type='front'`，如此一来post参数将成为如下样子：
```
{
  formFile:data:image/jpeg;base64,/9j/4......,
  uploadType:front
}
```

将样式文件引入到页面中：
```
...
 <link rel="stylesheet" href="css/LUploader.css">
...
```
同时引入js文件到页面中：
```
...
<script src="js/LUploader.js"></script>
...
```
初始化插件：
```
...
new LUploader(这里放需要绑定的input对象作为参数, {
            url: '',//post请求地址
            multiple: false,//是否一次上传多个文件 默认false
            maxsize: 102400,//忽略压缩操作的文件体积上限 默认100kb
            accept: 'image/*',//可上传的图片类型
            quality: 0.1,//压缩比 默认0.1  范围0.1-1.0 越小压缩率越大
            showsize:false//是否显示原始文件大小 默认false
        });
...
```
调用起来非常简单，代码我后续会持续优化，如果喜欢希望客官赏颗星哦。
