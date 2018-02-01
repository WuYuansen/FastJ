/**
 *
 * <p> Title:CityForm EXTJS MODEL</p>
 * <p> Description:  系统城市选择控件数据项</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.CityForm',{
    extend: 'Ext.view.BoundList',
    xtype: 'cityForm',
    cls: 'citypickerwindow',
    currentDataType: 'province',
    storeOriginal: null,//comboPicker所使用的所有城市的store
    statics: {
        province: {
        	'A~G': [
                { "province": "654300", "provinceText": "阿勒泰地区" },
                { "province": "652900", "provinceText": "阿克苏地区" },
                { "province": "652300", "provinceText": "昌吉回族自治州" },
                { "province": "652800", "provinceText": "巴音郭楞蒙古自治州" },
                { "province": "652700", "provinceText": "博尔塔拉蒙古自治州"}
            ],
            'H~M': [
                { "province": "653200", "provinceText": "和田地区"},
                { "province": "650500", "provinceText": "哈密市"},
                { "province": "653000", "provinceText": " 克孜勒苏柯尔克孜自治州"},
                { "province": "653100", "provinceText": "喀什地区"}
            ],
            'N~S': [
                { "province": "654200","provinceText": "塔城地区" }
            ],
            'T~Z': [
                { "province": "650100", "provinceText": "乌鲁木齐市" },
                { "province": "650200", "provinceText": "克拉玛依市" },
                { "province": "654000", "provinceText": "伊犁哈萨克自治州" },
                { "province": "650400", "provinceText": "吐鲁番市" },
                { "province": "659000", "provinceText": "自治区直辖县级行政区划" }
            ]
        }
    },
    provinceData: null,
    initComponent: function () {
        var me = this;
        me.renderTpl = [
            '<div id="{id}-listWrap" data-ref="listWrap"',
            ' class="{baseCls}-list-ct ', Ext.dom.Element.unselectableCls, '">',
            '<table id="{id}-listEl" data-ref="listEl" class="', Ext.baseCSSPrefix, 'list-plain" style="width:' + me.width + 'px;"',
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
        ],
            me.tpl = [
                '<tr><td colspan="2"><div class="provinceIndicator active" style="width:' + me.width * 0.49 + 'px;">省份</div><div class="cityIndicator"  style="width:' + me.width * 0.49 + 'px;">城市</div></td></tr>',
                '<tpl for=".">',
                '{html}',
                '</tpl>'
            ];
        me.store = {
            type: 'store',
            autoLoad:true,
            sortOnLoad: false,
            field: ['id', 'value', 'isProvince', 'province', 'provinceText']
        };
        me.callParent(arguments);
    },

    onItemClick: function (record) {
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
                cityRecord.set("cityText", record.get("value"));//为构建新的对象发给处理函数
                pickerField.fireEvent("select", pickerField, cityRecord);//触发picker的select事件
            }
            me.store.loadData(me.provinceData);

            Ext.get(Ext.query("*[class*=provinceIndicator]")[0]).setCls("provinceIndicator active");
            Ext.get(Ext.query("*[class*=cityIndicator]")[0]).setCls("cityIndicator");


        } else {
            me.currentDataType = "city";
            var id = record.get("id"), value = record.get("value"), storeOriginal = me.storeOriginal,
                city = [{ isProvince: true, id: id, value: value }];
            //清除store的filter 否则选择称时候再次选择其他城市会出现问题没有城市的问题。
            storeOriginal.clearFilter();
            storeOriginal.each(function (record) {
                if (record.get("province") == id) {
                    city.push({ isProvince: false, id: record.get("city"), value: record.get("cityText"), province: record.get("province"), provinceText: record.get("provinceText") });
                }
            });

            var len = city.length;

            for (var i = 0; i < len; i++) {
                var html = '';
                if (i == 0) {
                    html += '<tr><td>';
                    html += '<span class="x-boundlist-item" style="font-weight:bold;color:#54a1f3;">' + city[i].value + '</span>';
                } else {
                    html+='<span class="x-boundlist-item"  style="display:inline-block;">'+city[i].value+'</span>';
                }

                if ((i + 1) == len)
                    html += '</td></tr>';
                city[i].html = html;
            }



            me.store.loadData(city);
            Ext.get(Ext.query("*[class*=provinceIndicator]")[0]).setCls("provinceIndicator");
            Ext.get(Ext.query("*[class*=cityIndicator]")[0]).setCls("cityIndicator active");
        }
        if (selMode)
            selMode.deselectAll();

    },

    initData: function (store) {
        var me = this;
        me.storeOriginal = store, proviceOriginal = wys.form.field.CityForm.province, proviceList = {};
        me.currentDataType = "province";
        me.storeOriginal.clearFilter();

        for (var key in proviceOriginal) {
            Ext.each(proviceOriginal[key], function (p) {
                store.each(function (record) {
                    if (record.get("province") == p["province"]) {
                        var item = proviceList[key];
                        if (!item)
                            item = proviceList[key] = [];
                        item.push({ isProvince: true, id: record.get("province"), value: record.get("provinceText") });
                        return false;
                    }
                });
            });
        }

        var data = [];
        for (var key in proviceList) {
            var group = proviceList[key], len = group.length;
            if (len == 0)
                continue;
            var html = '';
            for (var i = 0; i < len; i++) {
                html = '';
                if (i == 0) {
                    html += '<tr><td width="60">' + key + '</td><td>';
                }
                html += '<span class="x-boundlist-item">' + group[i].value + '</span>';

                if ((i + 1) == len)
                    html += '</td></tr>';
                data.push(Ext.apply({ html: html }, group[i]));
            }
        }

        me.provinceData = data;

        me.store.loadData(data);
    }
});