package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception;

import org.gtjy.p2p.util.StringUtils;


/**
 * 
 * <p> Title: 统一的业务控制层异常类</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class ControllerException extends RuntimeException {
	private static final long serialVersionUID = 1998063243843477017L;
	private Integer errorCode;
	
	public ControllerException(Integer errorCode) {
		if (errorCode == null)
			throw new IllegalArgumentException("参数 errorCode 不能为空.");
		this.errorCode = errorCode;
	}
	
	public ControllerException(String msg){
		if (StringUtils.isEmpty(msg))
			throw new IllegalArgumentException("参数 errorView 不能为空.");
	}
	
	public ControllerException(int errorCode, String errorView) {
		if (StringUtils.isEmpty(errorView))
			throw new IllegalArgumentException("参数 errorView 不能为空.");
		this.errorCode = errorCode;
	}
	
	public int getErrorCode() {
		return errorCode;
	}
}
