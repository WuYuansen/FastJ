/**
 * 
 * <p> Title:${className} EXTJS VIEW</p>
 * <p> Description:  ${codeName}</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
  Ext.define('${JS_PATH_view}.${className}', {
	extend: 'app.view.BaseView',
	xtype : '${lowerName}',
	controller : 'modular',
    requires: [
       '${JS_PATH_controller}.${className}',
       '${JS_PATH_store}.${className}',
       '${JS_PATH_form}.${className}'
    ],
    title: '${codeName}',
    viewModel: {
        type: '${lowerName}model'
    },
    bind : '{${lowerName}model}',
    selType: 'checkboxmodel',
    multiSelect: true,
    columns : [
		Ext.create('Ext.grid.RowNumberer', {text:'序号',align : 'center',width : 50}),
		#foreach($item in $!{columnDatas})
		{text:'$!item.columnComment',dataIndex:'$!item.columnName',flex:1},
		#end
	],
	dockedItems: [{
        xtype: 'pagingtoolbar',
        bind : '{${lowerName}model}',
        dock: 'bottom',
        displayInfo: true,
        beforePageText 	: constants.pagingtoolbar['beforePageText'],
		displayMsg 		: constants.pagingtoolbar['displayMsg'],
		emptyMsg 		: constants.pagingtoolbar['emptyMsg'],
		refreshText 	: constants.pagingtoolbar['refreshText'],
		firstText 		: constants.pagingtoolbar['firstText'],
		prevText 		: constants.pagingtoolbar['prevText'],
		nextText 		: constants.pagingtoolbar['nextText'],
		lastText 		: constants.pagingtoolbar['lastText'],
    },{
    	 xtype: 'toolbar',
         name : 'top_bar',
         dock: 'top',
         items : [{text:'这里存放的是查询组件',xtype:'tbtext'}]
    },{
    	 xtype: 'toolbar',
         name : 'top_bar',
         dock: 'top',
         items : [
              {
            	  iconCls: 'icon-add',
            	  text : '新增',
            	  name 	: 'add',
            	  iconCls : 'fa fa-plus-circle fa-2x',
            	  listeners: {
                      click: 'onAddClick'
                  },
            	  tooltip : '<span style="font-size:12px">点击进行新增操作</span>'
        	  },
        	  {
        		  text : '修改',
        		  name : 'modef',
        		  iconCls : 'fa fa-edit fa-lg',
        		  listeners: {
                      click: 'onUpdateClick'
                  },
        		  tooltip : '<span style="font-size:12px">点击进行修改操作</span>'
        	  },
        	  {
            	  text : '批量删除',
            	  name 	: 'add',
            	  iconCls : 'fa fa-trash-o fa-lg',
            	  listeners: {
                      click: 'onDeleteClick'
                  },
            	  tooltip : '<span style="font-size:12px">点击进行删除操作</span>'
        	  },
        	  '->',
        	  {
        		 text : '刷新',
        		 name : 'ref',
        		 iconCls : 'fa fa-refresh fa-lg',
        		 listeners: {
                     click: 'onRefreshClick'
                 },
        		 tooltip : '<span style="font-size:12px">点击进行刷新操作</span>'
        	  }
         ]
    }]
 });