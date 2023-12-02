const express = require('express');
var bodyParser = require('body-parser')
const port = 8000;
const app = express();

app.set('view engine','hbs');
app.use(bodyParser.json());

const userRoutes = require('./routes/users.js');

app.use('/users',userRoutes);




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

