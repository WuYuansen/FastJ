package org.gtjy.p2p.web.session;

import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * 
 * <p> Title: 记录用户在线人数</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class OnlineAppMap {

    private static Map<String,Object> cache = null;
    
    static {
        if(cache == null)
            cache = new Hashtable<String,Object>();
    }
    
    public static final Map<String,Object> getAppMap() {
        return cache;
    }
    
    /**
     * 用户登陆 记录session
     * @param sessionId
     * @param session
     */
    public final static void put(String sessionId,HttpSession session) {
        cache.put(sessionId,session);
    }
    
    public final static void put(String sessionId,Object obj){
    	cache.put(sessionId,obj);
    }
    /**
     * 强制指定session下线
     * @param sessionId
     */
    public final static void ban(String sessionId) {
        HttpSession session = (HttpSession) cache.get(sessionId);
        if(session != null) {
            cache.remove( sessionId );
            session.removeAttribute(sessionId);
            session.invalidate();
        }
    }
    
    @SuppressWarnings("all")
    public final static boolean checkOnline(String user_id,HttpServletRequest request) {
        boolean online = false;
        Set<String> keySet = cache.keySet();
        Iterator<String> i = keySet.iterator();
        while(i.hasNext()) {
            String key = (String) i.next();
            HttpSession session = (HttpSession) cache.get(key);
//            User baseUser = SessionUtil.getCurrentUser(request);
//            if (baseUser!=null && baseUser.getUsid().equals(user_id)) {
//                online = true;
//                break;
//            }
        }
        return online;
    }
}
