var timeFormat = 'Y年m月d日 G:i:s A D';
var ExtClock = Ext.create('Ext.toolbar.TextItem', {
	text : Ext.Date.format(new Date(), timeFormat),
	listeners : {
		render : function(this_ , eOpts){
			Ext.TaskManager.start({
				run : function() {
					Ext.fly(this_.getEl()).update(Ext.Date.format(new Date(),timeFormat));
				},
				interval : 1000
			});
		},delay : 100,
		single:true
	}
	});
Ext.define('app.view.main.Layout_footer', {
	extend : 'Ext.toolbar.Toolbar',
	xtype : 'footerBar',
	itemId : 'footerBar',
	requires:[
	  		'app.util.Constants',
	  		'app.util.commonUtil',
	  		'Ext.toolbar.Toolbar'
	      ],
	height : 40,
	items : [ // 存放按钮组
	{
		text : Ext.String.format('欢迎使用:{0} V 1.0',WY.local.lang.core.app.sysName),
		xtype : 'tbtext'
	},'-',{
		text : '系统当前在线人数：'+app.activeCount + '人',
		xtype : 'tbtext'
	}, {
		xtype : 'tbfill'
	},{
		xtype : 'tbtext',
		text : Ext.String.format(WY.local.lang.core.app.company)
	},'-',ExtClock,'-']
});