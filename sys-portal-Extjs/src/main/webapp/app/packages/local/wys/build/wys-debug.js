Ext.define('Ext.theme.neptune.Component', {
    override: 'Ext.Component',
    initComponent: function() {
        this.callParent();
        if (this.dock && this.border === undefined) {
            this.border = false;
        }
    },
    privates: {
        initStyles: function() {
            var me = this,
                hasOwnBorder = me.hasOwnProperty('border'),
                border = me.border;
            if (me.dock) {
                // prevent the superclass method from setting the border style.  We want to
                // allow dock layout to decide which borders to suppress.
                me.border = null;
            }
            me.callParent(arguments);
            if (hasOwnBorder) {
                me.border = border;
            } else {
                delete me.border;
            }
        }
    }
}, function() {
    Ext.namespace('Ext.theme.is').Neptune = true;
    Ext.theme.name = 'Neptune';
});

Ext.define('Ext.theme.crisp.Component', {
    override: 'Ext.Component'
}, function() {
    Ext.namespace('Ext.theme.is').Crisp = true;
    Ext.theme.name = 'Crisp';
});

/**
 *
 * <p> Title:LoadMask.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.LoadMask', {
    override: 'Ext.LoadMask',
    renderTpl: [
        '<div id="{id}-msgWrapEl" data-ref="msgWrapEl" class="my_preloader my_spinner">',
        '\t\t<div class="my_spinWrap" id="{id}-msgEl" data-ref="msgEl">',
        '\t\t<p class="my_spinnerImage"></p>',
        '\t\t<p class="my_loader"></p>',
        '\t\t<p class="my_loadingMessage" data-ref="msgTextEl" id="{id}-msgTextEl">{msg}</p>',
        '\t\t<p class="my_loadingSubHeading" id="spinnerSubHeading"></p>',
        '\t</div>',
        '</div>'
    ]
});

Ext.define('Ext.theme.neptune.resizer.Splitter', {
    override: 'Ext.resizer.Splitter',
    size: 8
});

Ext.define('Ext.theme.neptune.toolbar.Toolbar', {
    override: 'Ext.toolbar.Toolbar',
    usePlainButtons: false,
    border: false
});

Ext.define('Ext.theme.neptune.layout.component.Dock', {
    override: 'Ext.layout.component.Dock',
    /**
     * This table contains the border removal classes indexed by the sum of the edges to
     * remove. Each edge is assigned a value:
     * 
     *  * `left` = 1
     *  * `bottom` = 2
     *  * `right` = 4
     *  * `top` = 8
     * 
     * @private
     */
    noBorderClassTable: [
        0,
        // TRBL
        Ext.baseCSSPrefix + 'noborder-l',
        // 0001 = 1
        Ext.baseCSSPrefix + 'noborder-b',
        // 0010 = 2
        Ext.baseCSSPrefix + 'noborder-bl',
        // 0011 = 3
        Ext.baseCSSPrefix + 'noborder-r',
        // 0100 = 4
        Ext.baseCSSPrefix + 'noborder-rl',
        // 0101 = 5
        Ext.baseCSSPrefix + 'noborder-rb',
        // 0110 = 6
        Ext.baseCSSPrefix + 'noborder-rbl',
        // 0111 = 7
        Ext.baseCSSPrefix + 'noborder-t',
        // 1000 = 8
        Ext.baseCSSPrefix + 'noborder-tl',
        // 1001 = 9
        Ext.baseCSSPrefix + 'noborder-tb',
        // 1010 = 10
        Ext.baseCSSPrefix + 'noborder-tbl',
        // 1011 = 11
        Ext.baseCSSPrefix + 'noborder-tr',
        // 1100 = 12
        Ext.baseCSSPrefix + 'noborder-trl',
        // 1101 = 13
        Ext.baseCSSPrefix + 'noborder-trb',
        // 1110 = 14
        Ext.baseCSSPrefix + 'noborder-trbl'
    ],
    // 1111 = 15
    /**
     * The numeric values assigned to each edge indexed by the `dock` config value.
     * @private
     */
    edgeMasks: {
        top: 8,
        right: 4,
        bottom: 2,
        left: 1
    },
    handleItemBorders: function() {
        var me = this,
            edges = 0,
            maskT = 8,
            maskR = 4,
            maskB = 2,
            maskL = 1,
            owner = me.owner,
            bodyBorder = owner.bodyBorder,
            ownerBorder = owner.border,
            collapsed = me.collapsed,
            edgeMasks = me.edgeMasks,
            noBorderCls = me.noBorderClassTable,
            dockedItemsGen = owner.dockedItems.generation,
            b, borderCls, docked, edgesTouched, i, ln, item, dock, lastValue, mask, addCls, removeCls;
        if (me.initializedBorders === dockedItemsGen) {
            return;
        }
        addCls = [];
        removeCls = [];
        borderCls = me.getBorderCollapseTable();
        noBorderCls = me.getBorderClassTable ? me.getBorderClassTable() : noBorderCls;
        me.initializedBorders = dockedItemsGen;
        // Borders have to be calculated using expanded docked item collection.
        me.collapsed = false;
        docked = me.getDockedItems('visual');
        me.collapsed = collapsed;
        for (i = 0 , ln = docked.length; i < ln; i++) {
            item = docked[i];
            if (item.ignoreBorderManagement) {
                // headers in framed panels ignore border management, so we do not want
                // to set "satisfied" on the edge in question
                
                continue;
            }
            dock = item.dock;
            mask = edgesTouched = 0;
            addCls.length = 0;
            removeCls.length = 0;
            if (dock !== 'bottom') {
                if (edges & maskT) {
                    // if (not touching the top edge)
                    b = item.border;
                } else {
                    b = ownerBorder;
                    if (b !== false) {
                        edgesTouched += maskT;
                    }
                }
                if (b === false) {
                    mask += maskT;
                }
            }
            if (dock !== 'left') {
                if (edges & maskR) {
                    // if (not touching the right edge)
                    b = item.border;
                } else {
                    b = ownerBorder;
                    if (b !== false) {
                        edgesTouched += maskR;
                    }
                }
                if (b === false) {
                    mask += maskR;
                }
            }
            if (dock !== 'top') {
                if (edges & maskB) {
                    // if (not touching the bottom edge)
                    b = item.border;
                } else {
                    b = ownerBorder;
                    if (b !== false) {
                        edgesTouched += maskB;
                    }
                }
                if (b === false) {
                    mask += maskB;
                }
            }
            if (dock !== 'right') {
                if (edges & maskL) {
                    // if (not touching the left edge)
                    b = item.border;
                } else {
                    b = ownerBorder;
                    if (b !== false) {
                        edgesTouched += maskL;
                    }
                }
                if (b === false) {
                    mask += maskL;
                }
            }
            if ((lastValue = item.lastBorderMask) !== mask) {
                item.lastBorderMask = mask;
                if (lastValue) {
                    removeCls[0] = noBorderCls[lastValue];
                }
                if (mask) {
                    addCls[0] = noBorderCls[mask];
                }
            }
            if ((lastValue = item.lastBorderCollapse) !== edgesTouched) {
                item.lastBorderCollapse = edgesTouched;
                if (lastValue) {
                    removeCls[removeCls.length] = borderCls[lastValue];
                }
                if (edgesTouched) {
                    addCls[addCls.length] = borderCls[edgesTouched];
                }
            }
            if (removeCls.length) {
                item.removeCls(removeCls);
            }
            if (addCls.length) {
                item.addCls(addCls);
            }
            // mask can use += but edges must use |= because there can be multiple items
            // on an edge but the mask is reset per item
            edges |= edgeMasks[dock];
        }
        // = T, R, B or L (8, 4, 2 or 1)
        mask = edgesTouched = 0;
        addCls.length = 0;
        removeCls.length = 0;
        if (edges & maskT) {
            // if (not touching the top edge)
            b = bodyBorder;
        } else {
            b = ownerBorder;
            if (b !== false) {
                edgesTouched += maskT;
            }
        }
        if (b === false) {
            mask += maskT;
        }
        if (edges & maskR) {
            // if (not touching the right edge)
            b = bodyBorder;
        } else {
            b = ownerBorder;
            if (b !== false) {
                edgesTouched += maskR;
            }
        }
        if (b === false) {
            mask += maskR;
        }
        if (edges & maskB) {
            // if (not touching the bottom edge)
            b = bodyBorder;
        } else {
            b = ownerBorder;
            if (b !== false) {
                edgesTouched += maskB;
            }
        }
        if (b === false) {
            mask += maskB;
        }
        if (edges & maskL) {
            // if (not touching the left edge)
            b = bodyBorder;
        } else {
            b = ownerBorder;
            if (b !== false) {
                edgesTouched += maskL;
            }
        }
        if (b === false) {
            mask += maskL;
        }
        if ((lastValue = me.lastBodyBorderMask) !== mask) {
            me.lastBodyBorderMask = mask;
            if (lastValue) {
                removeCls[0] = noBorderCls[lastValue];
            }
            if (mask) {
                addCls[0] = noBorderCls[mask];
            }
        }
        if ((lastValue = me.lastBodyBorderCollapse) !== edgesTouched) {
            me.lastBodyBorderCollapse = edgesTouched;
            if (lastValue) {
                removeCls[removeCls.length] = borderCls[lastValue];
            }
            if (edgesTouched) {
                addCls[addCls.length] = borderCls[edgesTouched];
            }
        }
        if (removeCls.length) {
            owner.removeBodyCls(removeCls);
        }
        if (addCls.length) {
            owner.addBodyCls(addCls);
        }
    },
    onRemove: function(item) {
        var me = this,
            lastBorderMask = item.lastBorderMask,
            lastBorderCollapse = item.lastBorderCollapse;
        if (!item.destroyed && !item.ignoreBorderManagement) {
            if (lastBorderMask) {
                item.lastBorderMask = 0;
                item.removeCls(me.noBorderClassTable[lastBorderMask]);
            }
            if (lastBorderCollapse) {
                item.lastBorderCollapse = 0;
                item.removeCls(me.getBorderCollapseTable()[lastBorderCollapse]);
            }
        }
        me.callParent([
            item
        ]);
    }
});

Ext.define('Ext.theme.neptune.panel.Panel', {
    override: 'Ext.panel.Panel',
    border: false,
    bodyBorder: false,
    initBorderProps: Ext.emptyFn,
    initBodyBorder: function() {
        // The superclass method converts a truthy bodyBorder into a number and sets
        // an inline border-width style on the body element.  This prevents that from
        // happening if borderBody === true so that the body will get its border-width
        // the stylesheet.
        if (this.bodyBorder !== true) {
            this.callParent();
        }
    }
});

/**
 *
 * <p> Title:Panel.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext/panel)</p>
 * <p> Description:  中文化panel</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.panel.Panel', {
    override: 'Ext.panel.Panel',
    closeToolText: '关闭面板',
    collapseToolText: '折叠面板'
});

Ext.define('Ext.theme.neptune.container.ButtonGroup', {
    override: 'Ext.container.ButtonGroup',
    usePlainButtons: false
});

/**
 *
 * <p> Title:Base.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext/form/field)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.Base', {
    override: 'Ext.form.field.Base',
    subTplInsertions: [
        'inputAttrTpl',
        'fieldPostfix',
        //在field后面加固定文字
        'fieldPrefix'
    ]
});
//在field前面加固定文字

/**
 * 
 * <p>
 * Title:VTypes EXTJS MODEL
 * </p>
 * <p>
 * Description: 系统输入校验规则定义
 * </p>
 * <p>
 * Copyright: Copyright (c) 2017
 * </p>
 * <p>
 * Company:乌鲁木齐光通嘉业网络服务有限公司
 * </p>
 * <p>
 * 匹配险金明细比例 基数上限下限对比 验证邮箱 验证企业账号 验证执照号码 验证服务人数 验证经营地址或注册地址 验证网址，www开头 验证手机号码
 * 验证传真号码 验证合作伙伴名称 验证人名
 * </p>
 * 
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.VTypes', {
    override: 'Ext.form.field.VTypes',
    /**
	 * 匹配险金明细比例
	 */
    rate: function(value, object) {
        var max = object.max,
            min = object.min,
            value = Number(value);
        if (value + '' != "NaN") {
            if (value >= min && value <= max) {
                object.vtypeText = "输入值范围为" + min + "到" + max;
                return true;
            }
        } else {
            object.vtypeText = "只能输入>=0的数值";
        }
    },
    /**
	 * 上限下限对比，上限可以等于下限
	 */
    compareMaxMin: function(value, object) {
        var maxObj = object.maxObj,
            minObj = object.minObj,
            value = Number(object.getValue());
        // 因为combo机制，value无法直接取到值，所以从object取值
        if (value + '' != "NaN") {
            if (minObj) {
                // 如果当前是上限的对象
                var minObjValue = Number(object.up("[viewModel]").down("[tag=" + minObj + "]").getValue());
                if (value >= minObjValue) {
                    return true;
                } else {
                    object.vtypeText = "请输入比" + minObjValue + "大的数值";
                    return false;
                }
            } else if (maxObj) {
                // 如果当前是下限的对象
                var maxObjValue = Number(object.up("[viewModel]").down("[tag=" + maxObj + "]").getValue());
                if (value <= maxObjValue || maxObjValue == "") {
                    return true;
                } else {
                    object.vtypeText = "请输入比" + maxObjValue + "小的数值";
                    return false;
                }
            }
        } else {
            object.vtypeText = "只能输入>=0的数值";
        }
    },
    /**
	 * 上限下限对比，对比逻辑依赖于其它因素 compareGroup:进行对比的组，考虑到同一个页面可能有多个带有依赖项的对比组，所以通过此参数进行区分
	 * dependent:在对比组中，需要依赖的项
	 */
    compareDependentMaxMin: function(objValue, object) {
        var maxObj, minObj, dependentObj,
            compareGroupName = object.compareGroup,
            compareGroup = Ext.ComponentQuery.query("[compareGroup=" + compareGroupName + "]"),
            value = Number(object.getValue());
        // 因为combo机制，value无法直接取到值，所以从object取值
        // 循环所有属于同组的控件，根据dependent筛选出需要依赖的项
        Ext.each(compareGroup, function(item, index, self) {
            if (item.dependent != undefined) {
                dependentObj = item;
            }
        });
        // 循环所有属于同组的控件，根据dependent的值决定maxObj和minObj对应的项
        Ext.each(compareGroup, function(item, index, self) {
            var depObj = dependentObj;
            // 如果当前选择是A<B
            if (depObj.dependent[depObj.getValue()] == 'less') {
                // 将第一个控件设为minObj
                if (index == 0) {
                    item.tag = compareGroupName + 'minObj';
                    item.maxObj = compareGroupName + 'maxObj';
                    if (item.minObj) {
                        delete item.minObj;
                    }
                }
                if (index == 2) {
                    item.tag = compareGroupName + 'maxObj';
                    item.minObj = compareGroupName + 'minObj';
                    if (item.maxObj) {
                        delete item.maxObj;
                    }
                }
            } else {
                // 将第一个控件设为maxObj
                if (index == 0) {
                    item.tag = compareGroupName + 'maxObj';
                    item.minObj = compareGroupName + 'minObj';
                    if (item.maxObj) {
                        delete item.maxObj;
                    }
                }
                if (index == 2) {
                    item.tag = compareGroupName + 'minObj';
                    item.maxObj = compareGroupName + 'maxObj';
                    if (item.minObj) {
                        delete item.minObj;
                    }
                }
            }
        });
        return true;
    },
    card: function(value, field) {},
    /**
	 * 验证登录系统的用户名 
	 * 
	 * @param {value}
	 *            str 输入值
	 * @param {field}
	 *            obj textfield
	 */
    userName: function(value, field) {
        var me = this,
            isEmail, isMobile;
        // 验证邮箱
        isEmail = me.checkEmail(value);
        // 验证手机号
        isMobile = me.checkMobile(value);
        if (isEmail || isMobile) {
            return true;
        } else {
            return false;
        }
        return true;
    },
    /*
	 * 检测验证码 @param {value} str 输入的验证码
	 */
    code: function(value, object) {
        var data = {},
            backInfo = "";
        var url = "验证码请求地址";
        data.code = value.toUpperCase();
        data.regType = -1;
        Ext.Ajax.request({
            method: "POST",
            url: url,
            params: data,
            async: false,
            success: function(response, opts) {
                backInfo = response.responseText;
            }
        });
        return backInfo == "1" ? true : false;
    },
    /**
	 * 验证邮箱
	 * 
	 * @param {string}
	 *            str 邮箱
	 */
    checkEmail: function(str, object) {
        var regTxt = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        object.vtypeText = '请输入正确的Email';
        return regTxt.test(str.toLowerCase());
    },
    /**
	 * 验证手机号码
	 * 
	 * @param {string}
	 *            str 电话号码
	 */
    checkMobile: function(str) {
        var regTxt = /^((\+?86)|(\(\+86\)))?1\d{10}$/;
        return regTxt.test(str.replace(/\-/g, ""));
    },
    /***
     * 验证汉字加其他字母的长度
     */
    maxInputLength: function(str, object) {
        var maxLength = object.maxlen;
        var len = str.length;
        if (maxLength >= len) {
            return true;
        } else {
            object.vtypeText = '您输入的内容超出长度';
        }
    },
    /**
	 * 身份证验证
	 * 
	 * @param str
	 * @param object
	 * @returns
	 */
    cardText: function(str, object) {
        var city = {
                11: "北京",
                12: "天津",
                13: "河北",
                14: "山西",
                15: "内蒙古",
                21: "辽宁",
                22: "吉林",
                23: "黑龙江 ",
                31: "上海",
                32: "江苏",
                33: "浙江",
                34: "安徽",
                35: "福建",
                36: "江西",
                37: "山东",
                41: "河南",
                42: "湖北 ",
                43: "湖南",
                44: "广东",
                45: "广西",
                46: "海南",
                50: "重庆",
                51: "四川",
                52: "贵州",
                53: "云南",
                54: "西藏 ",
                61: "陕西",
                62: "甘肃",
                63: "青海",
                64: "宁夏",
                65: "新疆",
                71: "台湾",
                81: "香港",
                82: "澳门",
                91: "国外 "
            };
        var tip = "";
        var pass = true;
        if (!str || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(str)) {
            object.vtypeText = '身份证号格式错误';
            pass = false;
        } else if (!city[str.substr(0, 2)]) {
            object.vtypeText = '地址编码错误';
            pass = false;
        } else {}
        // 18位身份证需要验证最后一位校验位
        /*if(str.length == 18){
            	str = str.split('');
                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++)
                {
                    ai = str[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if(parity[sum % 11] != str[17]){
               	 object.vtypeText= '校验位错误';
                    pass =false;
                }
            }*/
        return pass;
    },
    /**
	 * 验证企业账号
	 */
    checkIknowId: function(value, object) {
        var regTxt = /^(\+?[1-9][0-9]*|0)$/;
        object.vtypeText = '请输入正确的企业账号';
        return regTxt.test(value);
    },
    /**
	 * 
	 * 验证执照号码
	 */
    checkRegCode: function(value, object) {
        var regTxt = /^\+?[1-9][0-9]*$/;
        object.vtypeText = '请输入正确的执照号码';
        return regTxt.test(value);
    },
    /**
	 * 验证服务人数 规则为 1、正整数 2、最大长度5位
	 */
    checkServiceEmCount: function(value, object) {
        var regTxt = /^[1-9][0-9]{0,4}$/;
        object.vtypeText = '请输入正确的服务人数（最大长度5位的正整数）';
        return regTxt.test(value);
    },
    /**
	 * 验证经营地址或注册地址 规则为"中文或英文或数字"
	 */
    checkAddress: function(value, object) {
        var regTxt = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/;
        object.vtypeText = '请输入正确的地址（只能输入中文或英文或数字）';
        return regTxt.test(value);
    },
    /**
     * 验证是否中文
     */
    checkChainese: function(value, object) {
        var regTxt = /^[\u4e00-\u9fa5]+$/;
        object.vtypeText = '只能输入中文';
        return regTxt.test(value);
    },
    /**
	 * 验证网址，www开头
	 */
    checkWebSite: function(value, object) {
        var regTxt = /^[wW]{3}\.[\w-]+\.\w{2,4}(\/.*)?$/;
        object.vtypeText = '请输入正确的网址（www开头）';
        return regTxt.test(value);
    },
    /**
	 * 验证手机号码
	 */
    checkMobile: function(value, object) {
        var regTxt = /^1[1-9]\d{9}$/;
        object.vtypeText = '请输入正确的手机号码（11位数字）';
        return regTxt.test(value);
    },
    /**
     * 校验手机以及座机
     */
    checkMobildAndTel: function(value, object) {
        var regTxt = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
        object.vtypeText = "您输入的联系方式有误请重写输入座机格式0000-000000手机13*********";
        return regTxt.test(value);
    },
    /**
	 * 验证传真号码
	 */
    checkFax: function(value, object) {
        var regTxt = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
        object.vtypeText = '请输入正确的号码';
        return regTxt.test(value);
    },
    /**
	 * 验证人名
	 */
    checkName: function(value, object) {
        var regTxt = /^[a-zA-Z?:·\u4e00-\u9fa5]+$/;
        object.vtypeText = '请输入正确的姓名，只能含汉字和字母';
        return regTxt.test(value);
    },
    /**
     * 检测是否输入的是拼音
     */
    checkPy: function(value, object) {
        var regTxt = /^[a-zA-Z]+$/;
        object.vtypeText = '此输入项不正确，只能输入字母';
        return regTxt.test(value);
    },
    /**
	 * 验证两个文本框的值是否一致
	 * 
	 * @param val
	 * @param field
	 */
    repetition: function(val, field) {
        if (field.repetition) {
            var cmp = field.up('form').getForm().findField(field.repetition.targetCmpId);
            if (Ext.isEmpty(cmp)) {
                util.err('发生异常错误，指定的组件未找到');
                return false;
            }
            if (val == cmp.getValue()) {
                return true;
            } else {
                return false;
            }
        }
    },
    repetitionText: '两次输入的值不一致请检查',
    dateRange: function(val, field) {
        //时间校验
        var date = field.parseDate(val);
        if (!date) {
            return;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = field.up().down('datefield[name=' + field.startDateField + ']');
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        } else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = field.up().down('datefield[name=' + field.endDateField + ']');
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        return true;
    },
    daterangeText: '开始时间必须小于结束时间',
    /**
	 * IP地址校验
	 */
    checkIP: function(value, object) {
        var regTxt = /^(1|([1-9]{1,2}|[1-9]0)|(1[0-9]{2}|2[0-5]{2}))((.(0|([1-9]{1,2}|[1-9]0)|(1[0-9]{2}|2[0-5]{2}))){2}).(1|([1-9]{1,2}|[1-9]0)|(1[0-9]{2}|2[0-5]{2}))$/;
        object.vtypeText = '请输入正确的IP地址，例如：192.168.0.1';
        return regTxt.test(value);
    }
});

/**
 *
 * <p> Title:Tip.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext/tip)</p>
 * <p> Description:  重新设置鼠标经过悬停提示样式</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.tip.Tip', {
    override: 'Ext.tip.Tip'
});
/*,
	ui : 'wys_tipCls'*/

/**
 *
 * <p> Title:Text.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext/form/field)</p>
 * <p> Description:  * 重写文本框使其遇到ReadOnly属性后将背景颜色调整成灰色
 * 适用于Extjs6.x +
 * @override Ext.form.field.Text</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.Text', {
    override: 'Ext.form.field.Text',
    listeners: {
        focus: function(textfield) {
            textfield.setHideTrigger(false);
        },
        blur: function(textfield) {
            textfield.setHideTrigger(true);
        },
        render: function(textfield) {
            textfield.setHideTrigger(true);
        }
    },
    hideTrigger: true,
    triggerCls: 'x-form-clear-trigger',
    onTriggerClick: function() {
        this.setValue('');
    },
    afterRender: Ext.Function.createSequence(Ext.form.field.Text.prototype.afterRender, function() {
        var input = this;
        if (this.readOnly === true) {
            //如果设置了只读属性
            input.setFieldStyle({
                'cursor': 'not-allowed'
            });
        }
        if (input.allowBlank === false) {
            //解决为加入*号必填内容
            if (!input.afterLabelTextTpl) {
                input.afterLabelTextTpl = required;
            }
        }
        if (input.xtype === 'ArrayCombobox' || input.xtype === 'combgrid' || input.xtype === 'RemoteCombobox' || input.xtype === 'cityPicker' || input.xtype === 'combobox' || input.xtype === 'datetimefield' || input.xtype === 'comboTree') {
            return;
        }
        //鼠标经过悬停提示
        if (input.tooltip) {
            try {
                Ext.create('Ext.ToolTip', {
                    target: input.id,
                    trackMouse: false,
                    draggable: true,
                    maxWidth: 200,
                    minWidth: 100,
                    title: input.tooltip.title || '输入提示',
                    html: input.tooltip.text || '请输入' + input.fieldLabel
                });
            } catch (error) {}
        } else {
            try {
                Ext.create('Ext.ToolTip', {
                    target: input.id,
                    trackMouse: false,
                    draggable: true,
                    maxWidth: 200,
                    minWidth: 100,
                    title: '输入提示',
                    html: '请输入' + (input.fieldLabel || input.emptyText.replace('请输入', ''))
                });
            } catch (error) {}
        }
    })
});

/**
 *
 * <p> Title:MessageBox.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext/window)</p>
 * <p> Description:  修改确认提示的否的按钮样式</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.Window.MessageBox', {
    override: 'Ext.window.MessageBox',
    init: function(win) {
        //		this.callParent();
        this.win = win;
        this.win.buttonText = {
            ok: WY.local.lang.common.okButtonText,
            yes: WY.local.lang.common.yesButtonText,
            no: WY.local.lang.common.cancelButtonText,
            cancel: WY.local.lang.common.noButtonText
        };
    },
    confirm: function(cfg, message, fn, scope) {
        //修改'buttonText=否'的按钮的UI
        this.msgButtons[2].setUI("button-alternative-toolbar");
        if (Ext.isString(cfg)) {
            cfg = {
                title: cfg,
                icon: this.QUESTION,
                message: message,
                buttons: this.YESNO,
                callback: fn,
                scope: scope
            };
        }
        return this.show(cfg);
    }
});

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
Ext.define('wys.form.FieldContainer', {
    override: "Ext.form.FieldContainer",
    initRenderData: function() {
        var data = this.callParent();
        data.containerElCls = this.containerElCls;
        return data;
    },
    setFieldLabel: function(label) {
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
    setToolTip: function(tipText, cls, isShow) {
        tipText = tipText || '';
        cls = cls || "my-tooltip";
        var me = this;
        var tips = me.getElementsByCls(cls);
        if (tips.length) {
            Ext.each(tips, function(item) {
                item.setAttribute("data-qtip", tipText);
                if (isShow) {
                    item.style.display = "inline-block";
                }
            });
        } else {
            me.showToolTip(tipText, cls);
        }
    },
    showToolTip: function(tipText, cls) {
        var me = this;
        tipText = tipText || '';
        cls = cls || "my-tooltip";
        var tips = me.getElementsByCls(cls);
        if (tips.length) {
            Ext.each(tips, function(item) {
                item.style.display = "inline-block";
            });
        } else {
            var labels = me.getElementsByCls('x-form-item-label-inner');
            var dataTip = '<span data-qtip="' + tipText + '" style="color:red;cursor: pointer;padding-left:10px;-webkit-transform: scale(1.5);transform: scale(1.5);" class="fa fa-question-circle my-tooltip"></span>';
            Ext.each(labels, function(item) {
                if (item.parentElement.parentElement.id.indexOf('fieldcontainer-') > -1) {
                    item.innerHTML += dataTip;
                }
            });
        }
    },
    getElementsByCls: function(cls) {
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
            Ext.each(eleList, function(item) {
                if (clsReg.test(item.className)) {
                    ele.push(item);
                }
            });
        }
        return ele;
    }
});

/**
 *
 * <p> Title:Number.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext/form/field)</p>
 * <p> Description:  * 重写数字输入框，避免数值太大系统自动转换为科学计数法
 * 适用于Extjs6.x +
 * @override Ext.field.Number </p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.Number', {
    override: 'Ext.form.field.Number',
    negativeText: '输入的值不合法',
    afterRender: Ext.Function.createSequence(Ext.form.Number.prototype.afterRender, function() {
        var input = this;
        input.maxValue = input.maxValue || 9.999999999E9;
        if (!input.emptyText) {
            input.emptyText = '0.00';
        }
    })
});

Ext.define('Ext.theme.neptune.toolbar.Paging', {
    override: 'Ext.toolbar.Paging',
    defaultButtonUI: 'plain-toolbar',
    inputItemWidth: 40
});

/**
 *
 * <p> Title:Paging EXTJS MODEL</p>
 * <p> Description:  重写分页标签加入每页显示条数控制</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * @author wys
 * @version 1.0
 */
Ext.define('wys.toolbar.Paging', {
    override: 'Ext.toolbar.Paging',
    isShow: true,
    initComponent: function() {
        var me = this;
        me.displayInfo = true , me.beforePageText = WY.local.lang.common.pagingtoolbar['beforePageText'];
        me.displayMsg = WY.local.lang.common.pagingtoolbar['displayMsg'];
        me.emptyMsg = WY.local.lang.common.pagingtoolbar['emptyMsg'];
        me.refreshText = WY.local.lang.common.pagingtoolbar['refreshText'];
        me.firstText = WY.local.lang.common.pagingtoolbar['firstText'];
        me.prevText = WY.local.lang.common.pagingtoolbar['prevText'];
        me.nextText = WY.local.lang.common.pagingtoolbar['nextText'];
        me.lastText = WY.local.lang.common.pagingtoolbar['lastText'];
        me.items = [
            {
                xtype: 'combobox',
                fieldLabel: WY.local.lang.common.pagingtoolbar['DisplayPage'],
                width: 120,
                editable: false,
                hidden: !me.isShow,
                labelWidth: 60,
                store: [
                    '10',
                    '20',
                    '25',
                    '30',
                    '50',
                    '100'
                ],
                value: constants.pagingtoolbar.pageSize,
                listeners: {
                    afterrender: function(combo, eOpts) {
                        combo.setValue(constants.pagingtoolbar.pageSize);
                    },
                    select: function(combo, records, eOpts) {
                        var ownerCt = combo.ownerCt,
                            store = ownerCt.getStore();
                        store.pageSize = combo.getValue();
                        store.currentPage = 1;
                        ownerCt.doRefresh();
                    }
                }
            },
            {
                hidden: !me.isShow,
                xtype: 'label',
                style: 'padding:7px 0px 0px 0px;color:#6f757b;',
                text: WY.local.lang.common.pagingtoolbar['strip']
            }
        ];
        /*,'-'*/
        me.callParent();
        me.on('afterrender', function() {
            me.ownerCt.on('reconfigure', function() {
                me.bindStore(me.ownerCt.store || 'ext-empty-store', true);
            });
        });
    }
});

Ext.define('Ext.theme.neptune.picker.Month', {
    override: 'Ext.picker.Month',
    // Monthpicker contains logic that reduces the margins of the month items if it detects
    // that the text has wrapped.  This can happen in the classic theme  in certain
    // locales such as zh_TW.  In order to work around this, Month picker measures
    // the month items to see if the height is greater than "measureMaxHeight".
    // In neptune the height of the items is larger, so we must increase this value.
    // While the actual height of the month items in neptune is 24px, we will only 
    // determine that the text has wrapped if the height of the item exceeds 36px.
    // this allows theme developers some leeway to increase the month item size in
    // a neptune-derived theme.
    measureMaxHeight: 36
});

/**
 *
 * <p> Title:Display.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext/form/field)</p>
 * <p> Description:  如果输入框有只读属性那么就将输入框的样式修改为只带有下划线的输入框</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.Display', {
    override: 'Ext.form.field.Display'
});
/*,
	editable : false,
    fieldCls : 'x-form-field-my',
    init: function() {
    	Ext.apply(this,{
    		border : false,
    		listeners : {
    			render : function(this_,e){
    				var value = this_.getValue();
    				if(Ext.isEmpty(value)){
    					this_.setValue('    &nbsp;');
    				}
    			},
    			change : function(this_,e){
    				var value = this_.getValue();
    				if(Ext.isEmpty(value)){
    					this_.setValue('&nbsp;&nbsp;');
    				}
    			}
    		},
    		inputWrapCls : 'x-form-field-my'
    	});
        this.callParent();
    }*/

Ext.define('Ext.theme.neptune.form.field.HtmlEditor', {
    override: 'Ext.form.field.HtmlEditor',
    defaultButtonUI: 'plain-toolbar'
});

Ext.define('Ext.theme.neptune.panel.Table', {
    override: 'Ext.panel.Table',
    lockableBodyBorder: true,
    initComponent: function() {
        var me = this;
        me.callParent();
        if (!me.hasOwnProperty('bodyBorder') && !me.hideHeaders && (me.lockableBodyBorder || !me.lockable)) {
            me.bodyBorder = true;
        }
    }
});

Ext.define('Ext.theme.crisp.view.Table', {
    override: 'Ext.view.Table',
    stripeRows: false
});

/**
 *
 * <p> Title:Panel.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext/grid)</p>
 * <p> Description:  每一个列都会出现鼠标悬浮上去显示内容
 * 适用于Extjs6.x +
 * @override Ext.grid.Panel 
 * GridPanel单元格不能选中复制问题 
 * 单元格数据显示不完整 ,增加title 浮动提示信息 </p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.grid.Panel', {
    override: 'Ext.grid.Panel',
    afterRender: Ext.Function.createSequence(Ext.grid.GridPanel.prototype.afterRender, function() {
        var view = this.getView();
        this.tip = new Ext.ToolTip({
            target: view.el,
            delegate: '.x-grid-cell-inner',
            trackMouse: true,
            renderTo: Ext.getBody(),
            listeners: {
                beforeshow: function updateTipBody(tip) {
                    var tipText = (tip.triggerElement.innerText || tip.triggerElement.textContent);
                    if (Ext.isIE8) {
                        tip.update(tipText);
                        return;
                    }
                    if (Ext.isEmpty(tipText) || Ext.isEmpty(window.util.trim(tipText))) {
                        return false;
                    }
                    tip.update(tipText);
                }
            }
        });
    })
});

Ext.define('Ext.theme.neptune.grid.RowEditor', {
    override: 'Ext.grid.RowEditor',
    buttonUI: 'default-toolbar'
});

Ext.define('Ext.theme.neptune.grid.column.RowNumberer', {
    override: 'Ext.grid.column.RowNumberer',
    width: 25
});

Ext.define('Ext.theme.neptune.menu.Separator', {
    override: 'Ext.menu.Separator',
    border: true
});

Ext.define('Ext.theme.neptune.menu.Menu', {
    override: 'Ext.menu.Menu',
    showSeparator: false
});

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
Ext.define('wys.grid.plugin.RowEditing', {
    override: "Ext.grid.plugin.RowEditing",
    saveBtnText: '保存',
    cancelBtnText: '取消',
    errorsText: '错误提示',
    dirtyText: '请先提交或取消操作'
});

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
Ext.define('wys.grid.plugin.RowExpander', {
    override: 'Ext.grid.plugin.RowExpander',
    init: function(grid) {
        this.callParent(arguments);
        this.grid = grid;
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
        if (!Ext.isEmpty(Ext.fly(nextBd))) {
            Ext.fly(nextBd)[addOrRemoveCls](me.rowBodyHiddenCls);
        }
        me.recordsExpanded[record.internalId] = isCollapsed;
        view.refreshSize();
        if (me.grid.ownerLockable) {
            ownerLock = me.grid.ownerLockable;
            view = ownerLock.lockedGrid.view;
            fireView = ownerLock.lockedGrid.view;
            rowHeight = row.getHeight();
            row.setHeight(isCollapsed ? rowHeight : '');
            row = Ext.fly(view.getNode(rowIdx), '_rowExpander');
            row.setHeight(isCollapsed ? rowHeight : '');
            row[addOrRemoveCls](me.rowCollapsedCls);
            view.refreshSize();
        } else {
            fireView = view;
        }
        this.grid.fireEvent(isCollapsed ? 'expandbody' : 'collapsebody', Ext.isEmpty(row.dom) ? row : row.dom, record, nextBd);
        Ext.resumeLayouts(true);
    }
});

/**
 *
 * <p> Title:Panel.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext/tab)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.tab.Panel', {
    override: 'Ext.tab.Panel'
});
/*,
	ui : 'navigation'*/

//Ext.namespace('Ext.theme.is')['wys'] = true;
//Ext.theme.name = 'wys';

/**
 *
 * <p> Title:Main.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/classic/src)</p>
 * <p> Description:  占位用的没有任何用处</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.Main', {
    extend: 'Ext.container.Container'
});

/**
 * 系统控制层超类
 */
Ext.define('wys.basic.BaseCtrl', {
    extend: 'Ext.app.ViewController'
});

/**
 * pc端表单超级类
 */
Ext.define('wys.basic.BaseForm', {
    extend: 'Ext.form.Panel',
    xtype: 'baseForm',
    requires: [
        'Ext.form.Panel'
    ],
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 100
    }
});

/**
 * 对系统View层进行简单组装，去除重复写不必要的代码
 */
