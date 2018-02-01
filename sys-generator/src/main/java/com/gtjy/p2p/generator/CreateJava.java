package com.gtjy.p2p.generator;

import java.io.File;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.velocity.VelocityContext;

@SuppressWarnings("all")
public class CreateJava {
	private static String url= "jdbc:oracle:thin:@192.168.2.111:1521:orcl"; 
	private static String username =  "sjgj";
	private static String passWord = "sjgj";

	 //项目跟路径路径，此处修改为你的项目路径
	private static String rootPath = "D:\\Generator\\";//getRootPath();// "F:\\openwork\\open\\";
	private static String actionPath = "D:\\Generator\\";

	private static void executeProcedure() throws SQLException  {
	    CreateBean createBean=new CreateBean();
        createBean.setORACLEInfo(url, username, passWord);
        System.out.println(createBean.getConnection());
        Connection conn = null;
        CallableStatement cstmt = null;
        ResultSet rs = null;
        try {
            conn = createBean.getConnection();
            cstmt = conn.prepareCall("{CALL P_JK_JKDFB( ?, ?, ?, ?, ?, ?, ?, ?, ? )}");
            cstmt.setInt(1, 3);
            cstmt.setInt(2, 4);
            cstmt.setDate(3, new Date(System.currentTimeMillis()));
            cstmt.setDate(4, new Date(System.currentTimeMillis()));
            cstmt.setDate(5, new Date(System.currentTimeMillis()));
            cstmt.setString(6, "电脑");
            cstmt.setString(7, "192.168.2.111");
            cstmt.registerOutParameter(8,java.sql.Types.INTEGER);
            cstmt.registerOutParameter(9, java.sql.Types.VARCHAR);
            cstmt.execute();
            System.out.println(cstmt.getString(9));
//            while (rs.next()) {
//                String te = rs.getString(1);
//                System.out.println("te:" + te);
//            }
        } catch (Exception e) {
            System.out.println("e: " + e);
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                cstmt.close();
                conn.close();
            } catch (Exception ex) {
                System.out.println("ex:" + ex);
            }
        }
	}
	
	
	/**
	 * 
	 * @param module  js 模块
	 * @param tableName
	 * @param codeName
	 */
	private static void generatorCode(String module,String tableName,String codeName){
		 CreateBean createBean=new CreateBean();
		 createBean.setORACLEInfo(url, username, passWord);
		 /** 此处修改成你的 表名 和 中文注释***/
//		 String tableName="TB_SOURCE"; //
//		 String codeName ="系统资源管理（菜单，模块）";//中文注释  当然你用英文也是可以的 
		 String className= createBean.getTablesNameToClassName(tableName);
		 String lowerName =className.substring(0, 1).toLowerCase()+className.substring(1, className.length());
		 
		 //根路径
		 String srcPath = rootPath + "src\\";
		 String pckPath = rootPath + "src\\com\\gtjy\\p2p\\modules\\";
		 //页面路径，放到WEB-INF下面是为了不让手动输入路径访问jsp页面，起到安全作用
		 String webPath = rootPath + "view\\modules\\"; 
		 
		 //JS 定义路径
         String js_Path_model = "app.model";
         String js_Path_store = "app.store";
         String js_Path_view = "app.view";
         String js_Path_form = "app.view";
         String js_Path_window = "app.view";
         String js_Path_controller = "app.ctrl";
         String JS_PATH_viewmodel = "app.view.";
		 
		 String classPath = "com.gtjy.p2p.modules."+module; //类路径
		 String classPath1 = "com.gtjy.p2p.modules."+module; //类路径
		 
		 //java,xml文件名称
		 String modelPath = module+"\\dto\\"+className+"DTO.java";
		 String beanPath =  module+"\\dto\\"+className+".java";
		 String mapperPath = module+"\\DAO\\"+className+"DAO.java";
		 String servicePath = module+"\\impl\\I"+className+"Impl.java";
		 String IservicePath = module+"\\interfaces\\I"+className+".java";
		 String controllerPath = module+"\\controllers\\"+className+"Controller.java";
		 String sqlMapperPath = module+"\\mapper\\"+className+"DAO.xml";
		 //jsp页面路径
		 String pageEditPath = lowerName+"\\editor.jsp";
		 String pageListPath = lowerName+"\\index.jsp";
		 
//		 String ControllerJS = "ctrl\\"+module+"\\"+className+".js";
//         String ModelJS = "model\\"+module+"\\"+className+".js";
//         String StoreJS = "store\\"+module+"\\"+className+".js";
         String ViewJS =lowerName+"\\index.js";
         String FormJS = lowerName+"\\editor.js";
//         String viewmodelJS = module+"\\view\\"+className+"js";
		 
		
		VelocityContext context = new VelocityContext();
		context.put("className", className); //
		context.put("lowerName", lowerName);
		context.put("codeName", codeName);
		context.put("tableName", tableName);
		context.put("classPath",classPath);
		context.put("ctx","${ctx}");
		context.put("ctxStatic","${ctxStatic}");
		context.put("s", "$");
		context.put("classPath1",classPath1);
		
		context.put("JS_PATH_model", js_Path_model+"."+module);
        context.put("JS_PATH_store", js_Path_store+"."+module);
        context.put("JS_PATH_view", js_Path_view+"."+module);
        context.put("JS_PATH_window", js_Path_view+"."+module);
        context.put("JS_PATH_form", js_Path_view+"."+module);
        context.put("JS_PATH_controller", js_Path_controller+"."+module);
        context.put("JS_PATH_viewmodel", JS_PATH_viewmodel+"."+module);
        
		
		/******************************生成bean字段*********************************/
		try{
			context.put("feilds",createBean.getBeanFeilds(tableName)); //生成bean
		}catch(Exception e){
			e.printStackTrace();
		}

		/*******************************生成sql语句**********************************/
		try{
			Map<String,Object> sqlMap=createBean.getAutoCreateSql(tableName);
			context.put("columnDatas",createBean.getColumnDatas(tableName)); //生成bean
			context.put("SQL",sqlMap);
		}catch(Exception e){
			e.printStackTrace();
			return;
		}
		
//		
		//-------------------生成文件代码---------------------/
		CommonPageParser.WriterPage(context, "TempBean.java",pckPath, beanPath);  //生成实体Bean
		CommonPageParser.WriterPage(context, "TempModel.java",pckPath,IservicePath); //生成Model
		CommonPageParser.WriterPage(context, "TempMapper.java", pckPath,mapperPath); //生成MybatisMapper接口 相当于Dao
		CommonPageParser.WriterPage(context, "ITempService.java", pckPath,IservicePath);//生成Service
		CommonPageParser.WriterPage(context, "TempService.java", pckPath,servicePath);//生成Service
		CommonPageParser.WriterPage(context, "TempMapper.xml",pckPath,sqlMapperPath);//生成Mybatis xml配置文件
		CommonPageParser.WriterPage(context, "TempController.java",pckPath, controllerPath);//生成Controller 相当于接口
//		生JSP页面，如果不需要可以注释掉
		CommonPageParser.WriterPage(context, "TempList.jsp",webPath, pageListPath);//生成Controller 相当于接口
		CommonPageParser.WriterPage(context, "TempEdit.jsp",webPath, pageEditPath);//生成Controller 相当于接口
		context.put("basePath", "${basePath}");
//		CommonPageParser.WriterPage(context, "TempController.js",webPath, ControllerJS);
//        CommonPageParser.WriterPage(context, "TempModel.js",webPath, ModelJS);
//        CommonPageParser.WriterPage(context, "TempStore.js",webPath, StoreJS);
        CommonPageParser.WriterPage(context, "TempView.js",webPath, ViewJS);
        CommonPageParser.WriterPage(context, "TempForm.js",webPath, FormJS);
//        CommonPageParser.WriterPage(context, "TempViewModel.js", webPath, viewmodelJS);
//        CommonPageParser.WriterPage(context, "TempWindow.js",webPath, WindowJS);
		
		/*************************修改xml文件*****************************/
		WolfXmlUtil xml=new WolfXmlUtil();
		Map<String,String> attrMap=new HashMap<String, String>();
		try{
		   /**   引入到mybatis-config.xml 配置文件 */
//			attrMap.clear();
//			attrMap.put("resource","com/"+className+"Mapper.xml");
//		    xml.getAddNode(rootPath+"conf/mybatis-config.xml", "/configuration/mappers", "mapper", attrMap, "");
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	

	public static void main(String[] args) {
		CreateBean createBean=new CreateBean();
		createBean.setORACLEInfo(url, username, passWord);
		String table_fix = "SJGJ_YJJY"; //表
		String module = "sjgj"; //模块分类
		List<ITable> Itables =  createBean.getTable(table_fix);
		for(ITable table : Itables){
			generatorCode(module,table.getTableName(), org.apache.commons.lang.StringUtils.isEmpty(table.getTableRemark())?"此表为添加说明信息":table.getTableRemark());
		}
		System.out.println("代码生成完毕");
	}
	
	
	/**
	 * 获取项目的路径
	 * @return
	 */
	public static String getRootPath(){
		String rootPath ="";
		try{
			 File file = new File(CommonPageParser.class.getResource("/").getFile());
			 rootPath = file.getParentFile().getParentFile().getParent()+"\\";
			 rootPath = java.net.URLDecoder.decode(rootPath,"utf-8");
			 System.out.println(rootPath);
			 return rootPath;
		}catch(Exception e){
			e.printStackTrace();
		}
		return rootPath;
	}
}
