/**
 * 
 * <p>
 * Title:Bmxx EXTJS VIEW
 * </p>
 * <p>
 * Description: 部门信息
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
Ext.define('app.view.sys.Dept', {
	extend : 'wys.basic.BaseView',
	xtype : 'deptView',
	controller : 'dept',
	requires : [ 'app.view.sys.DeptCtrl', 'app.store.sys.Dept',
			'app.view.sys.DeptForm', 'app.view.sys.DeptViewModel' ],
	viewModel : {
		type : 'deptmodel'
	},
	bind : '{deptstore}',
	selType : 'checkboxmodel',
	multiSelect : true,
	columns : [ {
		xtype : 'rownumberer',
		text : '序号',
		align : 'center',
		width : 50
	}, {
		text : '部门ID',
		dataIndex : 'id',
		flex : 1,
		hidden : true
	}, {
		text : '组织机构名称',
		dataIndex : 'deptname',
		flex : 1,
		sortable : true
	}, {
		text : '类型',
		dataIndex : 'depttypename',
		flex : 1
	}, {
		text : '组织机构负责人',
		dataIndex : 'deptmanageridText',
		flex : 1
	}, {
		text : '组织机构介绍',
		dataIndex : 'deptremarks',
		flex : 1
	}, {
		text : '',
		width : 15,
		sortable : true
	} ],
	listeners : {
		rowdblclick : 'onGridCellItemClick'
	},
	dockedItems : [ {
		xtype : 'pagingtoolbar',
		bind : '{deptstore}',
		dock : 'bottom'
	}, {
		xtype : 'toolbar',
		name : 'top_bar',
		dock : 'top',
		items : [ {
			xtype : 'saveBtn',
			listeners : {
				click : 'onAddClick'
			}
		}, {
			xtype : 'modifyBtn',
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
			name : 'deptname',
			emptyText : '请输入组织机构名称...'
		}, {
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