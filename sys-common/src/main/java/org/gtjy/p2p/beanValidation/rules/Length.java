package org.gtjy.p2p.beanValidation.rules;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 
 * Size
 * 字符长度校验
 * 2015年9月10日 下午6:05:46
 * @author：wys
 * @version 1.0.0
 *
 */
@Target(value= {ElementType.METHOD,ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Length {
    /** 最小值 **/
    long min() default 0;
    /** 最大值 **/
    long max() default 0;
    /** 错误信息 **/
    String message() default "";
}