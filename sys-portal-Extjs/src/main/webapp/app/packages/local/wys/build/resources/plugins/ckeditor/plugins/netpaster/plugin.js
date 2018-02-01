CKEDITOR.plugins.add('netpaster',
{
	init: function(editor)
	{
		editor.addCommand('netpaster',
		{
			exec: function(editor)
			{
				pasterMgr.UploadNetImg();
			}
		});
		editor.ui.addButton('netpaster',
		{
			label: '自动上传远程图片',
			command: 'netpaster',
			icon: this.path + 'images/ico.png'
		});
	}
});
