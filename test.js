const express = require('express');

const app = express();

app.get('/home', (req, res) => {
  res.redirect('/next');
});

app.get('/next', (req, res) => {
  res.end('data passing');
});

app.listen(5000, () => {
  console.log('listening on 5000');
});
