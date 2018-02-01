/**  
 * ━━━━━━神兽出没━━━━━━
    * 　　　┏┓　　　┏┓
    * 　　┏┛┻━━━┛┻┓
    * 　　┃　　　　　　　┃
    * 　　┃　　　━　　　┃
    * 　　┃　┳┛　┗┳　┃
    * 　　┃　　　　　　　┃
    * 　　┃　　　┻　　　┃
    * 　　┃　　　　　　　┃
    * 　　┗━┓　　　┏━┛
    * 　　　　┃　　　┃神兽保佑, 永无BUG!
    * 　　　　┃　　　┃Code is far away from bug with the animal protecting
    * 　　　　┃　　　┗━━━┓
    * 　　　　┃　　　　　　　┣┓
    * 　　　　┃　　　　　　　┏┛
    * 　　　　┗┓┓┏━┳┓┏┛
    * 　　　　　┃┫┫　┃┫┫
    * 　　　　　┗┻┛　┗┻┛
 * ━━━━━━感觉萌萌哒━━━━━━
 * Copyright © 2017 Loser森 javaer0415@gmail.com. All rights reserved.
 * @标题: WsRespBean.java
 * @所属项目: sys-common
 * @包路径: org.gtjy.p2p.model
 * @说明: WebService响应体
 * @作者: Loser森 javaer0415@gmail.com
 * @创建时间: 2017年3月7日 上午11:11:58
 * @版本号: V1.0
 */
package org.gtjy.p2p.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * @类名称: WsRespBean
 * @说明: WebService响应体
 * @作者: Loser森 javaer0415@gmail.com
 * @创建时间: 2017年3月7日 上午11:11:58
 */
@XmlRootElement(name="ResponseParameter")
public class WsRespBean {
	private WsRespHead head;
	
	private String responseCode="00000";
	private String responseDesc="执行成功";
	
	@XmlElement(name="RESPONSE-INFO")
	public WsRespHead getHead() {
		return head;
	}

	public void setHead(WsRespHead head) {
		this.head = head;
	}

	@XmlElement(name="RESPONSECODE")
	public String getResponseCode() {
		return responseCode;
	}

	public void setResponseCode(String responseCode) {
		this.responseCode = responseCode;
	}
	@XmlElement(name="RESPONSEDESC")
	public String getResponseDesc() {
		return responseDesc;
	}

	public void setResponseDesc(String responseDesc) {
		this.responseDesc = responseDesc;
	}
}