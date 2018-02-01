package com.gtjy.p2p.generator;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.gtjy.p2p.util.StringUtils;

@SuppressWarnings("all")
public class CreateBean {
	private Connection connection = null;
	static String url;   
	static String username ;
	static String password ;
	static String rt="\r\t";
	String SQLTables="show tables";
	static{
	try{
		Class.forName("oracle.jdbc.driver.OracleDriver"/*"com.mysql.jdbc.Driver"*/);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	@SuppressWarnings("static-access")
	public void setORACLEInfo(String url,String username,String password){
		   this.url=url;
		   this.username=username;
		   this.password=password;
	}
	public void setConnection(Connection connection) {
		this.connection = connection;
	}
	public Connection getConnection() throws SQLException{
		return DriverManager.getConnection(url, username, password);
	}
	private static Connection getCon()  throws SQLException{
	    return DriverManager.getConnection(url, username, password);
	}
	
    public List<String> getTables() throws SQLException{
    	Connection con=this.getConnection();
    	PreparedStatement ps= con.prepareStatement(SQLTables);
    	ResultSet rs=ps.executeQuery();
    	List<String> list=new ArrayList<String>();
    	while(rs.next()){
    		String tableName=rs.getString(1);
    		list.add(tableName);
    	}
    	rs.close();
		ps.close();
		con.close();
		return list;
	}
    
    /**
     * 查询表的字段，封装成List
     * @param tableName
     * @return
     * @throws SQLException
     */
    public List<ColumnData> getColumnDatas(String tableName) throws SQLException{
    	String SQLColumns="select a.COLUMN_NAME,a.DATA_TYPE,a.data_scale,(select b.comments from  USER_COL_COMMENTS b where b.table_name=a.TABLE_NAME and b.column_name=a.COLUMN_NAME) as COMMENTS from user_tab_columns a where  a.table_name='"+tableName+"' order by a.column_id asc";
//        String SQLColumns="SELECT COLUMN_NAME,DATA_TYPE,NUMERIC_SCALE,COLUMN_COMMENT from information_schema.columns where table_name='"+tableName+"' and table_schema='gas'";
        Connection con=this.getConnection();
    	PreparedStatement ps=con.prepareStatement(SQLColumns);
    	List<ColumnData>  columnList= new ArrayList<ColumnData>();
        ResultSet rs=ps.executeQuery();
        StringBuffer str = new StringBuffer();
		StringBuffer getset=new StringBuffer();
        while(rs.next()){
        	String name = rs.getString(1).toLowerCase();
        	String type = rs.getString(2);
        	String scale = rs.getString(3); //小数位数
			type=this.getType(type);
			ColumnData cd= new ColumnData();
			cd.setColumnName(name);
			cd.setDataType(type);
			cd.setColumnComment(rs.getString("COMMENTS"));
			columnList.add(cd);
        }
        argv=str.toString();
        method=getset.toString();
		rs.close();
		ps.close();
		con.close();
		return columnList;
    }
    
    public List<ITable> getTable(String table_fix){
    	List<ITable> tableList = new ArrayList<ITable>();
    	String sql = "select a.TABLE_NAME,b.COMMENTS from user_tables a,user_tab_comments b WHERE a.TABLE_NAME=b.TABLE_NAME and a.TABLE_NAME like '"+table_fix+"' order by TABLE_NAME";
//    	String sql = "SELECT TABLE_NAME,TABLE_COMMENT from information_schema.tables where TABLE_NAME like '"+table_fix+"' and table_schema='gas'";
    	try {
			Connection con=this.getConnection();
			PreparedStatement ps=con.prepareStatement(sql);
			List<ColumnData>  columnList= new ArrayList<ColumnData>();
			ResultSet rs=ps.executeQuery();
			ITable table;
			while(rs.next()){
				table = new ITable();
				table.setTableName(rs.getString(1));
				table.setTableRemark(rs.getString(2));
				tableList.add(table);
			}
		} catch (SQLException e) {
			System.err.println("获取表信息失败");
			e.printStackTrace();
		}
    	return tableList;
    }
    
    private String method;
    private String argv;
    
    /**
     * 生成实体Bean 的属性和set,get方法
     * @param tableName
     * @return
     * @throws SQLException
     */
    public String getBeanFeilds(String tableName) throws SQLException{
    	List<ColumnData> dataList = getColumnDatas(tableName);
    	StringBuffer str = new StringBuffer();
    	StringBuffer getset = new StringBuffer();
        for(ColumnData d : dataList){
        	String name = d.getColumnName();
			String type =  d.getDataType();
			String comment =  d.getColumnComment();
//			type=this.getType(type);
			String maxChar=name.substring(0, 1).toUpperCase();
			str.append("\r\t").append("private ").append(type+" ").append(name).append(";//   ").append(comment);
			String method=maxChar+name.substring(1, name.length());
			getset.append("\r\t").append("public ").append(type+" ").append("get"+method+"() {\r\t");
			getset.append("    return this.").append(name).append(";\r\t}");
			getset.append("\r\t").append("public void ").append("set"+method+"("+type+" "+name+") {\r\t");
			getset.append("    this."+name+"=").append(name).append(";\r\t}");
        }
        argv=str.toString();
        method=getset.toString();
		return argv+method;
    }
    /**
     * 
     * <br>
     * <b>功能：</b>详细的功能描述<br>
     * <b>日期：</b> 2011-12-20 <br>
     * @param tableName
     * @return 
     * @throws SQLException
     */
//    public List<Map<String,String>> getColumnsMap(String tableName) throws SQLException{
//    	String SQLColumns="SELECT distinct COLUMN_NAME, DATA_TYPE, COLUMN_COMMENT FROM information_schema.columns WHERE  table_schema = 'gas' and table_name =  '"+tableName+"' ";
////    	String SQLColumns="desc "+tableName;
//    	Connection con=this.getConnection();
//    	PreparedStatement ps=con.prepareStatement(SQLColumns);
//    	List<Map<String,String>> listMap=new ArrayList<Map<String,String>>();
//        ResultSet rs=ps.executeQuery();
//        while(rs.next()){
//        	Map<String,String> columnsMap=new HashMap<String, String>();
////        	String name = rs.getString(1);
////			String type = rs.getString(2);
////			String comment = rs.getString(3);
//			
//			
//			String name = rs.getString(1);
//			String type = rs.getString(2);
//			String comment = rs.getString(3);
//			type=this.getType(type);
//			columnsMap.put("COLUMN_NAME", name);
//			columnsMap.put("DATA_TYPE", type);
//			columnsMap.put("COLUMN_COMMENT", comment);
//			listMap.add(columnsMap);
//        }
//		rs.close();
//		ps.close();
//		con.close();
//		return listMap;
//    }
    
    public String getType(String type){
    	type=type.toLowerCase();
    	if("char".equals(type) || "varchar".equals(type) || "text".equals(type) || "varchar2".equals(type)){
			return "String";
		}else if("int".equals(type) ||"number".equals(type) ){
			return "Long";
		}else if("bigint".equals(type)){
			return "Integer";
		}else if("timestamp".equals(type) || "date".equals(type) || "time".equals(type) || "datetime".equals(type)){
			return "java.util.Date";
		}else if("decimal".equals(type)){
			return "java.math.BigDecimal";
		}
    	return null;
    }
    public void getPackage(int type,String createPath, String content,String packageName,String className,String extendsClassName,String ... importName) throws Exception{
    	if(null==packageName){
    		packageName="";
    	}
    	StringBuffer sb=new StringBuffer();
    	sb.append("package ").append(packageName).append(";\r");
    	sb.append("\r");
    	for(int i=0;i<importName.length;i++){
    		sb.append("import ").append(importName[i]).append(";\r");
    	}
    	sb.append("\r");
    	sb.append("/**\r *  entity. @author wys Date:"+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())+"\r */");
    	sb.append("\r");
    	sb.append("\rpublic class ").append(className);
    	if(null!=extendsClassName){
    		sb.append(" extends ").append(extendsClassName);
    	}
    	if(type==1){ //bean
    	   sb.append(" ").append("implements java.io.Serializable {\r");
    	}else{
    		sb.append(" {\r");
    	}
    	sb.append("\r\t");
    	sb.append("private static final long serialVersionUID = 1L;\r\t");
    	String temp=className.substring(0, 1).toLowerCase();
    	temp+= className.substring(1, className.length());
    	if(type==1){
    	sb.append("private "+className+" "+temp+"; // entity ");
    	}
    	sb.append(content);
    	sb.append("\r}");
    	System.out.println(sb.toString());
    	this.createFile(createPath, "", sb.toString());
    }
   
    /**
     * 
     * <br>
     * <b>功能：</b>表名转换成类名 每_首字母大写<br>
     * <b>日期：</b> 2011-12-21 <br>
     * @param tableName
     * @return
     */
    public String getTablesNameToClassName(String tableName){
        String [] split=tableName.split("_");
        StringBuffer sb = new StringBuffer();
        if(split.length == 2){
        	sb.append(StringUtils.firstToUpperAllLower(split[1]));
        }
        if(split.length == 3){
        	sb.append(StringUtils.firstToUpperAllLower(split[1]));
        	sb.append(StringUtils.firstToUpperAllLower(split[2]));
        }
        if(split.length == 4){
        	sb.append(StringUtils.firstToUpperAllLower(split[1]));
        	sb.append(StringUtils.firstToUpperAllLower(split[2]));
        	sb.append(StringUtils.firstToUpperAllLower(split[3]));
        }
        if(split.length == 5){
        	sb.append(StringUtils.firstToUpperAllLower(split[1]));
        	sb.append(StringUtils.firstToUpperAllLower(split[2]));
        	sb.append(StringUtils.firstToUpperAllLower(split[3]));
        	sb.append(StringUtils.firstToUpperAllLower(split[4]));
        }
        return sb.toString();
        /*if(split.length>1){
            StringBuffer sb=new StringBuffer();
//            for(int i=0;i<split.length;i++){
                String tempTableName=split[2].substring(0, 1).toUpperCase()+split[2].substring(1, split[2].length());
                sb.append(tempTableName);
//            }
            System.out.println(sb.toString());
            return StringUtils.firstToUpperAllLower(sb.toString());
        }else{
            String tempTables=split[0].substring(0, 1).toUpperCase()+split[0].substring(1, split[0].length());
            return StringUtils.firstToUpperAllLower(tempTables);
        }*/
    }
    
    public static void main(String[] args) {
    	CreateBean bean = new CreateBean();
		System.out.println(bean.getTablesNameToClassName("xt_p_bean"));
		System.out.println(bean.getTablesNameToClassName("xt_bean"));
	}
    
    /**
     * 
     * <br>
     * <b>功能：</b>创建文件<br>
     * <b>日期：</b> 2011-12-21 <br>
     * @param path
     * @param fileName
     * @param str
     * @throws IOException
     */
   public void createFile(String path,String fileName,String str) throws IOException{
    	FileWriter writer=new FileWriter(new File(path+fileName));
    	writer.write(new String(str.getBytes("utf-8")));
    	writer.flush();
    	writer.close();
    }
   /**
    * 
    * <br>
    * <b>功能：</b>生成sql语句<br>
    * <b>日期：</b> 2011-12-21 <br>
    * @param tableName
    * @throws Exception
    */
    static String selectStr="select ";
    static String from=" from ";
    
    public Map<String,Object> getAutoCreateSql(String tableName) throws Exception{
   	 	 Map<String,Object> sqlMap=new HashMap<String, Object>();
   	 	 List<ColumnData> columnDatas = getColumnDatas(tableName);
	     String columns=this.getColumnSplit(columnDatas);
	     String[] columnList =  getColumnList(columns);  //表所有字段
	     String columnFields =  getColumnFields(columns); //表所有字段 按","隔开
	     String insert="insert into "+tableName+"("+columns.replaceAll("\\|", ",")+")\n values(#{"+columns.replaceAll("\\|", "},#{")+"})";
	     String update= getUpdateSql(tableName, columnList);
	     String updateSelective = getUpdateSelectiveSql(tableName, columnDatas);
	     String selectById = getSelectByIdSql(tableName, columnList);
	     String delete = getDeleteSql(tableName, columnList);
	     sqlMap.put("columnList",columnList);
	     sqlMap.put("columnFields",columnFields);
	     sqlMap.put("insert", insert.replace("#{createTime}", "getdate()").replace("#{updateTime}", "getdate()"));
	     sqlMap.put("update", update.replace("#{createTime}", "getdate()").replace("#{updateTime}", "getdate()"));
	     sqlMap.put("delete", delete);
	     sqlMap.put("updateSelective", updateSelective);
	     sqlMap.put("selectById", selectById);
	     return sqlMap;
   }
    
    /**
     * delete 
     * @param tableName
     * @param columnsList
     * @return
     * @throws SQLException
     */
    public String getDeleteSql( String tableName,String[] columnsList)throws SQLException{
   	 StringBuffer sb=new StringBuffer();
   	 sb.append("delete ");
	     sb.append("\t from ").append(tableName).append(" where ");
	     sb.append(columnsList[0]).append(" = #{").append(columnsList[0]).append("}");
   	return sb.toString();
   }
    
    /**
     * 根据id查询
     * @param tableName
     * @param columnsList
     * @return
     * @throws SQLException
     */
    public String getSelectByIdSql( String tableName,String[] columnsList)throws SQLException{
    	 StringBuffer sb=new StringBuffer();
    	 sb.append("select <include refid=\"Base_Column_List\" /> \n");
 	     sb.append("\t from ").append(tableName).append(" where ");
 	     sb.append(columnsList[0]).append(" = #{").append(columnsList[0]).append("}");
    	return sb.toString();
    }
    
    /**
     * 获取所有的字段，并按","分割
     * @param columns
     * @return
     * @throws SQLException
     */
    public String getColumnFields(String columns)throws SQLException{
    	String fields = columns;
    	if(fields != null && !"".equals(fields)){
    		fields = fields.replaceAll("[|]", ",");
    	}
    	return fields;
    }
    
    /**
     * 
     * @param columns
     * @return
     * @throws SQLException
     */
    public String[] getColumnList(String columns)throws SQLException{
    	 String[] columnList=columns.split("[|]");
	     return columnList;
    }
    
    /**
     * 修改记录
     * @param tableName
     * @param columnsList
     * @return
     * @throws SQLException
     */
    public String getUpdateSql(String tableName,String[] columnsList)throws SQLException{
    	 StringBuffer sb=new StringBuffer();
    	 
	     for(int i=1;i<columnsList.length;i++){
	    	  String column=columnsList[i];
	    	  if("CREATETIME".equals(column.toUpperCase()))
	    		  continue;
	    	  
	    	  if("UPDATETIME".equals(column.toUpperCase()))
	    		  sb.append(column+"=getdate()");
	    	  else
	    		  sb.append(column+"=#{"+column+"}");
	    	  //最后一个字段不需要","
	    	  if((i+1) < columnsList.length){
	    		  sb.append(",");
	    	  }
	     }
    	 String update = "update "+tableName+" set "+sb.toString()+" where "+columnsList[0]+"=#{"+columnsList[0]+"}";
	     return update;
    }
    
    public String getUpdateSelectiveSql(String tableName,List<ColumnData> columnList)throws SQLException{
   	 StringBuffer sb=new StringBuffer();
   	    ColumnData cd = columnList.get(0); //获取第一条记录，主键
   	 	sb.append("\t<trim  suffixOverrides=\",\" >\n");
   	 	 for(int i=1;i<columnList.size();i++){
   	 		 ColumnData data = columnList.get(i);
   	 		 String columnName=data.getColumnName();
   	 		 sb.append("\t<if test=\"").append(columnName).append(" != null ");
   	 		 //String 还要判断是否为空
   	 		 if("String" == data.getDataType()){
   	 			sb.append(" and ").append(columnName).append(" != ''");
   	 		 }
   	 		 sb.append(" \">\n\t\t");
   	 		 sb.append(columnName+"=#{"+columnName+"},\n");
   	 		 sb.append("\t</if>\n");
	     }
	     sb.append("\t</trim>");
	     String update = "update "+tableName+" set \n"+sb.toString()+" where "+cd.getColumnName()+"=#{"+cd.getColumnName()+"}";
	     return update;
   }
   
    
    
    /**
     * 
     * <br>
     * <b>功能：</b>获取所有列名字<br>
     * <b>日期：</b> 2011-12-21 <br>
     * @param tableName
     * @return
     * @throws SQLException
     */
    public String getColumnSplit(List<ColumnData> columnList) throws SQLException{
 	     StringBuffer commonColumns=new StringBuffer();
 	     for(ColumnData data : columnList){
 	    	 commonColumns.append(data.getColumnName()+"|");
 	     }
 	     return commonColumns.delete(commonColumns.length()-1, commonColumns.length()).toString();
    }
    
}
