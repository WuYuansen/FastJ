/**
 * 
 * <p> Title:Bmxx EXTJS FORM</p>
 * <p> Description:  部门信息</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.view.sys.DeptForm',{
	extend : 'wys.basic.BaseForm',
	alias: 'widget.deptform',
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
        labelWidth: 100,
        labelSeparator: '：'
    },
	items : [
		{fieldLabel:'id',name:'id',xtype:'textfield',value:'',hidden:true},
		{fieldLabel:'组织机构名称',name:'deptname',xtype:'textfield',allowBlank : false,afterLabelTextTpl: required},
		{
			xtype:'RemoteCombobox',
        	name : 'depttype',
        	emptyText : '请选择组织机构类型...',
        	model : Ext.create('Ext.data.Model',{
        		fields : ['key','value']
        	}),
        	valueField : 'value',
        	displayField : 'key',
        	proxy_url : constants.url.combo.dict+"DEPTTYPE",
        	allowBlank : true,
        	afterLabelTextTpl: required,
        	fieldLabel : '组织机构类型',
        	listeners : {
        		expand : function(ths){
        			this.getStore().reload();
        		}
        	}
		},
		{
			xtype : 'comboTree',
			valueField: 'id',   
          	displayField: 'deptname',
          	autoScroll : true,
          	store : Ext.create('Ext.data.TreeStore',{
          		fields : [
  		          {name:'id',mapping:'id'},
  		          {name:'text',mapping:'deptname'},
  		          'children',
  		          'leaf'
		       ],
		       autoLoad : true,
		       rootVisible : true,
		       proxy: {
          	      type: 'ajax',
          	      url: window.constants.url.sys.dept.deptTree,
          	      rootProperty : function(data){
          	    	  return data;
          	      }
          	  	}
          	}),
          	listeners : {
        		expand : function(ths){
        			this.getStore().reload();
        		}
        	},
          	allowBlank : false,
          	afterLabelTextTpl: required,
  	  		name : 'deptsuper',
      	  	emptyText : '请选择...',
          	fieldLabel : '上级组织机构'
		},
		{fieldLabel:'组织机构负责人',name:'deptmanagerid',xtype:'RemoteCombobox',allowBlank : false,afterLabelTextTpl: required,
			emptyText : '请选择组织机构负责人...',
        	model : Ext.create('Ext.data.Model',{
        		fields : ['loginname','id']
        	}),
        	valueField : 'id',
        	displayField : 'loginname',
        	proxy_url : app.base + 'services/user/dataAll.json',
        	proxy_reader_root : 'extResultUtil.list',
        	allowBlank : false,
        	afterLabelTextTpl: required,	
        	listeners : {
        		expand : function(ths){
        			ths.getStore().reload();
        		}
        	}
		},
		{fieldLabel : '组织机构介绍',name:'deptremarks',flex:1,xtype:'textareafield',grow:true}
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
        	record = Ext.ComponentQuery.query('deptView')[0].getView().selection,
        	store = Ext.ComponentQuery.query('deptView')[0].getStore(),
            values = form.getValues(),
            isEdit = !!record;
            if (form.isValid()) {
            	if (isEdit) {
                    record.set(values);
                }  else{
                    record = Ext.create('app.model.sys.Dept');
                    record.set(values);
                    record.setId('');
                    store.add(record);
                }
            }
            Ext.destroy(Ext.ComponentQuery.query('baseWin')[0]);
            Ext.destroy(this.up('form'));
            store.sync({callback:function(res){
    	    	if(!res.exception){
    	    		 var me = this,
    	        	 treePanel = Ext.ComponentQuery.query('deptTreeView')[0];
    	        	 store = treePanel.getStore();
    	        	 store.reload();
    	        	 store.reload();
    	    	}else{
    	    		window.util.err('操作异常，请稍后再试或联系管理员',"系统提示");
    	    	}
    	    }});
        }
    }]
});