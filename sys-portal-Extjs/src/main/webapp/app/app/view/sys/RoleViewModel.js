Ext.define('app.view.sys.RoleViewModel',{
	extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.roleviewmodel',
    stores : {
    	roleviewmodel : {
    		type : 'role'
    	}
    }
});