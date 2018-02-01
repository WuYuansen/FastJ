package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.bean;

import com.alibaba.fastjson.JSONObject;

/**
 * 
 * <p> Title: Ajax 错误信息</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class AjaxError extends AjaxJson {
	private JSONObject	error	= null;

	public AjaxError() {
	}

	public AjaxError(JSONObject error) {
		this.error = error;
	}

	public AjaxError putError(String key, String error) {
		createError();
		this.error.put(key, error);
		return this;
	}

	protected JSONObject createError() {
		if (this.error == null) this.error = new JSONObject();
		return this.error;
	}

	@Override
	public String toString() {
		createError();
		putMsg("error", error);
		return super.toString();
	}
}
