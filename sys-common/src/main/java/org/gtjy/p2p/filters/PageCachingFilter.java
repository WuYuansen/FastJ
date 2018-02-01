package org.gtjy.p2p.filters;


import org.gtjy.p2p.util.CacheUtil;

import net.sf.ehcache.CacheManager;
import net.sf.ehcache.constructs.web.filter.SimplePageCachingFilter;

/**
 * 
 * 
 * PageCachingFilter <br>
 * 页面高速缓存
 * 2015年6月19日 下午1:52:44
 * @author：wys
 * @version 1.0.0
 *
 */
public class PageCachingFilter extends SimplePageCachingFilter {

    @Override
    protected CacheManager getCacheManager() {
        return CacheUtil.getCacheManager();
    }
    
}
