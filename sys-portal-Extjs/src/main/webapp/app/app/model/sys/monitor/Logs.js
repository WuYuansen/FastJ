Ext.define('app.model.sys.monitor.Logs', {
	extend : 'Ext.data.Model',
	idProperty : 'id',
	fields : [ 
		   {name:'id',type:'int'},  //ID
	       {name:'logstype',type:'int'},  //  日志类型 ：1 前台日志、2 后台日志、3 其它日志
	       {name:'logssource',type:'string'},  //操作来源
	       {name:'operationdate',mapping:'operationdate'},  //操作时间
	       {name:'operationstep',type:'string'},  //  操作步骤名
	       {name:'operationtype',type:'string'},  //   操作类型
	       {name:'operationremarks',type:'string'},  //   操作描述
	       {name:'operationuser',type:'string'},  //   操作人
	       {name:'operationip',type:'string'}  //   操作人IP
	]
});