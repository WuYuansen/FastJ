package com.gtjy.p2p.modules.tags;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.gtjy.p2p.constants.SystemConstant;
import org.gtjy.p2p.spring.SpringContextUtil;
import org.gtjy.p2p.util.CacheUtil;
import org.gtjy.p2p.util.MapUtil;

import com.gtjy.p2p.modules.sys.dto.Dict;
import com.gtjy.p2p.modules.tiles.sys.IDict;
import com.gtjy.p2p.modules.tiles.sys.impl.IDictImpl;

/**
 * @类名称: MyTags
 * @说明: 公共存钱数据方法 - 适用于自定义标签中
 * @作者: Loser森 javaer0415@gmail.com
 * @创建时间: 2017年3月9日 下午7:14:28
 */
public class MyTags {

	//获取Bean的实例
	private static IDict zdServices = null;
	
	/**
	 * @方法名: findDictByType
	 * @方法说明: 根据字典类型获取字典数据
	 * @param type
	 * @return: List<Dict>
	 */
	@SuppressWarnings("all")
	public static List<Dict> findDictByType(String type) {
		if(zdServices == null) {
			zdServices = SpringContextUtil.getBean(IDictImpl.class);
		}
		Map<String, List<Dict>> dictCacheMap = (Map<String, List<Dict>>) CacheUtil.get(SystemConstant.CACHE_DICT_MAP);
		if (dictCacheMap == null) {
			Map<String, Object> map = MapUtil.newHashMap();
//			map.put("type", type);
			map.put("state", 1);
			dictCacheMap = MapUtil.newHashMap();
			for (Dict dto : zdServices.selectAll(map)) {
				List<Dict> dtoList = dictCacheMap.get(dto.getType());
				if (dtoList != null) {
					dtoList.add(dto);
				} else {
					List<Dict> list = new ArrayList<Dict>();
					list.add(dto);
					dictCacheMap.put(dto.getType(), list);
				}
			}
			CacheUtil.put(SystemConstant.CACHE_DICT_MAP, dictCacheMap);
		}
		List<Dict> dtoList = dictCacheMap.get(type);
		if (dtoList == null) {
			dtoList = new ArrayList<Dict>();
		}
		return dtoList;// zd.selectAll(map);
	}
	
	/**
	 * @方法名: findDictByTypeAndCode
	 * @方法说明: 根据字典类型键编码获取字典数据
	 * @param type
	 * @param code
	 * @return: List<Dict>
	 */
	public static List<Dict> findDictByTypeAndCode(String type,String code){
		if(zdServices == null) {
			zdServices = SpringContextUtil.getBean(IDictImpl.class);
		}
		Map<String, Object> map = MapUtil.newHashMap();
		map.put("type", type);
		map.put("keycode",code);
		map.put("state", 1);
		return zdServices.selectAll(map);
	}
}