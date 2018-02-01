Ext.define('app.view.main.Layout_welcome',{
	extend : 'Ext.container.Container',
	requires : [
        'wys.plugs.charts.HeightCharts',
        'wys.plugs.charts.HeightChartsHistogram',
        'wys.plugs.charts.HeightChartsPie',
        'app.util.Constants',
  		'app.util.commonUtil',
  		'Ext.toolbar.Toolbar',
  		'wys.form.HtmlEditor.Plugins',
  		'wys.ux.combobox.CombGrid',
  		'wys.form.field.date.DateTimePicker',
  		'wys.form.field.SpecialName'
    ],
	xtype : 'welcomePanel',
	iconCls : 'fa fa-home fa-fw',
	name : 'homePanel',
	title : '系统首页',
	autoScroll:true,
    border: 1,
    style : 'background: #ecf0f5;',
    layout : 'fit',//absolute
    defaults: {
    	border : true,
        split: false,
        collapsible: false
    },
	initComponent: function() {
		var init_self = this;
		/*Ext.apply(this,{items :[
            {xtype : 'container',
            	layout : 'hbox',
            	items : [{
            		xtype : 'container',flex:7,
            		layout: {
	       	             type: 'table',
	       	             columns: 4,
	       	             tableAttrs: {
	       	                 border: 0,
	       	                 cellpadding: 0,
	       	                 cellspacing: 0,
	       	                 width: '100%',
	       	                 align: 'center',
	       	                 style: "border:px solid gray;border-collapse:collapse;margin:0 auto;text-align:center;"
	       	             },
	       	             tdAttrs: {style: "padding:5px",valign: 'middle'}
	       	         },
            		items:[
            			{xtype : 'widgetTip'},
            			{xtype : 'widgetTip',
            				data: {
            			    	backgroundColor: '#e35b5a',
            			    	iconsCls: 'fa fa-bell',
            			    	num: 0,
            			    	translate : '条',
            			    	msg : '预警消息'
            			    }
            			},
            			{xtype : 'widgetTip',data:{
            				backgroundColor: '#44b6ae',
        			    	iconsCls: 'fa fa-envelope-o',
        			    	num: 0,
        			    	translate : '封',
        			    	msg : '未读邮件'
            			}},
            			{xtype : 'widgetTip',data:{
            				backgroundColor: '#8775a7',
        			    	iconsCls: 'fa fa-gavel',
        			    	num: 0,
        			    	translate : '封',
        			    	msg : '未读邮件'
            			}},
            			{xtype : 'widgetTip',data:{
            				backgroundColor: '#4f5c65',
        			    	iconsCls: 'fa fa-envelope-o',
        			    	num: 0,
        			    	translate : '封',
        			    	msg : '未读邮件'
            			}},
            			{xtype : 'widgetTip',data:{
            				backgroundColor: '#14aae4',
        			    	iconsCls: 'fa fa-envelope-o',
        			    	num: 0,
        			    	translate : '封',
        			    	msg : '未读邮件'
            			}},
            			{xtype : 'widgetTip',data:{
            				backgroundColor: '#949FB1',
        			    	iconsCls: 'fa fa-envelope-o',
        			    	num: 0,
        			    	translate : '封',
        			    	msg : '未读邮件'
            			}},
            			{xtype : 'widgetTip',data:{
            				backgroundColor: '#f29503',
        			    	iconsCls: 'fa fa-envelope-o',
        			    	num: 0,
        			    	translate : '封',
        			    	msg : '未读邮件'
            			}},
            		]
            	},{xtype : 'container',flex:3,items:[{xtype : 'widgetContainer'}]}]
            },{
            	xtype : 'container',
            	layout : 'hbox',
            	items : [
    	         {xtype : 'widgetContainer',flex:7},
    	         {xtype : 'widgetContainer',flex:3},
            	]
            },{
            	xtype : 'container',
            	layout : 'hbox',
            	items : [
    	         {xtype : 'widgetContainerNews',flex:3.5,data: {
    	         	title: '企业信息',
    	        	iconsCls: 'fa fa-send fa-lg',
    	        	num: 3
    	         }},
    	         {xtype : 'widgetContainerNews',flex:3.5,data: {
    	         	title: '通知公告',
    	        	iconsCls: 'fa fa-rss fa-lg',
    	        	num: 3
    	         }},
    	         {xtype : 'widgetContainerNews',flex:3,data: {
    	         	title: '最新动态',
    	        	iconsCls: 'fa fa-thumbs-o-up fa-lg',
    	        	num: 3
    	         }}
            	]
            }
        ]});*/
		this.callParent(arguments);
	}
});