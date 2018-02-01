/**
 * 
 * <p> Title:Js EXTJS CONTROLLER</p>
 * <p> Description:  角色表</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.view.sys.RoleCtrl', {
	extend : 'wys.basic.BaseCtrl',
	alias:'controller.role',
	init : function(view){
		this.getView().getStore().load();
    },
    /**
     * 添加 此处需要按需修改
     */
    onAddClick : function(){
    	var me = this,records = me.getRecordsSelected();
    	var winCfg = {
			icon : records ? 'fa fa-pencil' : 'fa fa-plus',
			width:435,
			height:257,
			title : '新增角色'
    	};
    	var cfg = Ext.apply({
            xtype: 'baseWin',
            items: [
                    {xtype : 'roleform'}
            ]
        },winCfg);
        Ext.create(cfg);
    },
    /**
     * 删除 此处需要按需修改
     */
    onDeleteClick : function(button, e, options){
    	var me = this;
	    var records = me.getRecordsSelected();
	    var store = me.getView().getStore();
	    if (records.length != 0){
	        Ext.Msg.show({
	    	    title:'确认?',
	    	    message: '您确定要删除所选内容?',
	    	    buttons: Ext.Msg.YESNO,
	    	    icon: Ext.Msg.QUESTION,
	    	    fn: function(btn) {
	    	        if (btn === 'yes') {
    	        		store.remove(records);
    	        		store.sync({callback:function(){
    	        	    	store.reload();
    	        	    }});
	    	        } 
	    	    }
	    	});
	    }
    },
    /**
     * 修改 此处需要按需修改
     */
    onUpdateClick : function(){
    	var me = this,
        records = me.getRecordsSelected();
	    if(records[0]){
	    	var winCfg = {
				icon : records ? 'fa fa-pencil' : 'fa fa-plus',
				width:435,
				height:257,
				title : '编辑角色【'+records[0].data.rolename+'】'
	    	};
	    	var cfg = Ext.apply({
	            xtype: 'baseWin',
	            items: [
	                    {xtype : 'roleform'}
	            ]
	        },winCfg);
	        Ext.create(cfg);
	        me.createDialog(records[0]);
	    }
    },
    /**
     * 刷新数据
     */
    onRefreshClick : function(){
    	var view = this.getView();
    	view.getStore().reload();
    },
    /**
     * 行双击事件
     */
    onItemSelected: function(view, td, cellIndex, record){//双击数据行
	    if(record){
	    	var winCfg = {
	    			icon : records ? 'fa fa-pencil' : 'fa fa-plus',
	    			title : '编辑角色【'+records[0].data.rolename+'】'
	    	};
	    	var cfg = Ext.apply({
	            xtype: 'baseWin',
	            items: [
	                    {xtype : 'roleform'}
	            ]
	        },winCfg);
	        Ext.create(cfg);
	        this.createDialog(records);
	    }
    },
    getRecordsSelected: function(){	//获取选中的列
        return this.getView().getSelection();
    },
    createDialog: function(record){
        var me = this,form = Ext.ComponentQuery.query('form')[0];
        me.isEdit = !!record;
        form.loadRecord(record);
    },
    onSearchClick : function(){	//页面数据检索操作
    	var searchSelf = this,view =searchSelf.getView(),
    	store = searchSelf.getView().getStore(),
    	rolename = view.down('textfield[name=role_name]').getValue();
    	var params={
    			rolename : rolename
    	};
    	store.proxy.extraParams = params;
    	store.currentPage = 1;
    	store.reload();
    },
    onAuthorization : function(grid, rowIndex, colIndex) {
	    var self_author=this,
	    	rec = grid.getStore().getAt(rowIndex),
	    	r_tree_toolbar = [
	          {
	        	  xtype: 'toolbar',
                  name : 'top_search_bar',
                  dock: 'top',items:[
                     {text:'保存',handler : function(){
                    	 rightCode = '';
                    	 var nodeChecked = Ext.ComponentQuery.query('treepanel')[0].getView().getChecked();
                    	 Ext.Array.each(nodeChecked, function(rec){
                    		 var code = rec.get('id');
                    		 if(code.indexOf('extModel') === 0 || code === 'root'){
                    		 }else{
                    			 rightCode += code+",";
                    		 }
                         });
                    	 var windowDOM = this.up('window');
                    	 var ajax_cfg ={
                    			 url : app.base +'services/roleRight/rightRoleAuthorization.json?r_code='+rec.get('id')+'&ri_code='+rightCode,
                    			 ok : function(resp){
                    				 if(resp.success){
                    					 window.util.info('为角色【'+rec.get('rolename')+'】授权成功',function(){
                    						 windowDOM.close();
                    					 },'系统提示');
                    				 }else{
                    					 window.util.err('为角色【'+rec.get('rolename')+'】授权失败，请稍后再试',function(){
                    						 windowDOM.close();
                    					 },'系统提示');
                    				 }
                    			 }
                    	 };
                    	 window.util.ajax(ajax_cfg);
                     },iconCls:''},
                     {text:'取消',handler : function(){
                    	 this.up('window').close();
                     },iconCls:''}
             ]}                  
          ],
          r_tree_panel = {
	    	xtype : 'treepanel',
	    	rootVisible: false,
	    	listeners : {
	    		 "checkchange": function(node, state) {  
	    			 self_author.checkboxSelected(node, state);
                 },
                 render : function(this_, eOpts){
                 }
	    	},
	        dockedItems : r_tree_toolbar
	      },
	    winCfg = {
			icon : 'fa fa-pencil',
			width : 340,
			title : '为角色【'+rec.get('rolename')+'】授权'
    	};
	    ajax_cfg = {
	    		url : app.base + 'services/common/search/authorizationModular.json?roleCode='+rec.get('id'),
	    		ok : function(res){
	    			r_tree_panel.store = Ext.create('Ext.data.TreeStore', {
	    			    root: {
	    			        expanded: true,
	    			        children: res.list
	    			    }
	    			});
	    			var cfg = Ext.apply({
	    	            xtype: 'baseWin',
	    	            items: r_tree_panel
	    	        },winCfg);
	    	        Ext.create(cfg);
	    		}
	    };
	    window.util.ajax(ajax_cfg);
	},
	checkboxSelected  : function(node, checked) {
		var self = this;
		self.setChildChecked(node, checked);
		self.setParentChecked(node, checked);
	},
	// 选择子节点树
	setChildChecked : function(node, checked) {
		var self = this;
//		node.expand();
		node.set('checked', checked);
		if (node.hasChildNodes()) {
			node.eachChild(function(child) {
				self.setChildChecked(child, checked);
			});
		}
	},
	// 选择父节点树
	setParentChecked : function(node, checked) {
		var self = this;
		node.set({
			checked : checked
		});
		var parentNode = node.parentNode;
		if (parentNode != null) {
			var flag = false;
			parentNode.eachChild(function(childnode) {
				if (childnode.get('checked')) {
					flag = true;
				}
			});
			if (checked == false) {
				if (!flag) {
					self.setParentChecked(parentNode, checked);
				}
			} else {
				if (flag) {
					self.setParentChecked(parentNode, checked);
				}
			}
		}
	},
	onAuthorizationUser :function (grid, rowIndex, colIndex){
		var saveUserRole_self =this;
		var rec = grid.getStore().getAt(rowIndex);
	    var r_tree_toolbar = {
	    			xtype:'treepanel',
	    			useArrows: true,
	    		    rootVisible: false,//根节点是否可见
	    		    multiSelect: true,
                  store : Ext.create('Ext.data.TreeStore',{
		          		fields : [
		  		          {name:'id',mapping:'id'},
		  		          {name:'text',mapping:'deptname'},
		  		          'children',
		  		          'leaf'
				       ],
				       autoLoad : true,
				       rootVisible : true,
				       proxy: {
		          	      type: 'ajax',
		          	      url: window.constants.url.sys.dept.deptTree,
		          	      rootProperty : function(data){
		          	    	  return data;
		          	      }
		          	  	}
		          	}),
		          	listeners : {
		            	itemclick: function (record, node) {
		            			component = Ext.ComponentQuery.query('gridpanel[name=userRoleGrid]')[0];
		            			store = component.getStore();
		            			var params={id : node.data.id};
		            	    	store.proxy.extraParams = params;
		            	    	store.currentPage = 1;
		            	    	store.reload();
		            	}
		            }, 
	        	    columns: [{
	        	        xtype: 'treecolumn', //this is so we know which column will show the tree
	        	        text: '组织机构',
	        	        sortable: true,
	        	        dataIndex: 'deptname',
	        	        locked: false,
	        	        flex:0.7
	        	    }]
	        	  }                  
          ;
	    var usergrid=[{
	    	xtype:'gridpanel',
	    	name:'userRoleGrid',
	    	store : Ext.create('app.store.sys.User',{}),
	    	layout:'fit',
	    	selType: 'checkboxmodel',
	    	tbar:[{text:'保存',handler : 'saveAuthorUser',iconCls:'',handler:function(){
	    		var	component =  Ext.ComponentQuery.query('gridpanel[name=userRoleGrid]')[0],
	    			record =component.getSelection();
	    		saveUserRole_self.ajaxSaveRoleUser(record,rec.get('id'),rec);
	    	}},
                  {text:'取消',handler : function(){
                	  saveUserRole_self.authWindowClase(this.up('window'));
                  },iconCls:''}],
	    	columns: [
               Ext.create('Ext.grid.RowNumberer', {text:'序号',align : 'center',width : 50}),
              {text:'人员名称',dataIndex:'realname',flex:1,align:'center'}
            ]
	    }];
	    var winCfg = {
			icon : 'fa fa-pencil',
			width: 600,
            height: 600,
			title : '为角色【'+rec.get('rolename')+'】分配用户'
    	};
    	var cfg = Ext.apply({
            xtype: 'baseWin',
            name : 'roleUserWindow',
            items: Ext.create('Ext.panel.Panel',{
            	width: 600,
                height: 600,
                layout: 'border',
                items: [{
                    //title: '部门列表',
                    region:'west',
                    xtype: 'panel',
                    margin: '5 0 0 5',
                    width: 290,
                    split: true, 
                    id: 'west-region-container',
                    layout: 'fit',
                    items: r_tree_toolbar
                },{
                    //title: '人员信息',
                    region: 'center',     // center region is required, no width/height specified
                    xtype: 'panel',
                    layout: 'fit',
                    margin: '5 5 0 0',
                    items : usergrid
                }
                ],
                renderTo: Ext.getBody()
            })
        },winCfg);
        Ext.create(cfg);
	},
	ajaxSaveRoleUser : function(record,userId,rec){
		var self = this;
		var userCode  = '';
		Ext.each(record,function(items,index){
			userCode += items.data.id + ',';
		});
		var ajax_cfg ={
				url : app.base + 'services/userRole/userRoleInsert.json?usercode='+userCode+'&rolecode='+userId,
				ok : function(resp){
					if(resp.success){
						var win_dom = Ext.ComponentQuery.query('window[name=roleUserWindow]')[0];
						util.info('为角色【'+rec.get('rolename')+'】分配用户成功',function(){self.authWindowClase(win_dom);},"系统提示");
						userId = "";
					}else{
						window.util.err(resp.exceptionMessage);
					}
				}
		};
		window.util.ajax(ajax_cfg);
	},
	authWindowClase : function(win_dom){
		win_dom.close();
	}
});