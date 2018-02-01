package org.gtjy.p2p.plugin.myBatisUtil;

import java.sql.Date;


public class SqLBuild {
	
	public static void main(String[] args) {
		String sql = "select * from xxx where 1 =1 a=? and b = ?";
		sql = replaceParameter(sql,1);
		System.out.println(replaceParameter(sql,"222"));
	}
	
	 /**
     * 根据类型替换参数
     * 仅作为数字和字符串两种类型进行处理，需要特殊处理的可以继续完善这里
     *
     * @param sql
     * @param value
     * @param jdbcType
     * @param javaType
     * @return
     */
    private static String replaceParameter(String sql, Object param) {
    	Object strValue = null;
		if (param instanceof Integer) {
			int value = ((Integer) param).intValue();
			strValue = value;
		} else if (param instanceof String) {
			String s = (String) param;
			strValue = s;
		} else if (param instanceof Double) {
			double d = ((Double) param).doubleValue();
			strValue = d;
		} else if (param instanceof Float) {
			float f = ((Float) param).floatValue();
			strValue = f;
		} else if (param instanceof Long) {
			long l = ((Long) param).longValue();
			strValue = l;
		} else if (param instanceof Boolean) {
			boolean b = ((Boolean) param).booleanValue();
			strValue = b;
		} else if (param instanceof Date) {
			Date d = (Date) param;
			strValue = d;
		}
        return null;// sql.replaceFirst("\\?", strValue);
    }
}