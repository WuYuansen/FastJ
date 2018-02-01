package org.gtjy.p2p.util.xml;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.gtjy.p2p.model.WsRespBean;
import org.gtjy.p2p.model.WsRespHead;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

/**
 * Xml文件处理类 用于完成对xml文件的创建、修改操作。
 * 
 * @author wys
 */
public class XmlHelper {
	/**
	 * @方法名: gernateBeanToXml
	 * @方法说明: 实体类转换为XML webService报文使用
	 * @param t 
	 * @return: String
	 */
	public static String gernateBeanToXml(Object reqBean){
		String xml = "";
		Writer writer = null;
		try {
			JAXBContext context = JAXBContext.newInstance(reqBean.getClass());
			Marshaller ms = context.createMarshaller();
			ms.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			writer = new StringWriter();
			ms.marshal(reqBean,writer);
			xml = writer.toString();
		} catch (Exception e) {
			e.printStackTrace();
		} finally{
			try {
				writer.flush();
				writer.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return xml;
	}
	
	/**
	 * @方法名: gernateXmlToBean
	 * @方法说明: 将字符串转换为Bean webService报文使用
	 * @param xmlStr xml字符串
	 * @return: T
	 * @throws ParserConfigurationException 
	 * @throws IOException 
	 * @throws SAXException 
	 */
	@SuppressWarnings("all")
	public static Document gernateXmlToObj(String xmlStr){
		try {
			StringReader sr = new StringReader(xmlStr);
			InputSource is = new InputSource(sr);
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder=factory.newDocumentBuilder();
			Document doc = (Document) builder.parse(is);
			return doc;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@SuppressWarnings("all")
	public static void main(String[] args) { 
		WsRespBean ws = new WsRespBean();
		WsRespHead head = new WsRespHead();
		head.setAction("01");
		head.setRespInfo("01");
		head.setTimeStamp("201703011852");
		ws.setHead(head);
		ws.setResponseCode("00000");
		ws.setResponseDesc("调用成功");
		
		String xmlStr =  XmlHelper.gernateBeanToXml(ws);
		System.out.println(xmlStr);/*
		String xmlStr = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"+
						"<RequestParameter>"+
						"    <CTRL-INFO>"+
						"        <ACTION>01</ACTION>"+
						"        <REGCODE>10001</REGCODE>"+
						"        <REQINFO>01</REQINFO>"+
						"        <SESSIONKEY>b41d94018ec3028849e65b63f9b4e0d4</SESSIONKEY>"+
						"        <TIMESTAMP>201703011852</TIMESTAMP>"+
						"    </CTRL-INFO>"+
						"	<PARAMETERS>"+
						"        <DTJK>01</DTJK>"+
						"        <XXXX>10001</XXXX>"+
						"    </PARAMETERS>"+
						"</RequestParameter>";
		
		WsReqHead body = new WsReqHead();
		
		Document doc = XmlHelper.gernateXmlToObj(xmlStr);
		NodeList nodeArray = doc.getElementsByTagName("CTRL-INFO");
		for(int i=0;i<nodeArray.getLength();i++){
			Node node = nodeArray.item(i);
			if (node.getNodeType() == Node.ELEMENT_NODE) {
				Element eElement = (Element) node;
				body.setAction(eElement.getElementsByTagName("ACTION").item(0)==null?null:eElement.getElementsByTagName("ACTION").item(0).getTextContent());
				body.setRegCode(eElement.getElementsByTagName("REGCODE").item(0)==null?null:eElement.getElementsByTagName("REGCODE").item(0).getTextContent());
//				body.setReqInfo(eElement.getElementsByTagName("REQINFO").item(0)==null?null:eElement.getElementsByTagName("REQINFO").item(0).getTextContent());
				body.setTimeStamp(eElement.getElementsByTagName("TIMESTAMP").item(0)==null?null:eElement.getElementsByTagName("TIMESTAMP").item(0).getTextContent());
				body.setSessionKey(eElement.getElementsByTagName("SESSIONKEY").item(0)==null?null:eElement.getElementsByTagName("SESSIONKEY").item(0).getTextContent());
			}else{
				System.out.println("error");
			}
		}
		System.out.println("body>action"+body.getAction());
		Map<String,Object> res = BeanValidatorUtil.validateEntity(body);
		for (String key : res.keySet()) {
		    System.out.println(res.get(key));
		}
		System.out.println("校验结果："+res.toString());*/
	}
}
