package org.gtjy.p2p.beanValidation.rules;

import java.io.Serializable;
import java.util.regex.Matcher;

import org.gtjy.p2p.beanValidation.Validator;

public class PatternValidator implements Validator<Pattern>, Serializable {

    private static final long serialVersionUID = 1L;
    
    private java.util.regex.Pattern pattern;
    
    @Override
    public void initialize(Pattern paramA) {
        this.pattern = java.util.regex.Pattern.compile(paramA.regexp());
    }

    @Override
    public boolean isValid(Object value) {
        if (value == null) return true;
        if (!(value instanceof String)) return false;
        String string = (String)value;
        Matcher m = this.pattern.matcher(string);
        return m.matches();
    }

}
