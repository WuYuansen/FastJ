Ext.define('app.view.sys.LogsCtrl',{
	extend : 'wys.basic.BaseCtrl',
    alias: 'controller.logs',
    init : function(view){
    },
    onRefreshClick : function(){
    	var view = this.getView();
    	view.getStore().reload();
    },
    getRecordsSelected: function(){	//获取选中的列
        return this.getView().getSelection();
    },
    createDialog: function(record){
        var me = this,form = Ext.ComponentQuery.query('form')[0];
        me.isEdit = !!record;
        form.loadRecord(record);
    },
    onSearchClick : function(){	//页面数据检索操作
    	var searchSelf = this,view =searchSelf.getView(),
    	store = searchSelf.getView().getStore(),
    	logsoperationuser = view.down('textfield[name=logs_operationuser]').getValue();
    	logsoperationtype = view.down('textfield[name=logs_operationtype]').getValue();
    	beginTime=view.down('datefield[name=beginTime]').getValue();
		endTime=view.down('datefield[name=endTime]').getValue();
    	var params={
    		beginDate : beginTime,
    		endDate : endTime,
   			operationuser : logsoperationuser,
   			operationtype : logsoperationtype
    	};
    	Ext.apply(store.proxy.extraParams,params);
    	store.currentPage = 1;
    	store.load();
    }
});