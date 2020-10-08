import { html } from './newHtml';
const express = require('express');
const app = express();
const busboy = require('connect-busboy');
const path = require('path');
const fse = require('fs-extra');

app.get('/audio', (req, res) => {
  app.use(express.static('public'));
  app.use(express.static('public/tracks'));

  res.send(html);
});

app.get('/countdown', (req, res) => {
    app.use(express.static('Countdown-Timer/public'));
    res.sendFile(__dirname + '/Countdown-Timer/public/index.html');
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
