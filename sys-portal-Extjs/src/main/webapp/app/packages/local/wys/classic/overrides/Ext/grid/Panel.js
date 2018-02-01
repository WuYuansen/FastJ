/**
 *
 * <p> Title:Panel.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext/grid)</p>
 * <p> Description:  每一个列都会出现鼠标悬浮上去显示内容
 * 适用于Extjs6.x +
 * @override Ext.grid.Panel 
 * GridPanel单元格不能选中复制问题 
 * 单元格数据显示不完整 ,增加title 浮动提示信息 </p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.grid.Panel',{
	override : 'Ext.grid.Panel',
	afterRender : Ext.Function.createSequence(Ext.grid.GridPanel.prototype.afterRender,function() {
        var view = this.getView();
        this.tip = new Ext.ToolTip({
            target: view.el,
            delegate : '.x-grid-cell-inner',
            trackMouse: true, 
            renderTo: Ext.getBody(),
            listeners: {  
                beforeshow: function updateTipBody(tip) {
                    var tipText = (tip.triggerElement.innerText || tip.triggerElement.textContent);
                    if(Ext.isIE8){
                    	tip.update(tipText);
                    	return;
                    }
                    if (Ext.isEmpty(tipText) || Ext.isEmpty(window.util.trim(tipText)) ) {
                        return false;
                    }
                    tip.update(tipText);
                }
            }
        });
    })
});