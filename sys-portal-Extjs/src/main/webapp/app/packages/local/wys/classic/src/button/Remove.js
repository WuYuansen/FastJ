/**
 * 重写Button使其可以复用，去除编写重复代码
 * @author wys
 */
Ext.define('wys.button.Remove',{
    extend : 'Ext.button.Button',
    xtype:'removeBtn',
    ui:'button-removebtn-toolbar',
    iconCls : 'fa fa-trash-o fa-lg',
    text:'删除',
    tooltip : '<span style="font-size:12px">点击进行删除操作</span>'
});