Ext.define('wys.basic.BaseView', {
    extend: 'Ext.grid.Panel',
    xtype: 'baseView',
    requires: [],
    border: 1,
    loadMask: true,
    minHeight: 100,
    enableColumnHide: true,
    border: false,
    bodyBorder: false,
    loadMask: {
        msg: '正在加载数据,请稍等...'
    },
    columnLines: false,
    //是否显示列分割线
    viewConfig: {
        emptyText: '<div style="margin: 10px;padding: 15px;background: #f9edc0;border: 1px solid #d2a04a !important;color: black;-webkit-border-radius: 5px;-moz-border-radius: 5px;">没有找到相关记录<div>',
        stripeRows: false,
        //在表格中显示斑马线
        enableTextSelection: true,
        //可以复制单元格文字
        stripeRows: false,
        //是否隔行换色
        getRowClass: function(record, rowIndex, rowParams, store) {
            if (rowIndex % 2 === 0) {
                return 'x-grid-row-hight';
            }
        }
    },
    initComponent: function() {
        this.callParent(arguments);
    }
});

/**
 * Window超级类
 */
Ext.define('wys.basic.BaseWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.baseWin',
    autoShow: true,
    requires: [
        'Ext.window.Window'
    ],
    modal: true,
    maximizable: true,
    closeAction: 'hide',
    //    ui : 'windowmodifyForm',
    //minimizable:true,
    layout: 'fit',
    autoScroll: true,
    animCollapse: true,
    animateTarget: Ext.getBody(),
    border: true,
    isCenter: false,
    //是否居中，默认显示在窗体中心边缘
    style: 'border-color: #b6babe;',
    closeToolText: '点击关闭窗口',
    afterRender: function() {
        var me = this;
        if (!me.isCenter) {
            me.x = Ext.ComponentQuery.query('container[name=leftMenu]')[0].getWidth() + 0;
            me.y = Ext.ComponentQuery.query('headerBar')[0].getHeight() + 37;
            this.iconCls = me.iconCls || '';
        }
        me.callParent(arguments);
        if (!me.isCenter) {
            if (me.width & me.height) {} else if (me.width) {
                me.syncSizeByHeight(me.mainWidth);
            } else {
                me.syncSize();
            }
            Ext.on(me.resizeListeners = {
                resize: me.onViewportResize,
                scope: me,
                buffer: 50
            });
        }
    },
    onDestroy: function() {
        Ext.un(this.resizeListeners);
        this.callParent();
    },
    onViewportResize: function() {
        this.syncSize();
    },
    syncSize: function() {
        var sync_self = this,
            width = Ext.Element.getViewportWidth(),
            height = Ext.Element.getViewportHeight(),
            x = sync_self.x,
            y = sync_self.y,
            mainWidth = width - x,
            mainHeight = height - (y + 40);
        sync_self.setSize(/*Math.floor(width * 0.9)*/
        mainWidth, mainHeight);
        /*Math.floor(height * 0.9)*/
        sync_self.setXY([
            x,
            y
        ]);
    },
    syncSizeByHeight: function(width_) {
        var width = width_,
            me = this,
            height = Ext.Element.getViewportHeight(),
            x = me.x,
            y = me.y;
        me.setSize(me.mainWidth, me.mainHeight);
        me.setXY([
            x,
            y
        ]);
    }
});

/**
 *
 * <p> Title:SeniorQuery.js BY EXTJS V6.0 (src/main/newwebapp/classic/src/view)</p>
 * <p> Description:  系统高级查询组件</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.basic.SeniorQuery', {
    extend: 'Ext.menu.Menu',
    xtype: 'seniorQuery',
    width: 350,
    //查询框宽度，默认 350
    searchFields: [],
    //查询字段
    usePageFuncScope: null,
    //使用页面的作用域-如this
    userPageFuncStore: null,
    //使用页面的数据集
    initComponent: function() {
        var init_self = this;
        if (init_self.usePageFuncScope === null || init_self.usePageFuncScope === undefined) {
            util.err('高级查询组件初始化异常，缺少【usePageFuncScope】参数');
        } else if (init_self.usePageFuncScope === null || init_self.usePageFuncScope === undefined) {
            util.err('高级查询组件初始化异常，缺少【userPageFuncStore】参数');
        } else {
            Ext.apply(init_self, {
                width: init_self.width,
                margin: '0 0 10 0',
                items: [
                    {
                        title: '高级检索',
                        tools: [
                            {
                                type: 'close',
                                tooltip: '点击关闭',
                                handler: function() {
                                    this.up('menu').close();
                                }
                            }
                        ],
                        iconCls: 'fa fa-search fa-lg',
                        xtype: 'form',
                        width: 350,
                        defaults: {
                            anchor: '100%',
                            labelWidth: 100,
                            labelSeparator: '：',
                            labelAlign: 'right',
                            margin: 5
                        },
                        defaultType: 'textfield',
                        items: init_self.searchFields,
                        buttons: [
                            {
                                text: '重置查询',
                                ui: 'button-commonToolbarBtn-toolbar',
                                iconCls: 'fa fa-share fa-fw',
                                handler: function() {
                                    this.up('form').getForm().reset();
                                }
                            },
                            {
                                text: '查询',
                                xtype: 'searchBtn',
                                formBind: true,
                                disabled: true,
                                handler: function() {
                                    var form = this.up('form').getForm();
                                    if (form.isValid()) {
                                        store.proxy.extraParams = form.getValues();
                                        store.currentPage = 1;
                                        store.load();
                                    }
                                }
                            }
                        ]
                    }
                ]
            });
        }
        init_self.callParent(arguments);
    }
});

/***
 * 模块名称：基础支撑 <br/>
 * 类名称：动态GridPanel
 * 作者：wys
 * 创建时间：2015/12/22 13:04
 */
Ext.define('wys.basic.specialGridpanel', {
    extend: 'wys.basic.BaseView',
    xtype: 'specialGridPanel',
    alias: 'widget.specialGridPanel',
    requires: [
        'wys.basic.BaseView'
    ],
    url: new Array(),
    //数据请求地址数组 第一个为列头请求，第二个为数据请求
    params: {},
    //数据请求参数
    listeners: {
        afterrender: function(component, eOpts) {
            var me = this;
            var ajax_cfg = {
                    url: me.url[0],
                    params: me.params,
                    ok: function(data) {
                        loadDateItem = data.list;
                        cmItems = [];
                        cmItems.push({
                            xtype: 'rownumberer',
                            text: '序号',
                            align: 'center',
                            width: 50,
                            sortable: false
                        });
                        Ext.Array.each(loadDateItem, function(item) {
                            if (item.children === undefined || item.children.length == 0) {
                                cmItems.push({
                                    text: item.text,
                                    flex: 1,
                                    dataIndex: item.dataIndex,
                                    menuDisabled: true,
                                    sortable: false
                                });
                            } else {
                                itemsF = {
                                    text: item.text,
                                    menuDisabled: true,
                                    sortable: false
                                };
                                var cmChildrenItems = [];
                                Ext.Array.each(item.children, function(children) {
                                    cmChildrenItems.push({
                                        text: children.text,
                                        flex: 1,
                                        menuDisabled: true,
                                        sortable: false
                                    });
                                });
                                itemsF.columns = cmChildrenItems;
                                cmItems.push(itemsF);
                            }
                        });
                        cmItems.push({
                            text: '',
                            align: 'center',
                            width: 15,
                            sortable: false,
                            menuDisabled: true
                        });
                        var store = Ext.create('Ext.data.Store', {
                                //定义数据源
                                fields: data.root,
                                proxy: {
                                    type: 'ajax',
                                    url: me.url[1],
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'list'
                                    }
                                },
                                autoLoad: true,
                                listeners: {
                                    beforeload: function(store) {
                                        Ext.apply(store.proxy.extraParams, me.params);
                                        store.currentPage = 1;
                                    }
                                }
                            });
                        //绘制表格
                        Ext.suspendLayouts();
                        component.reconfigure(store, cmItems);
                        store.load(function(records, operation, success) {
                            window.util.mergeCells(component, 'row', "kinds", '1px solid #9BCEDB');
                        });
                        Ext.resumeLayouts(true);
                    }
                };
            window.util.ajax(ajax_cfg);
        }
    },
    initComponent: function() {
        var init_self = this;
        init_self.margin = '0 0 0 0';
        init_self.columnLines = false;
        //是否显示列分割线
        init_self.viewConfig = {
            stripeRows: true,
            //在表格中显示斑马线
            enableTextSelection: true
        };
        //可以复制单元格文字
        this.callParent(arguments);
    }
});

/**
 *
 * <p> Title:BizReturn.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/button)</p>
 * <p> Description:  退件</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.button.BizReturn', {
    extend: 'Ext.button.Button',
    xtype: 'bizReturnBtn',
    ui: 'button-biaReturn-toolbar',
    iconCls: 'fa fa-file-excel-o fa-lw',
    text: '退件',
    tooltip: '<span style="font-size:12px"> 点击退办</span>'
});

/**
 *
 * <p> Title:Button.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/classic/src/button)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.button.Button', {
    extend: 'Ext.button.Button',
    xtype: 'basicBtn',
    ui: 'button-commonToolbarBtn-toolbar'
});

/**
 * 重写Button使其可以复用，去除编写重复代码
 */
Ext.define('wys.button.Exp', {
    extend: 'Ext.button.Button',
    xtype: 'expBtn',
    ui: 'button-expbtn-toolbar',
    iconCls: 'fa fa-file-excel-o fa-lw',
    text: '导出数据',
    tooltip: '<span style="font-size:12px">点击进行数据导出</span>',
    isLocalStore: false,
    //是否本地数据,如果是则放弃执行SQL
    columnsStr: '',
    //显示字段 fullName
    searchSQL: '',
    //查询数据SQL
    tempFileName: '',
    //模版名称-所在地
    handler: function(btn) {
        if (!Ext.isEmpty(btn.columnsStr) || !Ext.isEmpty(btn.searchSQL) || !Ext.isEmpty(btn.tempFileName)) {
            util.ajax({
                url: app.base + '/excel/download.do',
                params: {
                    tempFileName: btn.tempFileName,
                    columns: btn.columnsStr,
                    sql: btn.searchSQL
                },
                ok: function(res) {
                    if (res.success) {
                        window.open(app.base + '/' + res.path);
                    } else {
                        util.err(WY.local.lang.common.tip.exp.downloadError);
                    }
                }
            });
        } else //    		var url =  app.base + '/excel/download.do?tempFileName='+btn.tempFileName+'&columns='+btn.columnsStr+'&sql='+btn.searchSQL;
        //    		var url =  app.base + '/download.jsp?tempFileName='+btn.tempFileName+'&columns='+btn.columnsStr+'&sql='+btn.searchSQL;
        //    		window.open(url);
        {}
    }
});
//不执行任何操作
//util.err(WY.local.lang.common.tip.exp.error);

/**
 * 重写Button使其可以复用，去除编写重复代码
 * 可选项：
 * 	excel
 *  xml
 *  中心库
 * @author wys
 */
Ext.define('wys.button.Imp', {
    extend: 'Ext.button.Button',
    xtype: 'impBtn',
    ui: 'button-impbtn-toolbar',
    iconCls: 'fa fa-file-excel-o fa-lw',
    text: '导入数据',
    tooltip: '<span style="font-size:12px">点击进行数据导入</span>',
    menu: [
        {
            text: 'excel导入',
            iconCls: 'fa fa-file-excel-o fa-lg',
            handler: function(btn) {
                var excelWin = Ext.create('Ext.window.Window', {
                        title: btn.text,
                        width: 432,
                        height: 87,
                        iconCls: btn.iconCls,
                        autoShow: true,
                        modal: true,
                        maximizable: false,
                        closeAction: 'destroy',
                        layout: 'fit',
                        autoScroll: true,
                        //	    	    animCollapse : true,
                        //	    	    animateTarget : Ext.getBody(),
                        border: true,
                        closeToolText: '点击关闭窗口',
                        items: [
                            {
                                xtype: 'filefield',
                                name: 'excelFile',
                                fieldLabel: 'excel文件',
                                labelWidth: 80,
                                msgTarget: 'side',
                                allowBlank: false,
                                anchor: '100%',
                                buttonText: '请选择',
                                emptyText: '请选择要导入的excel文件...'
                            }
                        ]
                    });
                excelWin.show();
            }
        },
        '-',
        {
            text: 'xml导入',
            iconCls: 'fa fa-file-code-o fa-lg',
            handler: function(btn) {
                var xmlWin = Ext.create('Ext.window.Window', {
                        title: btn.text,
                        width: 432,
                        height: 87,
                        iconCls: btn.iconCls,
                        autoShow: true,
                        modal: true,
                        maximizable: false,
                        closeAction: 'destroy',
                        layout: 'fit',
                        autoScroll: true,
                        //	    	    animCollapse : true,
                        //	    	    animateTarget : Ext.getBody(),
                        border: true,
                        closeToolText: '点击关闭窗口',
                        items: [
                            {
                                xtype: 'filefield',
                                name: 'xmlFile',
                                fieldLabel: 'xml文件',
                                labelWidth: 80,
                                allowBlank: false,
                                anchor: '100%',
                                //请选择要导入的xml文件...
                                buttonText: '请选择'
                            }
                        ]
                    });
                xmlWin.show();
            }
        },
        '-',
        {
            text: '中心库导入',
            iconCls: 'fa fa-align-center fa-lg',
            handler: function(btn) {}
        }
    ]
});

/**
 * 重写Button使其可以复用，去除编写重复代码
 * @author wys
 */
Ext.define('wys.button.Modify', {
    extend: 'Ext.button.Button',
    xtype: 'modifyBtn',
    ui: 'button-editcontent-toolbar',
    iconCls: 'fa fa-edit fa-lg',
    text: '修改',
    tooltip: '<span style="font-size:12px">点击进行修改操作</span>'
});

/**
 *
 * <p> Title:Pickup.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/button)</p>
 * <p> Description:  取件</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.button.Pickup', {
    extend: 'Ext.button.Button',
    xtype: 'pickupBtn',
    ui: 'button-pickup-toolbar',
    iconCls: 'fa fa-file-excel-o fa-lw',
    text: '取件',
    tooltip: '<span style="font-size:12px"> 点击获取办理要件</span>'
});

/**
 * 重写Button使其可以复用，去除编写重复代码
 * @author wys
 */
Ext.define('wys.button.Refresh', {
    extend: 'Ext.button.Button',
    xtype: 'refreshBtn',
    ui: 'button-refreshbtn-toolbar',
    iconCls: 'fa fa-refresh fa-lg',
    text: '重新加载',
    tooltip: '<span style="font-size:12px">点击进行刷新操作</span>'
});

/**
 * 重写Button使其可以复用，去除编写重复代码
 * @author wys
 */
Ext.define('wys.button.Remove', {
    extend: 'Ext.button.Button',
    xtype: 'removeBtn',
    ui: 'button-removebtn-toolbar',
    iconCls: 'fa fa-trash-o fa-lg',
    text: '删除',
    tooltip: '<span style="font-size:12px">点击进行删除操作</span>'
});

/**
 * 重写Button使其可以复用，去除编写重复代码
 * @author wys
 */
Ext.define('wys.button.Save', {
    extend: 'Ext.button.Button',
    xtype: 'saveBtn',
    ui: 'button-savebtn-toolbar',
    iconCls: 'fa fa-plus-circle fa-lg',
    text: '新增',
    tooltip: '<span style="font-size:12px">点击进行新增操作</span>'
});

/**
 * 重写Button使其可以复用，去除编写重复代码
 * @author wys
 */
Ext.define('wys.button.Search', {
    extend: 'Ext.button.Button',
    xtype: 'searchBtn',
    ui: 'button-searchbtn-toolbar',
    iconCls: 'fa fa-search fa-lw',
    text: '查询',
    tooltip: '<span style="font-size:12px">点击进行数据检索</span>'
});

/**
 * 重写Button使其可以复用，去除编写重复代码
 * @author wys
 */
Ext.define('wys.button.Sync', {
    extend: 'Ext.button.Button',
    xtype: 'syncBtn',
    ui: 'button-syncbtn-toolbar',
    iconCls: 'fa fa-recycle fa-lw',
    text: '同步',
    tooltip: '<span style="font-size:12px">点击进行数据同步</span>'
});

/**
 *
 * <p> Title:Text.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/classic/src/button)</p>
 * <p> Description:  文本按钮</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.button.Text', {
    extend: 'Ext.button.Button',
    xtype: 'textBtn',
    ui: 'button-textbtn-toolbar'
});

/**
 *
 * <p> Title:FileUpload EXTJS FORM</p>
 * <p> Description:  文件上传组件</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.ux.FileUpload', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.uploadPanel',
    width: 700,
    height: 300,
    bizCode: '',
    //临时参数传递使用,遵循先定义后使用,
    fileType: '',
    //临时参数传递使用,遵循先定义后使用,
    busitypeid: '',
    //临时参数传递使用,遵循先定义后使用,
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
            text: '文件名',
            width: 100,
            dataIndex: 'name'
        },
        {
            text: '自定义文件名',
            width: 130,
            dataIndex: 'fileName'
        },
        //,editor: {xtype: 'textfield'}
        {
            text: '类型',
            width: 70,
            dataIndex: 'type'
        },
        {
            text: '大小',
            width: 70,
            dataIndex: 'size',
            renderer: function(v) {
                return Ext.util.Format.fileSize(v);
            }
        },
        {
            text: '进度',
            width: 130,
            dataIndex: 'percent',
            renderer: function(v) {
                var stml = '<div>' + '<div style="border:1px solid #008000;height:10px;width:115px;margin:2px 0px 1px 0px;float:left;">' + '<div style="float:left;background:#FFCC66;width:' + v + '%;height:8px;"><div></div></div>' + '</div>' + '</div>';
                return stml;
            }
        },
        {
            text: '状态',
            width: 80,
            dataIndex: 'status',
            renderer: function(v) {
                var status;
                if (v == -1) {
                    status = "等待上传";
                } else if (v == -2) {
                    status = "上传中...";
                } else if (v == -3) {
                    status = "<div style='color:red;'>上传失败</div>";
                } else if (v == -4) {
                    status = "上传成功";
                } else if (v == -5) {
                    status = "停止上传";
                }
                return status;
            }
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            items: [
                {
                    iconCls: 'fa fa-close fa-lg',
                    tooltip: '移除任务',
                    handler: function(grid, rowIndex, colIndex) {
                        var id = grid.store.getAt(rowIndex).get('id');
                        grid.store.remove(grid.store.getAt(rowIndex));
                    }
                }
            ]
        }
    ],
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    store: Ext.create('Ext.data.JsonStore', {
        autoLoad: false,
        fields: [
            'id',
            'name',
            'type',
            'size',
            'percent',
            'status',
            'fileName'
        ]
    }),
    addFileBtnText: '添加附件',
    uploadBtnText: '开始上传',
    removeBtnText: '移除所有任务',
    cancelBtnText: '取消',
    debug: false,
    file_size_limit: 100,
    //MB
    file_types: '*.*',
    file_types_description: '所有文件',
    //这里可以指定要上传的文件
    file_upload_limit: 50,
    file_queue_limit: 0,
    post_params: {
        attach_name: '',
        attach_table: '',
        attach_bizCode: '',
        attach_type: ''
    },
    //请求参数
    upload_url: constants.url.fileUpload,
    //访问地址
    flash_url: Ext.String.format("{0}/resources/plupload/swfupload.swf", WY.local.loadScriptPrefix),
    flash9_url: Ext.String.format("{0}/resources/plupload/swfupload_fp9.swf", WY.local.loadScriptPrefix),
    initComponent: function() {
        //创建元素后即可赋值给post_params
        this.post_params.attach_bizCode = this.bizCode;
        this.post_params.attach_type = this.fileType;
        this.post_params.attach_table = this.busitypeid;
        ////end
        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'addFileBtn',
                        iconCls: 'fa fa-plus fa-lg',
                        //id : '_btn_for_swf_',
                        text: this.addFileBtnText
                    },
                    {
                        xtype: 'tbseparator'
                    },
                    {
                        xtype: 'button',
                        itemId: 'uploadBtn',
                        iconCls: 'fa fa-cloud-upload fa-lg',
                        text: this.uploadBtnText,
                        scope: this,
                        handler: this.onUpload
                    },
                    {
                        xtype: 'tbseparator'
                    },
                    {
                        xtype: 'button',
                        itemId: 'removeBtn',
                        iconCls: 'fa fa-trash-o fa-lg',
                        text: this.removeBtnText,
                        scope: this,
                        handler: this.onRemove
                    },
                    {
                        xtype: 'tbseparator'
                    },
                    {
                        xtype: 'button',
                        itemId: 'cancelBtn',
                        iconCls: 'fa fa-close fa-lg',
                        disabled: true,
                        text: this.cancelBtnText,
                        scope: this,
                        handler: this.onCancelUpload
                    }
                ]
            }
        ];
        this.callParent();
        this.down('button[itemId=addFileBtn]').on({
            afterrender: function(btn) {
                var config = this.getSWFConfig(btn);
                this.swfupload = new SWFUpload(config);
                Ext.get(this.swfupload.movieName).setStyle({
                    position: 'absolute',
                    top: 0,
                    left: -2
                });
            },
            scope: this,
            buffer: 300
        });
    },
    getSWFConfig: function(btn) {
        var me = this;
        var placeHolderId = Ext.id();
        var em = btn.getEl().child('em');
        if (em == null) {
            em = Ext.get(btn.getId() + '-btnWrap');
        }
        em.setStyle({
            position: 'relative',
            display: 'block'
        });
        em.createChild({
            tag: 'div',
            id: placeHolderId
        });
        return {
            debug: me.debug,
            flash_url: me.flash_url,
            flash9_url: me.flash9_url,
            upload_url: me.upload_url,
            post_params: me.post_params || {
                savePath: 'file\\'
            },
            file_size_limit: (me.file_size_limit * 1024),
            file_types: me.file_types,
            file_types_description: me.file_types_description,
            file_upload_limit: me.file_upload_limit,
            file_queue_limit: me.file_queue_limit,
            button_width: em.getWidth(),
            button_height: em.getHeight(),
            button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
            button_cursor: SWFUpload.CURSOR.HAND,
            button_placeholder_id: placeHolderId,
            custom_settings: {
                scope_handler: me
            },
            swfupload_preload_handler: me.swfupload_preload_handler,
            file_queue_error_handler: me.file_queue_error_handler,
            swfupload_load_failed_handler: me.swfupload_load_failed_handler,
            upload_start_handler: me.upload_start_handler,
            upload_progress_handler: me.upload_progress_handler,
            upload_error_handler: me.upload_error_handler,
            upload_success_handler: me.upload_success_handler,
            upload_complete_handler: me.upload_complete_handler,
            file_queued_handler: me.file_queued_handler
        };
    },
    /*,
			file_dialog_complete_handler : me.file_dialog_complete_handler*/
    swfupload_preload_handler: function() {
        if (!this.support.loading) {
            Ext.Msg.show({
                title: '提示',
                //				msg : '浏览器Flash Player版本太低,不能使用该上传功能！,请<a href="https://jingyan.baidu.com/article/11c17a2c3ffc2af447e39d76.html" style="color:blue;">点击</a>进行指导安装',
                msg: '浏览器Flash Player版本太低,不能使用该上传功能！,请<a href=' + app.base + '/doc/flash_notHave.pdf target="_black" style="color:blue;">点击</a>进行指导安装',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
            return false;
        }
    },
    file_queue_error_handler: function(file, errorCode, message) {
        switch (errorCode) {
            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                msg('上传文件列表数量超限,不能选择！');
                break;
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                msg('文件大小超过限制, 不能选择！');
                break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                msg('该文件大小为0,不能选择！');
                break;
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                msg('该文件类型不允许上传！');
                break;
        }
        function msg(info) {
            Ext.Msg.show({
                title: '提示',
                msg: info,
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.OK
            });
        }
    },
    swfupload_load_failed_handler: function() {
        Ext.Msg.show({
            title: '提示',
            msg: 'SWFUpload加载失败！',
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
    upload_start_handler: function(file) {
        var me = this.settings.custom_settings.scope_handler;
        me.down('#cancelBtn').setDisabled(false);
        var rec = me.store.getById(file.id);
        this.setFilePostName(encodeURIComponent(rec.get('fileName')));
    },
    upload_progress_handler: function(file, bytesLoaded, bytesTotal) {
        var me = this.settings.custom_settings.scope_handler;
        var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
        percent = percent == 100 ? 99 : percent;
        var rec = me.store.getById(file.id);
        rec.set('percent', percent);
        rec.set('status', file.filestatus);
        rec.commit();
    },
    upload_error_handler: function(file, errorCode, message) {
        var me = this.settings.custom_settings.scope_handler;
        var rec = me.store.getById(file.id);
        rec.set('percent', 0);
        rec.set('status', file.filestatus);
        rec.commit();
    },
    upload_success_handler: function(file, serverData, responseReceived) {
        var me = this.settings.custom_settings.scope_handler;
        var rec = me.store.getById(file.id);
        if (Ext.JSON.decode(serverData).success) {
            rec.set('percent', 100);
            rec.set('status', file.filestatus);
        } else {
            rec.set('percent', 0);
            rec.set('status', SWFUpload.FILE_STATUS.ERROR);
        }
        rec.commit();
        if (this.getStats().files_queued > 0 && this.uploadStopped == false) {
            this.startUpload();
        } else {
            me.showBtn(me, true);
        }
    },
    upload_complete_handler: function(file) {},
    file_queued_handler: function(file) {
        var me = this.settings.custom_settings.scope_handler;
        me.store.add({
            id: file.id,
            name: file.name,
            fileName: file.name,
            size: file.size,
            type: file.type,
            status: file.filestatus,
            percent: 0
        });
    },
    onUpload: function() {
        if (this.swfupload && this.store.getCount() > 0) {
            if (this.swfupload.getStats().files_queued > 0) {
                this.showBtn(this, false);
                this.swfupload.uploadStopped = false;
                this.swfupload.startUpload();
            }
        }
    },
    showBtn: function(me, bl) {
        me.down('#addFileBtn').setDisabled(!bl);
        me.down('#uploadBtn').setDisabled(!bl);
        me.down('#removeBtn').setDisabled(!bl);
        me.down('#cancelBtn').setDisabled(bl);
        if (bl) {
            me.down('actioncolumn').show();
        } else {
            me.down('actioncolumn').hide();
        }
    },
    onRemove: function() {
        var ds = this.store;
        for (var i = 0; i < ds.getCount(); i++) {
            var record = ds.getAt(i);
            var file_id = record.get('id');
            this.swfupload.cancelUpload(file_id, false);
        }
        ds.removeAll();
        this.swfupload.uploadStopped = false;
    },
    onCancelUpload: function() {
        if (this.swfupload) {
            this.swfupload.uploadStopped = true;
            this.swfupload.stopUpload();
            this.showBtn(this, true);
        }
    }
});

/**
 *
 * <p> Title:FileUpload EXTJS FORM</p>
 * <p> Description:  文件上传组件</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.button.UploadFile', {
    extend: 'Ext.button.Button',
    xtype: 'uploadFileBtn',
    iconCls: 'fa fa-upload fa-lw',
    text: '文件上传',
    ui: 'button-commonToolbarBtn-toolbar',
    tooltip: '<span style="font-size:12px">点击进行文件上传</span>',
    alias: 'widget.uploadFileBtn',
    requires: [
        'wys.ux.FileUpload'
    ],
    listeners: {
        click: function() {
            var me = this;
            Ext.applyIf(me.config.uploader, {
                browse_button: me.config.id || me.getId()
            });
            me.uploader = me.createUploader();
            me.uploader.initialize();
            me.relayEvents(me.uploader, [
                'beforestart',
                'uploadready',
                'uploadstarted',
                'uploadcomplete',
                'uploaderror',
                'filesadded',
                'beforeupload',
                'fileuploaded',
                'updateprogress',
                'uploadprogress',
                'storeempty'
            ]);
        }
    },
    /**
     * @private
     */
    createUploader: function() {
        return Ext.create('wys.ux.FileUpload', this, Ext.applyIf({
            listeners: {}
        }, this.initialConfig));
    }
});

/**
 * <p>功能:接受数组型参数，创建ComboBox对象。 <p>
 * @class com.gtjy.framework.ux.ArrayCombobox
 * @extends Ext.form.ComboBox
 * @author wys
 */
Ext.define('wys.combobox.ArrayCombobox', {
    extend: 'Ext.form.ComboBox',
    requires: [
        'Ext.form.ComboBox',
        'Ext.data.ArrayStore'
    ],
    alias: 'widget.ArrayCombobox',
    //别名
    arrayData: [],
    // 用户传入的数组
    cmbFields: [
        'key',
        'value'
    ],
    displayField: 'key',
    emptyText: '请选择...',
    valueField: 'value',
    isAll: false,
    listeners: {
        expand: function(field, eOpts) {
            if (this.isAll) {
                field.getStore().insert(0, new Ext.data.Record({
                    'key': '全部',
                    'value': ""
                }));
            }
        },
        collapse: function(field, o0pts) {
            if (this.isAll) {
                field.getStore().removeAt(0);
            }
        }
    },
    initComponent: function() {
        this.displayField = this.displayField , this.valueField = this.valueField , this.editable = false , this.listConfig = {
            minWidth: 160,
            emptyText: WY.local.lang.common.system_msg.notFoundData
        };
        this.queryMode = 'local' , this.store = Ext.create('Ext.data.ArrayStore', {
            fields: this.cmbFields,
            data: this.arrayData
        });
        this.callParent(arguments);
    },
    setArrayData: function(args) {
        var store = this.getStore();
        store.loadData(args);
    }
}, function() {});

/**
 * <p>功能:接受远程参数，创建ComboBox对象。 <p>
 * @class app.util.RemoteCombobox
 * @extends Ext.form.ComboBox
 * @author wys
 */
Ext.define('wys.combobox.RemoteCombobox', {
    extend: 'Ext.form.ComboBox',
    requires: [
        'Ext.form.ComboBox',
        'Ext.data.Store'
    ],
    alias: 'widget.RemoteCombobox',
    //别名
    fieldLabel: '',
    name: '',
    model: '',
    valueField: '',
    displayField: '',
    proxy_url: '',
    proxy_reader_root: '',
    storeListeners: {},
    //数据加载监听
    emptyText: '请选择...',
    isAll: false,
    loadMasRecord: false,
    //加载最大
    listeners: {
        expand: function(field, eOpts) {
            if (this.isAll) {
                field.getStore().insert(0, new Ext.data.Record({
                    'key': '全部',
                    'value': ""
                }));
            }
        },
        collapse: function(field, o0pts) {
            if (this.isAll) {
                field.getStore().removeAt(0);
            }
        }
    },
    initComponent: function() {
        this.emptyText = this.emptyText || '请选择';
        this.valueField = this.valueField;
        this.displayField = this.displayField;
        this.triggerAction = 'all';
        this.lazyRender = true;
        //		this.selectOnFocus = true;
        this.name = this.name;
        this.listConfig = {
            minWidth: 160,
            emptyText: WY.local.lang.common.system_msg.notFoundData
        };
        this.queryMode = 'local';
        this.editable = false;
        this.fieldLabel = this.fieldLabel;
        this.rootVisible = false;
        this.params = {};
        if (this.loadMasRecord) {
            this.params.limit = 9999;
        }
        this.store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            model: this.model,
            proxy: {
                type: 'ajax',
                url: this.proxy_url,
                extraParams: this.params,
                reader: {
                    type: 'json',
                    rootProperty: this.proxy_reader_root
                }
            }
        });
        this.callParent();
    }
}, function() {});

Ext.define('wys.form.HtmlEditor.Plugins', {
    extend: 'Ext.form.field.TextArea',
    alias: 'widget.myHtmlEditor',
    constructor: function() {
        this.callParent(arguments);
        //必须先构造父类对象
        Ext.Logger.info('初始化WORD文本转换器');
        app.pasterMgr = new WordPasterManager();
        app.pasterMgr.Load();
        //加载控件
        Ext.Logger.info('初始化WORD文本转换器结束');
        Ext.Logger.info('初始化C-LODOP打印控件');
        app.LODOP = getLodop(document.getElementById('SynCardOcx1'));
        Ext.Logger.info('初始化C-LODOP打印控件完成,' + app.LODOP);
    },
    editor: null,
    border: 0,
    bodyBorder: 0,
    style: 'border-width:0px;',
    initComponent: function() {
        this.callParent(arguments);
        this.on("render", function() {
            Ext.apply(this.CKConfig, {
                height: this.getHeight(),
                width: this.getWidth(),
                title: this.title,
                baseFloatZIndex: 999999,
                toolbarCanCollapse: true
            });
            this.editor = CKEDITOR.replace(this.inputEl.id, this.CKConfig);
            this.editor.title = this.title;
            this.editor.border = false;
            this.editor.name = this.name;
            //把配置中的name属性赋值给CKEditor的name属性
            this.editor.setData(this.value);
            //设置值
            //            var editorHeight = CKEDITOR.document.getById(this.name).getParent().$.offsetHeight;
            this.editor.config.height = parseInt(this.getHeight());
            this.editor.on("instanceReady", function() {
                this.fireEvent("instanceReady", this, this.editor);
                //触发instanceReady事件
                app.pasterMgr.SetEditor(this.editor);
            }, this);
        }, this);
    },
    onRender: function(ct, position) {
        if (!this.el) {
            this.defaultAutoCreate = {
                tag: 'textarea',
                autocomplete: 'off'
            };
        }
        this.callParent(arguments);
    },
    setValue: function(value) {
        var self = this;
        if (this.editor) {
            this.editor.setData(value);
        }
        this.callParent(arguments);
    },
    getRawValue: function() {
        //要覆盖getRawValue方法，否则会取不到值
        if (this.editor) {
            return this.editor.getData();
        } else {
            return '';
        }
    },
    getValue: function() {
        return this.getRawValue();
    }
});

