/**
 * 
 * <p> Title:Qx EXTJS CONTROLLER</p>
 * <p> Description:  系统权限表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.view.sys.RightCtrl', {
	extend : 'wys.basic.BaseCtrl',
	alias:'controller.right',
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
    			title : '新增权限'
    	};
    	var cfg = Ext.apply({
            xtype: 'baseWin',
            items: [
                    {xtype : 'rightform'}
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
    	        		store.sync({callback:function(res){
    	        			if(!res.exception){
    	        				store.reload();
    	        			}else{
    	        				window.util.err(constants.system_msg.deleteTip_err,constants.system_msg.sysTip);
    	        			}
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
	    			title : '编辑系统权限【'+records[0].data.rightname+'】'
	    	};
	    	var cfg = Ext.apply({
	            xtype: 'baseWin',
	            items: [
	                    {xtype : 'rightform'}
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
    onItemSelected: function(view, td, cellIndex, record){//双击数据行
    	alert("12");
    },
    rowcontextmenu:function(this_, record, tr, rowIndex, e, eOpts ){ //右键菜单
    	e.preventDefault();
    	var treeMenu = new Ext.menu.Menu([ {
			xtype : "",
			text : "详细",
			iconCls : 'context-dog',
			pressed : false,
			handler : function() {
				// 获得行数据
				var record = grid.getStore().getAt(rowIndex);
				alert(record.data.company);
			}
		}, {
			xtype : "",
			text : "删除",
			iconCls : 'context-cat',
			pressed : false,
			handler : function() {
				// 获得行数据
				var record = grid.getStore().getAt(rowIndex);
				alert(record.data.company);
			}
		} ]);
		treeMenu.showAt(e.getXY()); 
    },
    /**
	 * 获取选中行
	 */
    getRecordsSelected: function(){	//获取选中的列
        return this.getView().getSelection();
    },
    onSearchClick : function(){
    	var searchSelf = this,view =searchSelf.getView(),
    	store = searchSelf.getView().getStore(),
    	rightname = view.down('textfield[name=rightname]').getValue();
    	var params={
    			rightname : rightname
    			};
    	store.proxy.extraParams = params;
    	store.currentPage = 1;
    	store.reload();
    },
    /**
     * 创建弹窗
     */
    createDialog: function(record){
        var me = this,form = Ext.ComponentQuery.query('form')[0];
        me.isEdit = !!record;
        form.loadRecord(record);
    }
});