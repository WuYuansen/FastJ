Ext.define('app.view.sys.DeptViewModel',{
	extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.deptmodel',
    stores : {
    	deptstore : {
    		type : 'dept'
    	}
    }
});