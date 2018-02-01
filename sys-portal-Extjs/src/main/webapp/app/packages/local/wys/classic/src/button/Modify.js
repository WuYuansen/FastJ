/**
 * 重写Button使其可以复用，去除编写重复代码
 * @author wys
 */
Ext.define('wys.button.Modify',{
    extend : 'Ext.button.Button',
    xtype:'modifyBtn',
	ui : 'button-editcontent-toolbar',
    iconCls : 'fa fa-edit fa-lg',
    text:'修改',
    tooltip : '<span style="font-size:12px">点击进行修改操作</span>'
});