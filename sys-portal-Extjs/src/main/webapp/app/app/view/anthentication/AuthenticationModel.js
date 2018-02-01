Ext.define('app.view.anthentication.AuthenticationModel',{
	extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.anthentication',
    data : {
    },
    stores: {
        dataviewProgress: {
            type: 'store',
            data: [
                {
                    list: [
                        { upMessage: "2017.01.03 �ύע����Ϣ", downMessage: "", status: 'successed' },
                        { upMessage: "", downMessage: "2017.01.03 ��˾�˺��ѿ�ͨ��˾�˺��ѿ�ͨ��˾�˺��ѿ�ͨ", status: 'failed', failedMessage: 'Ӫҵִ����Ƭ���ϸ�' },
                        { upMessage: "", downMessage: "", status: 'being' },
                        { upMessage: "", downMessage: "", status: 'being'}
                    ]
                }
            ]
        }
    }
})