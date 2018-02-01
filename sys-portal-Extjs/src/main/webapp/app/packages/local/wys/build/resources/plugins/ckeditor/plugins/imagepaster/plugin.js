CKEDITOR.plugins.add('imagepaster',
{
	init: function(editor)
	{
		editor.addCommand('imagepaster',
		{
			exec: function(editor)
			{
				pasterMgr.PasteManual();
			}
		});
		editor.ui.addButton('imagepaster',
		{
			label: '粘贴本地文件,Word文档',
			command: 'imagepaster',
			icon: this.path + 'images/paster.png'
		});
	}
});
