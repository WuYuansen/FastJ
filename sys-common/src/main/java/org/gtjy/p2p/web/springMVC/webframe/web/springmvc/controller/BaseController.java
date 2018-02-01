package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.convert.TimeStapConvertEditor;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.ControllerException;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exp.AjaxException;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.interceptor.DateConvertEditor;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.interceptor.MyWebBinding;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.context.request.WebRequest;

import com.alibaba.fastjson.JSONObject;

/**
 * 
 * <p> Title: 系统控制器，并处理Service异常</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 * @param <T>
 */
public class BaseController extends MyWebBinding{
	private static Log logger = LogFactory.getLog(BaseController.class);
	
	
	@InitBinder//必须有一个参数WebDataBinder 日期类型装换
	public void initBinder(WebDataBinder binder, WebRequest request) {
	    binder.registerCustomEditor(Date.class, new DateConvertEditor());
//	    binder.registerCustomEditor(Date.class, new TimeStapConvertEditor());
		super.initBinder(binder, request);
	}
	
	/**
	 * 从流中获取参数
	 * @return
	 */
	protected String getParam(HttpServletRequest request){
		try {
			BufferedReader bf = new BufferedReader(new InputStreamReader((ServletInputStream)request.getInputStream()));
			String line = null;
			StringBuffer sb = new StringBuffer();
			while((line = bf.readLine()) != null){
				sb.append(line);
			}
			return sb.toString();
		} catch (IOException e) {
			throw new ControllerException(e.getMessage());
		}
	}
	
	/**
	 * 构建分页查询需要的参数信息
	 * @param start
	 * @param limit
	 * @return
	 */
	protected String BuildPagingStr(String start,String limit) {
		Map<String, Integer> pagingStr = new HashMap<String, Integer>();
		pagingStr.put("OFFSET", Integer.parseInt(start));
		pagingStr.put("LIMIT", Integer.parseInt(limit));
		return JSONObject.toJSONString(pagingStr);
	}

	/**
	 * 输出文本字符串
	 * 
	 * @param res
	 * @param msg
	 */
	protected void outWrite(HttpServletResponse res, String msg) {
		outWrite(res, msg, "text/xml");
	}

	/**
	 * 输出xml
	 * 
	 * @param res
	 * @param xml
	 */
	protected void outWriteXml(HttpServletResponse res, String xml) {
		outWrite(res, xml, "application/xml");
	}

	/**
	 * 输出JSON
	 * 
	 * @param res
	 * @param json
	 */
	protected void outWriteJSON(HttpServletResponse res, String json) {
		outWrite(res, json, "application/json");
	}

	/**
	 * 获取异常信息字符串，并记录日志
	 * 
	 * @param throwable
	 * @return
	 */
	protected String getMessage(Throwable throwable) {
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		throwable.printStackTrace(pw);
		logger.info(sw.toString());
		return sw.toString();
	}

	/**
	 * 返回流写入信息，并可以指定内容类型
	 * 
	 * @param res 返回流
	 * @param msg 内容
	 * @param contentType 内容类型
	 */
	protected void outWrite(HttpServletResponse res, String msg, String contentType) {
		res.setContentType(contentType);
		try {
			PrintWriter out = res.getWriter();
			out.write(msg);
			out.flush();
		} catch (IOException e) {
			throw new AjaxException(e);
		}
	}
	
	/**
	 * 输出javascript
	 * @param request
	 * @param content
	 */
	protected void outWriteScript(HttpServletResponse response,String content){
		outWrite(response,content,"");
	}
	
	/**
	 * 构建错误JSON格式数据
	 * @param errMsg
	 * @return
	 */
	protected String ErrorJSONStr(String errMsg){
		Map<String, Object> Json = new HashMap<String, Object>();
		Json.put("success", false);
		if(errMsg.isEmpty()){
			Json.put("msg_info", "连接超时！");
		}else{
			Json.put("msg_info", errMsg);
		}
		return JSONObject.toJSONString(Json);
	}
	
	/**
	 * 获取项目请求路径
	 * @param request
	 * @return
	 */
	protected String getBasePath(HttpServletRequest request){
		String path = request.getContextPath();
		String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
		return basePath;
	}
	
	/**
     * 获取登录用户的IP
     * 
     * @throws Exception
     */
    public String getRemortIP(HttpServletRequest request) throws Exception {
        String ip = "";
        if (request.getHeader("x-forwarded-for") == null) {
            ip = request.getRemoteAddr();
        } else {
            ip = request.getHeader("x-forwarded-for");
        }
        return ip;
    }

}
