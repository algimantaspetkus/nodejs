const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config();

const app = express();
const { DB_USER, DB_PWD, DB_HOST } = process.env;
const DBURL = `mongodb+srv://${DB_USER}:${DB_PWD}@${DB_HOST}/`;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

async function getAll() {
  const connectDb = new MongoClient(DBURL);
  const data = await connectDb.db('cao').collection('people').find().toArray();
  connectDb.close();
  return data;
}

app.get('/api/people', async (req, res) => {
  const data = await getAll();
  res.send(data);
});

app.post('/api/people', async (req, res) => {
  const reqData = req.body;
  const connectDb = new MongoClient(DBURL);
  await connectDb
    .db('cao')
    .collection('people')
    .insertOne({
      ...reqData,
      active: true,
    });
  connectDb.close();
  const data = await getAll();
  res.send(data);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000);
