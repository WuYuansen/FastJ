/**
 *
 * <p> Title:Container.js BY EXTJS V6.0 (src/main/newwebapp/classic/src/view/main/widgets)</p>
 * <p> Description:  自定义容器</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.view.main.widgets.Container',{
	extend: 'Ext.container.Container',
    xtype: 'widgetContainer',
    data: {
    	title: '这里是表头',
    	iconsCls: 'fa fa-area-chart fa-lg',
    	num: 3
    },
    tpl:'<div class="panel panel-default">'+
	    '    <div class="panel-heading"><i class="{iconsCls}" style="padding-right: 5px;"></i>{title}</div>'+
	    '    <div class="panel-body">'+
	    '		<canvas id="Canvas2" style="height: 165px; width: 284px;" width="284" height="165"></canvas>'+
	    '    </div>'+
	    '</div>',
    initComponent: function(){
        var me = this;
        me.callParent(arguments);
    }
});