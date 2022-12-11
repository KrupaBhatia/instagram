const express = require('express');
const bodyParser = require('body-parser');//to convert data in json format
const route = require('./route/route.js');
const mongoose  = require('mongoose');
const multer = require('multer')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //prepares the string to be sent through the network. 

app.use(multer().any()); 

mongoose.connect("mongodb+srv://Krupa0521:9Sjfpv18ExMsygiT@cluster0.sshcjwm.mongodb.net/technical?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route); 


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});