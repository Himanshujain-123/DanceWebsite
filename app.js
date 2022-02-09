const express = require("express")
const path = require("path");
const app = express()
const port = 8000;
//copied code from Mongosose Tute
const mongoose = require('mongoose');
const bodyparser=require("body-parser")
mongoose.connect('mongodb://localhost/contactDance',{UseNewUrlParser:true,
UseunifiedTopology:true});
//define mongoose Schema
var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    age: String,
    address: String,
    contact: String,
    dec: String
});
var contact = mongoose.model('contact', contactSchema);
//EXPRESS SPECIFIC STUFF

app.use('/static', express.static('static'));//for serving static files
app.use(express.urlencoded())
//PUG SPECIFIC STUFF
app.set('view engine', 'pug')//set the template engine as pug
app.set('views', path.join(__dirname, 'views'))///set the vies directory

//ENDPOINTS
app.get('/', (req, res) => {

    const param = {}
    res.status(200).render('home.pug', param);

})
app.get('/contact', (req, res) => {
 
    const param = {}
  
    res.status(200).render('contact.pug', param);

})
app.post('/contact', (req, res) => {
 
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send(" <h1>Your Form Has Been Submitted Successfully</h1>")
    }).catch(()=>{
        res.status(400).send("Error 404");
    }
    );
    // res.status(200).render('contact.pug', param);

})
app.listen(
    port, () => {
        console.log(`the application started Successsfully on port ${port}`)
    }
)