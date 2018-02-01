Ext.define('app.view.sys.DictViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dictmodel',
    stores : {
    	dictmodel : {
    		type : 'dict'
    	}
    }
});