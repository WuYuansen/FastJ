/**
 *
 * <p> Title:ProfileSwitcher.js BY EXTJS V6.0 (src/main/newwebapp/classic/src/view/main)</p>
 * <p> Description:  场景转换</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.view.main.ProfileSwitcher', {
    extend: 'Ext.Component',
    xtype: 'profileSwitcher',
    cls: ['x-fa', 'fa-desktop', 'fa-lg'],
    style :{
    	padding: '9px 0px 0px 0px',
    	color : 'white'
    },
    readProfileInfo: function() {
        this.profile = app.profileName;
        this.locale = app.locale;
    },

    setQueryParam: function (name, value, preserveHash) {
        var query = Ext.Object.fromQueryString(location.search),
            queryString;

        query[name] = value;

        queryString = Ext.Object.toQueryString(query);
        if (preserveHash) {
            location.search = queryString;
        } else {
            window.location = location.pathname + '?' + queryString;
        }
    },

    initComponent: function() {
        var me = this,
            menuItems = [],
            classicProfiles = {
                crisp: '现代',
                classic: '经典',
                gray: '灰色'
            },
            menu, profileId;

        me.readProfileInfo();

        function makeItem(value, text, paramName) {
            paramName = paramName || "profile";
            var checked = value === (paramName === "profile" ? me.profile : me.locale);
            return {
                text: text,
                group: (paramName === 'profile' ? 'profilegroup' : 'localegroup'),
                checked: checked,
                handler: function () {
                    if (!checked) {
                        if (paramName === 'profile') {
                            me.setQueryParam('profile', value, value in classicProfiles);
                        } else {
                            me.setQueryParam('locale', value);
                        }
                    }
                }
            };
        }
        for (profileId in classicProfiles) {
//            menuItems.push(makeItem(profileId, classicProfiles[profileId]));
        }
        menuItems.push('-');
        menuItems.push(makeItem('en', '中文', 'locale'));
        menuItems.push(makeItem('he', 'ئۇيغۇر تىلى', 'locale'));
        /*menuItems.push('-', {
            text: 'Modern Toolkit',
            iconCls: 'x-fa fa-external-link',
            handler: function () {
                window.location = location.pathname + '?modern';
            }
        });*/

        menu = new Ext.menu.Menu({
            items: menuItems
        });

        this.on({
            scope: this,
            click: function (e) {
                menu.showBy(this);
            },
            element: 'el'
        });

        this.callParent();
    }
});
