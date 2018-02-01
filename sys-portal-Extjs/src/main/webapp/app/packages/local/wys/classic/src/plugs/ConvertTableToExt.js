/**
 * 将普通table元素转换成Ext格式的
 */
Ext.define('wys.plugs.ConvertTableToExt',{
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
            width,
            height,
            store,
            col,
            text,
            name;
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
        this.callParent([config]);
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