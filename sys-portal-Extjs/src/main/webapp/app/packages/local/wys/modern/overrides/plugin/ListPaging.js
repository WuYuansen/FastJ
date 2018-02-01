/**
 *
 * <p> Title:ListPaging.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/modern/overrides/plugin)</p>
 * <p> Description:  汉化加载更多插件,启用自动加载功能</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.modern.overrides.plugin.ListPaging',{
	override: "Ext.plugin.ListPaging",
    config: {
        //滚动到最底部时是否自动加载下一页数据
        noMoreRecordsText: '没有更多内容了',
        loadMoreText: '正在加载...' //加载更多按钮显示内容
    }
});