Ext.define('app.view.sys.LogsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.logsviewmodel',
    stores : {
    	logsviewmodel : {
    		type : 'logsStore'
    	}
    }
});