;(async function(){
var package = os.runningPackages[document.currentScript.id];
var wRaw = await package.resource("main.html");
var window = await package.createWindow(atob(wRaw), { resizable: true, startingDimensions: [500, 300] });
var loading = document.getElementById(`${package.name}loading`);

var raw = await fetch("https://aurora-market.glitch.me/homepage");
var homepage = await raw.json();

await homepage.forEach(async function(app) {
  document.getElementById(`${package.name}popular`).innerHTML += `<button id="${app.name}view" style="overflow:hidden;padding:10px;width:250px;height:95px;"> <img src="data:image/webp;base64,${app.icon}" style="height:75px;width:75px;float:left;"> <strong>${app.name}</strong><br><text style="margin-top:2px;opacity:0.6;">${app.shortDescription}</text> </button>`;
  await document.getElementById(`${app.name}view`);
  document.getElementById(`${app.name}view`).onclick = function() { view(app.name); };
});

document.getElementById(`${package.name}homepage`).style.display = null;
loading.style.display = "none";
  
function view(appName) {
  console.log(appName);
}
  
})()