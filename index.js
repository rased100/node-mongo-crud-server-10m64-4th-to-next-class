const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://mydbuser1:RYoLm6Lv3TeX37cQ@cluster0.i4mso.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// user: mydbuser1
// password: RYoLm6Lv3TeX37cQ

async function run() {
    try {
        await client.connect();
        const database = client.db('foodMaster');
        const usersCollection = database.collection('users');
        // // create a document to insert
        // const doc = {
        //     name: "Brand new user",
        //     email: "user@gmail.com",
        // }
        // const result = await usersCollection.insertOne(doc);
        // console.log(`A document was inserted with the _id: ${result.insertedId}`);
        // console.log(result)

        // POST API
        app.post('/users', async (req, res) => {
            console.log('hitting the post');
            res.send('hit the post');
        })
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running my CRUD Server')
})

app.listen(port, () => {
    console.log('Running Server on Port', port)
})