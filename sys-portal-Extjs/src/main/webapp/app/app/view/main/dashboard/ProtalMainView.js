/**
 *
 * <p> Title:ProtalMainView.js BY EXTJS V6.0 (src/main/newwebapp/classic/src/view/main/dashboard)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.view.main.dashboard.ProtalMainView',{
	extend : 'Ext.panel.Panel',
	xtype : 'portalMaiView',
	layout: 'border',
	controller : 'protalMianViewCtrl',
	requires : [
        'app.view.main.dashboard.ProtalMianViewCtrl',
        'app.view.main.dashboard.ProtalInfoForm',
        'app.view.main.dashboard.ProtalViewModel'
    ],
	alias: 'widget.portalMaiView',
	items : [{
        region:'west',
        width: 180,
        title : '快速查询',
        collapseToolText:'展开/隐藏',
        collapsible: true,
        hidden : true,
        collapseDirection:'bottom',
        reference: 'portalLeftView',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        tools:[{
        	type : 'refresh',
        	tooltip : '刷新'
        }],
        border: true,
        scrollable: 'y',
        items: [{
            xtype: 'treelist',
            reference: 'treelist',
            expanderOnly : false,
            listeners : {
                selectionchange:'selectTreeListItems'
            }
        }]
    },{
        region: 'center',
        xtype : 'baseView',
        name:'protal',
        bodyBorder:0,
        layout: 'fit',
        width : '100%',
		margin : '0px 0px 0px 0px',
		anchor : '100%',
		columns : [
	            {xtype:'rownumberer',text:'序号',align : 'center',width : 50},
	            {
	                xtype:'command',
	                text:'规划',
	                align:'center',
	                width : 50,
	                commands : [
	                    { command: "operator", text:'<i class="fa fa-cog"></i>',tooltip :{text:'规划'},cls:'radiusBtn command-success-color'}
	                ],
	                listeners: {
	                    command: 'onGridCommand'
	                }
	            },
		   		{text:'标题',dataIndex:'title',flex:1,minWidth:120},
		   		{text:'英文标题',dataIndex:'titleEn',width:195},
		   		{text:'启用',dataIndex:'state',width:60,renderer:function(v){
		   			return v==='0'?'<span style="color:blue;">启用</span>':'<span style="color:red;">禁用</span>';
		   		}},
		   		{text:'适用机构',dataIndex:'depts',width:180},
		   		{text:'适用人员',dataIndex:'users',width:180},
		   		{text:'',width:15,menuDisabled:true} 
	   	],
	   	selType: 'checkboxmodel',
	    multiSelect: true,
	    listeners : {
	    	rowdblclick:'portalViewDblClick'
	    },
	    viewModel : {type : 'protalViewModel'},
	    bind:'{protalStores}',
	    dockedItems: [{
		   	    xtype: 'pagingtoolbar',
		   		bind : '{protalStores}',
		   		dock: 'bottom'
		   	},{
		           xtype: 'toolbar',
		           name : 'top_bar',
		           dock: 'top',
		           items : [
                    {xtype : 'saveBtn',handler:'portalViewClick'},
                    {xtype : 'modifyBtn',handler:'portalViewClickByModify'},
                    {xtype:'removeBtn',listeners: {click: 'portalViewClickRemoveChose'}},'->',
                    {xtype : 'textfield',emptyText:'请输入关键字',name:'keyWord'},
                    {xtype:'searchBtn',handler : 'portalViewClickSearch'},
                    {xtype:'refreshBtn',listeners: {click: 'portalViewClickRefresh'}}
		           ]
		   	}
       ]
    }]
});