;(async function(){
var package = os.runningPackages[document.currentScript.id];
var wRaw = await package.resource("main.html");
var window = await package.createWindow(atob(wRaw), { resizable: true, startingDimensions: [500, 300] });
var loading = document.getElementById(`${package.name}loading`);

var raw = await fetch("https://aurora-market.glitch.me/homepage");
var homepage = await raw.json();
console.log(homepage);
  
loading.style.display = "none";
})()