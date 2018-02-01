package com.gtjy.p2p.modules.tiles.sys;

import java.awt.image.BufferedImage;


public interface IIdentifyingCode {
	
	/**
	 * 绘制验证码
	 * 
	 * @param code
	 *            String ,绘制的文本
	 * @return 验证码图片
	 */
	public BufferedImage drawIdentifyingCode(String code);
	
	
	/**
	 * 获取随机字符串， 由大、小写字母和数字组成
	 * 
	 * @param length
	 *            随机字符串的长度
	 * @return 随机字符串
	 */
	public String generateIdentifyingCode(int length);
}
