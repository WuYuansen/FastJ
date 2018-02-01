/**
 * User: 吴元森/15909910367@163.com
 * Date: 2017/3/7
 * description : 
 * Time: 14:01
 */
define(['require', 'angular', 'myView', 'myForm'], function (require, angular) {
    return function (module, controller) {
        angular.module(module, ['myView', 'myForm']).controller(controller, ['$scope', '$location', '$view','$http', function ($scope, $location, $view,$http) {
            $scope.location_path = "新增/编辑字典";
            $scope.app.layout.classes.body = 'body';
            $scope.actionURL = window.localStorage.getItem('PK_CODE').length===0?URL.sysURL.dict.save:URL.sysURL.dict.modify;
            
			
            $scope.form = {
        		id:window.localStorage.getItem('PK_CODE'),
				id : '',	//
				typename : '',	//类型名称
				keyname : '',	//名称
				keycode : '',	//代码
				value : '',	//值
				parent : '',	//父级 
				state : '',	//状态（1可用 2不可用）
				ismodify : '',	//是否可修改
				orders : '',	//排序
				remarks : '',	//备注
				type : '',	//类型值
            };
            if(window.localStorage.getItem('PK_CODE')){
            	$http({
            		method : 'POST',
            		url : URL.sysURL.dict.get,
            		params : {
            			'code':window.localStorage.getItem('PK_CODE')
            		}
            	}).success(function(data,header,config,status){
            		$scope.form = removeOverField($scope.form,data);
            		$scope.state = data.state + '';
            	}).error(function(data,header,config,status){
                	angular.$dialog.tips("加载数据异常，请稍后再试",3,function(){
                		window.history.go(-1);
                	});
                });
            }
            //页面事件
            $scope.goBack = function(){window.history.go(-1);}
        }
        ]);
    };
});