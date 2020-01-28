const path = require("path");
const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const mime = require("mime/lite");
const bodyParser = require("body-parser");
const compression = require("compression");
const rimraf = require("rimraf");

String.prototype.replaceAll = function(f,r) { return this.split(f).join(r); };

app.use(compression());
app.use(express.static(path.join(__dirname, "../")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// START OS API

app.get("/packages", async function(req, res) {
    const array = [];
    console.log("[GET] Client requested package data!");
    const packages = fs.readdirSync(`${__dirname}/packages`, { withFileTypes: true }).filter(dir => dir.isDirectory());
    let canAccess;
    for (const dir of packages) {
        const info = require(`./packages/${dir.name}/info.json`);
        if (info.isApp) {
          canAccess = true;
          try { fs.accessSync(`${__dirname}/packages/${dir.name}/icon.webp`, fs.constants.F_OK); } catch(e) { canAccess = false; }
          if (canAccess) {
            const rawIcon = fs.readFileSync(`${__dirname}/packages/${dir.name}/icon.webp`);
            info.icon = await Buffer.from(rawIcon).toString("base64");
          }
        }
        array.push(info);
        console.log(`Package ${info.name} loaded`);
    }
    res.send(JSON.stringify(array));
    console.log("Package data sending complete.")
});

// START FILE API

app.get("/file/read/:type/:filePath", async function(req, res) {
    if (req.params.type === "directory") {
        console.log(`[GET] Client is requesting files in directory ${req.params.filePath}!`);
        const array = [];
        req.params.filePath = await req.params.filePath.replaceAll("$$$$", "/");
        const rawDir = fs.readdirSync(`${__dirname}/${req.params.filePath}`, { withFileTypes: true });
        for (const file of rawDir) {
            var type = mime.getType(file.name.split('.').pop());
            if (file.isDirectory() && !type) type = "directory";
            array.push({name: file.name, type: type, path: `${req.params.filePath}/${file.name}`});
        };
        res.send(JSON.stringify(array));
        console.log(`All files in directory ${req.params.filePath} sent.`)
    } else if (req.params.type === "file") {
        console.log(`[GET] Client is requesting file ${req.params.filePath}!`);
        req.params.filePath = await req.params.filePath.replaceAll("$$$$", "/");
        fs.readFile(`${__dirname}/${req.params.filePath}`, (err, data) => {
            const file = Buffer.from(data).toString("base64");
            res.send(JSON.stringify(file));
            console.log(`File ${req.params.filePath} sent.`)
        });
    }
});
app.get("/file/readStatic/:filePath", async function(req, res) {
  console.log(`[STATIC-GET] Client is requesting file ${req.params.filePath}!`);
  req.params.filePath = await req.params.filePath.replaceAll("$$$$", "/");
  fs.readFile(`${__dirname}/${req.params.filePath}`, (err, data) => {
    res.writeHead(200);
    res.end(data);
    console.log(`File ${req.params.filePath} sent as STATIC.`)
  });
})
app.post("/file/write/:type/:filePath", async function(req, res) {
    if (!(req.params.filePath.includes("home"))) return;
    if (req.params.type === "directory") {
        console.log(`[POST] Client is creating directory at ${req.params.filePath}!`);
        req.params.filePath = await req.params.filePath.replaceAll("$$$$", "/");
        fs.mkdirSync(`${__dirname}/${req.params.filePath}`);
        console.log(`Directory ${req.params.filePath} created.`)
    } else if (req.params.type === "file") {
        console.log(`[POST] Client is creating file at ${req.params.filePath}!`);
        req.params.filePath = await req.params.filePath.replaceAll("$$$$", "/");
        const file = Buffer.from(req.body.data, "base64").toString("ascii");
        fs.writeFile(`${__dirname}/${req.params.filePath}`, file, "ascii", () => console.log(`File ${req.params.filePath} created.`))
    }
});
app.post("/file/rm/:type/:filePath", async function(req, res) {
    if (!(req.params.filePath.includes("/home"))) return;
    if (req.params.type === "directory") {
        console.log(`[POST] Client is removing directory at ${req.params.filePath}!`);
        req.params.filePath = await req.params.filePath.replaceAll("$$$$", "/");
        rimraf(`${__dirname}/${req.params.filePath}`, function() { console.log(`Directory ${req.params.filePath} removed.`); });
    } else if (req.params.type === "file") {
        console.log(`[POST] Client is removing file at ${req.params.filePath}!`);
        req.params.filePath = await req.params.filePath.replaceAll("$$$$", "/");
        fs.unlink(`${__dirname}/${req.params.filePath}`, e => {
            if (e) return;
            console.log(`File ${req.params.filePath} removed.`)
        });
    }
});

app.listen(port, () => console.log(`auroraOS started on port ${port}`));