/**
 *
 * <p> Title:ProtalInfoForm.js BY EXTJS V6.0 (src/main/newwebapp/classic/src/view/main/dashboard)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.view.main.dashboard.ProtalInfoForm',{
	extend : 'wys.basic.BaseForm',
	xtype : 'protalInfoForm',
	requires : [
        'Ext.button.Button',
        'app.view.main.dashboard.ProtalMianViewCtrl',
        'Ext.form.field.TextArea',
        'Ext.form.field.Text'
    ],
    layout: {
        type:'vbox',
        align:'stretch'
    },
    controller:'protalMianViewCtrl',
    bodyPadding: 10,
    scrollable: true,
    defaultType: 'textfield',
    defaults: {
        anchor:'100%',
        labelWidth: 100,
        labelSeparator: '：'
    },
    items : [{
    	width:'100%',
        xtype : 'container',
        layout: {
            type: 'table',
            columns: 3,
            tableAttrs: {
                border: 0,
                cellpadding: 0,
                cellspacing: 0,
                width: '100%',
                align: 'center',
                style: "border:px solid gray;border-collapse:collapse;margin:0 auto;text-align:center;"
            },
            tdAttrs: {style: "padding:5px",valign: 'middle'}
        },
        defaults:{width:'100%',labelWidth: 85,labelSeparator: ':'},
        defaultType : 'textfield',
        items : [{
        	fieldLabel:'标题',allowBlank:false,afterLabelTextTpl:required,name:'title'
        },{
        	fieldLabel:'英文标题',allowBlank:false,afterLabelTextTpl:required,name:'titleEn'
        },/*{
        	fieldLabel:'维文标题',allowBlank:false,afterLabelTextTpl:required
        },*/{
            xtype: 'radiogroup',
            fieldLabel: '状态',
            columns: 2,
            vertical: true,
            items: [
                { boxLabel: '启用', name: 'state', inputValue: '0'},
                { boxLabel: '禁用', name: 'state', inputValue: '1', checked: true}
            ]
        }/*,{
            xtype: 'radiogroup',
            fieldLabel: '公共',
            columns: 2,
            vertical: true,
            items: [
                { boxLabel: '公共', name: 'state', inputValue: '0'},
                { boxLabel: '私有', name: 'state', inputValue: '1', checked: true}
            ]
        },{
        	fieldLabel : '图标',
        	xtype : 'combo'
        }*/]
    },{xtype : 'hiddenfield',name:'deptsValue'},{
    	fieldLabel : '适用机构',xtype : 'textareafield',grow:true,emptyText:'(选填)，点击输入框选择部门',
    	name : 'depts',
    	listeners : {focus : 'onFocusTextarea'},editable:false
    },{
    	fieldLabel : '适用人员',xtype : 'textareafield',grow:true,emptyText:'(选填)，点击输入框选择岗位',
    	name : 'users',
    	listeners : {focus : 'onFocusTextarea'},editable:false
    },{xtype : 'hiddenfield',name:'usersValue'},{
    	fieldLabel : '备注',xtype : 'textareafield',grow:true,emptyText:'(选填)',name:'remarks'
    }],
    buttons: [{
        text: '取消',
		ui : 'button-commonToolbarBtn-toolbar',
        iconCls:'fa fa-sign-out fa-fw',
        handler:  function(bt){
            this.up('form').getForm().reset();
            util.clearSelection(Ext.ComponentQuery.query('baseView[name=protal]')[0].getView());
            this.up('form').up('baseWin').close();
        }
    }, {
        text: '保存',
        iconCls:'fa fa-save fa-fw',
        formBind: true,
        disabled: true,
        handler: function() {
            var form = this.up('form').getForm();
            var tempwin = this.up('baseWin');
            var record = form.getRecord(),
	            me = this,
	            record = Ext.ComponentQuery.query('baseView[name=protal]')[0].getView().selection,
	            store = Ext.ComponentQuery.query('baseView[name=protal]')[0].getStore(),
	            values = form.getValues(),
	            isEdit = !!record;
	        if (form.isValid()) {
	            if (isEdit) {
	                record.set(values);
	            }  else{
	                record = Ext.create('app.model.main.protal.ProtalModel');
	                record.set(values);
	                record.setId('');
	                store.add(record);
	            }
	        }
	        this.up('form').up('baseWin').close();
	        store.sync({callback:function(res){
	            if(!res.exception){
	                store.reload();
	            }else{
	                window.util.err(WY.local.lang.common.optionError);
	            }
	        }});
        }
    }]
});