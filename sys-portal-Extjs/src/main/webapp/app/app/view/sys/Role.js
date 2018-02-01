/**
 * 
 * <p>
 * Title:Js EXTJS VIEW
 * </p>
 * <p>
 * Description: 角色表
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
Ext.define('app.view.sys.Role', {
	extend : 'wys.basic.BaseView',
	xtype : 'sys_role_view',
	controller : 'role',
	requires : [ 'app.view.sys.RoleCtrl', 'app.store.sys.Role',
			'app.view.sys.RoleForm', 'app.view.sys.RoleViewModel' ],
	title : '角色管理',
	viewModel : {
		type : 'roleviewmodel'
	},
	bind : '{roleviewmodel}',
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
		xtype : 'actioncolumn',
		width : 70,
		items : [ {
			iconCls : 'fa fa-wrench fa-lg',
			text : '授权',
			align : 'center',
			tooltip : '角色授权',
			handler : 'onAuthorization'
		}, '-', {
			iconCls : 'fa fa-user fa-lg',
			align : 'center',
			tooltip : '用户授权',
			handler : 'onAuthorizationUser'
		} ]
	}, {
		text : '角色ID',
		dataIndex : 'id',
		flex : 1,
		hidden : true
	}, {
		text : '角色名称',
		dataIndex : 'rolename',
		flex : 1
	}, {
		text : '修改人员',
		dataIndex : 'modifyuser',
		flex : 1,
		hidden : true
	}, {
		text : '修改日期',
		dataIndex : 'modifydate',
		flex : 1,
		hidden : true
	}, {
		text : '备注',
		dataIndex : 'remarks',
		flex : 2
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
		bind : '{roleviewmodel}',
		dock : 'bottom'
	}, {
		xtype : 'toolbar',
		name : 'top_bar',
		dock : 'top',
		items : [ {
			name : 'add',
			xtype : 'modifyBtn',
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
			name : 'delete',
			xtype : 'removeBtn',
			listeners : {
				click : 'onDeleteClick'
			}
		}, '->', {
			xtype : 'textfield',
			name : 'role_name',
			emptyText : '请输入角色名称'
		},

		{
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