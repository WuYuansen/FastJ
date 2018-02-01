package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.bean;

import com.alibaba.fastjson.JSONObject;

/**
 * 
 * <p> Title: JOSN信息封装</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class AjaxJson {
	private JSONObject	json	= new JSONObject();

	public AjaxJson putMsg(String key, Object value) {
		json.put(key, value);
		return this;
	}

	public Object getMsg(String key) {
		return json.get(key);
	}

	@Override
	public String toString() {
		String str = json.toString();
		System.out.println("AjaxJson:\n" + str);
		return str;
	}
}
