os.runningPackages[document.currentScript.id].createWindow(`<div id="%window%TitleBar" class="windowTitleBar"><div id="%window%Close" class="windowAction"><img src="close.svg"></div><div id="%window%Minimize" class="windowAction"><img src="min.svg"></div><ui>Tetris</ui></div><div id="%window%Body" class="windowBody blur" style="padding:0;"><iframe src="https://dionyziz.com/graphics/canvas-tetris/" style="width:100%;height:calc(100% - 5px);"></iframe></div>`, { startingDimensions: [340,660] });