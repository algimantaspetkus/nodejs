/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const { USER, PASSWORD, HOST, PORT, DATABASE } = process.env;
const DBURL = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DATABASE}?retryWrites=true&w=majority`;
const connectDb = new MongoClient(DBURL);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/memberships', async (req, res) => {
  try {
    await connectDb.connect();
    const memberships = await connectDb
      .db('cao')
      .collection('services')
      .find()
      .toArray();
    res.status(200).json(memberships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/memberships/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await connectDb.connect();
    await connectDb
      .db('cao')
      .collection('services')
      .deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: 'Membership deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/addmembership', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'addmembership.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT);
