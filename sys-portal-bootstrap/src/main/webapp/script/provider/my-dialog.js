/**
 * 消息提示自定义插件
 */
define(['angular'], function (angular) {
    angular.module('myDialog', []).provider('$dialog', function () {
        var self = this;
        this.needCloseIndex = [];
        this.close = function () {
            layui.use('layer', function () {
                for (var i in self.needCloseIndex) {
                    layui.layer.close(self.needCloseIndex[i]);
                    delete self.needCloseIndex[i];
                }
            });
        };
        this.tips = function (content, time, callback) {
            layui.use('layer', function () {
                layui.layer.msg(content, {time: (time || 3) * 1000, shadeClose: true}, callback);
            });
        };
        this.loading = function (callback) {
            layui.use('layer', function () {
                var index = layui.layer.load(1, {shade: [0.1, '#fff'], end: callback});
                self.needCloseIndex.push(index);
            });
        };
        this.success = function (content, time, callback) {
            layui.use('layer', function () {
                layui.layer.msg(content, {time: (time || 3) * 1000, shadeClose: true, icon: 1}, callback);
            });
        };
        this.error = function (content, time, callback) {
            layui.use('layer', function () {
                layui.layer.msg(content, {time: (time || 3) * 1000, shadeClose: true, icon: 2}, callback);
            });
        };
        this.confirm = function (content, success, cancel) {
            layui.use('layer', function () {
                var index = layui.layer.confirm(content, {btn: ['确定', '取消']}, function () {
                    typeof success === 'function' && success.call();
                    layui.layer.close(index);
                }, function () {
                    layui.layer.close(index);
                    typeof cancel === 'function' && cancel.call();
                });
            });
        };
        this.alert = function(content,success){
        	var index = layui.layer.alert(content, {}, function () {
                typeof success === 'function' && success.call();
                layui.layer.close(index);
            });
        }
        this.window = function(title,content,endFun){
        	var width,height;
            layui.use('layer',function(){
                layer.open({
                    type: content.indexOf('http:')==-1?1:2
                    ,area: [
                        (width || $(window).width()*0.9)+'px',
                        (height || $(window).height()*0.9)+'px'
                    ]
                    ,title:title
                    ,shade: 0.6 //遮罩透明度
                    ,maxmin: true //允许全屏最小化
                    ,anim: 1 //0-6的动画形式，-1不开启
                    ,content: content||'请将你要显示的内容放入content属性中',
                    cancel: function(index, layero){ 
                    	typeof endFun === 'function' && endFun.call();
                  	}   
                });
            });
        };
        this.$get = function () {
            return self;
        };
    });
});