/**
 *
 * <p> Title:MessageBox.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/modern/overrides)</p>
 * <p> Description:  重写MessageBox控件使其中文化</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.modern.overrides.MessageBox',{
	override: "Ext.MessageBox",
    statics: {
        OK: {
            text: '确定',
            itemId: 'ok'
        },
        YES: {
            text: '是',
            itemId: 'yes'
        },
        NO: {
            text: '否',
            ui  : 'confirm',
            itemId: 'no'
        },
        CANCEL: {
            text: '取消',
            ui  : 'confirm',
            itemId: 'cancel'
        },
        OKCANCEL: [{
            text: '确定',
            itemId: 'ok'
        },
        {
            text: '取消',
            ui  : 'confirm',
            itemId: 'cancel'
        }],
        YESNOCANCEL: [{
            text: '是',
            itemId: 'yes'
        },
        {
            text: '否',
            ui  : 'confirm',
            itemId: 'no'
        },
        {
            text: '取消',
            itemId: 'cancel'
        }],
        YESNO: [{
            text: '是',
            itemId: 'yes'
        },
        {
            text: '否',
            ui  : 'confirm',
            itemId: 'no'
        }]
    }
});