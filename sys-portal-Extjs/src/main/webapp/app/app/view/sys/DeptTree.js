Ext.define('app.view.sys.DeptTree', {
	extend : 'Ext.tree.Panel',
	xtype : 'deptTreeView',
	requires : [ 'app.store.sys.DeptTree' ],
	useArrows : true,
	rootVisible : false,// 根节点是否可见
	multiSelect : true,
	store : Ext.create('Ext.data.TreeStore', {
		proxy : {
			type : 'ajax',
			actionMethods : {
				create : "POST",
				read : "POST",
				update : "POST",
				destroy : "POST"
			},
			url : window.constants.url.sys.dept.deptTree
		},
		folderSort : true
	}),
	listeners : {
		itemclick : function(record, node) {
			component = Ext.ComponentQuery.query('deptView')[0];
			if (component == undefined) {
				component = Ext.ComponentQuery.query('sys_user_view')[0];
				store = component.getStore();
				var params = {
					deptcode : node.data.id
				};
				store.proxy.extraParams = params;
				store.currentPage = 1;
				store.reload();
			} else {
				store = component.getStore();
				var params = {
					deptsuper : node.data.id
				};
				store.proxy.extraParams = params;
				store.currentPage = 1;
				store.reload();
			}
		}
	},
	columns : [ {
		xtype : 'treecolumn', // this is so we know which column will show the
								// tree
		text : '组织机构',
		sortable : true,
		dataIndex : 'deptname',
		locked : false,
		flex : 0.7
	} ]
});