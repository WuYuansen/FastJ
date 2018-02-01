Ext.define('app.view.sys.User', {
	extend : 'wys.basic.BaseView',
	xtype : 'sys_user_view',
	controller : 'user',
	requires : [ 'app.view.sys.UserCtrl', 'app.store.sys.User',
			'app.view.sys.UserViewModel', 'app.view.sys.UserForm' ],

	viewModel : {
		type : 'userviewmodel'
	},
	bind : '{userviewmodel}',
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
		text : 'id',
		dataIndex : 'id',
		flex : 1,
		sortable : false,
		hidden : true
	}, {
		text : '登陆名',
		dataIndex : 'loginname',
		flex : 1
	}, {
		text : '姓名',
		dataIndex : 'realname',
		flex : 1,
		sortable : false
	}, {
		text : '性别',
		dataIndex : 'sexText',
		flex : 1,
		sortable : true
	}, {
		text : '民族',
		dataIndex : 'nationText',
		flex : 1,
		sortable : true
	}, {
		text : '身份证号码',
		dataIndex : 'idcard',
		flex : 1,
		sortable : true,
		hidden : true
	}, {
		text : '组织机构',
		dataIndex : 'deptcode',
		flex : 1,
		sortable : false,
		hidden : true
	}, {
		text : '职务',
		dataIndex : 'postText',
		flex : 1
	}, {
		text : '办公电话',
		dataIndex : 'tel',
		flex : 1,
		sortable : true
	}, {
		text : '个人电话',
		dataIndex : 'mobphone',
		flex : 1,
		sortable : true
	}, {
		text : 'QQ号',
		dataIndex : 'qq',
		flex : 1,
		sortable : true
	}, {
		text : '电子邮箱',
		dataIndex : 'email',
		flex : 1,
		sortable : true
	}, {
		text : '工作情况',
		dataIndex : 'jobstateText',
		flex : 1,
		sortable : true
	}, {
		text : '家庭住址',
		dataIndex : 'address',
		flex : 1,
		sortable : true
	}, {
		text : '备注',
		dataIndex : 'remarks',
		flex : 2,
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
		bind : '{userviewmodel}',
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
			name : 'user_name',
			emptyText : '请输入真实姓名'
		}, {
			xtype : 'textfield',
			name : 'user_mobphone',
			emptyText : '请输入手机号码'
		}, {
			xtype : 'RemoteCombobox',
			name : 'user_jobstate',
			width : 100,
			emptyText : '工作状态...',
			model : Ext.create('Ext.data.Model', {
				fields : [ 'key', 'value' ]
			}),
			valueField : 'value',
			displayField : 'key',
			proxy_url : constants.url.combo.dict + "JobState",
			listeners : {
				expand : function(ths) {
					this.getStore().reload();
				}
			}
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