/**
 *
 * <p> Title:MyKeyBoard.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/form)</p>
 * <p> Description:  虚拟键盘</p>
 * <p> 指定事件，当这个事件触发时，虚拟键盘显示出来，默认是focus事件</p>
 * <p> 指定是否启用按钮位置混淆，默认是true，表示每次显示出来时，位置都不一样</p>
 * <p> 有大小写转换开关，shift开关，控制录入字符的大小写</p>
 * <p> 键盘自动计算显示的位置，不必担心在浏览器边上显示不全</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.MyKeyBoard', {
    extend: 'Ext.menu.Menu',
    requires: [
        'Ext.menu.Menu',
        'Ext.container.Container'
    ],
    xtype: 'keyBoardPicker',
    alias: 'widget.keyBoardPicker',
    wander: true,
    //启用按钮位置混淆  
    upperCase: false,
    showEvents: 'focus',
    boxMinWidth: 328,
    boxMaxWidth: 328,
    height: 103,
    margin: '23 0 0 0',
    plain: true,
    autoHide: false,
    chars: {
        '`': '`',
        '1': '!',
        '2': '@',
        '3': '#',
        '4': '$',
        '5': '%',
        '6': '^',
        '7': '&',
        '8': '*',
        '9': '(',
        '0': ')',
        '-': '_',
        '=': '+',
        ',': '<',
        '.': '>',
        '/': '?',
        ';': ':',
        '\'': '"',
        '[': '{',
        ']': '}',
        '\\': '|',
        '←': '←',
        'Shift': 'Shift',
        '大写锁定': '大写锁定',
        '清空': '清空'
    },
    //Char
    posC: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
    ],
    //Number
    posN: [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9'
    ],
    //keyBoard init
    initComponent: function(field) {
        field = this.fieldWidget;
        if (!Ext.isIE) {
            this.autoWidth = true;
        }
        btns = Ext.create('Ext.container.Container', {
            ref: 'kbPanel',
            width: Ext.isIE ? 318 : 320,
            height: 103,
            style: 'margin : -2px;',
            layout: 'absolute',
            defaults: {
                width: 20
            },
            defaultType: 'button',
            items: [
                {
                    text: "1",
                    x: 2,
                    y: 3
                },
                {
                    text: "2",
                    x: 25,
                    y: 3
                },
                {
                    text: "3",
                    x: 48,
                    y: 3
                },
                {
                    text: "4",
                    x: 71,
                    y: 3
                },
                {
                    text: "5",
                    x: 94,
                    y: 3
                },
                {
                    text: "6",
                    x: 117,
                    y: 3
                },
                {
                    text: "7",
                    x: 140,
                    y: 3
                },
                {
                    text: "8",
                    x: 163,
                    y: 3
                },
                {
                    text: "9",
                    x: 186,
                    y: 3
                },
                {
                    text: "0",
                    x: 209,
                    y: 3
                },
                {
                    text: "←",
                    width: 40,
                    x: 278,
                    y: 3
                },
                {
                    text: "Shift",
                    ref: 'kbShift',
                    enableToggle: true,
                    width: 63,
                    x: 2,
                    y: 53
                },
                {
                    text: '大写锁定',
                    ref: 'kbCapsLock',
                    enableToggle: true,
                    width: 66,
                    x: 2,
                    y: 28
                },
                {
                    text: "a",
                    x: 69,
                    y: 28
                },
                {
                    text: "c",
                    x: 114,
                    y: 28
                },
                {
                    text: "b",
                    x: 91,
                    y: 28
                },
                {
                    text: "d",
                    x: 137,
                    y: 28
                },
                {
                    text: "e",
                    x: 160,
                    y: 28
                },
                {
                    text: "g",
                    x: 206,
                    y: 28
                },
                {
                    text: "f",
                    x: 183,
                    y: 28
                },
                {
                    text: "i",
                    x: 252,
                    y: 28
                },
                {
                    text: "j",
                    x: 275,
                    y: 28
                },
                {
                    text: "h",
                    x: 229,
                    y: 28
                },
                {
                    text: "k",
                    x: 298,
                    y: 28
                },
                {
                    text: "l",
                    x: 68,
                    y: 53
                },
                {
                    text: "p",
                    x: 160,
                    y: 53
                },
                {
                    text: "m",
                    x: 91,
                    y: 53
                },
                {
                    text: "n",
                    x: 114,
                    y: 53
                },
                {
                    text: "o",
                    x: 137,
                    y: 53
                },
                {
                    text: "r",
                    x: 206,
                    y: 53
                },
                {
                    text: "s",
                    x: 229,
                    y: 53
                },
                {
                    text: "t",
                    x: 252,
                    y: 53
                },
                {
                    text: "q",
                    x: 183,
                    y: 53
                },
                {
                    text: "u",
                    x: 275,
                    y: 53
                },
                {
                    text: "v",
                    x: 298,
                    y: 53
                },
                {
                    text: "w",
                    x: 68,
                    y: 78
                },
                {
                    text: "x",
                    x: 46,
                    y: 78
                },
                {
                    text: "z",
                    x: 114,
                    y: 78
                },
                {
                    text: "y",
                    x: 91,
                    y: 78
                },
                {
                    text: "清空",
                    ref: 'kbClear',
                    width: 42,
                    x: 2,
                    y: 78
                },
                {
                    text: "=",
                    x: 255,
                    y: 3
                },
                {
                    text: "-",
                    x: 232,
                    y: 3
                },
                {
                    text: "`",
                    x: 137,
                    y: 78
                },
                {
                    text: "[",
                    x: 252,
                    y: 78
                },
                {
                    text: "]",
                    x: 275,
                    y: 78
                },
                {
                    text: ";",
                    x: 160,
                    y: 78
                },
                {
                    text: "'",
                    x: 183,
                    y: 78
                },
                {
                    text: ",",
                    x: 206,
                    y: 78
                },
                {
                    text: ".",
                    x: 229,
                    y: 78
                },
                {
                    text: "/",
                    x: 298,
                    y: 78
                }
            ]
        });
        Ext.apply(this, {
            items: btns
        });
        this.doHandlers(this, field);
        this.addManagedListener(this, 'show', this.doWander, this);
        this.callParent(arguments);
    },
    doHandlers: function(this_, field) {
        var self = this;
        Ext.Array.each(this_.items.items.items, function(item) {
            item.on('click', function(obj) {
                switch (obj.text) {
                    case '大写锁定':
                        //大写锁定
                        self.doCapsLock(obj);
                        break;
                    case 'Shift':
                        self.doShift(obj);
                        break;
                    case '清空':
                        self.doClear(field);
                        break;
                    case '←':
                        self.doBackspace(field);
                        break;
                    default:
                        self.doClicked(obj, field);
                }
            }, this);
        });
        //处理事件  
        this_.on(this.showEvents, function() {
            var posArr = field.getPosition();
            var viewWidth = document.body.scrollWidth;
            //网页可见区宽度  
            var viewHeight = document.body.scrollHeight;
            //网页可见区高度  
            var posXY = [];
            if ((viewWidth - posArr[0] - field.getWidth() - 328) >= 0) {
                posXY.push(posArr[0] + field.getWidth());
                posXY.push(posArr[1]);
            } else if ((viewWidth - posArr[0] - 328) >= 0) {
                posXY.push(posArr[0]);
                var tmp = viewHeight - posArr[1] - field.getHeight() - 103;
                posXY.push(tmp >= 0 ? (posArr[1] + this.getHeight()) : (posArr[1] - 103));
            } else if ((viewWidth - posArr[0] - 328) < 0) {
                posXY.push(posArr[0] - 328);
                var tmp = viewHeight - posArr[1] - field.getHeight() - 103;
                posXY.push(tmp >= 0 ? (posArr[1] + this.getHeight()) : (posArr[1] - 103));
            } else {
                posXY = [
                    posArr[0],
                    posArr[1] + field.getHeight()
                ];
            }
            this.showAt(posXY);
        }, this);
    },
    doBackspace: function(field) {
        var oldV = field.getValue();
        var newV = oldV.substring(0, oldV.length - 1);
        field.setValue(newV);
    },
    //处理所有按钮的点击事件  
    doClicked: function(obj, field) {
        field.setValue(field.getValue() + obj.text);
    },
    //清除文本框的内容  
    doClear: function(field) {
        field.setValue('');
    },
    //点击了Shift键  
    doShift: function(obj) {
        var self = this;
        var isUp = obj.pressed;
        var regex = /^[a-z]{1}$/i;
        Ext.Array.each(this.items.items[0].items.items, function(item) {
            var txt = item.text;
            var ascii = txt.charCodeAt(0);
            if (txt.match(regex)) {
                //是字母  
                item.setText(isUp ? txt.toUpperCase() : txt.toLowerCase());
            } else {
                var tmp = self.chars[txt];
                item.setText(tmp);
                //               delete this.chars[txt];  
                self.chars[tmp] = txt;
            }
        });
    },
    //点击了CapsLock  
    doCapsLock: function(obj) {
        var isUp = obj.pressed;
        var regex = /^[a-zA-Z]{1}$/;
        Ext.Array.each(this.items.items[0].items.items, function(item) {
            console.log(item);
            var txt = item.text;
            if (txt.match(regex)) {
                item.setText(isUp ? txt.toUpperCase() : txt.toLowerCase());
            }
        });
    },
    //混淆按钮位置  
    doWander: function() {
        if (!this.wander) {
            return;
        }
        var regexC = /^[a-zA-Z]{1}$/;
        var regexN = /^\d+$/;
        var ghostC = this.posC;
        var ghostN = this.posN;
        Ext.Array.each(this.items.items.items, function(item) {
            var posxy;
            var obj = item;
            if ((obj.text.length == 1) && obj.text.match(regexC)) {
                //是字母  
                var cIndex = window.util.randomNum(0, this.posC.length - 1);
                obj.setText(this.posC[cIndex]);
                this.posC = window.util.arrayDelte(this.posC, cIndex);
            } else if (obj.text.match(regexN)) {
                //是数字  
                var nIndex = window.util.randomNum(0, this.posN.length - 1);
                obj.setText(this.posN[nIndex]);
                this.posN = window.util.arrayDelte(this.posN, nIndex);
            }
        });
        //         alert(obj.text + (obj.text.length == 1) + '\t'+this.posC.length+'\t'+this.posN.length);  
        this.posC = ghostC;
        this.posN = ghostN;
    },
    getPType: function() {
        return this.ptype;
    }
});

/**
 *
 * <p> Title:CityPicker EXTJS MODEL</p>
 * <p> Description:  系统城市选择数据视图</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.CityDataModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cityDataModel',
    data: {},
    stores: {
        //根据接口拿到citypicker的所有城市数据
        pickerCities: {
            //type: 'store',
            //field: ['province','provinceText','city','cityText'],
            //
            //autoLoad: false,
            autoLoad: true,
            data: [
                //				{"province": 650100,"city": 650100,"provinceText": "乌鲁木齐","cityText": "天山区"},
                //				{"province": 650100,"city": 652201,"provinceText": "乌鲁木齐","cityText": "沙依巴克区"},
                //				{"province": 650100,"city": 650101,"provinceText": "乌鲁木齐","cityText": "市辖区"},
                //				{"province": 650100,"city": 650102,"provinceText": "乌鲁木齐","cityText": "天山区"},
                //				{"province": 650100,"city": 650103,"provinceText": "乌鲁木齐","cityText": "沙依巴克区"},
                //				{"province": 650100,"city": 650104,"provinceText": "乌鲁木齐","cityText": "新市区"},
                //				{"province": 650100,"city": 650105,"provinceText": "乌鲁木齐","cityText": "水磨沟区"},
                //				{"province": 650100,"city": 650106,"provinceText": "乌鲁木齐","cityText": "头屯河区"},
                //				{"province": 650100,"city": 650107,"provinceText": "乌鲁木齐","cityText": "达坂城区"},
                //				{"province": 650100,"city": 650109,"provinceText": "乌鲁木齐","cityText": "米东区"},
                //				{"province": 650100,"city": 650121,"provinceText": "乌鲁木齐","cityText": "乌鲁木齐县"},
                //				
                //				{"province": 650200,"city": 650201,"provinceText": "克拉玛依市","cityText": "市辖区"},
                //				{"province": 650200,"city": 650202,"provinceText": "克拉玛依市","cityText": "独山子区"},
                //				{"province": 650200,"city": 650203,"provinceText": "克拉玛依市","cityText": "克拉玛依区"},
                //				{"province": 650200,"city": 650204,"provinceText": "克拉玛依市","cityText": "白碱滩区"},
                //				{"province": 650200,"city": 650205,"provinceText": "克拉玛依市","cityText": "乌尔禾区"},
                //				    
                //				          　　	         　
                //				{"province": 650400,"city": 650402,"provinceText": "吐鲁番市","cityText": "高昌区"},
                //				{"province": 650400,"city": 650421,"provinceText": "吐鲁番市","cityText": "鄯善县"},
                //				{"province": 650400,"city": 650422,"provinceText": "吐鲁番市","cityText": "托克逊县"},
                //				
                //				       　　
                //				{"province": 650500,"city": 650502,"provinceText": "哈密市","cityText": "伊州区"},
                //				{"province": 650500,"city": 650521,"provinceText": "哈密市","cityText": "巴里坤哈萨克自治县"},
                //				{"province": 650500,"city": 650522,"provinceText": "哈密市","cityText": "伊吾县"},
                //				
                //				{"province": 652300,"city": 652301,"provinceText": "昌吉回族自治州","cityText": "昌吉市"},
                //				{"province": 652300,"city": 652302,"provinceText": "昌吉回族自治州","cityText": "阜康市"},
                //				{"province": 652300,"city": 652323,"provinceText": "昌吉回族自治州","cityText": "呼图壁县"},
                //				{"province": 652300,"city": 652324,"provinceText": "昌吉回族自治州","cityText": "玛纳斯县"},
                //				{"province": 652300,"city": 652325,"provinceText": "昌吉回族自治州","cityText": "奇台县"},
                //				{"province": 652300,"city": 652327,"provinceText": "昌吉回族自治州","cityText": "吉木萨尔县"},
                //				{"province": 652300,"city": 652328,"provinceText": "昌吉回族自治州","cityText": "木垒哈萨克自治县"},
                //				     　　
                //				{"province": 652700,"city": 652701,"provinceText": "博尔塔拉蒙古自治州","cityText": "博乐市"},
                //				{"province": 652700,"city": 652702,"provinceText": "博尔塔拉蒙古自治州","cityText":"阿拉山口市"},
                //				{"province": 652700,"city": 652722,"provinceText": "博尔塔拉蒙古自治州","cityText":"精河县"},
                //				{"province": 652700,"city": 652723,"provinceText": "博尔塔拉蒙古自治州","cityText":"温泉县"},
                //				
                //				{"province": 652800,"city": 652801,"provinceText": "巴音郭楞蒙古自治州","cityText": "库尔勒市"},
                //				{"province": 652800,"city": 652822,"provinceText": "巴音郭楞蒙古自治州","cityText": "轮台县"},
                //				{"province": 652800,"city": 652823,"provinceText": "巴音郭楞蒙古自治州","cityText": "尉犁县"},
                //				{"province": 652800,"city": 652824,"provinceText": "巴音郭楞蒙古自治州","cityText": "若羌县"},
                //				{"province": 652800,"city": 652825,"provinceText": "巴音郭楞蒙古自治州","cityText": "且末县"},
                //				{"province": 652800,"city": 652826,"provinceText": "巴音郭楞蒙古自治州","cityText": "焉耆回族自治县"},
                //				{"province": 652800,"city": 652827,"provinceText": "巴音郭楞蒙古自治州","cityText": "和静县"},
                //				{"province": 652800,"city": 652828,"provinceText": "巴音郭楞蒙古自治州","cityText": "和硕县"},
                //				{"province": 652800,"city": 652829,"provinceText": "巴音郭楞蒙古自治州","cityText": "博湖县"},
                //				        　
                //				{"province": 652900,"city": 652901,"provinceText": "阿克苏地区","cityText": "阿克苏市"},
                //				{"province": 652900,"city": 652922,"provinceText": "阿克苏地区","cityText": "温宿县"},
                //				{"province": 652900,"city": 652923,"provinceText": "阿克苏地区","cityText": "库车县"},
                //				{"province": 652900,"city": 652924,"provinceText": "阿克苏地区","cityText": "沙雅县"},
                //				{"province": 652900,"city": 652925,"provinceText": "阿克苏地区","cityText": "新和县"},
                //				{"province": 652900,"city": 652926,"provinceText": "阿克苏地区","cityText": "拜城县"},
                //				{"province": 652900,"city": 652927,"provinceText": "阿克苏地区","cityText": "乌什县"},
                //				{"province": 652900,"city": 652928,"provinceText": "阿克苏地区","cityText": "阿瓦提县"},
                //				{"province": 652900,"city": 652929,"provinceText": "阿克苏地区","cityText": "柯坪县"},
                //				        　
                //				{"province": 653000,"city": 653001,"provinceText": "克孜勒苏柯尔克孜自治州","cityText": "阿图什市"},
                //				{"province": 653000,"city": 653022,"provinceText": "克孜勒苏柯尔克孜自治州","cityText": "阿克陶县"},
                //				{"province": 653000,"city": 653023,"provinceText": "克孜勒苏柯尔克孜自治州","cityText": "阿合奇县"},
                //				{"province": 653000,"city": 653024,"provinceText": "克孜勒苏柯尔克孜自治州","cityText": "乌恰县"},
                //				        　
                //				{"province": 653100,"city": 653101,"provinceText": "喀什地区","cityText": "喀什市"},
                //				{"province": 653100,"city": 653121,"provinceText": "喀什地区","cityText": "疏附县"},
                //				{"province": 653100,"city": 653122,"provinceText": "喀什地区","cityText": "疏勒县"},
                //				{"province": 653100,"city": 653123,"provinceText": "喀什地区","cityText": "英吉沙县"},
                //				{"province": 653100,"city": 653124,"provinceText": "喀什地区","cityText": "泽普县"},
                //				{"province": 653100,"city": 653125,"provinceText": "喀什地区","cityText": "莎车县"},
                //				{"province": 653100,"city": 653126,"provinceText": "喀什地区","cityText": "叶城县"},
                //				{"province": 653100,"city": 653127,"provinceText": "喀什地区","cityText": "麦盖提县"},
                //				{"province": 653100,"city": 653128,"provinceText": "喀什地区","cityText": "岳普湖县"},
                //				{"province": 653100,"city": 653129,"provinceText": "喀什地区","cityText": "伽师县"},
                //				{"province": 653100,"city": 653130,"provinceText": "喀什地区","cityText": "巴楚县"},
                //				{"province": 653100,"city": 653131,"provinceText": "喀什地区","cityText": "塔什库尔干塔吉克自治县"},
                //				        　
                {
                    "province": 653200,
                    "city": 653201,
                    "provinceText": "和田地区",
                    "cityText": "和田市"
                },
                {
                    "province": 653200,
                    "city": 653221,
                    "provinceText": "和田地区",
                    "cityText": "和田县"
                },
                {
                    "province": 653200,
                    "city": 653222,
                    "provinceText": "和田地区",
                    "cityText": "墨玉县"
                },
                {
                    "province": 653200,
                    "city": 653223,
                    "provinceText": "和田地区",
                    "cityText": "皮山县"
                },
                {
                    "province": 653200,
                    "city": 653224,
                    "provinceText": "和田地区",
                    "cityText": "洛浦县"
                },
                {
                    "province": 653200,
                    "city": 653225,
                    "provinceText": "和田地区",
                    "cityText": "策勒县"
                },
                {
                    "province": 653200,
                    "city": 653226,
                    "provinceText": "和田地区",
                    "cityText": "于田县"
                },
                {
                    "province": 653200,
                    "city": 653227,
                    "provinceText": "和田地区",
                    "cityText": "民丰县"
                }
            ]
        }
    }
});
/*,
				       　
				{"province": 654000 ,"city": 654002,"provinceText": "伊犁哈萨克自治州","cityText": "伊宁市"},
				{"province": 654000 ,"city": 654003,"provinceText": "伊犁哈萨克自治州","cityText": "奎屯市"},
				{"province": 654000 ,"city": 654004,"provinceText": "伊犁哈萨克自治州","cityText": "霍尔果斯市"},
				{"province": 654000 ,"city": 654021,"provinceText": "伊犁哈萨克自治州","cityText": "伊宁县"},
				{"province": 654000 ,"city": 654022,"provinceText": "伊犁哈萨克自治州","cityText": "察布查尔锡伯自治县"},
				{"province": 654000 ,"city": 654023,"provinceText": "伊犁哈萨克自治州","cityText": "霍城县"},
				{"province": 654000 ,"city": 654024,"provinceText": "伊犁哈萨克自治州","cityText": "巩留县"},
				{"province": 654000 ,"city": 654025,"provinceText": "伊犁哈萨克自治州","cityText": "新源县"},
				{"province": 654000 ,"city": 654026,"provinceText": "伊犁哈萨克自治州","cityText": "昭苏县"},
				{"province": 654000 ,"city": 654027,"provinceText": "伊犁哈萨克自治州","cityText": "特克斯县"},
				{"province": 654000 ,"city": 654028,"provinceText": "伊犁哈萨克自治州","cityText": "尼勒克县"},
				        　
				{"province": 654200 ,"city": 654201,"provinceText": "塔城地区","cityText": "塔城市"},
				{"province": 654200 ,"city": 654202,"provinceText": "塔城地区","cityText": "乌苏市"},
				{"province": 654200 ,"city": 654221,"provinceText": "塔城地区","cityText": "额敏县"},
				{"province": 654200 ,"city": 654223,"provinceText": "塔城地区","cityText": "沙湾县"},
				{"province": 654200 ,"city": 654224,"provinceText": "塔城地区","cityText": "托里县"},
				{"province": 654200 ,"city": 654225,"provinceText": "塔城地区","cityText": "裕民县"},
				{"province": 654200 ,"city": 654226,"provinceText": "塔城地区","cityText": "和布克赛尔蒙古自治县"},
				        　
				{"province": 654300 ,"city": 654301,"provinceText": "阿勒泰地区","cityText": "阿勒泰市"},　　
				{"province": 654300 ,"city": 654321,"provinceText": "阿勒泰地区","cityText": "布尔津县"},
				{"province": 654300 ,"city": 654322,"provinceText": "阿勒泰地区","cityText": "富蕴县"},
				{"province": 654300 ,"city": 654323,"provinceText": "阿勒泰地区","cityText": "福海县"},
				{"province": 654300 ,"city": 654324,"provinceText": "阿勒泰地区","cityText": "哈巴河县"},
				{"province": 654300 ,"city": 654325,"provinceText": "阿勒泰地区","cityText": "青河县"},
				{"province": 654300 ,"city": 654326,"provinceText": "阿勒泰地区","cityText": "吉木乃县"},
				        　
				{"province": 659000 ,"city": 659001,"provinceText": "自治区直辖县级行政区划","cityText": "石河子市"},
				{"province": 659000 ,"city": 659002,"provinceText": "自治区直辖县级行政区划","cityText": "阿拉尔市"},
				{"province": 659000 ,"city": 659003,"provinceText": "自治区直辖县级行政区划","cityText": "图木舒克市"},
				{"province": 659000 ,"city": 659004,"provinceText": "自治区直辖县级行政区划","cityText": "五家渠市"},
				{"province": 659000 ,"city": 659006,"provinceText": "自治区直辖县级行政区划","cityText": "铁门关市"}*/

