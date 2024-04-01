const express = require('express')
const dotenv = require('dotenv')
const app = express()
const cors = require('cors')
const bodyparser=require('body-parser')
const { MongoClient } = require('mongodb');
dotenv.config()
// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
app.use(bodyparser.json())
app.use(cors())
// Database Name
const dbName = 'Passop';
const port = 3000

 client.connect();

//get allpasswords
app.get('/', async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
//insert passwords
app.post('/', async(req, res) => {
  const password=req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password)
  res.send({success:true,result:findResult})
})
//delete password
app.delete('/', async(req, res) => {
  const password=req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password)
  res.send({success:true,result:findResult})
})
app.listen(port, () => {
  console.log(`https://127.0.0.1:${port}`)
})