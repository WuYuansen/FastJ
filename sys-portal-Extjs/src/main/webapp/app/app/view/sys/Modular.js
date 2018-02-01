Ext.define('app.view.sys.Modular', {
	extend : 'wys.basic.BaseView',
	xtype : 'sys_modular_view',
	controller : 'modular',
	requires : [ 'app.view.sys.ModularCtrl', 'app.store.sys.Modular',
			'app.view.sys.ModularViewModel', 'app.view.sys.ModularForm' ],
	title : '系统资源管理',
	viewModel : {
		type : 'modularviewmodel'
	},
	bind : '{modularviewmodel}',
	selType : 'checkboxmodel',
	loadMask : {
		msg : '正在加载数据,请稍等...'
	},
	listeners : {
		rowdblclick : 'onUpdateClick'
	},
	multiSelect : true,
	columns : [
			{
				xtype : 'rownumberer',
				text : '序号',
				align : 'center',
				width : 50
			},
			{
				text : '编号',
				hidden : true,
				dataIndex : 'id'
			},
			{
				text : '模块名称',
				dataIndex : 'name',
				flex : 1,
				sortable : false
			},
			{
				text : '模块编码',
				dataIndex : 'modularcode',
				flex : 1,
				hidden : true
			},
			{
				text : '显示名称',
				dataIndex : 'showname',
				flex : 1,
				sortable : false
			},
			{
				text : '类型',
				dataIndex : 'extendclass',
				flex : 1,
				sortable : false,
				renderer : function(v) {
					return v == 'menu' ? "菜单" : v == "part" ? "权限"
							: v == 'modules' ? "模块" : '未知';
				}
			}, {
				text : '视图名称',
				dataIndex : 'extendtype',
				flex : 1,
				sortable : false
			}, {
				text : '编辑人员',
				dataIndex : 'modifyuser',
				flex : 1,
				sortable : false
			}, {
				text : '编辑时间',
				dataIndex : 'modifydate',
				flex : 1,
				renderer : function(value) {
					return window.util.formatDate(value, 'Y-m-d');
				}
			}, {
				text : '排序',
				dataIndex : 'order',
				flex : 1,
				sortable : true
			}, {
				text : '图标',
				dataIndex : 'icon',
				flex : 1,
				sortable : true
			}, {
				text : '',
				width : 15,
				sortable : true
			} ],
	viewConfig : {
		stripeRows : true,
		enableTextSelection : true
	},
	dockedItems : [ {
		xtype : 'pagingtoolbar',
		bind : '{modularviewmodel}',
		dock : 'bottom'
	}, {
		xtype : 'toolbar',
		name : 'top_bar',
		dock : 'top',
		items : [ {
			text : '新增',
			xtype : 'saveBtn',
			name : 'add',
			listeners : {
				click : 'onAddClick'
			}
		}, {
			name : 'modef',
			xtype : 'modifyBtn',
			listeners : {
				click : 'onUpdateClick'
			}
		}, {
			name : 'batckRemove',
			xtype : 'removeBtn',
			listeners : {
				click : 'onDeleteClick'
			}
		}, '->', {
			xtype : 'textfield',
			name : 'modularname',
			emptyText : '请输入模块名称'
		}, '-', {
			xtype : 'RemoteCombobox',
			name : 'type',
			width : 80,
			emptyText : '类型',
			model : Ext.create('Ext.data.Model', {
				fields : [ 'key', 'value' ]
			}),
			valueField : 'value',
			displayField : 'key',
			proxy_url : constants.url.combo.dict + "menuType"

		}, {
			name : 'ref',
			xtype : 'searchBtn',
			listeners : {
				click : 'onSearchClick'
			}
		}, {
			xtype : 'refreshBtn',
			listeners : {
				click : 'onRefreshClick'
			}
		} ]
	} ]
});