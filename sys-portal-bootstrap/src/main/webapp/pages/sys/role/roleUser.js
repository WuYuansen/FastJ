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
                $scope.location_path = "分配用户["+window.localStorage.getItem('KEY_NAME')+"]";
                $scope.form = {};
                $scope.goBack = function(){
                	window.history.go(-1);
                }
                //加载用户
                $scope.NotChooseSearchObj = {
                		rolecode:window.localStorage.getItem('PK_CODE'),
                		deptCode : '1'
                		
                    };
                    $scope.chooseSearchObj = {roleCode:window.localStorage.getItem('PK_CODE')};
                    
                    //待选用户列表
                    $scope.initGridByNotChoose = function(data){
                    	$("#divData_notChoose").html("");
                    	$("#divData_notChoose").jeGrid({
                            dataUrl: URL.sysURL.userrole.selectUserNotHavaRoleByRoleCode,
                            jsondataType: 'json',
                            params:data,
                            dataRows:'list',
                            pageCount:["totalPage","total"],
                            columnSort:[],
                            columns:[/*'<input id="id" name="valitems" type="checkbox"/>',*/'姓名','联系电话','&nbsp;'],
                            colsHtml:[
                                {field:'realname',html:'<span>{@#realname@}</span>'},
                                {field:'postText',html:'<span>{@#mobphone@}</span>'},
                                {field:'id',html:'<a href="javascript:;" ng-click="addChooseUserToRole({@#id@},\'{@#realname@}\');" title="分配用户"><i class="fa fa-arrow-right red"></i></a>'}
                            ],success:function(){
                            	$.fn.reviewAngularDOM(angular,$('#divData_notChoose'));
                            	$('span').each(function(index,obj){
                            		$(obj).text($(obj).text() == "null"?"":$(obj).text());
                            	});
                            }
                        });
                    }
                    $scope.initGridByNotChoose($scope.NotChooseSearchObj);
                    //已选择
                    $scope.initGridByChoose = function(data){
                    	$("#divData_Choose").html("");
                    	$("#divData_Choose").jeGrid({
                            dataUrl: URL.sysURL.userrole.selectUserByRoleCode,
                            jsondataType: 'json',
                            params:data,
                            columnSort:[],
                            dataRows:'list',
                            pageCount:["totalPage","total"],
                            columns:['姓名','联系电话','&nbsp;'],
                            colsHtml:[
                                {field:'realname',html:'<span>{@#realname@}</span>'},
                                {field:'postText',html:'<span>{@#mobphone@}</span>'},
                                {field:'id',html:'<a href="javascript:;" title="移除此用户" ng-click="removeChooseUser({@#id@},\'{@#realname@}\')" class="tooldel mr10 db"></a>'}
                            ],success:function(){
                            	$.fn.reviewAngularDOM(angular,$('#divData_Choose'));
                            	$('span').each(function(index,obj){
                            		$(obj).text($(obj).text() == "null"?"":$(obj).text());
                            	});
                            }
                        });
                    }
                    $scope.removeChooseUser = function(code,name){
                    	$http({
                    		method : 'GET',
                    		url : URL.sysURL.userrole.remove,
                    		params : {
                    			rolecode: window.localStorage.getItem('PK_CODE'),//   角色编号
                    			usercode : code
                    		}
                    	}).success(function(data){
                    		if(data.success){
                    			$scope.initGridByNotChoose($scope.NotChooseSearchObj);
                    			$scope.initGridByChoose($scope.chooseSearchObj);
                    		}else{
                    			angular.$dialog.tips("为角色移除已分配用户操作发生异常，请稍后再试",3,function(){
                    				$scope.initGridByNotChoose($scope.NotChooseSearchObj);
                        			$scope.initGridByChoose($scope.chooseSearchObj);
                            	});
                    		}
                    	}).error(function(data,header,config,status){
                        	angular.$dialog.tips("为角色移除已分配用户操作发生异常，请稍后再试或联系管理员",3,function(){
                        		$scope.initGridByNotChoose($scope.NotChooseSearchObj);
                    			$scope.initGridByChoose($scope.chooseSearchObj);
                        	});
                        });
                    }
                    $scope.initGridByChoose($scope.chooseSearchObj);
                    
                    $scope.addChooseUserToRole = function(userid,username){
                    	$http({
                    		method : 'POST',
                    		url : URL.sysURL.userrole.save,
                    		params : {
                    			rolecode: window.localStorage.getItem('PK_CODE'),//   角色编号
                    			usercode:userid,//   用户编号
                    			remarks : window.localStorage.getItem('KEY_NAME') + "-" + username//   备注
                    		},
                    	}).success(function(data,header,config,status){
                    		if(data.extResultUtil.success){
                    			$scope.initGridByNotChoose($scope.NotChooseSearchObj);
                    			$scope.initGridByChoose($scope.chooseSearchObj);
                    		}else{
                    			angular.$dialog.tips("为角色分配用户操作发生异常，请稍后再试",3,function(){
                    				$scope.initGridByNotChoose($scope.NotChooseSearchObj);
                        			$scope.initGridByChoose($scope.chooseSearchObj);
                            	});
                    		}
                    	}).error(function(data,header,config,status){
                        	angular.$dialog.tips("为角色分配用户操作发生异常，请稍后再试或联系管理员",3,function(){
                        		$scope.initGridByNotChoose($scope.NotChooseSearchObj);
                    			$scope.initGridByChoose($scope.chooseSearchObj);
                        	});
                        });
                    }
                //加载组织机构树
                $http({
            		method : 'GET',
            		url : URL.sysURL.dept.combobox,
            	}).success(function(data,header,config,status){
            		var setting = {
        		         view: {dblClickExpand: false},
        		         data: {simpleData: {enable: true}},
        		         callback: {
        			         	beforeClick: function(treeId, treeNode) {
        			         		var check = (treeNode && !treeNode.isParent);
        			         		if (!check) angular.$dialog.tips("只能选择子节点...");
        			         		return check;
        			         	},
        			         	onClick: function(e, treeId, treeNode) {
    			         			var zTree = $.fn.zTree.getZTreeObj("treeDept_right"),
    			         			nodes = zTree.getSelectedNodes();
//    			         			v = "";
//    			         			t = "";
//    			         			nodes.sort(function compare(a,b){return a.id-b.id;});
//    	              				for (var i=0, l=nodes.length; i<l; i++) {
//    	              					v += nodes[i].deptname + ",";
//    	              					t += nodes[i].id + ",";
//    	              				}
    	              				
    	              				$scope.NotChooseSearchObj.deptCode = nodes[0].id;
    	              				$scope.initGridByNotChoose($scope.NotChooseSearchObj);
        		      			}
        		         	}
            		};
            		$.fn.zTree.init($("#treeDept_right"), setting, data);
            		$('#treeDept_right').height(($('.my-tab').height()-210));
            		$('#treeDept_right').width($('.panel-body').width()-10);
            		
            		$('#divData_notChoose').height(($('.my-tab').height()-198));
            		$('#divData_Choose').height(($('.my-tab').height()-198));
            	}).error(function(data,header,config,status){
                	angular.$dialog.tips("加载数据异常，请稍后再试",3,function(){
                		window.history.go(-1);
                	});
                });
                window.onresize = function(){
                	$('#treeDept_right').height(($('.my-tab').height()-210));
            		$('#treeDept_right').width($('.panel-body').width()-10);
            		$('#divData_notChoose').height(($('.my-tab').height()-198));
            		$('#divData_Choose').height(($('.my-tab').height()-198));
                };
            }
        ]);
    };
});