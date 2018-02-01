/**
 * 
 * <p> Title:Right EXTJS VIEW</p>
 * <p> Description:  角色授权</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
define(['require', 'angular', 'myView','jqGrid','zTree'], function (require, angular) {
    return function (module, controller) {
        angular.module(module, ['myView']).controller(controller, ['$scope', '$location', '$view','$http','$filter',
            function ($scope, $location, $view,$http,$filter) {
                $scope.app.layout.classes.body = 'body';
                $scope.location_path = "角色授权["+window.localStorage.getItem('KEY_NAME')+"]";
                $scope.form = {sourcescode:''};
                //加载树菜单
                $http({
            		method : 'GET',
            		url : URL.sysURL.roleright.authorizationModular,
            		params:{
            			'parentCode':'0001002'
            		}
            	}).success(function(data,header,config,status){
            		var setting = {
        		         view: {dblClickExpand: true},
        		         check: {enable: true},
        		         data: {simpleData: {enable: true}},
        		         callback: {
    						beforeCheck: $scope.beforeCheck,
    						onCheck: $scope.onCheck
    					}
            		};
            		$.fn.zTree.init($("#treeDemo_right"), setting, data.list);
            		$scope.setCheck();
            		$('#treeDemo_right').height(($('.my-tab').height()-160));
            		$('#treeDemo_right').width($('.centinfo').width()-80);
            	}).error(function(data,header,config,status){
                	angular.$dialog.tips("加载数据异常，请稍后再试",3,function(){
                		window.history.go(-1);
                	});
                });
                
                $scope.beforeCheck = function(treeId, treeNode) {
        			return (treeNode.doCheck !== false);
        		}
                var ids = [];
        		$scope.onCheck = function(e, treeId, treeNode) {
        			ids = [];	//存储选中内容
        			$scope.getChildren(ids,treeNode);
        		}		
        		
        		$scope.getChildren = function(ids,treeNode){
        				if(treeNode.id && treeNode.checked){
        					ids.push(treeNode.id);//sourcesCode
        				}
	       			 	if (treeNode.isParent){
	       					for(var obj in treeNode.children){
	       						$scope.getChildren(ids,treeNode.children[obj]);
	       					}
	       			    }
	       			 return ids;
	       		}
                
                $scope.setCheck = function() {
        			var zTree = $.fn.zTree.getZTreeObj("treeDemo_right"),
        			type = { "Y":'ps', "N":'ps'};
        			zTree.setting.check.chkboxType = type;
        		}
                
                $scope.goBack = function(){
                	window.history.go(-1);
                }
                
                window.onresize = function(){
                	$('#treeDemo_right').height(($('.my-tab').height()-160));
                	$('#treeDemo_right').width($('.centinfo').width()-80);
                }
                
                $('button[type=submit]').on('click',function(){
                	if(!window.localStorage.getItem('PK_CODE')){
                		angular.$dialog.error(Locale.operError);
                		return;
                	}
                	$http({
                		method : 'POST',
                		url : URL.sysURL.roleright.rightRoleAuthorization,
                		params:{
                			'r_code':window.localStorage.getItem('PK_CODE'),
                			'ri_code':ids.toString()
                		}
                	}).success(function(data,header,config,status){
                		if(data.success){
	                		angular.$dialog.tips("为角色【"+window.localStorage.getItem('KEY_NAME')+"】分配权限成功！",3,function(){
	                    		$scope.goBack();
	                    	});
                		}else{
                			angular.$dialog.tips("为角色【"+window.localStorage.getItem('KEY_NAME')+"】分配权限失败！<br />失败原因："+data.msg_info,3,function(){
	                    	});
                		}
                	}).error(function(data,header,config,status){
                    	angular.$dialog.tips("加载数据异常，请稍后再试",3,function(){
                    		$scope.goBack();
                    	});
                    });
                })
            }
        ]);
    };
});