Ext.define('app.view.sys.DeptViewPort',{
	extend: 'Ext.panel.Panel',
	xtype : 'deptViewPort',
	requires : ['app.view.sys.Dept','app.view.sys.DeptTree'],
	title : '部门管理',
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
			name : 'deptView',
			layout : 'fit',
			items : {
				xtype : 'deptView'
			}
		}
	]
});