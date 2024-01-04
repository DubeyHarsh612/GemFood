const mongoose = require('mongoose');
const db = require('./db');
const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!-----');
});

app.use(express.json());

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/DisplayData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
