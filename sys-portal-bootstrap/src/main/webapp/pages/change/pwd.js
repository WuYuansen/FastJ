/**
 * User: 吴元森/15909910367@163.com
 * Date: 2017/3/7
 * description : 
 * Time: 14:01
 */
define(['require', 'angular', 'myView', 'myForm'], function (require, angular) {
    return function (module, controller) {
        angular.module(module, ['myView', 'myForm']).controller(controller, ['$scope', '$location', '$view','$http', function ($scope, $location, $view,$http) {
            $scope.location_path = "密码修改";
            $scope.app.layout.classes.body = 'body';
            $scope.form = {
            		sourcePwd : '',
            		newPassword : '',
            		confimPwd : ''
            };
            //页面事件
            $scope.goBack = function(){window.history.go(-1);}
            //按钮点击事件
            if($scope.form.newPassword != $scope.form.confimPwd){
            	angular.$dialog.alert('请确认您的新密码与确认密码是一致的');
            	return;
            }
            $('#changePwd').on('click',function(){
            	angular.$dialog.tips('正在执行，请稍后...');
            	$http({
            		method : 'POST',
            		url : 'services/modifyPwd.json',
            		params : $scope.form
            	}).success(function(data,header,config,status){
            		if(data.success){
            			angular.$dialog.tips("密码修改成功，系统将自动退出请用您的新密码进行登陆",3,function(){
            				$.ajax({
                        		url:URL.sysURL.logOut,
                        		success:function(json) {
                        			var expireDate = new Date();  
                        			expireDate.setDate(expireDate.getDate());                
                        			angular.$cookies.put('token', 'oatmeal', {'expires': expireDate.toUTCString()});
                        			angular.$cookies.put('token');
                        			window.location.href = 'index.jsp';
                                },error : function(){
                                	angular.$dialog.tips('抱歉，推出系统失败，请稍后再试！');
                                }
                        	});
                    	});
            		}else{
            			angular.$dialog.tips(data.msg_info,3,function(){});
            		}
            	}).error(function(data,header,config,status){
                	angular.$dialog.tips("修改密码时系统发生异常，请稍后再试",3,function(){});
                });
            	/*******************/
            });
        }
        ]);
    };
});