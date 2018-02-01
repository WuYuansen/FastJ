/**
 * User: 吴元森/15909910367@163.com
 * Date: 2017/3/7
 * Time: 14:01
 */

define(['require', 'angular', 'myView', 'myForm','zTree','inputMask','layui'], function (require, angular) {
    return function (module, controller) {
        angular.module(module, ['myView', 'myForm']).controller(controller, ['$scope', '$location', '$view','$http', function ($scope, $location, $view,$http) {
            $scope.location_path = "新增/编辑用户信息";
            $scope.app.layout.classes.body = 'body';
            //填充内部
            $(":input").inputmask();
            //表单事件
            $scope.actionURL = window.localStorage.getItem('PK_CODE').length===0?URL.sysURL.user.save:URL.sysURL.user.modify;
            $scope.form = {
        		id:window.localStorage.getItem('PK_CODE'),
	        	loginname: '',//   用户登陆名
	        	password: '',//   
	        	realname: '',//   用户真实姓名
	        	deptcode: '',//   所属组织机构
	        	deptname: '',	//机构名称
	        	post: '',//   职务
	        	idcard: '',//    身份证号
	        	sex: '',//   性别
	        	nation: '',//   民族
	        	tel: '',//   办公电话
	        	mobphone: '',//   个人电话
	        	qq: '',//   QQ号
	        	email: '',//   电子邮箱
	        	jobstate: '',//   工作情况:1.在职;2.离职;3.休假
	        	address: '',//   家庭住址
	        	remarks: '',//   备注
	        	sexText: '',
	        	nationText: '',
	        	postText: '',
	        	jobstateText: '',
	        	confirm_password:'', //占位使用
        		deptcode :'',
        		deptname : ''
            };
            if(window.localStorage.getItem('PK_CODE')){
            	$http({
            		method : 'GET',
            		url : URL.sysURL.user.get,
            		params : {
            			'code':window.localStorage.getItem('PK_CODE')
            		}
            	}).success(function(data,header,config,status){
            		$scope.form = removeOverField($scope.form,data);
            		$scope.form.password = '';
            		$scope.form.sex = $scope.form.sex+"";
            		$scope.form.nation = $scope.form.nation+"";
            		$scope.form.jobstate = $scope.form.jobstate + "";
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
			         			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			         			nodes = zTree.getSelectedNodes(),
			         			v = "";
			         			t = "";
			         			nodes.sort(function compare(a,b){return a.id-b.id;});
	              				for (var i=0, l=nodes.length; i<l; i++) {
	              					v += nodes[i].deptname;
	              					t += nodes[i].id;
	              				}
	              				if (v.length > 0 ) v = v.substring(0, v.length-1);
	              				var cityObj = $('input[name=deptname]');
	              				var cityValue = $('input[name=deptcode]');
	              				cityObj.val(v);
	              				cityValue.val(t);
	              				$scope.form.deptcode = t;	//赋值
	              				$scope.hideMenu();
    		      			}
    		         	}
        		};
        		$.fn.zTree.init($("#treeDemo"), setting, data);
        	}).error(function(data,header,config,status){
            	angular.$dialog.tips("加载数据异常，请稍后再试",3,function(){
            		window.history.go(-1);
            	});
            });
        }
        ]);
    };
});
