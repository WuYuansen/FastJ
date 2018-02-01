/**
 *
 * <p> Title:Tip.js BY EXTJS V6.0 (src/main/newwebapp/classic/src/view/main/widgets)</p>
 * <p> Description:  首页提示小部件</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.view.main.widgets.Tip',{
	extend: 'Ext.panel.Panel',
    xtype: 'widgetTip',
    data: {
    	backgroundColor: '#578ebe',
    	iconsCls: 'fa fa-clock-o',
    	num: 3,
    	translate : '件',
    	msg : '代办事项'
    },
    style : "border-radius: 6px;",
    tpl:'<div class="dashboard-stats">'+
    	 	'<div class="dashboard-stats-item" style="background-color: {backgroundColor};">'+
    			'<div class="stat-icon">'+
					'<i class="{iconsCls}"></i>'+
				'</div>'+
				'<h2 class="m-top-none">{num}<span>{translate}</span></h2>'+
				'<h5>{msg}</h5>'+
			'</div>'+
		'</div>',
    initComponent: function(){
        var me = this;
        me.callParent(arguments);
    }
});