/**
 *
 * <p> Title:CityForm EXTJS MODEL</p>
 * <p> Description:  系统城市选择控件数据项</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.CityForm', {
    extend: 'Ext.view.BoundList',
    xtype: 'cityForm',
    cls: 'citypickerwindow',
    currentDataType: 'province',
    storeOriginal: null,
    //comboPicker所使用的所有城市的store
    statics: {
        province: {
            'A~G': [
                {
                    "province": "654300",
                    "provinceText": "阿勒泰地区"
                },
                {
                    "province": "652900",
                    "provinceText": "阿克苏地区"
                },
                {
                    "province": "652300",
                    "provinceText": "昌吉回族自治州"
                },
                {
                    "province": "652800",
                    "provinceText": "巴音郭楞蒙古自治州"
                },
                {
                    "province": "652700",
                    "provinceText": "博尔塔拉蒙古自治州"
                }
            ],
            'H~M': [
                {
                    "province": "653200",
                    "provinceText": "和田地区"
                },
                {
                    "province": "650500",
                    "provinceText": "哈密市"
                },
                {
                    "province": "653000",
                    "provinceText": " 克孜勒苏柯尔克孜自治州"
                },
                {
                    "province": "653100",
                    "provinceText": "喀什地区"
                }
            ],
            'N~S': [
                {
                    "province": "654200",
                    "provinceText": "塔城地区"
                }
            ],
            'T~Z': [
                {
                    "province": "650100",
                    "provinceText": "乌鲁木齐市"
                },
                {
                    "province": "650200",
                    "provinceText": "克拉玛依市"
                },
                {
                    "province": "654000",
                    "provinceText": "伊犁哈萨克自治州"
                },
                {
                    "province": "650400",
                    "provinceText": "吐鲁番市"
                },
                {
                    "province": "659000",
                    "provinceText": "自治区直辖县级行政区划"
                }
            ]
        }
    },
    provinceData: null,
    initComponent: function() {
        var me = this;
        me.renderTpl = [
            '<div id="{id}-listWrap" data-ref="listWrap"',
            ' class="{baseCls}-list-ct ',
            Ext.dom.Element.unselectableCls,
            '">',
            '<table id="{id}-listEl" data-ref="listEl" class="',
            Ext.baseCSSPrefix,
            'list-plain" style="width:' + me.width + 'px;"',
            '<tpl foreach="ariaAttributes"> {$}="{.}"</tpl>',
            '>',
            '</table>',
            '</div>',
            '{%',
            'var pagingToolbar=values.$comp.pagingToolbar;',
            'if (pagingToolbar) {',
            'Ext.DomHelper.generateMarkup(pagingToolbar.getRenderTree(), out);',
            '}',
            '%}',
            {
                disableFormats: true
            }
        ] , me.tpl = [
            '<tr><td colspan="2"><div class="provinceIndicator active" style="width:' + me.width * 0.49 + 'px;">省份</div><div class="cityIndicator"  style="width:' + me.width * 0.49 + 'px;">城市</div></td></tr>',
            '<tpl for=".">',
            '{html}',
            '</tpl>'
        ];
        me.store = {
            type: 'store',
            autoLoad: true,
            sortOnLoad: false,
            field: [
                'id',
                'value',
                'isProvince',
                'province',
                'provinceText'
            ]
        };
        me.callParent(arguments);
    },
    onItemClick: function(record) {
        var me = this,
            pickerField = me.pickerField,
            selMode = me.getSelectionModel();
        if (me.currentDataType == "city") {
            me.currentDataType = "province";
            if (record.get("isProvince") !== true) {
                pickerField.collapse();
                pickerField.setValue(record.get("id"));
                var cityRecord = record;
                cityRecord.set("city", record.get("id"));
                cityRecord.set("cityText", record.get("value"));
                //为构建新的对象发给处理函数
                pickerField.fireEvent("select", pickerField, cityRecord);
            }
            //触发picker的select事件
            me.store.loadData(me.provinceData);
            Ext.get(Ext.query("*[class*=provinceIndicator]")[0]).setCls("provinceIndicator active");
            Ext.get(Ext.query("*[class*=cityIndicator]")[0]).setCls("cityIndicator");
        } else {
            me.currentDataType = "city";
            var id = record.get("id"),
                value = record.get("value"),
                storeOriginal = me.storeOriginal,
                city = [
                    {
                        isProvince: true,
                        id: id,
                        value: value
                    }
                ];
            //清除store的filter 否则选择称时候再次选择其他城市会出现问题没有城市的问题。
            storeOriginal.clearFilter();
            storeOriginal.each(function(record) {
                if (record.get("province") == id) {
                    city.push({
                        isProvince: false,
                        id: record.get("city"),
                        value: record.get("cityText"),
                        province: record.get("province"),
                        provinceText: record.get("provinceText")
                    });
                }
            });
            var len = city.length;
            for (var i = 0; i < len; i++) {
                var html = '';
                if (i == 0) {
                    html += '<tr><td>';
                    html += '<span class="x-boundlist-item" style="font-weight:bold;color:#54a1f3;">' + city[i].value + '</span>';
                } else {
                    html += '<span class="x-boundlist-item"  style="display:inline-block;">' + city[i].value + '</span>';
                }
                if ((i + 1) == len)  {
                    html += '</td></tr>';
                }
                
                city[i].html = html;
            }
            me.store.loadData(city);
            Ext.get(Ext.query("*[class*=provinceIndicator]")[0]).setCls("provinceIndicator");
            Ext.get(Ext.query("*[class*=cityIndicator]")[0]).setCls("cityIndicator active");
        }
        if (selMode)  {
            selMode.deselectAll();
        }
        
    },
    initData: function(store) {
        var me = this;
        me.storeOriginal = store , proviceOriginal = wys.form.field.CityForm.province , proviceList = {};
        me.currentDataType = "province";
        me.storeOriginal.clearFilter();
        for (var key in proviceOriginal) {
            Ext.each(proviceOriginal[key], function(p) {
                store.each(function(record) {
                    if (record.get("province") == p["province"]) {
                        var item = proviceList[key];
                        if (!item)  {
                            item = proviceList[key] = [];
                        }
                        
                        item.push({
                            isProvince: true,
                            id: record.get("province"),
                            value: record.get("provinceText")
                        });
                        return false;
                    }
                });
            });
        }
        var data = [];
        for (var key in proviceList) {
            var group = proviceList[key],
                len = group.length;
            if (len == 0)  {
                
                continue;
            }
            
            var html = '';
            for (var i = 0; i < len; i++) {
                html = '';
                if (i == 0) {
                    html += '<tr><td width="60">' + key + '</td><td>';
                }
                html += '<span class="x-boundlist-item">' + group[i].value + '</span>';
                if ((i + 1) == len)  {
                    html += '</td></tr>';
                }
                
                data.push(Ext.apply({
                    html: html
                }, group[i]));
            }
        }
        me.provinceData = data;
        me.store.loadData(data);
    }
});

/**
 *
 * <p> Title:CityPicker EXTJS MODEL</p>
 * <p> Description:  系统城市选择控件</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.CityPicker', {
    extend: 'Ext.form.field.Picker',
    xtype: 'cityPicker',
    alias: 'widget.cityPicker',
    requires: [
        'Ext.view.BoundList',
        'wys.form.field.CityDataModel',
        'wys.form.field.CityForm',
        'Ext.util.DelayedTask',
        'Ext.data.StoreManager'
    ],
    mixins: [
        'Ext.util.StoreHolder'
    ],
    viewModel: 'cityDataModel',
    bind: {
        store: '{pickerCities}',
        readOnly: "{readOnly}"
    },
    comboPicker: null,
    formPicker: null,
    config: {
        filters: null,
        selection: null,
        valueNotFoundText: null,
        displayTpl: false,
        delimiter: ', ',
        displayField: 'displayName'
    },
    publishes: [
        'selection'
    ],
    twoWayBindable: [
        'selection'
    ],
    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',
    hiddenName: '',
    collapseOnSelect: false,
    hiddenDataCls: Ext.baseCSSPrefix + 'hidden-display ' + Ext.baseCSSPrefix + 'form-data-hidden',
    ariaRole: 'combobox',
    childEls: {
        'hiddenDataEl': true
    },
    filtered: false,
    afterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.setHiddenValue(me.value);
    },
    multiSelect: false,
    //triggerAction: 'all',
    valueField: 'city',
    displayField: 'cityText',
    queryMode: 'local',
    allowBlank: false,
    allQuery: '',
    queryParam: 'query',
    queryCaching: true,
    autoLoadOnValue: false,
    pageSize: 0,
    autoSelect: true,
    typeAhead: false,
    typeAheadDelay: 250,
    selectOnTab: true,
    forceSelection: false,
    growToLongestValue: true,
    clearFilterOnBlur: true,
    hideTrigger: true,
    //隐藏trigger
    defaultListConfig: {
        loadingHeight: 70,
        minWidth: 70,
        maxHeight: 500,
        shadow: 'sides'
    },
    matchFieldWidth: false,
    listConfig: {
        minWidth: 300,
        maxHeight: 600
    },
    transformInPlace: true,
    clearValueOnEmpty: true,
    getGrowWidth: function() {
        var me = this,
            value = me.inputEl.dom.value,
            field, store, dataLn, currentLongestLength, i, item, itemLn;
        if (me.growToLongestValue) {
            field = me.displayField;
            store = me.store;
            dataLn = store.data.length;
            currentLongestLength = 0;
            for (i = 0; i < dataLn; i++) {
                item = store.getAt(i).data[field];
                itemLn = item.length;
                // Compare the current item's length with the current longest length and store the value.
                if (itemLn > currentLongestLength) {
                    currentLongestLength = itemLn;
                    value = item;
                }
            }
        }
        return value;
    },
    initComponent: function() {
        var me = this,
            isDefined = Ext.isDefined,
            store = me.store,
            transform = me.transform,
            transformSelect, isLocalMode;
        if (me.typeAhead && me.multiSelect) {
            Ext.raise('typeAhead and multiSelect are mutually exclusive options -- please remove one of them.');
        }
        if (me.typeAhead && !me.editable) {
            Ext.raise('If typeAhead is enabled the combo must be editable: true -- please change one of those settings.');
        }
        if (me.selectOnFocus && !me.editable) {
            Ext.raise('If selectOnFocus is enabled the combo must be editable: true -- please change one of those settings.');
        }
        // Check for presence of deprecated pinList config, and convert it to collapseOnSelect
        if ('pinList' in me) {
            me.collapseOnSelect = !me.pinList;
        }
        // Build store from 'transform' HTML select element's options
        if (transform) {
            transformSelect = Ext.getDom(transform);
            if (transformSelect) {
                if (!me.store) {
                    store = Ext.Array.map(Ext.Array.from(transformSelect.options), function(option) {
                        return [
                            option.value,
                            option.text
                        ];
                    });
                }
                if (!me.name) {
                    me.name = transformSelect.name;
                }
                if (!('value' in me)) {
                    me.value = transformSelect.value;
                }
            }
        }
        me.bindStore(store || 'ext-empty-store', true, true);
        isLocalMode = me.queryMode === 'local';
        if (!isDefined(me.queryDelay)) {
            me.queryDelay = isLocalMode ? 10 : 500;
        }
        if (!isDefined(me.minChars)) {
            me.minChars = isLocalMode ? 0 : 4;
        }
        me.callParent();
        me.doQueryTask = new Ext.util.DelayedTask(me.doRawQuery, me);
        // render in place of 'transform' select
        if (transformSelect) {
            if (me.transformInPlace) {
                me.render(transformSelect.parentNode, transformSelect);
                delete me.renderTo;
            }
            Ext.removeNode(transformSelect);
        }
        me.on('focus', me.$onOnFocus, me);
        me.on('keyup', me.$onKeyup, me);
    },
    $onOnFocus: function() {
        var me = this;
        if (me.readOnly)  {
            //只读的时候不能出现 picker
            return;
        }
        
        if (me.formPicker) //获得焦点时 默认指定formpicker
        {
            me.picker = me.formPicker;
            me.formPicker.initData(me.store);
        }
        me.expand();
        if (me.inputEl) {
            me.inputEl.un('mousedown', me.$onMousedown, me);
            me.inputEl.on('mousedown', me.$onMousedown, me);
        }
    },
    $onMousedown: function() {
        var me = this;
        if (!me.isExpanded) {
            if (me.formPicker) //获得焦点时 默认指定formpicker
            {
                me.picker = me.formPicker;
                me.formPicker.initData(me.store);
            }
            me.expand();
        }
    },
    $onKeyup: function() {
        var me = this,
            inputValue = me.getRawValue();
        if (inputValue != null && inputValue != "") {
            if (me.picker != me.comboPicker) {
                //当输入时 如果有值 显示combopicker
                me.collapse();
                me.picker = me.comboPicker;
                me.expand();
            }
        } else {
            if (me.picker != me.formPicker) {
                //当输入时 如果没有值 显示formPicker
                me.collapse();
                me.picker = me.formPicker;
                me.formPicker.initData(me.store);
                this.expand();
            }
        }
    },
    getSubTplData: function(fieldData) {
        var data, inputElAttr;
        data = this.callParent([
            fieldData
        ]);
        inputElAttr = data.inputElAriaAttributes;
        if (inputElAttr) {
            // TODO Change that to reflect the real behavior
            inputElAttr['aria-autocomplete'] = 'list';
        }
        return data;
    },
    getSubTplMarkup: function(fieldData) {
        var me = this,
            hiddenDataElMarkup = '',
            markup = me.callParent(arguments);
        if (me.hiddenName) {
            hiddenDataElMarkup = '<div id="' + fieldData.id + '-hiddenDataEl" data-ref="hiddenDataEl" class="' + me.hiddenDataCls + '" role="presentation"></div>';
        }
        return hiddenDataElMarkup + markup;
    },
    applyDisplayTpl: function(displayTpl) {
        var me = this;
        if (!displayTpl) {
            displayTpl = new Ext.XTemplate('<tpl for=".">' + '{[typeof values === "string" ? values : values["' + me.getDisplayField() + '"]]}' + '<tpl if="xindex < xcount">' + me.getDelimiter() + '</tpl>' + '</tpl>');
        } else if (!displayTpl.isTemplate) {
            displayTpl = new Ext.XTemplate(displayTpl);
        }
        return displayTpl;
    },
    applyFilters: function(filters, collection) {
        var me = this;
        if (filters === null || filters.isFilterCollection) {
            return filters;
        }
        if (filters) {
            if (!collection) {
                collection = this.getFilters();
            }
            collection.beginUpdate();
            collection.splice(0, collection.length, filters);
            collection.each(function(filter) {
                filter.ownerId = me.id;
            });
            collection.endUpdate();
        }
        return collection;
    },
    applyValueNotFoundText: function(v) {
        var me = this,
            valueNotFoundRecord = me.valueNotFoundRecord || (me.valueNotFoundRecord = new Ext.data.Model());
        valueNotFoundRecord.set(me.displayField, v);
        if (me.valueField && me.displayField !== me.valueField) {
            valueNotFoundRecord.set(me.valueField, v);
        }
        return v;
    },
    getFilters: function(autoCreate) {
        var ret = this.filters;
        if (!ret && autoCreate !== false) {
            ret = new Ext.util.FilterCollection();
            this.setFilters(ret);
        }
        return ret;
    },
    updateFilters: function(newFilters, oldFilters) {
        var me = this;
        if (oldFilters) {
            oldFilters.un('endupdate', 'onEndUpdateFilters', me);
        }
        if (newFilters) {
            newFilters.on('endupdate', 'onEndUpdateFilters', me);
        }
        me.onEndUpdateFilters(newFilters);
    },
    onEndUpdateFilters: function(filters) {
        var me = this,
            was = me.filtered,
            is = !!filters && (filters.length > 0),
            // booleanize filters
            old, storeFilters;
        if (was || is) {
            me.filtered = is;
            old = [];
            storeFilters = me.store.getFilters();
            storeFilters.each(function(filter) {
                if (filter.ownerId === me.id && !filters.contains(filter)) {
                    old.push(filter);
                }
            });
            storeFilters.splice(0, old, filters.items);
        }
    },
    completeEdit: function(e) {
        var me = this,
            filter = me.queryFilter;
        this.callParent([
            e
        ]);
        me.doQueryTask.cancel();
        me.assertValue();
        if (filter && me.queryMode === 'local' && me.clearFilterOnBlur) {
            me.getStore().getFilters().remove(filter);
        }
    },
    onFocus: function(e) {
        var me = this;
        me.callParent([
            e
        ]);
        if (me.triggerAction !== 'all' && me.queryFilter && me.queryMode === 'local' && me.clearFilterOnBlur) {
            delete me.lastQuery;
            me.doRawQuery();
        }
    },
    /**
     * @private
     */
    assertValue: function() {
        var me = this,
            value = me.getRawValue(),
            displayValue = me.getDisplayValue(),
            lastRecords = me.lastSelectedRecords,
            rec;
        if (me.forceSelection) {
            if (me.multiSelect) {
                // For multiselect, check that the current displayed value matches the current
                // selection, if it does not then revert to the most recent selection.
                if (value !== displayValue) {
                    me.setRawValue(displayValue);
                }
            } else {
                // For single-select, match the displayed value to a record and select it,
                // if it does not match a record then revert to the most recent selection.
                rec = me.findRecordByDisplay(value);
                if (rec) {
                    // Prevent an issue where we have duplicate display values with
                    // different underlying values.
                    if (me.getDisplayValue([
                        me.getRecordDisplayData(rec)
                    ]) !== displayValue) {
                        me.select(rec, true);
                    }
                } else if (lastRecords) {
                    me.setValue(lastRecords);
                } else {
                    // We need to reset any value that could have been set in the dom before or during a store load
                    // for remote combos.  If we don't reset this, then ComboBox#getValue() will think that the value
                    // has changed and will then set `undefined` as the .value for forceSelection combos.  This then
                    // gets changed AGAIN to `null`, which will get set into the model field for editors. This is BAD.
                    me.setRawValue('');
                }
            }
        }
        me.collapse();
    },
    onTypeAhead: function() {
        var me = this,
            displayField = me.displayField,
            record = me.store.findRecord(displayField, me.getRawValue()),
            boundList = me.getPicker(),
            newValue, len, selStart;
        if (record) {
            newValue = record.get(displayField);
            len = newValue.length;
            selStart = me.getRawValue().length;
            boundList.highlightItem(boundList.getNode(record));
            if (selStart !== 0 && selStart !== len) {
                me.setRawValue(newValue);
                me.selectText(selStart, newValue.length);
            }
        }
    },
    // invoked when a different store is bound to this combo
    // than the original
    resetToDefault: Ext.emptyFn,
    beforeReset: function() {
        var filter = this.queryFilter;
        this.callParent();
        if (filter) {
            this.getStore().getFilters().remove(filter);
        }
    },
    onUnbindStore: function() {
        var me = this,
            picker = me.picker,
            filter = me.queryFilter;
        // If we'd added a local filter, remove it.
        // Listeners are unbound, so we don't need the changingFilters flag
        if (filter && !me.store.destroyed) {
            me.changingFilters = true;
            me.getStore().removeFilter(filter, true);
            me.changingFilters = false;
        }
        me.pickerSelectionModel.destroy();
        if (picker) {
            picker.bindStore(null);
        }
    },
    onBindStore: function(store, initial) {
        var me = this,
            comboPicker = me.comboPicker,
            extraKeySpec, valueCollectionConfig;
        // We're being bound, not unbound...
        if (store) {
            // If store was created from a 2 dimensional array with generated field names 'field1' and 'field2'
            if (store.autoCreated) {
                me.queryMode = 'local';
                me.valueField = me.displayField = 'field1';
                if (!store.expanded) {
                    me.displayField = 'field2';
                }
                // displayTpl config will need regenerating with the autogenerated displayField name 'field1'
                me.setDisplayTpl(null);
            }
            if (!Ext.isDefined(me.valueField)) {
                me.valueField = me.displayField;
            }
            extraKeySpec = {
                byValue: {
                    rootProperty: 'data',
                    unique: false
                }
            };
            extraKeySpec.byValue.property = me.valueField;
            store.setExtraKeys(extraKeySpec);
            if (me.displayField === me.valueField) {
                store.byText = store.byValue;
            } else {
                extraKeySpec.byText = {
                    rootProperty: 'data',
                    unique: false
                };
                extraKeySpec.byText.property = me.displayField;
                store.setExtraKeys(extraKeySpec);
            }
            // We hold a collection of the values which have been selected, keyed by this field's valueField.
            // This collection also functions as the selected items collection for the BoundList's selection model
            valueCollectionConfig = {
                rootProperty: 'data',
                extraKeys: {
                    byInternalId: {
                        property: 'internalId'
                    },
                    byValue: {
                        property: me.valueField,
                        rootProperty: 'data'
                    }
                },
                // Whenever this collection is changed by anyone, whether by this field adding to it,
                // or the BoundList operating, we must refresh our value.
                listeners: {
                    beginupdate: me.onValueCollectionBeginUpdate,
                    endupdate: me.onValueCollectionEndUpdate,
                    scope: me
                }
            };
            // This becomes our collection of selected records for the Field.
            me.valueCollection = new Ext.util.Collection(valueCollectionConfig);
            // This is the selection model we configure into the dropdown BoundList.
            // We use the selected Collection as our value collection and the basis
            // for rendering the tag list.
            me.pickerSelectionModel = new Ext.selection.DataViewModel({
                mode: me.multiSelect ? 'SIMPLE' : 'SINGLE',
                deselectOnContainerClick: false,
                enableInitialSelection: false,
                pruneRemoved: false,
                selected: me.valueCollection,
                store: store,
                listeners: {
                    scope: me,
                    lastselectedchanged: me.updateBindSelection
                }
            });
            if (!initial) {
                me.resetToDefault();
            }
            if (comboPicker) {
                comboPicker.setSelectionModel(me.pickerSelectionModel);
                if (comboPicker.getStore() !== store) {
                    comboPicker.bindStore(store);
                }
            }
        }
    },
    bindStore: function(store, preventFilter, /* private */
    initial) {
        var me = this,
            filter = me.queryFilter;
        me.mixins.storeholder.bindStore.call(me, store, initial);
        store = me.getStore();
        if (store && filter && !preventFilter) {
            store.getFilters().add(filter);
        }
        if (!initial && store && !store.isEmptyStore) {
            me.setValueOnData();
        }
    },
    getStoreListeners: function(store) {
        // Don't bother with listeners on the dummy store that is provided for an unconfigured ComboBox
        // prior to a real store arriving from a ViewModel. Nothing is ever going to be fired.
        if (!store.isEmptyStore) {
            var me = this,
                result = {
                    datachanged: me.onDataChanged,
                    load: me.onLoad,
                    exception: me.onException,
                    update: me.onStoreUpdate,
                    remove: me.checkValueOnChange
                };
            // If we are doing remote filtering, then mutating the store's filters should not
            // result in a re-evaluation of whether the current value is still present in the store.
            if (!store.getRemoteFilter()) {
                result.filterchange = me.checkValueOnChange;
            }
            return result;
        }
    },
    onDataChanged: function() {
        if (this.grow && this.growToLongestValue) {
            this.autoSize();
        }
    },
    checkValueOnChange: function() {
        var me = this;
        // Will be triggered by removal of filters upon destroy
        if (!me.destroying && me.getStore().isLoaded()) {
            // If multiselecting and the base store is modified, we may have to remove records from the valueCollection
            // if they have gone from the base store, or update the rawValue if selected records are mutated.
            // TODO: 5.1.1: Use a ChainedStore for multiSelect so that selected records are not filtered out of the
            // base store and are able to be removed.
            // See https://sencha.jira.com/browse/EXTJS-16096
            if (me.multiSelect) {} else // TODO: Implement in 5.1.1 when selected records are available for modification and not filtered out.
            // valueCollection must be in sync with what's available in the base store, and rendered rawValue/tags
            // must match any updated data.
            {
                if (me.forceSelection && !me.changingFilters && !me.findRecordByValue(me.value)) {
                    me.setValue(null);
                }
            }
        }
    },
    onStoreUpdate: function(store, record) {
        // Ensure the rawValue is rendered correctly whenever a store record is mutated
        this.updateValue();
    },
    onException: function() {
        this.collapse();
    },
    onLoad: function(store, records, success) {
        var me = this,
            // This flag is saying that we need to call setValue to match the value property with the
            // just loaded record set and update the valueCollection (and thereby any bound ViewModel)
            // with that matched record.
            needsValueUpdating = !me.valueCollection.byValue.get(me.value);
        // If not returning from a query, and the value was set from a raw data value, unrelated to a record
        // because the displayField was not honoured when calculating the raw value, then we update
        // the raw value.
        if (success && needsValueUpdating && !(store.lastOptions && 'rawQuery' in store.lastOptions)) {
            me.setValueOnData();
        }
        // This synchronizes the value based upon contents of the store
        me.checkValueOnChange();
    },
    setValueOnData: function() {
        var me = this;
        me.setValue(me.value);
        // Highlight the selected record
        if (me.isExpanded && me.getStore().getCount()) {
            me.doAutoSelect();
        }
    },
    /**
     * @private
     * Execute the query with the raw contents within the textfield.
     */
    doRawQuery: function() {
        var me = this,
            rawValue = me.inputEl.dom.value;
        // Use final bit after comma as query value if multiselecting
        if (me.multiSelect) {
            rawValue = rawValue.split(me.delimiter).pop();
        }
        me.doQuery(rawValue, false, true);
    },
    doQuery: function(queryString, forceAll, rawQuery) {
        var me = this,
            // Decide if, and how we are going to query the store
            queryPlan = me.beforeQuery({
                query: queryString || '',
                rawQuery: rawQuery,
                forceAll: forceAll,
                combo: me,
                cancel: false
            }),
            filter = me.queryFilter;
        //如果当前是formpicker 不过滤列表
        if (me.picker == me.formPicker) {
            if (filter) {
                me.queryFilter = null;
                me.store.removeFilter(filter, true);
            }
            return;
        }
        // Allow veto.
        if (queryPlan !== false && !queryPlan.cancel) {
            // If they're using the same value as last time (and not being asked to query all), just show the dropdown
            if (me.queryCaching && queryPlan.query === me.lastQuery) {
                me.expand();
            } else // Otherwise filter or load the store
            {
                me.lastQuery = queryPlan.query;
                if (me.queryMode === 'local') {
                    me.doLocalQuery(queryPlan);
                } else {}
            }
        }
        //me.doRemoteQuery(queryPlan);通过remote方法读取数据
        return true;
    },
    beforeQuery: function(queryPlan) {
        var me = this;
        // Allow beforequery event to veto by returning false
        if (me.fireEvent('beforequery', queryPlan) === false) {
            queryPlan.cancel = true;
        }
        // Allow beforequery event to veto by returning setting the cancel flag
        else if (!queryPlan.cancel) {
            // If the minChars threshold has not been met, and we're not forcing an "all" query, cancel the query
            if (queryPlan.query.length < me.minChars && !queryPlan.forceAll) {
                queryPlan.cancel = true;
            }
        }
        return queryPlan;
    },
    doLocalQuery: function(queryPlan) {
        var me = this,
            queryString = queryPlan.query,
            store = me.getStore(),
            filter = me.queryFilter;
        me.queryFilter = null;
        // Must set changingFilters flag for this.checkValueOnChange.
        // the suppressEvents flag does not affect the filterchange event
        me.changingFilters = true;
        if (filter) {
            store.removeFilter(filter, true);
        }
        // Querying by a string...
        if (queryString) {
            filter = me.queryFilter = new Ext.util.Filter({
                id: me.id + '-filter',
                anyMatch: me.anyMatch,
                caseSensitive: me.caseSensitive,
                root: 'data',
                property: me.displayField,
                value: me.enableRegEx ? new RegExp(queryString) : queryString
            });
            store.addFilter(filter, true);
        }
        me.changingFilters = false;
        // Expand after adjusting the filter if there are records or if emptyText is configured.
        if (me.store.getCount() || me.getPicker().emptyText) {
            // The filter changing was done with events suppressed, so
            // refresh the picker DOM while hidden and it will layout on show.
            if (me.getPicker() && me.getPicker().refresh)  {
                me.getPicker().refresh();
            }
            
            me.expand();
        } else {
            me.collapse();
        }
        me.afterQuery(queryPlan);
    },
    afterQuery: function(queryPlan) {
        var me = this;
        if (me.store.getCount()) {
            if (me.typeAhead) {
                me.doTypeAhead();
            }
            if (queryPlan.rawQuery) {
                if (me.picker.getSelectionModel) {
                    if (me.picker && !me.picker.getSelectionModel().hasSelection()) {
                        me.doAutoSelect();
                    }
                }
            } else {
                me.doAutoSelect();
            }
        }
        // doQuery is called upon field mutation, so check for change after the query has done its thing
        me.checkChange();
    },
    loadPage: function(pageNum, options) {
        this.store.loadPage(pageNum, Ext.apply({
            params: this.getParams(this.lastQuery)
        }, options));
    },
    onPageChange: function(toolbar, newPage) {
        this.loadPage(newPage);
        return false;
    },
    /**
     * @private
     */
    getParams: function(queryString) {
        var params = {},
            param = this.queryParam;
        if (param) {
            params[param] = queryString;
        }
        return params;
    },
    doAutoSelect: function() {
        var me = this,
            picker = me.picker;
        if (picker.getNavigationModel) {
            if (picker && me.autoSelect && me.store.getCount() > 0) {
                // Highlight the last selected item and scroll it into view
                picker.getNavigationModel().setPosition(me.picker.getSelectionModel().lastSelected || 0);
            }
        }
    },
    doTypeAhead: function() {
        var me = this,
            Event = Ext.event.Event;
        if (!me.typeAheadTask) {
            me.typeAheadTask = new Ext.util.DelayedTask(me.onTypeAhead, me);
        }
        if (me.lastKey !== Event.BACKSPACE && me.lastKey !== Event.DELETE) {
            me.typeAheadTask.delay(me.typeAheadDelay);
        }
    },
    onTriggerClick: function() {
        var me = this;
        if (!me.readOnly && !me.disabled) {
            if (me.isExpanded) {
                me.collapse();
            } else {
                if (me.triggerAction === 'all') {
                    me.doQuery(me.allQuery, true);
                } else if (me.triggerAction === 'last') {
                    me.doQuery(me.lastQuery, true);
                } else {
                    me.doQuery(me.getRawValue(), false, true);
                }
            }
        }
    },
    onFieldMutation: function(e) {
        var me = this,
            key = e.getKey(),
            isDelete = key === e.BACKSPACE || key === e.DELETE,
            rawValue = me.inputEl.dom.value,
            len = rawValue.length;
        // Do not process two events for the same mutation.
        // For example an input event followed by the keyup that caused it.
        // We must process delete keyups.
        // Also, do not process TAB event which fires on arrival.
        if (!me.readOnly && (rawValue !== me.lastMutatedValue || isDelete) && key !== e.TAB) {
            me.lastMutatedValue = rawValue;
            me.lastKey = key;
            if (len && (e.type !== 'keyup' || (!e.isSpecialKey() || isDelete))) {
                me.doQueryTask.delay(me.queryDelay);
            } else {
                // We have *erased* back to empty if key is a delete, or it is a non-key event (cut/copy)
                if (!len && (!key || isDelete)) {
                    // Essentially a silent setValue.
                    // Clear our value, and the tplData used to construct a mathing raw value.
                    if (!me.multiSelect) {
                        me.value = null;
                        me.displayTplData = undefined;
                    }
                    // If the value is blank we can't have a value
                    if (me.clearValueOnEmpty) {
                        me.valueCollection.removeAll();
                    }
                    // Just erased back to empty. Hide the dropdown.
                    me.collapse();
                    // There may have been a local filter if we were querying locally.
                    // Clear the query filter and suppress the consequences (we do not want a list refresh).
                    if (me.queryFilter) {
                        // Must set changingFilters flag for this.checkValueOnChange.
                        // the suppressEvents flag does not affect the filterchange event
                        me.changingFilters = true;
                        me.store.removeFilter(me.queryFilter, true);
                        me.changingFilters = false;
                    }
                }
                me.callParent([
                    e
                ]);
            }
        }
    },
    onDestroy: function() {
        var me = this;
        me.doQueryTask.cancel();
        if (me.typeAheadTask) {
            me.typeAheadTask.cancel();
            me.typeAheadTask = null;
        }
        me.bindStore(null);
        me.valueCollection = Ext.destroy(me.valueCollection);
        me.callParent();
    },
    // The picker (the dropdown) must have its zIndex managed by the same ZIndexManager which is
    // providing the zIndex of our Container.
    onAdded: function() {
        var me = this;
        me.callParent(arguments);
        if (me.picker) {
            me.picker.ownerCt = me.up('[floating]');
            me.picker.registerWithOwnerCt();
        }
    },
    dataReady: false,
    getPickerStore: function() {
        var me = this;
        return me.store;
    },
    onBeforePickerShow: function(picker) {
        // Just before we show the picker, set its maxHeight so it fits
        // either above or below, it will flip to the side where it fits
        var me = this,
            heightAbove = me.getPosition()[1] - Ext.getBody().getScroll().top,
            heightBelow = Ext.Element.getViewportHeight() - heightAbove - me.getHeight();
        // Then ensure that vertically, the dropdown will fit into the space either above or below the inputEl.
        picker.maxHeight = Math.max(heightAbove, heightBelow) - 5;
    },
    // have some leeway so we aren't flush against the window edge
    onBeforeSelect: function(list, record, recordIndex) {
        return this.fireEvent('beforeselect', this, record, recordIndex);
    },
    onBeforeDeselect: function(list, record, recordIndex) {
        return this.fireEvent('beforedeselect', this, record, recordIndex);
    },
    onFocusChange: function(selModel, prevRecord, newRecord) {
        var picker = this.picker,
            el;
        if (newRecord) {
            // Ext.get is to ensure the node has an id
            el = Ext.get(picker.getNodeByRecord(newRecord));
            if (el) {
                this.ariaEl.dom.setAttribute('aria-activedescendant', el.id);
            }
        }
    },
    getSelection: function() {
        var selModel = this.getPicker().getSelectionModel(),
            selection = selModel.getSelection();
        return selection.length ? selModel.getLastSelected() : null;
    },
    updateSelection: function(selection) {
        var me = this,
            sm;
        if (!me.ignoreNextSelection) {
            me.ignoreNextSelection = true;
            sm = me.getPicker().getSelectionModel();
            if (selection) {
                sm.select(selection);
                me.hasHadSelection = true;
            } else {
                sm.deselectAll();
            }
            me.ignoreNextSelection = false;
        }
    },
    updateBindSelection: function(selModel, selection) {
        var me = this,
            selected = null;
        if (!me.ignoreNextSelection) {
            me.ignoreNextSelection = true;
            if (selection.length) {
                selected = selModel.getLastSelected();
                me.hasHadSelection = true;
            }
            if (me.hasHadSelection) {
                me.setSelection(selected);
            }
            me.ignoreNextSelection = false;
        }
    },
    onValueCollectionBeginUpdate: Ext.emptyFn,
    onValueCollectionEndUpdate: function() {
        var me = this,
            store = me.store,
            selectedRecords = me.valueCollection.getRange(),
            selectedRecord = selectedRecords[0],
            selectionCount = selectedRecords.length;
        me.updateBindSelection(me.pickerSelectionModel, selectedRecords);
        if (me.isSelectionUpdating()) {
            return;
        }
        Ext.suspendLayouts();
        me.lastSelection = selectedRecords;
        if (selectionCount) {
            // Track the last selection with a value (non blank) for use in
            // assertValue
            me.lastSelectedRecords = selectedRecords;
        }
        me.updateValue();
        // If we have selected a value, and it's not possible to select any more values
        // or, we are configured to hide the picker each time, then collapse the picker.
        if (selectionCount && ((!me.multiSelect && store.contains(selectedRecord)) || me.collapseOnSelect || !store.getCount())) {
            me.updatingValue = true;
            me.collapse();
            me.updatingValue = false;
        }
        Ext.resumeLayouts(true);
        if (selectionCount && !me.suspendCheckChange) {
            if (!me.multiSelect) {
                selectedRecords = selectedRecord;
            }
            me.fireEvent('select', me, selectedRecords);
        }
    },
    isSelectionUpdating: function() {
        var selModel = this.pickerSelectionModel;
        return selModel.deselectingDuringSelect || selModel.refreshing;
    },
    /**
     * @private
     * Enables the key navs for the BoundList when it is expanded.
     */
    onExpand: function() {
        var me = this,
            picker = me.getPicker();
        if (picker.getNavigationModel) {
            var keyNav = this.getPicker().getNavigationModel();
            if (keyNav) {
                keyNav.enable();
            }
            this.doAutoSelect();
        }
    },
    /**
     * @private
     * Disables the key navs for the BoundList when it is collapsed.
     */
    onCollapse: function() {
        var picker = this.getPicker();
    },
    //if(picker.getNavigationModel) {
    //    var keyNav=this.getPicker().getNavigationModel();
    //    if(keyNav) {
    //        keyNav.disable();
    //    }
    //    if(this.updatingValue) {
    //        this.doQueryTask.cancel();
    //    }
    //}
    /**
     * Selects an item by a {@link Ext.data.Model Model}, or by a key value.
     * @param {Object} r
     */
    select: function(r, /* private */
    assert) {
        var me = this,
            picker = me.picker,
            fireSelect;
        if (r && r.isModel && assert === true && picker) {
            fireSelect = !picker.getSelectionModel().isSelected(r);
        }
        if (!fireSelect) {
            me.suspendEvent('select');
        }
        me.setValue(r);
        me.resumeEvent('select');
    },
    findRecord: function(field, value) {
        var ds = this.store,
            idx = ds.findExact(field, value);
        return idx !== -1 ? ds.getAt(idx) : false;
    },
    getSelectedRecord: function() {
        return this.findRecordByValue(this.value) || null;
    },
    findRecordByValue: function(value) {
        var result = this.store.byValue.get(value),
            ret = false;
        // If there are duplicate keys, tested behaviour is to return the *first* match.
        if (result) {
            ret = result[0] || result;
        }
        return ret;
    },
    findRecordByDisplay: function(value) {
        var result = this.store.byText.get(value),
            ret = false;
        // If there are duplicate keys, tested behaviour is to return the *first* match.
        if (result) {
            ret = result[0] || result;
        }
        return ret;
    },
    /**
     * Adds a value or values to the current value of the field
     * @param {Mixed} value The value or values to add to the current value, see {@link #setValue}
     */
    addValue: function(value) {
        if (value != null) {
            return this.doSetValue(value, true);
        }
    },
    setValue: function(value) {
        var me = this;
        // Value needs matching and record(s) need selecting.
        if (value != null) {
            return me.doSetValue(value);
        } else // Clearing is a special, simpler case.
        {
            me.suspendEvent('select');
            me.valueCollection.beginUpdate();
            me.pickerSelectionModel.deselectAll();
            me.valueCollection.endUpdate();
            me.lastSelectedRecords = null;
            me.resumeEvent('select');
        }
    },
    setRawValue: function(rawValue) {
        this.callParent([
            rawValue
        ]);
        this.lastMutatedValue = rawValue;
    },
    /**
     * @private
     * Sets or adds a value/values
     */
    doSetValue: function(value, /* private for use by addValue */
    add) {
        var me = this,
            store = me.getStore(),
            Model = store.getModel(),
            matchedRecords = [],
            valueArray = [],
            autoLoadOnValue = me.autoLoadOnValue,
            isLoaded = store.getCount() > 0 || store.isLoaded(),
            pendingLoad = store.hasPendingLoad(),
            unloaded = autoLoadOnValue && !isLoaded && !pendingLoad,
            forceSelection = me.forceSelection,
            selModel = me.pickerSelectionModel,
            displayIsValue = me.displayField === me.valueField,
            isEmptyStore = store.isEmptyStore,
            lastSelection = me.lastSelection,
            i, len, record, dataObj, valueChanged, key;
        if (add && !me.multiSelect) {
            Ext.raise('Cannot add values to non multiSelect ComboBox');
        }
        if (pendingLoad || unloaded || !isLoaded || isEmptyStore) {
            if (!value.isModel) {
                if (add) {
                    me.value = Ext.Array.from(me.value).concat(value);
                } else {
                    me.value = value;
                }
                me.setHiddenValue(me.value);
                // If we know that the display value is the same as the value, then show it.
                // A store load is still scheduled so that the matching record can be published.
                me.setRawValue(displayIsValue ? value : '');
            }
            // Kick off a load. Doesn't matter whether proxy is remote - it needs loading
            // so we can select the correct record for the value.
            //
            // Must do this *after* setting the value above in case the store loads synchronously
            // and fires the load event, and therefore calls onLoad inline.
            //
            // If it is still the default empty store, then the real store must be arriving
            // in a tick through binding. bindStore will call setValueOnData.
            if (unloaded && !isEmptyStore) {
                store.load();
            }
            // If they had set a string value, another setValue call is scheduled in the onLoad handler.
            // If the store is the defauilt empty one, the setValueOnData call will be made in bindStore
            // when the real store arrives.
            if (!value.isModel || isEmptyStore) {
                return me;
            }
        }
        // This method processes multi-values, so ensure value is an array.
        value = add ? Ext.Array.from(me.value).concat(value) : Ext.Array.from(value);
        // Loop through values, matching each from the Store, and collecting matched records
        for (i = 0 , len = value.length; i < len; i++) {
            record = value[i];
            // Set value was a key, look up in the store by that key
            if (!record || !record.isModel) {
                record = me.findRecordByValue(key = record);
                // The value might be in a new record created from an unknown value (if !me.forceSelection).
                // Or it could be a picked record which is filtered out of the main store.
                // Or it could be a setValue(record) passed to an empty store with autoLoadOnValue and aded above.
                if (!record) {
                    record = me.valueCollection.find(me.valueField, key);
                }
            }
            // record was not found, this could happen because
            // store is not loaded or they set a value not in the store
            if (!record) {
                // If we are allowing insertion of values not represented in the Store, then push the value and
                // create a new record to push as a display value for use by the displayTpl
                if (!forceSelection) {
                    // We are allowing added values to create their own records.
                    // Only if the value is not empty.
                    if (!record && value[i]) {
                        dataObj = {};
                        dataObj[me.displayField] = value[i];
                        if (me.valueField && me.displayField !== me.valueField) {
                            dataObj[me.valueField] = value[i];
                        }
                        record = new Model(dataObj);
                    }
                }
                // Else, if valueNotFoundText is defined, display it, otherwise display nothing for this value
                else if (me.valueNotFoundRecord) {
                    record = me.valueNotFoundRecord;
                }
            }
            // record found, select it.
            if (record) {
                matchedRecords.push(record);
                valueArray.push(record.get(me.valueField));
            }
        }
        // If the same set of records are selected, this setValue has been a no-op
        if (lastSelection) {
            len = lastSelection.length;
            if (len === matchedRecords.length) {
                for (i = 0; !valueChanged && i < len; i++) {
                    if (Ext.Array.indexOf(me.lastSelection, matchedRecords[i]) === -1) {
                        valueChanged = true;
                    }
                }
            } else {
                valueChanged = true;
            }
        } else {
            valueChanged = matchedRecords.length;
        }
        if (valueChanged) {
            // beginUpdate which means we only want to notify this.onValueCollectionEndUpdate after it's all changed.
            me.suspendEvent('select');
            me.valueCollection.beginUpdate();
            if (matchedRecords.length) {
                selModel.select(matchedRecords, false);
            } else {
                selModel.deselectAll();
            }
            me.valueCollection.endUpdate();
            me.resumeEvent('select');
        } else {
            me.updateValue();
        }
        return me;
    },
    /**
     * @private
     * Internal setting of value when records are added to the valueCollection
     * setValue itself adds to the valueCollection.
     */
    updateValue: function() {
        var me = this,
            selectedRecords = me.valueCollection.getRange(),
            len = selectedRecords.length,
            valueArray = [],
            displayTplData = me.displayTplData || (me.displayTplData = []),
            inputEl = me.inputEl,
            i, record;
        // Loop through values, matching each from the Store, and collecting matched records
        displayTplData.length = 0;
        for (i = 0; i < len; i++) {
            record = selectedRecords[i];
            displayTplData.push(me.getRecordDisplayData(record));
            // There might be the bogus "value not found" record if forceSelect was set. Do not include this in the value.
            if (record !== me.valueNotFoundRecord) {
                valueArray.push(record.get(me.valueField));
            }
        }
        // Set the value of this field. If we are multiselecting, then that is an array.
        me.setHiddenValue(valueArray);
        me.value = me.multiSelect ? valueArray : valueArray[0];
        if (!Ext.isDefined(me.value)) {
            me.value = undefined;
        }
        me.displayTplData = displayTplData;
        //store for getDisplayValue method
        if (inputEl && me.emptyText && !Ext.isEmpty(me.value)) {
            inputEl.removeCls(me.emptyCls);
        }
        // Calculate raw value from the collection of Model data
        me.setRawValue(me.getDisplayValue());
        me.checkChange();
        me.applyEmptyText();
    },
    /**
     * @private
     * Set the value of {@link #hiddenDataEl}
     * Dynamically adds and removes input[type=hidden] elements
     */
    setHiddenValue: function(values) {
        var me = this,
            name = me.hiddenName,
            i, dom, childNodes, input, valueCount, childrenCount;
        if (!me.hiddenDataEl || !name) {
            return;
        }
        values = Ext.Array.from(values);
        dom = me.hiddenDataEl.dom;
        childNodes = dom.childNodes;
        input = childNodes[0];
        valueCount = values.length;
        childrenCount = childNodes.length;
        if (!input && valueCount > 0) {
            me.hiddenDataEl.setHtml(Ext.DomHelper.markup({
                tag: 'input',
                type: 'hidden',
                name: name
            }));
            childrenCount = 1;
            input = dom.firstChild;
        }
        while (childrenCount > valueCount) {
            dom.removeChild(childNodes[0]);
            --childrenCount;
        }
        while (childrenCount < valueCount) {
            dom.appendChild(input.cloneNode(true));
            ++childrenCount;
        }
        for (i = 0; i < valueCount; i++) {
            childNodes[i].value = values[i];
        }
    },
    /**
     * @private
     * Generates the string value to be displayed in the text field for the currently stored value
     */
    getDisplayValue: function(tplData) {
        tplData = tplData || this.displayTplData;
        return this.getDisplayTpl().apply(tplData);
    },
    /**
     * Gets data for each record to be used for constructing the display value with
     * the {@link #displayTpl}. This may be overridden to provide access to associated records.
     * @param {Ext.data.Model} record The record.
     * @return {Object} The data to be passed for each record to the {@link #displayTpl}.
     *
     * @protected
     */
    getRecordDisplayData: function(record) {
        return record.data;
    },
    getValue: function() {
        // If the user has not changed the raw field value since a value was selected from the list,
        // then return the structured value from the selection. If the raw field value is different
        // than what would be displayed due to selection, return that raw value.
        var me = this,
            store = me.getStore(),
            picker = me.picker,
            rawValue = me.getRawValue(),
            //current value of text field
            value = me.value;
        //stored value from last selection or setValue() call
        // getValue may be called from initValue before a valid store is bound - may still be the default empty one.
        // Also, may be called before the store has been loaded.
        // In these cases, just return the value.
        // In other cases, check that the rawValue matches the selected records.
        if (!store.isEmptyStore && me.getDisplayValue() !== rawValue) {
            me.displayTplData = undefined;
            if (picker) {
                // We do not need to hear about this clearing out of the value collection,
                // so suspend events.
                me.valueCollection.suspendEvents();
                picker.getSelectionModel().deselectAll();
                me.valueCollection.resumeEvents();
                me.lastSelection = null;
            }
            // If the raw input value gets out of sync in a multiple ComboBox, then we have to give up.
            // Multiple is not designed for typing *and* displaying the comma separated result of selection.
            // Same in the case of forceSelection.
            // Unless the store is not yet loaded, which case will be handled in onLoad
            if (store.isLoaded() && (me.multiSelect || me.forceSelection)) {
                value = me.value = undefined;
            } else {
                value = me.value = rawValue;
            }
        }
        // Return null if value is undefined/null, not falsy.
        me.value = value == null ? null : value;
        return me.value;
    },
    getSubmitValue: function() {
        var value = this.getValue();
        // If the value is null/undefined, we still return an empty string. If we
        // don't, the field will never get posted to the server since nulls are ignored.
        if (Ext.isEmpty(value)) {
            value = '';
        }
        return value;
    },
    isEqual: function(v1, v2) {
        var fromArray = Ext.Array.from,
            i, len;
        v1 = fromArray(v1);
        v2 = fromArray(v2);
        len = v1.length;
        if (len !== v2.length) {
            return false;
        }
        for (i = 0; i < len; i++) {
            if (v2[i] !== v1[i]) {
                return false;
            }
        }
        return true;
    },
    /**
     * Clears any value currently set in the ComboBox.
     */
    clearValue: function() {
        this.setValue(null);
    },
    //copy from Ext.form.field.Combo
    width: '100%',
    enableKeyEvents: true,
    queryMode: 'local',
    anyMatch: true,
    caseSensitive: true,
    valueField: 'valueName',
    emptyText: '请选择城市名称',
    tpl: Ext.create('Ext.XTemplate', '<ul class="x-list-plain"><tpl for=".">', '<li role="option" class="x-boundlist-item">{provinceText} {cityText}</li>', '</tpl></ul>'),
    displayTpl: Ext.create('Ext.XTemplate', '<tpl for=".">', '{provinceText} {cityText}', '</tpl>'),
    refreshCityForm: function() {
        var me = this;
        if (!me.formPicker)  {
            return;
        }
        
        me.formPicker.initData(me.store);
    },
    //override createPicker方法，获得自定义的picker
    createPicker: function() {
        var me = this,
            comboPicker = me.comboPicker,
            formPicker = me.formPicker;
        if (!comboPicker) {
            comboPicker = me.comboPicker = me.createComboPicker();
            delete me.createComboPicker;
        }
        if (!formPicker) {
            formPicker = me.formPicker = me.createFormPicker();
            delete me.createFormPicker;
        }
        return formPicker;
    },
    createFormPicker: function() {
        var me = this,
            picker,
            pickerCfg = Ext.apply({
                xtype: 'cityForm',
                // id: me.pickerId + '-form',
                width: me.width - 10,
                height: 200,
                store: me.getPickerStore(),
                pickerField: me,
                floating: true,
                hidden: true
            }, me.listConfig, me.defaultListConfig);
        picker = me.formPicker = Ext.widget(pickerCfg);
        picker.initData(me.store);
        if (!picker.initialConfig.maxHeight) {
            picker.on({
                beforeshow: me.onBeforePickerShow,
                scope: me
            });
        }
        return picker;
    },
    createComboPicker: function() {
        var me = this,
            picker,
            pickerCfg = Ext.apply({
                xtype: 'boundlist',
                id: me.pickerId,
                pickerField: me,
                emptyText: "<span style='color:red'>城市不存在或暂未开通服务</span>",
                selectionModel: me.pickerSelectionModel,
                floating: true,
                hidden: true,
                store: me.getPickerStore(),
                displayField: me.displayField,
                preserveScrollOnRefresh: true,
                pageSize: me.pageSize,
                tpl: me.tpl
            }, me.listConfig, me.defaultListConfig);
        picker = me.comboPicker = Ext.widget(pickerCfg);
        if (me.pageSize) {
            picker.pagingToolbar.on('beforechange', me.onPageChange, me);
        }
        // We limit the height of the picker to fit in the space above
        // or below this field unless the picker has its own ideas about that.
        if (!picker.initialConfig.maxHeight) {
            picker.on({
                beforeshow: me.onBeforePickerShow,
                scope: me
            });
        }
        picker.getSelectionModel().on({
            beforeselect: me.onBeforeSelect,
            beforedeselect: me.onBeforeDeselect,
            focuschange: me.onFocusChange,
            scope: me
        });
        picker.getNavigationModel().navigateOnSpace = false;
        return picker;
    },
    beforeDestroy: function() {
        var me = this,
            comboPicker = me.comboPicker,
            formPicker = me.formPicker;
        me.callParent();
        if (comboPicker) {
            me.comboPicker = comboPicker.pickerField = null;
        }
        if (formPicker) {
            me.formPicker = formPicker.pickerField = null;
        }
    }
});

/**
 *
 * <p> Title:CodeEditorField.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/form/field)</p>
 * <p> Description:  代码编辑器</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.CodeEditorField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.codeEditorField',
    requires: [
        'Ext.form.trigger.Component'
    ],
    emptyText: '请输入',
    type: 'text/javascript',
    //类型
    triggers: {
        clear: {
            weight: 0,
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            hidden: true,
            handler: 'onClearClick',
            scope: 'this'
        },
        search: {
            weight: 1,
            cls: Ext.baseCSSPrefix + 'fa fa-code fa-lg',
            handler: 'onDotClick',
            scope: 'this'
        }
    },
    hasSearch: false,
    paramName: 'query',
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },
    onClearClick: function() {
        /* 清除点 */
        var me = this;
        me.setValue('');
        me.getTrigger('clear').hide();
    },
    onDotClick: function() {
        /* 加入点 */
        var me = this,
            value = me.getValue();
        me.getTrigger('clear').show();
        Ext.create('Ext.window.Window', {
            autoShow: true,
            title: '添加代码',
            iconCls: 'fa fa-code fa-lg',
            requires: [
                'Ext.window.Window'
            ],
            modal: true,
            maximizable: true,
            closeAction: 'hide',
            layout: 'fit',
            autoScroll: true,
            animCollapse: true,
            animateTarget: Ext.getBody(),
            border: true,
            style: 'border-color: #b6babe;',
            closeToolText: '点击关闭窗口',
            width: Ext.getBody().getSize().width - 100,
            height: Ext.getBody().getSize().height - 100,
            listeners: {
                show: function(win) {
                    var editor = CodeMirror.fromTextArea(Ext.getDom(win.down('textarea').id + '-inputEl'), {
                            lineNumbers: true,
                            // 显示行数
                            indentUnit: 4,
                            // 缩进单位为4
                            styleActiveLine: true,
                            // 当前行背景高亮
                            matchBrackets: true,
                            // 括号匹配
                            mode: me.type,
                            // HMTL混合模式
                            lineWrapping: true,
                            // 自动换行
                            theme: 'vibrant-ink'
                        });
                    editor.setSize('auto', Ext.getCmp(win.down('textarea').id).getHeight() - 3 + 'px');
                },
                close: function(win) {
                    win.down('textarea').setValue('');
                }
            },
            items: [
                {
                    xtype: 'textarea'
                }
            ]
        }).show();
    }
});

