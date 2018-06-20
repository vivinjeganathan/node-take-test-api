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

    collection.insertOne({

        description: 'Which of the following is dependent on temperature?',
        optionA: 'Molality',
        optionB: 'Molarity',
        optionC: 'Mole Fraction',
        optionD: 'Weight Percentage',
        correctOption: 'optionB',
        complexity: 1

    }, (error, result) => {

        if (error) {
            return console.log('Unable to insert Questions', error);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});