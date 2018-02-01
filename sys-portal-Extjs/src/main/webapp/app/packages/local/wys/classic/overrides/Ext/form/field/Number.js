/**
 *
 * <p> Title:Number.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext/form/field)</p>
 * <p> Description:  * 重写数字输入框，避免数值太大系统自动转换为科学计数法
 * 适用于Extjs6.x +
 * @override Ext.field.Number </p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.Number',{
	override:'Ext.form.field.Number',
	negativeText:'输入的值不合法',
	afterRender : Ext.Function.createSequence(Ext.form.Number.prototype.afterRender,function(){
		var input = this;
		input.maxValue = input.maxValue || 9999999999;
		if(!input.emptyText){
			input.emptyText = '0.00';
		}
	})
});