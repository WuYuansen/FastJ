package org.gtjy.p2p.web.session;

import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 
 * <p> Title:监听session是否有效 </p>
 * <p> Description:防止用户直接点击浏览器关闭而不执行注销时间而引发的session失效问题 </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class SessionListeners implements HttpSessionBindingListener {
	
	private static Log logger = LogFactory.getLog(SessionListeners.class);
	
	String uid;  
	public String getUid() {  
	   return uid;  
	}  
	public void setUid(String uid) {  
	   this.uid = uid;  
	}  
	
	public SessionListeners() {
		
	}
	
	/** 
     * 对象实例(即OnlineUserListener的实例)作为一个属性被设置到session的 
     * 时候，会调用本方法，这种情况一般发生在点击登录按钮以后的处理过程中 设置 
     *  
     * @see javax.servlet.http.HttpSessionBindingListener#valueBound(javax.servlet.http.HttpSessionBindingEvent) 
     */  
	@Override
    public void valueBound(HttpSessionBindingEvent event) {  
        // 现在暂时不需要额外处理，你可以在这里记录日志等  
		logger.info("Add a user from the session ：" + uid);
    }  

    /** 
     * 当Session超时，或本实例被从session中移除的时候被调用，这种情况一般 发生在注销方法的处理过程中 
     *  
     * @see javax.servlet.http.HttpSessionBindingListener#valueUnbound(javax.servlet.http.HttpSessionBindingEvent) 
     */  
	@Override
	public void valueUnbound(HttpSessionBindingEvent event) {
		try {  
            HttpSession session = event.getSession();  
//            User u = (User) session.getAttribute(Constants.SessionUser);  
            logger.info("Remove the user from the session:"+session.getId());  
            Map<String,Object> map = (Map<String,Object>) OnlineAppMap.getAppMap();
			map.remove(session.getId());
			//必须在session销毁前清除UserInfo对象
//			session.removeAttribute(Constants.SessionUser);	
//			session.invalidate();
        } catch (RuntimeException e) {  
             e.printStackTrace();  
        }  
	}

}
