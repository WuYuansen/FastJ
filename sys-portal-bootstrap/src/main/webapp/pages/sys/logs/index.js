/**
 * 
 * <p> Title:Logs EXTJS VIEW</p>
 * <p> Description:  系统日志</p>
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
                $scope.location_path = "系统日志";
                $scope.form = {
                		status:'',
                		sex:'',
                		realName:'',
                		tel : ''
                };
              //初始化表格
                $scope.initGrid = function(url){
                	$("#divData").jeGrid({
                        dataUrl: url || URL.sysURL.logs.find,
                        jsondataType: 'json',
                        columnSort:[1,5],
                        dataRows : 'list',
                        columns:[
//                				'日志类型',
                				'操作来源',
                				'操作类型',
                				'操作说明',
                				'操作用户',
                				'操作时间',
                				'IP'],
                        colsHtml:[
//	        	            {field:'logstype',html:'<span>{@#logstype@}</span>'},
	        	            {field:'logssource',html:'<span>{@#logssource@}</span>'},
	        	            {field:'operationtype',html:'<span>{@#operationtype@}</span>'},
	        	            {field:'operationremarks',html:'<span>{@#operationremarks@}</span>'},
	        	            {field:'operationuser',html:'<span>{@#operationuser@}</span>'},
	        	            {field:'operationdate',html:'<span name="operationdate">{@#operationdate@}</span>'},
	        	            {field:'operationip',html:'<span>{@#operationip@}</span>'}
                        ],success:function(){
                        	$('span').each(function(index,obj){
                        		$(obj).text($(obj).text() == "null"?"":$(obj).text());
                        	});
                        	$('span[name=operationdate]').each(function(index,obj){
                        		$(obj).text($filter("date")(new Date(parseInt($(obj).text())), "yyyy-MM-dd HH:mm"));
                        	});
                        }
                    });
                }
                $scope.reloadClick = function(){
                	$("#divData").html("");
                	$scope.initGrid();
                };
                $scope.initGrid();
            }
        ]);
    };
});