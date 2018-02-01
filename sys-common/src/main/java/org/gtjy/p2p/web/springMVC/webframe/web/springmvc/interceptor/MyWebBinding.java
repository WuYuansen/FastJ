package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.interceptor;

import java.util.Date;

import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.support.WebBindingInitializer;
import org.springframework.web.context.request.WebRequest;

/**
 * 
 * <p> Title: springMVC属性编辑器转换 </p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class MyWebBinding implements WebBindingInitializer {

	@Override
	public void initBinder(WebDataBinder binder, WebRequest request) {
		binder.registerCustomEditor(Date.class, new DateConvertEditor());
	}
	
}
