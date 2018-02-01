/**
 *
 * <p> Title:ColorsField.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/form/field)</p>
 * <p> Description:  颜色选择器</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.ColorsField', {
	extend : 'Ext.form.field.Trigger',
	alias : 'widget.colorsField',
	requires : ['Ext.picker.Color'],
	triggerTip : '请选择一个颜色',
	onTriggerClick : function() {
		var me = this;
		if (!me.picker) {
			me.picker = Ext.create('Ext.picker.Color', {
				pickerField : this,
				ownerCt : this,
				renderTo : Ext.getBody(),
				floating : true,
				//hidden: true,    
				editable : false,
				focusOnShow : true,
				style : {
					backgroundColor : "#fff"
				},
				listeners : {
					scope : this,
					select : function(field, value, opts) {
						me.setValue('#' + value);
						me.inputEl.applyStyles({
							backgroundColor : '#' + value
						});
						me.picker.hide();
					}
				}
			});
			me.picker.alignTo(me.inputEl, 'tl-bl?');
		}
		me.picker.show();
		var attached = me.attached || false;
		me.lastShow = new Date();
		if (!attached) {
			Ext.getDoc().on('mousedown', me.onMouseDown, me, {
				buffer : Ext.isIE9m ? 10 : undefined
			});
			me.attached = true;
		}

	},
	onMouseDown : function(e) {
		var lastShow = this.lastShow, doHide = true;
		if (Ext.Date.getElapsed(lastShow) > 50
				&& !e.getTarget('#' + this.picker.id)) {
			if (Ext.isIE9m && !Ext.getDoc().contains(e.target)) {
				doHide = false;
			}
			if (doHide) {
				this.picker.hide();
				Ext.getDoc().un('mousedown', this.onMouseDown, this);
				this.attached = false;
			}
		}
	}
});