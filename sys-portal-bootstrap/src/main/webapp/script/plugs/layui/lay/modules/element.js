/**

 @Name：layui.element 常用元素操作
 @Author：贤心
 @License：LGPL

 */

layui.define('jquery', function (exports) {
    "use strict";

    var $ = layui.jquery
        , hint = layui.hint()
        , device = layui.device()
        , MOD_NAME = 'element', THIS = 'my-this', SHOW = 'my-show'
        , Element = function () {
            this.config = {};
        };

    //全局设置
    Element.prototype.set = function (options) {
        var that = this;
        $.extend(true, that.config, options);
        return that;
    };

    //表单事件监听
    Element.prototype.on = function (events, callback) {
        return layui.onevent(MOD_NAME, events, callback);
    };

    //外部Tab新增
    Element.prototype.tabAdd = function (filter, options) {
        var tabElem = $('.my-tab[lay-filter=' + filter + ']')
            , titElem = tabElem.children('.my-tab-title')
            , contElem = tabElem.children('.my-tab-content');
        titElem.append('<li>' + (options.title || 'unnaming') + '</li>');
        contElem.append('<div class="my-tab-item">' + (options.content || '') + '</div>');
        return call.tabAuto(), this;
    };

    //外部Tab删除
    Element.prototype.tabDelete = function (filter, index) {
        var tabElem = $('.my-tab[lay-filter=' + filter + ']')
            , liElem = tabElem.children('.my-tab-title').find('>li').eq(index);
        call.tabDelete(null, liElem);
        return this;
    };

    //外部Tab切换
    Element.prototype.tabChange = function (filter, index) {
        var tabElem = $('.my-tab[lay-filter=' + filter + ']')
            , liElem = tabElem.children('.my-tab-title').find('>li').eq(index);
        call.tabClick(null, index, liElem);
        return this;
    };

    var NAV_ELEM = '.my-nav', NAV_ITEM = 'my-nav-item', NAV_BAR = 'my-nav-bar'
        , NAV_TREE = 'my-nav-tree', NAV_CHILD = 'my-nav-child', NAV_MORE = 'my-nav-more'
        , NAV_ANIM = 'my-anim my-anim-upbit'

    //基础事件体
        , call = {
            //Tab点击
            tabClick: function (e, index, liElem) {
                var othis = liElem || $(this)
                    , index = index || othis.index()
                    , parents = othis.parents('.my-tab')
                    , item = parents.children('.my-tab-content').children('.my-tab-item')
                    , filter = parents.attr('lay-filter');

                othis.addClass(THIS).siblings().removeClass(THIS);
                item.eq(index).addClass(SHOW).siblings().removeClass(SHOW);

                layui.event.call(this, MOD_NAME, 'tab(' + filter + ')', {
                    elem: parents
                    , index: index
                });
            }

            //Tab删除
            , tabDelete: function (e, othis) {
                var li = othis || $(this).parent(), index = li.index();
                var parents = li.parents('.my-tab');
                var item = parents.children('.my-tab-content').children('.my-tab-item')

                if (li.hasClass(THIS)) {
                    if (li.next()[0]) {
                        call.tabClick.call(li.next()[0], null, index + 1);
                    } else if (li.prev()[0]) {
                        call.tabClick.call(li.prev()[0], null, index - 1);
                    }
                }

                li.remove();
                item.eq(index).remove();
            }

            //Tab自适应
            , tabAuto: function () {
                var SCROLL = 'my-tab-scroll', MORE = 'my-tab-more', BAR = 'my-tab-bar'
                    , CLOSE = 'my-tab-close', that = this;

                $('.my-tab').each(function () {
                    var othis = $(this)
                        , title = othis.children('.my-tab-title')
                        , item = othis.children('.my-tab-content').children('.my-tab-item')
                        , STOPE = 'lay-stope="tabmore"'
                        , span = $('<span class="my-unselect my-tab-bar" ' + STOPE + '><i ' + STOPE + ' class="my-icon">&#xe61a;</i></span>');

                    if (that === window && device.ie != 8) {
                        call.hideTabMore(true)
                    }

                    //允许关闭
                    if (othis.attr('lay-allowClose')) {
                        title.find('li').each(function () {
                            var li = $(this);
                            if (!li.find('.' + CLOSE)[0]) {
                                var close = $('<i class="my-icon my-unselect ' + CLOSE + '">&#x1006;</i>');
                                close.on('click', call.tabDelete);
                                li.append(close);
                            }
                        });
                    }

                    //响应式
                    if (title.prop('scrollWidth') > title.outerWidth() + 1) {
                        if (title.find('.' + BAR)[0])
                            return;
                        title.append(span);
                        span.on('click', function (e) {
                            title[this.title ? 'removeClass' : 'addClass'](MORE);
                            this.title = this.title ? '' : '收缩';
                        });
                    } else {
                        title.find('.' + BAR).remove();
                    }
                });
            }
            //隐藏更多Tab
            , hideTabMore: function (e) {
                var tsbTitle = $('.my-tab-title');
                if (e === true || $(e.target).attr('lay-stope') !== 'tabmore') {
                    tsbTitle.removeClass('my-tab-more');
                    tsbTitle.find('.my-tab-bar').attr('title', '');
                }
            }
            //点击选中
            , clickThis: function () {
                var othis = $(this), parents = othis.parents(NAV_ELEM)
                    , filter = parents.attr('lay-filter');

                if (othis.find('.' + NAV_CHILD)[0])
                    return;
                parents.find('.' + THIS).removeClass(THIS);
                othis.addClass(THIS);
                layui.event.call(this, MOD_NAME, 'nav(' + filter + ')', othis);
            }
            //点击子菜单选中
            , clickChild: function () {
                var othis = $(this), parents = othis.parents(NAV_ELEM)
                    , filter = parents.attr('lay-filter');
                parents.find('.' + THIS).removeClass(THIS);
                othis.addClass(THIS);
                layui.event.call(this, MOD_NAME, 'nav(' + filter + ')', othis);
            }
            //展开二级菜单
            , showChild: function () {
                var othis = $(this), parents = othis.parents(NAV_ELEM);
                var parent = othis.parent(), child = othis.siblings('.' + NAV_CHILD);
                if (parents.hasClass(NAV_TREE)) {
                    child.removeClass(NAV_ANIM);
                    parent[child.css('display') === 'none' ? 'addClass' : 'removeClass'](NAV_ITEM + 'ed');
                }
            }
        };

    //初始化元素操作
    Element.prototype.init = function (type) {
        var that = this, items = {

            //Tab选项卡
            tab: function () {
                call.tabAuto.call({});
            }

            //导航菜单
            , nav: function () {
                var TIME = 200, timer, timerMore, timeEnd, follow = function (bar, nav) {
                    var othis = $(this), child = othis.find('.' + NAV_CHILD);

                    if (nav.hasClass(NAV_TREE)) {
                        bar.css({
                            top: othis.position().top
                            , height: othis.children('a').height()
                            , opacity: 1
                        });
                    } else {
                        child.addClass(NAV_ANIM);
                        bar.css({
                            left: othis.position().left + parseFloat(othis.css('marginLeft'))
                            , top: othis.position().top + othis.height() - 5
                        });

                        timer = setTimeout(function () {
                            bar.css({
                                width: othis.width()
                                , opacity: 1
                            });
                        }, device.ie && device.ie < 10 ? 0 : TIME);

                        clearTimeout(timeEnd);
                        if (child.css('display') === 'block') {
                            clearTimeout(timerMore);
                        }
                        timerMore = setTimeout(function () {
                            child.addClass(SHOW)
                            othis.find('.' + NAV_MORE).addClass(NAV_MORE + 'd');
                        }, 300);
                    }
                }

                $(NAV_ELEM).each(function () {
                    var othis = $(this)
                        , bar = $('<span class="' + NAV_BAR + '"></span>')
                        , itemElem = othis.find('.' + NAV_ITEM);

                    //Hover滑动效果
                    if (!othis.find('.' + NAV_BAR)[0]) {
                        othis.append(bar);
                        itemElem.on('mouseenter', function () {
                            follow.call(this, bar, othis);
                        }).on('mouseleave', function () {
                            if (!othis.hasClass(NAV_TREE)) {
                                clearTimeout(timerMore);
                                timerMore = setTimeout(function () {
                                    othis.find('.' + NAV_CHILD).removeClass(SHOW);
                                    othis.find('.' + NAV_MORE).removeClass(NAV_MORE + 'd');
                                }, 300);
                            }
                        });
                        othis.on('mouseleave', function () {
                            clearTimeout(timer)
                            timeEnd = setTimeout(function () {
                                if (othis.hasClass(NAV_TREE)) {
                                    bar.css({
                                        height: 0
                                        , top: bar.position().top + bar.height() / 2
                                        , opacity: 0
                                    });
                                } else {
                                    bar.css({
                                        width: 0
                                        , left: bar.position().left + bar.width() / 2
                                        , opacity: 0
                                    });
                                }
                            }, TIME);
                        });
                    }

                    itemElem.each(function () {
                        var oitem = $(this), child = oitem.find('.' + NAV_CHILD);

                        //二级菜单
                        if (child[0] && !oitem.find('.' + NAV_MORE)[0]) {
                            var one = oitem.children('a');
                            one.append('<span class="' + NAV_MORE + '"></span>');
                        }

                        oitem.off('click', call.clickThis).on('click', call.clickThis); //点击选中
                        oitem.children('a').off('click', call.showChild).on('click', call.showChild); //展开二级菜单
                        child.children('dd').off('click', call.clickChild).on('click', call.clickChild); //点击子菜单选中
                    });
                });
            }
            //面包屑
            , breadcrumb: function () {
                var ELEM = '.my-breadcrumb'

                $(ELEM).each(function () {
                    var othis = $(this)
                        , separator = othis.attr('lay-separator') || '>'
                        , aNode = othis.find('a');
                    if (aNode.find('.my-box')[0])
                        return;
                    aNode.each(function (index) {
                        if (index === aNode.length - 1)
                            return;
                        $(this).append('<span class="my-box">' + separator + '</span>');
                    });
                    othis.css('visibility', 'visible');
                });
            }
        };

        return layui.each(items, function (index, item) {
            item();
        });
    };

    var element = new Element(), dom = $(document);
    element.init();

    var TITLE = '.my-tab-title li';
    dom.on('click', TITLE, call.tabClick); //Tab切换
    dom.on('click', call.hideTabMore); //隐藏展开的Tab
    $(window).on('resize', call.tabAuto); //自适应

    exports(MOD_NAME, function (options) {
        return element.set(options);
    });
});

