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
Ext.define('wys.form.field.date.DateTimePicker',{
	extend: 'Ext.form.field.Picker',
    alias: 'widget.datetimefield',
    requires: ['wys.form.field.date.DateTime'],
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
    editable:false,
    useStrict: undefined,
    initTime: '12', // 24 hour format
    initTimeFormat: 'H',
    matchFieldWidth: false,
    startDay: 0,
    /**
     * @cfg
     * @inheritdoc
     */
    valuePublishEvent: ['select', 'blur'],
    componentCls: Ext.baseCSSPrefix + 'form-field-date',
    ariaRole: 'combobox',
    /** @private */
    rawDate: null,
    /** @private */
    rawDateText: '',
    initComponent: function () {
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
    getSubTplData: function (fieldData) {
        var me = this,
            data, ariaAttr;
        data = me.callParent([fieldData]);
        if (!me.ariaStaticRoles[me.ariaRole]) {
            ariaAttr = data.ariaElAttributes;
            if (ariaAttr) {
                ariaAttr['aria-owns'] = me.id + '-inputEl ' + me.id + '-picker-eventEl';
                ariaAttr['aria-autocomplete'] = 'none';
            }
        }
        return data;
    },
    initValue: function () {
        var me = this,
            value = me.value;
        if (Ext.isString(value)) {
            me.value = me.rawToValue(value);
            me.rawDate = me.value;
            me.rawDateText = me.parseDate(me.value);
        }
        else {
            me.value = value || null;
            me.rawDate = me.value;
            me.rawDateText = me.value ? me.parseDate(me.value) : '';
        }

        me.callParent();
    },

    /**
     * @private
     */
    initDisabledDays: function () {
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
    setDisabledDates: function (disabledDates) {
        var me = this,
            picker = me.picker;

        me.disabledDates = disabledDates;
        me.initDisabledDays();
        if (picker) {
            picker.setDisabledDates(me.disabledDatesRE);
        }
    },
    setDisabledDays: function (disabledDays) {
        var picker = this.picker;

        this.disabledDays = disabledDays;
        if (picker) {
            picker.setDisabledDays(disabledDays);
        }
    },
    setMinValue: function (value) {
        var me = this,
            picker = me.picker,
            minValue = (Ext.isString(value) ? me.parseDate(value) : value);

        me.minValue = minValue;
        if (picker) {
            picker.minText = Ext.String.format(me.minText, me.formatDate(me.minValue));
            picker.setMinDate(minValue);
        }
    },
    setMaxValue: function (value) {
        var me = this,
            picker = me.picker,
            maxValue = (Ext.isString(value) ? me.parseDate(value) : value);

        me.maxValue = maxValue;
        if (picker) {
            picker.maxText = Ext.String.format(me.maxText, me.formatDate(me.maxValue));
            picker.setMaxDate(maxValue);
        }
    },
    getErrors: function (value) {
        value = arguments.length > 0 ? value : this.formatDate(this.processRawValue(this.getRawValue()));
        var me = this,
            format = Ext.String.format,
            clearTime = Ext.Date.clearTime,
            errors = me.callParent([value]),
            disabledDays = me.disabledDays,
            disabledDatesRE = me.disabledDatesRE,
            minValue = me.minValue,
            maxValue = me.maxValue,
            len = disabledDays ? disabledDays.length : 0,
            i = 0,
            svalue,
            fvalue,
            day,
            time;
        if (value === null || value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
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

    rawToValue: function (rawValue) {
        var me = this;

        if (rawValue === me.rawDateText) {
            return me.rawDate;
        }
        return me.parseDate(rawValue) || rawValue || null;
    },

    valueToRaw: function (value) {
        return this.formatDate(this.parseDate(value));
    },

    setValue: function (v) {
        var me = this;

        me.lastValue = me.rawDateText;
        me.lastDate = me.rawDate;
        if (Ext.isDate(v)) {
            me.rawDate = v;
            me.rawDateText = me.formatDate(v);
        }
        else {
            me.rawDate = me.rawToValue(v);
            me.rawDateText = me.formatDate(v);
            if (me.rawDate === v) {
                me.rawDate = null;
                me.rawDateText = '';
            }
        }
        me.callParent(arguments);
    },
    checkChange: function () {
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
    safeParse: function (value, format) {
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
    getSubmitValue: function () {
        var format = this.submitFormat || this.format,
            value = this.rawDate;

        return value ? Ext.Date.format(value, format) : '';
    },
    getValue: function () {
        return this.rawDate || null;
    },
    setRawValue: function (value) {
        var me = this;
        me.callParent([value]);
        me.rawDate = Ext.isDate(value) ? value : me.rawToValue(value);
        me.rawDateText = this.formatDate(value);
    },

    /**
     * @private
     */
    parseDate: function (value) {
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
    formatDate: function (date, format) {
        return Ext.isDate(date) ? Ext.Date.dateFormat(date, format || this.format) : date;
    },
    createPicker: function () {
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
                esc: function () {
                    me.inputEl.focus();
                    me.collapse();
                }
            }
        });
    },

    onSelect: function (m, d) {
        var me = this;
        me.setValue(d);
        me.rawDate = d;
        me.fireEvent('select', me, d);
        me.onTabOut(m);
    },

    onTabOut: function (picker) {
        this.inputEl.focus();
        this.collapse();
    },

    /**
     * @private
     */
    onExpand: function () {
        var value = this.rawDate;
        this.picker.setValue(Ext.isDate(value) ? value : new Date());
    },

    /**
     * @private
     */
    onBlur: function (e) {
        var me = this,
            v = me.rawToValue(me.getRawValue());

        if (v === '' || Ext.isDate(v)) {
            me.setValue(v);
        }
        me.callParent([e]);
    }
});