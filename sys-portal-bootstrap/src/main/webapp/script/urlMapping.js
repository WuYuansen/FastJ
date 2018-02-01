"use strict";
;!(function(win){
    var localhost = 'services/';
    var suffix = ".json";
    URL = {
        pageSize:14,
        sysURL : {
        	login : localhost + 'login' + suffix,
        	logOut : localhost + 'logout' + suffix,
        	initMenu : localhost + 'init' + suffix,
        	dict : {
        		combobox : 		localhost + '/dict/combobox' + suffix + '?type=',
        		find : 			localhost + 'dict/data' + suffix,
        		save: 			localhost + 'dict/save' + suffix,
        		modify: 		localhost + 'dict/edit' + suffix,
        		remove: 		localhost + 'dict/delete' + suffix,
        		get :  			localhost + 'dict/find' + suffix
        		
        	},
        	dept : {
        		combobox : 		localhost + '/dept/deptTree'+suffix,
        		find : 			localhost + 'dept/data' + suffix,
        		save: 			localhost + 'dept/save' + suffix,
        		modify: 		localhost + 'dept/edit' + suffix,
        		remove: 		localhost + 'dept/delete' + suffix,
        		get :  			localhost + 'dept/find' + suffix
        	},
        	logs : {
        		find : localhost + 'logs/data' + suffix
        	},
        	modular:{
        		save: 			localhost + 'modular/save' + suffix,
        		modify: 		localhost + 'modular/edit' + suffix,
        		remove: 		localhost + 'modular/delete' + suffix,
        		tree : 			localhost + 'modular/modularTree' + suffix,
        		find : 			localhost + 'modular/data' + suffix,
        		get :  			localhost + 'modular/find' + suffix
        	},
        	right:{
        		save: 			localhost + 'right/save' + suffix,
        		modify: 		localhost + 'right/edit' + suffix,
        		remove: 		localhost + 'right/delete' + suffix,
        		find : 			localhost + 'right/data' + suffix,
        		get :  			localhost + 'right/find' + suffix,
        		selectAllByZydm:			localhost + 'dict/selectAllByZydm'+suffix+'?type=ModularRight&keycodes='
        	},
        	role:{
        		save: 			localhost + 'role/save' + suffix,
        		modify: 		localhost + 'role/edit' + suffix,
        		remove: 		localhost + 'role/delete' + suffix,
        		find : 			localhost + 'role/data' + suffix,
        		get :  			localhost + 'role/find' + suffix
        	},
        	roleright:{
        		save: 			localhost + 'roleright/save' + suffix,
        		modify: 		localhost + 'roleright/edit' + suffix,
        		remove: 		localhost + 'roleright/delete' + suffix, //
        		find :			localhost + 'roleright/data' + suffix,
        		get :  			localhost + 'roleright/find' + suffix,
        		authorizationModular : localhost + 'authorizationModular' + suffix,
        		rightRoleAuthorization : localhost + 'roleRight/rightRoleAuthorization' + suffix
        	},
        	userrole :{
        		save: 			localhost + 'userRole/save' + suffix,
        		modify: 		localhost + 'userRole/edit' + suffix, 
        		remove: 		localhost + 'userRole/deleteUserRoleByUserCodeAndRoleCode' + suffix,
        		find : 			localhost + 'userRole/data' + suffix,
        		get :  			localhost + 'userRole/find' + suffix,
        		selectUserByRoleCode : localhost + 'userRole/selectUserByRoleCode' + suffix,
        		selectUserNotHavaRoleByRoleCode :	localhost + 'userRole/selectUserNotHavaRoleByRoleCode' + suffix
        	},
        	user:{
        		save: 			localhost + 'user/save' + suffix,
        		modify: 		localhost + 'user/edit' + suffix,
        		remove: 		localhost + 'user/delete' + suffix,
        		find :  		localhost + 'user/data' + suffix,
        		get :  			localhost + 'user/find' + suffix
        	}
        },
        bizURL : {
    		dtxx:{
    			save: 			localhost + 'dtxx/save' + suffix,
        		modify: 		localhost + 'dtxx/edit' + suffix,
        		remove: 		localhost + 'dtxx/delete' + suffix,
        		find :  		localhost + 'dtxx/data' + suffix,
        		get :  			localhost + 'dtxx/find' + suffix
    		},
    		dtwb:{//电梯维保
    			save: 			localhost + 'dtwb/save' + suffix,
        		modify: 		localhost + 'dtwb/edit' + suffix,
        		remove: 		localhost + 'dtwb/delete' + suffix,
        		find :  		localhost + 'dtwb/data' + suffix,
        		get :  			localhost + 'dtwb/find' + suffix
    		},
    		dtts:{
    			save: 			localhost + 'dtts/save' + suffix,
        		modify: 		localhost + 'dtts/edit' + suffix,
        		remove: 		localhost + 'dtts/delete' + suffix,
        		find :  		localhost + 'dtts/data' + suffix,
        		get :  			localhost + 'dtts/find' + suffix
    		},
    		Wbdwxj:{
    			save: 			localhost + 'wbdwxj/save' + suffix,
        		modify: 		localhost + 'wbdwxj/edit' + suffix,
        		remove: 		localhost + 'wbdwxj/delete' + suffix,
        		find :  		localhost + 'wbdwxj/data' + suffix,
        		get :  			localhost + 'wbdwxj/find' + suffix
    		},
    		dwxx:{
    			save: 			localhost + 'dwxx/save' + suffix,
        		modify: 		localhost + 'dwxx/edit' + suffix,
        		remove: 		localhost + 'dwxx/delete' + suffix,
        		find :  		localhost + 'dwxx/data' + suffix,
        		get :  			localhost + 'dwxx/find' + suffix
    		},
    		jyxx:{
    			save: 			localhost + 'ejjyjg/save' + suffix,
        		modify: 		localhost + 'ejjyjg/edit' + suffix,
        		remove: 		localhost + 'ejjyjg/delete' + suffix,
        		find :  		localhost + 'ejjyjg/data' + suffix,
        		get :  			localhost + 'ejjyjg/find' + suffix
    		},
    		ryxx:{
    			save: 			localhost + 'ryxx/save' + suffix,
        		modify: 		localhost + 'ryxx/edit' + suffix,
        		remove: 		localhost + 'ryxx/delete' + suffix,
        		find :  		localhost + 'ryxx/data' + suffix,
        		get :  			localhost + 'ryxx/find' + suffix
    		},
    		wbxx:{
    			save: 			localhost + 'wbxx/save' + suffix,
        		modify: 		localhost + 'wbxx/edit' + suffix,
        		remove: 		localhost + 'wbxx/delete' + suffix,
        		find :  		localhost + 'wbxx/data' + suffix,
        		get :  			localhost + 'wbxx/find' + suffix
    		},
    		yjcz:{
    			save: 			localhost + 'yjcz/save' + suffix,
        		modify: 		localhost + 'yjcz/edit' + suffix,
        		remove: 		localhost + 'yjcz/delete' + suffix,
        		find :  		localhost + 'yjcz/data' + suffix,
        		get :  			localhost + 'yjcz/find' + suffix
    		}
        },
        dynamicWs:{
            wsManager:{
                list: 			localhost + 'configinfo/data'+suffix,
                save: 			localhost + 'configinfo/save' + suffix,
        		modify: 		localhost + 'configinfo/edit' + suffix,
        		remove: 		localhost + 'configinfo/delete' + suffix,
        		find :  		localhost + 'configinfo/data' + suffix,
        		get :  			localhost + 'configinfo/find' + suffix,
        		release :		localhost + 'configinfo/release' + suffix
            },
            wsManagerDetails : {
            	list: 			localhost + 'configinfos/data'+suffix,
                save: 			localhost + 'configinfos/save' + suffix,
        		modify: 		localhost + 'configinfos/edit' + suffix,
        		remove: 		localhost + 'configinfos/delete' + suffix,
        		find :  		localhost + 'configinfos/data' + suffix,
        		get :  			localhost + 'configinfos/find' + suffix
            },
            wsInvoker:{
            	list: localhost + 'invokerlog/data'+suffix
            }
        }
    };
    win.URL = URL;
    win.dev = 1;	//是否开发环境，主要作用是页面按钮点击提示功能暂不开放
})(window);