/**
 *
 * <p> Title:ColorsField.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/form/field)</p>
 * <p> Description:  颜色选择器</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.ColorsField', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.colorsField',
    requires: [
        'Ext.picker.Color'
    ],
    triggerTip: '请选择一个颜色',
    onTriggerClick: function() {
        var me = this;
        if (!me.picker) {
            me.picker = Ext.create('Ext.picker.Color', {
                pickerField: this,
                ownerCt: this,
                renderTo: Ext.getBody(),
                floating: true,
                //hidden: true,    
                editable: false,
                focusOnShow: true,
                style: {
                    backgroundColor: "#fff"
                },
                listeners: {
                    scope: this,
                    select: function(field, value, opts) {
                        me.setValue('#' + value);
                        me.inputEl.applyStyles({
                            backgroundColor: '#' + value
                        });
                        me.picker.hide();
                    }
                }
            });
            me.picker.alignTo(me.inputEl, 'tl-bl?');
        }
        me.picker.show();
        var attached = me.attached || false;
        me.lastShow = new Date();
        if (!attached) {
            Ext.getDoc().on('mousedown', me.onMouseDown, me, {
                buffer: Ext.isIE9m ? 10 : undefined
            });
            me.attached = true;
        }
    },
    onMouseDown: function(e) {
        var lastShow = this.lastShow,
            doHide = true;
        if (Ext.Date.getElapsed(lastShow) > 50 && !e.getTarget('#' + this.picker.id)) {
            if (Ext.isIE9m && !Ext.getDoc().contains(e.target)) {
                doHide = false;
            }
            if (doHide) {
                this.picker.hide();
                Ext.getDoc().un('mousedown', this.onMouseDown, this);
                this.attached = false;
            }
        }
    }
});

/**
 *
 * <p> Title:FontField.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/form/field/date)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.FontField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.fontField',
    requires: [
        'Ext.form.trigger.Component'
    ],
    style: 'background-color: #fff;',
    width: '100%',
    emptyText: '12',
    triggers: {
        clear: {
            weight: 0,
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            hidden: true,
            handler: 'onClearClick',
            scope: 'this'
        },
        blod: {
            weight: 1,
            cls: Ext.baseCSSPrefix + 'fa fa fa-bold',
            handler: 'fontBold',
            scope: 'this'
        }
    },
    /*
     * private 
     */
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },
    onClearClick: function() {
        var me = this;
        me.setValue('');
    },
    fontBold: function() {
        //加粗
        var me = this,
            value = me.getValue();
    },
    fontItalic: function() {},
    //斜体
    fontColor: function() {}
});
//字体颜色

/**
 *
 * <p> Title:LetterField.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/form/field)</p>
 * <p> Description:  字母输入框，只能输入字母</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.LetterField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.letterField',
    requires: [
        'Ext.form.trigger.Component',
        'wys.form.MyKeyBoard'
    ],
    emptyText: '请输入字母字符',
    enableKeyEvents: true,
    isUpCase: false,
    //input text is it capitalized?
    triggers: {
        clear: {
            weight: 0,
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            hidden: true,
            handler: 'onClearClick',
            scope: 'this'
        },
        search: {
            weight: 1,
            cls: Ext.baseCSSPrefix + 'fa fa-keyboard-o fa-lg',
            handler: 'onKeyBoardClick',
            scope: 'this'
        }
    },
    /*
     * private 
     */
    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            listeners: {
                change: function(input, e, eOpts) {
                    if (me.isUpCase) {
                        //大写
                        input.setValue(input.getValue().toUpperCase());
                    } else {
                        //小写
                        input.setValue(input.getValue().toLowerCase());
                    }
                }
            }
        });
        me.callParent(arguments);
    },
    /*
     * private
     * clear input value
     */
    onClearClick: function() {
        var me = this;
        me.setValue('');
    },
    /*private
     *show keyBoard
     */
    onKeyBoardClick: function() {
        var me = this,
            value = me.getValue();
        Ext.create('wys.form.MyKeyBoard', {
            renderTo: Ext.getBody(),
            width: 328,
            height: 138,
            upperCase: me.isUpCase,
            fieldWidget: this,
            style: 'z-index:999999'
        }).showAt(me.getXY());
    }
});

/**
 *
 * <p> Title:SearchCombo.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/classic/src/form/field)</p>
 * <p> Description:  带有查询输入框的下拉框</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.SearchCombo', {
    extend: 'Ext.form.field.ComboBox',
    requiers: [
        'Ext.grid.Panel'
    ],
    alternateClassName: 'Ext.form.SearchComboBox',
    alias: [
        'widget.searchComboBox',
        'widget.searchCombo'
    ],
    createPicker: function() {
        var me = this;
        var picker = Ext.create('Ext.grid.Panel', {
                store: me.store,
                frame: true,
                autoWidth: true,
                resizable: true,
                columns: [
                    {
                        text: '名称',
                        minWidth: me.getWidth(),
                        flex: 1,
                        dataIndex: me.displayField
                    }
                ],
                floating: true,
                hidden: true,
                autoScroll: true,
                maxHeight: 400,
                viewConfig: {
                    emptyText: '<div style="text-align:center">没有找到相关记录<div>'
                },
                focusOnToFront: false
            });
        me.mon(picker, {
            //添加事件
            itemclick: me.onItemClick,
            refresh: function() {},
            scope: me
        });
        me.mon(picker.getSelectionModel(), {
            beforeselect: function(v) {},
            beforedeselect: function(v) {},
            selectionchange: me.onListSelectionChange,
            scope: me
        });
        picker.addDocked({
            xtype: 'toolbar',
            items: [
                {
                    text: '13131',
                    xtype: 'button'
                }
            ],
            dock: "top"
        });
        this.picker = picker;
        return picker;
    },
    onItemClick: function(picker, record) {
        var me = this,
            selection = me.picker.getSelectionModel().getSelection(),
            valueField = me.valueField;
        if (!me.multiSelect && selection.length) {
            //多选
            record.get(valueField) , selection[0].get(valueField);
            if (record.get(valueField) === selection[0].get(valueField)) {
                me.displayTplData = [
                    record.data
                ];
                me.setRawValue(me.getDisplayValue());
                me.collapse();
            }
        } else {}
    },
    //多选暂不实现
    matchFieldWidth: false,
    onListSelectionChange: function(list, selectedRecords) {
        var me = this,
            isMulti = me.multiSelect,
            hasRecords = selectedRecords.length > 0;
        if (!me.ignoreSelection && me.isExpanded) {
            if (!isMulti) {
                Ext.defer(me.collapse, 1, me);
            }
            if (isMulti || hasRecords) {
                me.setValue(selectedRecords, false);
            }
            if (hasRecords) {
                me.fireEvent('select', me, selectedRecords);
            }
        }
    },
    doAutoSelect: function() {
        var me = this,
            picker = me.picker,
            lastSelected, itemNode;
        if (picker && me.autoSelect && me.store.getCount() > 0) {
            lastSelected = picker.getSelectionModel().lastSelected;
            itemNode = picker.view.getNode(lastSelected || 0);
            var records = [];
            if (!Ext.isEmpty(me.getValue())) {
                for (var j = 0; j < me.getValue().length; j++) {
                    var record = me.store.findRecord('bizCode', me.getValue()[j]);
                    records.push(record);
                }
            }
            if (itemNode) {
                picker.view.highlightItem(itemNode);
                picker.view.el.scrollChildIntoView(itemNode, false);
            }
        }
    },
    onChange: function(a, b, c, d) {
        var me = this;
        me.setValue(a);
    }
});

/**
 *
 * <p> Title:specialName.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/form/field)</p>
 * <p> Description:  解决用户少数名族名字的编写上出现问题</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.SpecialName', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.specialNameField',
    requires: [
        'Ext.form.trigger.Component'
    ],
    emptyText: '请输入您的名称',
    vtype: 'checkName',
    triggers: {
        clear: {
            weight: 0,
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            hidden: true,
            handler: 'onClearClick',
            scope: 'this'
        },
        search: {
            weight: 1,
            cls: 'fa fa-dot-circle-o fa-lg',
            handler: 'onDotClick',
            scope: 'this'
        }
    },
    hasSearch: false,
    paramName: 'query',
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },
    onClearClick: function() {
        /* 清除点 */
        var me = this;
        me.setValue('');
        me.getTrigger('clear').hide();
    },
    onDotClick: function() {
        /* 加入点 */
        var me = this,
            value = me.getValue();
        me.setValue(value + '·');
        me.getTrigger('clear').show();
    }
});

/**
 *
 * <p> Title:DateTime.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/form/field/date)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.date.DateTime', {
    extend: 'Ext.Component',
    requires: [
        'Ext.XTemplate',
        'Ext.button.Button',
        'Ext.button.Split',
        'Ext.util.ClickRepeater',
        'Ext.util.KeyNav',
        'Ext.fx.Manager',
        'Ext.picker.Month',
        'Ext.form.field.Number'
    ],
    alias: 'widget.datetimepicker',
    todayText: '今天',
    ariaTitle: '{0}',
    ariaTitleDateFormat: 'Y年m月d日',
    todayTip: '{0} (空格键选择)',
    minText: '日期必须大于最小允许日期',
    ariaMinText: "日期必须大于最小允许日期",
    maxText: '日期必须小于最大允许日期',
    ariaMaxText: "日期必须小于最大允许日期",
    disabledDaysText: '',
    ariaDisabledDaysText: "",
    disabledDatesText: '',
    ariaDisabledDatesText: "",
    nextText: '下个月 (Ctrl+Right)',
    prevText: '上个月 (Ctrl+Left)',
    monthYearText: '选择一个月 (Control+Up/Down 来改变年份)',
    monthYearFormat: 'Y年m月',
    startDay: 0,
    showToday: true,
    disableAnim: false,
    baseCls: Ext.baseCSSPrefix + 'datepicker',
    longDayFormat: 'Y年m月d日',
    footerButtonUI: 'default',
    isDatePicker: true,
    alignOnScroll: false,
    ariaRole: 'region',
    focusable: true,
    childEls: [
        'innerEl',
        'eventEl',
        'prevEl',
        'nextEl',
        'middleBtnEl',
        'footerEl'
    ],
    border: true,
    /**
     * @cfg
     * @inheritdoc
     */
    renderTpl: [
        '<div id="{id}-innerEl" data-ref="innerEl" role="presentation">',
        '<div class="{baseCls}-header">',
        '<div id="{id}-prevEl" data-ref="prevEl" class="{baseCls}-prev {baseCls}-arrow" role="presentation" title="{prevText}"></div>',
        '<div id="{id}-middleBtnEl" data-ref="middleBtnEl" class="{baseCls}-month" role="heading">{%this.renderMonthBtn(values, out)%}</div>',
        '<div id="{id}-nextEl" data-ref="nextEl" class="{baseCls}-next {baseCls}-arrow" role="presentation" title="{nextText}"></div>',
        '</div>',
        '<table role="grid" id="{id}-eventEl" data-ref="eventEl" class="{baseCls}-inner" cellspacing="0" tabindex="0" aria-readonly="true">',
        '<thead>',
        '<tr role="row">',
        '<tpl for="dayNames">',
        '<th role="columnheader" class="{parent.baseCls}-column-header" aria-label="{.}">',
        '<div role="presentation" class="{parent.baseCls}-column-header-inner">{.:this.firstInitial}</div>',
        '</th>',
        '</tpl>',
        '</tr>',
        '</thead>',
        '<tbody>',
        '<tr role="row">',
        '<tpl for="days">',
        '{#:this.isEndOfWeek}',
        '<td role="gridcell">',
        '<div hidefocus="on" class="{parent.baseCls}-date"></div>',
        '</td>',
        '</tpl>',
        '</tr>',
        '</tbody>',
        '</table>',
        '<table role="grid" class="{baseCls}-footer" role="presentation" cellspacing="0" tabindex="0">',
        '<tr>',
        '<td style="width:102px;padding:5px">{%this.renderHourField(values, out)%}</td>',
        '<td style="width:102px;padding:6px">{%this.renderMinuteField(values, out)%}</td>',
        '<td style="width:102px;padding:5px">{%this.renderSecondField(values, out)%}</td>',
        '</tr>',
        '</table>',
        '<tpl if="showToday">',
        '<div id="{id}-footerEl" data-ref="footerEl" role="presentation" class="{baseCls}-footer">{%this.renderTodayBtn(values, out)%}</div>',
        '</tpl>',
        // These elements are used with Assistive Technologies such as screen readers
        '<div id="{id}-todayText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{todayText}.</div>',
        '<div id="{id}-ariaMinText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{ariaMinText}.</div>',
        '<div id="{id}-ariaMaxText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{ariaMaxText}.</div>',
        '<div id="{id}-ariaDisabledDaysText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{ariaDisabledDaysText}.</div>',
        '<div id="{id}-ariaDisabledDatesText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{ariaDisabledDatesText}.</div>',
        '</div>',
        {
            firstInitial: function(value) {
                return Ext.picker.Date.prototype.getDayInitial(value);
            },
            isEndOfWeek: function(value) {
                // convert from 1 based index to 0 based
                // by decrementing value once.
                value--;
                var end = value % 7 === 0 && value !== 0;
                return end ? '</tr><tr role="row">' : '';
            },
            renderTodayBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
            },
            renderMonthBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
            },
            renderHourField: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.hourField.getRenderTree(), out);
            },
            renderMinuteField: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.minuteField.getRenderTree(), out);
            },
            renderSecondField: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.secondField.getRenderTree(), out);
            }
        }
    ],
    initHour: 12,
    // 24-hour format
    numDays: 42,
    initComponent: function() {
        var me = this;
        me.selectedCls = me.baseCls + '-selected';
        me.disabledCellCls = me.baseCls + '-disabled';
        me.prevCls = me.baseCls + '-prevday';
        me.activeCls = me.baseCls + '-active';
        me.cellCls = me.baseCls + '-cell';
        me.nextCls = me.baseCls + '-prevday';
        me.todayCls = me.baseCls + '-today';
        if (!me.format) {
            me.format = Ext.Date.defaultFormat;
        }
        if (!me.dayNames) {
            me.dayNames = Ext.Date.dayNames;
        }
        me.dayNames = me.dayNames.slice(me.startDay).concat(me.dayNames.slice(0, me.startDay));
        me.callParent();
        me.value = me.value || new Date();
        me.initDisabledDays();
    },
    // Keep the tree structure correct for Ext.form.field.Picker input fields which poke a 'pickerField' reference down into their pop-up pickers.
    getRefOwner: function() {
        return this.pickerField || this.callParent();
    },
    getRefItems: function() {
        var results = [],
            monthBtn = this.monthBtn,
            todayBtn = this.todayBtn,
            hourField = this.hourField,
            minuteField = this.minuteField,
            secondField = this.secondField;
        if (monthBtn) {
            results.push(monthBtn);
        }
        if (todayBtn) {
            results.push(todayBtn);
        }
        if (hourField) {
            results.push(hourField);
        }
        if (minuteField) {
            results.push(minuteField);
        }
        if (secondField) {
            results.push(secondField);
        }
        return results;
    },
    numberFieldDefaults: {
        allowBlank: false,
        allowDecimals: false,
        width: 60,
        maxLength: 2,
        autoStripChars: true,
        ariaRole: 'presentation',
        enforceMaxLength: true
    },
    beforeRender: function() {
        var me = this,
            encode = Ext.String.htmlEncode,
            days = new Array(me.numDays),
            today = Ext.Date.format(new Date(), me.format);
        if (me.padding && !me.width) {
            me.cacheWidth();
        }
        me.monthBtn = new Ext.button.Split({
            ownerCt: me,
            ownerLayout: me.getComponentLayout(),
            text: '',
            tooltip: me.monthYearText,
            tabIndex: -1,
            ariaRole: 'presentation',
            listeners: {
                click: me.doShowMonthPicker,
                arrowclick: me.doShowMonthPicker,
                scope: me
            }
        });
        me.hourField = new Ext.form.field.Number(Ext.apply({
            ownerCt: me,
            ownerLayout: me.getComponentLayout(),
            maxValue: 23,
            minValue: 0
        }, me.numberFieldDefaults));
        me.minuteField = new Ext.form.field.Number(Ext.apply({
            ownerCt: me,
            ownerLayout: me.getComponentLayout(),
            maxValue: 59,
            minValue: 0
        }, me.numberFieldDefaults));
        me.secondField = new Ext.form.field.Number(Ext.apply({
            ownerCt: me,
            ownerLayout: me.getComponentLayout(),
            maxValue: 59,
            minValue: 0
        }, me.numberFieldDefaults));
        if (me.showToday) {
            me.todayBtn = new Ext.button.Button({
                ui: me.footerButtonUI,
                ownerCt: me,
                ownerLayout: me.getComponentLayout(),
                text: Ext.String.format(me.todayText, today),
                tooltip: Ext.String.format(me.todayTip, today),
                tooltipType: 'title',
                tabIndex: -1,
                ariaRole: 'presentation',
                handler: me.selectToday,
                scope: me
            });
        }
        me.callParent();
        Ext.applyIf(me, {
            renderData: {}
        });
        Ext.apply(me.renderData, {
            dayNames: me.dayNames,
            showToday: me.showToday,
            prevText: encode(me.prevText),
            nextText: encode(me.nextText),
            todayText: encode(me.todayText),
            ariaMinText: encode(me.ariaMinText),
            ariaMaxText: encode(me.ariaMaxText),
            ariaDisabledDaysText: encode(me.ariaDisabledDaysText),
            ariaDisabledDatesText: encode(me.ariaDisabledDatesText),
            days: days
        });
        me.protoEl.unselectable();
    },
    cacheWidth: function() {
        var me = this,
            padding = me.parseBox(me.padding),
            widthEl = Ext.getBody().createChild({
                cls: me.baseCls + ' ' + me.borderBoxCls,
                style: 'position:absolute;top:-1000px;left:-1000px;'
            });
        me.self.prototype.width = widthEl.getWidth() + padding.left + padding.right;
        widthEl.destroy();
    },
    /**
     * @inheritdoc
     * @private
     */
    onRender: function(container, position) {
        var me = this,
            dateCellSelector = 'div.' + me.baseCls + '-date';
        me.callParent(arguments);
        me.cells = me.eventEl.select('tbody td');
        me.textNodes = me.eventEl.query(dateCellSelector);
        me.eventEl.set({
            'aria-labelledby': me.monthBtn.id
        });
        me.mon(me.eventEl, {
            scope: me,
            mousewheel: me.handleMouseWheel,
            click: {
                fn: me.handleDateClick,
                delegate: dateCellSelector
            }
        });
    },
    /**
     * @inheritdoc
     * @private
     */
    initEvents: function() {
        var me = this;
        me.callParent();
        // If we're part of a date field, don't allow us to focus on mousedown,
        // the field will handle that. If we are standalone, then allow the default
        // behaviour to occur to receive focus
        if (me.pickerField) {
            me.el.on('mousedown', me.onMouseDown, me);
        }
        // Month button is pointer interactive only, it should not be allowed to focus.
        me.monthBtn.el.on('mousedown', me.onMouseDown, me);
        me.prevRepeater = new Ext.util.ClickRepeater(me.prevEl, {
            handler: me.showPrevMonth,
            scope: me,
            mousedownStopEvent: true
        });
        me.nextRepeater = new Ext.util.ClickRepeater(me.nextEl, {
            handler: me.showNextMonth,
            scope: me,
            mousedownStopEvent: true
        });
        me.keyNav = new Ext.util.KeyNav(me.eventEl, Ext.apply({
            scope: me,
            left: function(e) {
                if (e.ctrlKey) {
                    this.showPrevMonth();
                } else {
                    this.update(Ext.Date.add(this.activeDate, Ext.Date.DAY, -1));
                }
                // We need to prevent default to avoid scrolling the nearest container
                // which in case of a floating Date picker will be the document body.
                // This applies to all navigation keys.
                e.preventDefault();
            },
            right: function(e) {
                if (e.ctrlKey) {
                    this.showNextMonth();
                } else {
                    this.update(Ext.Date.add(this.activeDate, Ext.Date.DAY, 1));
                }
                e.preventDefault();
            },
            up: function(e) {
                // This is non-standard behavior kept for backward compatibility.
                // Ctrl-PageUp is reverse to this and it should be used instead.
                if (e.ctrlKey) {
                    this.showNextYear();
                } else {
                    this.update(Ext.Date.add(this.activeDate, Ext.Date.DAY, -7));
                }
                e.preventDefault();
            },
            down: function(e) {
                // This is non-standard behavior kept for backward compatibility.
                // Ctrl-PageDown is reverse to this and it should be used instead.
                if (e.ctrlKey) {
                    this.showPrevYear();
                } else {
                    this.update(Ext.Date.add(this.activeDate, Ext.Date.DAY, 7));
                }
                e.preventDefault();
            },
            pageUp: function(e) {
                if (e.ctrlKey) {
                    this.showPrevYear();
                } else {
                    this.showPrevMonth();
                }
                e.preventDefault();
            },
            pageDown: function(e) {
                if (e.ctrlKey) {
                    this.showNextYear();
                } else {
                    this.showNextMonth();
                }
                e.preventDefault();
            },
            home: function(e) {
                this.update(Ext.Date.getFirstDateOfMonth(this.activeDate));
                e.preventDefault();
            },
            end: function(e) {
                this.update(Ext.Date.getLastDateOfMonth(this.activeDate));
                e.preventDefault();
            },
            tab: function(e) {
                // When the picker is floating and attached to an input field, its
                // 'select' handler will focus the inputEl so when navigation happens
                // it does so as if the input field was focused all the time.
                // This is the desired behavior and we try not to interfere with it
                // in the picker itself, see below.
                this.handleTabKey(e);
                // Allow default behaviour of TAB - it MUST be allowed to navigate.
                return true;
            },
            enter: function(e) {
                this.handleDateClick(e, this.activeCell.firstChild);
            },
            space: function(e) {
                var me = this,
                    pickerField = me.pickerField,
                    startValue, value, pickerValue;
                me.setValue(new Date(me.activeCell.firstChild.dateValue));
                if (pickerField) {
                    startValue = me.startValue;
                    value = me.value;
                    pickerValue = pickerField.getValue();
                    if (pickerValue && startValue && pickerValue.getTime() === value.getTime()) {
                        pickerField.setValue(startValue);
                    } else {
                        pickerField.setValue(value);
                    }
                }
                // Space key causes scrolling, too :(
                e.preventDefault();
            }
        }, me.keyNavConfig));
        if (me.disabled) {
            me.syncDisabled(true, true);
        }
        me.update(me.value);
    },
    onMouseDown: function(e) {
        var cmp = Ext.Component.fromElement(e.target);
        if (cmp.isFormField)  {
            return;
        }
        
    },
    handleTabKey: function(e) {
        var me = this,
            t = me.getSelectedDate(me.activeDate),
            handler = me.handler,
            date;
        // The following code is like handleDateClick without the e.stopEvent()
        if (!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)) {
            date = t.dateValue;
            me.setValue(new Date(date.getFullYear(), date.getMonth() + 1, date.getData(), me.hourField.getValue(), me.minuteField.getValue(), me.secondField.getValue()));
            me.fireEvent('select', me, me.value);
            if (handler) {
                Ext.callback(handler, me.scope, [
                    me,
                    me.value
                ], null, me, me);
            }
            me.onSelect();
        } else // Even if the above condition is not met we have to let the field know
        // that we're tabbing out - that's user action we can do nothing about
        {
            me.fireEventArgs('tabout', [
                me
            ]);
        }
    },
    getSelectedDate: function(date) {
        var me = this,
            t = Ext.Date.clearTime(date, true).getTime(),
            cells = me.cells,
            cls = me.selectedCls,
            cellItems = cells.elements,
            cLen = cellItems.length,
            cell, c;
        cells.removeCls(cls);
        for (c = 0; c < cLen; c++) {
            cell = cellItems[c].firstChild;
            if (cell.dateValue === t) {
                return cell;
            }
        }
        return null;
    },
    /**
     * Setup the disabled dates regex based on config options
     * @private
     */
    initDisabledDays: function() {
        var me = this,
            dd = me.disabledDates,
            re = '(?:',
            len, d, dLen, dI;
        if (!me.disabledDatesRE && dd) {
            len = dd.length - 1;
            dLen = dd.length;
            for (d = 0; d < dLen; d++) {
                dI = dd[d];
                re += Ext.isDate(dI) ? '^' + Ext.String.escapeRegex(Ext.Date.dateFormat(dI, me.format)) + '$' : dI;
                if (d !== len) {
                    re += '|';
                }
            }
            me.disabledDatesRE = new RegExp(re + ')');
        }
    },
    /**
     * Replaces any existing disabled dates with new values and refreshes the DatePicker.
     * @param {String[]/RegExp} disabledDates An array of date strings (see the {@link #disabledDates} config for
     * details on supported values), or a JavaScript regular expression used to disable a pattern of dates.
     * @return {Ext.picker.Date} this
     */
    setDisabledDates: function(dd) {
        var me = this;
        if (Ext.isArray(dd)) {
            me.disabledDates = dd;
            me.disabledDatesRE = null;
        } else {
            me.disabledDatesRE = dd;
        }
        me.initDisabledDays();
        me.update(me.value, true);
        return me;
    },
    /**
     * Replaces any existing disabled days (by index, 0-6) with new values and refreshes the DatePicker.
     * @param {Number[]} disabledDays An array of disabled day indexes. See the {@link #disabledDays} config for details
     * on supported values.
     * @return {Ext.picker.Date} this
     */
    setDisabledDays: function(dd) {
        this.disabledDays = dd;
        return this.update(this.value, true);
    },
    /**
     * Replaces any existing {@link #minDate} with the new value and refreshes the DatePicker.
     * @param {Date} value The minimum date that can be selected
     * @return {Ext.picker.Date} this
     */
    setMinDate: function(dt) {
        this.minDate = dt;
        return this.update(this.value, true);
    },
    /**
     * Replaces any existing {@link #maxDate} with the new value and refreshes the DatePicker.
     * @param {Date} value The maximum date that can be selected
     * @return {Ext.picker.Date} this
     */
    setMaxDate: function(dt) {
        this.maxDate = dt;
        return this.update(this.value, true);
    },
    /**
     * Sets the value of the date field
     * @param {Date} value The date to set
     * @return {Ext.picker.Date} this
     */
    setValue: function(value) {
        // If passed a null value just pass in a new date object.
        this.value = value || new Date();
        return this.update(this.value);
    },
    /**
     * Gets the current selected value of the date field
     * @return {Date} The selected date
     */
    getValue: function() {
        return this.value;
    },
    //<locale type="function">
    /**
     * Gets a single character to represent the day of the week
     * @return {String} The character
     */
    getDayInitial: function(value) {
        return value.substr(value.length - 1);
        
    },
    //</locale>
    /**
     * @inheritdoc
     * @private
     */
    onEnable: function() {
        var me = this;
        me.callParent();
        me.syncDisabled(false, true);
        me.update(me.activeDate);
    },
    /**
     * @inheritdoc
     * @private
     */
    onShow: function() {
        var me = this;
        me.callParent();
        me.syncDisabled(false);
        if (me.pickerField) {
            me.startValue = me.pickerField.getValue();
        }
    },
    /**
     * @inheritdoc
     * @private
     */
    onHide: function() {
        this.callParent();
        this.syncDisabled(true);
    },
    /**
     * @inheritdoc
     * @private
     */
    onDisable: function() {
        this.callParent();
        this.syncDisabled(true, true);
    },
    /**
     * Get the current active date.
     * @private
     * @return {Date} The active date
     */
    getActive: function() {
        return this.activeDate || this.value;
    },
    /**
     * Run any animation required to hide/show the month picker.
     * @private
     * @param {Boolean} isHide True if it's a hide operation
     */
    runAnimation: function(isHide) {
        var picker = this.monthPicker,
            options = {
                duration: 200,
                callback: function() {
                    picker.setVisible(!isHide);
                }
            };
        if (isHide) {
            picker.el.slideOut('t', options);
        } else {
            picker.el.slideIn('t', options);
        }
    },
    /**
     * Hides the month picker, if it's visible.
     * @param {Boolean} [animate] Indicates whether to animate this action. If the animate
     * parameter is not specified, the behavior will use {@link #disableAnim} to determine
     * whether to animate or not.
     * @return {Ext.picker.Date} this
     */
    hideMonthPicker: function(animate) {
        var me = this,
            picker = me.monthPicker;
        if (picker && picker.isVisible()) {
            if (me.shouldAnimate(animate)) {
                me.runAnimation(true);
            } else {
                picker.hide();
            }
        }
        return me;
    },
    doShowMonthPicker: function() {
        // Wrap in an extra call so we can prevent the button
        // being passed as an animation parameter.
        this.showMonthPicker();
    },
    doHideMonthPicker: function() {
        // Wrap in an extra call so we can prevent this
        // being passed as an animation parameter
        this.hideMonthPicker();
    },
    /**
     * Show the month picker
     * @param {Boolean} [animate] Indicates whether to animate this action. If the animate
     * parameter is not specified, the behavior will use {@link #disableAnim} to determine
     * whether to animate or not.
     * @return {Ext.picker.Date} this
     */
    showMonthPicker: function(animate) {
        var me = this,
            el = me.el,
            picker;
        if (me.rendered && !me.disabled) {
            picker = me.createMonthPicker();
            if (!picker.isVisible()) {
                picker.setValue(me.getActive());
                picker.setSize(el.getSize());
                // Null out floatParent so that the [-1, -1] position is not made relative to this
                picker.floatParent = null;
                picker.setPosition(-el.getBorderWidth('l'), -el.getBorderWidth('t'));
                if (me.shouldAnimate(animate)) {
                    me.runAnimation(false);
                } else {
                    picker.show();
                }
            }
        }
        return me;
    },
    /**
     * Checks whether a hide/show action should animate
     * @private
     * @param {Boolean} [animate] A possible animation value
     * @return {Boolean} Whether to animate the action
     */
    shouldAnimate: function(animate) {
        return Ext.isDefined(animate) ? animate : !this.disableAnim;
    },
    /**
     * Create the month picker instance
     * @private
     * @return {Ext.picker.Month} picker
     */
    createMonthPicker: function() {
        var me = this,
            picker = me.monthPicker;
        if (!picker) {
            me.monthPicker = picker = new Ext.picker.Month({
                renderTo: me.el,
                // We need to set the ownerCmp so that owns() can correctly
                // match up the component hierarchy so that focus does not leave
                // an owning picker field if/when this gets focus.
                ownerCmp: me,
                floating: true,
                padding: me.padding,
                shadow: false,
                small: me.showToday === false,
                footerButtonUI: me.footerButtonUI,
                listeners: {
                    scope: me,
                    cancelclick: me.onCancelClick,
                    okclick: me.onOkClick,
                    yeardblclick: me.onOkClick,
                    monthdblclick: me.onOkClick
                }
            });
            if (!me.disableAnim) {
                // hide the element if we're animating to prevent an initial flicker
                picker.el.setStyle('display', 'none');
            }
            picker.hide();
            me.on('beforehide', me.doHideMonthPicker, me);
        }
        return picker;
    },
    /**
     * Respond to an ok click on the month picker
     * @private
     */
    onOkClick: function(picker, value) {
        var me = this,
            month = value[0],
            year = value[1],
            date = new Date(year, month, me.getActive().getDate());
        if (date.getMonth() !== month) {
            // 'fix' the JS rolling date conversion if needed
            date = Ext.Date.getLastDateOfMonth(new Date(year, month, 1));
        }
        me.setValue(date);
        me.hideMonthPicker();
    },
    /**
     * Respond to a cancel click on the month picker
     * @private
     */
    onCancelClick: function() {
        this.selectedUpdate(this.activeDate);
        this.hideMonthPicker();
    },
    /**
     * Show the previous month.
     * @param {Object} e
     * @return {Ext.picker.Date} this
     */
    showPrevMonth: function(e) {
        return this.setValue(Ext.Date.add(this.activeDate, Ext.Date.MONTH, -1));
    },
    /**
     * Show the next month.
     * @param {Object} e
     * @return {Ext.picker.Date} this
     */
    showNextMonth: function(e) {
        return this.setValue(Ext.Date.add(this.activeDate, Ext.Date.MONTH, 1));
    },
    /**
     * Show the previous year.
     * @return {Ext.picker.Date} this
     */
    showPrevYear: function() {
        return this.setValue(Ext.Date.add(this.activeDate, Ext.Date.YEAR, -1));
    },
    /**
     * Show the next year.
     * @return {Ext.picker.Date} this
     */
    showNextYear: function() {
        return this.setValue(Ext.Date.add(this.activeDate, Ext.Date.YEAR, 1));
    },
    /**
     * Respond to the mouse wheel event
     * @private
     * @param {Ext.event.Event} e
     */
    handleMouseWheel: function(e) {
        var delta;
        e.stopEvent();
        if (!this.disabled) {
            delta = e.getWheelDelta();
            if (delta > 0) {
                this.showPrevMonth();
            } else if (delta < 0) {
                this.showNextMonth();
            }
        }
    },
    /**
     * Respond to a date being clicked in the picker
     * @private
     * @param {Ext.event.Event} e
     * @param {HTMLElement} t
     */
    handleDateClick: function(e, t) {
        var me = this,
            handler = me.handler,
            date;
        e.stopEvent();
        if (!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)) {
            date = new Date(t.dateValue);
            me.setValue(new Date(date.getFullYear(), date.getMonth(), date.getDate(), me.hourField.getValue(), me.minuteField.getValue(), me.secondField.getValue()));
            me.fireEvent('select', me, me.value);
            if (handler) {
                Ext.callback(handler, me.scope, [
                    me,
                    me.value
                ], null, me, me);
            }
            // event handling is turned off on hide
            // when we are using the picker in a field
            // therefore onSelect comes AFTER the select
            // event.
            me.onSelect();
        }
    },
    /**
     * Perform any post-select actions
     * @private
     */
    onSelect: function() {
        if (this.hideOnSelect) {
            this.hide();
        }
    },
    /**
     * Sets the current value to today.
     * @return {Ext.picker.Date} this
     */
    selectToday: function() {
        var me = this,
            btn = me.todayBtn,
            handler = me.handler;
        if (btn && !btn.disabled) {
            me.setValue(new Date());
            me.fireEvent('select', me, me.value);
            if (handler) {
                Ext.callback(handler, me.scope, [
                    me,
                    me.value
                ], null, me, me);
            }
            me.onSelect();
        }
        return me;
    },
    /**
     * Update the selected cell
     * @private
     * @param {Date} date The new date
     */
    selectedUpdate: function(date) {
        var me = this,
            t = Ext.Date.clearTime(date, true).getTime(),
            cells = me.cells,
            cls = me.selectedCls,
            c,
            cLen = cells.getCount(),
            cell;
        me.eventEl.dom.setAttribute('aria-busy', 'true');
        cell = me.activeCell;
        if (cell) {
            Ext.fly(cell).removeCls(cls);
            cell.setAttribute('aria-selected', false);
        }
        for (c = 0; c < cLen; c++) {
            cell = cells.item(c);
            if (me.textNodes[c].dateValue === t) {
                me.activeCell = cell.dom;
                me.eventEl.dom.setAttribute('aria-activedescendant', cell.dom.id);
                cell.dom.setAttribute('aria-selected', true);
                cell.addCls(cls);
                me.fireEvent('highlightitem', me, cell);
                break;
            }
        }
        me.eventEl.dom.removeAttribute('aria-busy');
    },
    /**
     * Update the contents of the picker for a new month
     * @private
     * @param {Date} date The new date
     */
    fullUpdate: function(date) {
        var me = this,
            cells = me.cells.elements,
            textNodes = me.textNodes,
            disabledCls = me.disabledCellCls,
            eDate = Ext.Date,
            i = 0,
            extraDays = 0,
            newDate = +eDate.clearTime(date, true),
            today = +eDate.clearTime(new Date()),
            min = me.minDate ? eDate.clearTime(me.minDate, true) : Number.NEGATIVE_INFINITY,
            max = me.maxDate ? eDate.clearTime(me.maxDate, true) : Number.POSITIVE_INFINITY,
            ddMatch = me.disabledDatesRE,
            ddText = me.disabledDatesText,
            ddays = me.disabledDays ? me.disabledDays.join('') : false,
            ddaysText = me.disabledDaysText,
            format = me.format,
            days = eDate.getDaysInMonth(date),
            firstOfMonth = eDate.getFirstDateOfMonth(date),
            startingPos = firstOfMonth.getDay() - me.startDay,
            previousMonth = eDate.add(date, eDate.MONTH, -1),
            ariaTitleDateFormat = me.ariaTitleDateFormat,
            prevStart, current, disableToday, tempDate, setCellClass, html, cls, formatValue, value;
        me.hourField.setValue(date.getHours());
        me.minuteField.setValue(date.getMinutes());
        me.secondField.setValue(date.getSeconds());
        if (startingPos < 0) {
            startingPos += 7;
        }
        days += startingPos;
        prevStart = eDate.getDaysInMonth(previousMonth) - startingPos;
        current = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), prevStart, me.initHour);
        if (me.showToday) {
            tempDate = eDate.clearTime(new Date());
            disableToday = (tempDate < min || tempDate > max || (ddMatch && format && ddMatch.test(eDate.dateFormat(tempDate, format))) || (ddays && ddays.indexOf(tempDate.getDay()) !== -1));
            me.todayDisabled = disableToday;
            if (!me.disabled) {
                me.todayBtn.setDisabled(disableToday);
            }
        }
        setCellClass = function(cellIndex, cls) {
            var cell = cells[cellIndex],
                describedBy = [];
            // Cells are not rendered with ids
            if (!cell.hasAttribute('id')) {
                cell.setAttribute('id', me.id + '-cell-' + cellIndex);
            }
            // store dateValue number as an expando
            value = +eDate.clearTime(current, true);
            cell.firstChild.dateValue = value;
            cell.setAttribute('aria-label', eDate.format(current, ariaTitleDateFormat));
            // Here and below we can't use title attribute instead of data-qtip
            // because JAWS will announce title value before cell content
            // which is not what we need. Also we are using aria-describedby attribute
            // and not placing the text in aria-label because some cells may have
            // compound descriptions (like Today and Disabled day).
            cell.removeAttribute('aria-describedby');
            cell.removeAttribute('data-qtip');
            if (value === today) {
                cls += ' ' + me.todayCls;
                describedBy.push(me.id + '-todayText');
            }
            if (value === newDate) {
                me.activeCell = cell;
                me.eventEl.dom.setAttribute('aria-activedescendant', cell.id);
                cell.setAttribute('aria-selected', true);
                cls += ' ' + me.selectedCls;
                me.fireEvent('highlightitem', me, cell);
            } else {
                cell.setAttribute('aria-selected', false);
            }
            if (value < min) {
                cls += ' ' + disabledCls;
                describedBy.push(me.id + '-ariaMinText');
                cell.setAttribute('data-qtip', me.minText);
            } else if (value > max) {
                cls += ' ' + disabledCls;
                describedBy.push(me.id + '-ariaMaxText');
                cell.setAttribute('data-qtip', me.maxText);
            } else if (ddays && ddays.indexOf(current.getDay()) !== -1) {
                cell.setAttribute('data-qtip', ddaysText);
                describedBy.push(me.id + '-ariaDisabledDaysText');
                cls += ' ' + disabledCls;
            } else if (ddMatch && format) {
                formatValue = eDate.dateFormat(current, format);
                if (ddMatch.test(formatValue)) {
                    cell.setAttribute('data-qtip', ddText.replace('%0', formatValue));
                    describedBy.push(me.id + '-ariaDisabledDatesText');
                    cls += ' ' + disabledCls;
                }
            }
            if (describedBy.length) {
                cell.setAttribute('aria-describedby', describedBy.join(' '));
            }
            cell.className = cls + ' ' + me.cellCls;
        };
        me.eventEl.dom.setAttribute('aria-busy', 'true');
        for (; i < me.numDays; ++i) {
            if (i < startingPos) {
                html = (++prevStart);
                cls = me.prevCls;
            } else if (i >= days) {
                html = (++extraDays);
                cls = me.nextCls;
            } else {
                html = i - startingPos + 1;
                cls = me.activeCls;
            }
            textNodes[i].innerHTML = html;
            current.setDate(current.getDate() + 1);
            setCellClass(i, cls);
        }
        me.eventEl.dom.removeAttribute('aria-busy');
        me.monthBtn.setText(Ext.Date.format(date, me.monthYearFormat));
    },
    /**
     * Update the contents of the picker
     * @private
     * @param {Date} date The new date
     * @param {Boolean} forceRefresh True to force a full refresh
     */
    update: function(date, forceRefresh) {
        var me = this,
            active = me.activeDate;
        if (me.rendered) {
            me.activeDate = date;
            if (!forceRefresh && active && me.el && active.getMonth() === date.getMonth() && active.getFullYear() === date.getFullYear()) {
                me.selectedUpdate(date, active);
            } else {
                me.fullUpdate(date, active);
            }
        }
        return me;
    },
    /*
    doDestroy: function () {
        var me = this;
        me.callParent();
        if (me.rendered) {
            Ext.destroy(
                me.keyNav,
                me.monthPicker,
                me.monthBtn,
                me.nextRepeater,
                me.prevRepeater,
                me.todayBtn,
                me.hourField,
                me.minuteField,
                me.secondField,
                me.todayElSpan
            );
        }
    },*/
    privates: {
        // Do the job of a container layout at this point even though we are not a Container.
        // TODO: Refactor as a Container.
        finishRenderChildren: function() {
            var me = this;
            me.callParent();
            me.monthBtn.finishRender();
            me.hourField.finishRender();
            me.minuteField.finishRender();
            me.secondField.finishRender();
            if (me.showToday) {
                me.todayBtn.finishRender();
            }
        },
        getFocusEl: function() {
            return this.eventEl;
        },
        /**
         * Set the disabled state of various internal components
         * @param {Boolean} disabled
         * @private
         */
        syncDisabled: function(disabled, doButton) {
            var me = this,
                keyNav = me.keyNav,
                todayBtn = me.todayBtn;
            // If we have one, we have all
            if (keyNav) {
                keyNav.setDisabled(disabled);
                me.prevRepeater.setDisabled(disabled);
                me.nextRepeater.setDisabled(disabled);
            }
            if (doButton && todayBtn) {
                todayBtn.setDisabled(me.todayDisabled || disabled);
            }
        }
    }
});

