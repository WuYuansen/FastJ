Ext.define('app.model.sys.monitor.Req', {
	extend : 'Ext.data.Model',
	fields : [ 'BatchSizeMax', 'BatchSizeTotal', 'BlobOpenCount',
			'ClobOpenCount', 'ConcurrentMax', 'DataSource', 'DbType',
			'EffectedRowCount', 'EffectedRowCountHistogram',
			'EffectedRowCountMax', 'ErrorCount',
			'ExecuteAndResultHoldTimeHistogram', 'ExecuteAndResultSetHoldTime',
			'ExecuteCount', 'FetchRowCount', 'FetchRowCountHistogram',
			'FetchRowCountMax', 'File', 'Histogram', 'ID',
			'InTransactionCount', 'InputStreamOpenCount', 'LastError',
			'LastErrorClass', 'LastErrorMessage', 'LastErrorStackTrace',
			'LastErrorTime', 'LastSlowParameters', 'LastTime', 'MaxTimespan',
			'MaxTimespanOccurTime', 'Name', 'ReadBytesLength',
			'ReadStringLength', 'ReaderOpenCount', 'ResultSetHoldTime',
			'RunningCount', 'SQL', 'TotalTime', 'URL'
	]
});