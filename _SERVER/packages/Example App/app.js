(async function(){var package=os.runningPackages[document.currentScript.id];var window=await package.createWindow(`<div id="%window%TitleBar" class="windowTitleBar"><div id="%window%Close" class="windowAction"><img src="close.svg"></div><div id="%window%Minimize" class="windowAction"><img src="min.svg"></div><ui>Example App</ui></div><div id="%window%Body" class="windowBody blur"><iframe style="width:100%;height:100%;" id="%package%thing" src="https://you-got-this.glitch.me/?name=Soup"></iframe></div>`,{startingDimensions:[1280,720]});os.prompt("Please enter something. Anything.","Woah! A prompt!",window.name,function(val){document.getElementById(`${package.name}thing`).src=`https://you-got-this.glitch.me/?name=${val}`})})()