/**
 *
 * <p> Title:DateTimePicker.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/form/field/date)</p>
 * <p> Description:  带时分秒的时间选择器</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.date.DateTimePicker', {
    extend: 'Ext.form.field.Picker',
    alias: 'widget.datetimefield',
    requires: [
        'wys.form.field.date.DateTime'
    ],
    format: "Y-m-d H:i:s",
    ariaFormat: 'Y-m-d H:i:s',
    altFormats: "m/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j",
    disabledDaysText: "禁用",
    ariaDisabledDaysText: "This day of week is disabled",
    disabledDatesText: "禁用",
    ariaDisabledDatesText: "日期不能被选择",
    minText: "该输入项的日期必须在 {0} 之后",
    ariaMinText: "该输入项的日期必须在 {0} 之后",
    maxText: "该输入项的日期必须在 {0} 之前",
    ariaMaxText: "该输入项的日期必须在 {0} 之前",
    invalidText: "{0} 是无效的日期 - 必须符合格式： {1}",
    formatText: '预期的日期格式为 {0}.',
    triggerCls: Ext.baseCSSPrefix + 'form-date-trigger',
    showToday: true,
    editable: false,
    useStrict: undefined,
    initTime: '12',
    // 24 hour format
    initTimeFormat: 'H',
    matchFieldWidth: false,
    startDay: 0,
    /**
     * @cfg
     * @inheritdoc
     */
    valuePublishEvent: [
        'select',
        'blur'
    ],
    componentCls: Ext.baseCSSPrefix + 'form-field-date',
    ariaRole: 'combobox',
    /** @private */
    rawDate: null,
    /** @private */
    rawDateText: '',
    initComponent: function() {
        var me = this,
            isString = Ext.isString,
            min, max;
        min = me.minValue;
        max = me.maxValue;
        if (isString(min)) {
            me.minValue = me.parseDate(min);
        }
        if (isString(max)) {
            me.maxValue = me.parseDate(max);
        }
        me.disabledDatesRE = null;
        me.initDisabledDays();
        me.callParent();
    },
    getSubTplData: function(fieldData) {
        var me = this,
            data, ariaAttr;
        data = me.callParent([
            fieldData
        ]);
        if (!me.ariaStaticRoles[me.ariaRole]) {
            ariaAttr = data.ariaElAttributes;
            if (ariaAttr) {
                ariaAttr['aria-owns'] = me.id + '-inputEl ' + me.id + '-picker-eventEl';
                ariaAttr['aria-autocomplete'] = 'none';
            }
        }
        return data;
    },
    initValue: function() {
        var me = this,
            value = me.value;
        if (Ext.isString(value)) {
            me.value = me.rawToValue(value);
            me.rawDate = me.value;
            me.rawDateText = me.parseDate(me.value);
        } else {
            me.value = value || null;
            me.rawDate = me.value;
            me.rawDateText = me.value ? me.parseDate(me.value) : '';
        }
        me.callParent();
    },
    /**
     * @private
     */
    initDisabledDays: function() {
        if (this.disabledDates) {
            var dd = this.disabledDates,
                len = dd.length - 1,
                re = "(?:",
                d,
                dLen = dd.length,
                date;
            for (d = 0; d < dLen; d++) {
                date = dd[d];
                re += Ext.isDate(date) ? '^' + Ext.String.escapeRegex(date.dateFormat(this.format)) + '$' : date;
                if (d !== len) {
                    re += '|';
                }
            }
            this.disabledDatesRE = new RegExp(re + ')');
        }
    },
    setDisabledDates: function(disabledDates) {
        var me = this,
            picker = me.picker;
        me.disabledDates = disabledDates;
        me.initDisabledDays();
        if (picker) {
            picker.setDisabledDates(me.disabledDatesRE);
        }
    },
    setDisabledDays: function(disabledDays) {
        var picker = this.picker;
        this.disabledDays = disabledDays;
        if (picker) {
            picker.setDisabledDays(disabledDays);
        }
    },
    setMinValue: function(value) {
        var me = this,
            picker = me.picker,
            minValue = (Ext.isString(value) ? me.parseDate(value) : value);
        me.minValue = minValue;
        if (picker) {
            picker.minText = Ext.String.format(me.minText, me.formatDate(me.minValue));
            picker.setMinDate(minValue);
        }
    },
    setMaxValue: function(value) {
        var me = this,
            picker = me.picker,
            maxValue = (Ext.isString(value) ? me.parseDate(value) : value);
        me.maxValue = maxValue;
        if (picker) {
            picker.maxText = Ext.String.format(me.maxText, me.formatDate(me.maxValue));
            picker.setMaxDate(maxValue);
        }
    },
    getErrors: function(value) {
        value = arguments.length > 0 ? value : this.formatDate(this.processRawValue(this.getRawValue()));
        var me = this,
            format = Ext.String.format,
            clearTime = Ext.Date.clearTime,
            errors = me.callParent([
                value
            ]),
            disabledDays = me.disabledDays,
            disabledDatesRE = me.disabledDatesRE,
            minValue = me.minValue,
            maxValue = me.maxValue,
            len = disabledDays ? disabledDays.length : 0,
            i = 0,
            svalue, fvalue, day, time;
        if (value === null || value.length < 1) {
            // if it's blank and textfield didn't flag it then it's valid
            return errors;
        }
        svalue = value;
        value = me.parseDate(value);
        if (!value) {
            errors.push(format(me.invalidText, svalue, Ext.Date.unescapeFormat(me.format)));
            return errors;
        }
        time = value.getTime();
        if (minValue && time < clearTime(minValue).getTime()) {
            errors.push(format(me.minText, me.formatDate(minValue)));
        }
        if (maxValue && time > clearTime(maxValue).getTime()) {
            errors.push(format(me.maxText, me.formatDate(maxValue)));
        }
        if (disabledDays) {
            day = value.getDay();
            for (; i < len; i++) {
                if (day === disabledDays[i]) {
                    errors.push(me.disabledDaysText);
                    break;
                }
            }
        }
        fvalue = me.formatDate(value);
        if (disabledDatesRE && disabledDatesRE.test(fvalue)) {
            errors.push(format(me.disabledDatesText, fvalue));
        }
        return errors;
    },
    rawToValue: function(rawValue) {
        var me = this;
        if (rawValue === me.rawDateText) {
            return me.rawDate;
        }
        return me.parseDate(rawValue) || rawValue || null;
    },
    valueToRaw: function(value) {
        return this.formatDate(this.parseDate(value));
    },
    setValue: function(v) {
        var me = this;
        me.lastValue = me.rawDateText;
        me.lastDate = me.rawDate;
        if (Ext.isDate(v)) {
            me.rawDate = v;
            me.rawDateText = me.formatDate(v);
        } else {
            me.rawDate = me.rawToValue(v);
            me.rawDateText = me.formatDate(v);
            if (me.rawDate === v) {
                me.rawDate = null;
                me.rawDateText = '';
            }
        }
        me.callParent(arguments);
    },
    checkChange: function() {
        var me = this,
            newVal, oldVal, lastDate;
        if (!me.suspendCheckChange) {
            newVal = me.getRawValue();
            oldVal = me.lastValue;
            lastDate = me.lastDate;
            if (!me.destroyed && me.didValueChange(newVal, oldVal)) {
                me.rawDate = me.rawToValue(newVal);
                me.rawDateText = me.formatDate(newVal);
                me.lastValue = newVal;
                me.lastDate = me.rawDate;
                me.fireEvent('change', me, me.getValue(), lastDate);
                me.onChange(newVal, oldVal);
            }
        }
    },
    safeParse: function(value, format) {
        var me = this,
            utilDate = Ext.Date,
            result = null,
            strict = me.useStrict,
            parsedDate;
        if (utilDate.formatContainsHourInfo(format)) {
            result = utilDate.parse(value, format, strict);
        } else {
            parsedDate = utilDate.parse(value + ' ' + me.initTime, format + ' ' + me.initTimeFormat, strict);
            if (parsedDate) {
                result = utilDate.clearTime(parsedDate);
            }
        }
        return result;
    },
    /**
     * @private
     */
    getSubmitValue: function() {
        var format = this.submitFormat || this.format,
            value = this.rawDate;
        return value ? Ext.Date.format(value, format) : '';
    },
    getValue: function() {
        return this.rawDate || null;
    },
    setRawValue: function(value) {
        var me = this;
        me.callParent([
            value
        ]);
        me.rawDate = Ext.isDate(value) ? value : me.rawToValue(value);
        me.rawDateText = this.formatDate(value);
    },
    /**
     * @private
     */
    parseDate: function(value) {
        if (!value || Ext.isDate(value)) {
            return value;
        }
        var me = this,
            val = me.safeParse(value, me.format),
            altFormats = me.altFormats,
            altFormatsArray = me.altFormatsArray,
            i = 0,
            len;
        if (!val && altFormats) {
            altFormatsArray = altFormatsArray || altFormats.split('|');
            len = altFormatsArray.length;
            for (; i < len && !val; ++i) {
                val = me.safeParse(value, altFormatsArray[i]);
            }
        }
        return val;
    },
    /**
     * @private
     */
    formatDate: function(date, format) {
        return Ext.isDate(date) ? Ext.Date.dateFormat(date, format || this.format) : date;
    },
    createPicker: function() {
        var me = this,
            format = Ext.String.format;
        return new wys.form.field.date.DateTime({
            id: me.id + '-picker',
            pickerField: me,
            floating: true,
            preventRefocus: true,
            hidden: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            ariaDisabledDatesText: me.ariaDisabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            ariaDisabledDaysText: me.ariaDisabledDaysText,
            format: me.format,
            showToday: me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            ariaMinText: format(me.ariaMinText, me.formatDate(me.minValue, me.ariaFormat)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            ariaMaxText: format(me.ariaMaxText, me.formatDate(me.maxValue, me.ariaFormat)),
            listeners: {
                scope: me,
                select: me.onSelect,
                tabout: me.onTabOut
            },
            keyNavConfig: {
                esc: function() {
                    me.inputEl.focus();
                    me.collapse();
                }
            }
        });
    },
    onSelect: function(m, d) {
        var me = this;
        me.setValue(d);
        me.rawDate = d;
        me.fireEvent('select', me, d);
        me.onTabOut(m);
    },
    onTabOut: function(picker) {
        this.inputEl.focus();
        this.collapse();
    },
    /**
     * @private
     */
    onExpand: function() {
        var value = this.rawDate;
        this.picker.setValue(Ext.isDate(value) ? value : new Date());
    },
    /**
     * @private
     */
    onBlur: function(e) {
        var me = this,
            v = me.rawToValue(me.getRawValue());
        if (v === '' || Ext.isDate(v)) {
            me.setValue(v);
        }
        me.callParent([
            e
        ]);
    }
});

/**
 *
 * <p> Title:AreaColumn.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/grid/column)</p>
 * <p> Description:  显示区域列</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.grid.column.AreaColumn', {
    extend: 'Ext.grid.column.Column',
    requires: [
        'wys.form.field.CityPicker'
    ],
    alias: 'widget.areacolumn',
    constructor: function() {
        this.scope = this;
        this.callParent(arguments);
    },
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },
    defaultRenderer: function(value) {
        var me = this;
        //创建一个空的城市选择器 
        var returnCityChoseTxt = "";
        Ext.create('wys.form.field.CityPicker', {
            valueField: 'city',
            displayField: 'cityText'
        }).getViewModel().getData().pickerCities.getData().each(function(g, e) {
            var tempData = g.data;
            if (tempData.province.toString() === value || tempData.city.toString() === value) {
                returnCityChoseTxt = tempData.cityText;
                return true;
            }
        });
        return returnCityChoseTxt;
    },
    updater: function(cell, value) {
        //这里是修改时触发的事件
        Ext.fly(cell).down(this.getView().innerSelector, true).innerHTML = Ext.grid.column.Number.prototype.defaultRenderer.call(this, value);
    }
});

/**
 *
 * <p> Title:Window Command MODEL</p>
 * <p> Description:  重写Grid的ActionColumn</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * @author wys
 * @version 1.0
 */
Ext.define('wys.grid.column.Command', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.command',
    commandWidth: 18,
    dataIndex: "",
    menuDisabled: true,
    sortable: false,
    hideable: false,
    isColumn: true,
    isCommandColumn: true,
    adjustmentWidth: 4,
    constructor: function(config) {
        var me = this;
        me.callParent(arguments);
        me.commands = me.commands || [];
        if (me.autoWidth) {
            me.width = me.minWidth = me.commandWidth * me.commands.length + me.adjustmentWidth;
            me.fixed = true;
        }
        me.renderer = Ext.Function.bind(me.renderer, me);
    },
    initRenderData: function() {
        var me = this;
        me.gridRef = me.up('tablepanel');
        me.gridRef.addCls("x-grid-group-imagecommand");
        var groupFeature = me.getGroupingFeature(me.gridRef);
        if (me.groupCommands && groupFeature) {
            me.gridRef.view.on('groupclick', me.onGroupClick, me);
            me.gridRef.view.on('containerclick', me.onClick, me);
            if (Ext.isString(groupFeature.groupHeaderTpl)) {
                groupFeature.groupHeaderTpl = '<div class="group-row-imagecommand-cell">' + groupFeature.groupHeaderTpl + '</div>' + this.groupCommandTemplate;
            } else if (groupFeature.groupHeaderTpl && groupFeature.groupHeaderTpl.html) {
                groupFeature.groupHeaderTpl.html = '<div class="group-row-imagecommand-cell">' + groupFeature.groupHeaderTpl.html + '</div>' + this.groupCommandTemplate;
            }
            groupFeature.commandColumn = me;
            groupFeature.setupRowData = Ext.Function.createSequence(groupFeature.setupRowData, this.getGroupData, this);
        }
        return me.callParent(arguments);
    },
    afterHide: function() {
        this.callParent(arguments);
        Ext.select(".x-grid-cell-" + this.id).addCls("x-hide-command");
    },
    afterShow: function() {
        this.callParent(arguments);
        Ext.select(".x-grid-cell-" + this.id).removeCls("x-hide-command");
    },
    getGroupData: function(record, idx, rowValues) {
        var preparedCommands = [],
            i, cmd, command,
            groupCommands = this.groupCommands;
        if (!rowValues.isFirstRow) {
            return;
        }
        for (i = 0; i < groupCommands.length; i++) {
            cmd = groupCommands[i];
            if (cmd.iconCls && cmd.iconCls.charAt(0) === '#') {
                cmd.iconCls = X.net.RM.getIcon(cmd.iconCls.substring(1));
            }
        }
        var groupId = record.get(this.getGroupingFeature(this.gridRef).refreshData.groupField),
            records = groupId ? this.gridRef.store.getGroups().get(groupId).items : null;
        if (this.prepareGroupCommands) {
            groupCommands = Ext.net.clone(this.groupCommands);
            this.prepareGroupCommands(this.gridRef, groupCommands, groupId, records);
        }
        for (i = 0; i < groupCommands.length; i++) {
            cmd = groupCommands[i];
            cmd.tooltip = cmd.tooltip || {};
            if (cmd.iconCls && cmd.iconCls.charAt(0) === '#') {
                cmd.iconCls = X.net.RM.getIcon(cmd.iconCls.substring(1));
            }
            command = {
                command: cmd.command,
                cls: cmd.cls,
                iconCls: cmd.iconCls,
                hidden: cmd.hidden,
                disabled: cmd.disabled,
                text: cmd.text,
                style: cmd.style,
                qtext: cmd.tooltip.text,
                qtitle: cmd.tooltip.title,
                hideMode: cmd.hideMode,
                rightAlign: cmd.rightAlign || false
            };
            if (this.prepareGroupCommand) {
                this.prepareGroupCommand(this.gridRef, command, groupId, records);
            }
            if (command.iconCls && command.iconCls.charAt(0) === '#') {
                command.iconCls = X.net.RM.getIcon(command.iconCls.substring(1));
            }
            if (command.disabled) {
                command.cls = (command.cls || "") + " x-imagecommand-disabled";
            }
            if (command.hidden) {
                var hideMode = command.hideMode || "display";
                command.hideCls = "x-hidden-" + hideMode;
            }
            if (command.rightAlign) {
                command.align = "right-group-imagecommand";
            } else {
                command.align = "";
            }
            preparedCommands.push(command);
        }
        rowValues.metaGroupCache.commands = preparedCommands;
    },
    getGroupingFeature: function(grid) {
        return grid.groupingFeature;
    },
    processEvent: function(type, view, cell, recordIndex, cellIndex, e) {
        if ((type === "click") && e.getTarget(".row-imagecommand", 3)) {
            this.onClick(view, e, recordIndex, cellIndex);
            if (this.stopSelection !== false) {
                var sm = this.gridRef.getSelectionModel(),
                    locked = sm.locked;
                sm.locked = true;
                Ext.defer(function() {
                    sm.locked = locked;
                }, 1);
            }
        }
        return this.callParent(arguments);
    },
    onGroupClick: function(view, rowElement, groupName, e) {
        var t = e.getTarget(".group-row-imagecommand"),
            cmd;
        if (t) {
            var groupField = this.gridRef.store.groupField;
            cmd = Ext.fly(t).getAttribute("cmd");
            if (Ext.isEmpty(cmd, false) || Ext.fly(t).hasCls("x-imagecommand-disabled")) {
                return;
            }
            this.fireEvent("groupcommand", this, cmd, this.gridRef.store.getGroups().get(groupName));
        }
        return !t;
    },
    onClick: function(view, e, recordIndex, cellIndex) {
        var view = this.gridRef.getView(),
            cmd, record, recordId,
            t = e.getTarget(".row-imagecommand");
        if (t) {
            cmd = Ext.fly(t).getAttribute("cmd");
            if (Ext.isEmpty(cmd, false) || Ext.fly(t).hasCls("x-imagecommand-disabled")) {
                return;
            }
            var row = e.getTarget(".x-grid-row");
            if (row === false) {
                return;
            }
            if (this !== this.gridRef.headerCt.getHeaderAtIndex(cellIndex)) {
                return;
            }
            recordId = Ext.fly(t).getAttribute("recordId");
            if (recordId && this.gridRef.store.getAt) {
                record = this.gridRef.store.getByInternalId(recordId);
            } else {
                record = this.gridRef.store.getAt ? this.gridRef.store.getAt(recordIndex) : view.getRecord(view.getNode(recordIndex));
            }
            this.fireEvent("command", this, cmd, record, recordIndex, cellIndex);
        }
        t = e.getTarget(".group-row-imagecommand");
        if (t) {
            var groupField = this.gridRef.store.groupField,
                groupId = Ext.fly(t).getAttribute("data-groupname");
            cmd = Ext.fly(t).getAttribute("cmd");
            if (Ext.isEmpty(cmd, false) || Ext.fly(t).hasCls("x-imagecommand-disabled")) {
                return;
            }
            this.fireEvent("groupcommand", this, cmd, this.gridRef.store.getGroups().get(groupId));
        }
    },
    renderer: function(value, meta, record, row, col, store) {
        var node;
        meta.tdCls = meta.tdCls || "";
        meta.style = "margin-left:2px;";
        meta.tdCls += " row-imagecommand-cell";
        if (meta) {
            meta.tdCls = meta.tdCls || "";
            meta.tdCls += " row-imagecommand-cell";
        } else {
            node = view.getNode(record);
            if (node) {
                node = Ext.fly(node).down("td[data-columnid=" + this.id + "]");
                if (node) {
                    node.addCls("row-imagecommand-cell");
                }
            }
        }
        if (this.isHidden()) {
            if (meta) {
                meta.tdCls += " x-hide-command";
            } else if (node) {
                node.addCls("x-hide-command");
            }
        }
        if (this.commands) {
            var me = this,
                preparedCommands = [],
                i, cmd, command,
                commands = this.commands;
            for (i = 0; i < commands.length; i++) {
                cmd = commands[i];
                if (cmd.iconCls && cmd.iconCls.charAt(0) === '#') {
                    cmd.iconCls = X.net.RM.getIcon(cmd.iconCls.substring(1));
                }
            }
            if (this.prepareCommands) {
                commands = Ext.net.clone(this.commands);
                this.prepareCommands(this.gridRef, commands, record, row);
            }
            for (i = 0; i < commands.length; i++) {
                cmd = commands[i];
                cmd.tooltip = cmd.tooltip || {};
                if (cmd.iconCls && cmd.iconCls.charAt(0) === '#') {
                    cmd.iconCls = X.net.RM.getIcon(cmd.iconCls.substring(1));
                }
                command = {
                    command: cmd.command,
                    recordId: record.internalId,
                    cls: cmd.cls,
                    iconCls: cmd.iconCls,
                    hidden: cmd.hidden,
                    disabled: cmd.disabled,
                    text: cmd.text,
                    style: cmd.style,
                    qtext: cmd.tooltip.text || cmd.text,
                    qtitle: cmd.tooltip.title,
                    qclass: cmd.tooltip.cls,
                    qwidth: cmd.tooltip.width,
                    qheight: cmd.tooltip.height,
                    hideMode: cmd.hideMode,
                    renderer: cmd.renderer
                };
                if (typeof cmd.renderer === "function") {
                    //如果renderer是一个函数
                    cmd.renderer(command, record);
                }
                if (this.prepareCommand) {
                    this.prepareCommand(this.gridRef, command, record, row);
                }
                if (command.iconCls && command.iconCls.charAt(0) === '#') {
                    command.iconCls = X.net.RM.getIcon(command.iconCls.substring(1));
                }
                if (command.disabled) {
                    command.cls = (command.cls || "") + " x-imagecommand-disabled";
                }
                if (command.hidden) {
                    var hideMode = command.hideMode || "display";
                    command.hideCls = "x-hidden-" + hideMode;
                }
                if (Ext.isIE6 && Ext.isEmpty(cmd.text, false)) {
                    command.noTextCls = "no-row-imagecommand-text";
                }
                preparedCommands.push(command);
            }
            return this.getRowTemplate().apply({
                commands: preparedCommands
            });
        }
        return "";
    },
    commandTemplate: '<div class="row-imagecommands">' + '<tpl for="commands">' + '<div recordId="{recordId}" cmd="{command}" class="row-imagecommand {cls} {noTextCls} {iconCls} {hideCls}" ' + 'style="{style}" data-qtip="{qtext}" data-qtitle="{qtitle}" data-qclass="{qclass}" data-qwidth="{qwidth}" data-qheight="{qheight}">' + '<tpl if="text"><span data-qtip="{qtext}" data-qtitle="{qtitle}" data-qclass="{qclass}" data-qwidth="{qwidth}" data-qheight="{qheight}">{text}</span></tpl>' + '</div>' + '</tpl>' + '</div>',
    groupCommandTemplate: '<tpl for="commands">' + '<div cmd="{command}" class="group-row-imagecommand {cls} {iconCls} {hideCls} {align}" ' + 'style="{style}" data-qtip="{qtext}" data-qtitle="{qtitle}"><tpl if="text"><span data-qtip="{qtext}" data-qtitle="{qtitle}" class="{cls}">{text}</span></tpl></div>' + '</tpl>',
    getRowTemplate: function() {
        if (Ext.isEmpty(this.rowTemplate)) {
            this.rowTemplate = new Ext.XTemplate(this.commandTemplate);
        }
        return this.rowTemplate;
    }
});

/**
 * 扩展实现下拉树结构
 * @author wys
 */
Ext.define('wys.plugs.ComboTree', {
    extend: 'Ext.form.field.Picker',
    xtype: 'comboTree',
    uses: [
        'Ext.tree.Panel'
    ],
    rootVisible: false,
    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',
    config: {
        store: null,
        displayField: null,
        columns: null,
        selectOnTab: true,
        maxPickerHeight: 600,
        minPickerHeight: 300,
        autoScroll: true
    },
    editable: false,
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
        me.mon(me.store, {
            scope: me,
            load: me.onLoad,
            update: me.onUpdate
        });
    },
    createPicker: function() {
        var me = this,
            picker = new Ext.tree.Panel({
                shrinkWrapDock: 2,
                store: me.store,
                rootVisible: false,
                floating: true,
                displayField: me.displayField,
                columns: me.columns,
                minHeight: me.minPickerHeight,
                autoWidth: true,
                minWidth: 400,
                border: true,
                maxHeight: me.maxPickerHeight,
                manageHeight: false,
                autoScroll: me.autoScroll,
                shadow: false,
                listeners: {
                    scope: me,
                    itemclick: me.onItemClick
                },
                viewConfig: {
                    listeners: {
                        scope: me,
                        render: me.onViewRender
                    }
                }
            }),
            view = picker.getView();
        if (Ext.isIE9 && Ext.isStrict) {
            view.on({
                scope: me,
                highlightitem: me.repaintPickerView,
                unhighlightitem: me.repaintPickerView,
                afteritemexpand: me.repaintPickerView,
                afteritemcollapse: me.repaintPickerView
            });
        }
        return picker;
    },
    onViewRender: function(view) {
        view.getEl().on('keypress', this.onPickerKeypress, this);
    },
    repaintPickerView: function() {
        var style = this.picker.getView().getEl().dom.style;
        style.display = style.display;
    },
    onItemClick: function(view, record, node, rowIndex, e) {
        this.selectItem(record);
    },
    onPickerKeypress: function(e, el) {
        var key = e.getKey();
        if (key === e.ENTER || (key === e.TAB && this.selectOnTab)) {
            this.selectItem(this.picker.getSelectionModel().getSelection()[0]);
        }
    },
    selectItem: function(record) {
        var me = this;
        me.setValue(record.getId());
        me.fireEvent('select', me, record);
        me.collapse();
    },
    onExpand: function() {
        var me = this,
            picker = me.picker,
            store = picker.store,
            value = me.value,
            node;
        if (value) {
            node = store.getNodeById(value);
        }
        if (!node) {
            node = store.getRoot();
        }
        picker.selectPath(node.getPath());
    },
    setValue: function(value) {
        var me = this,
            record;
        me.value = value;
        if (me.store.loading) {
            return me;
        }
        record = value ? me.store.getNodeById(value) : me.store.getRoot();
        if (value === undefined) {
            record = me.store.getRoot();
            try {
                me.value = record.getId();
            } catch (e) {}
        } else {
            record = me.store.getNodeById(value);
        }
        me.setRawValue(record ? record.get(me.displayField) : '');
        return me;
    },
    getSubmitValue: function() {
        return this.value;
    },
    getValue: function() {
        return this.value;
    },
    onLoad: function() {
        var value = this.value;
        if (value) {
            this.setValue(value);
        }
    },
    onUpdate: function(store, rec, type, modifiedFieldNames) {
        var display = this.displayField;
        if (type === 'edit' && modifiedFieldNames && Ext.Array.contains(modifiedFieldNames, display) && this.value === rec.getId()) {
            this.setRawValue(rec.get(display));
        }
    }
});

/**
 * 将普通table元素转换成Ext格式的
 */
Ext.define('wys.plugs.ConvertTableToExt', {
    extend: 'Ext.grid.Panel',
    /**
     * 从创建HTML表格单元格。
     */
    constructor: function(table, config) {
        config = Ext.apply({}, config);
        table = this.table = Ext.get(table);
        var configFields = config.fields || [],
            configColumns = config.columns || [],
            fields = [],
            cols = [],
            headers = table.query("thead th"),
            i = 0,
            len = headers.length,
            data = table.dom,
            width, height, store, col, text, name;
        for (; i < len; ++i) {
            col = headers[i];
            text = col.innerHTML;
            name = 'tcol-' + i;
            fields.push(Ext.applyIf(configFields[i] || {}, {
                name: name,
                mapping: 'td:nth(' + (i + 1) + ')/@innerHTML'
            }));
            cols.push(Ext.applyIf(configColumns[i] || {}, {
                text: text,
                dataIndex: name,
                width: col.offsetWidth,
                tooltip: col.title,
                sortable: true
            }));
        }
        if (config.width) {
            width = config.width;
        } else {
            width = table.getWidth() + 1;
        }
        if (config.height) {
            height = config.height;
        }
        Ext.applyIf(config, {
            store: {
                data: data,
                fields: fields,
                proxy: {
                    type: 'memory',
                    reader: {
                        record: 'tbody tr',
                        type: 'xml'
                    }
                }
            },
            columns: cols,
            width: width,
            height: height
        });
        this.callParent([
            config
        ]);
        if (config.remove !== false) {
            data.parentNode.removeChild(data);
        }
    },
    onDestroy: function() {
        this.callParent();
        this.table.remove();
        delete this.table;
    }
});

/**
 * 系统扩展Extjs对Iframe支持
 */
