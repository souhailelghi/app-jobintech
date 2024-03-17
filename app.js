const express = require('express');
const bodyParser = require('body-parser');
const knexLib = require('knex');
const bcrypt = require('bcrypt');
const app = express();
const port = 3001;

//try git 
const knex = knexLib(require('./knexfile')['development']);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Use body-parser middleware to parse JSON and url-encoded data ...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Define routes for each page 
app.get('/', (req, res) => {
  res.render('index');
});
app.post('/logout', (req, res) => {
 
  res.redirect('gg',);
});
// app.post('/login', (req, res) => {
//   res.redirect('login',);
// });


app.get('/gg', function(req, res) {
  // Assuming you have stored user information in req.user after login
  res.render('gg',  );
});


app.get('/home', function(req, res) {
  // Assuming you have stored user information in req.user after login
  res.render('home',  );
});

app.get('/error', function(req, res) {
  // Assuming you have stored user information in req.user after login
  res.render('error', 
 
   //  {errorLogin: req.query.error}
   );
});


app.get('/candidat', function(req, res) {
  // Assuming you have stored user information in req.user after login
  res.render('candidat',  );
});

app.get('/formateur', function(req, res) {
  res.render('formateur',  );
});
app.get('/recruteur', function(req, res) {
  res.render('recruteur',  );
});

app.post('/login/auth', async (req, res) => {
  const email = req.body.email;
  const plainPassword = req.body.MotDePasse;

  const user = await knex('users')
    .where({ Email: email })
    .first();

  if (user) {
    const passwordMatch = await bcrypt.compare(plainPassword, user.MotDePasse);
    // Check the type property of the user object
    if (passwordMatch && user.type === 'formateur') {
      req.user = user;
      console.log("Login successful");
      res.redirect('/formateur');
    } else if (passwordMatch && user.type === 'candidat') {
      req.user = user;
      console.log("Login successful");
      res.redirect('/candidat');
    }else if (passwordMatch && user.type === 'recruteur') {
      req.user = user;
      console.log("Login successful");
      res.redirect('/recruteur');
    }else {
      // Passwords do not match or user type is incorrect
      res.redirect('/error');
    }
  } else {
    res.redirect('/error');
  }
});




app.post('/submit_registration', async (req, res) => {
  try {
    // Extract data from the registration form
    const { first_name, last_name, address, phone_number, email, cv, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert data into the database
    await knex.transaction(async (trx) => {
      // Insert user data
      const [userId] = await trx('Users').insert({
        Nom: last_name,
        Prenom: first_name,
        Email: email,
        MotDePasse: hashedPassword, // Hashed password
        type: 'candidat' // Assuming all registrations are candidates
      });

      // Insert Candidat data
      await trx('Candidat').insert({
        UserID: userId,
        CV: cv
      });
    });

    // Redirect to a success page after registration
    res.redirect('/candidat');
    console.log("god job");
  } catch (error) {
    console.error('Error registering user:', error);
    // Redirect to an error page if registration fails
    res.redirect('/registration_error');
  }
});


// app.post('/submit_registration', async (req, res) => {
//   try {
//     // Extract data from the registration form
//     const { first_name, last_name, address, phone_number, email, cv } = req.body;

//     // Insert data into the database
//     await knex.transaction(async (trx) => {
//       // Insert user data
//       const [userId] = await trx('Users').insert({
//         Nom: last_name,
//         Prenom: first_name,
//         Email: email,
//         MotDePasse: '', // You should hash the password before storing it
//         type: 'candidat' // Assuming all registrations are candidates
//       });

//       // Insert Candidat data
//       await trx('Candidat').insert({
//         UserID: userId,
//         CV: cv
//       });
//     });

//     // Redirect to a success page after registration
//     res.redirect('/candidat');
//     console.log("god job");
//   } catch (error) {
//     console.error('Error registering user:', error);
//     // Redirect to an error page if registration fails
//     res.redirect('/registration_error');
//   }
// });





//login message error : 
app.get('/loginError', (req, res) => {
  res.render('loginError', {
    errorLogin: req.query.error
  });

});


//page registration : 
app.get('/register', (req, res) => {

  res.render('register');
});





// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
    


