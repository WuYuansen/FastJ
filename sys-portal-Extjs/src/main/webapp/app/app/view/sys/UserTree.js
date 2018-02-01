Ext.define('app.view.sys.UserTree', {
	extend : 'Ext.tree.Panel',
	xtype : 'userTreeView',
	requires : ['app.store.sys.UserTree'],
//	collapsible: true,
    useArrows: true,
    rootVisible: false,//根节点是否可见
    multiSelect: true,
    store: Ext.create('Ext.data.TreeStore',{
        proxy: {
            type: 'ajax',
            actionMethods: {
                create: "POST", read: "POST", update: "POST", destroy: "POST"
            },
            url: window.constants.url.sys.user.userTree
        },
        folderSort: true
    }),
    listeners : {
    	itemclick: function (record, node) {
			store = Ext.ComponentQuery.query('userView')[0].getStore();
			var params={deptsuper : node.data.id};
	    	store.proxy.extraParams = params;
	    	store.currentPage = 1;
	    	store.reload();
    	}
    },
    columns: [{
        xtype: 'treecolumn', //this is so we know which column will show the tree
        text: '组织机构',
        sortable: true,
        dataIndex: 'deptname',
        locked: false,
        flex:0.7
    }]
});