Ext.define('wys.plugs.Frame', {
    extend: 'Ext.Component',
    alias: 'widget.iframe',
    loadMask: constants.system_msg.dataLoad,
    src: 'about:blank',
    renderTpl: [
        '<iframe src="{src}" id="{id}-iframeEl" data-ref="iframeEl" name="{frameName}" width="100%" height="100%" frameborder="0"></iframe>'
    ],
    childEls: [
        'iframeEl'
    ],
    initComponent: function() {
        this.callParent();
        this.frameName = this.frameName || this.id + '-frame';
    },
    initEvents: function() {
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
            win = Ext.isIE ? me.iframeEl.dom.contentWindow : window.frames[name];
        return win;
    },
    getFrame: function() {
        var me = this;
        return me.iframeEl.dom;
    },
    beforeDestroy: function() {
        this.cleanupListeners(true);
        this.callParent();
    },
    cleanupListeners: function(destroying) {
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
            } catch (e) {}
        }
    },
    onLoad: function() {
        var me = this,
            doc = me.getDoc(),
            fn = me.onRelayedEvent;
        if (doc) {
            try {
                Ext.get(doc).on(me._docListeners = {
                    mousedown: fn,
                    mousemove: fn,
                    mouseup: fn,
                    click: fn,
                    dblclick: fn,
                    scope: me
                });
            } catch (e) {}
            Ext.get(this.getWin()).on('beforeunload', me.cleanupListeners, me);
            this.el.unmask();
            this.fireEvent('load', this);
        } else if (me.src) {
            this.el.unmask();
            this.fireEvent('error', this);
        }
    },
    onRelayedEvent: function(event) {
        var iframeEl = this.iframeEl,
            iframeXY = iframeEl.getTrueXY(),
            originalEventXY = event.getXY(),
            eventXY = event.getTrueXY();
        event.xy = [
            iframeXY[0] + eventXY[0],
            iframeXY[1] + eventXY[1]
        ];
        event.injectEvent(iframeEl);
        event.xy = originalEventXY;
    },
    load: function(src) {
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

/**
 * 封装自己用的TextField
 */
Ext.define('wys.plugs.MyDateField', {
    extend: 'Ext.form.field.Display',
    alias: 'widget.myDateField',
    editable: false,
    emptyText: '&nbsp;',
    fieldCls: 'x-form-field-my',
    initComponent: function() {
        Ext.apply(this, {
            border: false,
            emptyText: '&nbsp;',
            listeners: {
                render: function(this_, e) {
                    var value = this_.getValue();
                    this_.emptyText = '&nbsp;';
                    if (Ext.isEmpty(value) === true) {} else {
                        this_.setValue(Ext.util.Format.date(new Date(value), 'Y-m-d H:i'));
                    }
                },
                // H:i
                change: function(this_, e) {
                    var value = this_.getValue();
                    this_.emptyText = '&nbsp;';
                    if (Ext.isEmpty(value) === true) {} else {
                        this_.setValue(Ext.util.Format.date(new Date(value), 'Y-m-d H:i'));
                    }
                }
            },
            // H:i
            inputWrapCls: 'x-form-field-my'
        });
        this.callParent();
    }
});

/**
 * 查询详细信息表单
 */
Ext.define('wys.plugs.MyFormLayout', {
    extend: 'Ext.form.Panel',
    xtype: 'myFormLayout',
    singlton: true,
    //标注为单例组件
    requires: [
        'Ext.container.Container'
    ],
    baseColumn: '',
    baseColumnField: [],
    otherSplitName: '',
    otherContainerColumn: '',
    otherContainerColumnField: [],
    constructor: function(baseColumn, baseColumnField, otherSplitName, otherContainerColumn, otherContainerColumnField) {
        // 实例化参数
        this.baseColumn = baseColumn;
        this.baseColumnField = baseColumnField;
        this.otherSplitName = otherSplitName;
        this.otherContainerColumn = otherContainerColumn;
        this.otherContainerColumnField = otherContainerColumnField;
    },
    buildBaseComponent: function() {
        var base_container = {
                xtype: 'container',
                anchor: '100%',
                layout: 'hbox',
                items: []
            };
    },
    buildOtherComponent: function() {}
});

/**
 * 封装自己用的TextField
 */
Ext.define('wys.plugs.MyTextField', {
    extend: 'Ext.form.field.Display',
    // 'Ext.form.field.Text',
    alias: 'widget.myTextField',
    //    readOnly : true,
    editable: false,
    fieldCls: 'x-form-field-my',
    initComponent: function() {
        Ext.apply(this, {
            border: false,
            listeners: {
                render: function(this_, e) {
                    var value = this_.getValue();
                    if (Ext.isEmpty(value)) {
                        this_.setValue('    &nbsp;');
                    }
                },
                change: function(this_, e) {
                    var value = this_.getValue();
                    if (Ext.isEmpty(value)) {
                        this_.setValue('&nbsp;&nbsp;');
                    }
                }
            },
            inputWrapCls: 'x-form-field-my'
        });
        this.callParent();
    }
});

/**
 * 通知组件
 */
Ext.define('wys.plugs.Notification', {
    extend: 'Ext.window.Window',
    alias: 'widget.notification',
    autoClose: true,
    autoHeight: true,
    plain: false,
    draggable: false,
    shadow: false,
    focus: Ext.emptyFn,
    // For alignment and to store array of rendered notifications. Defaults to document if not set.
    manager: null,
    useXAxis: false,
    // Options: br, bl, tr, tl, t, l, b, r
    position: 'br',
    // Pixels between each notification
    spacing: 6,
    // Pixels from the managers borders to start the first notification
    paddingX: 30,
    paddingY: 10,
    slideInAnimation: 'easeIn',
    slideBackAnimation: 'bounceOut',
    slideInDuration: 1500,
    slideBackDuration: 1000,
    hideDuration: 500,
    autoCloseDelay: 7000,
    stickOnClick: true,
    stickWhileHover: true,
    // Private. Do not override!
    isHiding: false,
    isFading: false,
    destroyAfterHide: false,
    closeOnMouseOut: false,
    // Caching coordinates to be able to align to final position of siblings being animated
    xPos: 0,
    yPos: 0,
    statics: {
        defaultManager: {
            el: null
        }
    },
    initComponent: function() {
        var me = this;
        // Backwards compatibility
        if (Ext.isDefined(me.corner)) {
            me.position = me.corner;
        }
        if (Ext.isDefined(me.slideDownAnimation)) {
            me.slideBackAnimation = me.slideDownAnimation;
        }
        if (Ext.isDefined(me.autoDestroyDelay)) {
            me.autoCloseDelay = me.autoDestroyDelay;
        }
        if (Ext.isDefined(me.autoHideDelay)) {
            me.autoCloseDelay = me.autoHideDelay;
        }
        if (Ext.isDefined(me.autoHide)) {
            me.autoClose = me.autoHide;
        }
        if (Ext.isDefined(me.slideInDelay)) {
            me.slideInDuration = me.slideInDelay;
        }
        if (Ext.isDefined(me.slideDownDelay)) {
            me.slideBackDuration = me.slideDownDelay;
        }
        if (Ext.isDefined(me.fadeDelay)) {
            me.hideDuration = me.fadeDelay;
        }
        // 'bc', lc', 'rc', 'tc' compatibility
        me.position = me.position.replace(/c/, '');
        me.updateAlignment(me.position);
        me.setManager(me.manager);
        me.callParent(arguments);
    },
    onRender: function() {
        var me = this;
        me.callParent(arguments);
        me.el.hover(function() {
            me.mouseIsOver = true;
        }, function() {
            me.mouseIsOver = false;
            if (me.closeOnMouseOut) {
                me.closeOnMouseOut = false;
                me.close();
            }
        }, me);
    },
    updateAlignment: function(position) {
        var me = this;
        switch (position) {
            case 'br':
                me.paddingFactorX = -1;
                me.paddingFactorY = -1;
                me.siblingAlignment = "br-br";
                if (me.useXAxis) {
                    me.managerAlignment = "bl-br";
                } else {
                    me.managerAlignment = "tr-br";
                };
                break;
            case 'bl':
                me.paddingFactorX = 1;
                me.paddingFactorY = -1;
                me.siblingAlignment = "bl-bl";
                if (me.useXAxis) {
                    me.managerAlignment = "br-bl";
                } else {
                    me.managerAlignment = "tl-bl";
                };
                break;
            case 'tr':
                me.paddingFactorX = -1;
                me.paddingFactorY = 1;
                me.siblingAlignment = "tr-tr";
                if (me.useXAxis) {
                    me.managerAlignment = "tl-tr";
                } else {
                    me.managerAlignment = "br-tr";
                };
                break;
            case 'tl':
                me.paddingFactorX = 1;
                me.paddingFactorY = 1;
                me.siblingAlignment = "tl-tl";
                if (me.useXAxis) {
                    me.managerAlignment = "tr-tl";
                } else {
                    me.managerAlignment = "bl-tl";
                };
                break;
            case 'b':
                me.paddingFactorX = 0;
                me.paddingFactorY = -1;
                me.siblingAlignment = "b-b";
                me.useXAxis = 0;
                me.managerAlignment = "t-b";
                break;
            case 't':
                me.paddingFactorX = 0;
                me.paddingFactorY = 1;
                me.siblingAlignment = "t-t";
                me.useXAxis = 0;
                me.managerAlignment = "b-t";
                break;
            case 'l':
                me.paddingFactorX = 1;
                me.paddingFactorY = 0;
                me.siblingAlignment = "l-l";
                me.useXAxis = 1;
                me.managerAlignment = "r-l";
                break;
            case 'r':
                me.paddingFactorX = -1;
                me.paddingFactorY = 0;
                me.siblingAlignment = "r-r";
                me.useXAxis = 1;
                me.managerAlignment = "l-r";
                break;
        }
    },
    getXposAlignedToManager: function() {
        var me = this;
        var xPos = 0;
        // Avoid error messages if the manager does not have a dom element
        if (me.manager && me.manager.el && me.manager.el.dom) {
            if (!me.useXAxis) {
                // Element should already be aligned vertically
                return me.el.getLeft();
            } else {
                // Using getAnchorXY instead of getTop/getBottom should give a correct placement when document is used
                // as the manager but is still 0 px high. Before rendering the viewport.
                if (me.position == 'br' || me.position == 'tr' || me.position == 'r') {
                    xPos += me.manager.el.getAnchorXY('r')[0];
                    xPos -= (me.el.getWidth() + me.paddingX);
                } else {
                    xPos += me.manager.el.getAnchorXY('l')[0];
                    xPos += me.paddingX;
                }
            }
        }
        return xPos;
    },
    getYposAlignedToManager: function() {
        var me = this;
        var yPos = 0;
        // Avoid error messages if the manager does not have a dom element
        if (me.manager && me.manager.el && me.manager.el.dom) {
            if (me.useXAxis) {
                // Element should already be aligned horizontally
                return me.el.getTop();
            } else {
                // Using getAnchorXY instead of getTop/getBottom should give a correct placement when document is used
                // as the manager but is still 0 px high. Before rendering the viewport.
                if (me.position == 'br' || me.position == 'bl' || me.position == 'b') {
                    yPos += me.manager.el.getAnchorXY('b')[1];
                    yPos -= (me.el.getHeight() + me.paddingY);
                } else {
                    yPos += me.manager.el.getAnchorXY('t')[1];
                    yPos += me.paddingY;
                }
            }
        }
        return yPos;
    },
    getXposAlignedToSibling: function(sibling) {
        var me = this;
        if (me.useXAxis) {
            if (me.position == 'tl' || me.position == 'bl' || me.position == 'l') {
                // Using sibling's width when adding
                return (sibling.xPos + sibling.el.getWidth() + sibling.spacing);
            } else {
                // Using own width when subtracting
                return (sibling.xPos - me.el.getWidth() - me.spacing);
            }
        } else {
            return me.el.getLeft();
        }
    },
    getYposAlignedToSibling: function(sibling) {
        var me = this;
        if (me.useXAxis) {
            return me.el.getTop();
        } else {
            if (me.position == 'tr' || me.position == 'tl' || me.position == 't') {
                // Using sibling's width when adding
                return (sibling.yPos + sibling.el.getHeight() + sibling.spacing);
            } else {
                // Using own width when subtracting
                return (sibling.yPos - me.el.getHeight() - sibling.spacing);
            }
        }
    },
    getNotifications: function(alignment) {
        var me = this;
        if (!me.manager.notifications[alignment]) {
            me.manager.notifications[alignment] = [];
        }
        return me.manager.notifications[alignment];
    },
    setManager: function(manager) {
        var me = this;
        me.manager = manager;
        if (typeof me.manager == 'string') {
            me.manager = Ext.getCmp(me.manager);
        }
        // If no manager is provided or found, then the static object is used and the el property pointed to the body document.
        if (!me.manager) {
            me.manager = me.statics().defaultManager;
            if (!me.manager.el) {
                me.manager.el = Ext.getBody();
            }
        }
        if (typeof me.manager.notifications == 'undefined') {
            me.manager.notifications = {};
        }
    },
    beforeShow: function() {
        var me = this;
        if (me.stickOnClick) {
            if (me.body && me.body.dom) {
                Ext.fly(me.body.dom).on('click', function() {
                    me.cancelAutoClose();
                    me.addCls('notification-fixed');
                }, me);
            }
        }
        if (me.autoClose) {
            me.task = new Ext.util.DelayedTask(me.doAutoClose, me);
            me.task.delay(me.autoCloseDelay);
        }
        // Shunting offscreen to avoid flicker
        me.el.setX(-10000);
        me.el.setOpacity(1);
    },
    afterShow: function() {
        var me = this;
        me.callParent(arguments);
        var notifications = me.getNotifications(me.managerAlignment);
        if (notifications.length) {
            me.el.alignTo(notifications[notifications.length - 1].el, me.siblingAlignment, [
                0,
                0
            ]);
            me.xPos = me.getXposAlignedToSibling(notifications[notifications.length - 1]);
            me.yPos = me.getYposAlignedToSibling(notifications[notifications.length - 1]);
        } else {
            me.el.alignTo(me.manager.el, me.managerAlignment, [
                (me.paddingX * me.paddingFactorX),
                (me.paddingY * me.paddingFactorY)
            ], false);
            me.xPos = me.getXposAlignedToManager();
            me.yPos = me.getYposAlignedToManager();
        }
        Ext.Array.include(notifications, me);
        // Repeating from coordinates makes sure the windows does not flicker into the center of the viewport during animation
        me.el.animate({
            from: {
                x: me.el.getX(),
                y: me.el.getY()
            },
            to: {
                x: me.xPos,
                y: me.yPos,
                opacity: 1
            },
            easing: me.slideInAnimation,
            duration: me.slideInDuration,
            dynamic: true
        });
    },
    slideBack: function() {
        var me = this;
        var notifications = me.getNotifications(me.managerAlignment);
        var index = Ext.Array.indexOf(notifications, me);
        // Not animating the element if it already started to hide itself or if the manager is not present in the dom
        if (!me.isHiding && me.el && me.manager && me.manager.el && me.manager.el.dom && me.manager.el.isVisible()) {
            if (index) {
                me.xPos = me.getXposAlignedToSibling(notifications[index - 1]);
                me.yPos = me.getYposAlignedToSibling(notifications[index - 1]);
            } else {
                me.xPos = me.getXposAlignedToManager();
                me.yPos = me.getYposAlignedToManager();
            }
            me.stopAnimation();
            me.el.animate({
                to: {
                    x: me.xPos,
                    y: me.yPos
                },
                easing: me.slideBackAnimation,
                duration: me.slideBackDuration,
                dynamic: true
            });
        }
    },
    cancelAutoClose: function() {
        var me = this;
        if (me.autoClose) {
            me.task.cancel();
        }
    },
    doAutoClose: function() {
        var me = this;
        if (!(me.stickWhileHover && me.mouseIsOver)) {
            // Close immediately
            me.close();
        } else {
            // Delayed closing when mouse leaves the component.
            me.closeOnMouseOut = true;
        }
    },
    removeFromManager: function() {
        var me = this;
        if (me.manager) {
            var notifications = me.getNotifications(me.managerAlignment);
            var index = Ext.Array.indexOf(notifications, me);
            if (index != -1) {
                // Requires Ext JS 
                Ext.Array.erase(notifications, index, 1);
                // Slide "down" all notifications "above" the hidden one
                for (; index < notifications.length; index++) {
                    notifications[index].slideBack();
                }
            }
        }
    },
    hide: function() {
        var me = this;
        if (me.isHiding) {
            if (!me.isFading) {
                me.callParent(arguments);
                // Must come after callParent() since it will pass through hide() again triggered by destroy()
                me.isHiding = false;
            }
        } else {
            // Must be set right away in case of double clicks on the close button
            me.isHiding = true;
            me.isFading = true;
            me.cancelAutoClose();
            if (me.el) {
                me.el.fadeOut({
                    opacity: 0,
                    easing: 'easeIn',
                    duration: me.hideDuration,
                    remove: me.destroyAfterHide,
                    listeners: {
                        afteranimate: function() {
                            me.isFading = false;
                            me.removeCls('notification-fixed');
                            me.removeFromManager();
                            me.hide(me.animateTarget, me.doClose, me);
                        }
                    }
                });
            }
        }
        return me;
    },
    destroy: function() {
        var me = this;
        if (!me.hidden) {
            me.destroyAfterHide = true;
            me.hide(me.animateTarget, me.doClose, me);
        } else {
            me.callParent(arguments);
        }
    }
});

Ext.define('wys.plugs.RowEditing', {
    extend: 'Ext.grid.plugin.Editing',
    alias: 'plugin.rowEditing',
    requires: [
        'Ext.grid.RowEditor'
    ],
    lockableScope: 'top',
    editStyle: 'row',
    autoCancel: true,
    errorSummary: true,
    constructor: function() {
        var me = this;
        me.callParent(arguments);
        if (!me.clicksToMoveEditor) {
            me.clicksToMoveEditor = me.clicksToEdit;
        }
        me.autoCancel = !!me.autoCancel;
    },
    init: function(grid) {
        this.callParent([
            grid
        ]);
        if (grid.lockedGrid) {
            grid.lockedGrid.registerActionable(this);
            grid.normalGrid.registerActionable(this);
        } else {
            grid.registerActionable(this);
        }
    },
    destroy: function() {
        Ext.destroy(this.editor);
        this.callParent();
    },
    onBeforeReconfigure: function() {
        this.callParent(arguments);
        this.cancelEdit();
    },
    onReconfigure: function(grid, store, columns) {
        var ed = this.editor;
        this.callParent(arguments);
        if (columns && ed && ed.rendered) {
            ed.needsSyncFieldWidths = true;
        }
    },
    shouldStartEdit: function(editor) {
        return true;
    },
    startEdit: function(record, columnHeader) {
        var me = this,
            editor = me.getEditor(),
            context;
        if (Ext.isEmpty(columnHeader)) {
            columnHeader = me.grid.getTopLevelVisibleColumnManager().getHeaderAtIndex(0);
        }
        if (editor.beforeEdit() !== false) {
            context = me.getEditingContext(record, columnHeader);
            if (context && me.beforeEdit(context) !== false && me.fireEvent('beforeedit', me, context) !== false && !context.cancel) {
                me.context = context;
                if (me.lockingPartner) {
                    me.lockingPartner.cancelEdit();
                }
                editor.startEdit(context.record, context.column, context);
                me.editing = true;
                return true;
            }
        }
        return false;
    },
    activateCell: function(pos) {
        if (!pos.getCell().query('[tabIndex="-1"]').length) {
            this.startEdit(pos.record, pos.column);
            return true;
        }
    },
    onEnterKey: function(e) {
        var me = this,
            targetComponent;
        if (!me.grid.ownerGrid.actionableMode && me.editing) {
            targetComponent = Ext.getCmp(e.getTarget().getAttribute('componentId'));
            if (!(targetComponent && targetComponent.isPickerField && targetComponent.isExpanded)) {
                me.completeEdit();
            }
        }
    },
    cancelEdit: function() {
        var me = this;
        if (me.editing) {
            me.getContextFieldValues();
            me.getEditor().cancelEdit();
            me.callParent(arguments);
            return;
        }
        return true;
    },
    completeEdit: function() {
        var me = this,
            context = me.context;
        if (me.editing && me.validateEdit(context)) {
            me.editing = false;
            me.fireEvent('edit', me, context);
        }
    },
    validateEdit: function() {
        this.getContextFieldValues();
        return this.callParent(arguments) && this.getEditor().completeEdit();
    },
    getEditor: function() {
        var me = this;
        if (!me.editor) {
            me.editor = me.initEditor();
        }
        return me.editor;
    },
    getContextFieldValues: function() {
        var editor = this.editor,
            context = this.context,
            record = context.record,
            newValues = {},
            originalValues = {},
            editors = editor.query('>[isFormField]'),
            len = editors.length,
            i, name, item;
        for (i = 0; i < len; i++) {
            item = editors[i];
            name = item.dataIndex;
            newValues[name] = item.getValue();
            originalValues[name] = record.get(name);
        }
        Ext.apply(context, {
            newValues: newValues,
            originalValues: originalValues
        });
    },
    initEditor: function() {
        return new Ext.grid.RowEditor(this.initEditorConfig());
    },
    initEditorConfig: function() {
        var me = this,
            grid = me.grid,
            view = me.view,
            headerCt = grid.headerCt,
            btns = [
                'saveBtnText',
                'cancelBtnText',
                'errorsText',
                'dirtyText'
            ],
            b,
            bLen = btns.length,
            cfg = {
                autoCancel: me.autoCancel,
                errorSummary: me.errorSummary,
                fields: headerCt.getGridColumns(),
                hidden: true,
                view: view,
                editingPlugin: me
            },
            item;
        for (b = 0; b < bLen; b++) {
            item = btns[b];
            if (Ext.isDefined(me[item])) {
                cfg[item] = me[item];
            }
        }
        return cfg;
    },
    initEditTriggers: function() {
        var me = this,
            view = me.view,
            moveEditorEvent = me.clicksToMoveEditor === 1 ? 'click' : 'dblclick';
        me.callParent(arguments);
        if (me.clicksToMoveEditor !== me.clicksToEdit) {
            me.mon(view, 'cell' + moveEditorEvent, me.moveEditorByClick, me);
        }
        view.on({
            render: function() {
                me.mon(me.grid.headerCt, {
                    scope: me,
                    columnresize: me.onColumnResize,
                    columnhide: me.onColumnHide,
                    columnshow: me.onColumnShow
                });
            },
            single: true
        });
    },
    moveEditorByClick: function() {
        var me = this;
        if (me.editing) {
            me.superclass.onCellClick.apply(me, arguments);
        }
    },
    onColumnAdd: function(ct, column) {
        if (column.isHeader) {
            var me = this,
                editor;
            me.initFieldAccessors(column);
            editor = me.editor;
            if (editor) {
                editor.onColumnAdd(column);
            }
        }
    },
    beforeGridHeaderDestroy: function(headerCt) {
        var columns = this.grid.getColumnManager().getColumns(),
            len = columns.length,
            i, column, field;
        for (i = 0; i < len; i++) {
            column = columns[i];
            if (column.hasEditor) {
                if (column.hasEditor() && (field = column.getEditor())) {
                    field.destroy();
                }
                this.removeFieldAccessors(column);
            }
        }
    },
    onColumnResize: function(ct, column, width) {
        if (column.isHeader) {
            var me = this,
                editor = me.getEditor();
            if (editor) {
                editor.onColumnResize(column, width);
            }
        }
    },
    onColumnHide: function(ct, column) {
        var me = this,
            editor = me.getEditor();
        if (editor) {
            editor.onColumnHide(column);
        }
    },
    onColumnShow: function(ct, column) {
        var me = this,
            editor = me.getEditor();
        if (editor) {
            editor.onColumnShow(column);
        }
    },
    onColumnMove: function(ct, column, fromIdx, toIdx) {
        var me = this,
            editor = me.getEditor();
        me.initFieldAccessors(column);
        if (editor) {
            editor.onColumnMove(column, fromIdx, toIdx);
        }
    },
    setColumnField: function(column, field) {
        var me = this,
            editor = me.getEditor();
        if (editor) {
            editor.destroyColumnEditor(column);
        }
        me.callParent(arguments);
        if (editor) {
            editor.insertColumnEditor(column);
        }
    },
    createColumnField: function(column, defaultField) {
        var editor = this.editor,
            def;
        if (editor) {
            def = editor.getDefaultFieldCfg();
        }
        return this.callParent([
            column,
            defaultField || def
        ]);
    }
});

/**
 * grid列展开 新增collapsebody & expandbody 的支持
 * @author wys
 */
Ext.define('wys.plugs.RowExpander', {
    extend: 'Ext.grid.plugin.RowExpander'
});

/**
 * tab右键关闭
 */
Ext.define('wys.plugs.TabClose', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.tabclosemenu',
    mixins: {
        observable: 'Ext.util.Observable'
    },
    closeTabText: '关闭当前标签',
    showCloseOthers: true,
    closeOthersTabsText: '关闭其他标签',
    showCloseAll: true,
    closeAllTabsText: '关闭所有标签',
    extraItemsHead: null,
    extraItemsTail: null,
    //public
    constructor: function(config) {
        this.callParent([
            config
        ]);
        this.mixins.observable.constructor.call(this, config);
    },
    init: function(tabpanel) {
        this.tabPanel = tabpanel;
        this.tabBar = tabpanel.down("tabbar");
        this.mon(this.tabPanel, {
            scope: this,
            afterlayout: this.onAfterLayout,
            single: true
        });
    },
    onAfterLayout: function() {
        this.mon(this.tabBar.el, {
            scope: this,
            contextmenu: this.onContextMenu,
            delegate: '.x-tab'
        });
    },
    destroy: function() {
        this.callParent();
        Ext.destroy(this.menu);
    },
    /**
     * @private
     */
    onContextMenu: function(event, target) {
        var me = this,
            menu = me.createMenu(),
            disableAll = true,
            disableOthers = true,
            tab = me.tabBar.getChildByElement(target),
            index = me.tabBar.items.indexOf(tab);
        me.item = me.tabPanel.getComponent(index);
        menu.child('#close').setDisabled(!me.item.closable);
        if (me.showCloseAll || me.showCloseOthers) {
            me.tabPanel.items.each(function(item) {
                if (item.closable) {
                    disableAll = false;
                    if (item !== me.item) {
                        disableOthers = false;
                        return false;
                    }
                }
                return true;
            });
            if (me.showCloseAll) {
                menu.child('#closeAll').setDisabled(disableAll);
            }
            if (me.showCloseOthers) {
                menu.child('#closeOthers').setDisabled(disableOthers);
            }
        }
        event.preventDefault();
        me.fireEvent('beforemenu', menu, me.item, me);
        menu.showAt(event.getXY());
    },
    createMenu: function() {
        var me = this;
        if (!me.menu) {
            var items = [
                    {
                        itemId: 'close',
                        text: me.closeTabText,
                        iconCls: 'fa fa-close fa-fw',
                        scope: me,
                        handler: me.onClose
                    }
                ];
            if (me.showCloseAll || me.showCloseOthers) {
                items.push('-');
            }
            if (me.showCloseOthers) {
                items.push({
                    itemId: 'closeOthers',
                    iconCls: 'fa fa-share-alt fa-fw',
                    text: me.closeOthersTabsText,
                    scope: me,
                    handler: me.onCloseOthers
                });
            }
            if (me.showCloseAll) {
                items.push({
                    itemId: 'closeAll',
                    text: me.closeAllTabsText,
                    scope: me,
                    iconCls: 'fa fa-reply-all fa-fw',
                    handler: me.onCloseAll
                });
            }
            if (me.extraItemsHead) {
                items = me.extraItemsHead.concat(items);
            }
            if (me.extraItemsTail) {
                items = items.concat(me.extraItemsTail);
            }
            me.menu = Ext.create('Ext.menu.Menu', {
                items: items,
                listeners: {
                    hide: me.onHideMenu,
                    scope: me
                }
            });
        }
        return me.menu;
    },
    onHideMenu: function() {
        var me = this;
        me.fireEvent('aftermenu', me.menu, me);
    },
    onClose: function() {
        this.tabPanel.remove(this.item);
    },
    onCloseOthers: function() {
        this.doClose(true);
    },
    onCloseAll: function() {
        this.doClose(false);
    },
    doClose: function(excludeActive) {
        var items = [];
        this.tabPanel.items.each(function(item) {
            if (item.closable) {
                if (!excludeActive || item !== this.item) {
                    items.push(item);
                }
            }
        }, this);
        Ext.suspendLayouts();
        Ext.Array.forEach(items, function(item) {
            this.tabPanel.remove(item);
        }, this);
        Ext.resumeLayouts(true);
    }
});

/**
 * 将HeightCharts集成到Extjs中 <br>
 * 通过定义一个 highchart 变量来保存 highchart 句柄，同时设定 highchart 中 renderTo 为 extjs panel 中的 body 元素。
 * @author wys
 */
Ext.define('wys.plugs.charts.HeightCharts', {
    extend: 'Ext.panel.Panel',
    xtype: 'charts',
    panelTitle: null,
    chartTitle: null,
    requires: [
        'Ext.panel.Panel'
    ],
    highchart: null,
    chartColumn: [],
    //列头
    chartData: [],
    //数据
    initComponent: function() {
        var init_self = this;
        if (init_self.panelTitle) {
            init_self.title = init_self.panelTitle;
        }
        init_self.border = 1;
        this.callParent(arguments);
    },
    afterComponentLayout: function(width, height, oldWidth, oldHeight) {
        var me = this;
        var chartId = me.id + "-body";
        me.highchart = new Highcharts.Chart({
            chart: {
                renderTo: chartId,
                animation: false
            },
            title: {
                text: me.chartTitle
            },
            credits: {
                text: constants.tip.sysName,
                href: constants.tip.sysURL
            },
            colors: constants.chartsColor,
            xAxis: {
                categories: me.chartColumn
            },
            yAxis: {
                title: {
                    text: ''
                },
                /*温度 (°C)*/
                plotLines: [
                    {
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }
                ]
            },
            tooltip: {
                valueSuffix: ''
            },
            /*°C*/
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: me.chartData
        });
    }
});

/**
 * 柱状图 <br>
 * 
 * @author wys
 */
Ext.define('wys.plugs.charts.HeightChartsHistogram', {
    extend: 'Ext.panel.Panel',
    xtype: 'charts_histogram',
    panelTitle: null,
    chartTitle: null,
    requires: [
        'Ext.panel.Panel'
    ],
    highchart: null,
    plotOptions: {
        column: {
            depth: 0
        }
    },
    chartColumn: [],
    //列头
    chartData: [],
    //数据
    initComponent: function() {
        var init_self = this;
        if (init_self.panelTitle) {
            init_self.title = init_self.panelTitle;
        }
        init_self.border = 1;
        this.callParent(arguments);
    },
    afterComponentLayout: function(width, height, oldWidth, oldHeight) {
        var me = this;
        var chartId = me.id + "-body";
        me.highchart = new Highcharts.Chart({
            credits: {
                text: constants.tip.sysName,
                href: constants.tip.sysURL
            },
            colors: constants.chartsColor,
            chart: {
                renderTo: chartId,
                type: 'column',
                margin: 75,
                options3d: {
                    enabled: true,
                    alpha: 0,
                    beta: 15,
                    depth: 0,
                    viewDistance: 25
                }
            },
            yAxis: {
                title: {
                    text: '单位（台）'
                }
            },
            title: {
                text: me.chartTitle
            },
            plotOptions: me.plotOptions,
            xAxis: {
                categories: me.chartColumn
            },
            series: me.chartData
        });
    }
});

/**
 * 柱状图 <br>
 * 
 * @author wys
 */
Ext.define('wys.plugs.charts.HeightChartsPie', {
    extend: 'Ext.panel.Panel',
    panelTitle: null,
    xtype: 'charts_pie',
    chartTitle: null,
    requires: [
        'Ext.panel.Panel'
    ],
    highchart: null,
    chartColumn: [],
    //列头
    chartData: [],
    //数据
    units: '',
    //单位
    initComponent: function() {
        var init_self = this;
        if (init_self.panelTitle) {
            init_self.title = init_self.panelTitle;
        }
        init_self.border = 1;
        this.callParent(arguments);
    },
    afterComponentLayout: function(width, height, oldWidth, oldHeight) {
        var me = this;
        var chartId = me.id + "-body";
        me.highchart = new Highcharts.Chart({
            credits: {
                text: constants.tip.sysName,
                href: constants.tip.sysURL
            },
            colors: constants.chartsColor,
            chart: {
                renderTo: chartId,
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: me.chartTitle
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name} <br/> {point.y}台'
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            series: me.chartData
        });
    }
});

/**
 *
 * <p> Title:Panel.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/classic/src/tab)</p>
 * <p> Description:  重写tabPanel样式</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.tab.Panel', {
    extend: 'Ext.tab.Panel'
});

/**
 *
 * <p> Title:NoInputPaging.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/toolbar)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.toolbar.NoInputPaging', {
    extend: 'Ext.toolbar.Paging',
    xtype: 'toolbar-noinputpaging',
    displayInfo: false,
    isShow: false,
    //点击导航按钮
    onClick: function(obj) {
        var me = this;
        var updateNoticeNavItems = me.down("[reference= 'updateNoticeNav']").items.items;
        Ext.each(updateNoticeNavItems, function(item) {
            item.setPressed(false);
        });
        obj.setPressed(true);
        obj.up("window-updateNotice").getViewModel().set("currentUpdateNotice", obj.initialConfig.data.noticeDetail);
        obj.up("window-updateNotice").getViewModel().set("updateDate", Ext.util.Format.date(obj.initialConfig.data.publishDate, 'Y-m-d'));
    },
    setStore: function(data) {
        var me = this;
        me.bindStore(data);
        me.updateNavItems(data);
    },
    /**
    * Gets the standard paging items in the toolbar
    * @private
    */
    getPagingItems: function() {
        var me = this;
        return [
            {
                itemId: 'prev',
                tooltip: me.prevText,
                overflowText: me.prevText,
                iconCls: Ext.baseCSSPrefix + 'tbar-page-prev',
                disabled: true,
                handler: me.movePrevious,
                scope: me
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                reference: 'updateNoticeNav',
                defaults: {
                    xtype: 'button',
                    width: 20,
                    height: 20,
                    ui: 'toggleCricleButton',
                    margin: '0 5',
                    listeners: {
                        click: Ext.bind(me.onClick, me)
                    }
                },
                items: []
            },
            //需要从model载入的按钮
            {
                itemId: 'next',
                tooltip: me.nextText,
                overflowText: me.nextText,
                iconCls: Ext.baseCSSPrefix + 'tbar-page-next',
                disabled: true,
                handler: me.moveNext,
                scope: me
            }
        ];
    },
    //上一页
    movePrevious: function() {
        var me = this,
            store = me.store,
            prev = store.currentPage - 1;
        if (prev > 0) {
            if (me.fireEvent('beforechange', me, prev) !== false) {
                store.previousPage();
                //更新导航按钮
                me.updateNavItems(store);
                return true;
            }
        }
        return false;
    },
    //下一页
    moveNext: function() {
        var me = this,
            store = me.store,
            total = me.getPageData().pageCount,
            next = store.currentPage + 1;
        if (next <= total) {
            if (me.fireEvent('beforechange', me, next) !== false) {
                store.nextPage();
                //更新导航按钮
                me.updateNavItems(store);
                return true;
            }
        }
        return false;
    },
    //更新导航按钮
    updateNavItems: function(data) {
        var me = this,
            updateNoticeNavItems = [],
            pageData;
        var updateNoticeNav = me.down("[reference=updateNoticeNav]");
        updateNoticeNav.removeAll();
        pageData = me.getPageData();
        Ext.each(data.config.data, function(item, index, dataSelf) {
            if (index + 1 > pageData.fromRecord - 1 && index + 1 < pageData.toRecord + 1) {
                updateNoticeNavItems.push({
                    text: index + 1,
                    data: item
                });
            }
        });
        updateNoticeNav.add(updateNoticeNavItems);
        if (updateNoticeNav.items.length > 0) {
            updateNoticeNav.items.items[0].fireEvent("click", updateNoticeNav.items.items[0]);
        }
    },
    initComponent: function() {
        var me = this,
            pagingItems;
        pagingItems = me.getPagingItems();
        me.callParent();
    }
});

/**
 * tab右键关闭
 */
Ext.define('wys.ux.TabClose', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.tabclosemenu',
    mixins: {
        observable: 'Ext.util.Observable'
    },
    closeTabText: '关闭当前标签',
    showCloseOthers: true,
    closeOthersTabsText: '关闭其他标签',
    showCloseAll: true,
    closeAllTabsText: '关闭所有标签',
    extraItemsHead: null,
    extraItemsTail: null,
    //public
    constructor: function(config) {
        this.callParent([
            config
        ]);
        this.mixins.observable.constructor.call(this, config);
    },
    init: function(tabpanel) {
        this.tabPanel = tabpanel;
        this.tabBar = tabpanel.down("tabbar");
        this.mon(this.tabPanel, {
            scope: this,
            afterlayout: this.onAfterLayout,
            single: true
        });
    },
    onAfterLayout: function() {
        this.mon(this.tabBar.el, {
            scope: this,
            contextmenu: this.onContextMenu,
            delegate: '.x-tab'
        });
    },
    destroy: function() {
        this.callParent();
        Ext.destroy(this.menu);
    },
    /**
     * @private
     */
    onContextMenu: function(event, target) {
        var me = this,
            menu = me.createMenu(),
            disableAll = true,
            disableOthers = true,
            tab = me.tabBar.getChildByElement(target),
            index = me.tabBar.items.indexOf(tab);
        me.item = me.tabPanel.getComponent(index);
        menu.child('#close').setDisabled(!me.item.closable);
        if (me.showCloseAll || me.showCloseOthers) {
            me.tabPanel.items.each(function(item) {
                if (item.closable) {
                    disableAll = false;
                    if (item !== me.item) {
                        disableOthers = false;
                        return false;
                    }
                }
                return true;
            });
            if (me.showCloseAll) {
                menu.child('#closeAll').setDisabled(disableAll);
            }
            if (me.showCloseOthers) {
                menu.child('#closeOthers').setDisabled(disableOthers);
            }
        }
        event.preventDefault();
        me.fireEvent('beforemenu', menu, me.item, me);
        menu.showAt(event.getXY());
    },
    createMenu: function() {
        var me = this;
        if (!me.menu) {
            var items = [
                    {
                        itemId: 'close',
                        text: me.closeTabText,
                        iconCls: 'fa fa-close fa-fw',
                        scope: me,
                        handler: me.onClose
                    }
                ];
            if (me.showCloseAll || me.showCloseOthers) {
                items.push('-');
            }
            if (me.showCloseOthers) {
                items.push({
                    itemId: 'closeOthers',
                    iconCls: 'fa fa-share-alt fa-fw',
                    text: me.closeOthersTabsText,
                    scope: me,
                    handler: me.onCloseOthers
                });
            }
            if (me.showCloseAll) {
                items.push({
                    itemId: 'closeAll',
                    text: me.closeAllTabsText,
                    scope: me,
                    iconCls: 'fa fa-reply-all fa-fw',
                    handler: me.onCloseAll
                });
            }
            if (me.extraItemsHead) {
                items = me.extraItemsHead.concat(items);
            }
            if (me.extraItemsTail) {
                items = items.concat(me.extraItemsTail);
            }
            me.menu = Ext.create('Ext.menu.Menu', {
                items: items,
                listeners: {
                    hide: me.onHideMenu,
                    scope: me
                }
            });
        }
        return me.menu;
    },
    onHideMenu: function() {
        var me = this;
        me.fireEvent('aftermenu', me.menu, me);
    },
    onClose: function() {
        this.tabPanel.remove(this.item);
    },
    onCloseOthers: function() {
        this.doClose(true);
    },
    onCloseAll: function() {
        this.doClose(false);
    },
    doClose: function(excludeActive) {
        var items = [];
        this.tabPanel.items.each(function(item) {
            if (item.closable) {
                if (!excludeActive || item !== this.item) {
                    items.push(item);
                }
            }
        }, this);
        Ext.suspendLayouts();
        Ext.Array.forEach(items, function(item) {
            this.tabPanel.remove(item);
        }, this);
        Ext.resumeLayouts(true);
    }
});

