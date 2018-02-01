/**
 *
 * <p> Title:Comment.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/modern/ux/)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.Comment',{
	extend : 'Ext.Toolbar',
	alternateClassName : 'commentToolbar',
	xtype : 'commentToolbar',
	requires : [
        'Ext.Toolbar'
    ],
    config : {
    	docked : 'bottom',
    	items : [{
    		xtype : 'textfield',
    		flex:1, 
    		clearIcon :false,
    		listeners : {
    			'focus':function(textfield, e, eOpts){
    				var toolbar = this.up();
    				toolbar.down('button[name=star]').hide();
    				toolbar.down('button[name=share]').hide();
    				toolbar.down('button[name=send]').show();
	    	    }
    		},
    		placeHolder : '发表评论'
    	},{
    		xtype : 'button',
    		name : 'star',
    		iconCls : 'fa fa-star-o',
    		handler : function(btn){
    			MbUtil.toast('收藏');
    		}
    	},{
    		xtype : 'button',
    		name : 'share',
    		iconCls : 'fa fa-share-alt',
    		handler : function(btn){
    			MbUtil.showPick('wys.picker.Share',{
    				
    			})
    		}
    	},{
    		xtype : 'button',
    		name : 'send',
    		hidden : true,
    		text : '发布',
    		handler : function(){
    			var toolbar = this.up();
    	    	toolbar.down('button[name=star]').show();
				toolbar.down('button[name=share]').show();
				toolbar.down('button[name=send]').hide();
				//这里去实现您的业务
				
    		}
    	}] 
    },
    constructor: function(config) {
    	this.callParent(config);
    	if(typeof config.event === 'function'){
	    	this.down('button[name=send]').on('tap',config.event);
    	}else{
    		console.log('this is not function');
    	}
    }
});