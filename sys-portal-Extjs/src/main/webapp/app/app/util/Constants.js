/**
 * @功能：系统常用变量定义
 * @作者:wys
 */
 Ext.define('app.util.Constants',{
 	singleton : true
 },function(){
	var suffix  = '.json';
	var dataAnalysis_url_title = "services/common/search/buildGridPanelTitle.json?searchName=";
	var dataAnalysis_url_data = "services/common/search/buildGridPanelData.json?searchName=";
 	var me = this;
 	Ext.apply(me,{
 		systemName : app.systemName,
 		url : {
 			login : app.base +'services/login'+suffix,
 			initMenu : app.base +'services/init'+suffix,
 			logout : app.base +'services/logout'+suffix,
 			changePwd : app.base +'services/modifyPwd'+suffix, 
 			combo : {
 				dict : app.base + 'services/dict/combobox'+suffix + "?type=",//查询字典下拉框数据
 				dict2 : app.base + 'services/dict/combobox'+suffix
 			},
 			sys : {
 				dict : {
 					findByPaging  : app.base + 'services/dict/data'+suffix,
 					findAll	: app.base + 'services/dict/dataAll'+suffix,
 					deleteById : app.base + 'services/dict/delete'+suffix,
 					get	 : app.base + 'services/dict/data'+suffix,
 					update : app.base + 'services/dict/edit'+suffix,
 					save : app.base + 'services/dict/save'+suffix,
 					searchRight : app.base + 'services/dict/selectAllByZydm'+suffix
 				},
 				right : {
 					findByPaging  : app.base + 'services/right/data'+suffix,
 					findAll	: app.base + 'services/right/dataAll'+suffix,
 					deleteById : app.base + 'services/right/delete'+suffix,
 					get	 : app.base + 'services/right/data'+suffix,
 					update : app.base + 'services/right/edit'+suffix,
 					save : app.base + 'services/right/save'+suffix,
 					rightTree : app.base + 'services/right/rightTree'+suffix
 				},
 				role : {
 					findByPaging  : app.base + 'services/role/data'+suffix,
 					findAll	: app.base + 'services/role/dataAll'+suffix,
 					deleteById : app.base + 'services/role/delete'+suffix,
 					get	 : app.base + 'services/role/data'+suffix,
 					update : app.base + 'services/role/edit'+suffix,
 					save : app.base + 'services/role/save'+suffix
 				},
 				roleRight : {
 					findByPaging  : app.base + 'services/roleRight/data'+suffix,
 					findAll	: app.base + 'services/roleRight/dataAll'+suffix,
 					deleteById : app.base + 'services/roleRight/delete'+suffix,
 					get	 : app.base + 'services/roleRight/data'+suffix,
 					update : app.base + 'services/roleRight/edit'+suffix,
 					save : app.base + 'services/roleRight/save'+suffix
 				},
 				userRole : {
 					findByPaging  : app.base + 'services/userRole/data'+suffix,
 					findAll	: app.base + 'services/userRole/dataAll'+suffix,
 					deleteById : app.base + 'services/userRole/delete'+suffix,
 					get	 : app.base + 'services/userRole/data'+suffix,
 					update : app.base + 'services/userRole/edit'+suffix,
 					save : app.base + 'services/userRole/save'+suffix,
 					saveUserRole :app.base + 'services/userRole/userRoleInsert'+suffix
 				},
 				modular : {
 					findByPaging  : app.base + 'services/modular/data'+suffix,
 					findAll	: app.base + 'services/modular/dataAll'+suffix,
 					deleteById : app.base + 'services/modular/delete'+suffix,
 					modularTree : app.base + 'services/modular/modularTree'+suffix,
 					get	 : app.base + 'services/modular/data'+suffix,
 					update : app.base + 'services/modular/edit'+suffix,
 					save : app.base + 'services/modular/save'+suffix
 				},
 				dept : {/* 部门管理 */
 					findByPaging  : app.base + 'services/dept/data'+suffix,
 					findAll	: app.base + 'services/dept/data'+suffix,
 					deptTree : app.base + 'services/dept/deptTree'+suffix,
 					deleteById : app.base + 'services/dept/delete'+suffix,
 					get	 : app.base + 'services/dept/data'+suffix,
 					update : app.base + 'services/dept/edit'+suffix,
 					save : app.base + 'services/dept/save'+suffix
 				},
 		        user :{
 		        	findByPaging  : app.base + 'services/user/data'+suffix,
 		        	findAll	: app.base + 'services/user/data'+suffix,
 					deleteById : app.base + 'services/user/delete'+suffix,
 					get	 : app.base + 'services/user/data'+suffix,
 					update : app.base + 'services/user/edit'+suffix,
 					save : app.base + 'services/user/save'+suffix,
 					userTree : app.base + 'services/dept/deptTree'+suffix
 		        },
 				logs:{
 					findByPaging  : app.base + 'services/logs/data'+suffix,
 		        	findAll	: app.base + 'services/logs/data'+suffix
 				}
 			}
 		}
 	});
 	window.constants = me;
 });