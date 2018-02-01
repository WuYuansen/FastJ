/**  
 * ━━━━━━神兽出没━━━━━━
    * 　　　┏┓　　　┏┓
    * 　　┏┛┻━━━┛┻┓
    * 　　┃　　　　　　　┃
    * 　　┃　　　━　　　┃
    * 　　┃　┳┛　┗┳　┃
    * 　　┃　　　　　　　┃
    * 　　┃　　　┻　　　┃
    * 　　┃　　　　　　　┃
    * 　　┗━┓　　　┏━┛
    * 　　　　┃　　　┃神兽保佑, 永无BUG!
    * 　　　　┃　　　┃Code is far away from bug with the animal protecting
    * 　　　　┃　　　┗━━━┓
    * 　　　　┃　　　　　　　┣┓
    * 　　　　┃　　　　　　　┏┛
    * 　　　　┗┓┓┏━┳┓┏┛
    * 　　　　　┃┫┫　┃┫┫
    * 　　　　　┗┻┛　┗┻┛
 * ━━━━━━感觉萌萌哒━━━━━━
 * Copyright © 2017 Loser森 javaer0415@gmail.com. All rights reserved.
 * @标题: ChineseToEnglish.java
 * @所属项目: sys-common
 * @包路径: org.gtjy.p2p.util
 * @说明: 汉字转换拼音
 * @作者: Loser森 javaer0415@gmail.com
 * @创建时间: 2017年4月6日 下午1:25:32
 * @版本号: V1.0
 */
package org.gtjy.p2p.util;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

/**
 * @类名称: ChineseToEnglish
 * @说明: 汉字转换拼音
 * @作者: Loser森 javaer0415@gmail.com
 * @创建时间: 2017年4月6日 下午1:25:32
 */
public class ChineseToEnglish {
	/**
	 * @方法名: getPingYin
	 * @方法说明: 将汉字转换为全拼
	 * @param src
	 * @return: String
	 */
    public static String getPingYin(String src) {  
  
        char[] t1 = null;  
        t1 = src.toCharArray();  
        String[] t2 = new String[t1.length];  
        HanyuPinyinOutputFormat t3 = new HanyuPinyinOutputFormat();  
          
        t3.setCaseType(HanyuPinyinCaseType.LOWERCASE);  
        t3.setToneType(HanyuPinyinToneType.WITHOUT_TONE);  
        t3.setVCharType(HanyuPinyinVCharType.WITH_V);  
        String t4 = "";  
        int t0 = t1.length;  
        try {  
            for (int i = 0; i < t0; i++) {  
                // 判断是否为汉字字符  
                if (java.lang.Character.toString(t1[i]).matches(  
                        "[\\u4E00-\\u9FA5]+")) {  
                    t2 = PinyinHelper.toHanyuPinyinStringArray(t1[i], t3);  
                    t4 += t2[0];  
                } else  
                    t4 += java.lang.Character.toString(t1[i]);  
            }  
            return t4;  
        } catch (BadHanyuPinyinOutputFormatCombination e1) {  
            e1.printStackTrace();  
        }  
        return t4;  
    }  

    /**
     * @方法名: getPinYinHeadChar
     * @方法说明: 返回中文的首字母
     * @param str
     * @return: String
     */
    public static String getPinYinHeadChar(String str) {  
  
        String convert = "";  
        for (int j = 0; j < str.length(); j++) {  
            char word = str.charAt(j);  
            String[] pinyinArray = PinyinHelper.toHanyuPinyinStringArray(word);  
            if (pinyinArray != null) {  
                convert += pinyinArray[0].charAt(0);  
            } else {  
                convert += word;  
            }  
        }  
        return convert;  
    }  
  
    /**
     * @方法名: getCnASCII
     * @方法说明: 将字符串转移为ASCII码  
     * @param cnStr
     * @return: String
     */
    public static String getCnASCII(String cnStr) {  
        StringBuffer strBuf = new StringBuffer();  
        byte[] bGBK = cnStr.getBytes();  
        for (int i = 0; i < bGBK.length; i++) {  
            strBuf.append(Integer.toHexString(bGBK[i] & 0xff));  
        }  
        return strBuf.toString();  
    }  
  
    /**
     * @方法名: main
     * @方法说明: 测试用例
     * @param args
     * @return: void
     */
    public static void main(String[] args) {  
        System.out.println(getPingYin("吴元森"));  
        System.out.println(getPinYinHeadChar("吴元森"));  
        System.out.println(getCnASCII("吴元森"));  
    }  
}
