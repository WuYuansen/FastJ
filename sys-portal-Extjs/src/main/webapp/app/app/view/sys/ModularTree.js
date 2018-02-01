Ext.define('app.view.sys.ModularTree', {
	extend : 'Ext.tree.Panel',
	xtype : 'modularTree',
	requires : ['Ext.data.TreeStore'],
    useArrows: true,
    rootVisible: false,//根节点是否可见
    multiSelect: true,
//    store: 'detpTree',
    store :  Ext.create('Ext.data.TreeStore', {
        proxy: {
            type: 'ajax',
            actionMethods: {
                create: "POST", read: "POST", update: "POST", destroy: "POST"
            },
            url: window.constants.url.sys.modular.modularTree
        },
        folderSort: true
    }),
    listeners : {
    	itemclick: function (record, node) {
    		
    	},
    	expand :function(panel, eOpts){
    		panel.getStore().reload();
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