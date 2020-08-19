const express = require('express');
const app = express();

app.get('/', (req, res) => {
  app.use(express.static('public'));
  res.sendFile('public/index.html', { root : __dirname});
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
