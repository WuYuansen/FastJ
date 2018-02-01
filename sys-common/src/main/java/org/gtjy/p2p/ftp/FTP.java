package org.gtjy.p2p.ftp;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.SocketException;
import java.util.Map;

import org.apache.commons.net.ftp.FTPClient;
import org.gtjy.p2p.constants.SystemConstant;
import org.gtjy.p2p.security.Des;
import org.gtjy.p2p.util.FileUtil;
import org.gtjy.p2p.util.IOUtil;
import org.gtjy.p2p.util.PropertiesUtil;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.support.util.SystemLogUtils;


/**
 * FTP文件上传 使用commons-net包
 * @author wys
 *
 */
public class FTP {
    
    private static String FTPPROPERTIESPATH=Thread.currentThread().getContextClassLoader().getResource("/").getPath()+SystemConstant.SEPARATOR+"message"+SystemConstant.SEPARATOR+"FTP.properties";
    
    Des desObj = new Des();
    
	private static String host;
	private static int port;
	private static String username;
	private static String password;
	
	private FTPClient ftpClient;
	private FileInputStream fis;
	private FileOutputStream fos;
	
	public FTP(){
	    PropertiesUtil.setConfig(FTPPROPERTIESPATH);
        host=PropertiesUtil.get("host");
        port=Integer.parseInt(PropertiesUtil.get("port"));
        username=PropertiesUtil.get("username");
        password=PropertiesUtil.get("password");
	}
	
	
	/**
	 * 连接服务器
	 */
	public void connectService(){
		ftpClient = new FTPClient();
		try {
			ftpClient.connect(host, port);
			ftpClient.login(username, password);
			ftpClient.setFileType(org.apache.commons.net.ftp.FTP.BINARY_FILE_TYPE);  //文件类型 二进制
			ftpClient.setControlEncoding("UTF-8"); //
			SystemLogUtils.println("和远程FTP主机[" + host + "]连接成功." + ftpClient.getReplyString());
		} catch (SocketException e) {
			throw new RuntimeException("和远程FTP主机[" + host + "]连接 "+e.getMessage());
		} catch (IOException e) {
			throw new RuntimeException("和远程FTP主机[" + host + "]连接 "+e.getMessage());
		}
	}
	/**
	 * 关闭服务器
	 */
	public void closeService(){
		try {
			ftpClient.logout();
			ftpClient.disconnect();
			SystemLogUtils.println("退出FTP远程主机![" + host + "]" + ftpClient.getReplyString());
		} catch (IOException e) {
			throw new RuntimeException("close FTP connection error " + e.getMessage());
		}
	}
	
	public void uploadFileMap(Map<String,Object> map){
	    String localFileName = map.get("localFileName").toString();
	    String remoteFileName = map.get("remoteFileName").toString();
	    String newFileName = map.get("newFileName").toString();
	    uploadFile(localFileName, remoteFileName, newFileName);
	}
	
