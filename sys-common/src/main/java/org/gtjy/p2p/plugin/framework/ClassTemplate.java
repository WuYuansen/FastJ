package org.gtjy.p2p.plugin.framework;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.net.JarURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

import org.gtjy.p2p.util.StringUtils;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.ControllerException;

/**
 * 
 * @ClassName: ClassTemplate    <br />
 * @Description: 用于获取类的模板   <br />
 * @author wys 804253217@qq.com    <br />
 * @date 2016年1月6日 下午7:01:07    <br />
 *
 */
public abstract class ClassTemplate {
	protected final String packageName;
	protected ClassTemplate(String packageName){
		this.packageName = packageName;
	}
	
	private static ClassLoader getClassLoader(){
		return Thread.currentThread().getContextClassLoader();
	}
	
	private static Class<?> loadClass(String className,boolean isInitialized){
		Class<?> cls = null;
		try {
			cls = Class.forName(className,isInitialized,getClassLoader());
		} catch (ClassNotFoundException e) {
			throw new ControllerException("load class error " +e.getMessage());
		}
		return cls;
	}
	
	public final List<Class<?>> getClassList(){
		List<Class<?>> classlist = new ArrayList<Class<?>>();
		try {
			// from package get URL sources
			Enumeration<URL> urls  = getClassLoader().getResources(packageName.replace(".", "/"));
			//while URL sources
			while(urls.hasMoreElements()){
				URL url = urls.nextElement();
				if(url != null){
					String protocol = url.getProtocol();
					if(protocol.equals("file")){ // is file type
						String packagePath = url.getPath().replaceAll("%20", " ");
						addClass(classlist, packagePath, packagePath);
					}else if(protocol.equals("jar")){ // type is jar 
						JarURLConnection jarURLConnection = (JarURLConnection) url.openConnection();
                        JarFile jarFile = jarURLConnection.getJarFile();
                        Enumeration<JarEntry> jarEntries = jarFile.entries();
                        while (jarEntries.hasMoreElements()) {
                            JarEntry jarEntry = jarEntries.nextElement();
                            String jarEntryName = jarEntry.getName();
                            if (jarEntryName.endsWith(".class")) {
                                String className = jarEntryName.substring(0, jarEntryName.lastIndexOf(".")).replaceAll("/", ".");
                                doAddClass(classlist, className);
                            }
                        }
					}
				}
			}
		} catch (IOException e) {
			throw new ControllerException("get class error "+e.getMessage());
		}
		return classlist;
	}
	
	private void addClass(List<Class<?>> classList, String packagePath, String packageName) {
        try {
        	// get package path class file or directory
            File[] files = new File(packagePath).listFiles(new FileFilter() {
				@Override
				public boolean accept(File file) {
					return (file.isFile() && file.getName().endsWith(".class")) || file.isDirectory();
				}
			});
            for (File file : files) {
                String fileName = file.getName();
                if (file.isFile()) {
                    String className = fileName.substring(0, fileName.lastIndexOf("."));
                    if (StringUtils.isNotEmpty(packageName)) {
                        className = packageName + "." + className;
                    }
                    doAddClass(classList, className);
                } else {
                    String subPackagePath = fileName;
                    if (StringUtils.isNotEmpty(packagePath)) {
                        subPackagePath = packagePath + "/" + subPackagePath;
                    }
                    String subPackageName = fileName;
                    if (StringUtils.isNotEmpty(packageName)) {
                        subPackageName = packageName + "." + subPackageName;
                    }
                    addClass(classList, subPackagePath, subPackageName);
                }
            }
        } catch (Exception e) {
            throw new ControllerException("add class error"+e.getMessage());
        }
    }

    private void doAddClass(List<Class<?>> classList, String className) {
        Class<?> cls = loadClass(className, false);
        if (checkAddClass(cls)) {
            classList.add(cls);
        }
    }

    /**
     * 验证是否允许添加类
     */
    public abstract boolean checkAddClass(Class<?> cls);

}
