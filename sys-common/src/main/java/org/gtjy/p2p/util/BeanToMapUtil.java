package org.gtjy.p2p.util;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;
import java.lang.reflect.Method;
import java.math.BigDecimal;

import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.ControllerException;

import com.gtjy.p2p.modules.sys.dto.Right;

/**
 * 
 * 
 * BeanToMapUtil java bean 转换工具类
 * 
 * 2015年6月1日 下午4:36:57
 * @author：wys
 * @version 1.0.0
 *
 */
public class BeanToMapUtil {

	private static MapToBeanJavaType.Type propertyType = null;

	
	public static void main(String[] args) {
		Right right = new Right();
		BeanToMapUtil.convertBean(right);
	}
	
	/**
	 * 将一个 JavaBean 对象转化为一个 Map
	 * 
	 * @param bean
	 *            要转化的JavaBean 对象
	 * @return 转化出来的 Map 对象
	 * @throws IntrospectionException
	 *             如果分析类属性失败
	 * @throws IllegalAccessException
	 *             如果实例化 JavaBean 失败
	 * @throws InvocationTargetException
	 *             如果调用属性的 setter 方法失败
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map<String, Object> convertBean(Object bean){
		try {
            Class type = bean.getClass();
            Map returnMap = MapUtil.newHashMap();
            BeanInfo beanInfo = Introspector.getBeanInfo(type);
            PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
            for (int i = 0; i < propertyDescriptors.length; i++) {
            	PropertyDescriptor descriptor = propertyDescriptors[i];
            	String propertyName = descriptor.getName();
            	if (!propertyName.equals("class")) {
            		propertyType = MapToBeanJavaType.Type.valueOf(descriptor.getPropertyType().getSimpleName().toUpperCase());
            		Method readMethod = descriptor.getReadMethod();
            		if(readMethod==null)
            			continue;
            		Object result = readMethod.invoke(bean, new Object[0]);
            		if (result != null) {
            			switch (propertyType) {
            			case STRING:
            				returnMap.put(propertyName, result);
            				break;
            			case INTEGER:
            				returnMap.put(propertyName, result);
            				break;
            			case TIMESTAMP:
            				returnMap.put(propertyName, result);
            				break;
            			case DATE:
            				returnMap.put(propertyName, result);
            				break;
            			case LONG:
            				returnMap.put(propertyName, result);
            				break;
            			case BIGDECIMAL:
            				returnMap.put(propertyDescriptors, result);
            			case DOUBLE:
            				returnMap.put(propertyName, result);
            			default:
            				returnMap.put(propertyName, result);
            				break;
            			}
            		} else {
            			switch (propertyType) {
            			case STRING:
            				returnMap.put(propertyName, "");
            				break;
            			case INTEGER:
            				returnMap.put(propertyName, null);
            				break;
            			case TIMESTAMP:
            				returnMap.put(propertyName, null);
            				break;
            			case DATE:
            				returnMap.put(propertyName, null);
            				break;
            			case LONG:
            				returnMap.put(propertyName, null);
            				break;
            			default:
            				returnMap.put(propertyName, null);
            				break;
            			}
            		}
            	}
            }
            return returnMap;
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            throw new ControllerException(e.getMessage());
        } catch (IntrospectionException e) {
            throw new ControllerException(e.getMessage());
        } catch (IllegalAccessException e) {
            throw new ControllerException(e.getMessage());
        } catch (InvocationTargetException e) {
            throw new ControllerException(e.getMessage());
        }
	}

	/**
	 * 将一个 Map 对象转化为一个 JavaBean
	 * 
	 * @param type
	 *            要转化的类型
	 * @param map
	 *            包含属性值的 map
	 * @return 转化出来的 JavaBean 对象
	 * @throws IntrospectionException
	 *             如果分析类属性失败
	 * @throws IllegalAccessException
	 *             如果实例化 JavaBean 失败
	 * @throws InstantiationException
	 *             如果实例化 JavaBean 失败
	 * @throws InvocationTargetException
	 *             如果调用属性的 setter 方法失败
	 */
	public static Object convertMap(Class<?> type, Map<String, Object> map){
		try {
            BeanInfo beanInfo = Introspector.getBeanInfo(type); // 获取类属性
            Object obj = type.newInstance(); // 创建 JavaBean 对象
            // 给 JavaBean 对象的属性赋值
            PropertyDescriptor[] propertyDescriptors = beanInfo
            		.getPropertyDescriptors();
            for (int i = 0; i < propertyDescriptors.length; i++) {
            	PropertyDescriptor descriptor = propertyDescriptors[i];
            	String propertyName = descriptor.getName();
            	if (map.containsKey(propertyName)) {
            		propertyType = MapToBeanJavaType.Type.valueOf(descriptor.getPropertyType().getSimpleName().toUpperCase());
            		// 下面一句可以 try 起来，这样当一个属性赋值失败的时候就不会影响其他属性赋值。
            		switch (propertyType) {
            		case STRING:
            			Object value = map.get(propertyName);
            			Object[] args = new Object[1];
            			args[0] = value;
            			descriptor.getWriteMethod().invoke(obj, args);
            			break;
            		case INTEGER:
            			Object value_integer = map.get(propertyName);
            			Object[] args_integer = new Object[1];
            			args_integer[0] = Integer.valueOf(value_integer.toString());
            			descriptor.getWriteMethod().invoke(obj, args_integer);
            			break;
            		case TIMESTAMP:
            			Object value_date = map.get(propertyName);
            			Object[] args_date = new Object[1];
            			args_date[0] = value_date == null ? null
            					: new Timestamp(
            							(Long) (StringUtils.isEmpty(value_date
            									.toString()) ? value_date
            									.toString() : System
            									.currentTimeMillis()));
            			;
            			descriptor.getWriteMethod().invoke(obj, args_date);
            			break;
            		case DATE:
            			Object value_date2 = map.get(propertyName);
            			Object[] args_date2 = new Object[1];
            			args_date2[0] = value_date2 == null ? null
            					: new Date((Long) (StringUtils.isEmpty(value_date2.toString()) ? value_date2.toString() : System.currentTimeMillis()));
            			;
            			descriptor.getWriteMethod().invoke(obj, args_date2);
            			break;
            		case LONG:
            			Object value_long = map.get(propertyName);
            			Object[] args_long = new Object[1];
            			args_long[0] = value_long == null ? null : Long
            					.valueOf(value_long.toString());
            			descriptor.getWriteMethod().invoke(obj, args_long);
            			break;
            		case BIGDECIMAL:
            			Object value_bigDec = map.get(propertyName);
            			Object[] args_bigDec = new Object[1];
            			args_bigDec[0] = value_bigDec == null ? null : BigDecimal
            					.valueOf(Double.valueOf(value_bigDec.toString()));
            			descriptor.getWriteMethod().invoke(obj, args_bigDec);
            			break;
            		case DOUBLE:
            			Object value_double = map.get(propertyName);
            			Object[] args_double = new Object[1];
            			args_double[0] = value_double == null ? null : Double
            					.valueOf(value_double.toString());
            			descriptor.getWriteMethod().invoke(obj, args_double);
            			break;
            		default:
            			Object value_default = map.get(propertyName);
            			Object[] args_default = new Object[1];
            			args_default[0] = value_default;
            			descriptor.getWriteMethod().invoke(obj, args_default);
            			break;
            		}
            	}
            }
            return obj;
        } catch (NumberFormatException e) {
            throw new ControllerException(e.getMessage());
        } catch (IllegalArgumentException e) {
            throw new ControllerException(e.getMessage());
        } catch (IntrospectionException e) {
            throw new ControllerException(e.getMessage());
        } catch (InstantiationException e) {
            throw new ControllerException(e.getMessage());
        } catch (IllegalAccessException e) {
            throw new ControllerException(e.getMessage());
        } catch (InvocationTargetException e) {
            throw new ControllerException(e.getMessage());
        }
	}
}
