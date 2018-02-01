Ext.define('app.view.sys.ModularForm',{
	extend : 'wys.basic.BaseForm',
	alias: 'widget.modularform',
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
                        {xtype : 'textfield',hidden : true,name:'id',value:""},
						{xtype: 'textfield',fieldLabel: '模块名称',name : 'name',allowBlank : false,afterLabelTextTpl: required},
						{
							xtype:'RemoteCombobox',
			            	name : 'extendclass',
			            	emptyText : '请选择菜单类型...',
			            	model : Ext.create('Ext.data.Model',{
			            		fields : ['key','value']
			            	}),
			            	valueField : 'value',
			            	displayField : 'key',
			            	proxy_url : constants.url.combo.dict+"menuType",
			            	allowBlank : false,
			            	afterLabelTextTpl: required,
			            	fieldLabel : '类型',
			            	listeners : {
			            		render : function(combo){
			            			var value = combo.getValue();
			            			if(value==='menu'){
			            				Ext.ComponentQuery.query('fieldset')[0].enable();
			            			}else{
			            				Ext.ComponentQuery.query('fieldset')[0].disable();
			            			}
			            			single :true;
			            		},
			            		change : function(combo){
			            			var value = combo.getValue();
			            			if(value==='menu'){
			            				Ext.ComponentQuery.query('fieldset')[0].enable();
			            			}else{
			            				Ext.ComponentQuery.query('fieldset')[0].disable();
			            			}
			            			single :true;
			            		},
			            		select : function(comboBox, record, index){
			            			var value = comboBox.getValue();
			            			if(value==='menu'){
			            				Ext.ComponentQuery.query('fieldset')[0].enable();
			            			}else{
			            				Ext.ComponentQuery.query('fieldset')[0].disable();
			            			}
			            			single :true;
			            		}
			            	}
						},
						{xtype : 'textfield',fieldLabel : '模块拼音',name:'modularen',allowBlank:false,afterLabelTextTpl: required},
						{xtype : 'textfield',fieldLabel : '图标',name:'icon',allowBlank:true}
                     ]
                 },{
                	 xtype : 'container',
                	 flex : 1,
                	 layout : 'anchor',
                	 defaults: {
                		 anchor : '100%'
                	 },
                	 items : [
                	    {xtype : 'textfield',fieldLabel : '显示名称',name : 'showname',allowBlank : false,afterLabelTextTpl: required},
                	    {xtype : 'textfield',fieldLabel : 'URL/VIEW',name : 'extendtype'},
						{xtype : 'numberfield',name:'order',fieldLabel : '排序',minValue:0,maxValue:99,value:0}
        	         ]
                 }
             ]
         },
         {
			xtype : 'comboTree',
			valueField: 'id',   
          	displayField: 'text',
          	autoScroll : true,
          	store : Ext.create('Ext.data.TreeStore',{
          		fields : [
  		          {name:'id',mapping:'modularcode'},
  		          {name:'text',mapping:'showname'},
  		          {name:'children'},
  		          {name:'leaf'}
		       ],
		       autoLoad : true,
		       proxy: {
          	      type: 'ajax',
          	      url: constants.url.sys.modular.modularTree,
          	      rootProperty : function(data){
          	    	  return data;
          	      }
          	  	}
          	}),
          	listeners : {
        		expand : function(ths){
        			ths.getStore().reload();
        		}
        	},
          	allowBlank : true,
  	  		name : 'parent_',
      	  	emptyText : '请选择...',
          	fieldLabel : '父级菜单'
		 },
         {fieldLabel : '备注',name:'remarks',flex:1,xtype:'textareafield',grow:true},
         {
             xtype:'fieldset',
             columnWidth: 0.5,
             title: '选择拥有的操作',
             disabled : true,
             defaultType: 'checkboxfield',
             listeners : {
            	 afterrender : function(this_, eOpts){
            		 var ajaxCfg = {
            				 url : constants.url.combo.dict+"ModularRight",
            				 ok : function(resp){
            					 var formRecord = this_.up('form').getRecord();
            					 var items_field = new Array();
            					 Ext.Array.each(resp, function (items) {
            						 var item = {};
            						 item.boxLabel=items.key;
            						 item.inputValue=items.keycode;
            						 item.name="modularright";
            						 item.margin='0 5 0 0';
            						 if(formRecord != undefined){
            							 formDateRight =  formRecord.data.modularright;
            							 item.checked=Ext.isEmpty(formDateRight)?false:formDateRight.indexOf(items.keycode)===0;
            						 }
            						 items_field.push(item);
            					 });
            					 this_.add(items_field);
            					 single : true;
            				 }
            		 };
            		 window.util.ajax(ajaxCfg);
            		 single:true;
            	 }
             },
             layout: {
            	 type : 'table',
            	 columns : 9
             },
             items :[]
         }
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
            var form = this.up('form').getForm(),
        	record = Ext.ComponentQuery.query('sys_modular_view')[0].getView().selection,
        	store = Ext.ComponentQuery.query('sys_modular_view')[0].getStore(),
            values = form.getValues(),
            isEdit = !!record;
            if (form.isValid()) {
            	if (isEdit) {
                    record.set(values);
                }  else{
                    record = Ext.create('app.model.sys.Modular');
                    record.set(values);
                    record.setId('');
                    store.add(record);
                }
            }
            Ext.destroy(Ext.ComponentQuery.query('baseWin')[0]);
            Ext.destroy(this.up('form'));
            store.sync({callback:function(res){
            	if(!res.exception){
            		store.reload();
            	}else{
            		window.util.err("添加数据失败，请稍后再试.","系统提示");
            	}
    	    }});
            store.reload();
        }
    }]
});