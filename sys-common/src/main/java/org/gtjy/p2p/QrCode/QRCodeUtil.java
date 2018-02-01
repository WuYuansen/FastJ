//package org.gtjy.p2p.QrCode;
//
//import java.awt.Image;
//import java.awt.image.BufferedImage;
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.io.OutputStream;
//import java.util.HashMap;
//import java.util.Map;
//
//import javax.imageio.ImageIO;
//
//import com.google.zxing.BarcodeFormat;
//import com.google.zxing.EncodeHintType;
//import com.google.zxing.MultiFormatWriter;
//import com.google.zxing.WriterException;
//import com.google.zxing.common.BitMatrix;
//import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
///**
// * 二维码生成类可自定义logo
// * @author gtjy-120
// *
// */
//public class QRCodeUtil {
//	
//	private static int WIDTH = 250; 	// 中间图片的宽
//	private static int IMGWIDTH = 30;	// logo图片半径
//	private static int RADIUS = 10; 	// 留白填充宽度
//	private static int MARGIN = 2;
//	private static int FRONTCOLOR = 0x00808080;//0x00000000;//0x00808080;
//	
//	/** * 功能描述：生成普通二维码到输出流 */
//	public void generateToStream(String code, OutputStream stream) {
//		this.generateToStream(code, stream, WIDTH, FRONTCOLOR, null);
//	}
//	
//	public void generateToStream(String code, OutputStream stream, int width) {
//		this.generateToStream(code, stream, width, FRONTCOLOR, null);
//	}
//	
//	public void generateToStream(String code, OutputStream stream, int width,
//			int frontColor) {
//		this.generateToStream(code, stream, width, frontColor, null);
//	}
//	
//	public void generateToStream(String code, OutputStream stream, int width,
//			int frontColor, File logo) {
//		Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();
//		hints.put(EncodeHintType.CHARACTER_SET, "UTF-8"); // 修正容量高
//		hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H); // 边框留白
//		hints.put(EncodeHintType.MARGIN, 1);
//		BitMatrix matrix = null;
//		try {
//			matrix = new MultiFormatWriter().encode(code,
//					BarcodeFormat.QR_CODE, width, width, hints);
//		} catch (WriterException e) {
//			e.printStackTrace();
//		}
//		proc(matrix, stream, frontColor, logo);
//	}
//
//	public void proc(BitMatrix matrix, OutputStream stream, int frontColor,
//			File logo) {
//		int width = matrix.getWidth();// 处理后图片的数据
//		int pixels[] = new int[width * width];// 中间图片数组数据
//		int src[][] = null;
//		boolean hashlogo = false;
//		if (logo != null) {
//			src = getPic(logo);
//			hashlogo = true;
//		}
//		// 填充色
//		int margincolor = 0xffffffff;// 白色
//		int w_half = width / 2;
//		int frame = MARGIN;
//		int img_half = IMGWIDTH / 2;
//		int r = RADIUS;
//		int near = width / 2 - img_half - frame + r;
//		int far = width / 2 + img_half + frame - r;
//		for (int y = 0; y < width; y++) {
//			for (int x = 0; x < width; x++) {
//				if (!hashlogo) {// 二维码
//					pixels[y * width + x] = matrix.get(x, y) ? frontColor
//							: margincolor;
//				} else { /* 中间图片 */
//					if (x > w_half - img_half && x < w_half + img_half
//							&& y > w_half - img_half && y < w_half + img_half) {
//						pixels[y * width + x] = src[x - w_half + img_half][y
//								- w_half + img_half];
//					} else if ((x > w_half - img_half - frame
//					/* 左边框 */&& x < w_half - img_half + frame
//							&& y > w_half - img_half - frame && y < w_half
//							+ img_half + frame)
//							|| (x > w_half + img_half - frame /* 右边框 */
//									&& x < w_half + img_half + frame
//									&& y > w_half - img_half - frame && y < w_half
//									+ img_half + frame)
//							|| (x > w_half - img_half - frame /* 上边框 */
//									&& x < w_half + img_half + frame
//									&& y > w_half - img_half - frame && y < w_half
//									- img_half + frame)
//							|| (x > w_half - img_half - frame
//							/* 下边框 */&& x < w_half + img_half + frame
//									&& y > w_half + img_half - frame && y < w_half
//									+ img_half + frame)) {
//						/* 圆角处理 */if (x < near
//								&& y < near
//								&& (near - x) * (near - x) + (near - y)
//										* (near - y) > r * r) { /* 左上圆角 */
//							pixels[y * width + x] = matrix.get(x, y) ? frontColor
//									: margincolor;
//						} else if (x > far
//								&& y < near
//								&& (x - far) * (x - far) + (near - y)
//										* (near - y) > r * r) { /* 右上圆角 */
//							pixels[y * width + x] = matrix.get(x, y) ? frontColor
//									: margincolor;
//						} else if (x < near
//								&& y > far
//								&& (near - x) * (near - x) + (y - far)
//										* (y - far) > r * r) { /* 左下圆角 */
//							pixels[y * width + x] = matrix.get(x, y) ? frontColor
//									: margincolor;
//						} else if (x > far
//								&& y > far
//								&& (x - far) * (x - far) + (y - far)
//										* (y - far) > r * r) { /* 右下圆角 */
//							pixels[y * width + x] = matrix.get(x, y) ? frontColor
//									: margincolor;
//						} else { /* 边框填充颜色 */
//							pixels[y * width + x] = margincolor;
//						}
//					} else { /* 二维码 */
//						pixels[y * width + x] = matrix.get(x, y) ? frontColor
//								: margincolor;
//					}
//				}
//			}
//		}
//		BufferedImage image = new BufferedImage(width, width,BufferedImage.TYPE_INT_RGB);
//		image.getRaster().setDataElements(0, 0, width, width, pixels);
//		try {
//			ImageIO.write(image, "png", stream);
//			
//		} catch (IOException e) {
//		}
//	}
//
//	/* 图片的压缩、圆角处理,并生成数组 */
//	public int[][] getPic(File logo) {
//		BufferedImage biSrc = null;
//		try {
//			biSrc = ImageIO.read(logo);
//		} catch (IOException e) {
//		}
//		BufferedImage biTarget = new BufferedImage(IMGWIDTH, IMGWIDTH,BufferedImage.TYPE_3BYTE_BGR);
//		biTarget.getGraphics().drawImage(biSrc.getScaledInstance(IMGWIDTH, IMGWIDTH,Image.SCALE_SMOOTH), 0, 0, null);
//		int src[][] = new int[IMGWIDTH][IMGWIDTH];
//		/* 圆角处理半径 */
//		int r = RADIUS;
//		int max = IMGWIDTH;
//		int bordercolor = 0x00000000;
//		int whitecolor = 0xffffffff;
//		for (int x = 0; x < IMGWIDTH; x++) {
//			for (int y = 0; y < IMGWIDTH; y++) {
//				if (x < r
//						&& y < r
//						&& ((r - x) * (r - x) + (r - y) * (r - y) > (r - 1)
//								* (r - 1))) {
//					/* 左上圆角 */
//					if ((r - x) * (r - x) + (r - y) * (r - y) > r * r) {
//						src[x][y] = whitecolor;
//					} else {
//						src[x][y] = bordercolor;
//					}
//				} else if (x > (max - r)
//						&& y < r
//						&& (x + r - max) * (x + r - max) + (r - y) * (r - y) > (r - 1)
//								* (r - 1)) {
//					/* 右上圆角 */
//					if ((x + r - max) * (x + r - max) + (r - y) * (r - y) > r
//							* r) {
//						src[x][y] = whitecolor;
//					} else {
//						src[x][y] = bordercolor;
//					}
//				} else if (x < r
//						&& y > (max - r)
//						&& (r - x) * (r - x) + (y + r - max) * (y + r - max) > (r - 1)
//								* (r - 1)) {
//					/* 左下圆角 */
//					if ((r - x) * (r - x) + (y + r - max) * (y + r - max) > r
//							* r) {
//						src[x][y] = whitecolor;
//					} else {
//						src[x][y] = bordercolor;
//					}
//				} else if (x > (max - r)
//						&& y > (max - r)
//						&& (x + r - max) * (x + r - max) + (y + r - max)
//								* (y + r - max) > (r - 1) * (r - 1)) {
//					/* 右下圆角 */
//					if ((x + r - max) * (x + r - max) + (y + r - max)
//							* (y + r - max) > r * r) {
//						src[x][y] = whitecolor;
//					} else {
//						src[x][y] = bordercolor;
//					}
//				} else {
//					if (((x >= r && x <= max - r) && (y == 0 || y == 1
//							|| y == max - 1 || y == max))
//							|| ((y >= r && y <= max - r) && (x == 0 || x == 1
//									|| x == max - 1 || x == max))) {
//						/* 四周除圆角的边框 */src[x][y] = bordercolor;
//					} else { /* 图片值 */
//						src[x][y] = biTarget.getRGB(x, y);
//					}
//				}
//			}
//		}
//		return src;
//	}
//	public static void main(String[] args) {
//		
//		String code = "http://www.baidu.com";	//输出内容
//		String width = "125";					//宽度
//		String color = "0000";					//颜色
//		int my_width = Integer.valueOf(width);
//		int my_color = Integer.valueOf(color);
//		File logofile = new File("D:/wk/p2p_website/src/main/webapp/static/images/logo.png");
//		QRCodeUtil q = new QRCodeUtil();
//		File file = new File("D:/q.png");
//		OutputStream os = null;
//		try {
//			os = new FileOutputStream(file);
//			q.generateToStream(code, os, my_width, my_color, logofile);
//			os.flush();
//			os.close();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//	
//}