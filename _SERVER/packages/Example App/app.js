;(async function(){
var package = os.runningPackages[document.currentScript.id];
var window = await package.createWindow(`<div id="%window%TitleBar" class="windowTitleBar"><div id="%window%Close" class="windowAction"><img src="close.svg"></div><div id="%window%Minimize" class="windowAction"><img src="min.svg"></div><ui>Example App</ui></div> <div id="%window%Body" class="windowBody blur"><iframe id="%package%thing" src="https://you-got-this.glitch.me/?name=Soup"></iframe></div>`);
os.prompt("Please enter something. Anything.", "Woah! A prompt!", window.name, function(val) {
  document.getElementById(`${package.name}thing`).src = `https://you-got-this.glitch.me/?name=${val}`;
});
})()