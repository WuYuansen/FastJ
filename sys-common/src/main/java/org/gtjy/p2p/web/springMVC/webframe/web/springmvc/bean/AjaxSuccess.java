package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.bean;

import com.alibaba.fastjson.JSONObject;

/**
 * 
 * <p> Title: Ajax成功信息</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class AjaxSuccess extends AjaxJson {
	private JSONObject success = null;
	
	public AjaxSuccess putSuccess(String key, String success) {
		createSuccess();
		this.success.put(key, success);
		return this;
	}

	protected JSONObject createSuccess() {
		if (this.success == null) this.success = new JSONObject();
		return this.success;
	}

	@Override
	public String toString() {
		createSuccess();
		putMsg("success", success);
		return super.toString();
	}
	
	/* 无参构造函数 */
	public AjaxSuccess() {
	}
	/* 构造函数 */
	public AjaxSuccess(JSONObject success) {
		this.success =	success;
	}
	
}
