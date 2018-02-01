/**
 * 
 * <p> Title:Zd EXTJS FORM</p>
 * <p> Description:  字典表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.view.sys.DictForm',{
	extend : 'wys.basic.BaseForm',
	alias: 'widget.dictform',
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
        labelWidth: 60,
        labelSeparator: '：'
    },
	items : [
		{fieldLabel:'id',name:'id',xtype:'textfield',flex:1,anchor : '100%',hidden : true,value:''},
		{
			xtype: 'container',
            anchor: '100%',
            layout: 'hbox',
            items:[{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                defaults : {
    			    anchor:'100%'        
                },
                items: [
					{fieldLabel:'字典类型名',name:'typename',xtype:'textfield',flex:1,anchor : '100%',allowBlank : false,afterLabelTextTpl: required},
					{fieldLabel:'字典键名',name:'key',xtype:'textfield',flex:1,anchor : '100%',allowBlank : false,afterLabelTextTpl: required},
					{fieldLabel:'字典键英文名',name:'type',xtype:'textfield',flex:1,anchor : '100%',allowBlank : false,afterLabelTextTpl: required}
                ]
            },{
	            	xtype: 'container',
	                flex: 1,
	                layout: 'anchor',
	                defaults : {
	    			    anchor:'100%'        
	                },
	                items: [
						{fieldLabel:'字典类型英文名',name:'keycode',xtype:'textfield',flex:1,anchor : '100%',allowBlank : false,afterLabelTextTpl: required},
						{fieldLabel:'字典键值',name:'value',xtype:'textfield',flex:1,anchor : '100%',allowBlank : false,afterLabelTextTpl: required},
						{fieldLabel:'排序',name:'order',xtype:'numberfield',flex:1,anchor : '100%',allowBlank : false,afterLabelTextTpl: required}
                    ]
            }
		]},
		{fieldLabel : '备注',name:'remarks',flex:1,xtype:'textareafield',grow:true,anchor:'100%'}
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
        	record = Ext.ComponentQuery.query('sys_dict_view')[0].getView().selection,
        	store = Ext.ComponentQuery.query('sys_dict_view')[0].getStore(),
            values = form.getValues(),
            isEdit = !!record;
            if (form.isValid()) {
            	if (isEdit) {
                    record.set(values);
                }  else{
                    record = Ext.create('app.model.sys.Dict');
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