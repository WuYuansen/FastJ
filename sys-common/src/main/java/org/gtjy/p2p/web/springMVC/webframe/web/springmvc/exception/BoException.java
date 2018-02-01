package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception;

import java.text.MessageFormat;

/**
 * 
 * <p> Title: 业务处理异常对象。</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class BoException extends Exception {
	private static final long serialVersionUID = 2451599531477765055L;

	/**
	 * @param message
	 */
	public BoException(String message) {
		super(message);
	}
	
	public BoException(String message, Object ... params) {
		super(MessageFormat.format(message, params));
	}

	/**
	 * @param message
	 * @param cause
	 */
	public BoException(String message, Throwable cause) {
		super(message, cause);
	}
}
