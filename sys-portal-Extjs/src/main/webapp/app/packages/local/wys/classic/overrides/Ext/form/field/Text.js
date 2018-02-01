/**
 *
 * <p> Title:Text.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext/form/field)</p>
 * <p> Description:  * 重写文本框使其遇到ReadOnly属性后将背景颜色调整成灰色
 * 适用于Extjs6.x +
 * @override Ext.form.field.Text</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.Text',{
	override : 'Ext.form.field.Text',
	listeners : {
		focus : function(textfield){
			textfield.setHideTrigger(false);
		},
		blur : function(textfield){
			textfield.setHideTrigger(true);
		},
		render : function(textfield){
			textfield.setHideTrigger(true);
		}
	},
	hideTrigger:true,
	triggerCls :'x-form-clear-trigger',
	onTriggerClick : function() {this.setValue('');},
    afterRender : Ext.Function.createSequence(Ext.form.field.Text.prototype.afterRender,function() {
            var input = this;
            if(this.readOnly===true){ //如果设置了只读属性
            	input.setFieldStyle({'cursor':'not-allowed'});
            }
            if(input.allowBlank === false){ //解决为加入*号必填内容
            	if(!input.afterLabelTextTpl){
            		input.afterLabelTextTpl=required;
            	}
            }
            if(input.xtype === 'ArrayCombobox' || input.xtype === 'combgrid' || input.xtype === 'RemoteCombobox' || input.xtype  === 'cityPicker' 
            	|| input.xtype === 'combobox' || input.xtype === 'datetimefield' || input.xtype === 'comboTree'
            ){
            	return;
            }
            //鼠标经过悬停提示
            if(input.tooltip){
            	try{
            		Ext.create('Ext.ToolTip',{  
	                    target : input.id,  
	                    trackMouse : false,  
	                    draggable : true,  
	                    maxWidth : 200,  
	                    minWidth : 100,  
	                    title : input.tooltip.title || '输入提示',  
	                    html : input.tooltip.text  || '请输入'+ input.fieldLabel
	                });
            	}catch(error){}
            }else{
            	try{
            		Ext.create('Ext.ToolTip',{  
	                    target : input.id,  
	                    trackMouse : false,  
	                    draggable : true,  
	                    maxWidth : 200,  
	                    minWidth : 100,  
	                    title : '输入提示',  
	                    html : '请输入' + (input.fieldLabel||input.emptyText.replace('请输入',''))
	                });
            	}catch(error){}
            }
        })
});