/**
 *
 * <p> Title:RowEditing.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext/grid/plugin)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.grid.plugin.RowEditing',{
	override: "Ext.grid.plugin.RowEditing",
    saveBtnText:'保存',
    cancelBtnText:'取消',
    errorsText:'错误提示',
    dirtyText:'请先提交或取消操作'
});