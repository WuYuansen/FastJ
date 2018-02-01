/**
 * 重写Button使其可以复用，去除编写重复代码
 * @author wys
 */
Ext.define('wys.button.Save',{
    extend : 'Ext.button.Button',
    xtype:'saveBtn',
	ui : 'button-savebtn-toolbar',
    iconCls : 'fa fa-plus-circle fa-lg',
    text:'新增',
    tooltip : '<span style="font-size:12px">点击进行新增操作</span>'
});