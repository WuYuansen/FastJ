/**
 * 
 * <p> Title:Js EXTJS FORM</p>
 * <p> Description:  角色表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.view.sys.RoleForm',{
	extend : 'wys.basic.BaseForm',
	alias: 'widget.roleform',
	requires : [
	    'Ext.button.Button',
	    'Ext.form.field.Text'
    ],
    layout: {
        type:'vbox',
        align:'stretch'
    },
    bodyPadding: 10,
    scrollable: true,
    defaultType: 'textfield',
    defaults: {
        labelWidth: 80,
        labelSeparator: '：'
    },
	items : [
		{fieldLabel:'id',name:'id',xtype:'textfield',flex:1,hidden:true,allowBlank : true},
		{fieldLabel:'角色名称',name:'rolename',xtype:'textfield',allowBlank : false,afterLabelTextTpl: required},
		{fieldLabel:'修改人员',name:'modifyuser',xtype:'textfield',flex:1,hidden:true,allowBlank : true},
		{fieldLabel:'修改日期',name:'modifydate',xtype:'textfield',flex:1,hidden:true,allowBlank : true},
		{fieldLabel : '备注',name:'remarks',xtype:'textareafield',allowBlank : true}
		
		
	],

	
	buttons: [{
        text: '取消',iconCls:'fa fa-sign-out fa-fw',
        handler:  function(bt){
        	this.up('form').getForm().reset();
        	Ext.destroy(this.up('form'));
        	Ext.destroy(Ext.ComponentQuery.query('baseWin')[0]);
        }
    }, {
        text: '提交',iconCls:'fa fa-save fa-fw',
        formBind: true,
        disabled: true,
        handler: function() {
            var form = this.up('form').getForm();
            var record = form.getRecord(),
        	me = this,
        	record = Ext.ComponentQuery.query('sys_role_view')[0].getView().selection,
        	store = Ext.ComponentQuery.query('sys_role_view')[0].getStore(),
            values = form.getValues(),
            isEdit = !!record;
            if (form.isValid()) {
            	if (isEdit) {
                    record.set(values);
                }  else{
                    record = Ext.create('app.model.sys.Role');
                    record.set(values);
                    record.setId('');
                    store.add(record);
                }
            }
            Ext.destroy(Ext.ComponentQuery.query('baseWin')[0]);
            Ext.destroy(this.up('form'));
            store.sync({callback:function(){
    	    	store.reload();
    	    }});
            store.reload();
        }
    }]
});