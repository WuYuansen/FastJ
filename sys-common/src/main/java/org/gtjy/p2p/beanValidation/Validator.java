package org.gtjy.p2p.beanValidation;

import java.lang.annotation.Annotation;

/**
 * 
 * Validator
 * 实体校验抽象接口接口
 * 2015年9月10日 下午6:34:04
 * @author：wys
 * @version 1.0.0
 *
 */
public abstract interface Validator<A extends Annotation> {
    /** 初始化 **/
    public abstract void initialize(A paramA);
    /** 校验 **/
    public abstract boolean isValid(Object paramObject);
}
