const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pvt1qcu.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let coffeesCollection, usersCollection;
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await client.connect();
  coffeesCollection = client.db('coffeeDB').collection('coffees');
  usersCollection = client.db('coffeeDB').collection('users');
  isConnected = true;
  console.log("MongoDB connected!");
}

// প্রতিটা request-এর আগে connection নিশ্চিত করো
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'DB connection failed' });
  }
});

app.get('/', (req, res) => {
  res.send('Coffee server is getting hotter.');
});

app.get('/coffees', async (req, res) => {
  const result = await coffeesCollection.find().toArray();
  res.send(result);
});

app.get('/coffees/:id', async (req, res) => {
  const id = req.params.id;
  const result = await coffeesCollection.findOne({ _id: new ObjectId(id) });
  res.send(result);
});

app.post('/coffees', async (req, res) => {
  const result = await coffeesCollection.insertOne(req.body);
  res.send(result);
});

app.put('/coffees/:id', async (req, res) => {
  const filter = { _id: new ObjectId(req.params.id) };
  const result = await coffeesCollection.updateOne(filter, { $set: req.body }, { upsert: true });
  res.send(result);
});

app.delete('/coffees/:id', async (req, res) => {
  const result = await coffeesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.send(result);
});

app.get('/users', async (req, res) => {
  const result = await usersCollection.find().toArray();
  res.send(result);
});

app.post('/users', async (req, res) => {
  const result = await usersCollection.insertOne(req.body);
  res.send(result);
});

app.patch('/users', async (req, res) => {
  const { email, lastSignInTime } = req.body;
  const result = await usersCollection.updateOne(
    { email },
    { $set: { lastSignInTime } }
  );
  res.send(result);
});

app.delete('/users/:id', async (req, res) => {
  const result = await usersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.send(result);
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Coffee server is running on port ${port}`);
  });
}

module.exports = app;