/**
 * 系统扩展Extjs对Iframe支持
 */
Ext.define('wys.plugs.Frame',{
	extend: 'Ext.Component',
    alias: 'widget.iframe',
    loadMask: '页面正在加载中...',
    src: 'about:blank',
    renderTpl: [
        '<iframe src="{src}" id="{id}-iframeEl" data-ref="iframeEl" name="{frameName}" width="100%" height="100%" frameborder="0"></iframe>'
    ],
    childEls: ['iframeEl'],
    initComponent: function () {
        this.callParent();
        this.frameName = this.frameName || this.id + '-frame';
    },
    initEvents : function() {
        var me = this;
        me.callParent();
        me.iframeEl.on('load', me.onLoad, me);
    },
    initRenderData: function() {
        return Ext.apply(this.callParent(), {
            src: this.src,
            frameName: this.frameName
        });
    },
    getBody: function() {
        var doc = this.getDoc();
        return doc.body || doc.documentElement;
    },
    getDoc: function() {
        try {
            return this.getWin().document;
        } catch (ex) {
            return null;
        }
    },
    getWin: function() {
        var me = this,
            name = me.frameName,
            win = Ext.isIE
                ? me.iframeEl.dom.contentWindow
                : window.frames[name];
        return win;
    },
    getFrame: function() {
        var me = this;
        return me.iframeEl.dom;
    },
    beforeDestroy: function () {
        this.cleanupListeners(true);
        this.callParent();
    },
    cleanupListeners: function(destroying){
        var doc, prop;
        if (this.rendered) {
            try {
                doc = this.getDoc();
                if (doc) {
                    Ext.get(doc).un(this._docListeners);
                    if (destroying) {
                        for (prop in doc) {
                            if (doc.hasOwnProperty && doc.hasOwnProperty(prop)) {
                                delete doc[prop];
                            }
                        }
                    }
                }
            } catch(e) { }
        }
    },
    onLoad: function() {
        var me = this,
            doc = me.getDoc(),
            fn = me.onRelayedEvent;
        if (doc) {
            try {
                Ext.get(doc).on(
                    me._docListeners = {
                        mousedown: fn,
                        mousemove: fn,
                        mouseup: fn,
                        click: fn,
                        dblclick: fn,
                        scope: me
                    }
                );
            } catch(e) {
            }
            Ext.get(this.getWin()).on('beforeunload', me.cleanupListeners, me);
            this.el.unmask();
            this.fireEvent('load', this);
        } else if (me.src) {
            this.el.unmask();
            this.fireEvent('error', this);
        }
    },
    onRelayedEvent: function (event) {
        var iframeEl = this.iframeEl,
            iframeXY = iframeEl.getTrueXY(),
            originalEventXY = event.getXY(),
            eventXY = event.getTrueXY();
        event.xy = [iframeXY[0] + eventXY[0], iframeXY[1] + eventXY[1]];
        event.injectEvent(iframeEl);
        event.xy = originalEventXY;
    },
    load: function (src) {
        var me = this,
            text = me.loadMask,
            frame = me.getFrame();
        if (me.fireEvent('beforeload', me, src) !== false) {
            if (text && me.el) {
                me.el.mask(text);
            }
            frame.src = me.src = (src || me.src);
        }
    }
});