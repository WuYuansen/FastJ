Ext.define('app.view.sys.UserViewPort',{
	extend: 'Ext.panel.Panel',
	xtype : 'userViewPort',
	requires : ['app.view.sys.User','app.view.sys.DeptTree'],
	title : '用户管理',
	border : false,
	layout : 'border',
	items : [
	         {
			region : 'west',
			width : 200,
			margin : '2 0 0 3',
			split : true,
			xtype : 'deptTreeView'
		}, {
			region : 'center',
			border : false,
			xtype : 'panel',
			name : 'userView',
			layout : 'fit',
			items : {
				xtype : 'sys_user_view'
			}
		}
	]
});