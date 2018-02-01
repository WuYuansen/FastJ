/**
 *
 * <p> Title:FontField.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/form/field/date)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.FontField',{
	extend: 'Ext.form.field.Text',
	alias: 'widget.fontField',
	requires: [
       'Ext.form.trigger.Component'
    ],
    style : 'background-color: #fff;',
    width : '100%',
    emptyText:'12',
    triggers: {
        clear: {
            weight: 0,
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            hidden: true,
            handler: 'onClearClick',
            scope: 'this'
        },
        blod: {
            weight: 1,
            cls :  Ext.baseCSSPrefix + 'fa fa fa-bold',
            handler: 'fontBold',
            scope: 'this'
        }
        
    },
    /*
     * private 
     */
    initComponent: function () {
		var me = this;
	    me.callParent(arguments);
	},
    onClearClick : function(){
    	var me = this;
	        me.setValue('');
    },
    fontBold : function(){ //加粗
    	var me = this,
	        value = me.getValue();
    },
    fontItalic : function(){//斜体
    	
    },
    fontColor : function(){	//字体颜色
    	
    }
    
});