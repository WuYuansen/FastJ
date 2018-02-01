/**
 *
 * <p> Title:Window Command MODEL</p>
 * <p> Description:  重写Grid的ActionColumn</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * @author wys
 * @version 1.0
 */
Ext.define('wys.grid.column.Command',{
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
        var me=this;
        me.callParent(arguments);
        me.commands=me.commands||[];
        if(me.autoWidth) {
            me.width=me.minWidth=me.commandWidth*me.commands.length+me.adjustmentWidth;
            me.fixed=true;
        }
        me.renderer=Ext.Function.bind(me.renderer,me);
    },
    initRenderData: function() {
        var me=this;
        me.gridRef=me.up('tablepanel');
        me.gridRef.addCls("x-grid-group-imagecommand");
        var groupFeature=me.getGroupingFeature(me.gridRef);
        if(me.groupCommands&&groupFeature) {
            me.gridRef.view.on('groupclick',me.onGroupClick,me);
            me.gridRef.view.on('containerclick',me.onClick,me);
            if(Ext.isString(groupFeature.groupHeaderTpl)) {
                groupFeature.groupHeaderTpl='<div class="group-row-imagecommand-cell">'+groupFeature.groupHeaderTpl+'</div>'+this.groupCommandTemplate;
            } else if(groupFeature.groupHeaderTpl&&groupFeature.groupHeaderTpl.html) {
                groupFeature.groupHeaderTpl.html='<div class="group-row-imagecommand-cell">'+groupFeature.groupHeaderTpl.html+'</div>'+this.groupCommandTemplate;
            }
            groupFeature.commandColumn=me;
            groupFeature.setupRowData=Ext.Function.createSequence(groupFeature.setupRowData,this.getGroupData,this);
        }
        return me.callParent(arguments);
    },
    afterHide: function() {
        this.callParent(arguments);
        Ext.select(".x-grid-cell-"+this.id).addCls("x-hide-command");
    },
    afterShow: function() {
        this.callParent(arguments);
        Ext.select(".x-grid-cell-"+this.id).removeCls("x-hide-command");
    },
    getGroupData: function(record,idx,rowValues) {
        var preparedCommands=[],i,cmd,command,groupCommands=this.groupCommands;
        if(!rowValues.isFirstRow) {
            return;
        }
        for(i=0;i<groupCommands.length;i++) {
            cmd=groupCommands[i];
            if(cmd.iconCls&&cmd.iconCls.charAt(0)==='#') {
                cmd.iconCls=X.net.RM.getIcon(cmd.iconCls.substring(1));
            }
        }
        var groupId=record.get(this.getGroupingFeature(this.gridRef).refreshData.groupField)
            ,records=groupId?this.gridRef.store.getGroups().get(groupId).items:null;
        if(this.prepareGroupCommands) {
            groupCommands=Ext.net.clone(this.groupCommands);
            this.prepareGroupCommands(this.gridRef,groupCommands,groupId,records);
        }

        for(i=0;i<groupCommands.length;i++) {
            cmd=groupCommands[i];
            cmd.tooltip=cmd.tooltip||{};
            if(cmd.iconCls&&cmd.iconCls.charAt(0)==='#') {
                cmd.iconCls=X.net.RM.getIcon(cmd.iconCls.substring(1));
            }
            command={
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
                rightAlign: cmd.rightAlign||false
            };
            if(this.prepareGroupCommand) {
                this.prepareGroupCommand(this.gridRef,command,groupId,records);
            }
            if(command.iconCls&&command.iconCls.charAt(0)==='#') {
                command.iconCls=X.net.RM.getIcon(command.iconCls.substring(1));
            }
            if(command.disabled) {
                command.cls=(command.cls||"")+" x-imagecommand-disabled";
            }
            if(command.hidden) {
                var hideMode=command.hideMode||"display";
                command.hideCls="x-hidden-"+hideMode;
            }
            if(command.rightAlign) {
                command.align="right-group-imagecommand";
            } else {
                command.align="";
            }
            preparedCommands.push(command);
        }
        rowValues.metaGroupCache.commands=preparedCommands;
    },
    getGroupingFeature: function(grid) {
        return grid.groupingFeature;
    },
    processEvent: function(type,view,cell,recordIndex,cellIndex,e) {
        if((type==="click")&&e.getTarget(".row-imagecommand",3)) {
            this.onClick(view,e,recordIndex,cellIndex);
            if(this.stopSelection!==false) {
                var sm=this.gridRef.getSelectionModel()
                    ,locked=sm.locked;
                sm.locked=true;
                Ext.defer(function() {
                        sm.locked=locked;
                    }
                    ,1);
            }
        }

        return this.callParent(arguments);
    },
    onGroupClick: function(view,rowElement,groupName,e) {
        var t=e.getTarget(".group-row-imagecommand"),cmd;
        if(t) {
            var groupField=this.gridRef.store.groupField;
            cmd=Ext.fly(t).getAttribute("cmd");
            if(Ext.isEmpty(cmd,false)||Ext.fly(t).hasCls("x-imagecommand-disabled")) {
                return;
            }
            this.fireEvent("groupcommand",this,cmd,this.gridRef.store.getGroups().get(groupName));
        }
        return !t;
    },
    onClick: function(view,e,recordIndex,cellIndex) {
        var view=this.gridRef.getView(),cmd,record,recordId,t=e.getTarget(".row-imagecommand");
        if(t) {
            cmd=Ext.fly(t).getAttribute("cmd");
            if(Ext.isEmpty(cmd,false)||Ext.fly(t).hasCls("x-imagecommand-disabled")) {
                return;
            }
            var row=e.getTarget(".x-grid-row");
            if(row===false) {
                return;
            }
            if(this!==this.gridRef.headerCt.getHeaderAtIndex(cellIndex)) {
                return;
            }
            recordId=Ext.fly(t).getAttribute("recordId");
            if(recordId&&this.gridRef.store.getAt) {
                record=this.gridRef.store.getByInternalId(recordId);
            }
            else {
                record=this.gridRef.store.getAt?this.gridRef.store.getAt(recordIndex):view.getRecord(view.getNode(recordIndex));
            }
            this.fireEvent("command",this,cmd,record,recordIndex,cellIndex);
        }
        t=e.getTarget(".group-row-imagecommand");
        if(t) {
            var groupField=this.gridRef.store.groupField
                ,groupId=Ext.fly(t).getAttribute("data-groupname");
            cmd=Ext.fly(t).getAttribute("cmd");
            if(Ext.isEmpty(cmd,false)||Ext.fly(t).hasCls("x-imagecommand-disabled")) {
                return;
            }
            this.fireEvent("groupcommand",this,cmd,this.gridRef.store.getGroups().get(groupId));
        }
    },
    renderer: function(value,meta,record,row,col,store) {
        var node;
        meta.tdCls=meta.tdCls||"";
        meta.style = "margin-left:2px;";
        meta.tdCls+=" row-imagecommand-cell";
        if(meta) {
            meta.tdCls=meta.tdCls||"";
            meta.tdCls+=" row-imagecommand-cell";
        }
        else {
            node=view.getNode(record);
            if(node) {
                node=Ext.fly(node).down("td[data-columnid="+this.id+"]");
                if(node) {
                    node.addCls("row-imagecommand-cell");
                }
            }
        }
        if(this.isHidden()) {
            if(meta) {
                meta.tdCls+=" x-hide-command";
            }
            else if(node) {
                node.addCls("x-hide-command");
            }
        }
        if(this.commands) {
            var me=this,preparedCommands=[],i,cmd,command,commands=this.commands;

            for(i=0;i<commands.length;i++) {
                cmd=commands[i];
                if(cmd.iconCls&&cmd.iconCls.charAt(0)==='#') {
                    cmd.iconCls=X.net.RM.getIcon(cmd.iconCls.substring(1));
                }
            }
            if(this.prepareCommands) {
                commands=Ext.net.clone(this.commands);
                this.prepareCommands(this.gridRef,commands,record,row);
            }
            for(i=0;i<commands.length;i++) {
                cmd=commands[i];
                cmd.tooltip=cmd.tooltip||{};
                if(cmd.iconCls&&cmd.iconCls.charAt(0)==='#') {
                    cmd.iconCls=X.net.RM.getIcon(cmd.iconCls.substring(1));
                }
                command={
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
                    renderer : cmd.renderer
                };
                if(typeof cmd.renderer === "function"){ //如果renderer是一个函数
                	cmd.renderer(command,record);
                }
                if(this.prepareCommand) {
                    this.prepareCommand(this.gridRef,command,record,row);
                }
                if(command.iconCls&&command.iconCls.charAt(0)==='#') {
                    command.iconCls=X.net.RM.getIcon(command.iconCls.substring(1));
                }
                if(command.disabled) {
                    command.cls=(command.cls||"")+" x-imagecommand-disabled";
                }
                if(command.hidden) {
                    var hideMode=command.hideMode||"display";
                    command.hideCls="x-hidden-"+hideMode;
                }
                if(Ext.isIE6&&Ext.isEmpty(cmd.text,false)) {
                    command.noTextCls="no-row-imagecommand-text";
                }
                preparedCommands.push(command);
            }
            return this.getRowTemplate().apply({
                commands: preparedCommands
            });
        }
        return "";
    },
    commandTemplate: '<div class="row-imagecommands">'+'<tpl for="commands">'+'<div recordId="{recordId}" cmd="{command}" class="row-imagecommand {cls} {noTextCls} {iconCls} {hideCls}" '+'style="{style}" data-qtip="{qtext}" data-qtitle="{qtitle}" data-qclass="{qclass}" data-qwidth="{qwidth}" data-qheight="{qheight}">'+'<tpl if="text"><span data-qtip="{qtext}" data-qtitle="{qtitle}" data-qclass="{qclass}" data-qwidth="{qwidth}" data-qheight="{qheight}">{text}</span></tpl>'+'</div>'+'</tpl>'+'</div>',
    groupCommandTemplate: '<tpl for="commands">'+'<div cmd="{command}" class="group-row-imagecommand {cls} {iconCls} {hideCls} {align}" '+'style="{style}" data-qtip="{qtext}" data-qtitle="{qtitle}"><tpl if="text"><span data-qtip="{qtext}" data-qtitle="{qtitle}" class="{cls}">{text}</span></tpl></div>'+'</tpl>',
    getRowTemplate: function() {
        if(Ext.isEmpty(this.rowTemplate)) {
            this.rowTemplate=new Ext.XTemplate(this.commandTemplate);
        }
        return this.rowTemplate;
    }
});