Ext.define('app.view.sys.UserCtrl',{
	extend : 'wys.basic.BaseCtrl',
    alias: 'controller.user',
    init : function(view){
    	this.getView().getStore().load();
    },
    onAddClick : function(){
    	var me = this,records = me.getRecordsSelected();
    	var winCfg = {
    			icon : records ? 'fa fa-pencil' : 'fa fa-plus',
    			title : '用户注册'
    	};
    	var cfg = Ext.apply({
            xtype: 'baseWin',
            items: [
                    {xtype : 'userform'}
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
	    			title : '编辑用户信息【'+records[0].data.loginname+'】'
	    	};
	    	var cfg = Ext.apply({
	            xtype: 'baseWin',
	            items: [
	                    {xtype : 'userform'}
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
    onItemSelected: function(view, td, cellIndex, record){//双击数据行
	    if(record){
	    	var winCfg = {
	    			icon : records ? 'fa fa-pencil' : 'fa fa-plus',
	    			title : '编辑用户信息【'+records[0].data.loginname+'】'
	    	};
	    	var cfg = Ext.apply({
	            xtype: 'baseWin',
	            items: [
	                    {xtype : 'userform'}
	            ]
	        },winCfg);
	        Ext.create(cfg);
	        this.createDialog(records);
	    }
    },
    getRecordsSelected: function(){	//获取选中的列
        return this.getView().getSelection();
    },
    createDialog: function(record){
        var me = this,form = Ext.ComponentQuery.query('form')[0];
        me.isEdit = !!record;
        if(me.isEdit){
        	var password = form.down('textfield[name=password]'),
            password2 =form.down('textfield[name=password2]');
        	password.allowBlank=true;
        	password2.allowBlank=true;
        	record.data.password="";
        }
        form.loadRecord(record);
    },
    onSearchClick : function(){	//页面数据检索操作
    	var searchSelf = this,view =searchSelf.getView(),
    	store = searchSelf.getView().getStore(),
    	username = view.down('textfield[name=user_name]').getValue();
    	usermobphone = view.down('textfield[name=user_mobphone]').getValue();
    	userjobstate = view.down('textfield[name=user_jobstate]').getValue();
    	var params={
    			realname : username,
    			mobphone : usermobphone,
    			jobstate : userjobstate
    	};
    	store.proxy.extraParams = params;
    	store.currentPage = 1;
    	store.reload();
    }
});