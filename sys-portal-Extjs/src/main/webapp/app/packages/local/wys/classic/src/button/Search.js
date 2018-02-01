/**
 * 重写Button使其可以复用，去除编写重复代码
 * @author wys
 */
Ext.define('wys.button.Search',{
    extend : 'Ext.button.Button',
    xtype:'searchBtn',
	ui : 'button-searchbtn-toolbar',
    iconCls : 'fa fa-search fa-lw',
    text:'查询',
    tooltip : '<span style="font-size:12px">点击进行数据检索</span>'
});