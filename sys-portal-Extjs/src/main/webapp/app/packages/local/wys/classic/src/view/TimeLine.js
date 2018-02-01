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
Ext.define('wys.view.TimeLine',{
    extend:'Ext.view.View',
    xtype:'dataview-timeLine',
    itemSelector:'span.fa-circle',
    tpl:[
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
    listeners:{
        itemclick :function(obj, record, item, index, e, eOpts){
        var currentPointStyle="cursor: pointer;transform:scale(1.5,1.5)",
            pointStyle="cursor: pointer;transform:scale(1,1)",
            treePointArray = Ext.query("span.fa-circle");

        Ext.each(treePointArray,function(point,pointIndex,self){
            var pointOrginalColor = point.style.color;
            if(pointIndex==index){
                point.style=currentPointStyle;
                point.style.color=pointOrginalColor;
            }else{
                point.style=pointStyle;
                point.style.color=pointOrginalColor;
            }
        });
        obj.up('pushWindow').down('panel[tag=timecontentBanner]').setStyle({
        	zIndex:99999,
        	left:'120px'
        });
        obj.up('pushWindow').down('[tag=timecontentBanner]').setHtml('<div class="caretLeft" style="border-right-color:'+
        		item.getAttribute('data-color')+
        		';margin-top:3px;margin-left:0px;"></div><div class="shadow" style="width:290px;background-color: '+
        		item.getAttribute('data-color')+
        		';padding:0px 5px;color:#fff;text-align:center;">'
        		+ record.data.remarks +
        		'</div>');
    }
    }
})