package com.gtjy.junit;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.gtjy.p2p.JSON.JSONUtil;
import org.gtjy.p2p.util.excel.ExcelUtil;

public class ExcelJunit {
	
	public static void testGenerateSingleSheetExcelFile() {
		File template = new File("E:/projectWorkspack/gtjyFramework/sys-portal-bootstrap/src/main/resources/expTemplate/电梯维保情况统计报表.xls");
		File target = new File("E:/out_电梯维保情况统计报表.xls");
		// 准备离散数据
		Map<String, Object> discreteData = new HashMap<String, Object>();
		discreteData.put("tjzq", "2015-05-03 至 2015-06-01");
		discreteData.put("qy", "全疆");
		discreteData.put("sycs", "全部场所");
		discreteData.put("wbsl", 0);
		discreteData.put("wbslzb", 0);
		discreteData.put("cqsl", 0);
		discreteData.put("cqzb", 0);
		discreteData.put("dzwbsl", 0);
		discreteData.put("dzwbzb", 0);
		discreteData.put("dtzs", 0);
		discreteData.put("zbr", "系统管理员");
		discreteData.put("zbsj","2017年6月1日17:47:42");
		// 准备列表数据
		List<Map<String, Object>> listData = new ArrayList<Map<String, Object>>();
		for(int i=0;i<5;i++){
			Map<String, Object> map1 = new HashMap<String,Object>();
			map1.put("a", i);
			map1.put("b", "乌鲁木齐市"+i);
			map1.put("c", 30);
			map1.put("d", 40);
			map1.put("e", 40);
			map1.put("f", 40);
			map1.put("j", 40);
			map1.put("h", 40);
			map1.put("i", 40);
			listData.add(map1);
		}
		System.out.println(listData.size());
		String[] columns = new String[] {"a","b","c","d","e","f","j","h","i"};
		try {
			boolean isSuccess = ExcelUtil.generateSingleSheetExcelFile(
					template, target, discreteData, listData, columns, "list0");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		String json = "{\"Vehicle\": \"新BA4798\",\"AlarmType\": \"掉线异常\",\"BTime\": \"2018/1/15 12:57:29\",\"BPlaceName\": \"新疆维吾尔自治区昌吉回族自治州奇台县S327北2.7公里(普通路)\",\"ETime\": ,\"EPlaceName\": ,\"AlarmContent\": \"掉线异常(2018-01-15 12:57:29)\",\"Duration\": 0}";
		Map<String,Object> js = (Map<String,Object>)JSONUtil.convertJsonByObject(json, Map.class);
		
	}
}
