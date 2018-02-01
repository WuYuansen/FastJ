/**
 
 @Name：laycode v1.1
 @Author：贤心
 @Date：2014-6-12
 @Site：http://sentsin.com/layui/laycode/
 
 */

;!function(win) {

var path = 'http://res.sentsin.com/lay/lib/laycode/';
var code = {
    getPath: (function(){
        var js = document.scripts, jsPath = js[js.length - 1].src;
        return path ? path : jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
    }()),
    
    v: '1.1',
    
    //初始key
    config: {
        height: 'auto',
        title: '代码',
        skin: 0,
        by: true
    },
    
    init: function(){
        var dom = this.dom = [$('head'), $('body')];
        dom[0].prepend('<link href="'+ code.getPath +'laycode.css" type="text/css" rel="stylesheet" />');
        dom[1].addClass('laycode');
    },
    
    clas: '',
    
    view: function(options, othis){
        var log = {
            is: othis.parent('.code_box')[0],
            clas: 'code_box code_skin'
        }, conf = $.extend({}, code.config, options);
        
        if(othis[0].tagName.toLocaleLowerCase() === 'pre'){
            log.is || othis.wrap('<div></div>');
            othis.parent().attr('class', log.clas + conf.skin);
        } else {
            log.is || (code.clas = othis.attr('class'));
            log.clas = code.clas + ' ' + log.clas;
            othis.attr('class', log.clas + conf.skin);
            othis = othis.find('pre');
        }
        
        log.is || othis.parent().append('<span class="code_title">'+ conf.title + (conf.by ? '<a href="http://sentsin.com/layui/laycode/" target="_blank">laycode - v'+  code.v +'</a>' : '') +'</span>');
        
        log.preheg = othis[0].scrollHeight - 10;
        log.is || othis.append('<ol class="code_nums" style="height:'+ log.preheg +'px;">'+ function(){
            var li = '';
            for(var i = 0; i < log.preheg/20; i++){
                li += '<li>'+ (i+1) +'</li>';
            }
            return li;
        }() +'</ol>');
        
        if(conf.height !== 'auto'){
            othis.css({height: conf.height, 'overflow-y': 'auto'});
            othis.find('.code_nums').addClass('code_numsie6');
        }
        
        code.is = true;
    }
};

code.run = function(){
    code.init();
    
    //主拓展
    $.fn.laycode = function(options){
        this.each(function(){
            code.view(options, $(this));
        });
    };
};

if(window.seajs){
    define(function(){
		code.run();
	});
} else {
    code.run();
}

}(window);