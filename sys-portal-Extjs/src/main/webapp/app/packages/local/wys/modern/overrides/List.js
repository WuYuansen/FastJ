/**
 *
 * <p> Title:List.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/modern/overrides)</p>
 * <p> Description:  重写列表组件</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.modern.overrides.List',{
	override: "Ext.List",
    config: {
        //禁用加载遮罩，防止跳转时页面卡顿，使用统一的遮罩效果
        loadingText: false,
        emptyText: '暂无记录',
        //刷新时滚动到顶部
        scrollToTopOnRefresh:false
    }
});