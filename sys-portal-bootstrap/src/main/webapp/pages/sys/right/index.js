/**
 * 
 * <p> Title:Right EXTJS VIEW</p>
 * <p> Description:  权限</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
"use strict"
define(['require', 'angular','jquery','myView','zTree','jqGrid'], function (require, angular) {
    return function (module, controller) {
        angular.module(module, ['myView']).controller(controller, ['$scope', '$location', '$view','$http','$filter',
            function ($scope, $location, $view,$http,$filter) {
                $scope.app.layout.classes.body = 'body';
                $scope.location_path = "权限管理";
                $scope.form = {sourcescode:''};
                $scope.initGrid = function(data){
                	$("#divData").jeGrid({
                        dataUrl: URL.sysURL.right.find,
                        jsondataType: 'json',
                        params : data,
                        columnSort:[],
                        columns:[
                				'模块名称',
                				'权限字 ',
                				'权限名称',
                				'修改人员',
                				'修改日期',
                				'&nbsp;'],
                        colsHtml:[
                	            {field:'modularName',html:'<span>{@#modularName@}</span>'},
                	            {field:'rightcode',html:'<span>{@#rightcode@}</span>'},
                	            {field:'rightname',html:'<span>{@#rightname@}</span>'},
                	            {field:'modifyuser',html:'<span>{@#modifyuser@}</span>'},
                	            {field:'modifydate',html:'<span name="modifydate">{@#modifydate@}<span>'},
                	            {field:'id',html:
                                '<a href="javascript:void(0);" ng-click="modifyClick({@#id @});" class="tooledit mr10 db" title="编辑"></a>' + 
                            	'<a href="javascript:void(0);" ng-click="deleteClick({@#id @},\'{@#modularName @}\');" class="tooldel mr10 db" title="删除"></a>'
                            }
                        ],
                        success:function(){
                        	$.fn.reviewAngularDOM(angular,$('#divData'));
                        	$('span').each(function(index,obj){
                        		$(obj).text($(obj).text() == "null"?"":$(obj).text());
                        	});
                        	$('span[name=modifydate]').each(function(index,obj){
                        		$(obj).text($filter("date")(new Date(parseInt($(obj).text())), "yyyy-MM-dd HH:mm"));
                        	});
                        }
                    });
                }
                $scope.reloadClick = function(){
                	$scope.form = {sourcescode:''};
                	$("#divData").html("");
                	$scope.initGrid($scope.form);
                };

                $scope.deleteClick = function(code,name){
                	angular.$dialog.confirm('您确定要删除['+name+']吗?',function(){
                        angular.$dialog.tips('正在删除所选数据，请稍后');
                    });
                };

                $scope.modifyClick = function(code){
                	window.localStorage.setItem('PK_CODE',code)
                	window.location.href = "#/sys/right/editor"
                };

                $scope.addClick = function(){
                	window.localStorage.setItem('PK_CODE',"");
                    window.location.href = "#/sys/right/editor"
                }
                //加载树菜单
                $scope.initTree = function(){
                	$http({
                		method : 'GET',
                		url : URL.sysURL.modular.tree,
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
        			         			var zTree = $.fn.zTree.getZTreeObj("treeDemo_right"),
        			         			nodes = zTree.getSelectedNodes()
        			         			$scope.form.sourcescode = nodes[0].modularcode;
        			         			$scope.reloadClick();
            		      			}
            		         	}
                		};
//                		setTimeout(function(){
	                		$.fn.zTree.init($("#treeDemo_right"), setting, data);
	                		$('#treeDemo_right').height(($('.my-tab').height()-180));
	                		$('#treeDemo_right').width($('#leftTree').width()-14);
//                		},2000);
                	}).error(function(data,header,config,status){
                    	angular.$dialog.tips("加载数据异常，请稍后再试",3,function(){
                    		window.history.go(-1);
                    	});
                    });
                    
                    window.onresize = function(){
                    	$('#treeDemo_right').height(($('.my-tab').height()-180));
                		$('#treeDemo_right').width($('#leftTree').width()-14);
                    }
                };
                
                $scope.initGrid($scope.form);
                //load tree store
            	$scope.initTree();
                /*=====================================*/
            }
        ]);
    };
});