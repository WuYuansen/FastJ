/**
 *
 * <p> Title:ConTpl.js BY EXTJS V6.0 (src/main/newwebapp/modern/src/plugs/ux/plugins)</p>
 * <p> Description:  tpl模版加入按钮
 *<div class="x-button-normal x-button x-iconalign-center x-layout-box-item x-stretched btn" style="visibility:{visibility}" fire="TasteUp" ><span class="x-button-icon x-shown lower"></span></div>
 *fire="tasteUp" 表示添加tasteUp事件和激活dotasteUp方法
 *有两个参数cmp:视图本身以及doit
 *只要是以上格式的模板都可以被监控到
 *其中btn、shareIco为自定义样式，其他都是st自带样式</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.plugins.ConTpl',{
	alias: 'plugin.conTpl',
    xtype: 'conTpl',
    config: {
        cmp: null,
        //按下时添加css
        pressedCls: 'x-button-pressing',
        //监控对象选择器
        delegate: 'div.x-button'
    },
    constructor: function (config) {
        this.initConfig(config);
        this.callParent([config]);
    },
    //初始化
    init: function (cmp) {
        this.setCmp(cmp);
    },
    //更新配置
    updateCmp: function (newCmp, oldCmp) {
        if (newCmp) {
            newCmp.element.on({
                tap: 'onTap',
                touchstart: 'onPress',
                touchend: 'onRelease',
                delegate: this.getDelegate(),
                scope: this
            });
        }
    },
    //执行动作
    onTap: function (e) {
        var cmp = this.getCmp(),
        el = e.getTarget(this.getDelegate(), null, true),
        fire = el.getAttribute('fire'),
        action = 'do' + fire;
        cmp.fireAction(fire, [cmp, el], action);
    },
    //按钮按下时，添加css
    onPress: function (e, node) {
        var el = e.getTarget(this.getDelegate(), null, true);
        el.addCls(this.getPressedCls());
    },
    //松开按钮时，移除css
    onRelease: function (e, node) {
        var el = e.getTarget(this.getDelegate(), null, true);
        el.removeCls(this.getPressedCls());
    }
});