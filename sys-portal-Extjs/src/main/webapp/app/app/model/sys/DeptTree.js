Ext.define('app.model.sys.DeptTree',{
	extend : 'Ext.data.TreeModel',
	fields : [ 'bmfzr', 'bmfzrid', {name:'bmid',type:'int'}, 'bmjs', 'bmmc', 'cj',
			'sjbm', 'type' ]
});