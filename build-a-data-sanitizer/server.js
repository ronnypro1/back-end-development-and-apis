const express = require('express');
const path = require('path');
const { inputCleaner, inputValidator } = require('./middleware');

const app = express();

app.get('/', (req, res) => {
  res.redirect('/form');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.post('/submit', inputCleaner, inputValidator, (req, res) => {
  res.json({ username: req.body.username, comment: req.body.comment });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
