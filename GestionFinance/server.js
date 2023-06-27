var path = require('path');
const port = process.env.PORT || 4200;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Set the base path to the angular-test dist folder
app.use(express.static(path.join(__dirname, 'dist/gestion-finance')));
app.use(bodyParser);

//Any routes will be redirected to the angular app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/gestion-finance/index.html'));
});

//Starting server on port 3000
app.listen(port, () => {
  console.log(`Server started! 🚀, listening on http://localhost:${port}` );
});
