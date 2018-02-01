Ext.define('app.view.main.Layout_MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainLayoutViewModel',
    data: {
        name: 'app',
        loremIpsum: null
    },
    stores: {
        dataviewProgress: {
            type: 'store',
            data: [
                {
                    list: [
                        { upMessage: "2017.01.03 ������Ϣ���ύ", downMessage: "", status: 'successed' },
                        { upMessage: "", downMessage: "2017.01.03 ��˾�˺��ѿ�ͨ��˾�˺��ѿ�ͨ��˾�˺��ѿ�ͨ", status: 'failed', failedMessage: 'Ӫҵִ����Ƭ���ϸ�' },
                        { upMessage: "2017.01.03 ���ύʵ����֤", downMessage: "", status: 'being' },
                        { upMessage: "", downMessage: "2017.01.03 ʵ����֤�ɹ�", status: 'successed'}
                    ]
                }
            ]
        }
    }
});