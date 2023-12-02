const express = require('express');
var bodyParser = require('body-parser')
const assert = require('assert')

//Connection URL 
const url = 'mongodb://localhost:27017';

//database name
const dbName = 'myproject';

//use connect method to connect to server


const port = 8000;
const app = express();

app.set('view engine','hbs');
app.use(bodyParser.json());

const userRoutes = require('./routes/users.js');


app.use('/users',userRoutes);

var MongoClient = require('mongodb').MongoClient

const client = new MongoClient(url);
var db = client.db('galleryDB')


async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const collection = db.collection('users');

  /*const insertResult = await collection.insertMany([{ imie: "Tezeusz",nazwisko: "Ptolemeusz"}, { imie: "Amadeusz",nazwisko: "Borek"}]);
  console.log('Inserted documents =>', insertResult);*/


  /*const findResult = await collection.find({}).toArray();
  console.log('Found users =>', findResult);*/

  /*const filteredDocs = await collection.find({ nazwisko: "Kowalski" }).toArray();
  console.log('Found documents user by name Kowalski =>', filteredDocs);*/

  /*const updateResult = await collection.updateOne({ nazwisko: "Ptolemeusz" }, { $set: { imie: "Orfeusz" } });
  console.log('Updated documents =>', updateResult);*/

  /*const filteredDocs = await collection.find({ nazwisko: "Ptolemeusz" }).toArray();
  console.log('Found documents user by name Ptolemeusz =>', filteredDocs);*/

  const deleteResult = await collection.deleteMany({ nazwisko: 'Kowalski' });
  console.log('Deleted documents =>', deleteResult);



  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());




/*app.get('/',(req,res) => { 
    res.sendFile(__dirname+'/index.html')
});*/
app.get('/',(req,res) => { 
    res.render('index',{
        Title: 'Galeria',
        Body: "Wzdęcia"
    })
});



app.get('/comments',(req,res) => { 
    res.send('Witaj w komentarzach')
});
app.listen(port);

