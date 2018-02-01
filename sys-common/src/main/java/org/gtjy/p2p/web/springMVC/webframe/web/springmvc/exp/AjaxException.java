package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exp;

import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.bean.AjaxError;



/**
 * 
 * <p> Title: AjaxException</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class AjaxException extends RuntimeException {
	private static final long serialVersionUID = -8179866059145520037L;
	private AjaxError ajaxError = null;

	public AjaxException(String msg) {
		super(msg);
	}

	public AjaxException(Throwable cause) {
		super(cause);
	}

	public AjaxException(AjaxError ajaxError, String msg) {
		super(msg);
		this.ajaxError = ajaxError;
	}

	public AjaxException(AjaxError ajaxError, Throwable cause) {
		super(cause);
		this.ajaxError = ajaxError;
	}

	public AjaxError getAjaxError() {
		if (ajaxError == null) {
			this.ajaxError = new AjaxError();
			this.ajaxError.putError("msg_info", "服务器异常，请联系管理员！");
		}
		return ajaxError;
	}
}