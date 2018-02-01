/**
 * 封装自己用的TextField
 */
Ext.define('wys.plugs.MyTextField',{
	extend: 'Ext.form.field.Display',// 'Ext.form.field.Text',
    alias: 'widget.myTextField',
//    readOnly : true,
    editable : false,
    fieldCls : 'x-form-field-my',
    initComponent: function() {
    	Ext.apply(this,{
    		border : false,
    		listeners : {
    			render : function(this_,e){
    				var value = this_.getValue();
    				if(Ext.isEmpty(value)){
    					this_.setValue('    &nbsp;');
    				}
    			},
    			change : function(this_,e){
    				var value = this_.getValue();
    				if(Ext.isEmpty(value)){
    					this_.setValue('&nbsp;&nbsp;');
    				}
    			}
    		},
    		inputWrapCls : 'x-form-field-my'
    	});
        this.callParent();
    }
});