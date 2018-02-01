package com.gtjy.p2p.modules.sys.DAO;

import java.util.Map;

import org.gtjy.p2p.web.base.IBaseMapper;
import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.BoException;

import com.gtjy.p2p.modules.sys.dto.User;
/**
 * 
 * <p> Title: Ygxx Mapper</p>
 * <p> Description: 记录部门员工的信息 </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */

public interface UserDAO<T> extends IBaseMapper<T> {
    public User validateUserName(String userName) throws BoException;
    public User validateUserNameAndPwd(Map<?,?> map) throws BoException;
}
