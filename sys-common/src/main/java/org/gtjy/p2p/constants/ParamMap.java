package org.gtjy.p2p.constants;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;


import org.gtjy.p2p.util.MapUtil;

/**
 * 
 * <p> Title:  参数MAP 用于存储系统url参数</p>
 * <p> Description: 改变之前的request.getParameter方式获取 </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class ParamMap {
	private static Map<String, Object> parameterMap = null;
	
	static {
		if(parameterMap == null){
			parameterMap = MapUtil.newHashTable();
		}
	}
	
	public static final Map<String, Object> getParameterMap(){
		return parameterMap;
	}

	/**
	 * 向map对象中插入参数名以及参数值
	 * @param key
	 * @param obj
	 */
	public final static void put(String key,Object obj){
    	parameterMap.put(key,obj);
    }
    
    /**
     * 根据键值获取参数值
     * @param key
     * @return
     */
    public final static Object get(String key){
    	return parameterMap.get(key);
    }
	
    /**
     * 强制清空所有参数
     * @return
     */
    public final static int banAll() {
        int count = 0;
        Set<String> keySet = parameterMap.keySet();
        Iterator<String> i = keySet.iterator();
        while(i.hasNext()) {
            i.remove();
            count++;
        }
        return count;
    }
    
}
