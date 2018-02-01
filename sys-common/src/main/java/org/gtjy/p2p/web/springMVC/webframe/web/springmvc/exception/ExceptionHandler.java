package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception;


import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.gtjy.p2p.JSON.JSONUtil;
import org.gtjy.p2p.util.MapUtil;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;


/**
 * 
 * <p> Title: 系统异常输出,配置文件中配置错误的类型 如：404， 500 等 或者 定义异常类如: RuntimeException</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class ExceptionHandler implements HandlerExceptionResolver {

	private static Log logger = LogFactory.getLog(ExceptionHandler.class);
	
	/**
	 * 输出错误
	 */
	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object obj, Exception ex) {
		logger.error("Catch Exception: ",ex);//把漏网的异常信息记入日志  
		String errorMessage = ex.getMessage();
	    Map<String, Object> model = MapUtil.newHashMap();
	    model.put("exceptionMessage", errorMessage);
	    model.put("ex", ex);
	    model.put("success", false);
	    model.put("msg_info",ex.getMessage());
	    response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = null;
		try {
			pw = response.getWriter();
		} catch (IOException e) {
			model.put("exceptionMessage", e.getMessage());
		}finally{
			pw.append(JSONUtil.ConvertJSONByObject(model).toString());
			pw.flush();
		    pw.close();
		}
		return null;
	}

}
