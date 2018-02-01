/**
 *
 * <p> Title:CityPicker EXTJS MODEL</p>
 * <p> Description:  系统城市选择控件</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.CityPicker',{
    extend : 'Ext.form.field.Picker',
    xtype : 'cityPicker',
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
    viewModel : 'cityDataModel',
    bind: { store: '{pickerCities}', readOnly: "{readOnly}"},
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
    publishes: ['selection'],
    twoWayBindable: ['selection'],
    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',
    hiddenName: '',
    collapseOnSelect: false,
    hiddenDataCls: Ext.baseCSSPrefix + 'hidden-display ' + Ext.baseCSSPrefix + 'form-data-hidden',
    ariaRole: 'combobox',
    childEls: {
        'hiddenDataEl': true
    },
    filtered: false,
    afterRender: function () {
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
    hideTrigger: true,//隐藏trigger
    defaultListConfig: {
        loadingHeight: 70,
        minWidth: 70,
        maxHeight: 500,
        shadow: 'sides'
    },
    matchFieldWidth:false,
    listConfig:{ 
    	minWidth: 300,
        maxHeight: 600
    },
    transformInPlace: true,
    clearValueOnEmpty: true,
    getGrowWidth: function () {
        var me = this,
            value = me.inputEl.dom.value,
            field, store, dataLn, currentLongestLength,
            i, item, itemLn;

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


    initComponent: function () {
        var me = this,
            isDefined = Ext.isDefined,
            store = me.store,
            transform = me.transform,
            transformSelect,
            isLocalMode;

        //<debug>
        if (me.typeAhead && me.multiSelect) {
            Ext.raise('typeAhead and multiSelect are mutually exclusive options -- please remove one of them.');
        }
        if (me.typeAhead && !me.editable) {
            Ext.raise('If typeAhead is enabled the combo must be editable: true -- please change one of those settings.');
        }
        if (me.selectOnFocus && !me.editable) {
            Ext.raise('If selectOnFocus is enabled the combo must be editable: true -- please change one of those settings.');
        }
        //</debug>

        // Check for presence of deprecated pinList config, and convert it to collapseOnSelect
        if ('pinList' in me) {
            me.collapseOnSelect = !me.pinList;
        }

        // Build store from 'transform' HTML select element's options
        if (transform) {
            transformSelect = Ext.getDom(transform);
            if (transformSelect) {
                if (!me.store) {
                    store = Ext.Array.map(Ext.Array.from(transformSelect.options), function (option) {
                        return [option.value, option.text];
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

    $onOnFocus: function () {
        var me = this;
        if (me.readOnly) //只读的时候不能出现 picker
            return;
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
    $onMousedown: function () {
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
    $onKeyup: function () {
        var me = this,
            inputValue = me.getRawValue();

        if (inputValue != null && inputValue != "") {
            if (me.picker != me.comboPicker) { //当输入时 如果有值 显示combopicker
                me.collapse();
                me.picker = me.comboPicker;
                me.expand();
            }
        }
        else {
            if (me.picker != me.formPicker) {
                //当输入时 如果没有值 显示formPicker
                me.collapse();
                me.picker = me.formPicker;
                me.formPicker.initData(me.store);
                this.expand();
            }
        }
    },




    getSubTplData: function (fieldData) {
        var data, inputElAttr;

        data = this.callParent([fieldData]);

        inputElAttr = data.inputElAriaAttributes;

        if (inputElAttr) {
            // TODO Change that to reflect the real behavior
            inputElAttr['aria-autocomplete'] = 'list';
        }

        return data;
    },

    getSubTplMarkup: function (fieldData) {
        var me = this,
            hiddenDataElMarkup = '',
            markup = me.callParent(arguments);

        if (me.hiddenName) {
            hiddenDataElMarkup = '<div id="' + fieldData.id + '-hiddenDataEl" data-ref="hiddenDataEl" class="' + me.hiddenDataCls + '" role="presentation"></div>';
        }

        return hiddenDataElMarkup + markup;
    },

    applyDisplayTpl: function (displayTpl) {
        var me = this;

        if (!displayTpl) {
            displayTpl = new Ext.XTemplate(
                '<tpl for=".">' +
                '{[typeof values === "string" ? values : values["' + me.getDisplayField() + '"]]}' +
                '<tpl if="xindex < xcount">' + me.getDelimiter() + '</tpl>' +
                '</tpl>'
            );
        } else if (!displayTpl.isTemplate) {
            displayTpl = new Ext.XTemplate(displayTpl);
        }
        return displayTpl;
    },

    applyFilters: function (filters, collection) {
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
            collection.each(function (filter) {
                filter.ownerId = me.id;
            });
            collection.endUpdate();
        }

        return collection;
    },

    applyValueNotFoundText: function (v) {
        var me = this,
            valueNotFoundRecord = me.valueNotFoundRecord || (me.valueNotFoundRecord = new Ext.data.Model());

        valueNotFoundRecord.set(me.displayField, v);
        if (me.valueField && me.displayField !== me.valueField) {
            valueNotFoundRecord.set(me.valueField, v);
        }

        return v;
    },

    getFilters: function (autoCreate) {
        var ret = this.filters;

        if (!ret && autoCreate !== false) {
            ret = new Ext.util.FilterCollection();
            this.setFilters(ret);
        }

        return ret;
    },

    updateFilters: function (newFilters, oldFilters) {
        var me = this;

        if (oldFilters) {
            oldFilters.un('endupdate', 'onEndUpdateFilters', me);
        }

        if (newFilters) {
            newFilters.on('endupdate', 'onEndUpdateFilters', me);
        }

        me.onEndUpdateFilters(newFilters);
    },

    onEndUpdateFilters: function (filters) {
        var me = this,
            was = me.filtered,
            is = !!filters && (filters.length > 0), // booleanize filters
            old, storeFilters;

        if (was || is) {
            me.filtered = is;
            old = [];
            storeFilters = me.store.getFilters();

            storeFilters.each(function (filter) {
                if (filter.ownerId === me.id && !filters.contains(filter)) {
                    old.push(filter);
                }
            });

            storeFilters.splice(0, old, filters.items);
        }
    },

    completeEdit: function (e) {
        var me = this,
            filter = me.queryFilter;

        this.callParent([e]);
        me.doQueryTask.cancel();
        me.assertValue();

        if (filter && me.queryMode === 'local' && me.clearFilterOnBlur) {
            me.getStore().getFilters().remove(filter);
        }
    },

    onFocus: function (e) {
        var me = this;

        me.callParent([e]);
        if (me.triggerAction !== 'all' && me.queryFilter && me.queryMode === 'local' && me.clearFilterOnBlur) {
            delete me.lastQuery;
            me.doRawQuery();
        }
    },

    /**
     * @private
     */
    assertValue: function () {
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
                    if (me.getDisplayValue([me.getRecordDisplayData(rec)]) !== displayValue) {
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

    onTypeAhead: function () {
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

    beforeReset: function () {
        var filter = this.queryFilter;

        this.callParent();

        if (filter) {
            this.getStore().getFilters().remove(filter);
        }
    },

    onUnbindStore: function () {
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

    onBindStore: function (store, initial) {
        var me = this,
            comboPicker = me.comboPicker,
            extraKeySpec,
            valueCollectionConfig;

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


    bindStore: function (store, preventFilter, /* private */ initial) {
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

    getStoreListeners: function (store) {

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

    onDataChanged: function () {
        if (this.grow && this.growToLongestValue) {
            this.autoSize();
        }
    },

    checkValueOnChange: function () {
        var me = this;

        // Will be triggered by removal of filters upon destroy
        if (!me.destroying && me.getStore().isLoaded()) {
            // If multiselecting and the base store is modified, we may have to remove records from the valueCollection
            // if they have gone from the base store, or update the rawValue if selected records are mutated.
            // TODO: 5.1.1: Use a ChainedStore for multiSelect so that selected records are not filtered out of the
            // base store and are able to be removed.
            // See https://sencha.jira.com/browse/EXTJS-16096
            if (me.multiSelect) {
                // TODO: Implement in 5.1.1 when selected records are available for modification and not filtered out.
                // valueCollection must be in sync with what's available in the base store, and rendered rawValue/tags
                // must match any updated data.
            }
            else {
                if (me.forceSelection && !me.changingFilters && !me.findRecordByValue(me.value)) {
                    me.setValue(null);
                }
            }
        }
    },

    onStoreUpdate: function (store, record) {
        // Ensure the rawValue is rendered correctly whenever a store record is mutated
        this.updateValue();
    },

    onException: function () {
        this.collapse();
    },

    onLoad: function (store, records, success) {
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

    setValueOnData: function () {
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
    doRawQuery: function () {
        var me = this,
            rawValue = me.inputEl.dom.value;

        // Use final bit after comma as query value if multiselecting
        if (me.multiSelect) {
            rawValue = rawValue.split(me.delimiter).pop();
        }

        me.doQuery(rawValue, false, true);
    },

    doQuery: function (queryString, forceAll, rawQuery) {
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
            }

            // Otherwise filter or load the store
            else {
                me.lastQuery = queryPlan.query;

                if (me.queryMode === 'local') {
                    me.doLocalQuery(queryPlan);

                } else {
                    //me.doRemoteQuery(queryPlan);通过remote方法读取数据
                }
            }
        }

        return true;
    },


    beforeQuery: function (queryPlan) {
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

    doLocalQuery: function (queryPlan) {
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
            if (me.getPicker() && me.getPicker().refresh)
                me.getPicker().refresh();
            me.expand();
        } else {
            me.collapse();
        }

        me.afterQuery(queryPlan);
    },

    afterQuery: function (queryPlan) {
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

    loadPage: function (pageNum, options) {
        this.store.loadPage(pageNum, Ext.apply({
            params: this.getParams(this.lastQuery)
        }, options));
    },

    onPageChange: function (toolbar, newPage) {
        this.loadPage(newPage);
        return false;
    },

    /**
     * @private
     */
    getParams: function (queryString) {
        var params = {},
            param = this.queryParam;

        if (param) {
            params[param] = queryString;
        }
        return params;
    },

    doAutoSelect: function () {
        var me = this,
            picker = me.picker;
        if (picker.getNavigationModel) {
            if (picker && me.autoSelect && me.store.getCount() > 0) {
                // Highlight the last selected item and scroll it into view
                picker.getNavigationModel().setPosition(me.picker.getSelectionModel().lastSelected || 0);
            }
        }
    },

    doTypeAhead: function () {
        var me = this,
            Event = Ext.event.Event;
        if (!me.typeAheadTask) {
            me.typeAheadTask = new Ext.util.DelayedTask(me.onTypeAhead, me);
        }
        if (me.lastKey !== Event.BACKSPACE && me.lastKey !== Event.DELETE) {
            me.typeAheadTask.delay(me.typeAheadDelay);
        }
    },


    onTriggerClick: function () {
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

    onFieldMutation: function (e) {
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
                me.callParent([e]);
            }
        }
    },

    onDestroy: function () {
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
    onAdded: function () {
        var me = this;
        me.callParent(arguments);
        if (me.picker) {
            me.picker.ownerCt = me.up('[floating]');
            me.picker.registerWithOwnerCt();
        }
    },

    dataReady: false,
    getPickerStore: function () {
        var me = this;
        return me.store;
    },

    onBeforePickerShow: function (picker) {
        // Just before we show the picker, set its maxHeight so it fits
        // either above or below, it will flip to the side where it fits
        var me = this,
            heightAbove = me.getPosition()[1] - Ext.getBody().getScroll().top,
            heightBelow = Ext.Element.getViewportHeight() - heightAbove - me.getHeight();

        // Then ensure that vertically, the dropdown will fit into the space either above or below the inputEl.
        picker.maxHeight = Math.max(heightAbove, heightBelow) - 5; // have some leeway so we aren't flush against the window edge
    },

    onBeforeSelect: function (list, record, recordIndex) {
        return this.fireEvent('beforeselect', this, record, recordIndex);
    },

    onBeforeDeselect: function (list, record, recordIndex) {
        return this.fireEvent('beforedeselect', this, record, recordIndex);
    },

    onFocusChange: function (selModel, prevRecord, newRecord) {
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

    getSelection: function () {
        var selModel = this.getPicker().getSelectionModel(),
            selection = selModel.getSelection();

        return selection.length ? selModel.getLastSelected() : null;
    },

    updateSelection: function (selection) {
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

    updateBindSelection: function (selModel, selection) {
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

    onValueCollectionEndUpdate: function () {
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

    isSelectionUpdating: function () {
        var selModel = this.pickerSelectionModel;
        return selModel.deselectingDuringSelect || selModel.refreshing;
    },

    /**
     * @private
     * Enables the key navs for the BoundList when it is expanded.
     */
    onExpand: function () {
        var me = this, picker = me.getPicker();

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
    onCollapse: function () {
        var picker = this.getPicker();

        //if(picker.getNavigationModel) {
        //    var keyNav=this.getPicker().getNavigationModel();
        //    if(keyNav) {
        //        keyNav.disable();
        //    }
        //    if(this.updatingValue) {
        //        this.doQueryTask.cancel();
        //    }
        //}
    },

    /**
     * Selects an item by a {@link Ext.data.Model Model}, or by a key value.
     * @param {Object} r
     */
    select: function (r, /* private */ assert) {
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

    findRecord: function (field, value) {
        var ds = this.store,
            idx = ds.findExact(field, value);
        return idx !== -1 ? ds.getAt(idx) : false;
    },

    getSelectedRecord: function () {
        return this.findRecordByValue(this.value) || null;
    },


    findRecordByValue: function (value) {
        var result = this.store.byValue.get(value),
            ret = false;

        // If there are duplicate keys, tested behaviour is to return the *first* match.
        if (result) {
            ret = result[0] || result;
        }
        return ret;
    },

    findRecordByDisplay: function (value) {
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
    addValue: function (value) {
        if (value != null) {
            return this.doSetValue(value, true);
        }
    },

    setValue: function (value) {
        var me = this;

        // Value needs matching and record(s) need selecting.
        if (value != null) {
            return me.doSetValue(value);
        }
        // Clearing is a special, simpler case.
        else {
            me.suspendEvent('select');
            me.valueCollection.beginUpdate();
            me.pickerSelectionModel.deselectAll();
            me.valueCollection.endUpdate();
            me.lastSelectedRecords = null;
            me.resumeEvent('select');
        }
    },

    setRawValue: function (rawValue) {
        this.callParent([rawValue]);
        this.lastMutatedValue = rawValue;
    },

    /**
     * @private
     * Sets or adds a value/values
     */
    doSetValue: function (value /* private for use by addValue */, add) {
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
            i, len, record, dataObj,
            valueChanged, key;

        //<debug>
        if (add && !me.multiSelect) {
            Ext.raise('Cannot add values to non multiSelect ComboBox');
        }
        //</debug>

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
        for (i = 0, len = value.length; i < len; i++) {
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
    updateValue: function () {
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
        me.displayTplData = displayTplData; //store for getDisplayValue method

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
    setHiddenValue: function (values) {
        var me = this,
            name = me.hiddenName,
            i,
            dom, childNodes, input, valueCount, childrenCount;

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
    getDisplayValue: function (tplData) {
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
    getRecordDisplayData: function (record) {
        return record.data;
    },

    getValue: function () {
        // If the user has not changed the raw field value since a value was selected from the list,
        // then return the structured value from the selection. If the raw field value is different
        // than what would be displayed due to selection, return that raw value.
        var me = this,
            store = me.getStore(),
            picker = me.picker,
            rawValue = me.getRawValue(), //current value of text field
            value = me.value; //stored value from last selection or setValue() call

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

    getSubmitValue: function () {
        var value = this.getValue();
        // If the value is null/undefined, we still return an empty string. If we
        // don't, the field will never get posted to the server since nulls are ignored.
        if (Ext.isEmpty(value)) {
            value = '';
        }
        return value;
    },

    isEqual: function (v1, v2) {
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
    clearValue: function () {
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
    tpl: Ext.create('Ext.XTemplate',
        '<ul class="x-list-plain"><tpl for=".">',
        '<li role="option" class="x-boundlist-item">{provinceText} {cityText}</li>',
        '</tpl></ul>'
    ),
    displayTpl: Ext.create('Ext.XTemplate',
        '<tpl for=".">',
        '{provinceText} {cityText}',
        '</tpl>'
    ),

    refreshCityForm: function () {
        var me = this;
        if (!me.formPicker)
            return;
        me.formPicker.initData(me.store);
    },


    //override createPicker方法，获得自定义的picker
    createPicker: function () {
        var me = this, comboPicker = me.comboPicker,
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

    createFormPicker: function () {
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

    createComboPicker: function () {
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

    beforeDestroy: function () {
        var me = this,
            comboPicker = me.comboPicker, formPicker = me.formPicker;
        me.callParent();

        if (comboPicker) {
            me.comboPicker = comboPicker.pickerField = null;
        }
        if (formPicker) {
            me.formPicker = formPicker.pickerField = null;
        }


    }
});