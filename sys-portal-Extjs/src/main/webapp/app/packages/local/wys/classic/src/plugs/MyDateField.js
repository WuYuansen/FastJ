/**
 * 封装自己用的TextField
 */
Ext.define('wys.plugs.MyDateField',{
	extend: 'Ext.form.field.Display',
    alias: 'widget.myDateField',
    editable : false,
    emptyText : '&nbsp;',
    fieldCls : 'x-form-field-my',
    initComponent: function() {
    	Ext.apply(this,{
    		border : false,
    		emptyText : '&nbsp;',
    		listeners : {
    			render : function(this_,e){
    				var value = this_.getValue();
    				this_.emptyText='&nbsp;';
    				if(Ext.isEmpty(value)===true){
    				}else{
    					this_.setValue(Ext.util.Format.date(new Date(value),'Y-m-d H:i')); // H:i
    				}
    			},
    			change : function(this_,e){
    				var value = this_.getValue();
    				this_.emptyText='&nbsp;';
    				if(Ext.isEmpty(value) === true){
    				}else{
    					this_.setValue(Ext.util.Format.date(new Date(value),'Y-m-d H:i')); // H:i
    				}
    			}
    		},
    		inputWrapCls : 'x-form-field-my'
    	});
        this.callParent();
    }
});