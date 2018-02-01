/**
 *
 * <p> Title:ContainerNews.js BY EXTJS V6.0 (src/main/newwebapp/classic/src/view/main/widgets)</p>
 * <p> Description:  自定义容器</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.view.main.widgets.ContainerNews',{
	extend: 'Ext.container.Container',
    xtype: 'widgetContainerNews',
    data: {
    	title: '标题',
    	iconsCls: 'fa fa-area-chart fa-lg',
    	height:'179px'
    },
    tpl:'<div class="panel panel-default">'+
	    '    <div class="panel-heading"><i class="{iconsCls}" style="padding-right: 5px;"></i>{title}</div>'+
	    '    <div class="panel-body" style="height:{height};" id="{id}">'+
//	    '		<ul>'+
//	    '    		<li><a href="javascript:void(0);" target="_blank">【通知】新版员工守则，即日执行</a><span class="time">2016-07-21</span></li>'+
//	    '    		<li><a href="javascript:void(0);" target="_blank">【公告】OA办公使用指南</a><span class="time">2016-07-21</span></li>'+
//	    '    		<li><a href="javascript:void(0);" target="_blank">【公告】劳动节集体出游指南</a><span class="time">2016-07-21</span></li>'+
//	    '    		<li><a href="javascript:void(0);" target="_blank">【通知】2016年G20财长和央行行</a><span class="time">2016-07-21</span></li>'+
//	    '    		<li><a href="javascript:void(0);" target="_blank">【通知】2016年G20财长和央行行</a><span class="time">2016-07-21</span></li>'+
//	    '    		<li><a href="javascript:void(0);" target="_blank">【通知】品牌价值的最佳选择</a><span class="time">2016-07-21</span></li>'+
//	    '    		<li><a href="javascript:void(0);" target="_blank">【公告】采购商城全新升级自营业正品</a><span class="time">2016-07-21</span></li>'+
//	    '		</ul>'+
	    '    </div>'+
	    '</div>',
    initComponent: function(){
        var me = this;
        me.callParent(arguments);
    }
});