
/**
 * 简易表格控件
 * @author wys 15909910367@163.com
 */
window.console && (console = console || {log : function(){return;}});
;(function($) {
    $.fn.jeGrid = function(options) {
        var config = {
            dataUrl: null, //用于AJAX内容的URL或对象
            jsonType: "GET", //AJAX请求方式 ("POST" 或 "GET")， 默认为 "GET"。
            jsondataType: "JSON", //用于AJAX内容的服务器返回的数据类型
            jsonAsync: true, //用于AJAX内容同步或异步加载
            dataRows: "extResultUtil.list", //数据格式类
            params : {},	//数据参数
            columns: null, //表头格式
            columnSort: [], //设定哪些表头可以排序
            colsHtml: [],  //为表格加入一些HTML元素
            pageIndex: 1, //默认为第一页
            pageSize: URL.pageSize, //默认每页显示10条
            pageField: ["offset","start", "limit"], //用于AJAX分页的分页类型
            pageCount:["extResultUtil.totalPage","extResultUtil.total"], //用于分页统计，totalPage为分页总数，total为每页显示多少个，可自定义字段
            pageCell: "#divPage", //分页容器
            pageWord: {
                first: Locale.firstText,
                last: Locale.lastText,
                prev: Locale.prevText,
                next: Locale.nextText,
                gotext:'转到',
                oktext: Locale.refreshText,
                displayMsg: Locale.displayMsg
            },
            dblclickFun:function(n) {}, //双击行的回调,n为当前序列值
            pageFun: function(n) {}, //点击分页的回调
            success: null //内容加载成功后的回调
        };
        var opts = $.extend(config, options), tabnum = Math.floor(Math.random() * 9999999);
        return this.each(function() {
            var that = $(this);
            var initData = function(index) {
            	angular.$dialog.loading();
                that.append('<table class="tabledata" id="table' + tabnum + '"><thead><tr></tr></thead><tbody></tbody></table>');
                if (typeof opts.dataUrl == "string") {
                    var newsUrl = opts.dataUrl + (opts.dataUrl.indexOf("?") != -1 ? "&" : "?");
                    function pages(n, field) {
                        return opts.pageField[n] == "" || opts.pageField[n] == null || opts.pageField == (null | undefined) ? "" : ((newsUrl.indexOf("?") != -1 && n == 0) ? "" : "&") + opts.pageField[n] + "=" + field;
                    }
                    var pagefield = pages(0, (index-1)*opts.pageSize),//2017年3月8日18:59:34
                    	start = pages(1,(index-1)*opts.pageSize),
                    	pagesize = pages(2, opts.pageSize);
                    $.ajax({
                        url: newsUrl + pagefield + start + pagesize,
                        type: opts.jsonType,
                        data: opts.params,
                        dataType: opts.jsondataType,
                        contentType: "application/x-www-form-urlencoded; charset=utf-8", 
                        async: opts.jsonAsync,
                        success:function(json) {
                            tdDataHtml(json, index);
                        }
                    });
                } else if (typeof opts.dataUrl == "object") {
                    tdDataHtml(opts.dataUrl, index);
                }
            };
            initData(opts.pageIndex);

            function tdDataHtml(data, index) {/* 加载数据 */
                var DataRows = (opts.dataRows == "" || opts.dataRows == null) ? "" : opts.dataRows, thStr = "";
                //生成表头
                $.each(opts.columns, function(i, d) {
                    thStr = "<th>" + d + "</th>";
                    $('#table' + tabnum).find("thead tr").append(thStr);
                });
                //核心部分
                function tdData(colsHtml) {
                    var tdStr = "", drs = DataRows + "[i].";
                    $.each(colsHtml, function(i, e) {
                        var colCell = colsHtml[i].cell == null || colsHtml[i].cell == "" || typeof colsHtml[i].cell == undefined ? "" : "class=" + colsHtml[i].cell + "",
                            colCss = colsHtml[i].css == null || colsHtml[i].css == "" || typeof colsHtml[i].css == undefined ? "" : "style=" + colsHtml[i].css + "",
                            htmlArr = colsHtml[i].html;
                        tdStr += "<td " + colCell + " " + colCss + "><div class='x-grid-cell-inner'>" + htmlArr.replace(/\{\@/g, "<=%").replace(/\#\s*/g, drs).replace(/\s*\@\}/g, "%>") + "</div></td>";
                    });
                    return tdStr;
                }
                //以模板引擎方式生成表格内容
                var tplhtml = "<% for(var i = 0; i < " + DataRows + ".length; i++){ %>" + "<tr>" + tdData(opts.colsHtml) + "</tr>" + "<% } %>";
                tppl(tplhtml, data, function(html) {
                	var tot = data.extResultUtil?data.extResultUtil.total:data.total;
                    if(tot === 0 || tot == null){
                        $('#table' + tabnum).find("tbody").append('<tr><td colspan="'+config.columns.length+'" style="text-align: center;">'+Locale.notFoundData+'</td></tr>');
                        return;
                    } 
                    if(html.search('tr') == -1){
                    	$('#table' + tabnum).find("tbody").append('<tr><td colspan="'+config.columns.length+'" style="text-align: center;"><span style="color:red;">'+html+'<span></td></tr>');
                    	return
                    }
                    $('#table' + tabnum).find("tbody").append(html);
                });
                //初始化分页
//                console.log(opts.pageCell, data[opts.pageCount[0]], data[opts.pageCount[1]], index);
                opts.pageField == (null | undefined) ? "" : jsPage(opts.pageCell, data.extResultUtil==undefined?data.total:data.extResultUtil.total, opts.pageSize, index);
                //点击分页数字跳转
                $(opts.pageCell).find("a").on("click", function() {
                    var thatpage = $(this).data("page");
                    pageDataFun(that, thatpage);
                });
                //输入数字点击确定跳转
                $(opts.pageCell + "-but").on("click", function() {
                    var valnum = $(opts.pageCell + "-num").val();
                    if(parseInt(valnum) == NaN){
                    	angular.$dialog.tips('请正确输入页码');
                    	$(opts.pageCell + "-num").val(1);
                    	$(opts.pageCell + "-num").focus;
                    	return;
                    }
                    if(valnum != ''){
                        valnum > data[opts.pageCount[0]] ? alert('总页数：'+data[opts.pageCount[0]]+'，不能大于总页数！') : pageDataFun(that, valnum);
                    }
                });
                if ($.isFunction(opts.success) || opts.success != ("" || null)) {
                    opts.success && opts.success();
                }

                TableSorter("#table" + tabnum, opts.columnSort);
                evenAndodd("#table" + tabnum);
                $('#table' + tabnum).find("tbody tr").dblclick(function() {
                    var tridx = $(this).index()+1;
                    if ($.isFunction(opts.dblclickFun) || opts.dblclickFun != ("" || null)) {
                        opts.dblclickFun && opts.dblclickFun(tridx);
                    }
                });
                angular.$dialog.close();
            }
            //隔行变色
            function evenAndodd(that) {
                $("tbody tr:odd", that).removeClass("even").addClass("odd"); //隔行变色 奇数行
                $("tbody tr:even", that).removeClass("odd").addClass("even"); //隔行变色 偶数行
            }
            //点击分页的回调
            function pageDataFun(that, page) {
                that.html("");
                $(opts.pageCell).html("");
                initData(page);
                opts.pageField == (null | undefined) ? "" : jsPage(opts.pageCell, opts.total, opts.pageSize, page);
                if ($.isFunction(opts.pageFun) || opts.pageFun != ("" || null)) {
                    opts.pageFun && opts.pageFun(page);
                }
            }
            //以模板方式调用生成表格数据
            function tppl(tpl, data, fun, fast) {
                var tool = {
                    startTag: "<%", endTag: "%>",
                    error: function(e, tplog) {
                        var error = "加载数据发生异常：";
                        typeof console === "object" && console.error(error + data.hasOwnProperty("exceptionMessage")?"未知异常":data.exceptionMessage + "\n" + (/*tplog ||*/ ""));
                        return error + data.exceptionMessage||e;
                    }
                }
                var Parse = function(tpl, data, fast) {
                    var fn = function(d) {
                        var i, k = [], v = [];
                        for (i in d) {
                            k.push(i);
                            v.push(d[i]);
                        };
                        return (new Function(k, fn.tp)).apply(d, v);
                    };
                    if (!fn.tp) {
                        fn.tp = 'var $="";';
                        var tpls = tpl.replace(/[\r\t\n]/g, " ").split(tool.startTag), i = 0;
                        while (i < tpls.length) {
                            var p = tpls[i];
                            if (i) {
                                var x = p.indexOf(tool.endTag);
                                fn.tp += p.substr(0, x);
                                p = p.substr(x + 2)
                            }
                            fn.tp += "$+='" + p.replace(/\'/g, "\\'").replace(/\<\=\%(.*?)\%\>/g, "'+$1+'") + "';";
                            i++;
                        }
                        fn.tp += "return $";
                    }
                    try {
                        return data ? fn(data) : fn;
                    } catch (e) {
                        return tool.error(e, tpl);
                    }
                }
                var html = Parse(tpl, data, fast);
                if (typeof html !== "string") return tool.error("数据模版未找到 请联系 Loser森 15909910367@163.com");
                if (fun === "function" || fun != null) {
                    return fun(html);
                };
            }
            //el:分页容器 count:分页总记录数 pageStep:每页显示多少个 pageNum:第几页 fnGo:分页跳转函数
            function jsPage(el, count, pageStep, pageNum) {
                this.getLink = function(index, pageNum, text) {
                    var text = text || index;
                    var str = (index == pageNum) ? '<span class="acurr">' + text + '</span>' : '<a href="javascript:;" data-page="' + index + '">' + text + '</a>';
                    return str;
                };
                //总页数
                var elCell = el.substr(1), pageNumAll = Math.ceil(count/pageStep), itemNum = 1;
                //当前页左右两边显示个数
                pageNum = Math.max(pageNum, 1);
                pageNum = Math.min(pageNum, pageNumAll);
                var str = "";
                str += "<font class='pagecount'>" + opts.pageWord.displayMsg.format(pageNum,pageNumAll,count) + "</font>" ;
//                str += this.getLink(1, pageNum, opts.pageWord.first);
                if (pageNum > 1) {
                    str += this.getLink(pageNum - 1, pageNum, opts.pageWord.prev);
                } else {
                    str += "<span>"+opts.pageWord.prev+"</span> ";
                }
                var begin = 1;
                if (pageNum - itemNum > 1) {
                    str += this.getLink(1, pageNum) + "<i>… </i>";
                    begin = pageNum - itemNum;
                }
                var end = Math.min(pageNumAll, begin + itemNum * 2);
                if (end == pageNumAll - 1) {
                    end = pageNumAll;
                }
                for (var i = begin; i <= end; i++) {
                    str += this.getLink(i, pageNum);
                }
                //last page
                if (end < pageNumAll) {
                    str += "<i>… </i>" + this.getLink(pageNumAll, pageNum);
                }
                if (pageNum < pageNumAll) {
                    str += this.getLink(pageNum + 1, pageNum, opts.pageWord.next);
                } else {
                    str += "<span>"+opts.pageWord.next+"</span> ";
                }
//                str += this.getLink(pageNumAll, pageNum, opts.pageWord.last);
                str += '<em>每页显示<select name="selectPageNum_pagingtoolbar" class="pagenum" readOny value="'+URL.pageSize+'"><option value="15">15</option><option value="20">20</option><option value="30">30</option><option value="50">50</option><option value="100">100</option><option value="1000">1000</option></select>条</em>';
                str += '<em>'+opts.pageWord.gotext+'<input class="pagenum" id="' + elCell + '-num" name="pagenum" onkeyup="this.value=this.value.replace(/[^0-9]/g,\'\')" onafterpaste="this.value=this.value.replace(/[^0-9]/g,\'\')" maxlength="2" type="text"/> <input class="pagebut" id="' + elCell + '-but" name="button" type="button" value="'+opts.pageWord.oktext+'"/></em>';
                $(el).html(str);
                //设置默认选中
                $("select[name=selectPageNum_pagingtoolbar]").find("option[value="+URL.pageSize+"]").prop("selected",true);
            }
            //表格排序
            function TableSorter(elem, colSort) {
                $.each(colSort, function(i, d) {
                    $("thead th", elem).eq(d).addClass("sortall").attr("sort", "asc");
                    //添加点击列头排序功能，时间：2017年6月5日17:00:28，添加人：吴元森
                    $($("thead th", elem).eq(d)[0]).html($($("thead th", elem).eq(d)[0]).text()+"&nbsp;&nbsp;");
                });
                var sortType = '', aTdCont = [], thi = 0; //点击列的索引值
                //判断是否为有效日期
                var isDate = function(str){
                    for(var i=0;i<str.length;i++){
                        if(str[i].match(/((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/)==null){
                            return false;
                        }
                        return true;
                    }
                }
                //判断是否为字符串类型(String)
                var isString = function(str){
                    for(var i=0;i<str.length;i++){
                        return ((typeof str[i] == 'string') && str[i].constructor == String) ? true : false;
                    }
                }
                //检查数据为哪种类型
                var variousType = function(aTdCont){
                    if(isDate(aTdCont)){
                        sortType = "date";
                    }else if(isString(aTdCont)){
                        for(var i=0;i<aTdCont.length;i++){
                            sortType = (/^\d+$/.test(aTdCont[i])) ? "number" : "string";
                        }
                    }
                }
                //根据类型选择对数据进行排序
                var descAndasc = function(a, b, type, bool) {
                    var a, b;
                    switch (type) {
                        case "date":
                            var dateSort = function(d1, d2) {
                                if(!isNaN(d1) && !isNaN(d2)){
                                    return parseInt(d1) - parseInt(d2);
                                }
                                return d1.localeCompare(d2);
                            };
                            return bool == true ? dateSort(a, b) :dateSort(b, a);
                            break;
                        case "string":
                            if(bool == true){
                                var vsA = a[0] > b[0], vsB = a[0] < b[0];
                            }else{
                                var vsA = a[0] < b[0], vsB = a[0] > b[0];
                            }
                            if(vsA) return -1;
                            else if (vsB) return 1;
                            else return 0;
                            break;
                        case "number":
                            return bool == true ? b - a : a - b;
                            break;
                    }
                };
                //比较函数的参数函数
                var compare_desc = function(a, b) {
                    return descAndasc(a,b,sortType,true);
                };
                var compare_asc = function(a, b) {
                    return descAndasc(a,b,sortType,false)
                };
                //重新对TR进行排序
                var reorderIndex = function(idx) {
                    for (i = 0; i < aTdCont.length; i++) {
                        $("tbody tr", elem).each(function() {
                            var thisText = $(this).children("td:eq(" + idx + ")").text();
                            if (thisText == aTdCont[i]) {
                                $("tbody").append($(this));
                            }
                        });
                    }
                    evenAndodd(elem);
                };

                //取出TD的值，并存入数组,取出前二个TD值；
                var setTdCont = function(idx) {
                    $(elem).find("tbody tr").each(function() {
                        var tdCont = $(this).children("td:eq(" + idx + ")").text();
                        aTdCont.push(tdCont);
                    });
                };
                //点击时需要执行的函数
                var clickFun = function(idx) {
                    aTdCont = [];
                    //获取点击当前列的索引值
                    var nThCount = idx;
                    //调用sortTh函数 取出要比较的数据
                    setTdCont(nThCount);
                    variousType(aTdCont);

                };
                //改变表格高度 2017年6月5日13:44:16
                myWindowResize(0,0);
                
                //
                $('select[name=selectPageNum_pagingtoolbar]').on('change',function(a){
                	config.pageSize = parseInt($(this).val());
                	opts.pageSize = parseInt($(this).val());
                	URL.pageSize = parseInt($(this).val());
                    pageDataFun(that, 1);
            	})
                
                //点击事件绑定函数，desc表示按倒序排序(即：从大到小排序)，asc表示按正序排序(即：从小到大排序)
                $.each(colSort, function(i, d) {
                    $(elem).find("thead th").eq(d).on("click", function() {
                        $(elem).find("thead th").removeClass('sort-desc').removeClass('sort-asc');
                        if ($(this).attr("sort") == "asc") {
                            $(this).attr("sort", "desc");
                            thi = $(this).index();
                            $(this).addClass("sort-desc");
                            clickFun(thi);
                            //调用比较函数,降序
                            aTdCont.sort(compare_desc);
                            //重新排序行
                            reorderIndex(thi);
                        } else {
                            $(this).attr("sort", "asc");
                            thi = $(this).index();
                            $(this).addClass("sort-asc");
                            clickFun(thi);
                            //调用比较函数,升序
                            aTdCont.sort(compare_asc);
                            //重新排序行
                            reorderIndex(thi);
                        }
                    });

                });
            }
        });
    };
})(jQuery);
/**
 * 定义方法,重写渲染页面使其脚本文件创建的dom节点的ng-属性有效
 * @param angular
 * @param dom
 * 
 */
(function($){
	$.fn.reviewAngularDOM = function(angular,dom){
		angular.element(document).injector().invoke(function($compile){
    		var scope = angular.element(dom).scope();
    		$compile(dom)(scope);
    	});
	}
})(jQuery);