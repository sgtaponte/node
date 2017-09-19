const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}; ${req.method}; ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log +'\n', (err)=>{
    if(err){
      console.log('Unable to support log.');
    }
  });
  next();
});
// app.use((req, res, next)=>{
//     console.log('We couldnt find that site.');
//       res.render('maintenance.hbs',{
//         pageTitle:'Under Maintenance',
//         currentYear: new Date().getFullYear()
//       });
//
//
// });
// app.get('/', (req, res) =>{
//
//   res.send({
//     name: 'Matt',
//     likes: [
//       'Biking',
//       'Coding'
//     ]
//   });
// });


app.get('/', (req,res) =>{
  res.render('home.hbs', {
    pageTitle: 'Home Title',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Hey welcome to home!'

  });
});
  //
app.get('/projects', (req,res) =>{
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req,res) =>{
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });

});

app.listen(port, ()=>{
  console.log(`Server is up on ${port}`);
});
