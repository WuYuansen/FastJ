Ext.define('app.view.sys.RightViewPort',{
	extend: 'Ext.panel.Panel',
	xtype : 'rightViewPort',
	requires : ['app.view.sys.Right','app.view.sys.ModularTree'],
	title : '权限管理与资源授权',
	border : false,
	layout : 'border',
	items : [
	         {
			region : 'west',
			width : 200,
			margin : '2 0 0 3',
			split : true,
			xtype : 'modularTree'
		}, {
			region : 'center',
			border : false,
			xtype : 'panel',
			name : 'rightView',
			layout : 'fit',
			items : {
				xtype : 'right'
			}
		}
	]
});