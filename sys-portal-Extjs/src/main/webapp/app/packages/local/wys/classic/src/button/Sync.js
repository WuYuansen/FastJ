/**
 * 重写Button使其可以复用，去除编写重复代码
 * @author wys
 */
Ext.define('wys.button.Sync',{
    extend : 'Ext.button.Button',
    xtype:'syncBtn',
	ui : 'button-syncbtn-toolbar',
    iconCls : 'fa fa-recycle fa-lw',
    text:'同步',
    tooltip : '<span style="font-size:12px">点击进行数据同步</span>'
});