const express = require('express');
const bodyParser = require('body-parser');
const knexLib = require('knex');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

const knex = knexLib(require('./knexfile')['development']);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Use body-parser middleware to parse JSON and url-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Define routes for each page
app.get('/', (req, res) => {
  res.render('index');
});


app.get('/home', function(req, res) {
  // Assuming you have stored user information in req.user after login
  res.render('home', { Nom: req.user.Nom, Prenom: req.user.Prenom, type: req.user.type });
});



app.get('/login', (req, res) => {
  res.render('login', {
    errorLogin: req.query.error
  });

});



// app.post('/login/auth', async (req, res) => {
  
//   const email = req.body.email;
//   const MotDePasse = req.body.MotDePasse;

//   const user = await knex('users')
//     .where({ Email: email })
//     .first();

//   if (user && await bcrypt.compare(MotDePasse, user.MotDePasse)) 
//   {
//     req.user = user;
//     console.log("Login successful");
//     res.redirect('/home');
//   } 
//   else 
//   {
//     res.redirect('/login?error=1');
//   }

// });

app.post('/login/auth', async (req, res) => {
  const email = req.body.email;
  const MotDePasse = req.body.MotDePasse;

  const user = await knex('users')
    .where({ Email: email })
    .first();

  if (user && await bcrypt.compare(MotDePasse, user.MotDePasse)) {
    // Set req.user with user information
    req.user = user;
    console.log("Login successful");
    res.redirect('/home');
  } else {
    res.redirect('/login?error=1');
  }
});




app.get('/register', (req, res) => {

  res.render('register');
});





// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
    


