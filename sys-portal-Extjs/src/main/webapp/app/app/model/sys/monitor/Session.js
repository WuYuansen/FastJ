Ext.define('app.model.sys.monitor.Session',
{
	extend : 'Ext.data.Model',
	fields : [ 'ConcurrentMax', 'CreateTime', 'JdbcCommitCount',
			'JdbcExecuteCount', 'JdbcExecuteTimeMillis',
			'JdbcFetchRowCount', 'JdbcRollbackCount',
			'JdbcUpdateCount', 'LastAccessTime', 'Principal',
			'RemoteAddress', 'RequestCount', 'RequestInterval',
			'RequestTimeMillisTotal', 'RunningCount', 'SESSIONID',
			'UserAgent' ]
});