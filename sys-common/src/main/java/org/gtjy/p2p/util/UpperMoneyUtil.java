package org.gtjy.p2p.util;

import java.text.DecimalFormat;
import java.text.NumberFormat;

import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;


/**
 * 功能：将金额数字转换为金额大写,支持的阿拉伯数字位数小于等于Integer.MAX_VALUE(2147483647)
 * 

 */
public class UpperMoneyUtil {
	// 金额大写数字：零壹贰叁肆伍陆柒捌玖
	private static final String[] UPPER_NUMBER = { "零", "壹", "贰", "叁", "肆",
			"伍", "陆", "柒", "捌", "玖" };

	// 元及以上的金额单位,万以后每增加8位后补一个亿,亿以后每增加8位后补一个亿
	private static final String[] MONEY_UNIT_LEFT = { "元", "拾", "佰", "仟", "万",
			"亿" };

	// 元以下的金额单位：分角
	private static final String[] MONEY_UNIT_RIGHT = { "分", "角" };

	/**
	 * 功能：将阿拉伯数字的金额转换为金额汉字大写
	 * 
	 * 
	 * @date 2009-5-4
	 * @param theNumber
	 *            阿拉伯数字金额
	 * @param theUnit
	 *            单位,1:元;2:分
	 * @return
	 * @throws BoException
	 */
	public static String number2upperMoney(String theNumber, int theUnit)
			throws BoException {
		String[] numbers = null;
		String numLeft = "";// 元以上部分
		String numRight = "";// 元以下部分,角分
		String sign = "";// 符号
		String upperMoney = "", upperMoneyLeft = "", upperMoneyRight = "";
		String strTemp = "";
		String[][] moneyUnitLeft = null, moneyUnitLeft1 = null;
		int len1 = 0, len2 = 0;
		int idx1 = 0;// 金额大写数字序号
		int idx2 = 0;// 金额单位序号
		char c;

		// 格式化数值为整数，拆分成元、角分
		numbers = formatNumber(theNumber, theUnit);
		numLeft = numbers[0];
		numRight = numbers[1];

		// 取数值长度
		len1 = numLeft.length();

		// 如果为负数则在前面输出负
		if (len1 > 0 && numLeft.charAt(0) == '-') {
			sign = "负";

			// 过滤负号
			numLeft = numLeft.substring(1);
		}

		/* 处理元以上的段落 */
		// 取数值长度
		len1 = numLeft.length();

		for (int i = 0; i < len1; i++) {
			// 读取一个字符
			c = numLeft.charAt(i);

			// 将字符转换为整数,得到金额大写数字序号
			idx1 = c - 48;

			// 金额单位序号
			idx2 = len1 - i - 1;

			// 求金额单位
			moneyUnitLeft = UpperMoneyUtil.numberIndex2moneyUnit(idx2);

			// 对0特殊处理
			if (c == '0') {
				// 关键金额单位不能省略
				if ("1".equals(moneyUnitLeft[0][1])) {
					// 将末尾的连续多个零替换成空
					upperMoneyLeft = upperMoneyLeft.replaceAll("零+$", "");

					// 追加关键金额单位
					upperMoneyLeft += moneyUnitLeft[0][0];

					// 如果2个关键金额单位相邻则删除小单位,元不能删除
					if (!moneyUnitLeft[0][0].equals(MONEY_UNIT_LEFT[0])) {
						for (int j = idx2 + 4; j < len1; j = j + 4) {
							strTemp = upperMoneyLeft;

							// 求金额单位
							moneyUnitLeft1 = UpperMoneyUtil
									.numberIndex2moneyUnit(j);

							upperMoneyLeft = upperMoneyLeft.replaceAll(
									moneyUnitLeft1[0][0] + moneyUnitLeft[0][0]
											+ "$", moneyUnitLeft1[0][0]);

							if (!strTemp.equals(upperMoneyLeft)) {
								break;
							}
						}
					}
				} else {
					upperMoneyLeft += "零";
				}
				continue;
			}

			// 拼接为金额大写的字符串
			upperMoneyLeft += UPPER_NUMBER[idx1] + moneyUnitLeft[0][0];
		}

		// 将连续多个零替换成一个零
		upperMoneyLeft = upperMoneyLeft.replaceAll("零+", "零");

		if ("元".equals(upperMoneyLeft)) {
			upperMoneyLeft = "零元";
		}

		/* 处理元以下角分的段落 */
		// 取数值长度
		len2 = numRight.length();

		for (int i = 0; i < len2; i++) {
			// 读取一个字符
			c = numRight.charAt(i);

			// 对0特殊处理
			if (c == '0') {
				upperMoneyRight += "零";
				continue;
			}

			// 将字符转换为整数,得到金额大写数字序号
			idx1 = c - 48;

			// 金额单位序号
			idx2 = len2 - i - 1;

			// 拼接为金额大写的字符串
			upperMoneyRight += UPPER_NUMBER[idx1] + MONEY_UNIT_RIGHT[idx2];
		}

		// 将连续多个零替换成一个零
		upperMoneyRight = upperMoneyRight.replaceAll("零+", "零");

		// 将末尾的零替换成空
		upperMoneyRight = upperMoneyRight.replaceAll("零$", "");

		if ("零元".equals(upperMoneyLeft) && !"".equals(upperMoneyRight)) {
			upperMoneyLeft = "";
		}

		if ("".equals(upperMoneyLeft)) {
			// 将小数部分开头的零替换成空
			upperMoneyRight = upperMoneyRight.replaceAll("^零", "");
		}

		strTemp = upperMoneyLeft + upperMoneyRight;
		if ("".equals(strTemp)) {
			strTemp = "零元";
		}

		upperMoney = sign + strTemp;

		// 将末尾的元替换成元整
		upperMoney = upperMoney.replaceAll("元$", "元整");

		return upperMoney;
	}

