package org.gtjy.p2p.JSON;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.gtjy.p2p.constants.SystemConstant;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exp.AjaxException;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializeConfig;
import com.alibaba.fastjson.serializer.SerializerFeature;

/**
 * 
 * <p> Title: JSON工具类  </p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class JSONUtil {
	
	private static final SerializeConfig config;

	static
	{
		config = new SerializeConfig();
//		config.put(java.util.Date.class, new JSONLibDataFormatSerializer());
//		config.put(java.sql.Date.class, new JSONLibDataFormatSerializer()); 
//		config.put(java.util.Date.class, new JSONLibDataFormatSerializer());
	}
	
	private static  SerializerFeature[] features = {
			SerializerFeature.WriteDateUseDateFormat,
			SerializerFeature.WriteMapNullValue, 		// 输出空置字段
			SerializerFeature.WriteNullListAsEmpty,		// list字段如果为null，输出为[]，而不是null
			SerializerFeature.WriteNullNumberAsZero,	// 数值字段如果为null，输出为0，而不是null
			SerializerFeature.WriteNullBooleanAsFalse,	// Boolean字段如果为null，输出为false，而不是null
			SerializerFeature.WriteNullStringAsEmpty	//字符类型字段如果为null，输出为""，而不是null
	};
	
	/**
	 * 从一个JSON对象字符格式中得到一个java对象
	 * @param jsonString
	 * @param pojoClass
	 * @return
	 */
	public static <T> Object ConvertObjectByJsonString(String jsonString,Class<T> pojoClass){
		Object pojo;
//		JSONObject jsonObject = JSONObject.parseObject(jsonString);
		pojo = JSON.parseObject(jsonString, pojoClass); //JSON.toJavaObject(jsonObject, pojoClass); //JSONObject.toJavaObject(jsonObject, pojoClass); // JSONObject.toJSONString(jsonObject, config, features);
		return pojo;
	}
	
	public static <T> Object convertJSONToObj(String json,Class<T> clazz){
		Object obj ;
		obj = JSONObject.toJavaObject(JSON.parseObject(json), clazz);
		return obj;
	}

	/**
	 * 从一个JSON对象字符格式中得到一个java List对象
	 * @param jsonString
	 * @param pojoClass
	 * @return
	 */
	public static <T> Object ConvertListByJsonString(String jsonString,Class<T> pojoClass){
		List<T> pojo;
		pojo = JSON.parseArray(jsonString, pojoClass); //JSON.toJavaObject(jsonObject, pojoClass); //JSONObject.toJavaObject(jsonObject, pojoClass); // JSONObject.toJSONString(jsonObject, config, features);
		return pojo;
	}
	
	
	/**
	 * Object转换JSON
	 * @param obj
	 * @return
	 */
	public static Object ConvertJSONByObject(Object obj){
		return obj==null?"{}":JSONObject.toJSON(obj).toString(); //JSON.toJSONString(obj,config,features);
	}
	
	public static <T> Object convertJsonByObject(String jsonString,Class<T> clazz){
		if(jsonString.contains("[")){
			return ConvertListByJsonString(jsonString, clazz);
		}else{
			return  ConvertObjectByJsonString(jsonString,clazz);
		}
	}
	
	/**
	 * 将数组转换为JSON
	 * @param arrays
	 * @return
	 */
	public static Object ConvertJSONByArray(Arrays arrays){
		return JSONArray.toJSONString(arrays,config,features);
	}
	
	/**
	 * 输出JSON
	 * 
	 * @param res
	 * @param json
	 */
	public static void outWriteJSON(HttpServletResponse res, String json) {
		outWrite(res, json, "application/json");
	}
	
	/**
	 * 返回流写入信息，并可以指定内容类型
	 * 
	 * @param res 返回流
	 * @param msg 内容
	 * @param contentType 内容类型
	 */
	public static void outWrite(HttpServletResponse res, String msg, String contentType) {
		res.setCharacterEncoding(SystemConstant.SYSTEM_ENCODE_UTF8);
		res.setContentType(contentType);
		try {
			PrintWriter out = res.getWriter();
			out.write(msg);
			out.flush();
		} catch (IOException e) {
			throw new AjaxException(e);
		}
	}
}
