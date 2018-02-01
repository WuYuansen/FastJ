package org.gtjy.p2p.filters.gzip;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.GZIPOutputStream;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * GZIP 压缩 过滤器 整站压缩
 * web.xml配置
 * @author wys
 *
 */
public class GzipFilter implements Filter {
	
	
	@Override
	public void init(FilterConfig arg0) throws ServletException {
		System.out.println("光通嘉业特种设备数字化动态监管平台初始化GZIP整站压缩功能");
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		GzipHttpServletResponse gzipResponse = new GzipHttpServletResponse(response);
		chain.doFilter(request, gzipResponse);
		String uri = request.getRequestURI();  
        //3.获得文件扩展名,lastIndexOf(".")+1 获得.最后一次出现的索引的后一位：jpg   
        uri = uri.substring(uri.lastIndexOf(".")+1);  
        if(!uri.equalsIgnoreCase("html")) {
    		// 找一个内存缓冲字节流
    		ByteArrayOutputStream baos = new ByteArrayOutputStream();
    		// 把数据压缩到缓冲字节流中
    		GZIPOutputStream out = new GZIPOutputStream(baos);
    		// 取出数据原始字节
    		byte[] bs = gzipResponse.getOldBytes();
    		//logger.info(request.getRequestURI() + "原始数据大小=" + bs.length);
    		out.write(bs);
    		out.close();
    		// 取出压缩后的数据
    		bs = baos.toByteArray();
    		//logger.info("压缩后的数据大小=" + bs.length);
    		// 告知客户端压缩格式和文件长度
    		response.setHeader("Content-Encoding", "gzip");
    		response.setCharacterEncoding("UTF-8");
    		response.setContentLength(bs.length);
    		//静态资源文件缓存机制
            CacheResource(req, res, chain);
    		ServletOutputStream so = response.getOutputStream();
    		so.write(bs);
    		so.flush();
        }
	}

	@Override
	public void destroy() {
	    System.out.println("光通嘉业特种设备数字化动态监管平台销毁GZIP整站压缩功能");
	}
	
	/**
     * 提高系统访问性能，主键缓存
     */
    public void CacheResource(ServletRequest request, ServletResponse response,
            FilterChain chain){
        //1.强转httpservlet，方便调用方法   
        HttpServletRequest req = (HttpServletRequest) request;  
        HttpServletResponse res = (HttpServletResponse) response;  
        //2.获取资源文件名的URI   
        String uri = req.getRequestURI();  
        //3.获得文件扩展名,lastIndexOf(".")+1 获得.最后一次出现的索引的后一位：jpg   
        uri = uri.substring(uri.lastIndexOf(".")+1);  
        //System.out.println( uri );//测试获取后缀是否正确   
        //4断相应后缀文件，设定缓存时间   
        long date = 0;  
        //System.out.println( new Date().getTime());//测试当前时间用   
          
      //判断URI获取的后缀名是否与JPG相等，不考虑大小写   
        if(uri.equalsIgnoreCase("jpg")){  
            //读取XML里的JPG配置的参数，这里设定了时间   
            //获取当前系统时间 + 需要缓存的时间(小时),Long 防止溢出，因为单位是毫秒   
            date = System.currentTimeMillis()+5*60*60*1000;  
        }  
          
        if(uri.equalsIgnoreCase("gif")){  
            //读取XML里的JPG配置的参数，这里设定了时间   
            //获取当前系统时间 + 需要缓存的时间(小时),Long 防止溢出，因为单位是毫秒   
            date = System.currentTimeMillis()+5*60*60*1000;  
        }  
        if(uri.equalsIgnoreCase("png")){  
            //读取XML里的JPG配置的参数，这里设定了时间   
            //获取当前系统时间 + 需要缓存的时间(小时),Long 防止溢出，因为单位是毫秒   
            date = System.currentTimeMillis()+5*60*60*1000;  
        } 
          
        if(uri.equalsIgnoreCase("css")){  
            //读取XML里的JPG配置的参数，这里设定了时间   
            //获取当前系统时间 + 需要缓存的时间(小时),Long 防止溢出，因为单位是毫秒   
            date = System.currentTimeMillis()+5*60*60*1000;  
        }  
          
        if(uri.equalsIgnoreCase("js")){  
            //读取XML里的JPG配置的参数，这里设定了时间   
            //获取当前系统时间 + 需要缓存的时间(小时),Long 防止溢出，因为单位是毫秒   
            date = System.currentTimeMillis()+5*60*60*1000;  
        }  
        //设置缓存时间   
        res.setDateHeader("Expires", date);  
    }
}
