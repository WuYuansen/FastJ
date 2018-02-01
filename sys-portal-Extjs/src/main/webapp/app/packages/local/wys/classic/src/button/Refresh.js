/**
 * 重写Button使其可以复用，去除编写重复代码
 * @author wys
 */
Ext.define('wys.button.Refresh',{
    extend : 'Ext.button.Button',
    xtype:'refreshBtn',
	ui : 'button-refreshbtn-toolbar',
    iconCls : 'fa fa-refresh fa-lg',
    text:'重新加载',
    tooltip : '<span style="font-size:12px">点击进行刷新操作</span>'
});