/**
 *
 * <p> Title:Field.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/modern/overrides/field)</p>
 * <p> Description:  汉化</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.modern.overrides.field.Field',{
	override: "Ext.field.Field",
    config: {
        //提示信息
        requiredMessage: '此项为必填项',
        //错误提示位置
        errorTarget: 'under'
    }
});