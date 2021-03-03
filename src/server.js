const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../build');
const indexFile = path.join(publicPath, 'index.html');

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(indexFile);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('starting on index: ' + indexFile);
});
