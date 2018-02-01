/**
 * User: 吴元森/15909910367@163.com
 * Date: 2017/2/10
 * Time: 10:48
 */
define(['require', 'angular', 'myView','jqGrid'], function (require, angular) {
    return function (module, controller) {
        /*! 创建默认模块及默认控制器 */
        angular.module(module, ['myView']).controller(controller, ['$scope', '$location', '$view','$http',
            function ($scope, $location, $view,$http) {
                $scope.app.layout.classes.body = 'body';
                $scope.location_path = "用户管理";
                $scope.form = {
                		jobstate:'',
                		sex:'',
                		realname:'',
                		mobphone : ''
                };
                
                $scope.reloadClick = function(){
                	$("#divData").html("");
                	$scope.initGrid($scope.form);
                };
                $scope.deleteClick = function(code,name){
                    angular.$dialog.confirm('您确定要删除用户['+name+']吗?',function(){
                        if(code === 1 || name === "admin"){
                        	angular.$dialog.tips('您不可以删除此用户!');
                        	return;
                        }
                        angular.$dialog.tips('正在删除所选数据，请稍后');
                    });
                };
                $scope.modifyClick = function(code){
                	window.localStorage.setItem('PK_CODE',code)
                	window.location.href = "#/sys/user/editor"
                };
                $scope.addClick = function (){
                	window.localStorage.setItem('PK_CODE',"");
                    window.location.href = "#/sys/user/editor"
                }
                $scope.initGrid = function(data){
                	$("#divData").jeGrid({
                        dataUrl: URL.sysURL.user.find,
                        jsondataType: 'json',
                        params:data,
                        columnSort:[],
                        columns:['姓名','登录名','性别','联系电话','身份证号码','所在部门','职务','状态','备注','&nbsp;'],
                        colsHtml:[
                            {field:'realname',html:'<span>{@#realname@}</span>'},
                            {field:'loginname',html:'<span>{@#loginname@}</span>'},
                            {field:'sexText',html:'<span>{@#sexText@}</span>'},
                            {field:'mobphone',html:'<span>{@#mobphone@}</span>'},
                            {field:'idcard',html:'<span name="idcard">{@#idcard@}</span>'},
                            {field:'deptname',html:'<span>{@#deptname@}</span>'},
                            {field:'postText',html:'<span>{@#postText@}</span>'},
                            {field:'jobstateText',html:'<span>{@#jobstateText@}</span>'},
                            {field:'remarks',html:'<span>{@#remarks@}</span>'},
                            {field:'id',html:
                                '<a href="javascript:void(0);" ng-click="modifyClick({@#id @});" class="tooledit mr10 db" title="编辑"></a>' + 
                            	'<a href="javascript:void(0);" ng-click="deleteClick({@#id @},\'{@#realname @}\');" class="tooldel mr10 db" title="删除"></a>'
                            }
                        ],success:function(){
                        	$.fn.reviewAngularDOM(angular,$('#divData'));
                        	$('span').each(function(index,obj){
                        		$(obj).text($(obj).text() == "null"?"":$(obj).text());
                        	});
                        	$('span[name=idcard]').each(function(index,obj){
                        		$(obj).text($(obj).text() == "null"?"":$(obj).text().subStr(6,1));                        		
                        	});
                        }
                    });
                }
                //页面事件
                $scope.initGrid({});
            }
        ]);
    };
});