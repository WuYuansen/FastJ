/**
 *
 * <p> Title:Default.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/modern/overrides/viewport)</p>
 * <p> Description:  在输入框聚焦和界面resize的时候，都自动将被聚焦的输入框滚动到可见位置  </p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.modern.overrides.viewport.Default',{
	overrides : 'Ext.viewport.Default',
	//页面输入框获取到光标后
	onElementFocus : function(){
//		this.callParent(arguments);
		this.scrollFocusedFieldIntoView();
	},
	//滚动列表到可见位置
	scrollFocusedFieldIntoView: function() {  
        var me = this,  
            focusedDom = me.focusedElement,  
            fieldEl = focusedDom && Ext.fly(focusedDom).up('.x-field'),  
            fieldId = fieldEl && fieldEl.id,  
            fieldCmp = fieldId && Ext.getCmp(fieldId),  
            offsetTop = 0,  
            scrollingContainer, scroller, scrollerEl, domCursor, thresholdY, containerHeight;  
        //if (!fieldCmp || ((fieldCmp.isXType('richtextareafield') || fieldCmp.isXType('simpletextareafield')) && fieldCmp.element.hasCls('cmtbar-field'))) {  
        if (!fieldCmp) {  
            return;  
        }  
        scrollingContainer = fieldCmp.up('{getScrollable()}');  
        if (scrollingContainer) {  
            scroller = scrollingContainer.getScrollable();  
            scrollerEl = scroller.getElement();  
            domCursor = focusedDom;  
  
            while (domCursor && domCursor !== scrollerEl.dom) {  
                offsetTop += domCursor.offsetTop;  
                domCursor = domCursor.offsetParent;  
            }  
            containerHeight = scroller.getElement().getHeight();  
            thresholdY = offsetTop + Math.min(fieldEl.getHeight(), 40) + (me.config.fieldFocusPadding || 40);  
            // console.log('offsetTop=%o, containerHeight=%o, thresholdY=%o', offsetTop, containerHeight, thresholdY);  
            if (scroller.position.y + containerHeight < thresholdY) {  
                // console.log('scrolling to ', thresholdY - containerHeight);  
                scroller.scrollTo(0, thresholdY - containerHeight, true);  
            }  
        }  
    },
    //页面大小发生改变后
    onAppLaunch: function(){  
//        this.callParent(arguments);  
        Ext.Viewport.on('resize', 'scrollFocusedFieldIntoView');  
    }  
});