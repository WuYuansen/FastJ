package org.gtjy.p2p.constants;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import org.gtjy.p2p.util.MapUtil;

/**
 * <p> Title: 此类存放用户的短信验证码内容</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class VerifyCodeMap {
	
	private static Map<String, Object> verifyCodeMap = null;
	
	static {
		if(verifyCodeMap == null){
			verifyCodeMap = MapUtil.newHashTable();
		}
	}
	
	public static Map<String, Object> getVerifyCodeMap() {
		return verifyCodeMap;
	}
	/**
	 * 向map对象中插入参数名以及参数值
	 * @param key
	 * @param obj
	 */
	public final static void put(String key,Object obj){
		verifyCodeMap.put(key,obj);
    }
    
    /**
     * 根据键值获取参数值
     * @param key
     * @return
     */
    public final static Object get(String key){
    	return verifyCodeMap.get(key);
    }
	
    /**
     * 强制清空所有参数
     * @return
     */
    public final static int banAll() {
        int count = 0;
        Set<String> keySet = verifyCodeMap.keySet();
        Iterator<String> i = keySet.iterator();
        while(i.hasNext()) {
            i.remove();
            count++;
        }
        return count;
    }
    
    /**
     * 单个删除
     * @param key
     * @return
     */
    public final static int banOne(String key){
    	 int count = 0;
		 verifyCodeMap.remove(key);
         return count;
    }
}
