/**
 *
 * <p> Title:LetterField.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/form/field)</p>
 * <p> Description:  字母输入框，只能输入字母</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.LetterField',{
	extend: 'Ext.form.field.Text',
	alias: 'widget.letterField',
	requires: [
       'Ext.form.trigger.Component',
       'wys.form.MyKeyBoard'
    ],
    emptyText:'请输入字母字符',
    enableKeyEvents :true,
    isUpCase : false,	//input text is it capitalized?
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
            cls :  Ext.baseCSSPrefix + 'fa fa-keyboard-o fa-lg',
            handler: 'onKeyBoardClick',
            scope: 'this'
        }
    },
    /*
     * private 
     */
    initComponent: function () {
		var me = this;
		Ext.apply(me,{
			listeners : {
				change:function(input, e, eOpts ){
					if(me.isUpCase){//大写
						input.setValue(input.getValue().toUpperCase());
					}else{	//小写
						input.setValue(input.getValue().toLowerCase());
					}
				} 
			}
		})
	    me.callParent(arguments);
	},
    /*
     * private
     * clear input value
     */
    onClearClick : function(){
    	var me = this;
	        me.setValue('');
    },
    /*private
     *show keyBoard
     */
    onKeyBoardClick : function(){
    	var me = this,
	        value = me.getValue();
    	Ext.create('wys.form.MyKeyBoard',{
    		renderTo : Ext.getBody(),
    		width : 328,
    		height : 138,
    		upperCase : me.isUpCase,
    		fieldWidget : this,
    		style : 'z-index:999999'
    	}).showAt(me.getXY());
    }
    
});