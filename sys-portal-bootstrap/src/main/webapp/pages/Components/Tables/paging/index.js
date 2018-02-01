/**
 * User: 吴元森/15909910367@163.com
 * Date: 2017/2/10
 * Time: 10:48
 */
define(['require', 'angular', 'jquery', 'myView','jqGrid'], function (require, angular, $) {
    return function (module, controller) {
        /*! 创建默认模块及默认控制器 */
        angular.module(module, ['myView']).controller(controller, ['$scope', '$location', '$view',
            function ($scope, $location, $view) {
                $scope.app.layout.classes.body = 'body';
                $scope.location_path = "分页表格你懂的";
                $scope.form = {};
                //页面事件
                $scope.addClick = onAddClick;
                $scope.modifyClick = onModifyClick;
                $scope.deleteClick =onDeleteClick;
                $scope.reloadClick = onReLoad;
                initGrid();

            }
        ]);
    };
});
//初始化表格
function initGrid(url){
    $("#divData").jeGrid({
        dataUrl: url || 'tempData/table/paging/package.json',
        jsondataType: 'json',
        columnSort:[1,3,4,5],
        pageCell:'fixbot',
        columns:[
            '<input id="jqchk" name="valitems" type="checkbox"/>',
            '编号',
            '标题',
            '籍贯',
            '是否审核',
            '发布时间',
            '操作'],
        colsHtml:[
            {field:'ID',html:'<input id="jqchk" name="valitems" value="{@#ID @}" type="checkbox"/>',cell:"tc"},
            {field:'ID',html:'{@#ID @}'},
            {field:'name',html:'<span>{@#name @}</span>'},
            {field:'city',html:'{@# city @}'},
            {field:'isAudit',html:'{@#isAudit @}'},
            {field:'datetime',html:'{@#datetime@}'},
            {field:'ID',html:'<a href="javascript:onModifyClick({@#ID @});" class="tooledit mr10 db" title="编辑"></a>' +
            '<a href="javascript:;" onclick="onDeleteClick({@#ID @})" class="tooldel mr10 db" title="删除"></a>'}
        ],
        success:function(){/*checkALlNotAll();*/}
    });
}

function checkALlNotAll(){
//多选与全选
    var Checkitem=$('.tabledata input[name="valitems"]');
    $(Checkitem).iCheck({
        checkboxClass: 'icheckbox_futurico',
        radioClass: 'iradio_futurico',
        increaseArea: '0%' // optional
    });
    $(Checkitem).on('ifClicked', function(event){
        if($(this).is(':checked')){
            $(this).parent().parent().parent().removeClass("select");
        }else{
            $(this).parent().parent().parent().addClass("select");
        }
    });

    $('#jqchk').on('ifChecked', function(event){
        $(Checkitem).iCheck('check');
        $.each(Checkitem,function(){
            if($(this).is(':checked')){
                $(this).parent().parent().parent().addClass("select");
            }
        })
    });
    $('#jqchk').on('ifUnchecked', function(event){
        $(Checkitem).iCheck('uncheck');
        $.each(Checkitem,function(){
            if(!$(this).is(':checked')){
                $(this).parent().parent().parent().removeClass("select");
            }
        })
    });
    $.each(Checkitem,function(){
        if($(this).is(':checked')){
            $(this).parent().parent().parent().addClass("select");
        }else{
            $(this).parent().parent().parent().removeClass("select");
        }
    });
}

function onReLoad(){
    angular.$dialog.tips('正在加载数据，请稍后');
};

function onDeleteClick(){
    angular.$dialog.confirm('您确定要删除您所选的数据',function(){
        angular.$dialog.tips('正在删除所选数据，请稍后');
    });
};

function onModifyClick(){
    angular.$dialog.window('<i class="fa fa-info"></i> 修改',$('#paging_modifyPageDmo')[0].innerHTML);
};

function onAddClick(){
    angular.$dialog.window('<i class="fa fa-info"></i>添加','这里是添加页面');
}
