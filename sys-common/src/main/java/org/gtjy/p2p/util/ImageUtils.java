package org.gtjy.p2p.util;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;


/**
 * 
 * <p> Title: 图片处理工具类</p>
 * <p> Description: 此类中包含图片的水印</p>
 * <p> Copyright: Copyright (c) 2015 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class ImageUtils {
    public ImageUtils(){}
    
    /**
     * 打印文字水印图片 
     * @param pressText 文字
     * @param targetImg 目标图片
     * @param x 偏移量 x轴
     * @param y 偏移量 y轴
     */
    public static void pressText(String pressText,String targetImg,int x,int y){
        try {
            File _file = new File(targetImg);
            Image _image = ImageIO.read(_file);
            int width = _image.getWidth(null);
            int height = _image.getHeight(null);
            //创建一个不带透明色的BufferedImage对象
            BufferedImage bfImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            Graphics2D  graphics = bfImage.createGraphics();
            graphics.drawImage(_image,0,0,width,height,null);
            graphics.setColor(new Color(255,0,0));
            graphics.setFont(new Font("宋体",Font.PLAIN,13));
            graphics.drawString(pressText,width-13-x,height-13-y);
            graphics.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER));
            graphics.dispose();
            FileOutputStream outImgStream = new FileOutputStream(targetImg);  
            ImageIO.write(bfImage, "jpg", outImgStream);  
            outImgStream.flush();  
            outImgStream.close();  
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void main(String[] args) {
        //ImageUtils.pressText("测试水印", "F:\\ico-cms.png", 0, 0);
        String s = "F:\\EclipseWork\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\sapp-portal\\userfiles\\idcard\\2014\\1434098765937.jpg";
        System.out.println(">>>:"+s.subSequence(s.indexOf("\\userfiles"), s.length()));
    }
}
