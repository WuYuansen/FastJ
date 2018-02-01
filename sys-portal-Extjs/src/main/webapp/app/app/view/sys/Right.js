/**
 * 
 * <p>
 * Title:Qx EXTJS VIEW
 * </p>
 * <p>
 * Description: 系统权限表
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
Ext.define('app.view.sys.Right', {
	extend : 'wys.basic.BaseView',
	xtype : 'right',
	controller : 'right',
	requires : [ 'app.view.sys.RightCtrl', 'app.store.sys.Right',
			'app.view.sys.RightForm', 'app.view.sys.RightViewModel' ],
	// title: '系统权限',
	viewModel : {
		type : 'rightviewmodel'
	},
	bind : '{rightStore}',
	selType : 'checkboxmodel',
	multiSelect : true,
	listeners : {
		rowdblclick : 'onUpdateClick'
	},
	columns : [ {
		xtype : 'rownumberer',
		text : '序号',
		align : 'center',
		width : 50
	}, {
		text : '权限名称',
		dataIndex : 'rightname',
		flex : 1
	}, {
		text : '资源',
		dataIndex : 'modularname',
		flex : 1
	}, {
		text : '拥有权限',
		dataIndex : 'rightcode',
		flex : 1,
		hidden : true
	}, {
		text : '备注',
		dataIndex : 'remarks',
		flex : 2
	}, {
		text : '修改人员',
		dataIndex : 'modifyuser',
		flex : 1,
		hidden : true
	}, {
		text : '修改日期',
		dataIndex : 'modifydate',
		flex : 1,
		hidden : true,
		renderer : window.util.formatDate
	}, {
		text : '',
		width : 15,
		sortable : true
	} ],
	dockedItems : [ {
		xtype : 'pagingtoolbar',
		bind : '{rightStore}',
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
			name : 'modef',
			xtype : 'modifyBtn',
			listeners : {
				click : 'onUpdateClick'
			}
		}, {
			name : 'add',
			xtype : 'removeBtn',
			listeners : {
				click : 'onDeleteClick'
			}
		}, '->', {
			xtype : 'textfield',
			name : 'rightname',
			emptyText : '请输入权限名称'
		}, {
			name : 'ref',
			xtype : 'searchBtn',
			listeners : {
				click : 'onSearchClick'
			}
		},{
			name : 'ref',
			xtype : 'refreshBtn',
			listeners : {
				click : 'onRefreshClick'
			}
		} ]
	} ]
});