/**
 * Window超级类
 */
Ext.define('wys.basic.BaseWin',{
	extend: 'Ext.window.Window',
    alias: 'widget.baseWin',
    autoShow: true,
    requires:[
      'Ext.window.Window'
    ],
    modal: true,
	maximizable:true,
    closeAction:'hide',
//    ui : 'windowmodifyForm',
	//minimizable:true,
    layout: 'fit',
    autoScroll : true,
    animCollapse : true,
    animateTarget : Ext.getBody(),
    border:true,
    isCenter : false, //是否居中，默认显示在窗体中心边缘
    style :'border-color: #b6babe;',
    closeToolText:'点击关闭窗口',
    afterRender: function () {
        var me = this;
        if(!me.isCenter){
        	me.x = Ext.ComponentQuery.query('container[name=leftMenu]')[0].getWidth() + 0;
            me.y = Ext.ComponentQuery.query('headerBar')[0].getHeight()+ 37;
            this.iconCls = me.iconCls || '';
        }
        me.callParent(arguments);
        if(!me.isCenter){
	        if(me.width & me.height){
	        }else if(me.width){
	        	me.syncSizeByHeight(me.mainWidth);
	        }else{
	        	me.syncSize();
	        }
	        Ext.on(me.resizeListeners = {
	            resize: me.onViewportResize,
	            scope: me,
	            buffer: 50
	        });
        }
    },
    onDestroy: function () {
        Ext.un(this.resizeListeners);
        this.callParent();
    },
    onViewportResize: function () {
        this.syncSize();
    },
    syncSize: function () {
    	var sync_self = this,
        	width = Ext.Element.getViewportWidth(),
            height = Ext.Element.getViewportHeight(),
        	x = sync_self.x,
        	y = sync_self.y,
	    	mainWidth = width - x,
	    	mainHeight = height - (y + 40);
    	sync_self.setSize(/*Math.floor(width * 0.9)*/mainWidth,mainHeight/*Math.floor(height * 0.9)*/);
    	sync_self.setXY([x, y ]);
    },
    syncSizeByHeight : function(width_){
    	var width = width_,me = this,
	        height = Ext.Element.getViewportHeight(),
        	x = me.x,
        	y = me.y;
    		me.setSize(me.mainWidth,me.mainHeight);
    		me.setXY([x,y]);
    }
});