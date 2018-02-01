package org.gtjy.p2p.web.session;

import java.util.UUID;
import java.util.regex.Pattern;

import org.apache.log4j.Logger;
import org.gtjy.p2p.constants.SystemConstant;



import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * 
 * <p> Title: Session 工具类</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class SessionUtil {
	protected static final Logger logger = Logger.getLogger(SessionUtil.class);
	
	/**
	 * 获取sessionID
	 * @param request
	 * @return
	 */
	public static String getUid(HttpServletRequest request){
		return request.getSession().getId();
	}
	
	public static String getUid() {
	    return UUID.randomUUID().toString().replaceAll("-", "");
	}
	
	/**
	 * 
	 * invalidate 销毁session
	 * (这里描述这个方法适用条件 – 可选)
	 * @param request 
	 * @return void
	 * @exception 
	 * @version  1.0.0
	 */
	public static void invalidate(HttpServletRequest request) {
	    request.getSession().invalidate();
	}
	
	/**
	  * 设置session的值
	  * @param request
	  * @param key
	  * @param value
	  */
	 public static void setAttr(HttpServletRequest request,String key,Object value){
		 request.getSession(true).setAttribute(key, value);
	 }
	 
	 
	 /**
	  * 获取session的值
	  * @param request
	  * @param key
	  * @param value
	  */
	 public static Object getAttr(HttpServletRequest request,String key){
		 return request.getSession(true).getAttribute(key);
	 }
	 
	 /**
	  * 删除Session值
	  * @param request
	  * @param key
	  */
	 public static void removeAttr(HttpServletRequest request,String key){
		 request.getSession(true).removeAttribute(key);
	 }
	 
	 /**
	  * 设置用户信息 到session
	  * @param request
	  * @param user
	  */
	 public static void setUser(HttpServletRequest request,Object user){
		 OnlineAppMap.put(request.getSession().getId(), request.getSession());
		 request.getSession(true).setAttribute(SystemConstant.SESSION_USER, user);
	 }
	 
	 
	 /**
	  * 从session中获取用户信息
	  * @param request
	  * @return SysUser
	  */
	 public static Object getUser(HttpServletRequest request){
		return request.getSession(true).getAttribute(SystemConstant.SESSION_USER);
	 }
	 
	 
	 /**
	  * 从session中获取用户信息
	  * @param request
	  * @return SysUser
	  */
	 public static void removeUser(HttpServletRequest request){
		removeAttr(request, SystemConstant.SESSION_USER);
	 }
	 
	 /**
	  * 获取用户对象
	  * @return
	  */
	 public static  Object getCurrentUser(HttpServletRequest request){
		 return (Object) request.getSession(true).getAttribute(SystemConstant.SESSION_USER);
	 }
	 
	/**
	 * 
	 * <br>
	 * <b>功能：</b>清除所有Session<br>
	 * <b>作者：</b>wys<br>
	 * <b>日期：</b> 2013-5-15 <br>
	 * 
	 * @param request
	 */
	public static void removeSessionAll(HttpSession session) {
		if (session != null) {
			java.util.Enumeration<?> e = session.getAttributeNames();
			while (e.hasMoreElements()) {
				String sessionName = (String) e.nextElement();
				session.removeAttribute(sessionName);
			}
		}
	}
		
	public static void main(String[] args) {
		// 生成一个Pattern,同时编译一个正则表达式 
		Pattern p = Pattern.compile("//,*"); 
		//用Pattern的split()方法把字符串按"/"分割 
		@SuppressWarnings("unused")
		String[] result = p.split( "/index.html,/resources/*/*" ); 
	} 
}
