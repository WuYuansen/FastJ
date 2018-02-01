/**
 *
 * <p> Title:SeniorQuery.js BY EXTJS V6.0 (src/main/newwebapp/classic/src/view)</p>
 * <p> Description:  系统高级查询组件</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.basic.SeniorQuery',{
	extend : 'Ext.menu.Menu',
	xtype : 'seniorQuery',
	width : 350,	//查询框宽度，默认 350
	searchFields : [],	//查询字段
	usePageFuncScope : null, //使用页面的作用域-如this
	userPageFuncStore : null,			//使用页面的数据集
	initComponent: function () {
    	var init_self = this;
    	if(init_self.usePageFuncScope === null || init_self.usePageFuncScope === undefined){
    		util.err('高级查询组件初始化异常，缺少【usePageFuncScope】参数');
    	}else if(init_self.usePageFuncScope === null || init_self.usePageFuncScope === undefined){
    		util.err('高级查询组件初始化异常，缺少【userPageFuncStore】参数');
    	}else{
	    	Ext.apply(init_self,{
	    		width : init_self.width,
	    		margin: '0 0 10 0',
	    	    items: [{
	    	    	title : '高级检索',
	    	    	tools : [
	    	         {
	    	        	 type : 'close',
	    	        	 tooltip : '点击关闭',
	    	        	 handler : function(){
	    	        		 this.up('menu').close();
	    	        	 }}
	    	        ],
	    	    	iconCls : 'fa fa-search fa-lg',
	    	        xtype : 'form',
	    	        width : 350,
					defaults: {
					    anchor: '100%',
					    labelWidth: 100,
	    	            labelSeparator: '：',
	    	            labelAlign: 'right',
	    	            margin : 5
					},
					defaultType: 'textfield',
					items: init_self.searchFields,
					buttons: [{
				        text: '重置查询',
				        ui : 'button-commonToolbarBtn-toolbar',
				        iconCls : 'fa fa-share fa-fw',
				        handler: function() {
				            this.up('form').getForm().reset();
				        }
				    }, {
				        text: '查询',
				        xtype : 'searchBtn',
				        formBind: true,
				        disabled: true,
				        handler: function() {
				            var form = this.up('form').getForm();
				            if (form.isValid()) {
				            	store.proxy.extraParams = form.getValues();
				                store.currentPage = 1;
				            	store.load();
				            }
				        }
				    }]
	    	    }]
	    	});
    	}
    	init_self.callParent(arguments);
	}
});