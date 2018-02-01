Ext.define('app.view.sys.ModularViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.modularviewmodel',
    stores : {
    	modularviewmodel : {
    		type : 'modular'
    	}
    }
});