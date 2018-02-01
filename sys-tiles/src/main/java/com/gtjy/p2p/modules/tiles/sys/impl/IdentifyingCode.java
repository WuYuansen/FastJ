package com.gtjy.p2p.modules.tiles.sys.impl;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.util.Random;

import org.gtjy.p2p.security.authentication.Authentication;
import org.springframework.stereotype.Component;

import com.gtjy.p2p.modules.tiles.sys.IIdentifyingCode;


/**
 * 验证码图片生成器
 * 
 */
@Component
public class IdentifyingCode implements IIdentifyingCode {
    
	// 验证码图片的宽度。
	private int width = 72;

	// 验证码图片的高度。
	private int height = 24;

	// 验证码字符个数。
	private int count = 4;
	
	// 干扰点数量
	private int pntsCount = 120;

	// 干扰线数量
	private int linesCount = 15;
	

	private Random random = new Random();

	public IdentifyingCode() {}
	
	@Authentication
	public BufferedImage drawIdentifyingCode(String code) {
		BufferedImage image = new BufferedImage(this.getWidth(),
				this.getHeight(), BufferedImage.TYPE_INT_BGR);
		Graphics2D g = image.createGraphics();
		// 绘制背景
		g.setColor(this.getRandomColor(180, 200));
		g.fillRect(0, 0, this.getWidth(), this.getHeight());
		
		// 绘制干扰图形
		this.drawRandomShapes(g,linesCount,(int)(pntsCount*0.75));	
		
		// 绘制验证码文本
		Font myFont = new Font("Georgia", Font.BOLD, 16);  // Arial  Courier New  Verdana
		int len = code.length();
		g.setFont(myFont);
		for(int i=0;i<len;i++){
			String chr = code.charAt(i)+"";
			Color color = new Color(20 + random.nextInt(50),20 + random.nextInt(50), 20 + random.nextInt(50));
			g.setColor(color);
			// 文字旋转
			AffineTransform trans = new AffineTransform();
			trans.rotate(random.nextInt(45) * Math.PI / 180, 15 * i + 8, 7);
			// 缩放文字
			float scaleSize = random.nextFloat() + 0.8f;
			if (scaleSize > 1f) scaleSize = 1f;
			trans.scale(scaleSize, scaleSize);
			g.setTransform(trans);
			g.drawString(chr, 16 * i + 10, 14);
		}
		
		// 在图片最上层绘制干扰图形 
		this.drawRandomShapes(g,4,(int)(pntsCount*0.75));	
		g.dispose();
		return image;
	}
	
	@Authentication
	public String generateIdentifyingCode(int length) {
		if(length<0){
			length = this.count;
		}
		StringBuffer strbuf = new StringBuffer();
		String str = "";
		int itmp = 0;
		for (int i = 0; i < length; i++) {
			switch (random.nextInt(2)) {
			case 1: // 生成A～Z的字母
				itmp = random.nextInt(26) + 65;
				str = String.valueOf((char) itmp);
				break;
			case 2: // 生成a～a的字母
				itmp = random.nextInt(26) + 97;
				str = String.valueOf((char) itmp);
			default: 
				itmp = random.nextInt(10) + 48;
				str = String.valueOf((char) itmp);
				break;
			}
			strbuf.append(str);
		}
		return strbuf.toString();
	}
	
	/**
	 * 绘制干扰图形
	 * 
	 * @param g
	 *            Graphics2D对象，用来绘制图像
	 *
	 */
	private void drawRandomShapes(Graphics2D g,int ls, int ps) {
		// 绘制干扰线
		int i = 0;
		for (i = 0; i < ls; i++) {
			g.setColor(this.getRandomColor(160, 200));
			int x1 = random.nextInt(width);
			int y1 = random.nextInt(height);
			int x2 = random.nextInt(width);
			int y2 = random.nextInt(height);
			g.drawLine(x1, y1, x2, y2);
		}
		// 绘制干扰点
		for (i = 0; i < ps; i++) {
			g.setColor(this.getRandomColor(160, 200));
			int x1 = random.nextInt(width);
			int y1 = random.nextInt(height);
			g.drawLine(x1,y1,x1,y1);
		}
	}
	
	/**
	 * 生成随机颜色
	 * 
	 * @param fc
	 *            前景色
	 * @param bc
	 *            背景色
	 * @return Color对象，RGB。
	 */
	private Color getRandomColor(int fc, int bc) {
		if (fc > 255)
			fc = 200;
		if (bc > 255)
			bc = 255;
		int r = fc + random.nextInt(bc - fc);
		int g = fc + random.nextInt(bc - fc);
		int b = fc + random.nextInt(bc - fc);
		return new Color(r, g, b);
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}
	
	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public int getPntsCount() {
		return pntsCount;
	}

	public void setPntsCount(int pntsCount) {
		this.pntsCount = pntsCount;
	}

	public int getLinesCount() {
		return linesCount;
	}

	public void setLinesCount(int linesCount) {
		this.linesCount = linesCount;
	}
}
