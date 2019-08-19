const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const upload = multer({ limits: { fileSize: 500000 } });

const sendMetadata = require('./controller').sendMetadata;

const app = express();

// config 
const PORT = process.env.PORT || 3000;
const PUBLIC = path.resolve(__dirname, 'public');

// middlewares 
app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);

app.use(express.static(PUBLIC));

// routes
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});
app.get('/*', (req, res) => {
  res.redirect('/');
});
app.post('/api/fileanalyse', upload.any(), sendMetadata);

// boot up the app
app.listen(PORT, () => console.log(`Server listening on ${PORT}...`));