/**
 * User: 吴元森/15909910367@163.com
 * Date: 2017/3/7
 * description : 
 * Time: 14:01
 */
define(['require', 'angular', 'myView', 'myForm','zTree'], function (require, angular) {
    return function (module, controller) {
        angular.module(module, ['myView', 'myForm']).controller(controller, ['$scope', '$location', '$view','$http', function ($scope, $location, $view,$http) {
            $scope.location_path = "新增/编辑系统资源";
            $scope.app.layout.classes.body = 'body';
            $scope.actionURL = window.localStorage.getItem('PK_CODE').length===0?URL.sysURL.modular.save:URL.sysURL.modular.modify;
            
            $scope.form = {
        		id:window.localStorage.getItem('PK_CODE'),
				modularcode : '',	//模块编码
				modularname : '',	//模块名称
				modularen : '',	//模块拼音
				modularright : [],	//权限字 表示模块有那些权限，权限之间由逗号隔开
				showname : '',	//显示名称
//				parent : '',	//父类
//				children : '',	//子类
				extendclass : '',	//延伸类
				extendtype : '',	//延伸码
				remarks : '',	//备注
				icon : '',	//图标
				orders : 0,	//排序
	        };
            if(window.localStorage.getItem('PK_CODE')){
            	$http({
            		method : 'POST',
            		url : URL.sysURL.modular.get,
            		params : {
            			'code':window.localStorage.getItem('PK_CODE')
            		}
            	}).success(function(data,header,config,status){
            		$scope.form = removeOverField($scope.form,data);
            		$scope.form.modularname = data.name;
            		$scope.form.orders = data.order;
            	}).error(function(data,header,config,status){
                	angular.$dialog.tips("加载数据异常，请稍后再试",3,function(){
                		window.history.go(-1);
                	});
                });
            }
            //页面事件
            $scope.modularTypeChanage = function(){
            	alert(666);
            };
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
    			         	onClick: function(e, treeId, treeNode) {
			         			var zTree = $.fn.zTree.getZTreeObj("treeDemoByMenu"),
			         			nodes = zTree.getSelectedNodes(),
			         			v = "";
			         			t = "";
			         			nodes.sort(function compare(a,b){return a.id-b.id;});
	              				for (var i=0, l=nodes.length; i<l; i++) {
	              					v += nodes[i].showname;
	              					t += nodes[i].modularcode;
	              				}
	              				var cityObj = $('input[name=childrenText]');
	              				var cityValue = $('input[name=children]');
	              				cityObj.val(v);
	              				cityValue.val(t);
	              				$scope.form.modularcode = t;
	              				$scope.hideMenu();
    		      			}
    		         	}
        		};
        		$.fn.zTree.init($("#treeDemoByMenu"), setting, data);
        	}).error(function(data,header,config,status){
            	angular.$dialog.tips("加载数据异常，请稍后再试",3,function(){
            		window.history.go(-1);
            	});
            });
            /********************/
            //监听用户选择的模块类型
            //	如果是菜单则显示操作  
            $scope.change = function(){
            	if($('select[name=extendclass').val() === 'menu'){
            		$('#right_').show();
            		$('#pageHref').show();
            	}else{
            		$('#right_').hide();
            		$('#pageHref').hide();
            		if($('select[name=extendclass').val() === 'part'){
                		$('#pageHref').show();
                	}else{
                		$('#pageHref').hide();
                	}
            	}
            }
        }
        ]);
    };
});