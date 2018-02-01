define(['angular', 'myView', 'myForm'], function (angular) {


    /**
     * 定义模块函数
     * @param {string} module 默认模块名
     * @param {string} controller 默认模块控制器
     * @return {function}
     */
    return function (module, controller) {
        /*! 创建默认模块及默认控制器 */
        angular.module(module, ['myView', 'myForm']).controller(controller, ['$scope', '$form', '$view', function ($scope, $form, $view) {
                $scope.hideEye = false;
                // 登录状态检查
                if (angular.$cookies.get('token')) {
                	$form.$dialog.tips('检测到登录信息，正在验证...');
                	angular.$cookies.remove('token')
                }else{
//                	$.ajax({
//                		url:URL.sysURL.logOut,
//                		success:function(json) {
//                			angular.$cookies.remove('token');
//                			window.location.href = 'index.jsp';
//                        },error : function(){
//                        	angular.$dialog.tips('抱歉，推出系统失败，请稍后再试！');
//                        }
//                	})
                }
                // 表单默认值
                $scope.user = {
            		loginName: '', 
            		password: ''
            	};
                console.log(myBrowser());
                if(myBrowser()==="IE"){
                	$('button[type=submit]').attr('enabled',true);
                	angular.$dialog.alert('本系统暂不支持IE浏览器，为了您更好体验本系统建议您使用Chrome浏览器');
                	return;
                }
                // 提交表单
                $scope.submit = function () {
                    var index = angular.$dialog.loading();
                    $form.post(URL.sysURL.login, $scope.user, function (ret) {
                        angular.$dialog.close(index);
                        if (ret.success === true) {
                           $form.$dialog.tips(ret.msg_info, 2);
                           window.location.href = "admin.jsp#/welcome/index";
                        }else{
                        	$form.$dialog.tips(ret.msg_info);
                        }
                        return false;
                    });
                    return false;
                };
            }
        ]);
    };
});
