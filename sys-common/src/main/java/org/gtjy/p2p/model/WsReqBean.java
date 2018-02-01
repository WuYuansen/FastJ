package org.gtjy.p2p.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * @类名称: WsReqBean
 * @说明: WebService参数封装
 * @作者: Loser森 javaer0415@gmail.com
 * @创建时间: 2017年3月1日 下午6:15:26
 */
@XmlRootElement(name="RequestParameter")
public class WsReqBean<T> {
	private WsReqHead head;
	private Object body;
	
	@XmlElement(name="CTRL-INFO")
	public WsReqHead getHead() {
		return head;
	}

	public void setHead(WsReqHead head) {
		this.head = head;
	}
	@XmlElement(name="PARAMETERS")
	public Object getBody() {
		return body;
	}

	public void setBody(Object body) {
		this.body = body;
	}
}