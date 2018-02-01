Ext.define('app.view.sys.RightTree', {
	extend : 'Ext.tree.Panel',
	xtype : 'rightTreeView',
    useArrows: true,
    rootVisible: false,//根节点是否可见
    multiSelect: true,
    store: Ext.create('Ext.data.TreeStore', {
        proxy: {
            type: 'ajax',
            actionMethods: {
                create: "POST", read: "POST", update: "POST", destroy: "POST"
            },
            url: window.constants.url.sys.right.rightTree
        },
        folderSort: true
    }),
    listeners : {
    	itemclick: function (record, node) {
			component = Ext.ComponentQuery.query('right')[0];
			store = component.getStore();
			var params={sourcescode : node.data.sourcescode};
	    	store.proxy.extraParams = params;
	    	store.currentPage = 1;
	    	store.reload();
    	}
    }, 
    columns: [{
        xtype: 'treecolumn', //this is so we know which column will show the tree
        text: '资源名称',
        sortable: true,
        dataIndex: 'showname',
        locked: false,
        flex:0.7
    }]
});