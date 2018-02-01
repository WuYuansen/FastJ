/**
 *
 * <p> Title:specialName.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/form/field)</p>
 * <p> Description:  解决用户少数名族名字的编写上出现问题</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.SpecialName',{
	extend: 'Ext.form.field.Text',
	alias: 'widget.specialNameField',
	requires: [
       'Ext.form.trigger.Component'
    ],
    emptyText:'请输入您的名称',
    vtype : 'checkName',
    triggers: {
        clear: {
            weight: 0,
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            hidden: true,
            handler: 'onClearClick',
            scope: 'this'
        },
        search: {
            weight: 1,
            cls :  'fa fa-dot-circle-o fa-lg',
            handler: 'onDotClick',
            scope: 'this'
        }
    },
    hasSearch : false,
    paramName : 'query',
	initComponent: function () {
		var me = this;
	    me.callParent(arguments);
	},
	onClearClick : function(){ /* 清除点 */
		var me = this;
	        me.setValue('');
        me.getTrigger('clear').hide();
	},
	onDotClick : function(){	/* 加入点 */
		var me = this,
        value = me.getValue();
		me.setValue(value + '·');
		me.getTrigger('clear').show();
	}
});