;(async function() {
var package = os.runningPackages[document.currentScript.id];
var content = package.flags;
var window = package.createWindow(`<div id="%window%TitleBar" class="windowTitleBar"><div id="%window%Close" class="windowAction"><img src="close.svg"></div><div id="%window%Maximize" class="windowAction"><img src="max.svg"></div><div id="%window%Minimize" class="windowAction"><img src="min.svg"></div><ui>HTML Viewer</ui></div><div id="%window%Body" class="windowBody blur" style="padding:0;"><iframe style="width:100%;height:calc(100% - 4px);resize:none;border-radius:0;background-color:white;" src="data:text/html;base64,${content}"></iframe></div>`, { resizable: true });
})()