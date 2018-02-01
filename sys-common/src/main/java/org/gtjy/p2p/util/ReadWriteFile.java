package org.gtjy.p2p.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.RandomAccessFile;
import java.util.regex.Pattern;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 
 * ReadWriteFile 创建,修改,删除TXT文件内容 
 * 
 * 2015年4月16日 上午11:13:18
 * @author：wys
 * @version 1.0.0
 *
 */
public class ReadWriteFile {

    private static Log logger = LogFactory.getLog(ReadWriteFile.class);
    
    private static BufferedReader bufread;
    
    private static String readStr ="";
    
    /**
     * 
     * createFile(创建文件)
     * (这里描述这个方法适用条件 – 可选)
     * @param filePath
     * @throws IOException 
     * @return void
     * @exception 
     * @version  1.0.0
     */
    public static void createFile(File filePath) throws IOException {
        if(!filePath.exists()) {
            filePath.createNewFile();
            logger.info(filePath.getName() + " 文件已创建,文件路径:"+filePath.getPath());
        }
    }
    
    /**
     * 
     * readTxtFile(读取文件)
     * (这里描述这个方法适用条件 – 可选)
     * @param filename
     * @return 
     * @return String
     * @exception 
     * @version  1.0.0
     */
    public static String readTxtFile(File filename){
        String read;
        FileReader fileread;
        try {
            fileread = new FileReader(filename);
            bufread = new BufferedReader(fileread);
            try {
                while ((read = bufread.readLine()) != null) {
                    readStr = readStr + read+ "\r\n";
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        logger.info("文件内容是:"+ "\r\n" + readStr);
        return readStr;
    }
    
    /**
     * 
     * readTxtFile(读取txt指定内容的文字信息)
     * (这里描述这个方法适用条件 – 可选)
     * @param filename
     * @return 
     * @return String
     * @exception 
     * @version  1.0.0
     */
    public static String readTxtFile(File filename,String Prefix) {
        String temp = "";
        try {
            FileInputStream fis = new FileInputStream(filename);
            InputStreamReader isr = new InputStreamReader(fis);
            BufferedReader br = new BufferedReader(isr);
            StringBuffer buf = new StringBuffer();
            String regEx = "^"+Prefix+":([\\w\\W]*|[\\u4e00-\\u9fa5]*)+$";
            Pattern p = Pattern.compile(regEx);
            for (@SuppressWarnings("unused")
                int j = 1; (temp = br.readLine()) != null
                    && p.matcher(temp).find(); j++) {
                buf = buf.append(temp);
                buf = buf.append(System.getProperty("line.separator"));
            }
            br.close();
            return buf.toString();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    /**
     * 
     * writeTxtFile(写入内容到TXT文件中 )
     * (这里描述这个方法适用条件 – 可选)
     * @param filename
     * @param newStr
     * @throws IOException 
     * @return void
     * @exception 
     * @version  1.0.0
     */
    public static void writeTxtFile(File filename,String newStr) throws IOException{
        //先读取原有文件内容，然后进行写入操作
        String filein = newStr + "\r\n" + readStr + "\r\n";
        RandomAccessFile mm = null;
        try {
            mm = new RandomAccessFile(filename, "rw");
            mm.write(filein.getBytes("UTF-8"));;
        } catch (IOException e1) {
            e1.printStackTrace();
        } finally {
            if (mm != null) {
                try {
                    mm.close();
                } catch (IOException e2) {
                    e2.printStackTrace();
                }
            }
        }
    }
    
    /**
     * 将文件中指定内容的第一行替换为其它内容.
     * @param file
     *              文件路径
     * @param oldStr
     *            查找内容
     * @param replaceStr
     *            替换内容
     */
    public static void replaceTxtByStr(File file,String Prefix,String replaceStr) {
        String temp = "";
        try {
            FileInputStream fis = new FileInputStream(file);
            InputStreamReader isr = new InputStreamReader(fis);
            BufferedReader br = new BufferedReader(isr);
            StringBuffer buf = new StringBuffer();
            
            String regEx = "^"+Prefix+":\\d([\\w\\W]*)+$";
            Pattern p = Pattern.compile(regEx);
            // 保存该行前面的内容
            for (@SuppressWarnings("unused")
                int j = 1; (temp = br.readLine()) != null
                    && p.matcher(temp).find(); j++) {
                buf = buf.append(temp);
                buf = buf.append(System.getProperty("line.separator"));
            }
            // 将内容插入
            buf = buf.append(replaceStr);
            // 保存该行后面的内容
            while ((temp = br.readLine()) != null) {
                buf = buf.append(System.getProperty("line.separator"));
                buf = buf.append(temp);
            }
            br.close();
            FileOutputStream fos = new FileOutputStream(file);
            PrintWriter pw = new PrintWriter(fos);
            pw.write(buf.toString().toCharArray());
            pw.flush();
            pw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
