/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const { USER, PASSWORD, DATABASE, HOST } = process.env;
const DBURL = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DATABASE}?retryWrites=true&w=majority`;
const connectDb = new MongoClient(DBURL);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  console.log('smt');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT);
