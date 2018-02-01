/**
 *
 * <p> Title:RowExpander.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext/grid/plugin)</p>
 * <p> Description:  重写RowExpander组件使其具有collapsebody expandbody事件最后附加到grid上使其具有处理的能力 </p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.grid.plugin.RowExpander',{
	override : 'Ext.grid.plugin.RowExpander',
	init: function(grid) {
	    this.callParent(arguments);
	    this.grid=grid;
	    this.grid.fireEvent('collapsebody', 'expandbody');
	},
	toggleRow: function(rowIdx, record) {
	    var me = this,
	        view = me.view,
	        rowNode = view.getNode(rowIdx),
	        row = Ext.fly(rowNode, '_rowExpander'),
	        nextBd = row.down(me.rowBodyTrSelector, true),
	        isCollapsed = row.hasCls(me.rowCollapsedCls),
	        addOrRemoveCls = isCollapsed ? 'removeCls' : 'addCls',
	            ownerLock, rowHeight, fireView;
	        Ext.suspendLayouts();
	        row[addOrRemoveCls](me.rowCollapsedCls);
	        if(!Ext.isEmpty(Ext.fly(nextBd))){
	        	Ext.fly(nextBd)[addOrRemoveCls](me.rowBodyHiddenCls);
	        }
	        me.recordsExpanded[record.internalId] = isCollapsed;
	        view.refreshSize();
	    if (me.grid.ownerLockable) {
	        ownerLock = me.grid.ownerLockable;
	        view = ownerLock.lockedGrid.view;
	        fireView=ownerLock.lockedGrid.view;
	        rowHeight = row.getHeight();
	        row.setHeight(isCollapsed ? rowHeight : '');
	        row = Ext.fly(view.getNode(rowIdx), '_rowExpander');
	        row.setHeight(isCollapsed ? rowHeight : '');
	        row[addOrRemoveCls](me.rowCollapsedCls);
	        view.refreshSize();
	    } else {
	        fireView = view;
	    }
	    this.grid.fireEvent(isCollapsed ? 'expandbody' : 'collapsebody', Ext.isEmpty(row.dom)?row:row.dom, record, nextBd);
	        Ext.resumeLayouts(true);
    }
});