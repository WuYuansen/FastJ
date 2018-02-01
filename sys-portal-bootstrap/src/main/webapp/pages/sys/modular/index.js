/**
 * 
 * <p> Title:Modular EXTJS VIEW</p>
 * <p> Description:  系统资源</p>
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
                $scope.location_path = "系统资源";
                $scope.form = {
                		name:'',
                		extendclass : ''
                };
                //初始化表格
                $scope.initGrid = function(data){
                	$("#divData").jeGrid({
                        dataUrl: URL.sysURL.modular.find,
                        jsondataType: 'json',
                        params : data,
                        columnSort:[],
                        columns:[
                				'模块名称',
                				//'模块拼音',
                				'操作权限 ',
                				//'显示名称',
                				'类型',
                				'访问地址',
                				'图标',
                				'排序',
                				'修改人员',
                				'修改日期',
                				'&nbsp;'],
                        colsHtml:[
                	            {field:'modularname',html:'<span>{@#name@}</span>'},
                	            //{field:'modularen',html:'<span>{@#modularen@}</span>'},
                	            {field:'modularright',html:'<span name="modularright">{@#modularright@}</span>'},
                	            //{field:'showname',html:'<span>{@#showname@}</span>'},
                	            {field:'extendclass',html:'<span name="extendclass">{@#extendclass@}</span></span>'},
                	            {field:'extendtype',html:'<span>{@#extendtype@}</span>'},
                	            {field:'icon',html:'<i class="{@#icon@} blue" />'},
                	            {field:'order',html:'<span>{@#order@}</span>'},
                	            {field:'modifyuser',html:'<span>{@#modifyuser@}</span>'},
                	            {field:'modifydate',html:'<span name="modifydate">{@#modifydate@}</span>'},
                	            {field:'id',html:
                                '<a href="javascript:void(0);" ng-click="modifyClick({@#id @});" class="tooledit mr10 db" title="编辑"></a>' + 
                            	'<a href="javascript:void(0);" ng-click="deleteClick({@#id @},\'{@#name@}\');" class="tooldel mr10 db" title="删除"></a>'
                            }
                        ],success:function(){
                        	$.fn.reviewAngularDOM(angular,$('#divData'));
                        	$('span').each(function(index,obj){
                        		$(obj).text($(obj).text() == "null"?"":$(obj).text());
                        	});
                        	$('span[name=modifydate]').each(function(index,obj){
                        		$(obj).text($filter("date")(new Date(parseInt($(obj).text())), "yyyy-MM-dd HH:mm"));
                        	});
                        	$('span[name=extendclass]').each(function(index,obj){
                        		if($(obj).text() === 'modules'){
                        			$(obj).text("模块");
                        		}else if($(obj).text() === 'menu'){
                        			$(obj).text("菜单");
                        		}else{
                        			$(obj).text("页面");
                        		}
                        	});
                        	$('span[name=modularright]').each(function(index,obj){
                        		var va = $(obj).text();
                        		if(va.length != 0){
                        			var htmls = "";
	                        		$($('div[name=right_code]').children()).each(function(index,obj2){
	                        			if(va.indexOf($(obj2).attr('value')) > -1){
	                        				htmls += '<i class="'+$(obj2).attr('class')+' orange"></i>&nbsp;';
	                        			}
	                        		});
	                        		$(obj).html(htmls);
                        		}
                        	});
                        }
                    });
                }
                $scope.reloadClick = function(){
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
                	window.location.href = "#/sys/modular/editor"
                };
                $scope.addClick = function(){
                	window.localStorage.setItem('PK_CODE',"");
                    window.location.href = "#/sys/modular/editor"
                }
                $scope.initGrid({});
            }
        ]);
    };
});