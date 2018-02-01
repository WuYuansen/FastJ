Ext.define('app.view.sys.Logs', {
	extend : 'wys.basic.BaseView',
	xtype : 'sys_logs_view',
	controller : 'logs',
	requires : [ 'app.view.sys.LogsCtrl', 'app.store.sys.Logs',
			'app.view.sys.LogsViewModel' ],
	title : '日志管理',
	viewModel : {
		type : 'logsviewmodel'
	},
	bind : '{logsviewmodel}',
	// selType: 'checkboxmodel',
	loadMask : {
		msg : '正在加载数据,请稍等...'
	},
	multiSelect : true,
	sortableColumns : true, // 表格排序
	columns : [ {
		xtype : 'rownumberer',
		text : '序号',
		align : 'center',
		flex : 0.5
	}, {
		text : 'id',
		dataIndex : 'id',
		flex : 0.3,
		sortable : true,
		hidden : true
	}, {
		text : '日志类型',
		dataIndex : 'logstype',
		flex : 1,
		hidden : true
	}, {
		text : '操作来源',
		dataIndex : 'logssource',
		flex : 1,
		hidden : true
	}, {
		text : '操作人',
		dataIndex : 'operationuser',
		flex : 0.5
	}, {
		text : '操作时间',
		dataIndex : 'operationdate',
		flex : 1,
		renderer : function(value) {
			return window.util.formatDate(value, 'Y-m-d H:i:s');
		}
	}, {
		text : '操作步骤名',
		dataIndex : 'operationstep',
		flex : 1,
		sortable : false,
		hidden : true
	}, {
		text : '操作类型',
		dataIndex : 'operationtype',
		flex : 0.5
	}, {
		text : '操作描述',
		dataIndex : 'operationremarks',
		flex : 3
	}, {
		text : '操作人IP',
		dataIndex : 'operationip',
		flex : 1
	}, {
		text : '',
		width : 15,
		sortable : true
	} ],
	viewConfig : {
		stripeRows : true,
		enableTextSelection : true
	},
	dockedItems : [
			{
				xtype : 'pagingtoolbar',
				bind : '{logsviewmodel}',
				dock : 'bottom'
			},
			{
				xtype : 'toolbar',
				name : 'top_bar1',
				dock : 'top',
				items : [
						{
							xtype : 'tbtext',
							text : '选择日期：'
						},
						{
							name : 'beginTime',
							xtype : 'datefield',
							format : 'Y年m月d日',
							width : 140,
							value : Ext.util.Format.date(Ext.Date.add(
									new Date(), Ext.Date.MONTH, -1), "Y-m-d")
						},
						{
							xtype : 'tbtext',
							text : '-'
						},
						{
							name : 'endTime',
							xtype : 'datefield',
							format : 'Y年m月d日',
							width : 140,
							value : Ext.util.Format.date(new Date(), "Y-m-d")
						},
						'-',
						{
							text : '操作人：',
							xtype : 'tbtext'
						},
						{
							xtype : 'textfield',
							name : 'logs_operationuser',
							emptyText : '请输入操作人名姓名'
						},

						/*
						 * {text:'操作类型：',xtype:'tbtext'}, {xtype :
						 * 'textfield',name:'logs_operationtype',emptyText:'请输入操作类型'},
						 */

						/** ****************************************** */
						{
							text : '操作类型：',
							xtype : 'tbtext',
							width : 60
						},
						{
							xtype : 'combo',
							name : 'logs_operationtype',
							emptyText : '请输入操作类型',
							/*
							 * model : Ext.create('Ext.data.Model',{ fields :
							 * ['key','value'] }),
							 */
							queryMode : 'local',
							store : new Ext.data.SimpleStore({
								fields : [ 'value', 'text' ],
								data : [ [ '全部', '全部' ], [ '登录', '登录' ],
										[ '注销', '注销' ], [ '新增', '新增' ],
										[ '删除', '删除' ], [ '修改', '修改' ],
										[ '进入模块', '进入模块' ] ]
							}),
							valueField : 'value',
							displayField : 'text',
							readOnly : false,
							width : 130,
							listConfig : {
								minWidth : 150
							},
							triggerAction : 'all'
						// proxy_url :
						// constants.url.combo.dict2+"?type=SpeDevDri&code=3000",
						/*
						 * listeners : { select : 'onRemoteComboboxSelected' }
						 */
						}, {
							name : 'ref',
							xtype : 'searchBtn',
							listeners : {
								click : 'onSearchClick'
							}
						}, '->', {
							text : '刷新',
							xtype : 'refreshBtn',
							listeners : {
								click : 'onRefreshClick'
							}
						} ]
			} ]
});