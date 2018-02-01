/**
 *
 * <p> Title:MessageBox.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext/window)</p>
 * <p> Description:  修改确认提示的否的按钮样式</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.Window.MessageBox',{
	override: 'Ext.window.MessageBox',
	init : function(win){
//		this.callParent();
		this.win = win; 
		this.win.buttonText={
			ok			: WY.local.lang.common.okButtonText,
            yes			: WY.local.lang.common.yesButtonText,
            no			: WY.local.lang.common.cancelButtonText,
            cancel		: WY.local.lang.common.noButtonText
		}
	},
    confirm: function(cfg, message, fn, scope) {
        //修改'buttonText=否'的按钮的UI
         this.msgButtons[2].setUI("button-alternative-toolbar");
        if (Ext.isString(cfg)) {
            cfg = {
                title: cfg,
                icon: this.QUESTION,
                message: message,
                buttons: this.YESNO,
                callback: fn,
                scope: scope
            };
        }
        return this.show(cfg);
    }
});