/***
 * 模块名称：基础支撑 <br/>
 * 类名称：动态GridPanel
 * 作者：wys
 * 创建时间：2015/12/22 13:04
 */
Ext.define('wys.basic.specialGridpanel',{
	extend : 'wys.basic.BaseView',
	xtype : 'specialGridPanel',
	alias: 'widget.specialGridPanel',
	requires : [ 
        'wys.basic.BaseView'
    ],
    url : new Array(),//数据请求地址数组 第一个为列头请求，第二个为数据请求
    params : {}, //数据请求参数
    listeners : {
    	afterrender : function(component, eOpts ){
    		var me = this;
    		var ajax_cfg = {
        			url : me.url[0],
        			params : me.params,
        			ok : function(data){
        				loadDateItem = data.list;
        				cmItems = [];
        			    cmItems.push({xtype:'rownumberer',text:'序号',align : 'center',width : 50,sortable: false});
        				Ext.Array.each(loadDateItem,function(item){
        					if(item.children===undefined || item.children.length == 0){
        						cmItems.push({text : item.text,flex : 1,dataIndex:item.dataIndex,menuDisabled:true,sortable: false});
        					}else{
        						itemsF = {text : item.text,menuDisabled:true,sortable: false};
        						var cmChildrenItems = [];
        						Ext.Array.each(item.children,function(children){cmChildrenItems.push({text : children.text,flex : 1,menuDisabled:true,sortable: false});});
        						itemsF.columns = cmChildrenItems;
        						cmItems.push(itemsF);
        					}
        				});
        				cmItems.push({text:'',align : 'center',width : 15,sortable: false,menuDisabled:true});
        				var store = Ext.create('Ext.data.Store',{//定义数据源
		    				fields : data.root,
		    	    		proxy: {
		    	    	         type: 'ajax',
		    	    	         url: me.url[1],
		    	    	         reader: {
		    	    	             type: 'json',
		    	    	             rootProperty: 'list'
		    	    	         }
		    	    	     },
		    	    	     autoLoad : true,
		    	    	     listeners : {
		    	    	    	 beforeload : function(store){
		    	    	    		 Ext.apply(store.proxy.extraParams,me.params);
		    	    	    		 store.currentPage = 1;
		    	    	    	 }
		    	    	     }
		    	    	});
        				//绘制表格
        				Ext.suspendLayouts();
        				component.reconfigure(store,cmItems);
        				store.load(function(records, operation, success) {
        					window.util.mergeCells(component,'row',"kinds",  '1px solid #9BCEDB');
        				});
        				Ext.resumeLayouts(true);
        			}
        	};
        	window.util.ajax(ajax_cfg);
    	}
    },
    initComponent: function () {
    	var init_self = this;
    	init_self.margin='0 0 0 0';
    	init_self.columnLines = false;//是否显示列分割线
    	init_self.viewConfig={
    	    stripeRows:true,//在表格中显示斑马线
    	    enableTextSelection:true //可以复制单元格文字
    	};
		this.callParent(arguments);
	}
});