Ext.define('app.store.sys.DeptTree',{
	extend :'Ext.data.TreeStore',
	alias : 'store.detpTree',
    storeId : 'deptTreeStoreId',
    model: 'app.model.sys.Dept',
    autoLoad : true,
    proxy: {
        type: 'ajax',
        url: constants.url.sys.dept.deptTree
    },
    folderSort: true
});