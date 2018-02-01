/**
 * 
 * <p> Title:Dict EXTJS VIEW</p>
 * <p> Description:  字典</p>
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
                $scope.location_path = "字典管理";
                $scope.form = {
                		type:'',
                		parent:''
                };
                //初始化表格
                $scope.initGrid = function(data){
                	$("#divData").jeGrid({
                        dataUrl:  URL.sysURL.dict.find,
                        jsondataType: 'json',
                        params:data,
                        columnSort:[1,3,4],
                        columns:[
                				'分类名称',
                				'分类代码',
                				'键',
                				'值',
                				'状态',
                				'排序',
                				'类型',
                				'&nbsp;'],
                        colsHtml:[
                	            {field:'typename',html:'<span>{@#typename@}</span>'},
                	            {field:'keycode',html:'<span>{@#keycode@}</span>'},
                	            {field:'key',html:'<span>{@#key@}</span>'},
                	            {field:'value',html:'<span>{@#value@}</span>'},
                	            {field:'state',html:'<span name="state">{@#state@}</span>'},
                	            {field:'order',html:'<span>{@#order@}</span>'},
                	            {field:'type',html:'<span>{@#type@}</span>'},
                	            {field:'id',html:
                                '<a href="javascript:void(0);" ng-click="modifyClick({@#id @});" class="tooledit mr10 db" title="编辑"></a>' + 
                            	'<a href="javascript:void(0);" ng-click="deleteClick({@#id @},\'{@#typename @}\');" class="tooldel mr10 db" title="删除"></a>'
                            }
                        ],success:function(){
                        	$.fn.reviewAngularDOM(angular,$('#divData'));
                        	$('span').each(function(index,obj){
                        		$(obj).text($(obj).text() == "null"?"":$(obj).text());
                        	});
                        	
                        	$('span[name=state]').each(function(index,obj){
                        		$(obj).text($(obj).text()==='1'?"可用":'不可用');
                        	});
                        }
                    });
                }
                $scope.reloadClick = function onReLoad(){
                	$("#divData").html("");
                	$scope.initGrid($scope.form);
                };
                $scope.deleteClick = function onDeleteClick(code,name){
                	angular.$dialog.confirm('您确定要删除['+name+']吗?',function(){
                        angular.$dialog.tips('正在删除所选数据，请稍后');
                    });
                };
                $scope.modifyClick = function onModifyClick(code){
                	window.localStorage.setItem('PK_CODE',code)
                	window.location.href = "#/sys/dict/editor"
                };
                $scope.addClick = function onAddClick(){
                	window.localStorage.setItem('PK_CODE',"");
                    window.location.href = "#/sys/dict/editor"
                }
                //页面事件
                $scope.initGrid({});
            }
        ]);
    };
});