/**
 *
 * <p> Title:CombGrid.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/ux/combobox)</p>
 * <p> Description:  下拉Gridpanel</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.ux.combobox.CombGrid', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.combgrid',
    multiSelect: false,
    //多选
    editable: false,
    gridWidth: 650,
    gridHeight: 300,
    isCheckBox: true,
    //是否复选框
    searchItems: [],
    //查询列,不用给查询按钮
    createPicker: function() {
        var me = this;
        var picker = Ext.create('wys.basic.BaseView', {
                store: me.store,
                frame: true,
                resizable: true,
                columns: me.columns,
                selModel: me.isCheckBox ? Ext.create("Ext.selection.CheckboxModel", {
                    mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
                }) : {
                    mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
                },
                floating: true,
                hidden: true,
                viewConfig: {
                    emptyText: '<div style="text-align:center">没有找到相关记录<div>'
                },
                width: me.gridWidth,
                height: me.gridHeight,
                columnLines: false,
                focusOnToFront: false
            });
        if (!Ext.isEmpty(me.title)) {
            picker.setTitle(me.title);
        }
        if (me.paging) {
            //是否分页
            picker.addDocked(Ext.create('Ext.PagingToolbar', {
                store: me.store,
                dock: "bottom"
            }));
        }
        if (me.searchItems) {
            me.searchItems_temp = [];
            //清空
            if (typeof me.searchItems != 'object') {
                util.err('查询列类型为Array');
                return;
            }
            me.searchItems_temp.push(me.searchItems[0]);
            var searchItem = {
                    xtype: 'searchBtn',
                    handler: function(btn) {
                        var store = picker.getStore();
                        store.proxy.extraParams = btn.up('toolbar').down('baseForm') == null ? {} : btn.up('toolbar').down('baseForm').getValues();
                        store.currentPage = 1;
                        store.reload();
                    }
                };
            if (Ext.Array.indexOf(me.searchItems_temp, searchItem) === -1) {
                //如果数组中存在了查询组件则不需要再次push
                me.searchItems_temp.push(searchItem);
            }
            picker.addDocked({
                xtype: 'toolbar',
                items: me.searchItems_temp,
                dock: "top"
            });
        }
        if (me.isBeforeLoad) {
            //如果为真则初始加载数据一次
            var store = picker.getStore();
            var form = picker.down('toolbar').down("baseForm");
            store.proxy.extraParams = form === null ? {} : form.getValues();
            store.currentPage = 1;
            store.load();
        }
        me.mon(picker, {
            //添加事件
            itemclick: me.onItemClick,
            refresh: function() {},
            scope: me
        });
        me.mon(picker.getSelectionModel(), {
            beforeselect: function(v) {},
            beforedeselect: function(v) {},
            selectionchange: me.onListSelectionChange,
            scope: me
        });
        this.picker = picker;
        return picker;
    },
    onItemClick: function(picker, record) {
        var me = this,
            selection = me.picker.getSelectionModel().getSelection(),
            valueField = me.valueField;
        if (!me.multiSelect && selection.length) {
            //多选
            record.get(valueField) , selection[0].get(valueField);
            if (record.get(valueField) === selection[0].get(valueField)) {
                me.displayTplData = [
                    record.data
                ];
                me.setRawValue(me.getDisplayValue());
                me.collapse();
            }
        } else {}
    },
    //多选暂不实现
    matchFieldWidth: false,
    onListSelectionChange: function(list, selectedRecords) {
        var me = this,
            isMulti = me.multiSelect,
            hasRecords = selectedRecords.length > 0;
        if (!me.ignoreSelection && me.isExpanded) {
            if (!isMulti) {
                Ext.defer(me.collapse, 1, me);
            }
            if (isMulti || hasRecords) {
                me.setValue(selectedRecords, false);
            }
            if (hasRecords) {
                me.fireEvent('select', me, selectedRecords);
            }
        }
    },
    //			if(!Ext.isEmpty(me.getItem)){
    //				for(var m=0;m<me.getItem.length;m++){
    //					var fi = me.next('[itemId=' + me.getItem[m] + ']');
    //					var vi = [];
    //					for(var i=0;i<selectedRecords.length;i++){
    //						vi.push(selectedRecords[i].get(fi.nextName) + '');
    //					}
    //					fi.setValue(vi.join(','));
    //				}
    //			}
    //			if(!Ext.isEmpty(me.parentVar)){
    //				window[me.parentVar] = selectedRecords;
    //			}
    //			me.inputEl.focus();
    doAutoSelect: function() {
        var me = this,
            picker = me.picker,
            lastSelected, itemNode;
        if (picker && me.autoSelect && me.store.getCount() > 0) {
            lastSelected = picker.getSelectionModel().lastSelected;
            itemNode = picker.view.getNode(lastSelected || 0);
            var records = [];
            if (!Ext.isEmpty(me.getValue())) {
                for (var j = 0; j < me.getValue().length; j++) {
                    var record = me.store.findRecord('bizCode', me.getValue()[j]);
                    records.push(record);
                }
            }
            //系统存值改为bizCode后可将此展开
            //			picker.getSelectionModel().select(records);
            if (itemNode) {
                picker.view.highlightItem(itemNode);
                picker.view.el.scrollChildIntoView(itemNode, false);
            }
        }
    },
    onChange: function(a, b, c, d) {
        var me = this;
        me.setValue(a);
    }
});

/**
 *
 * <p> Title:Picker.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/ux/rating)</p>
 * <p> Description:  下拉列表显示星星-作用星级评定等选择星级等地方</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * @example
 *      Ext.create({
 *          xtype: 'rating',
 *          renderTo: Ext.getBody(),
 *          glyphs: [ 9671, 9670 ], // '◇◆',
 *          listeners: {
 *              change: function (picker, value) {
 *                 console.log('Rating ' + value);
 *              }
 *          }
 *      });
 * @author wys
 * @version 1.0
 */
Ext.define('wys.ux.rating.Picker', {
    extend: 'Ext.Widget',
    xtype: 'myRating',
    focusable: true,
    cachedConfig: {
        family: 'monospace',
        glyphs: '☆★',
        minimum: 1,
        limit: 5,
        overStyle: null,
        rounding: 1,
        scale: '125%',
        selectedStyle: null,
        tooltip: null,
        trackOver: true,
        value: 0,
        tooltipText: null,
        trackingValue: null
    },
    config: {
        animate: null
    },
    element: {
        cls: 'u' + Ext.baseCSSPrefix + 'rating-picker',
        reference: 'element',
        children: [
            {
                reference: 'innerEl',
                cls: 'u' + Ext.baseCSSPrefix + 'rating-picker-inner',
                listeners: {
                    click: 'onClick',
                    mousemove: 'onMouseMove',
                    mouseenter: 'onMouseEnter',
                    mouseleave: 'onMouseLeave'
                },
                children: [
                    {
                        reference: 'valueEl',
                        cls: 'u' + Ext.baseCSSPrefix + 'rating-picker-value'
                    },
                    {
                        reference: 'trackerEl',
                        cls: 'u' + Ext.baseCSSPrefix + 'rating-picker-tracker'
                    }
                ]
            }
        ]
    },
    defaultBindProperty: 'value',
    twoWayBindable: 'value',
    overCls: 'u' + Ext.baseCSSPrefix + 'rating-picker-over',
    trackOverCls: 'u' + Ext.baseCSSPrefix + 'rating-picker-track-over',
    applyGlyphs: function(value) {
        if (typeof value === 'string') {
            if (value.length !== 2) {
                Ext.raise('Expected 2 characters for "glyphs" not "' + value + '".');
            }
            value = [
                value.charAt(0),
                value.charAt(1)
            ];
        } else if (typeof value[0] === 'number') {
            value = [
                String.fromCharCode(value[0]),
                String.fromCharCode(value[1])
            ];
        }
        return value;
    },
    applyOverStyle: function(style) {
        this.trackerEl.applyStyles(style);
    },
    applySelectedStyle: function(style) {
        this.valueEl.applyStyles(style);
    },
    applyTooltip: function(tip) {
        if (tip && typeof tip !== 'function') {
            if (!tip.isTemplate) {
                tip = new Ext.XTemplate(tip);
            }
            tip = tip.apply.bind(tip);
        }
        return tip;
    },
    applyTrackingValue: function(value) {
        return this.applyValue(value);
    },
    // same rounding as normal value 
    applyValue: function(v) {
        if (v !== null) {
            var rounding = this.getRounding(),
                limit = this.getLimit(),
                min = this.getMinimum();
            v = Math.round(Math.round(v / rounding) * rounding * 1000) / 1000;
            v = (v < min) ? min : (v > limit ? limit : v);
        }
        return v;
    },
    //------------------------------------------------------------------------- 
    // Event Handlers 
    onClick: function(event) {
        var value = this.valueFromEvent(event);
        this.setValue(value);
    },
    onMouseEnter: function() {
        this.element.addCls(this.overCls);
    },
    onMouseLeave: function() {
        this.element.removeCls(this.overCls);
    },
    onMouseMove: function(event) {
        var value = this.valueFromEvent(event);
        this.setTrackingValue(value);
    },
    //------------------------------------------------------------------------- 
    // Config Updaters 
    updateFamily: function(family) {
        this.element.setStyle('fontFamily', "'" + family + "'");
    },
    updateGlyphs: function() {
        this.refreshGlyphs();
    },
    updateLimit: function() {
        this.refreshGlyphs();
    },
    updateScale: function(size) {
        this.element.setStyle('fontSize', size);
    },
    updateTooltip: function() {
        this.refreshTooltip();
    },
    updateTooltipText: function(text) {
        var innerEl = this.innerEl,
            QuickTips = Ext.tip && Ext.tip.QuickTipManager,
            tip = QuickTips && QuickTips.tip,
            target;
        if (QuickTips) {
            innerEl.dom.setAttribute('data-qtip', text);
            this.trackerEl.dom.setAttribute('data-qtip', text);
            // If the QuickTipManager is active over our widget, we need to update 
            // the tooltip text directly. 
            target = tip && tip.activeTarget;
            target = target && target.el;
            if (target && innerEl.contains(target)) {
                tip.update(text);
            }
        }
    },
    updateTrackingValue: function(value) {
        var me = this,
            trackerEl = me.trackerEl,
            newWidth = me.valueToPercent(value);
        trackerEl.setStyle('width', newWidth);
        me.refreshTooltip();
    },
    updateTrackOver: function(trackOver) {
        this.element[trackOver ? 'addCls' : 'removeCls'](this.trackOverCls);
    },
    updateValue: function(value, oldValue) {
        var me = this,
            animate = me.getAnimate(),
            valueEl = me.valueEl,
            newWidth = me.valueToPercent(value),
            column, record;
        if (me.isConfiguring || !animate) {
            valueEl.setStyle('width', newWidth);
        } else {
            valueEl.stopAnimation();
            valueEl.animate(Ext.merge({
                from: {
                    width: me.valueToPercent(oldValue)
                },
                to: {
                    width: newWidth
                }
            }, animate));
        }
        me.refreshTooltip();
        if (!me.isConfiguring) {
            // Since we are (re)configured many times as we are used in a grid cell, we 
            // avoid firing the change event unless there are listeners. 
            if (me.hasListeners.change) {
                me.fireEvent('change', me, value, oldValue);
            }
            column = me.getWidgetColumn && me.getWidgetColumn();
            record = column && me.getWidgetRecord && me.getWidgetRecord();
            if (record && column.dataIndex) {
                // When used in a widgetcolumn, we should update the backing field. The 
                // linkages will be cleared as we are being recycled, so this will only 
                // reach this line when we are properly attached to a record and the 
                // change is coming from the user (or a call to setValue). 
                record.set(column.dataIndex, value);
            }
        }
    },
    //------------------------------------------------------------------------- 
    // Config System Optimizations 
    // 
    // These are to deal with configs that combine to determine what should be 
    // rendered in the DOM. For example, "glyphs" and "limit" must both be known 
    // to render the proper text nodes. The "tooltip" and "value" likewise are 
    // used to update the tooltipText. 
    // 
    // To avoid multiple updates to the DOM (one for each config), we simply mark 
    // the rendering as invalid and post-process these flags on the tail of any 
    // bulk updates. 
    afterCachedConfig: function() {
        // Now that we are done setting up the initial values we need to refresh the 
        // DOM before we allow Ext.Widget's implementation to cloneNode on it. 
        this.refresh();
        return this.callParent(arguments);
    },
    initConfig: function(instanceConfig) {
        this.isConfiguring = true;
        this.callParent([
            instanceConfig
        ]);
        // The firstInstance will already have refreshed the DOM (in afterCacheConfig) 
        // but all instances beyond the first need to refresh if they have custom values 
        // for one or more configs that affect the DOM (such as "glyphs" and "limit"). 
        this.refresh();
    },
    setConfig: function() {
        var me = this;
        // Since we could be updating multiple configs, save any updates that need 
        // multiple values for afterwards. 
        me.isReconfiguring = true;
        me.callParent(arguments);
        me.isReconfiguring = false;
        // Now that all new values are set, we can refresh the DOM. 
        me.refresh();
        return me;
    },
    //------------------------------------------------------------------------- 
    destroy: function() {
        this.tip = Ext.destroy(this.tip);
        this.callParent();
    },
    privates: {
        /**
         * This method returns the DOM text node into which glyphs are placed.
         * @param {HTMLElement} dom The DOM node parent of the text node.
         * @return {HTMLElement} The text node.
         * @private
         */
        getGlyphTextNode: function(dom) {
            var node = dom.lastChild;
            // We want all our text nodes to be at the end of the child list, most 
            // especially the text node on the innerEl. That text node affects the 
            // default left/right position of our absolutely positioned child divs 
            // (trackerEl and valueEl). 
            if (!node || node.nodeType !== 3) {
                node = dom.ownerDocument.createTextNode('');
                dom.appendChild(node);
            }
            return node;
        },
        getTooltipData: function() {
            var me = this;
            return {
                component: me,
                tracking: me.getTrackingValue(),
                trackOver: me.getTrackOver(),
                value: me.getValue()
            };
        },
        /**
         * Forcibly refreshes both glyph and tooltip rendering.
         * @private
         */
        refresh: function() {
            var me = this;
            if (me.invalidGlyphs) {
                me.refreshGlyphs(true);
            }
            if (me.invalidTooltip) {
                me.refreshTooltip(true);
            }
        },
        /**
         * Refreshes the glyph text rendering unless we are currently performing a
         * bulk config change (initConfig or setConfig).
         * @param {Boolean} now Pass `true` to force the refresh to happen now.
         * @private
         */
        refreshGlyphs: function(now) {
            var me = this,
                later = !now && (me.isConfiguring || me.isReconfiguring),
                el, glyphs, limit, on, off, trackerEl, valueEl;
            if (!later) {
                el = me.getGlyphTextNode(me.innerEl.dom);
                valueEl = me.getGlyphTextNode(me.valueEl.dom);
                trackerEl = me.getGlyphTextNode(me.trackerEl.dom);
                glyphs = me.getGlyphs();
                limit = me.getLimit();
                for (on = off = ''; limit--; ) {
                    off += glyphs[0];
                    on += glyphs[1];
                }
                el.nodeValue = off;
                valueEl.nodeValue = on;
                trackerEl.nodeValue = on;
            }
            me.invalidGlyphs = later;
        },
        /**
         * Refreshes the tooltip text rendering unless we are currently performing a
         * bulk config change (initConfig or setConfig).
         * @param {Boolean} now Pass `true` to force the refresh to happen now.
         * @private
         */
        refreshTooltip: function(now) {
            var me = this,
                later = !now && (me.isConfiguring || me.isReconfiguring),
                tooltip = me.getTooltip(),
                data, text;
            if (!later) {
                tooltip = me.getTooltip();
                if (tooltip) {
                    data = me.getTooltipData();
                    text = tooltip(data);
                    me.setTooltipText(text);
                }
            }
            me.invalidTooltip = later;
        },
        /**
         * Convert the coordinates of the given `Event` into a rating value.
         * @param {Ext.event.Event} event The event.
         * @return {Number} The rating based on the given event coordinates.
         * @private
         */
        valueFromEvent: function(event) {
            var me = this,
                el = me.innerEl,
                ex = event.getX(),
                rounding = me.getRounding(),
                cx = el.getX(),
                x = ex - cx,
                w = el.getWidth(),
                limit = me.getLimit(),
                v;
            if (me.getInherited().rtl) {
                x = w - x;
            }
            v = x / w * limit;
            // We have to round up here so that the area we are over is considered 
            // the value. 
            v = Math.ceil(v / rounding) * rounding;
            return v;
        },
        /**
         * Convert the given rating into a width percentage.
         * @param {Number} value The rating value to convert.
         * @return {String} The width percentage to represent the given value.
         * @private
         */
        valueToPercent: function(value) {
            value = (value / this.getLimit()) * 100;
            return value + '%';
        }
    }
});

/**
 *
 * <p> Title:PropertyView EXTJS FORM</p>
 * <p> Description:  进度，可用于任何流程等需要办理步骤的页面</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.view.ProgressController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.progressCtrl'
});

/**
 *
 * <p> Title:PropertyView EXTJS FORM</p>
 * <p> Description:  进度，可用于任何流程等需要办理步骤的页面</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.view.ProgressViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.progressViewModel',
    data: {},
    stores: {
        dataviewProgress: {
            type: 'store',
            data: [
                {
                    list: [
                        {
                            upMessage: "2017.06.19 物业系统前端框架确认",
                            downMessage: "",
                            status: 'successed'
                        },
                        {
                            upMessage: "",
                            downMessage: "2017.06.20 物业系统后端框架雏形确认发生变更",
                            status: 'failed',
                            failedMessage: '业务流程有变化'
                        },
                        {
                            upMessage: "2017.06.23 物业系统前端展示页面正式进入开发",
                            downMessage: "",
                            status: 'being',
                            failedMessage: '物业系统前端展示页面正式进入开发'
                        },
                        {
                            upMessage: "",
                            downMessage: "2017.06.29 物业系统前端开发正式开始第一版本已确认有部分优化调整内容",
                            status: 'successed'
                        }
                    ]
                }
            ]
        },
        registerProgress: {
            type: 'store',
            data: [
                {
                    list: [
                        {
                            upMessage: "2017.06.19 提交注册申请",
                            downMessage: "",
                            status: 'successed'
                        },
                        {
                            upMessage: "",
                            downMessage: "2017.06.20 信息填写不符",
                            status: 'failed',
                            failedMessage: '企业组织机构编码填写有误'
                        },
                        {
                            upMessage: "2017.06.23 审核成功",
                            downMessage: "",
                            status: 'successed',
                            failedMessage: '恭喜您，你的申请已通过'
                        }
                    ]
                }
            ]
        }
    }
});

/**
 *
 * <p> Title:PropertyView EXTJS FORM</p>
 * <p> Description:  进度，可用于任何流程等需要办理步骤的页面</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.view.Progress', {
    extend: 'Ext.view.View',
    xtype: 'dataview-progress',
    requires: [
        'wys.view.ProgressController',
        'wys.view.ProgressViewModel'
    ],
    controller: 'progressCtrl',
    viewModel: 'progressViewModel',
    bind: {
        store: '{dataviewProgress}'
    },
    itemSelector: '.ui-progress-segment-main-icon-failed',
    initComponent: function() {
        var me = this;
        me.tpl = [
            '<tpl for=".">',
            '<div class="ui-progress">',
            '<tpl for="list">',
            '<div class="ui-progress-segment">',
            '<div class="ui-progress-segment-main">',
            '<div class="ui-progress-segment-main-up" title="{upMessage}">{upMessage}</div>',
            '<div class="ui-progress-segment-main-icon ui-progress-segment-main-icon-{status}"></div>',
            '<div class="ui-progress-segment-main-down title="{downMessage}">{downMessage}</div>',
            '</div>',
            '<div class="ui-progress-segment-bar"></div>',
            '<tpl if="failedMessage">',
            '<div class="ui-progress-segment-failed-popup"><span></span><em></em>{failedMessage}</div>',
            '</tpl>',
            '</div>',
            '</tpl>',
            '</div>',
            '</tpl>'
        ];
        me.callParent();
    },
    listeners: {
        afterrender: function(item, option) {
            item.on({
                element: 'el',
                mouseover: function(e, target, obj) {
                    if (target.className.indexOf('ui-progress-segment-main-icon-failed') != -1) {
                        var failedPopup = Ext.query(".ui-progress-segment-failed-popup");
                        failedPopup[0].style.display = 'block';
                    }
                },
                mouseout: function(e, target, obj) {
                    if (target.className.indexOf('ui-progress-segment-main-icon-failed') == -1) {
                        var failedPopup = Ext.query(".ui-progress-segment-failed-popup");
                        failedPopup[0].style.display = 'none';
                    }
                },
                scope: item
            });
        }
    }
});

/**
 *
 * <p> Title:PropertyView EXTJS FORM</p>
 * <p> Description:  时间轴封装</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.view.TimeLine', {
    extend: 'Ext.view.View',
    xtype: 'dataview-timeLine',
    itemSelector: 'span.fa-circle',
    tpl: [
        '<table align="left" class="timeline">',
        '<tr>',
        '<td height="30"></td>',
        '<td width="30"><span class="treePoint" style="color: #157fcc;">',
        '<div class="timer" style="margin-left:5px;transform:scale(.5,.5)">',
        '<div style="width:40px;height:40px;border:2px solid #fff;border-radius:40px;margin:0 auto;margin-top:12px;"></div>',
        '<div style="width:10px;height:10px;background-color:#3880dd;position:absolute;left:40px;top:42px;border-radius:10px;"></div>',
        '<div style="width:12px;height:2px;background-color:#fff;position:absolute;left:30px;top:30px;"></div>',
        '<div style="width:12px;height:2px;background-color:#fff;position:absolute;left:25px;top:25px;transform: rotate(90deg)"></div>',
        '</div>',
        '</span><div class="vertical"></div></td>',
        '</tr>',
        '<tpl for=".">',
        '<tpl if="xindex==1">',
        '<tr>',
        '<td height="40">',
        '<div class="caretRight" style="border-left-color:#ff9900;"></div>',
        '<div class="shadow" style="background-color: #FF9900;padding:0px 5px;color:#fff"> {date}</div></td>',
        '<td width="100"><span class="treePoint fa fa-circle" style="color: #FF9900;cursor: pointer;transform:scale(1.5,1.5)" data-color="#FF9900"></span><div class="vertical">{currentCostCenter}</div></td>',
        '</tr>',
        '<tpl elseif="xindex!=xcount">',
        '<tr>',
        '<td height="40">',
        '<div class="caretRight" style="border-left-color:#008EF2;"></div>',
        '<div class="shadow" style="background-color: #008EF2;padding:0px 5px;color:#fff"> {date}</div></td>',
        '<td width="30"><span class="treePoint fa fa-circle" style="color:#008EF2;cursor: pointer;" data-color="#008EF2"></span><div class="vertical">{currentCostCenter}</div></td>',
        '</tr>',
        '<tpl else>',
        '<tr>',
        '<td height="40">',
        '<div class="caretRight" style="border-left-color:#d5d5d5;"></div>',
        '<div class="shadow" style="padding:0px 5px;"> {date}</div></td>',
        '<td width="30"><span class="treePoint fa fa-circle" style="cursor: pointer;" data-color="#d5d5d5"></span><div class="vertical">{currentCostCenter}</div></td>',
        '</tr>',
        '</tpl>',
        '</tpl>',
        '<tr>',
        '<td height="30"></td>',
        '<td width="30"><span class="treePoint fa fa-circle-o" style="color:#3399CC;"></span></td>',
        '</tr>',
        '</table>'
    ],
    listeners: {
        itemclick: function(obj, record, item, index, e, eOpts) {
            var currentPointStyle = "cursor: pointer;transform:scale(1.5,1.5)",
                pointStyle = "cursor: pointer;transform:scale(1,1)",
                treePointArray = Ext.query("span.fa-circle");
            Ext.each(treePointArray, function(point, pointIndex, self) {
                var pointOrginalColor = point.style.color;
                if (pointIndex == index) {
                    point.style = currentPointStyle;
                    point.style.color = pointOrginalColor;
                } else {
                    point.style = pointStyle;
                    point.style.color = pointOrginalColor;
                }
            });
            obj.up('pushWindow').down('panel[tag=timecontentBanner]').setStyle({
                zIndex: 99999,
                left: '120px'
            });
            obj.up('pushWindow').down('[tag=timecontentBanner]').setHtml('<div class="caretLeft" style="border-right-color:' + item.getAttribute('data-color') + ';margin-top:3px;margin-left:0px;"></div><div class="shadow" style="width:290px;background-color: ' + item.getAttribute('data-color') + ';padding:0px 5px;color:#fff;text-align:center;">' + record.data.remarks + '</div>');
        }
    }
});

/**
 *
 * <p> Title:CodeEditorWin.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/window)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.window.CodeEditorWin', {
    extend: 'Ext.window.Window',
    xtype: 'codeEditorWin',
    requires: [
        'Ext.window.Window',
        'wys.basic.specialGridpanel'
    ],
    closeAction: "destroy",
    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            autoShow: true,
            title: me.title || '添加代码',
            iconCls: me.iconCls || 'fa fa-code fa-lg',
            modal: true,
            maximizable: true,
            closeAction: 'hide',
            layout: 'fit',
            autoScroll: true,
            animCollapse: true,
            animateTarget: Ext.getBody(),
            border: true,
            style: 'border-color: #b6babe;',
            closeToolText: '点击关闭窗口',
            width: me.width || Ext.getBody().getSize().width - 100,
            height: me.height || Ext.getBody().getSize().height - 100,
            listeners: {
                show: function(win) {
                    var editor = CodeMirror.fromTextArea(Ext.getDom(win.down('textarea').id + '-inputEl'), {
                            lineNumbers: true,
                            // 显示行数
                            indentUnit: 4,
                            // 缩进单位为4
                            styleActiveLine: true,
                            // 当前行背景高亮
                            matchBrackets: true,
                            // 括号匹配
                            mode: me.type,
                            // HMTL混合模式
                            lineWrapping: true,
                            // 自动换行
                            theme: 'vibrant-ink'
                        });
                    editor.on('changes', function(codeMirror, newValue) {
                        me.down('textarea').setValue(codeMirror.getValue());
                    }, this);
                    editor.setSize('auto', Ext.getCmp(win.down('textarea').id).getHeight() - 3 + 'px');
                },
                close: function(win) {
                    win.down('textarea').setValue('');
                }
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    hidden: me.type === 'JSON',
                    style: 'background:#f9f9f9;border-bottom-color:#ccc !important;border-bottom-width:1px !important;',
                    dock: 'top',
                    items: [
                        '->',
                        {
                            text: '执行...',
                            iconCls: 'EDIT_ON',
                            handler: function(btn) {
                                me.execute(btn);
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    hidden: me.type === 'SQL',
                    style: 'background:#f9f9f9;border-bottom-color:#ccc !important;border-bottom-width:1px !important;',
                    dock: 'top',
                    items: [
                        '->',
                        {
                            text: '调试...',
                            iconCls: 'DEBUGGER',
                            handler: function(btn) {
                                me.debuggerJSON(btn);
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'textarea',
                    name: 'sourceCode'
                }
            ]
        });
        me.callParent();
    },
    execute: function(btn) {
        var me = this,
            textareaValue = this.down('textarea').getValue(),
            executeSQL = textareaValue;
        util.ajax({
            url: app.base + '/stat/resolveSQLToFields.do',
            params: {
                sql: executeSQL
            },
            ok: function(resp) {
                if (!resp.success) {
                    util.err(resp.msg_info);
                } else {
                    var url = [
                            [
                                app.base + '/stat/resolveSQLToFields.do'
                            ],
                            [
                                app.base + '/stat/queryDatasBySql.do'
                            ]
                        ];
                    Ext.create('Ext.window.Window', {
                        title: '查询结果',
                        width: me.width || Ext.getBody().getSize().width - 100,
                        height: me.height || Ext.getBody().getSize().height - 100,
                        items: [
                            {
                                xtype: 'specialGridPanel',
                                url: url,
                                params: {
                                    sql: executeSQL
                                }
                            }
                        ]
                    }).show();
                }
            }
        });
        return;
    },
    debuggerJSON: function(btn) {
        var me = this;
        textareaValue = this.down('textarea').getValue() , executeJSON = textareaValue;
    }
});

/**
 *
 * <p> Title:PicShow EXTJS</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * @author wys
 * @version 1.0
 */
Ext.define("wys.window.HtmlShow", {
    extend: 'Ext.window.Window',
    xtype: 'htmlShowWin',
    ui: 'htmlList',
    width: "100%",
    height: "100%",
    header: false,
    closable: true,
    closeAction: "destroy",
    isLocalData: true,
    //是否是本地数据
    localData: [],
    //本地数据数组
    fileKey: '',
    //图片地址
    modal: true,
    scrollable: true,
    style: {
        textAlign: "center"
    },
    //    layout: "absolute",
    align: 'center',
    items: [
        {
            xtype: "button",
            iconCls: 'fa icon-close',
            style: {
                background: 'transparent',
                border: 'none',
                fontSize: "50px",
                width: "60px",
                height: "60px"
            },
            scale: 'large',
            x: "calc(100% - 50px)",
            y: 0,
            handler: function() {
                this.up("window").destroy();
            }
        }
    ],
    buttonAlign: "center",
    buttons: [
        {
            xtype: 'button',
            text: '关闭',
            ui: 'button-commonToolbarBtn-toolbar',
            iconCls: 'fa fa-close',
            handler: function() {
                var me = this;
                var win = me.up("window");
                win.close();
            }
        }
    ],
    initComponent: function() {
        var me = this;
        me.callParent();
        util.ajax({
            url: constants.url.attachment.wordToHtml,
            params: {
                fileKey: me.fileKey
            },
            ok: function(response) {
                if (response.success) {
                    me.setHtml(response.root);
                } else {
                    util.err(response.msg_info);
                }
            }
        });
    }
});

/**
 *
 * <p> Title:PicShow EXTJS</p>
 * <p> Description:  定义图片浏览器效果</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * @author wys
 * @version 1.0
 */
Ext.define("wys.window.PicShow", {
    extend: 'Ext.window.Window',
    xtype: 'picShowWin',
    ui: 'picList',
    width: 800,
    height: 600,
    header: false,
    closable: true,
    animCollapse: true,
    closeAction: "destroy",
    isLocalData: true,
    //是否是本地数据
    localData: [],
    //本地数据数组
    imgSrc: '',
    //图片地址
    modal: true,
    layout: "absolute",
    align: 'center',
    scrollable: true,
    style: 'background-color:#ebebeb',
    bodyStyle: 'background-color:transparent',
    items: [
        {
            xtype: "image",
            x: "50%",
            y: "50%",
            src: '',
            cls: "my-showPic",
            itemId: "picShow",
            afterRender: function(sel) {
                new Ext.dd.DD(Ext.getCmp(this.id), 'pic');
                Ext.get(this.id).dom.title = '鼠标滚轮控制图片的放大和缩小';
                Ext.get(this.id).on('dblclick', function() {
                    util.zoom(Ext.getCmp(this.id), 1.5, true);
                });
                Ext.get(this.id).on('mousewheel', function(e) {
                    var delta = e.getWheelDelta();
                    if (delta > 0) {
                        util.zoom(Ext.getCmp(this.id), 1.5, true);
                    } else {
                        util.zoom(Ext.getCmp(this.id), 1.5, false);
                    }
                });
            }
        }
    ],
    buttonAlign: "center",
    buttons: [
        {
            xtype: 'button',
            text: '关闭',
            ui: 'button-commonToolbarBtn-toolbar',
            iconCls: 'fa fa-close',
            handler: function() {
                var me = this;
                var win = me.up("window");
                win.close();
            }
        }
    ],
    initComponent: function() {
        var me = this;
        me.callParent();
        var win = me;
        var img = win.down("image");
        img.setSrc(me.imgSrc);
    }
});

/**
 *
 * <p> Title:PluginNotInstallWin.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/window)</p>
 * <p> Description:  系统所需插件为安装提示窗口</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define("wys.window.PluginNotInstallWin", {
    extend: 'Ext.window.Window',
    alias: 'widget.pluginNotInstallWin',
    requires: [
        'Ext.container.Container',
        'Ext.toolbar.Spacer',
        'Ext.form.Label'
    ],
    tipText: '',
    //提示文字
    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            closeToolText: '关闭窗口',
            autoShow: true,
            cls: 'error-page-container',
            closable: true,
            title: '系统检测到您有未安装的系统所需插件',
            titleAlign: 'center',
            modal: true,
            minWidth: 300,
            minheight: 150,
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'error-page-desc',
                            margin: 8,
                            html: this.tipText
                        },
                        {
                            xtype: 'tbspacer',
                            flex: 1
                        }
                    ]
                }
            ],
            listeners: {
                show: function(win, e) {
                    Ext.EventManager.stopEvent(this);
                    e.stopPropagation();
                    return;
                }
            }
        });
        me.callParent();
    },
    onCloseWindow: function() {
        var me = this;
        me.fireEvent("closeAnimate", me);
        Ext.defer(function() {
            me.close();
        }, 500, me);
    }
});

/**
 *
 * <p> Title:UpdateNotice.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/window)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define("wys.window.UpdateNotice", {
    extend: 'Ext.window.Window',
    xtype: 'window-updateNotice',
    ui: 'updateNotice',
    header: false,
    resizable: false,
    closable: true,
    modal: true,
    width: 683,
    height: 440,
    requires: [
        'wys.toolbar.NoInputPaging'
    ],
    style: 'background-color:#fff;',
    dockedItems: [
        {
            xtype: 'panel',
            dock: 'top',
            cls: 'updateWinBg',
            bodyStyle: 'background-color:transparent;',
            width: 683,
            height: 153,
            bind: {
                html: '<div class="updateNoticeHeader"><p>{title}</p><div>{updateDate}</div></div>'
            },
            items: [
                {
                    //关闭按钮
                    xtype: 'tool',
                    type: 'close',
                    style: 'float:right;margin-right:10px;margin-top:10px;',
                    handler: function() {
                        arguments[2].up("window-updateNotice").close();
                    }
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            style: 'background-color:#ffffff;border-top:1px solid #efefef!important',
            items: [
                '->',
                /*{
            xtype: 'toolbar-noinputpaging',
            ui: 'paging',
            bind: { store: '{updateNotice}' }
        },*/
                {
                    xtype: 'button',
                    iconCls: 'fa fa-upload',
                    text: '更新系统',
                    handler: function(btn) {
                        Ext.MessageBox.show({
                            wait: true,
                            height: 50,
                            waitConfig: {
                                interval: 1,
                                increment: 280,
                                text: '<span class="app-normal">正在更新系统，请稍后</span>'
                            }
                        });
                        Ext.defer(function() {
                            window.location.reload();
                        }, 1000);
                    }
                },
                '->'
            ]
        }
    ],
    items: [
        {
            xtype: 'panel',
            bodyStyle: 'background-color:#ffffff;',
            cls: 'updateNoticePanel',
            width: 663,
            height: 227,
            scrollable: 'y',
            padding: '5 0 0 35',
            items: [
                {
                    xtype: 'dataview',
                    height: 200,
                    //            bind: { data: '{currentUpdateNotice}' },
                    bind: '{updateNotice}',
                    itemSelector: 'tr',
                    tpl: [
                        '<table>',
                        '<tpl for=".">',
                        '<tr>',
                        '<td style="vertical-align: top">{#}.</td>',
                        '<td>{content}</td>',
                        '</tr>',
                        '</tpl>',
                        '</table>'
                    ]
                }
            ]
        }
    ],
    initComponent: function() {
        var me = this;
        me.callParent();
    }
});

/**
 *
 * <p> Title:Window EXTJS MODEL</p>
 * <p> Description:  重新定义window使其具有动画效果，可用于点击滑动显示流程步骤等功能</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * @author wys
 * @version 1.0
 */
Ext.define('wys.window.Window', {
    extend: 'Ext.window.Window',
    xtype: 'pushWindow',
    closeAction: "destroy",
    initComponent: function() {
        var me = this;
        var name, id, sum;
        me.floating = true;
        billname = me.billName || [];
        name = me.billData.name;
        me.items = [
            {
                xtype: 'panel',
                //default panel
                margin: '5 5 5 5',
                minWidth: Ext.Element.getViewportWidth() * 0.4,
                autoWidth: true,
                layout: {
                    type: 'vbox'
                },
                //,
                //column:1
                items: [
                    {
                        xtype: 'button',
                        text: '关闭',
                        ui: 'button-commonToolbarBtn-toolbar',
                        iconCls: 'fa fa-close',
                        listeners: {
                            click: Ext.bind(me.onCloseWindow, me)
                        }
                    },
                    {
                        xtype: 'panel',
                        tag: 'timecontentBanner'
                    },
                    /*,
	                    html: '<div class="caretLeft" style="border-right-color:#ff9900;margin-top:3px;margin-left:250px;"></div><div class="shadow" style="width:290px;background-color: #FF9900;padding:0px 5px;color:#fff;text-align:center;">执行时间：xxxx/xx/xx </div>'*/
                    {
                        width: Ext.Element.getViewportWidth() * 0.3,
                        items: me.billData
                    }
                ]
            }
        ];
        //自定义显示动画
        me.listeners = {
            show: {
                fn: function() {
                    me.getEl().fadeIn({
                        easing: 'easeOut',
                        duration: 500,
                        from: {
                            width: 0,
                            //starting width 400
                            opacity: 0,
                            // Transparent
                            color: '#ffffff',
                            // White
                            right: 0
                        },
                        to: {
                            width: document.body.clientWidth - 230,
                            //end width 300
                            height: document.body.clientHeight - 150,
                            left: Ext.Element.getViewportWidth() * 0.4
                        }
                    });
                }
            },
            // end height 300
            closeAnimate: {
                fn: function() {
                    me.getEl().fadeIn({
                        duration: 500,
                        from: {
                            left: Ext.Element.getViewportWidth() * 0.4
                        },
                        // end height 300
                        to: {
                            left: document.body.clientWidth
                        }
                    });
                }
            }
        };
        me.callParent();
    },
    onCloseWindow: function() {
        var me = this;
        me.fireEvent("closeAnimate", me);
        Ext.defer(function() {
            me.close();
        }, 500, me);
    }
});