	/**
	 * FTP上传单个文件测试 
	 * @param localFileName 待上传的本地文件
	 * @param newFileName 上传后新的文件名称
	 */
	public void uploadFile(String localFileName,String remoteFileName,String newFileName){
		try {
			connectService();
			File srcFile = new File(localFileName);
			ftpClient.setDataTimeout(60000);       //设置传输超时时间为60秒 
            ftpClient.setConnectTimeout(60000);       //连接超时为60秒
			fis = new FileInputStream(srcFile);
			//设置上传目录，缓冲区大小，编码格式
			if(!ftpClient.changeWorkingDirectory(remoteFileName)){//如果进入不了就表示没有此目录
			    if(!useWorkingDir(remoteFileName)){
			        SystemLogUtils.println("远程服务器中创建文件失败." + remoteFileName);
			    }
			}
			ftpClient.changeWorkingDirectory(remoteFileName);
			ftpClient.changeToParentDirectory();
			ftpClient.setBufferSize(1024);
			ftpClient.setControlEncoding("UTF-8");
			//设置文件类型
			ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
			fis = new FileInputStream(new File(localFileName));
			boolean status = ftpClient.storeFile(remoteFileName + "/" + newFileName,fis);
			if(status){
				SystemLogUtils.println("文件上传成功." + ftpClient.getReplyString());
			}else{
				SystemLogUtils.println("文件上传失败." + ftpClient.getReplyString());
			}
		} catch (FileNotFoundException e) {
			throw new RuntimeException(" file not found "+e.getMessage());
		} catch (IOException e) {
			throw new RuntimeException(" server error "+e.getMessage());
		} finally {
			IOUtil.closeQuietly(fis);
			closeService();
		}
	}
	
	
	/**
	 * FTP下载单个文件测试 
	 */
	public void downLoadFile(String remoteFileName){
		try {
			connectService();
			fos = new FileOutputStream(new File(remoteFileName));
			ftpClient.setBufferSize(1024); 
            //设置文件类型（二进制） 
            ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE); 
            ftpClient.retrieveFile(remoteFileName, fos); 
		} catch (FileNotFoundException e) {
			throw new RuntimeException(" file not found "+e.getMessage());
		} catch (IOException e) {
			throw new RuntimeException(" server error "+e.getMessage());
		} finally {
			IOUtil.closeQuietly(fos);
			closeService();
		}
	}
	
	/**
	 * 在服务器上创建目录
	 * @param dir
	 * @return
	 */
	public boolean makeDirectory(String dir) {  
        boolean flag = true;  
        try {  
            flag = ftpClient.makeDirectory(dir);  
            if (flag) {  
                SystemLogUtils.println("创建文件夹 " +dir +" 成功");  
            } else {  
                SystemLogUtils.println("创建文件夹 " +dir+ " 失败");  
            }  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return flag;  
    }  
	
	
	/**
	 * 下载文件
	 * 
	 * @param localFile
	 *            本地存储文件全路径,如:c:/beauty.jpg
	 * @param remoteFile
	 *            远程FTP路径,如:/b/a/beauty.jpg
	 * @return
	 */
	public boolean getFile(String localFile, String remoteFile) {
	    
	    String tempFile = localFile;
	    File temp = new File(tempFile);
        if(!temp.exists()){
            tempFile = tempFile.replace(temp.getName(), "");
            FileUtil.createDirectory(tempFile);
            SystemLogUtils.println(" 创建本地文件存储路径成功!");
        }
	    
		boolean success = false;
		//判断文件是否存在
		connectService();
		OutputStream output = null;
		try {
		    output = new FileOutputStream(localFile);
			success = ftpClient.retrieveFile(remoteFile, output);
			if (success) {
				SystemLogUtils.println("下载文件[" + remoteFile + "]成功, 被存储到[" + localFile + "]");
			}else {
				SystemLogUtils.println("下载文件[" + remoteFile + "]失败");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}finally {
            IOUtil.closeQuietly(fos);
            closeService();
        }
		try {
			output.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return success;
	}
	
	public void getFileByQueue(Map<?,?> map){
	    getFile(map.get("localFile").toString(), map.get("remoteFile").toString());
	}
	
	/**
	 * 使用当前工作路径(支持递归创建工作目录)
	 * 
	 * @param dir
	 *            要使用的工作路径,格式:/a/b/c/d
	 * @return
	 */
	public boolean useWorkingDir(String dir) {
		if (dir.equals("/")) {
			try {
				boolean status = ftpClient.changeWorkingDirectory(dir);
					SystemLogUtils.println(ftpClient.getReplyString() + "远程FTP工作目录切换到:" + dir);
				return status;
			} catch (IOException e) {
				SystemLogUtils.println("远程FTP工作目录切换发生异常");
				e.printStackTrace();
			}

		}
		String[] dirs = dir.substring(1).split("/");
		for (int i = 0; i < dirs.length; i++) {
			dirs[i] = "/" + dirs[i];
		}
		String path = "";
		try {
			for (int i = 0; i < dirs.length; i++) {
				path = path + dirs[i];
				if (!ftpClient.changeWorkingDirectory(path)) {
					if (ftpClient.makeDirectory(path)) {
						ftpClient.changeWorkingDirectory(path);
					} else {
						SystemLogUtils.println("创建远程FTP工作目录发生异常");
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		SystemLogUtils.println("远程FTP目录切换到:" + path);
		return true;
	}
	
	/**
	 * 删除FTP附件
	 * @param mkDir 远程文件名
	 */
	public void deleFTPFile(String mkDir){
	    try {
	        connectService();
            ftpClient.sendCommand("dele "+mkDir+" \r\n");
            SystemLogUtils.println("删除文件成功！删除文件路径:"+mkDir);
        } catch (IOException e) {
            SystemLogUtils.println("删除文件失败！请检查系统FTP设置,并确认FTP服务启动");
            e.printStackTrace();
        }finally {
            IOUtil.closeQuietly(fos);
            closeService();
        }
	}
	
	public void deleteFTPFileByQueue(Map<?,?> map){
	    deleFTPFile(map.get("mkDir").toString());
	}
}