	/**
	 * 功能：校验数字并进行格式化，分隔成整数部分和小数部分
	 * 
	 * 
	 * @date 2009-5-4
	 * @param theNumber
	 *            阿拉伯数字金额
	 * @param theUnit
	 *            单位,1:元;2:分
	 * @return
	 * @throws BoException
	 */
	private static String[] formatNumber(String theNumber, int theUnit)
			throws BoException {
		String numLeft = "", numRight = "";
		String[] numArray = null;
		String[] numbers = new String[2];
		int pos1 = 0;
		int len = 0, len1 = 0, len2 = 0;
		boolean isNumeric = false;

		// 检查参数值
		if (theNumber == null) {
			theNumber = "";
		}

		// 无效金额单位
		if (theUnit != 1 && theUnit != 2) {
			throw new BoException("金额单位[" + theUnit+ "]不是有效地金额单位,应该是1 : 元;2 : 分", "-1");
		}

		// 检查是否为有效地数值
		isNumeric = StringUtils.isNumeric(theNumber);

		// 无效数值
		if (isNumeric == false) {
			throw new BoException("字符串[" + theNumber + "]不是有效地数值", "-1");
		}

		len = theNumber.length();

		// 不能为负数
		if (len > 0 && theNumber.charAt(0) == '-') {
			throw new BoException("金额不能为负数,数值[" + theNumber + "]非法", "-1");
		}

		// 查找小数点的位置
		pos1 = theNumber.indexOf('.');

		// 单位为分时不能是小数
		if (theUnit == 2) {
			if (pos1 >= 0) {
				throw new BoException("当金额单位为分时不能是小数,数值[" + theNumber + "]非法","-1");
			} else {
				numLeft = theNumber.substring(0, len - 2);
				numRight = theNumber.substring(len - 2, len);
			}
		}
		// 单位为元时小数点后边最多只能跟2位数字
		else if (theUnit == 1) {
			numArray = theNumber.split("\\.");
			len1 = numArray.length;

			if (len1 == 0) {
				numLeft = "0";
				numRight = "00";
			} else if (len1 == 1) {
				numLeft = numArray[0];
				numRight = "00";
			} else if (len1 == 2) {
				numLeft = numArray[0];
				len2 = numArray[1].length();

				if (len2 == 0) {
					numRight = "00";
				} else if (len2 == 1) {
					numRight = numArray[1] + "0";
				} else if (len2 == 2) {
					numRight = numArray[1];
				} else if (len2 > 2) {
					throw new BoException("单位为元时小数点后边最多只能跟2位数字,数值[" + theNumber + "]非法", "-1");
				}
			}
		}

		numbers[0] = numLeft;
		numbers[1] = numRight;

		return numbers;
	}

	/**
	 * 功能：根据数字的位数生成金额单位
	 * 
	 * 
	 * @date 2009-5-11
	 * @param theNumberIndex
	 *            数字位置序号
	 * @return
	 * @throws BoException
	 */
	private static String[][] numberIndex2moneyUnit(int theNumberIndex)
			throws BoException {
		String[][] ret = { { "", "0" } };
		int r1 = 0, r2 = 0, n = 0;

		if (theNumberIndex == 0) {
			// 第0位为元
			ret[0][0] = MONEY_UNIT_LEFT[0];
			ret[0][1] = "1";
		} else {
			// 求除以4的余数
			r1 = theNumberIndex % 4;
			// 被4整除的都是大金额单位
			if (r1 == 0) {
				// 求除以8的余数
				r2 = theNumberIndex % 8;

				if (r2 == 0) {
					// 8的整数倍,金额单位以亿开头
					n = (theNumberIndex - 8) / 8;
					ret[0][0] = MONEY_UNIT_LEFT[5];
				} else {
					// 除以8余4,金额单位以万开头
					n = (theNumberIndex - 4) / 8;
					ret[0][0] = MONEY_UNIT_LEFT[4];
				}

				// 追加n次亿
				for (int i = 0; i < n; i++) {
					ret[0][0] += MONEY_UNIT_LEFT[5];
				}

				ret[0][1] = "1";
			} else {
				// 不能被4整除的都是小金额单位：拾、佰、仟
				ret[0][0] = MONEY_UNIT_LEFT[r1];
				ret[0][1] = "0";
			}
		}

		return ret;
	}
	
	/**
	 * 格式化货币格式000,000.00格式
	 * @param moneyStr
	 * @return
	 */
	public static String convertMoneyToRMB(double moneyStr){
		NumberFormat nf = new DecimalFormat(",###.##");
		String money = nf.format(moneyStr);
		return money;
	}
}
