/**
 * 
 * <p> Title:Role EXTJS VIEW</p>
 * <p> Description:  角色</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
define(['require', 'angular', 'myView','jqGrid'], function (require, angular) {
    return function (module, controller) {
        angular.module(module, ['myView']).controller(controller, ['$scope', '$location', '$view','$http','$filter',
            function ($scope, $location, $view,$http,$filter) {
                $scope.app.layout.classes.body = 'body';
                $scope.location_path = "角色管理";
                $scope.form = {};
              //初始化表格
                $scope.initGrid = function(url){
                	$("#divData").jeGrid({
                        dataUrl: url || URL.sysURL.role.find,
                        jsondataType: 'json',
                        columnSort:[],
                        columns:[
                				'角色名称',
                				'备注',
                				'修改人员',
                				'修改日期',
                				'&nbsp;'],
                        colsHtml:[
                	            {field:'rolename',html:'<span>{@#rolename@}</span>'},
                	            {field:'remarks',html:'<span>{@#remarks@}</span>'},
                	            {field:'modifyuser',html:'<span>{@#modifyuserText@}</span>'},
                	            {field:'modifydate',html:'<span name="modifydate">{@#modifydate@}</span>'},
                	            {field:'id',html:
                                '<a href="javascript:void(0);" ng-click="modifyClick({@#id @});" class="tooledit mr10 db" title="编辑"></a>' + 
                            	'<a href="javascript:void(0);" ng-click="deleteClick({@#id @},\'{@#rolename @}\');" class="tooldel mr10 db" title="删除"></a>'+
                            	'<a href="javascript:void(0);" ng-click="auth({@#id @},\'{@#rolename @}\');" class="btn tool_Btn db" title="授权">授权</a>'+
                            	'<a href="javascript:void(0);" ng-click="assignUser({@#id @},\'{@#rolename @}\');" class="btn tool_Btn db" title="分配用户">分配用户</a>'
                            }
                        ],success:function(){
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
                	$("#divData").html("");
                	$scope.initGrid();
                };

                $scope.deleteClick = function(code,name){
                	angular.$dialog.confirm('您确定要删除角色['+name+']吗?',function(){
                        angular.$dialog.tips('正在删除所选数据，请稍后');
                        $http({
                        	method: 'GET',
                        	url: URL.sysURL.role.remove,
                        	params : {
                        		'code':code
                        	}
                        }).then(function successCallback(response) {
                        		console.log(response);
	                        	var data = response.data;
	                        	if (data.success === true) {
	                        		$scope.reloadClick();
	                        		angular.$dialog.success(data.msg_info || Locale.dataRemoveSuccess, 2, function () {
	                                });
	                            } else {
	                            	$scope.reloadClick();
	                            	angular.$dialog.error(data.info || Locale.dataRemoveFailure, 3, function () {
	                                });
	                            }
                        	}, function errorCallback(response) {
                        		var data = response.data;
                        		$scope.reloadClick();
                        		angular.$dialog.error(data.info || Locale.operError, 3, function () {
                                });
                        		
                        });
                    });
                };

                $scope.modifyClick = function(code){
                	window.localStorage.setItem('PK_CODE',code)
                	window.location.href = "#/sys/role/editor"
                };

                $scope.addClick = function(){
                	window.localStorage.setItem('PK_CODE',"");
                    window.location.href = "#/sys/role/editor"
                }
                $scope.auth = function(code,name){
                	window.localStorage.setItem('PK_CODE',code);
                	window.localStorage.setItem('KEY_NAME',name);
                    window.location.href = "#/sys/role/roleRight";
                }
                $scope.assignUser = function(code,name){
                	window.localStorage.setItem('PK_CODE',code);
                	window.localStorage.setItem('KEY_NAME',name);
                    window.location.href = "#/sys/role/roleUser";
                }
                //页面事件
                $scope.initGrid();
            }
        ]);
    };
});