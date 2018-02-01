/**
 *
 * <p> Title:PullRefresh.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/modern/overrides/plugin)</p>
 * <p> Description:  汉化下拉刷新</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.modern.overrides.plugin.PullRefresh',{
	override : 'Ext.plugin.PullRefresh',
	config : {
		pullText : '下拉刷新',
		loadingText: '加载中...',
		loadedText : '加载完成',
		releaseText : '松开刷新',
		lastUpdatedText : '最后更新时间:&nbsp;',
		lastUpdatedDateFormat: 'Y年m月d日 h:iA'
	}
});