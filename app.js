const express = require('express');
const app = express();
const fs = require('fs');
const busboy = require('connect-busboy');
const path = require('path');
const fse = require('fs-extra');


app.get('/', (req, res) => {
  app.use(express.static('public'));
  app.use(express.static('public/tracks'));

  const tracks = fs.readdirSync('public/tracks');
  const nameTracks = tracks.map((item) => item.slice(0, -4));
  const trackList = nameTracks.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
  const list = `<ol id="trackList">${trackList.map((item) => `<li><a onclick="chooseTrack(event)" href="#">${item}</a></li>`).join('')}</ol>`;

  const html = `
<!DOCTYPE html>
  <html lang="">
      <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <link rel="stylesheet" href="style.css">
      </head>
      <body>
      <div id="player-block">
      <h1>Audio Player</h1>
      <audio id="player" controls>
  <source id="ogg" src="tracks/jazzfrenchy.ogg" type="audio/ogg">
      <source id="mp3" src="tracks/jazzfrenchy.mp3" type="audio/mp3">
      Ваш браузер не пожжерживает тег audio!
  </audio>
  <button onclick="getNextTrack()" id="Next">Next Track</button>
  <div id="current-track"></div>
  <div id="trackSelector">${list}</div>
        <form method='post' action='upload' enctype="multipart/form-data">
        <input type='file' name='fileUploaded'>
        <input type='submit'>
      </div>
      <script src="showCurrentTrack.js"></script>
      <script src="skipTrack.js"></script>
      <script src="trackSelection.js"></script>
      </body>
      </html>`
  res.send(html);
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
