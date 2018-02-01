/**
 *
 * <p> Title:FieldContainer.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext/form)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.FieldContainer',{
	override: "Ext.form.FieldContainer",
    initRenderData: function () {
        var data = this.callParent();
        data.containerElCls = this.containerElCls;
        return data;
    },
    setFieldLabel: function (label) {
        label = label || '';

        var me = this,
            separator = me.labelSeparator,
            labelEl = me.labelEl,
            errorWrapEl = me.errorWrapEl,
            sideLabel = (me.labelAlign !== 'top'),
            noLabelCls = me.noLabelCls,
            errorWrapUnderSideLabelCls = me.errorWrapUnderSideLabelCls;

        me.fieldLabel = label;
        if (me.rendered) {
            if (Ext.isEmpty(label) && me.hideEmptyLabel) {
                me.addCls(noLabelCls);
                if (sideLabel && errorWrapEl) {
                    errorWrapEl.removeCls(errorWrapUnderSideLabelCls);
                }
            } else {
                if (separator) {
                    label = me.trimLabelSeparator() + separator;
                }
                //修复重新设置 fieldLabel 时 afterLabelTextTpl 没有生效的问题
                if (me.afterLabelTextTpl) {
                    labelEl.dom.firstChild.innerHTML = label + me.afterLabelTextTpl;
                } else {
                    labelEl.dom.firstChild.innerHTML = label;
                }
                me.removeCls(noLabelCls);
                if (sideLabel && errorWrapEl) {
                    errorWrapEl.addCls(errorWrapUnderSideLabelCls);
                }
            }
            me.updateLayout();
        }
    },
    setToolTip: function (tipText, cls, isShow) {
        tipText = tipText || '';
        cls = cls || "my-tooltip";
        var me = this;
        var tips = me.getElementsByCls(cls);
        if (tips.length) {
            Ext.each(tips, function (item) {
                item.setAttribute("data-qtip", tipText);
                if (isShow) {
                    item.style.display = "inline-block";
                }
            });
        } else {
            me.showToolTip(tipText, cls);
        }
    },
    showToolTip: function (tipText, cls) {
        var me = this;
        tipText = tipText || '';
        cls = cls || "my-tooltip";
        var tips = me.getElementsByCls(cls);
        if (tips.length) {
            Ext.each(tips, function (item) {
                item.style.display = "inline-block";
            });
        } else {
            var labels = me.getElementsByCls('x-form-item-label-inner');
            var dataTip = '<span data-qtip="' + tipText + '" style="color:red;cursor: pointer;padding-left:10px;-webkit-transform: scale(1.5);transform: scale(1.5);" class="fa fa-question-circle my-tooltip"></span>';
            Ext.each(labels, function (item) {
                if (item.parentElement.parentElement.id.indexOf('fieldcontainer-') > -1) {
                    item.innerHTML += dataTip;
                }
            });
        }
    },
    getElementsByCls: function (cls) {
        var me = this;
        var ele = [];
        if (!me.el || !me.el.dom) {
            return ele;
        }
        if (me.el.dom.getElementsByClassName) {
            ele = me.el.dom.getElementsByClassName(cls);
        } else if (me.el.dom.querySelector) {
            ele = me.el.dom.querySelectorAll('.' + cls);
        } else {
            var eleList = ssbasemsg.el.dom.getElementsByTagName("*");
            var clsReg = new RegExp('(^' + cls + '$)|(^' + cls + '\\s)|(\\s' + cls + '\\s)|(\\s' + cls + '$)');
            Ext.each(eleList, function (item) {
                if (clsReg.test(item.className)) {
                    ele.push(item);
                }
            });
        }
        return ele;
    }
});