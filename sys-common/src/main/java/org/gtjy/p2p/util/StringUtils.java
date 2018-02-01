package org.gtjy.p2p.util;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * 
 * <p> Title: 字符串处理工具类</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class StringUtils {
	
	public static final String EMPTY = "";

	/**
	 * 检查字符串是否为空
	 * @param str 字符串
	 * @return
	 */
	public static boolean isEmpty(String str) {
		if (str == null) {
			return true;
		}else if("".equals(str)) {
		    return true;
		} else if (str.length() == 0) {
			return true;
		} else {
			return false;
		}
	}
	
	public static String trim(String str){
	    String outPut = str;
	    outPut = outPut.replaceAll("\\s*", "");
	    return outPut;
	}
	
	/**
	 * 检查字符串是否为空
	 * @param str 字符串
	 * @return
	 */
	public static boolean isNotEmpty(String str) {
		if (str == null) {
			return false;
		} else if (str.length() == 0) {
			return false;
		} else {
			return true;
		}
	}
	
	/**
	 * 替换
	 * @param text
	 * @param searchString
	 * @param replacement
	 * @return
	 */
	public static String replace(String text, String searchString,
			String replacement) {
		return replace(text, searchString, replacement, -1);
	}
	/**
	 * 文本替换
	 * @param text
	 * @param searchString
	 * @param replacement
	 * @param max
	 * @return
	 */
	public static String replace(String text, String searchString, String replacement, int max) {
        if (isEmpty(text) || isEmpty(searchString) || replacement == null || max == 0) {
            return text;
        }
        int start = 0;
        int end = text.indexOf(searchString, start);
        if (end == -1) {
            return text;
        }
        int replLength = searchString.length();
        int increase = replacement.length() - replLength;
        increase = (increase < 0 ? 0 : increase);
        increase *= (max < 0 ? 16 : (max > 64 ? 64 : max));
        StringBuffer buf = new StringBuffer(text.length() + increase);
        while (end != -1) {
            buf.append(text.substring(start, end)).append(replacement);
            start = end + replLength;
            if (--max == 0) {
                break;
            }
            end = text.indexOf(searchString, start);
        }
        buf.append(text.substring(start));
        return buf.toString();
    }
	
	public static boolean isNotBlank(String str) {
		return !StringUtils.isBlank(str);
	}

	public static boolean isBlank(String str) {
		int strLen;
		if (str == null || (strLen = str.length()) == 0) {
			return true;
		}
		for (int i = 0; i < strLen; i++) {
			if ((Character.isWhitespace(str.charAt(i)) == false)) {
				return false;
			}
		}
		return true;
	}


	 /**
	  * 把字符串按分隔符转换为数组
	  * @param str  字符串
	  * @param expr 分隔符
	  * @return
	  */
	 public static String[] stringToArray(String str, String expr){
		 return str.split(expr);
	 }
	 
	 /**
	  * 将数组按照给定的分隔转化成字符串
	  * @param arr
	  * @param expr
	  * @return
	  */
	 public static String arrayToString(String[] arr,String expr){
		 String strInfo = "";
		 if(arr != null && arr.length > 0){
			 StringBuffer sf = new StringBuffer();
			 for(String str : arr){
				 sf.append(str);
				 sf.append(expr);
			 }
			 strInfo = sf.substring(0, sf.length()-1);
		 }
		 return strInfo;
	 }
	 
	 
	 /**
	  * 将集合按照给定的分隔转化成字符串
	  * @param arr
	  * @param expr
	  * @return
	  */
	 public static String listToString(List<String> list,String expr){
		 String strInfo = "";
		 if(list != null && list.size() > 0){
			 StringBuffer sf = new StringBuffer();
			 for(String str : list){
				 sf.append(str);
				 sf.append(expr);
			 }
			 strInfo = sf.substring(0, sf.length()-1);
		 }
		 return strInfo;
	 }
	 

	 /**
	  * 将下划线风格替换为驼峰风格
	  * @param str
	  * @return
	  */
	public static String toCamelhump(String str) {
		Matcher matcher = Pattern.compile("_[a-z]").matcher(str);
		StringBuilder builder = new StringBuilder(str);
		for (int i = 0; matcher.find(); i++) {
			builder.replace(matcher.start() - i, matcher.end() - i, matcher
					.group().substring(1).toUpperCase());
		}
		if (Character.isUpperCase(builder.charAt(0))) {
			builder.replace(0, 1,
					String.valueOf(Character.toLowerCase(builder.charAt(0))));
		}
		return builder.toString();
	}
	
	 /**
	  * 将下划线风格替换为驼峰风格
	  * @param str
	  * @return
	  */
	public static String toClassName(String str) {
		Matcher matcher = Pattern.compile("_[a-z]").matcher(str);
		StringBuilder builder = new StringBuilder(str);
		for (int i = 0; matcher.find(); i++) {
			builder.replace(matcher.start() - i, matcher.end() - i, matcher
					.group().substring(1).toLowerCase());
		}
		if (Character.isUpperCase(builder.charAt(0))) {
			builder.replace(0, 1,
					String.valueOf(Character.toUpperCase(builder.charAt(0))));
		}
		return builder.toString();
	}
	
	// 分割固定格式的字符串
	public static String[] splitString(String str, String separator) {
		return org.apache.commons.lang.StringUtils.splitByWholeSeparator(str, separator);
	}

	// 将字符串首字母大写
	public static String firstToUpper(String str) {
		return Character.toUpperCase(str.charAt(0)) + str.substring(1);
	}
	
	// 将字符串首字母大写其余小写
	public static String firstToUpperAllLower(String str) {
		String sb =  str.toLowerCase();
		return Character.toUpperCase(sb.charAt(0)) + sb.substring(1);
	}

	// 将字符串首字母小写
	public static String firstToLower(String str) {
		return Character.toLowerCase(str.charAt(0)) + str.substring(1);
	}
	
	
	public static String lowerCase(String str) {
        if (str == null) {
            return null;
        }
        return str.toLowerCase();
    }
	
	 public static String substringAfterLast(String str, String separator) {
	        if (isEmpty(str)) {
	            return str;
	        }
	        if (isEmpty(separator)) {
	            return EMPTY;
	        }
	        int pos = str.lastIndexOf(separator);
	        if (pos == -1 || pos == (str.length() - separator.length())) {
	            return EMPTY;
	        }
	        return str.substring(pos + separator.length());
	    }
	
	public static String replaceEach(String text, String[] searchList,
			String[] replacementList) {
		return replaceEach(text, searchList, replacementList, false, 0);
	}
	
	private static String replaceEach(String text, String[] searchList,
			String[] replacementList, boolean repeat, int timeToLive) {

		if (text == null || text.length() == 0 || searchList == null
				|| searchList.length == 0 || replacementList == null
				|| replacementList.length == 0) {
			return text;
		}
		// if recursing, this shouldnt be less than 0
		if (timeToLive < 0) {
			throw new IllegalStateException("TimeToLive of " + timeToLive + " is less than 0: " + text);
		}

		int searchLength = searchList.length;
		int replacementLength = replacementList.length;

		// make sure lengths are ok, these need to be equal
		if (searchLength != replacementLength) {
			throw new IllegalArgumentException("Search and Replace array lengths don't match: " + searchLength + " vs " + replacementLength);
		}

		// keep track of which still have matches
		boolean[] noMoreMatchesForReplIndex = new boolean[searchLength];

		// index on index that the match was found
		int textIndex = -1;
		int replaceIndex = -1;
		int tempIndex = -1;

		// index of replace array that will replace the search string found
		// NOTE: logic duplicated below START
		for (int i = 0; i < searchLength; i++) {
			if (noMoreMatchesForReplIndex[i] || searchList[i] == null
					|| searchList[i].length() == 0
					|| replacementList[i] == null) {
				continue;
			}
			tempIndex = text.indexOf(searchList[i]);

			// see if we need to keep searching for this
			if (tempIndex == -1) {
				noMoreMatchesForReplIndex[i] = true;
			} else {
				if (textIndex == -1 || tempIndex < textIndex) {
					textIndex = tempIndex;
					replaceIndex = i;
				}
			}
		}
		// NOTE: logic mostly below END

		// no search strings found, we are done
		if (textIndex == -1) {
			return text;
		}

		int start = 0;

		// get a good guess on the size of the result buffer so it doesnt have
		// to double if it goes over a bit
		int increase = 0;

		// count the replacement text elements that are larger than their
		// corresponding text being replaced
		for (int i = 0; i < searchList.length; i++) {
			int greater = replacementList[i].length() - searchList[i].length();
			if (greater > 0) {
				increase += 3 * greater; // assume 3 matches
			}
		}
		// have upper-bound at 20% increase, then let Java take over
		increase = Math.min(increase, text.length() / 5);

		StringBuffer buf = new StringBuffer(text.length() + increase);

		while (textIndex != -1) {

			for (int i = start; i < textIndex; i++) {
				buf.append(text.charAt(i));
			}
			buf.append(replacementList[replaceIndex]);

			start = textIndex + searchList[replaceIndex].length();

			textIndex = -1;
			replaceIndex = -1;
			tempIndex = -1;
			// find the next earliest match
			// NOTE: logic mostly duplicated above START
			for (int i = 0; i < searchLength; i++) {
				if (noMoreMatchesForReplIndex[i] || searchList[i] == null
						|| searchList[i].length() == 0
						|| replacementList[i] == null) {
					continue;
				}
				tempIndex = text.indexOf(searchList[i], start);

				// see if we need to keep searching for this
				if (tempIndex == -1) {
					noMoreMatchesForReplIndex[i] = true;
				} else {
					if (textIndex == -1 || tempIndex < textIndex) {
						textIndex = tempIndex;
						replaceIndex = i;
					}
				}
			}
			// NOTE: logic duplicated above END

		}
		int textLength = text.length();
		for (int i = start; i < textLength; i++) {
			buf.append(text.charAt(i));
		}
		String result = buf.toString();
		if (!repeat) {
			return result;
		}

		return replaceEach(result, searchList, replacementList, repeat,
				timeToLive - 1);
	}
	
	/**
	 * 检查是否为有效地数值
	 * @param theNumber
	 * @return
	 */
	public static boolean isNumeric(String theNumber) {
		Pattern pattern = Pattern.compile("[0-9]*");
		Matcher isNum = pattern.matcher(theNumber);
		if (!isNum.matches()) {
			return false;
		}
		return true;
	}
	
	/**
	 * @方法名: isDate
	 * @方法说明: 倨傲眼是否是时间格式
	 * @param value
	 * @return: boolean
	 */
	public static boolean isDate(String value){
		String eL= "^((\\d{2}(([02468][048])|([13579][26]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\\s(((0?[0-9])|([1-2][0-9]))\\:([0-5]?[0-9])((\\s)|(\\:([0-5]?[0-9])))))?$";  
        Pattern p = Pattern.compile(eL);   
        Matcher m = p.matcher(value);   
        return m.matches();
	}
	
	
	/**
	 * 过滤特殊字符
	 * @param str
	 * @return
	 */
	public static boolean StringFilter(String str){
		String regEx = "[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";
		Pattern p = Pattern.compile(regEx);
		Matcher m = p.matcher(str);
		return m.find();
	}
	
	/**
	 * 替换字符串
	 * @param temp
	 * @return
	 */
	public static String replaceChar(String temp){
		if(temp.length() > 6){
			for(int i = 2;i < 6;i++){
				char c = temp.charAt(i);
				temp = temp.replace(c, '*');
			}
		}else if(temp.length()<6){
			for(int i = 1;i < temp.length();i++){
				char c = temp.charAt(i);
				temp = temp.replace(c, '*');
			}
		}
		return temp;
	}
	
	/**
	 * 判断是否是手机号
	 * @param mobiles
	 * @return
	 */
	public static boolean isPhone(String mobiles){
		Pattern p = Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$");  
		Matcher m = p.matcher(mobiles);  
		return m.matches();
	}
	
	public static boolean isEmail(String email) {
	    Pattern  p = Pattern.compile("[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?");
	    Matcher m = p.matcher(email);
	    return m.matches();
	}
	
	public static boolean contains(String str,String substr) {
	    return str.contains(substr);
	}
	
	public static String replaceByStar(String input) {
        StringBuffer sb = new StringBuffer();
        if(isEmail(input)) {
            String[] per = input.split("@");
            if(per[0].length() > 6) {
                sb.append(replaceChar(per[0]));
                sb.append("@"+per[1]);
            }else {
                sb.append(input);    
            }
        }
        if(isPhone(input)) {
            sb.append(input.substring(0, 3));
            sb.append("*****");
            sb.append(input.substring(8, 11));
        }
        return sb.toString();
    }
	
	/**
	 * 去除数组中重复的记录
	 * @param a
	 * @return
	 */
	public static String[] array_unique(String[] a) {
	    // array_unique
	    List<String> list = new LinkedList<String>();
	    for(int i = 0; i < a.length; i++) {
	        if(!list.contains(a[i])) {
	        	if(!StringUtils.isEmpty(a[i])){
	        		list.add(a[i]);
	        	}
	        }
	    }
	    return (String[])list.toArray(new String[list.size()]);
	}
	
	/**
	 * 将List转换成String
	 * @param stringList
	 * @return
	 */
	public static String ListToString(List<String> stringList){
	    if (stringList==null) {
            return null;
        }
        StringBuilder result=new StringBuilder();
        boolean flag=false;
        for (String string : stringList) {
            if (flag) {
                result.append(",");
            }else {
                flag=true;
            }
            result.append(string);
        }
        return result.toString();
	}
	
	/**
	 * 判断连接是否被开放
	 * @param listStr
	 * @param url
	 * @return
	 */
	public static Boolean authInterceptor(List<String> listStr,String url){
	    if(StringUtils.ListToString(listStr).matches(url)){
	        return true;
	    }else{
	        return StringUtils.ListToString(listStr).contains(url);
	    }
	}
	
	/**
	 * 正则校验
	 * @param excePt
	 * @param url
	 * @return
	 */
	public static Boolean authInterceptorByRegex(List<String> excePt,String url){
        Pattern p = Pattern.compile("/[A-Za-z0-9_]+/");
        Pattern excepUrlPattern = null;
        for(String regex : excePt){
            Matcher m = p.matcher(trim(regex));
            while(m.find()) {
                if(url.contains(m.group(0))){
                    excepUrlPattern = Pattern.compile(trim(regex));
                }
            }
        }
        if(excepUrlPattern == null){
            return false;
        }else{
            Matcher mat = excepUrlPattern.matcher(trim(url));
            return mat.find();
        }
    }
	
	public static List<String> StringToList(String Str,String regex){
	    List<String> list = new ArrayList<String>();
	    String[] str_s = Str.split(regex);
	    for(String str : str_s) {
	        list.add(trim(str));
	    }
	    return list;
	}
	
	/**
	 * 
	 * _Random(随机生成字符串 字符+数字)
	 * (这里描述这个方法适用条件 – 可选)
	 * @param length  需要生成的字符长度
	 * @return void
	 * @exception 
	 * @version  1.0.0
	 */
	public static String _Random(int length) {
	    final String number = "1234567890";
	    final String letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuffer buffer = new StringBuffer();   
        buffer.append(number);
        buffer.append(letter);
        StringBuffer sb = new StringBuffer();   
        Random random = new Random();   
        int range = buffer.length();   
        for (int i = 0; i < length; i ++) {   
            sb.append(buffer.charAt(random.nextInt(range)));   
        }   
        return sb.toString();
	}
	
	private static final String cronExpFormat = "ss mm HH dd MM ? yyyy";  //指定时间执行
    
    /**
     * 
     * formatDateByPattern(转换CRON表达式)
     * (这里描述这个方法适用条件 – 可选)
     * @param date
     * @return 
     * @return String
     * @exception 
     * @version  1.0.0
     */
    public static String formatDateByPattern(Date date){  
        SimpleDateFormat sdf = new SimpleDateFormat(cronExpFormat);
        String formatTimeStr = null;  
        if (date != null) {  
            formatTimeStr = sdf.format(date);  
        }  
        return formatTimeStr;  
    }
    
    /**
     * 缩略字符串（不区分中英文字符）
     * @param str 目标字符串
     * @param length 截取长度
     * @return
     */
    public static String abbr(String str, int length) {
        if (str == null) {
            return "";
        }
        try {
            StringBuilder sb = new StringBuilder();
            int currentLength = 0;
            for (char c : str.toCharArray()) {//replaceHtml(StringEscapeUtils.unescapeHtml4(str)).toCharArray()
                currentLength += String.valueOf(c).getBytes("UTF-8").length;
                if (currentLength <= length - 3) {
                    sb.append(c);
                } else {
                    sb.append("...");
                    break;
                }
            }
            return sb.toString();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return "";
    }
    
	public static String getYYYYMMDDDate(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date nowDate = new Date(System.currentTimeMillis());
		return sdf.format(nowDate);
		
	}
	
	public static boolean isNotNULL(String str) {
		return str != null;
	}

	public static boolean isNULL(String str) {
		return str == null;
	}
	
	public static String trimToNull(String str) {
		String ts = trim(str);
		return isEmpty(ts) ? null : ts;
	}

	public static String trimToEmpty(String str) {
		return str == null ? "" : str.trim();
	}

	public static byte[] getBytes(String content, String charset) {
		if (isNULL(content)) {
			content = "";
		}
		if (isBlank(charset))
			throw new IllegalArgumentException("charset can not null");
		try {
			return content.getBytes(charset);
		} catch (UnsupportedEncodingException e) {
		}
		throw new RuntimeException("charset is not valid,charset is:" + charset);
	}

	public static byte[] getBytes(String content) {
		if (isNULL(content)) {
			content = "";
		}
		return content.getBytes();
	}

	public static String getString(byte[] binaryData, String charset) {
		try {
			return new String(binaryData, charset);
		} catch (UnsupportedEncodingException e) {
		}
		throw new RuntimeException("charset is not valid,charset is:" + charset);
	}
    
    
    public static void main(String[] args) {
        /*System.out.println(StringUtils.StringFilter("吴元森"));
        String s  = "ab,cd,ab,cd,cs";
        String[] a = array_unique(s.split(","));
        System.out.println(StringUtils.arrayToString(a, ","));*/
//        String s = "http:\\xxx.x.xom\\sd\\sd\\a\\d\\p.png";
//        System.out.println(StringUtils.replace(s, "\\", "/"));
        
        String s = "2014-01-01 12:24:15";
        System.out.println(isDate(s));
    }
}
