/**
 * User: 吴元森/15909910367@163.com
 * Date: 2017/3/7
 * description : 
 * Time: 14:01
 */
define(['require', 'angular', 'myView', 'myForm','zTree'], function (require, angular) {
    return function (module, controller) {
        angular.module(module, ['myView', 'myForm']).controller(controller, ['$scope', '$location', '$view','$http', function ($scope, $location, $view,$http) {
            $scope.location_path = "新增/编辑权限";
            $scope.app.layout.classes.body = 'body';
            $scope.actionURL = window.localStorage.getItem('PK_CODE').length===0?URL.sysURL.right.save:URL.sysURL.right.modify;
            $('.centinfo').height($('.my-tab').height()-60);
            $scope.form = {
        		id:window.localStorage.getItem('PK_CODE'),
				modularname : '',	//模块名称
				childrenmodular : '',	//子模块名称
				rightcode : [],	//权限字 表示有那些权限，权限之间由逗号隔开
				rightname : '',	//权限名称
				sourcescode : '',	//资源对象编号
				modifyuser : '',	//修改人员
				modifydate : '',	//修改日期
				remarks : '',	//备注
            };
            
            if(window.localStorage.getItem('PK_CODE')){
            	$http({
            		method : 'GET',
            		url : URL.sysURL.right.get,
            		params : {
            			'code':window.localStorage.getItem('PK_CODE')
            		}
            	}).success(function(data,header,config,status){
            		$scope.form = data;
            	}).error(function(data,header,config,status){
                	angular.$dialog.tips("加载数据异常，请稍后再试",3,function(){
                		window.history.go(-1);
                	});
                });
            }
            //页面事件
            $scope.goBack = function(){window.history.go(-1);}
            $scope.showMenu = function(){
            	var cityObj = $('input[name=deptcode]');
    			var cityOffset = $('input[name=deptcode]').offset();
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
        		url : URL.sysURL.modular.tree,
        	}).success(function(data,header,config,status){
        		var setting = {
    		         view: {dblClickExpand: false},
    		         data: {simpleData: {enable: true}},
    		         callback: {
    			         	beforeClick: function(treeId, treeNode) {
    			         		var check = (treeNode && !treeNode.isParent);
    			         		if (!check) angular.$dialog.tips("权限只能定义在子节点中");
    			         		return check;
    			         	},
    			         	onClick: function(e, treeId, treeNode) {
			         			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			         			nodes = zTree.getSelectedNodes();
			         			nodes.sort(function compare(a,b){return a.id-b.id;});
			         			$('input[name=modularname]').val(nodes[0].name);
			         			$('input[name=sourcescode]').val(nodes[0].modularcode);
			         			$('input[name=childrenmodular]').val(nodes[0].showname);
	              				$scope.hideMenu();
	              				//选择完成以后更具菜单去查询书模块拥有的权限
	              				$http({
	              					url : URL.sysURL.right.selectAllByZydm + nodes[0].modularright,
	              					method : 'get'
	              				}).success(function(data,headler,config,status){
	              					for(var rig in data.extResultUtil.list){
	              						var obj = data.extResultUtil.list[rig];
	              						$(':checkbox[name="rightcode]').removeAttr("disabled");
	              					}
	              					//
	              				}).error(function(data,header,config,status){
	              					angular.$dialog.tips(Locale.loadDataError);
	              				});
	              				$('#right_div').show();
    		      			}
    		         	}
        		};
        		$.fn.zTree.init($("#treeDemo"), setting, data);
        	}).error(function(data,header,config,status){
            	angular.$dialog.tips(Locale.loadDataError,3,function(){
            		window.history.go(-1);
            	});
            });
            //选中值操作
            $scope.treeChanage = function(){
            	console.log('tree change');
            }
            
            
            
            //////////////////////////////////////////////////////////////////////////////////
        }
        ]);
    };
});
