Ext.define('app.view.main.Layout_menu',{
	extend : 'Ext.toolbar.Toolbar',
	xtype : 'menuBar',
	itemId: 'menuBar',
	requires:[
	  		'app.util.Constants',
	  		'app.util.commonUtil',
	  		'Ext.toolbar.Toolbar'
	  	  ],
	height : 40,
	overflowHandler:'scroller',
	items : [ //存放按钮组
      {
    	  text : '我的工作台',
    	  border : 0,
    	  iconCls : 'fa fa-home fa-fw',
    	  name : 'main.Layout_welcome',
    	  listeners : {
    		  click : 'onSelectionChange'
    	  }
      }/*,'-',{
    	  text:'Login',
    	  border :0,
    	  iconCls : 'fa fa-warning fa-fw',
    	  name:'anthentication.Login',
    	  listeners : {
    		  click : 'onSelectionChange'
    	  }
      },
       {
    	  text : '系统日志',
    	  border : 0,
    	  iconCls : 'fa fa-home fa-fw',
    	  name : 'sys.Logs',  //提交地址
    	  listeners : {
    		  click : 'onSelectionChange'
    	  }
      }*/,'-'
//      {
//          text:'系统管理',
//          border : 0,
//          iconCls: 'fa fa-cogs fa-fw',  // <-- icon
//          menu: Ext.create('Ext.menu.Menu', {
//              id: 'mainMenu',
//              items : [
//                   {text: '菜单资源管理',iconCls:'fa fa-cogs fa-fw',name:'sys.Modular',listeners : {click:'onSelectionChange'}},
//                   {text: '权限管理',iconCls:'fa fa-lock fa-fw',name:'sys.RightViewPort',listeners : {click:'onSelectionChange'}},
//                   {text: '角色管理',iconCls:'fa fa-retweet fa-fw',name:'sys.Role',listeners : {click:'onSelectionChange'}},
//                   {text: '字典管理',iconCls:'fa fa-book fa-fw',name:'sys.Dict',listeners : {click:'onSelectionChange'}},
//                   {text: '部门管理',iconCls:'fa fa-sitemap fa-fw',name:'sys.DeptViewPort',listeners : {click:'onSelectionChange'}},
//                   {text: '人员管理',iconCls:'fa fa-users fa-fw',name:'sys.UserViewPort',listeners : {click:'onSelectionChange'}},
//                   {text: '系统监控',iconCls:'fa fa-comments fa-fw',menu :Ext.create('Ext.menu.Menu',{
//                	   items : [
//							{text:'SQL统计',iconCls : 'fa fa- fa-fw',name:'sys.log.SQL',listeners : {click:'onSelectionChange'}},
//							{text:'Request统计',iconCls : 'fa fa- fa-fw',name:'sys.log.Request',listeners : {click:'onSelectionChange'}},
//							{text:'Session统计',iconCls : 'fa fa- fa-fw',name:'sys.log.Session',listeners : {click:'onSelectionChange'}},
//							{text:'系统错误日志',iconCls : 'fa fa-warning-sign fa-fw',name:'sys.log.Error',listeners : {click:'onSelectionChange'}},
//							{text:'操作统计',iconCls : 'fa fa- fa-fw',name:'sys.Logs',listeners : {click:'onSelectionChange'}},
//							{text:'服务器信息',iconCls : 'fa fa- fa-fw',name:'sys.log.Server',listeners : {click:'onSelectionChange'}}
//        	            ]
//                   })}
//              ]
//          })
//      }
	]
});