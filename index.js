const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xbjvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("Comming_soon_portal");
    const clientsCollection = database.collection("client");

    //GET API
    app.get("/clients", async (req, res) => {
      const cursor = clientsCollection.find({});
      const products = await cursor.toArray();
      res.send(products);
    });
    //POST API
    app.post("/client", async (req, res) => {
      const service = req.body;
      const result = await clientsCollection.insertOne(service);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello comming soon");
});

app.listen(port, () => {
  console.log(` listening at ${port}`);
});
