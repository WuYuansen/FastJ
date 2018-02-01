/**
 * 
 * <p>
 * Title:Zd EXTJS VIEW
 * </p>
 * <p>
 * Description: 字典表
 * </p>
 * <p>
 * Copyright: Copyright (c) 2013
 * </p>
 * <p>
 * Company:乌鲁木齐光通嘉业网络服务有限公司
 * </p>
 * 
 * @author wys
 * @version 1.0
 */
Ext.define('app.view.sys.Dict', {
	extend : 'wys.basic.BaseView',
	xtype : 'sys_dict_view',
	controller : 'dict',
	requires : [ 'app.view.sys.DictCtrl', 'app.store.sys.Dict',
			'app.view.sys.DictForm', 'app.view.sys.DictViewModel' ],
	title : '字典管理',
	viewModel : {
		type : 'dictmodel'
	},
	bind : '{dictmodel}',
	selType : 'checkboxmodel',
	loadMask : {
		msg : '正在加载数据,请稍等...'
	},
	listeners : {
		rowdblclick : 'onUpdateClick'
	},
	multiSelect : true,
	columns : [ {
		xtype : 'rownumberer',
		text : '序号',
		align : 'center',
		width : 50
	}, {
		text : '字典ID',
		dataIndex : 'id',
		flex : 1,
		hidden : true
	}, {
		text : '字典类型名',
		dataIndex : 'typename',
		flex : 1
	}, {
		text : '英文名',
		dataIndex : 'keycode',
		flex : 1
	}, {
		text : '字典键名',
		dataIndex : 'key',
		flex : 1
	}, {
		text : '字典键值',
		dataIndex : 'value',
		flex : 1
	}, {
		text : '前台维护',
		dataIndex : 'ismodify',
		flex : 1,
		hidden : true
	}, {
		text : '排序',
		dataIndex : 'order',
		flex : 0.5
	}, {
		text : '字典键英文名',
		dataIndex : 'type',
		flex : 1
	}, {
		text : '状态',
		dataIndex : 'state',
		flex : 0.5,
		renderer : function(v) {
			return v == 1 ? "正常" : "删除";
		}
	}, {
		text : '备注',
		dataIndex : 'remarks',
		flex : 2
	}, {
		text : '',
		width : 15,
		sortable : true
	} ],
	dockedItems : [ {
		xtype : 'pagingtoolbar',
		bind : '{dictmodel}',
		dock : 'bottom'
	}, {
		xtype : 'toolbar',
		name : 'top_bar',
		dock : 'top',
		items : [ {
			xtype : 'saveBtn',
			name : 'add',
			listeners : {
				click : 'onAddClick'
			}
		}, {
			xtype : 'modifyBtn',
			name : 'modef',
			listeners : {
				click : 'onUpdateClick'
			}
		}, {
			xtype : 'removeBtn',
			listeners : {
				click : 'onDeleteClick'
			}
		}, '->', {
			xtype : 'textfield',
			name : 'dict_name',
			emptyText : '请输入字典名称'
		}, {
			name : 'ref',
			xtype : 'searchBtn',
			listeners : {
				click : 'onSearchClick'
			}
		}, {
			name : 'ref',
			xtype : 'refreshBtn',
			listeners : {
				click : 'onRefreshClick'
			}
		} ]
	} ]
});