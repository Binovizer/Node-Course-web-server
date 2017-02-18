const express = require('express');
const hbs = require('hbs');

const fs = require('fs');

const port = process.env.PORT || 3000

var app = express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
//express.static() -> built in middleware
//path to serving directory -> __dirname+'/public'
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log("Some error Occured");
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getYear', () => {
  //return 'text';
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
// app.get('/',(req, res)=>{
//   res.send("This is working");
// });

app.get('/',(req, res)=>{
  res.render('home.hbs',{
    welcomeMsg : "Hello! How are you?",
    pageTitle : "Home Page",
    companyName : "ABC"
    //curYear : new Date().getFullYear()
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle : "About Page",
    companyName : "ABC"
    //curYear : new Date().getFullYear()
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMsg : "Some Error Occured"
  });
});

app.get('/projects',(req,res)=>{
  res.render('projects',{
    pageTitle: 'Project Page',
    companyName : 'ABC',
    welcomeMsg : 'Some Portfolios here'
  });
});

app.listen(port, ()=>{
  console.log("Server is up at port "+port);
});
