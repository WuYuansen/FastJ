/**
 *
 * <p> Title:Base.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext/form/field)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.Base',{
	 override: 'Ext.form.field.Base',
	 subTplInsertions: [
        'inputAttrTpl',
        'fieldPostfix',//在field后面加固定文字
        'fieldPrefix'//在field前面加固定文字
     ]
});