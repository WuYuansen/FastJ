/**
 * pc端表单超级类
 */
Ext.define('wys.basic.BaseForm',{
	extend: 'Ext.form.Panel',
	xtype : 'baseForm',
	requires:[
		'Ext.form.Panel'
	],
	fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 100
    }
});