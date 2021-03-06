const express = require('express');
const app = express();
const busboy = require('connect-busboy');
const path = require('path');
const fse = require('fs-extra');
const fs = require('fs');

const tracks = fs.readdirSync('public/tracks');
const nameTracks = tracks.map((item) => item.slice(0, -4));
const trackList = nameTracks.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
const list = `<ol id="trackList">${trackList.map((item) => `<li><a onclick="chooseTrack(event)" href="#">${item}</a></li>`).join('')}</ol>`;
/// create new HTML
const newHtml = `
<!DOCTYPE html>
  <html lang="">
      <head>
      <meta charset="utf-8">
      <title>Title</title>
      <link rel="stylesheet" href="style-audio.css">
      <script src="https://kit.fontawesome.com/f5792cc639.js" crossorigin="anonymous"></script>
      </head>
      <body>
      <h1>Audio Player</h1>
      <div id="player-block">
      <audio id="player" controls>
      <source id="ogg" src="tracks/jazzfrenchy.ogg" type="audio/ogg">
      <source id="mp3" src="tracks/jazzfrenchy.mp3" type="audio/mp3">
      Ваш браузер не пожжерживает тег audio!
  </audio>
  <button class="btn" onclick="getNextTrack()" id="Next"><i class="fas fa-fast-forward fa-1x"></i></button>
  <div id="current-track"></div>
  <div id="trackSelector">${list}</div>
        <form method='post' action='upload' enctype="multipart/form-data">
        <input class="loadBtn" type='file' name='fileUploaded' id="browse">
        <input class="loadBtn" type='submit' id="upload" value="Upload">
      </div>
      <script src="showCurrentTrack.js"></script>
      <script src="skipTrack.js"></script>
      <script src="trackSelection.js"></script>
      </body>
      </html>`;

app.get('/audio', (req, res) => {
  app.use(express.static('public'));
  app.use(express.static('public/tracks'));
  res.send(newHtml);
});

app.get('/countdown', (req, res) => {
    app.use(express.static('Countdown-Timer/public'));
    res.sendFile(__dirname + '/Countdown-Timer/public/index.html');
});

app.get('/bomberman', (req, res) => {
    app.use(express.static('/bomberman/public'));
    res.sendFile(__dirname + '/bomberman/public/index.html');
});

app.use(busboy());
app.use(express.static(path.join(__dirname, 'public/tracks')));

app.route('/upload')
    .post(function (req, res, next) {

      let fstream;
      req.pipe(req.busboy);
      req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);

        fstream = fse.createWriteStream(__dirname + '/public/tracks/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
          console.log("Upload Finished of " + filename);
          res.redirect('back');
        });
      });
    });


app.listen(8083, () => {
  console.log('Example app listening on port 8083!');
});
