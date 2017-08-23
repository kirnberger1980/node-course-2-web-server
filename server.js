const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req, res, next) => {
  var now = new Date().toISOString();

  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log +  '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs',{
//     pageTitle: 'Maintenance Page',
//     message: 'This website is currently under maintenance.'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
  // return true;
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

// root route
app.get('/', (req,res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Andrew',
  //   likes: [
  //     'Biking',
  //     'Computer'
  //   ]
  // });
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my brand new home page.'
  });
});

// about route
app.get('/about',(req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/projects',(req, res) => {
  res.render('projects.hbs',{
    pageTitle: 'Project Page',
    message: 'Portfolio page here.'
  })
});

// bad route - send back json with errorMessage
app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Bad Request.'
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}!`);
});
