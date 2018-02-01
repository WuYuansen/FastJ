package org.gtjy.p2p.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.commons.lang.time.DateUtils;

/**
 * <p> Title: 日期工具类，继承org.apache.commons.lang.time.DateUtils类</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class DateUtil extends DateUtils {
	
	private static String[] parsePatterns = {
		"yyyy-MM-dd","yyyy-MM-dd HH:mm:ss","yyyy-MM-dd HH:mm",
		"yyyy/MM/dd","yyyy/MM/dd HH:mm:ss", "yyyy/MM/dd HH:mm"
	};
	
	/**
	 * 得到当前日期字符串
	 * @param pattern 格式化格式(yyyy-MM-dd,yyyy-MM-dd HH:mm 等)
	 * @return
	 */
	public static String getDate(String pattern){
		return DateFormatUtils.format(new Date(), pattern);
	}
	
	/**
	 * 得到当前日期字符串
	 * @return
	 */
	public static String getNowDate(){
		return getDate("yyyy-MM-dd");
	}
	
	/**
	 * 得到日期字符串 默认格式（yyyy-MM-dd） pattern
	 * @param date
	 * @param pattern 可以为："yyyy-MM-dd" "HH:mm:ss" "E"
	 * @return
	 */
	public static String formatDate(Date date,Object... pattern){
		String formatDate = null;
		if(pattern != null && pattern.length > 0){
			formatDate = DateFormatUtils.format(date, pattern[0].toString());
		}else{
			formatDate = DateFormatUtils.format(date, "yyyy-MM-dd");
		}
		return formatDate;
	}
	
	/**
	 * 得到当前时间字符串 格式（HH:mm:ss）
	 */
	public static String getTime() {
		return formatDate(new Date(), "HH:mm:ss");
	}

	/**
	 * 得到当前日期和时间字符串 格式（yyyy-MM-dd HH:mm:ss）
	 */
	public static String getDateTime() {
		return formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");
	}

	/**
	 * 得到当前年份字符串 格式（yyyy）
	 */
	public static String getYear() {
		return formatDate(new Date(), "yyyy");
	}

	/**
	 * 得到当前月份字符串 格式（MM）
	 */
	public static String getMonth() {
		return formatDate(new Date(), "MM");
	}

	/**
	 * 得到当天字符串 格式（dd）
	 */
	public static String getDay() {
		return formatDate(new Date(), "dd");
	}

	/**
	 * 得到当前星期字符串 格式（E）星期几
	 */
	public static String getWeek() {
		return formatDate(new Date(), "E");
	}

	/**
	 * 日期型字符串转化为日期 格式 { "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm",
	 * "yyyy/MM/dd", "yyyy/MM/dd HH:mm:ss", "yyyy/MM/dd HH:mm" }
	 */
	public static Date parseDate(Object str) {
		if (str == null) {
			return null;
		}
		try {
			return parseDate(str.toString(), parsePatterns);
		} catch (ParseException e) {
			return null;
		}
	}

	/**
	 * 获取过去的天数
	 * 
	 * @param date
	 * @return
	 */
	public static long pastDays(Date date) {
		long t = new Date().getTime() - date.getTime();
		return t / (24 * 60 * 60 * 1000);
	}
	
	
	
	/**
     * 转换为时间（天,时:分:秒.毫秒）
     * @param timeMillis
     * @return
     */
    public static String formatDateTime(long timeMillis){
        long day = timeMillis/(24*60*60*1000);
        long hour = (timeMillis/(60*60*1000)-day*24);
        long min = ((timeMillis/(60*1000))-day*24*60-hour*60);
        long s = (timeMillis/1000-day*24*60*60-hour*60*60-min*60);
        long sss = (timeMillis-day*24*60*60*1000-hour*60*60*1000-min*60*1000-s*1000);
        return (day>0?day+",":"")+hour+":"+min+":"+s+"."+sss;
    }

    /**
     * Silence 2016-2-25
     * 当前日期前一个月的日期
     * @param timeMillis
     * @return
     * 
     */
    public static String getPre30Day(){
    	//开始日期为空,取前一个月日期 
		Date date = new Date();//当前日期
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");//格式化对象
		Calendar calendar = Calendar.getInstance();//日历对象
		calendar.setTime(date);//设置当前日期
		calendar.add(Calendar.MONTH, -1);//月份减一
		String bDate = sdf.format(calendar.getTime());//输出格式化的日期
		return bDate;
    }
    
    /**
     * Silence 2016-2-25
     * 某日期的第二天
     * @param timeMillis
     * @return
     * 
     */
    public static String getNextOneDay(String sDate){
    	 Date date = DateUtil.parseDate(sDate);
		Calendar calendar = Calendar.getInstance();//日历对象
		calendar.setTime(date);//设置当前日期
		calendar.add(Calendar.DATE, 1);//加一天
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");//格式化对象
		String eDate = sdf.format(calendar.getTime());//输出格式化的日期
		return eDate;
    }
    
	/**
	 * 测试用例
	 * @param args
	 * @throws ParseException
	 */
	public static void main(String[] args) throws ParseException {
		
		System.out.println(parseDate(DateUtil.getDay()));
		 //System.out.println(formatDate(parseDate("2010/3/6")));
//		 System.out.println(getDate("yyyy年MM月dd日 E"));
//		 long time = new Date().getTime()-parseDate("2012-11-19").getTime();
//		 System.out.println(time/(24*60*60*1000));
		 
		 //System.out.println(formatDate(parseDate("2016-06-21 12:00", new String[] {"yyyy-MM-dd HH:mm"})));
	}
	
}
