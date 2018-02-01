/**
 * 
 * <p> Title:Dept EXTJS VIEW</p>
 * <p> Description:  部门</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
define(['require', 'angular', 'myView','jqGrid'], function (require, angular) {
    return function (module, controller) {
        angular.module(module, ['myView']).controller(controller, ['$scope', '$location', '$view','$http',
            function ($scope, $location, $view,$http) {
                $scope.app.layout.classes.body = 'body';
                $scope.location_path = "部门管理";
                $scope.form = {
                		status:'',
                		sex:'',
                		realName:'',
                		tel : ''
                };
              //初始化表格
                $scope.initGrid = function(url){
                	$("#divData").jeGrid({
                        dataUrl: url || URL.sysURL.dept.find,
                        jsondataType: 'json',
                        columnSort:[],
                        columns:[
                				'部门名称',
                				'部门类型',
                				'部门负责人',
                				'部门介绍',
                				'&nbsp;'],
                        colsHtml:[
                	            {field:'deptname',html:'<span>{@#deptname@}</span>'},
                	            {field:'depttypename',html:'<span>{@#depttypename@}</span>'},
                	            {field:'deptmanagername',html:'<span>{@#deptmanagername@}</span>'},
                	            {field:'deptremarks',html:'<span>{@#deptremarks@}</span>'},
                	            {field:'id',html:
                                '<a href="javascript:void(0);" ng-click="modifyClick({@#id @});" class="tooledit mr10 db" title="编辑"></a>' + 
                            	'<a href="javascript:void(0);" ng-click="deleteClick({@#id @},\'{@#deptname @}\');" class="tooldel mr10 db" title="删除"></a>'
                            }
                        ],success:function(){
                        	$.fn.reviewAngularDOM(angular,$('#divData'));
                        	$('span').each(function(index,obj){
                        		$(obj).text($(obj).text() == "null"?"":$(obj).text());
                        	});
                        }
                    });
                }
                $scope.reloadClick = function(){
                	$("#divData").html("");
                	$scope.initGrid();//$scope.form
                };
                $scope.deleteClick = function(code,name){
                	angular.$dialog.confirm('您确定要删除部门['+name+']吗?',function(){
                        angular.$dialog.tips('正在删除所选数据，请稍后');
                    });
                };
                $scope.modifyClick = function(code){
                	window.localStorage.setItem('PK_CODE',code)
                	window.location.href = "#/sys/dept/editor"
                };
                $scope.addClick = function(){
                	window.localStorage.setItem('PK_CODE',"");
                    window.location.href = "#/sys/dept/editor"
                }
                //页面事件
                $scope.initGrid();
            }
        ]);
    };
});