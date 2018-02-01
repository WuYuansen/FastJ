CKEDITOR.plugins.add('screencapture',
{
	init: function(editor)
	{
		editor.addCommand('screencapture',
			{
				exec: function(editor)
				{
					scpMgr.Capture();
				}
			});
		editor.ui.addButton('screencapture',
		{
			label: '截屏',
			command: 'screencapture',
			icon: this.path + 'images/screencapture.gif'
		});
	}
});
