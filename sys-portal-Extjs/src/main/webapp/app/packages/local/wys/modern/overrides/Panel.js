/**
 *
 * <p> Title:Panel.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/modern/overrides)</p>
 * <p> Description:  重写Panel组件</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.modern.overrides.Panel',{
	override: 'Ext.Panel',
    config: {
        //默认不显示标题栏
        header: false
    }
});