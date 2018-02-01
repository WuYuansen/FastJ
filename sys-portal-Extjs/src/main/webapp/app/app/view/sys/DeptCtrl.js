/**
 * 
 * <p> Title:Bmxx EXTJS CONTROLLER</p>
 * <p> Description:  部门信息</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.view.sys.DeptCtrl', {
	extend : 'wys.basic.BaseCtrl',
	alias:'controller.dept',
	init : function(view){
    	this.getView().getStore().reload();
    },
    /**
     * 添加 此处需要按需修改
     */
    onAddClick : function(){
    	var me = this,records = me.getRecordsSelected();
    	var winCfg = {
    			icon : records ? 'fa fa-pencil' : 'fa fa-plus',
    			title : '新增部门',
    			width : 500,
    			height : 460
    	};
    	var cfg = Ext.apply({
            xtype: 'baseWin',
            items: [
                {xtype : 'deptform',width : 500,height : 460}
            ]
        },winCfg);
        Ext.create(cfg);
    },
    /**
     * 删除 此处需要按需修改
     */
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
    /**
     * 修改 此处需要按需修改
     */
    onUpdateClick : function(){
    	var me = this,
        records = me.getRecordsSelected();
	    if(records[0]){
	    	var winCfg = {
	    			icon : records ? 'fa fa-pencil' : 'fa fa-plus',
	    			title : '编辑部门【'+records[0].data.deptname+'】',
	    			width : 500,
	    			height : 460
	    	};
	    	var cfg = Ext.apply({
	            xtype: 'baseWin',
	            items: [
	                    {xtype : 'deptform'}
	            ]
	        },winCfg);
	        Ext.create(cfg);
	        me.createDialog(records[0]);
	    }
    },
    /**
     * 刷新数据
     */
    onRefreshClick : function(){
    	var view = this.getView();
    	view.getStore().reload();
    },
    /**
     * 行双击事件
     */
    onGridCellItemClick: function(view, td, cellIndex, record){//双击数据行
    	var me = this,
        records = me.getRecordsSelected();
	    if(records[0]){
	    	var winCfg = {
	    			icon : records ? 'fa fa-pencil' : 'fa fa-plus',
	    			title : '编辑部门【'+records[0].data.deptname+'】',
	    			width : 500,
	    			height : 460
	    	};
	    	var cfg = Ext.apply({
	            xtype: 'baseWin',
	            items: [
	                    {xtype : 'deptform'}
	            ]
	        },winCfg);
	        Ext.create(cfg);
	        me.createDialog(records[0]);
	    }
    },
    /**
     * 获取选中行
     */
    getRecordsSelected: function(){	//获取选中的列
        return this.getView().getSelection();
    },
    /**
     * 创建弹窗
     */
    createDialog: function(record){
        var me = this,form = Ext.ComponentQuery.query('form')[0];
        me.isEdit = !!record;
        form.loadRecord(record);
    },
    reloadTreePanel : function(){
    	 var me = this,
    	 treePanel = Ext.ComponentQuery.query('deptTreeView')[0];
    	 store = treePanel.getStore();
    	 store.reload();
    },
    onSearchClick : function(){	//页面数据检索操作
    	var searchSelf = this,view =searchSelf.getView(),
    	store = searchSelf.getView().getStore(),
    	deptname = view.down('textfield[name=deptname]').getValue();
    	var params={
    			deptname : deptname
    	};
    	store.proxy.extraParams = params;
    	store.currentPage = 1;
    	store.reload();
    }
});