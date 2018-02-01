package org.gtjy.p2p.util;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class FileUpload {
	static final String UPLOAD_PATH_KEY = "upload.dir";
	private static Log logger = LogFactory.getLog(FileUpload.class);
	/** * 定义允许上传的文件扩展名 */
	private Map<String, String> extMap = MapUtil.newHashMap();
	/** * 文件上传目录 */
	private String savePath;
	/** * 文件完整目录 */
	private String saveUrl;
	/** * 空构造器 */
	public FileUpload() {
		// 允许上传的文件类型
		extMap.put("extName", "gif,jpg,jpeg,png,bmp,xls,xlsx");
	}

	/**
	 * @param request 请求对象 
	 * @param upload 被上传的文件
	 * @param uploadFileName 被上传的文件名
	 * @param dirName 文件类型对应的路径 
	 * @param maxSize 文件大小阈值
	 * @return * @throws IOException
	 */
	public String[] uploadFile(HttpServletRequest request, File upload,
			String uploadFileName, String dirName, Long maxSize)
			throws IOException {
		/** * 保存上传文件返回信息 */
		String[] infos = new String[2];
		/** * 获取文件上传目录 */
		String extName = uploadFileName.substring(uploadFileName.lastIndexOf(".") + 1, uploadFileName.length());
		infos[0] = this.validateFields(request, extName, dirName, maxSize);
		String prefixName = uploadFileName.substring(0,uploadFileName.lastIndexOf("."));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhh24mmss");
		String ymd = sdf.format(new Date());
		String realName = prefixName + ymd + "." + extName;
		/** * 获取文件全路径 */
		saveUrl = savePath + realName;
		if (infos[0].equals("true")) {
			saveFile(upload, savePath, realName);
			infos[1] = saveUrl;
		}
		System.out.println(infos);
		return infos;
	}

	/**
	 * 上传验证,并初始化文件目录
	 * @param request 请求对象 
	 * @param extName 扩展名
	 * @param dirName 子目录名
	 * @param maxSize 文件大小阈值 
	 * @throws IOException
	 */
	private String validateFields(HttpServletRequest request, String extName,
			String dirName, Long maxSize) throws IOException {
		String errorInfo = "true";
		// 获取内容类型
		String contentType = request.getContentType();
		String extType = extMap.get("extName");
		int contentLength = request.getContentLength();
		String path = "";             
		savePath = path + "/" + dirName + "/";
		File uploadDir = new File(savePath);
		if (contentType == null || !contentType.startsWith("multipart")) {
			logger.error("请求不包含multipart/form-data流");
			return "请求不包含multipart/form-data流";
		}
		if (extType.indexOf(extName) == -1) {
			return "不允许上传的文件类型[" + "." + extName + "]";
		}
		if (maxSize < contentLength) {
			logger.error("上传文件大小超出文件最大大小");
			return "上传文件大小超出文件最大大小[" + maxSize + "]";
		}
		if (!ServletFileUpload.isMultipartContent(request)) {
			return errorInfo = "请选择文件";
		}
		if (!uploadDir.exists()) {
			// 检查目录 
			logger.warn("上传目录[" + savePath + "]不存在");
			uploadDir.mkdir();
		}
		if (!uploadDir.canWrite()) {
			return "上传目录[" + savePath + "]没有写权限";
		}
		return errorInfo;
	}

	/**
	 * 保存文件 
	 * @param upload 待上传文件 
	 * @param savePath 文件存储目录 
	 * @param realName 原始文件名 
	 * @throws IOException
	 */
	public void saveFile(File upload, String savePath, String realName)
			throws IOException {
		File target = new File(savePath, realName);
		FileUtil.copyFile(upload, target);
	}

	public static void main(String[] args) throws IOException {
		File dirFile = new File("F:/f/");
	    if (!dirFile.exists()) {
            dirFile.mkdirs();
        }
		//new FileUpload().uploadFile(null, new File("E://frontList.jsp"), "/frontList.jsp", dirFile.getParent()+"/123.jsp", 1024l);
	}

}
