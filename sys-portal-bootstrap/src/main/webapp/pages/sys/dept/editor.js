/**
 * User: 吴元森/15909910367@163.com
 * Date: 2017/3/7
 * description : 
 * Time: 14:01
 */
define(['require', 'angular', 'myView', 'myForm','zTree'], function (require, angular) {
    return function (module, controller) {
        angular.module(module, ['myView', 'myForm']).controller(controller, ['$scope', '$location', '$view','$http', function ($scope, $location, $view,$http) {
            $scope.location_path = "新增/编辑部门";
            $scope.app.layout.classes.body = 'body';
            $scope.actionURL = window.localStorage.getItem('PK_CODE').length===0?URL.sysURL.dept.save:URL.sysURL.dept.modify;

            $('.centinfo').height($('.my-tab').height()-60);
            window.onresize=function(){
        	   $('.centinfo').height($('.my-tab').height()-60);
        	}
            $scope.form = {
        		id:window.localStorage.getItem('PK_CODE'), 
				deptname : '',	//部门名称
				depttype : '',	//部门类型
				deptmanagerid : '',	//部门负责人编号
				deptmanagername : '',	//部门负责人
				deptremarks : '',	//部门介绍
				deptsuper : '',	//上级部门
				deptsuperText:'', //上级部门中文
				managerarea : '',	//管辖区域
            };
            if(window.localStorage.getItem('PK_CODE')){
            	$http({
            		method : 'GET',
            		url : URL.sysURL.dept.get,
            		params : {
            			'code':window.localStorage.getItem('PK_CODE')
            		}
            	}).success(function(data,header,config,status){
            		$scope.form = removeOverField($scope.form,data);
            	}).error(function(data,header,config,status){
                	angular.dialog.tips("加载数据异常，请稍后再试",3,function(){
                		window.history.go(-1);
                	});
                });
            }
            //页面事件
            $scope.goBack = function(){window.history.go(-1);}
            
            $scope.showMenu = function(){
            	var cityObj = $('input[name=deptsuperText]');
    			var cityOffset = $('input[name=deptsuperText]').offset();
    			$("#menuContent").css({left:/*cityObj.left +*/ "0px", top:cityObj.outerHeight() + "px"}).slideDown("fast");
    			$("body").bind("mousedown", function(event){
    				if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
    					$scope.hideMenu();
    				}
    			});
            }
            $scope.hideMenu = function(){
            	$("#menuContent").fadeOut("fast");
    			$("body").unbind("mousedown", function(event){
    				if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
    					$scope.hideMenu();
    				}
    			});
            }
            //load Tree 
            $http({
        		method : 'GET',
        		url : URL.sysURL.dept.combobox,
        	}).success(function(data,header,config,status){
        		var setting = {
    		         view: {dblClickExpand: false},
    		         data: {simpleData: {enable: true}},
    		         callback: {
    			         	onClick: function(e, treeId, treeNode) {
			         			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			         			nodes = zTree.getSelectedNodes();
			         			$('input[name=deptsuperText]').val(nodes[0].deptname);
			         			$('input[name=deptsuper]').val(nodes[0].id);
			         			$scope.form.deptsuper = nodes[0].id;
	              				$scope.hideMenu();
    		      			}
    		         	}
        		};
        		$.fn.zTree.init($("#treeDemo"), setting, data);
        	}).error(function(data,header,config,status){
            	angular.$dialog.tips("加载数据异常，请稍后再试",3,function(){
            		window.history.go(-1);
            	});
            });
            
            
        }
        ]);
    };
});