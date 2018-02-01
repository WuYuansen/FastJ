Ext.define('app.view.sys.ModularCtrl',{
	extend : 'wys.basic.BaseCtrl',
    alias: 'controller.modular',
    init : function(view){
    	this.getView().getStore().reload();
    },
    onAddClick : function(){
    	var me = this,records = me.getRecordsSelected();
    	var winCfg = {
    			icon : records ? 'fa fa-pencil' : 'fa fa-plus',
    			title : '新增系统资源'
    	};
    	var cfg = Ext.apply({
            xtype: 'baseWin',
            items: [
                    {xtype : 'modularform'}
            ]
        },winCfg);
        Ext.create(cfg);
    },
    onDeleteClick : function(button, e, options){
    	var me = this;
	    var records = me.getRecordsSelected();
	    var store = me.getView().getStore();
	    if (records.length != 0){
	        Ext.Msg.show({
	    	    title:'确认?',
	    	    message: '您确定要删除所选内容?',
	    	    buttons: Ext.Msg.YESNO,
	    	    icon: Ext.Msg.QUESTION,
	    	    fn: function(btn) {
	    	        if (btn === 'yes') {
    	        		store.remove(records);
    	        		store.sync({callback:function(){
	        		    	store.reload();
	        		    }});
	    	        } 
	    	    }
	    	});
	    }
    },
    onUpdateClick : function(){
    	var me = this,
        records = me.getRecordsSelected();
	    if(records[0]){
	    	var winCfg = {
	    			icon : records ? 'fa fa-pencil' : 'fa fa-plus',
	    			title : '编辑系统资源【'+records[0].data.name+'】'
	    	};
	    	var cfg = Ext.apply({
	            xtype: 'baseWin',
	            items: [
	                    {xtype : 'modularform'}
	            ]
	        },winCfg);
	        Ext.create(cfg);
	        me.createDialog(records[0]);
	    }
    },
    onRefreshClick : function(){
    	var view = this.getView();
    	view.getStore().reload();
    },
    rowdblclick: function(view, td, cellIndex, record){//双击数据行
	    if(record){
	    	var winCfg = {
	    			icon : records ? 'fa fa-pencil' : 'fa fa-plus',
	    			title : '编辑系统资源【'+records[0].data.name+'】'
	    	};
	    	var cfg = Ext.apply({
	            xtype: 'baseWin',
	            items: [
	                    {xtype : 'modularform'}
	            ]
	        },winCfg);
	        Ext.create(cfg);
	        this.createDialog(records);
	    }
    },
    onSearchSeniorClick : function() {
    	var self_ = this;
    	var searchToolbar = Ext.ComponentQuery.query('toolbar[name=top_search_bar]')[0];
    	var btn = searchToolbar.down('button[name=seniorSearch]');
    	Ext.create('Ext.menu.Menu', {
    		width : 350,
    	    margin: '0 0 10 0',
    	    items: [{
    	    	title : '高级检索',
    	        xtype : 'form',
    	        width : 350,
    	        height : 200,
    	        layout: 'anchor',
				defaults: {
				    anchor: '100%'
				},
				defaultType: 'textfield',
				items: [],
				buttons: [{
			        text: '重置',
			        handler: function() {
			            this.up('form').getForm().reset();
			        }
			    }, {
			        text: '查询',
			        formBind: true,
			        disabled: true,
			        handler: function() {
			            var form = this.up('form').getForm();
			            if (form.isValid()) {
			            	self_.onSearch(form.getValues());
			            }
			        }
			    }]
    	    }]
    	}).showAt(btn.getXY());
    },
    getRecordsSelected: function(){	//获取选中的列
        return this.getView().getSelection();
    },
    createDialog: function(record){
        var me = this,form = Ext.ComponentQuery.query('form')[0];
        me.isEdit = !!record;
        form.loadRecord(record);
    },
    onSearch : function(values){
    },
    onSearchClick : function(){	//页面数据检索操作
    	var searchSelf = this,view =searchSelf.getView(),
    	store = searchSelf.getView().getStore(),
    	modularname = view.down('textfield[name=modularname]').getValue(),
    	modularType = view.down('RemoteCombobox[name=type]').getValue();
    	var params={
    			name : modularname,
    			extendclass  : modularType
    	};
    	store.proxy.extraParams = params;
    	store.currentPage = 1;
    	store.reload();
    }
});