package org.gtjy.p2p.util;

import java.util.HashMap;
import java.util.Hashtable;

import org.apache.commons.collections.MapUtils;

/**
 * 
 * <p> Title: 自定义Map工具操作类 </p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class MapUtil extends MapUtils {
	
	/**
	 * 实例化一个Map对象
	 * @return
	 */
	public static <K, V> HashMap<K, V> newHashMap() {
		return new HashMap<K, V>();
	}
	
	/**
	 * 实例化一个Map对象
	 * @return
	 */
	public static <K,V> Hashtable<K,V> newHashTable(){
		return new Hashtable<K, V>();
	}
}
