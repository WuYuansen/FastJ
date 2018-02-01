/**
 * 模拟实现 LocalStorage
 * @author wys
 */
Ext.define('app.util.LocalStore',{
	singleton: true,
	constructor : function(){
		this.count = 0;
		this.entrySet = {};
	},
	constructor : function(map){
		this.entrySet = map;
		for(var key in this.entrySet){
			if(!this.containsKey(key)){
				this.count++;
			}
		}
	},
	size : function() { /* 得到当前数量 */
        return this.count;
    },
    isEmpty : function(){ /* 判断是否我空 */
    	return this.count === 0;
    },
    containsKey : function(key){ /* 判断是否包含 */
    	if(!this.isEmpty){
    		return false;
    	}
    	return (key in this.entrySet);
    },
    getItem : function(key){/* 获取本地数据 */
    	if(!this.isEmpty){
    		return null;
    	}
    	if(this.containsKey(key)){
    		return this.entrySet[key];
    	}else{
    		return null;
    	}
    },
    putItem : function(key,value){ /* 设置数据到本地存储*/
    	this.entrySet[key] = value;
    	if(this.containsKey(key)){
    		this.count++;
    	}
    },
    removeItem : function(key){ /* 删除本地数据节点 */
    	if(this.containsKey(key)){
    		delete this.entrySet[key];
    		this.count--;
    	}
    },
    clear : function() { /* 清空 */
        for ( var key in this.entrySet) {
            this.removeItem(key);
        }
    },
    valueOf : function(){ /* 格式化 */
    	return this.toString();
    },
    toString : function(){ /* 格式化JSON */
    	var result = [];
    	for(var key in this.entrySet){
    		result.push(key + ':' + this.entrySet[key])
    	}
    	return '{'+result.join()+'}';
    }
},function () {
    window.localData = this;
});