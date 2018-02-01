package org.gtjy.p2p.beanValidation;

import org.gtjy.p2p.beanValidation.rules.LengthValidator;
import org.gtjy.p2p.beanValidation.rules.NotNullValidator;
import org.gtjy.p2p.beanValidation.rules.PatternValidator;

/**
 * 
 * BeanValidatorFactory
 * 实体校验工厂
 * 2015年9月14日 下午12:39:52
 * @author：wys
 * @version 1.0.0
 *
 */
public class BeanValidatorFactory {
    /**
     * getValidator(获取校验器)
     * @param type  校验类型
     * @return Validator    返回校验器
     * @exception 
     * @version  1.0.0
     */
    @SuppressWarnings("rawtypes")
    public static Validator getValidator(String type) {
        Validator validator = null;
        if(ValidatorConstant.LENGTH.equalsIgnoreCase(type)) {
            return new LengthValidator();   //长度校验
        }
        if(ValidatorConstant.NOTNULL.equalsIgnoreCase(type)) {
            return new NotNullValidator();  //非空校验
        }
        if(ValidatorConstant.PATTERN.equalsIgnoreCase(type)) {
            return new PatternValidator();  //正则校验
        }
        return validator;
    }
}
