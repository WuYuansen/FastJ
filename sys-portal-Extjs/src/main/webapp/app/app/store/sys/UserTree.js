Ext.define('app.store.sys.UserTree',{
	extend :'Ext.data.TreeStore',
	alias : 'store.userTree',
    storeId : 'userTreeStoreId',
    model: 'app.model.sys.User',
    autoLoad : true,
    proxy: {
        type: 'ajax',
        url: constants.url.sys.user.userTree
    },
    folderSort: true
});