package com.gtjy.p2p.modules.tiles.sys.interfaces;

import java.util.List;
import java.util.Map;

import com.gtjy.p2p.modules.sys.dto.UserDTO;

/**
 * 
 * <p> Title:${className} 接口</p>
 * <p> Description:  ${codeName}</p>
 * <p> Copyright: Copyright (c) 2015 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
 
public interface I${className} {
    /**
     * 
     * selectAll(查询所有)
     * (这里描述这个方法适用条件 – 可选)
     * @return 
     * @return List
     * @exception 
     * @version  1.0.0
     */
    public List<${className}DTO> selectAll(Map<String,Object> map);
    
    public List<${className}DTO> selectByPaging()
}
