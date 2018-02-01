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
Ext.define('wys.form.field.date.DateTime',{
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
    ariaTitleDateFormat: 'Y\u5e74m\u6708d\u65e5',
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
    monthYearFormat: 'Y\u5e74m\u6708',
    startDay: 0,
    showToday: true,
    disableAnim: false,
    baseCls: Ext.baseCSSPrefix + 'datepicker',
    longDayFormat: 'Y\u5e74m\u6708d\u65e5',
    footerButtonUI: 'default',

    isDatePicker: true,
    alignOnScroll: false,

    ariaRole: 'region',
    focusable: true,

    childEls: [
        'innerEl', 'eventEl', 'prevEl', 'nextEl', 'middleBtnEl', 'footerEl'
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
            firstInitial: function (value) {
                return Ext.picker.Date.prototype.getDayInitial(value);
            },
            isEndOfWeek: function (value) {
                // convert from 1 based index to 0 based
                // by decrementing value once.
                value--;
                var end = value % 7 === 0 && value !== 0;
                return end ? '</tr><tr role="row">' : '';
            },
            renderTodayBtn: function (values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
            },
            renderMonthBtn: function (values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
            },
            renderHourField: function (values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.hourField.getRenderTree(), out);
            },
            renderMinuteField: function (values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.minuteField.getRenderTree(), out);
            },
            renderSecondField: function (values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.secondField.getRenderTree(), out);
            }
        }
    ],

    initHour: 12, // 24-hour format

    numDays: 42,


    initComponent: function () {
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
    getRefOwner: function () {
        return this.pickerField || this.callParent();
    },

    getRefItems: function () {
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

    beforeRender: function () {
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

    cacheWidth: function () {
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
    onRender: function (container, position) {
        var me = this,
            dateCellSelector = 'div.' + me.baseCls + '-date';

        me.callParent(arguments);

        me.cells = me.eventEl.select('tbody td');
        me.textNodes = me.eventEl.query(dateCellSelector);

        me.eventEl.set({ 'aria-labelledby': me.monthBtn.id });

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
    initEvents: function () {
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

            left: function (e) {
                if (e.ctrlKey) {
                    this.showPrevMonth();
                }
                else {
                    this.update(Ext.Date.add(this.activeDate, Ext.Date.DAY, -1));
                }

                // We need to prevent default to avoid scrolling the nearest container
                // which in case of a floating Date picker will be the document body.
                // This applies to all navigation keys.
                e.preventDefault();
            },

            right: function (e) {
                if (e.ctrlKey) {
                    this.showNextMonth();
                }
                else {
                    this.update(Ext.Date.add(this.activeDate, Ext.Date.DAY, 1));
                }

                e.preventDefault();
            },

            up: function (e) {
                // This is non-standard behavior kept for backward compatibility.
                // Ctrl-PageUp is reverse to this and it should be used instead.
                if (e.ctrlKey) {
                    this.showNextYear();
                }
                else {
                    this.update(Ext.Date.add(this.activeDate, Ext.Date.DAY, -7));
                }

                e.preventDefault();
            },

            down: function (e) {
                // This is non-standard behavior kept for backward compatibility.
                // Ctrl-PageDown is reverse to this and it should be used instead.
                if (e.ctrlKey) {
                    this.showPrevYear();
                }
                else {
                    this.update(Ext.Date.add(this.activeDate, Ext.Date.DAY, 7));
                }

                e.preventDefault();
            },

            pageUp: function (e) {
                if (e.ctrlKey) {
                    this.showPrevYear();
                }
                else {
                    this.showPrevMonth();
                }

                e.preventDefault();
            },

            pageDown: function (e) {
                if (e.ctrlKey) {
                    this.showNextYear();
                }
                else {
                    this.showNextMonth();
                }

                e.preventDefault();
            },

            home: function (e) {
                this.update(Ext.Date.getFirstDateOfMonth(this.activeDate));

                e.preventDefault();
            },

            end: function (e) {
                this.update(Ext.Date.getLastDateOfMonth(this.activeDate));

                e.preventDefault();
            },

            tab: function (e) {
                // When the picker is floating and attached to an input field, its
                // 'select' handler will focus the inputEl so when navigation happens
                // it does so as if the input field was focused all the time.
                // This is the desired behavior and we try not to interfere with it
                // in the picker itself, see below.
                this.handleTabKey(e);

                // Allow default behaviour of TAB - it MUST be allowed to navigate.
                return true;
            },

            enter: function (e) {
                this.handleDateClick(e, this.activeCell.firstChild);
            },

            space: function (e) {
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
                    }
                    else {
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

    onMouseDown: function (e) {
        var cmp = Ext.Component.fromElement(e.target);
        if (cmp.isFormField) return;
    },

    handleTabKey: function (e) {
        var me = this,
            t = me.getSelectedDate(me.activeDate),
            handler = me.handler,
            date;

        // The following code is like handleDateClick without the e.stopEvent()
        if (!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)) {
            date = t.dateValue;
            me.setValue(new Date(date.getFullYear(), date.getMonth()+1, date.getData(), me.hourField.getValue(), me.minuteField.getValue(), me.secondField.getValue()));
            me.fireEvent('select', me, me.value);
            if (handler) {
                Ext.callback(handler, me.scope, [me, me.value], null, me, me);
            }
            me.onSelect();
        }
        // Even if the above condition is not met we have to let the field know
        // that we're tabbing out - that's user action we can do nothing about
        else {
            me.fireEventArgs('tabout', [me]);
        }
    },

    getSelectedDate: function (date) {
        var me = this,
            t = Ext.Date.clearTime(date,true).getTime(),
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
    initDisabledDays: function () {
        var me = this,
            dd = me.disabledDates,
            re = '(?:',
            len,
            d, dLen, dI;

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
    setDisabledDates: function (dd) {
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
    setDisabledDays: function (dd) {
        this.disabledDays = dd;
        return this.update(this.value, true);
    },

    /**
     * Replaces any existing {@link #minDate} with the new value and refreshes the DatePicker.
     * @param {Date} value The minimum date that can be selected
     * @return {Ext.picker.Date} this
     */
    setMinDate: function (dt) {
        this.minDate = dt;
        return this.update(this.value, true);
    },

    /**
     * Replaces any existing {@link #maxDate} with the new value and refreshes the DatePicker.
     * @param {Date} value The maximum date that can be selected
     * @return {Ext.picker.Date} this
     */
    setMaxDate: function (dt) {
        this.maxDate = dt;
        return this.update(this.value, true);
    },

    /**
     * Sets the value of the date field
     * @param {Date} value The date to set
     * @return {Ext.picker.Date} this
     */
    setValue: function (value) {
        // If passed a null value just pass in a new date object.
        this.value = value || new Date();
        return this.update(this.value);
    },

    /**
     * Gets the current selected value of the date field
     * @return {Date} The selected date
     */
    getValue: function () {
        return this.value;
    },

    //<locale type="function">
    /**
     * Gets a single character to represent the day of the week
     * @return {String} The character
     */
    getDayInitial: function (value) {
        return value.substr(value.length - 1);;
    },
    //</locale>

    /**
     * @inheritdoc
     * @private
     */
    onEnable: function () {
        var me = this;

        me.callParent();
        me.syncDisabled(false, true);
        me.update(me.activeDate);

    },

    /**
     * @inheritdoc
     * @private
     */
    onShow: function () {
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
    onHide: function () {
        this.callParent();
        this.syncDisabled(true);
    },

    /**
     * @inheritdoc
     * @private
     */
    onDisable: function () {
        this.callParent();
        this.syncDisabled(true, true);
    },

    /**
     * Get the current active date.
     * @private
     * @return {Date} The active date
     */
    getActive: function () {
        return this.activeDate || this.value;
    },

    /**
     * Run any animation required to hide/show the month picker.
     * @private
     * @param {Boolean} isHide True if it's a hide operation
     */
    runAnimation: function (isHide) {
        var picker = this.monthPicker,
            options = {
                duration: 200,
                callback: function () {
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
    hideMonthPicker: function (animate) {
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

    doShowMonthPicker: function () {
        // Wrap in an extra call so we can prevent the button
        // being passed as an animation parameter.
        this.showMonthPicker();
    },

    doHideMonthPicker: function () {
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
    showMonthPicker: function (animate) {
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
    shouldAnimate: function (animate) {
        return Ext.isDefined(animate) ? animate : !this.disableAnim;
    },

    /**
     * Create the month picker instance
     * @private
     * @return {Ext.picker.Month} picker
     */
    createMonthPicker: function () {
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
    onOkClick: function (picker, value) {
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
    onCancelClick: function () {
        this.selectedUpdate(this.activeDate);
        this.hideMonthPicker();
    },

    /**
     * Show the previous month.
     * @param {Object} e
     * @return {Ext.picker.Date} this
     */
    showPrevMonth: function (e) {
        return this.setValue(Ext.Date.add(this.activeDate, Ext.Date.MONTH, -1));
    },

    /**
     * Show the next month.
     * @param {Object} e
     * @return {Ext.picker.Date} this
     */
    showNextMonth: function (e) {
        return this.setValue(Ext.Date.add(this.activeDate, Ext.Date.MONTH, 1));
    },

    /**
     * Show the previous year.
     * @return {Ext.picker.Date} this
     */
    showPrevYear: function () {
        return this.setValue(Ext.Date.add(this.activeDate, Ext.Date.YEAR, -1));
    },

    /**
     * Show the next year.
     * @return {Ext.picker.Date} this
     */
    showNextYear: function () {
        return this.setValue(Ext.Date.add(this.activeDate, Ext.Date.YEAR, 1));
    },

    /**
     * Respond to the mouse wheel event
     * @private
     * @param {Ext.event.Event} e
     */
    handleMouseWheel: function (e) {
        var delta;

        e.stopEvent();

        if (!this.disabled) {
            delta = e.getWheelDelta();

            if (delta > 0) {
                this.showPrevMonth();
            }
            else if (delta < 0) {
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
    handleDateClick: function (e, t) {
        var me = this,
            handler = me.handler,
            date;

        e.stopEvent();

        if (!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)) {
            date = new Date(t.dateValue);
            me.setValue(new Date(date.getFullYear(), date.getMonth(), date.getDate(), me.hourField.getValue(), me.minuteField.getValue(), me.secondField.getValue()));
            me.fireEvent('select', me, me.value);

            if (handler) {
                Ext.callback(handler, me.scope, [me, me.value], null, me, me);
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
    onSelect: function () {
        if (this.hideOnSelect) {
            this.hide();
        }
    },

    /**
     * Sets the current value to today.
     * @return {Ext.picker.Date} this
     */
    selectToday: function () {
        var me = this,
            btn = me.todayBtn,
            handler = me.handler;

        if (btn && !btn.disabled) {
            me.setValue(new Date());
            me.fireEvent('select', me, me.value);
            if (handler) {
                Ext.callback(handler, me.scope, [me, me.value], null, me, me);
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
    selectedUpdate: function (date) {
        var me = this,
            t = Ext.Date.clearTime(date,true).getTime(),
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
    fullUpdate: function (date) {
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
            prevStart, current, disableToday, tempDate, setCellClass, html, cls,
            formatValue, value;

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
            disableToday = (tempDate < min || tempDate > max ||
                (ddMatch && format && ddMatch.test(eDate.dateFormat(tempDate, format))) ||
                (ddays && ddays.indexOf(tempDate.getDay()) !== -1));

            me.todayDisabled = disableToday;
            if (!me.disabled) {
                me.todayBtn.setDisabled(disableToday);
            }
        }

        setCellClass = function (cellIndex, cls) {
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
            }
            else {
                cell.setAttribute('aria-selected', false);
            }

            if (value < min) {
                cls += ' ' + disabledCls;
                describedBy.push(me.id + '-ariaMinText');
                cell.setAttribute('data-qtip', me.minText);
            }
            else if (value > max) {
                cls += ' ' + disabledCls;
                describedBy.push(me.id + '-ariaMaxText');
                cell.setAttribute('data-qtip', me.maxText);
            }
            else if (ddays && ddays.indexOf(current.getDay()) !== -1) {
                cell.setAttribute('data-qtip', ddaysText);
                describedBy.push(me.id + '-ariaDisabledDaysText');
                cls += ' ' + disabledCls;
            }
            else if (ddMatch && format) {
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
    update: function (date, forceRefresh) {
        var me = this,
            active = me.activeDate;

        if (me.rendered) {
            me.activeDate = date;
            if (!forceRefresh && active && me.el &&
                active.getMonth() === date.getMonth() &&
                active.getFullYear() === date.getFullYear()) {
                me.selectedUpdate(date, active);
            } else {
                me.fullUpdate(date, active);
            }
        }
        return me;
    },/*
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
        finishRenderChildren: function () {
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

        getFocusEl: function () {
            return this.eventEl;
        },

        /**
         * Set the disabled state of various internal components
         * @param {Boolean} disabled
         * @private
         */
        syncDisabled: function (disabled, doButton) {
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