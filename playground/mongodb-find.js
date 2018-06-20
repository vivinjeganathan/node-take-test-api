const MongoClient = require('mongodb').MongoClient
const test = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'TakeTestApp';

MongoClient.connect(url, (error, client) => {
    
    const collection = client.db(dbName).collection('Questions');

    if (error) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to Mongo DB Server');

    collection.find({complexity:1}).toArray().then((docs) => {

        console.log('Todos: ', JSON.stringify(docs, undefined, 2))
    }, error => {

        console.log('Error', error);
    });

    //client.close();
});