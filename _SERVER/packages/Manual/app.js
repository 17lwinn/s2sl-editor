;(async function(){
var package = os.runningPackages[document.currentScript.id];
var mainWindowRaw = await package.resource("main.html");
var mainWindow = package.createWindow(atob(mainWindowRaw));
})()