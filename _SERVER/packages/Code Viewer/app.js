;(async function(){
var package = os.runningPackages[document.currentScript.id];
var window = package.createWindow(`<div id="%window%TitleBar" class="windowTitleBar"><div id="%window%Close" class="windowAction"><img src="close.svg"></div><div id="%window%Maximize" class="windowAction"><img src="max.svg"></div><div id="%window%Minimize" class="windowAction"><img src="min.svg"></div><ui>Code Viewer</ui></div> <div id="%window%Body" class="windowBody blur" style="padding:0;"> <iframe id="%package%Text" style="width:100%;height:calc(100% - 10px);"></iframe> </div>`, { resizable: true });

var mimeToMode = {
  "application/javascript": "javascript",
  "application/json": "json",
  "text/css": "css"
}

var content = atob(package.flags.file);
var mime = package.flags.type;

document.getElementById(`${package.name}Text`).contentDocument.write(`<style>::-webkit-scrollbar{width:10px;height:10px;}::-webkit-scrollbar-thumb{background-color:rgba(255,255,255,0.5);border-radius:5px;}::-webkit-scrollbar-thumb:hover{background-color:rgba(3,169,255,0.5);}::-webkit-scrollbar-thumb:active{background-color:#004b8a;}</style><div id="editor" style="position:absolute;top:0;right:0;bottom:0;left:0;">${content}</div>`);

var scriptA = document.createElement("script");
scriptA.src = "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.7/ace.js";
document.getElementById(`${package.name}Text`).contentDocument.body.appendChild(scriptA);

var scriptB = document.createElement("script");
scriptB.innerHTML = `var editor = ace.edit("editor");editor.setTheme("ace/theme/monokai");editor.session.setMode("ace/mode/${mimeToMode[mime]}");setTimeout(function(){document.body.value=editor.getValue();document.querySelector("textarea").oninput=function(){document.body.value=document.querySelector("textarea").value;};},50);`;
setTimeout(function() { document.getElementById(`${package.name}Text`).contentDocument.body.appendChild(scriptB); }, 500)
})()