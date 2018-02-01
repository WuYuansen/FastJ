/**
 *
 * <p> Title:CityPicker EXTJS MODEL</p>
 * <p> Description:  系统城市选择数据视图</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.CityDataModel',{
    extend:'Ext.app.ViewModel',
    alias:'viewmodel.cityDataModel',
    data:{},
    stores:{
        //根据接口拿到citypicker的所有城市数据
        pickerCities: {
            //type: 'store',
            //field: ['province','provinceText','city','cityText'],
            //
            //autoLoad: false,
            autoLoad: true,
            data:[
//				{"province": 650100,"city": 650100,"provinceText": "乌鲁木齐","cityText": "天山区"},
//				{"province": 650100,"city": 652201,"provinceText": "乌鲁木齐","cityText": "沙依巴克区"},
//				{"province": 650100,"city": 650101,"provinceText": "乌鲁木齐","cityText": "市辖区"},
//				{"province": 650100,"city": 650102,"provinceText": "乌鲁木齐","cityText": "天山区"},
//				{"province": 650100,"city": 650103,"provinceText": "乌鲁木齐","cityText": "沙依巴克区"},
//				{"province": 650100,"city": 650104,"provinceText": "乌鲁木齐","cityText": "新市区"},
//				{"province": 650100,"city": 650105,"provinceText": "乌鲁木齐","cityText": "水磨沟区"},
//				{"province": 650100,"city": 650106,"provinceText": "乌鲁木齐","cityText": "头屯河区"},
//				{"province": 650100,"city": 650107,"provinceText": "乌鲁木齐","cityText": "达坂城区"},
//				{"province": 650100,"city": 650109,"provinceText": "乌鲁木齐","cityText": "米东区"},
//				{"province": 650100,"city": 650121,"provinceText": "乌鲁木齐","cityText": "乌鲁木齐县"},
//				
//				{"province": 650200,"city": 650201,"provinceText": "克拉玛依市","cityText": "市辖区"},
//				{"province": 650200,"city": 650202,"provinceText": "克拉玛依市","cityText": "独山子区"},
//				{"province": 650200,"city": 650203,"provinceText": "克拉玛依市","cityText": "克拉玛依区"},
//				{"province": 650200,"city": 650204,"provinceText": "克拉玛依市","cityText": "白碱滩区"},
//				{"province": 650200,"city": 650205,"provinceText": "克拉玛依市","cityText": "乌尔禾区"},
//				    
//				          　　	         　
//				{"province": 650400,"city": 650402,"provinceText": "吐鲁番市","cityText": "高昌区"},
//				{"province": 650400,"city": 650421,"provinceText": "吐鲁番市","cityText": "鄯善县"},
//				{"province": 650400,"city": 650422,"provinceText": "吐鲁番市","cityText": "托克逊县"},
//				
//				       　　
//				{"province": 650500,"city": 650502,"provinceText": "哈密市","cityText": "伊州区"},
//				{"province": 650500,"city": 650521,"provinceText": "哈密市","cityText": "巴里坤哈萨克自治县"},
//				{"province": 650500,"city": 650522,"provinceText": "哈密市","cityText": "伊吾县"},
//				
//				{"province": 652300,"city": 652301,"provinceText": "昌吉回族自治州","cityText": "昌吉市"},
//				{"province": 652300,"city": 652302,"provinceText": "昌吉回族自治州","cityText": "阜康市"},
//				{"province": 652300,"city": 652323,"provinceText": "昌吉回族自治州","cityText": "呼图壁县"},
//				{"province": 652300,"city": 652324,"provinceText": "昌吉回族自治州","cityText": "玛纳斯县"},
//				{"province": 652300,"city": 652325,"provinceText": "昌吉回族自治州","cityText": "奇台县"},
//				{"province": 652300,"city": 652327,"provinceText": "昌吉回族自治州","cityText": "吉木萨尔县"},
//				{"province": 652300,"city": 652328,"provinceText": "昌吉回族自治州","cityText": "木垒哈萨克自治县"},
//				     　　
//				{"province": 652700,"city": 652701,"provinceText": "博尔塔拉蒙古自治州","cityText": "博乐市"},
//				{"province": 652700,"city": 652702,"provinceText": "博尔塔拉蒙古自治州","cityText":"阿拉山口市"},
//				{"province": 652700,"city": 652722,"provinceText": "博尔塔拉蒙古自治州","cityText":"精河县"},
//				{"province": 652700,"city": 652723,"provinceText": "博尔塔拉蒙古自治州","cityText":"温泉县"},
//				
//				{"province": 652800,"city": 652801,"provinceText": "巴音郭楞蒙古自治州","cityText": "库尔勒市"},
//				{"province": 652800,"city": 652822,"provinceText": "巴音郭楞蒙古自治州","cityText": "轮台县"},
//				{"province": 652800,"city": 652823,"provinceText": "巴音郭楞蒙古自治州","cityText": "尉犁县"},
//				{"province": 652800,"city": 652824,"provinceText": "巴音郭楞蒙古自治州","cityText": "若羌县"},
//				{"province": 652800,"city": 652825,"provinceText": "巴音郭楞蒙古自治州","cityText": "且末县"},
//				{"province": 652800,"city": 652826,"provinceText": "巴音郭楞蒙古自治州","cityText": "焉耆回族自治县"},
//				{"province": 652800,"city": 652827,"provinceText": "巴音郭楞蒙古自治州","cityText": "和静县"},
//				{"province": 652800,"city": 652828,"provinceText": "巴音郭楞蒙古自治州","cityText": "和硕县"},
//				{"province": 652800,"city": 652829,"provinceText": "巴音郭楞蒙古自治州","cityText": "博湖县"},
//				        　
//				{"province": 652900,"city": 652901,"provinceText": "阿克苏地区","cityText": "阿克苏市"},
//				{"province": 652900,"city": 652922,"provinceText": "阿克苏地区","cityText": "温宿县"},
//				{"province": 652900,"city": 652923,"provinceText": "阿克苏地区","cityText": "库车县"},
//				{"province": 652900,"city": 652924,"provinceText": "阿克苏地区","cityText": "沙雅县"},
//				{"province": 652900,"city": 652925,"provinceText": "阿克苏地区","cityText": "新和县"},
//				{"province": 652900,"city": 652926,"provinceText": "阿克苏地区","cityText": "拜城县"},
//				{"province": 652900,"city": 652927,"provinceText": "阿克苏地区","cityText": "乌什县"},
//				{"province": 652900,"city": 652928,"provinceText": "阿克苏地区","cityText": "阿瓦提县"},
//				{"province": 652900,"city": 652929,"provinceText": "阿克苏地区","cityText": "柯坪县"},
//				        　
//				{"province": 653000,"city": 653001,"provinceText": "克孜勒苏柯尔克孜自治州","cityText": "阿图什市"},
//				{"province": 653000,"city": 653022,"provinceText": "克孜勒苏柯尔克孜自治州","cityText": "阿克陶县"},
//				{"province": 653000,"city": 653023,"provinceText": "克孜勒苏柯尔克孜自治州","cityText": "阿合奇县"},
//				{"province": 653000,"city": 653024,"provinceText": "克孜勒苏柯尔克孜自治州","cityText": "乌恰县"},
//				        　
//				{"province": 653100,"city": 653101,"provinceText": "喀什地区","cityText": "喀什市"},
//				{"province": 653100,"city": 653121,"provinceText": "喀什地区","cityText": "疏附县"},
//				{"province": 653100,"city": 653122,"provinceText": "喀什地区","cityText": "疏勒县"},
//				{"province": 653100,"city": 653123,"provinceText": "喀什地区","cityText": "英吉沙县"},
//				{"province": 653100,"city": 653124,"provinceText": "喀什地区","cityText": "泽普县"},
//				{"province": 653100,"city": 653125,"provinceText": "喀什地区","cityText": "莎车县"},
//				{"province": 653100,"city": 653126,"provinceText": "喀什地区","cityText": "叶城县"},
//				{"province": 653100,"city": 653127,"provinceText": "喀什地区","cityText": "麦盖提县"},
//				{"province": 653100,"city": 653128,"provinceText": "喀什地区","cityText": "岳普湖县"},
//				{"province": 653100,"city": 653129,"provinceText": "喀什地区","cityText": "伽师县"},
//				{"province": 653100,"city": 653130,"provinceText": "喀什地区","cityText": "巴楚县"},
//				{"province": 653100,"city": 653131,"provinceText": "喀什地区","cityText": "塔什库尔干塔吉克自治县"},
//				        　
				{"province": 653200,"city": 653201,"provinceText": "和田地区","cityText": "和田市"},
				{"province": 653200,"city": 653221,"provinceText": "和田地区","cityText": "和田县"},
				{"province": 653200,"city": 653222,"provinceText": "和田地区","cityText": "墨玉县"},
				{"province": 653200,"city": 653223,"provinceText": "和田地区","cityText": "皮山县"},
				{"province": 653200,"city": 653224,"provinceText": "和田地区","cityText": "洛浦县"},
				{"province": 653200,"city": 653225,"provinceText": "和田地区","cityText": "策勒县"},
				{"province": 653200,"city": 653226,"provinceText": "和田地区","cityText": "于田县"},
				{"province": 653200,"city": 653227,"provinceText": "和田地区","cityText": "民丰县"}/*,
				       　
				{"province": 654000 ,"city": 654002,"provinceText": "伊犁哈萨克自治州","cityText": "伊宁市"},
				{"province": 654000 ,"city": 654003,"provinceText": "伊犁哈萨克自治州","cityText": "奎屯市"},
				{"province": 654000 ,"city": 654004,"provinceText": "伊犁哈萨克自治州","cityText": "霍尔果斯市"},
				{"province": 654000 ,"city": 654021,"provinceText": "伊犁哈萨克自治州","cityText": "伊宁县"},
				{"province": 654000 ,"city": 654022,"provinceText": "伊犁哈萨克自治州","cityText": "察布查尔锡伯自治县"},
				{"province": 654000 ,"city": 654023,"provinceText": "伊犁哈萨克自治州","cityText": "霍城县"},
				{"province": 654000 ,"city": 654024,"provinceText": "伊犁哈萨克自治州","cityText": "巩留县"},
				{"province": 654000 ,"city": 654025,"provinceText": "伊犁哈萨克自治州","cityText": "新源县"},
				{"province": 654000 ,"city": 654026,"provinceText": "伊犁哈萨克自治州","cityText": "昭苏县"},
				{"province": 654000 ,"city": 654027,"provinceText": "伊犁哈萨克自治州","cityText": "特克斯县"},
				{"province": 654000 ,"city": 654028,"provinceText": "伊犁哈萨克自治州","cityText": "尼勒克县"},
				        　
				{"province": 654200 ,"city": 654201,"provinceText": "塔城地区","cityText": "塔城市"},
				{"province": 654200 ,"city": 654202,"provinceText": "塔城地区","cityText": "乌苏市"},
				{"province": 654200 ,"city": 654221,"provinceText": "塔城地区","cityText": "额敏县"},
				{"province": 654200 ,"city": 654223,"provinceText": "塔城地区","cityText": "沙湾县"},
				{"province": 654200 ,"city": 654224,"provinceText": "塔城地区","cityText": "托里县"},
				{"province": 654200 ,"city": 654225,"provinceText": "塔城地区","cityText": "裕民县"},
				{"province": 654200 ,"city": 654226,"provinceText": "塔城地区","cityText": "和布克赛尔蒙古自治县"},
				        　
				{"province": 654300 ,"city": 654301,"provinceText": "阿勒泰地区","cityText": "阿勒泰市"},　　
				{"province": 654300 ,"city": 654321,"provinceText": "阿勒泰地区","cityText": "布尔津县"},
				{"province": 654300 ,"city": 654322,"provinceText": "阿勒泰地区","cityText": "富蕴县"},
				{"province": 654300 ,"city": 654323,"provinceText": "阿勒泰地区","cityText": "福海县"},
				{"province": 654300 ,"city": 654324,"provinceText": "阿勒泰地区","cityText": "哈巴河县"},
				{"province": 654300 ,"city": 654325,"provinceText": "阿勒泰地区","cityText": "青河县"},
				{"province": 654300 ,"city": 654326,"provinceText": "阿勒泰地区","cityText": "吉木乃县"},
				        　
				{"province": 659000 ,"city": 659001,"provinceText": "自治区直辖县级行政区划","cityText": "石河子市"},
				{"province": 659000 ,"city": 659002,"provinceText": "自治区直辖县级行政区划","cityText": "阿拉尔市"},
				{"province": 659000 ,"city": 659003,"provinceText": "自治区直辖县级行政区划","cityText": "图木舒克市"},
				{"province": 659000 ,"city": 659004,"provinceText": "自治区直辖县级行政区划","cityText": "五家渠市"},
				{"province": 659000 ,"city": 659006,"provinceText": "自治区直辖县级行政区划","cityText": "铁门关市"}*/
            ]
        }
    }
});