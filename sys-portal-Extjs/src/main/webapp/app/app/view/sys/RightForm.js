/**
 * 
 * <p> Title:Qx EXTJS FORM</p>
 * <p> Description:  系统权限表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.view.sys.RightForm',{
	extend : 'wys.basic.BaseForm',
	alias: 'widget.rightform',
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
    items:[{xtype: 'container',
        flex: 1,
        layout: 'anchor',
        labelAlign : 'left',
        defaults : {
		    anchor:'100%'        
        },
	items : [
	    {fieldLabel:'id',name:'id',xtype:'textfield',flex:1,anchor : '100%',hidden:true,value:''},
		{fieldLabel:'权限名称',name:'rightname',xtype:'textfield',allowBlank : false,afterLabelTextTpl: required,width:400},
		 {
				xtype : 'comboTree',
				valueField: 'modularcode',   
	           	displayField: 'showname',  
	           	rootVisible : false,
	           	store : Ext.create('Ext.data.TreeStore',{
	           		fields : [
           		          {name:'id',mapping:'modularcode'},
           		          {name:'text',mapping:'showname'}
       			       ],
	               	autoLoad : true,
	               	proxy: {
	               	      type: 'ajax',
	               	      url: app.base + 'services/modular/modularTree.json',
	               	      rootProperty : function(data){
	               	    	  return data;
	               	      }
	               	  }
	           	}),
	           	listeners : {
	           		expand : function(this_,a){
	           			this_.getStore().load();
	           		},
	           		select : function(picker, record, eOpts){
	           			single : true;
	           			component = Ext.ComponentQuery.query('fieldset')[0];
	           			if(record.data.leaf){
	           				cfg = {
           						url : constants.url.sys.dict.searchRight+"?type=ModularRight&keycodes="+record.data.modularright,
           						ok : function(resp){
           							var rightObj = resp.extResultUtil.list,
           								items_field = new Array();
           							Ext.Array.each(rightObj, function (items) {
	               						 var item = {};
	               						 item.boxLabel=items.key;
	               						 item.inputValue=items.keycode;
	               						 item.name="rightcodes";
	               						 item.margin='0 5 0 0';
	               						 items_field.push(item);
	               					 });
           							component.add(items_field);
           							component.show();
           						}
	           				};
	           				window.util.ajax(cfg);
	           			}else{
	           				component.hide();
	           				window.util.err('请选择叶子节点进行授权','系统提示');
	           			}
	           		}
	           	},
	           	fieldLabel:'资源',
	           	name:'sourcescode',
	           	allowBlank : false,
	           	afterLabelTextTpl: required
		},
		{
			xtype:'fieldset',
            columnWidth: 0.5,
            title: '选择拥有的操作',
            defaultType: 'checkboxfield',
            hidden :true,
            layout: {
           	 type : 'table',
           	 columns : 9
            }
		},
		
		{fieldLabel : '备注',name:'remarks',flex:1,xtype:'textareafield',grow:true,anchor:'100%'}
	]
    }],
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
        	record = Ext.ComponentQuery.query('right')[0].getView().selection,
        	store = Ext.ComponentQuery.query('right')[0].getStore(),
            values = form.getValues(),
            isEdit = !!record;
            if (form.isValid()) {
            	if (isEdit) {
                    record.set(values);
                }  else{
                    record = Ext.create('app.model.sys.Right');
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