/**
 *
 * <p> Title:Picker.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/modern/overrides/picker)</p>
 * <p> Description:  汉化Picker</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.modern.overrides.picker.Picker',{
	override: "Ext.picker.Picker",
    applyDoneButton: function (config, oldButton) {
        if (config) {
            if (config === true) {
                config = {};
            }

            if (typeof config == "string") {
                config = {
                    text: config
                };
            }

            Ext.applyIf(config, {
                align: 'right',
                text: '确定'
            });
        }

        return Ext.factory(config, 'Ext.Button', oldButton);
    },
    applyCancelButton: function (config, oldButton) {
        if (config) {
            if (Ext.isBoolean(config)) {
                config = {};
            }

            if (typeof config == "string") {
                config = {
                    text: config
                };
            }

            Ext.applyIf(config, {
                align: 'left',
                text: '取消'
            });
        }

        return Ext.factory(config, 'Ext.Button', oldButton);
    }
});