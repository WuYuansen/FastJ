/**
 * js 弹出表格 
 * 
 */
angular.module('angular.directives-popup-table', []).directive('popuptable', [function () {
	return{
		restrict:'EA',
	    scope: {
	    	width : '=width',
	    	height : '=height',
	    	columns : '=columns',
	    	field : '=field',
	    	url : '=url',
	    	cellBack : '=cellBack'
	    },
	    template : '<div name="popuptable">\
	    	<div class="jew100">\
			<div class="tools  fmy">\
		            <ul class="flexbox je-box-left jew100 f14">\
		                <li class="flexbox je-box-left jew50">\
					    	 <span class="flexbox je-text-right pl10 pr10">请输入查询关键字：</span>\
				            <p class="flexbox jeflex"><input type="text" class="my-input" name="keyWork" placeholder="请输入人员姓名或所在单位名称进行查询"></p>\
		                </li>\
		                <li class="flexbox je-box-left mr5 jew50">\
		                    <button type="button" class="jebtn jebtn-blue tool_sobtn rdu4">查询</button>\
		                </li>\
		            </ul>\
	        </div>\
	    	<div id="divDataByPopUpTable"></div>\
	    	<div class="fixbot">\
		    	<div class="divpages f14 fmy" id="divPage">\
			    </div>\
			</div>\
	    	</div>',
	    link: function (scope, elements, attributes) {
	    	var width = scope.width || '800px';
            var height = scope.height || '400px';
            var divDom = elements[0].children[0];
            var popuptableStyle = "width:"+width+";height:100%;min-height:200px;position: absolute;z-index:99999;background: white;";
            divDom.setAttribute('style', popuptableStyle);
            //创建表格
            $('#divDataByPopUpTable').jeGrid({
                dataUrl: scope.url,
                jsondataType: 'json',
                params:{},
                pageSize:7,
                columnSort:[],
                columns:scope.field || [],
                colsHtml:scope.columns || [],
                success:function(){
                	$.fn.reviewAngularDOM(angular,$('#divDataByPopUpTable'));
                	$('span').each(function(index,obj){
                		$(obj).text($(obj).text() == "null"?"":$(obj).text());
                	});
                }
            });
            
	    }
	}
}]);
