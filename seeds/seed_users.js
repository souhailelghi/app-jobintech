const bcrypt = require('bcrypt');
const fs = require('fs');
// const faker = require('@faker-js/faker');
const { faker } = require('@faker-js/faker');

exports.seed = async function(knex) {

//   await knex('Postulation').del();
//   await knex('Evaluation').del();
//   await knex('Competence').del();
//   await knex('Formateur').del();
//   await knex('Recruteur').del();
//   await knex('Candidat').del();
//   await knex('Users').del();


  let motDePasse = await bcrypt.hash('123456', 10);

  // Generate 50 fake users
  const users = Array.from({ length: 4 }, function() {
    const myArray = ['candidat', 'formateur', 'recruteur'];
    const randomElement = myArray[Math.floor(Math.random() * myArray.length)];
    return {
      Nom: faker.person.lastName(),
      Prenom: faker.person.firstName(),
      Email: faker.internet.email(), 
      MotDePasse: motDePasse,
      type: randomElement
    },
    { 
        Nom: 'souhail',
        Prenom: 'elghiouane',
        Email: 'cand@gmail.com', 
        MotDePasse: motDePasse,
        type: 'candidat'
      }, { 
        Nom: 'amin',
        Prenom: 'amine',
        Email: 'forma@gmail.com', 
        MotDePasse: motDePasse,
        type: 'formateur'
      }, { 
        Nom: 'ben',
        Prenom: 'khalil',
        Email: 'recr@gmail.com', 
        MotDePasse: motDePasse,
        type: 'recruteur'
      };

  });

  
  await knex('Users').insert(users);

  
  // [
  //   { 
  //     Nom: 'souhail',
  //     Prenom: 'elghiouane',
  //     Email: 'ca@gmail.com', 
  //     MotDePasse: motDePasse,
  //     type: 'candidat'
  //   },
  //   {
  //     Nom: 'abdelbast',
  //     Prenom: 'mohamed',
  //     Email: 'fo@gmail.com', 
  //     MotDePasse: motDePasse,
  //     type: 'formateur'
  //   },
  //   {
  //     Nom: 'hassan',
  //     Prenom: 'alaoui',
  //     Email: 're@gmail.com', 
  //     MotDePasse: motDePasse,
  //     type: 'recruteur'
  //   }
  // ];

  // Perform the insert operation
  // await knex.transaction(async trx => {
  //   const insertedUsersIDs = await trx('Users').insert(users) //.returning('ID');
    
  //   // Write inserted user IDs to a file
  //   // try {
  //   //   fs.writeFileSync('inserted_users.json', JSON.stringify(insertedUsersIDs, null, 2));
  //   //   console.log('Inserted data saved to inserted_users.json');
  //   // } catch (error) {
  //   //   console.error('Error saving inserted data to file:', error);
  //   // }
  // });
};
