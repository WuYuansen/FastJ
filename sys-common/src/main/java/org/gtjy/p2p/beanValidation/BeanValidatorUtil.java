package org.gtjy.p2p.beanValidation;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Map;

import org.gtjy.p2p.beanValidation.rules.Length;
import org.gtjy.p2p.beanValidation.rules.NotNull;
import org.gtjy.p2p.beanValidation.rules.Pattern;
import org.gtjy.p2p.util.MapUtil;

/**
 * 
 * BeanValidatorUtil
 * 实体类校验框架入口
 * 2015年9月14日 上午11:52:35
 * @author：wys
 * @version 1.0.0
 *
 */
public class BeanValidatorUtil {
    /**
     * validateEntity(校验实体Bean是否合法)
     * @param entity    指定要校验的实体对象
     * @return 错误信息 如果Map对象不为空的情况下则表示当前实体类没有校验通过,如果为空则表示校验通过
     * @throws NoSuchFieldException 
     * @throws SecurityException 
     * @exception    
     * @version  1.0.0
     */
    @SuppressWarnings("all")
    public static Map<String,Object> validateEntity(Object entity){
    	System.out.println("1-1");
        Map<String,Object> errorMap = MapUtil.newHashMap();
        if(entity == null) {
            throw new IllegalArgumentException("对实体的参数不能为空");
        }
        Field[] fields = entity.getClass().getDeclaredFields();  
        Field.setAccessible(fields, true);
        Validator validator = null;
        String errormsg = null;
        for(Field field : fields) {
            if(field.isAnnotationPresent(NotNull.class)) {
                NotNull notNull = field.getAnnotation(NotNull.class);
                if(notNull != null) {
                    errormsg = notNull.message();
                    validator = BeanValidatorFactory.getValidator("NotNull");
                    //开始校验
                    if(validator != null) {
                       Boolean result = validator.isValid(getValue(entity, field));
                       if(result) {
                           errorMap.put(field.getName(),errormsg);
                       }
                    }
                }
            }
            if(field.isAnnotationPresent(Length.class)) {
                Length size = field.getAnnotation(Length.class);
                if(size != null) {
                    errormsg = size.message();
                    validator = BeanValidatorFactory.getValidator("Length");
                    //开始校验
                    if(validator != null) {
                       Boolean result = validator.isValid(getValue(entity, field));
                       if(result) {
                           errorMap.put(field.getName(),errormsg);
                       }
                    }
                }
            }
            if(field.isAnnotationPresent(Pattern.class)) {
                Pattern pattern = field.getAnnotation(Pattern.class);
                if(pattern != null) {
                    errormsg = pattern.message();
                    validator = BeanValidatorFactory.getValidator("Pattern");
                    //开始校验
                    if(validator != null) {
                       Boolean result = validator.isValid(getValue(entity, field));
                       if(result) {
                           errorMap.put(field.getName(),errormsg);
                       }
                    }
                }
            }
        }
        return errorMap;
    }
    
    /**
     * getMethodForField(获取Bean的get方法)
     * @param entity
     * @param fieldname
     * @return Method
     * @exception 
     * @version  1.0.0
     */
    private static Method getMethodForField(Object entity,String fieldname) {
        StringBuffer sb = new StringBuffer();       
        sb.append("get");       
        sb.append(fieldname.substring(0, 1).toUpperCase());       
        sb.append(fieldname.substring(1));  
        try {
            return entity.getClass().getMethod(sb.toString());
        } catch (SecurityException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    /**
     * getValue(获取属性值)
     * @param entity
     * @param field
     * @return 
     * @return Object
     * @exception 
     * @version  1.0.0
     */
    private static Object getValue(Object entity,Field field) {
        Object valueObj = null;
        Method method = getMethodForField(entity, field.getName());
        try {
            valueObj = method.invoke(entity, new Object[0]);
        } catch (Exception e) {
            e.printStackTrace();
        } 
        return valueObj;
    }
}
