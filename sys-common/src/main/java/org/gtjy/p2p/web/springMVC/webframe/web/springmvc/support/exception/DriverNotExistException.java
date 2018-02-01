package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.support.exception;

/**
 * 
 * <p> Title: 模块插件驱动不存在异常</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class DriverNotExistException extends ModulePluginException {

	/**
	 * 
	 */
	private static final long	serialVersionUID	= -1354806416368944079L;

	public DriverNotExistException() {
		super("模块插件驱动类全路径不能为null！");
	}

	public DriverNotExistException(String driverPath) {
		super("模块插件驱动(" + driverPath + ")不存在！");
	}
}
