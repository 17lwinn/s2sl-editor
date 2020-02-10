;(async function(){
var package = os.runningPackages[document.currentScript.id];
var wRaw = await package.resource("main.html");
var window = package.createWindow(atob(wRaw), { resizable: true, startingDimensions: [500, 300] });


})()