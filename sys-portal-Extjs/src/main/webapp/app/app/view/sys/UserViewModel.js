Ext.define('app.view.sys.UserViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.userviewmodel',
    stores : {
    	userviewmodel : {
    		type : 'user'
    	}
    }
});