/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const bcrypt = require('bcrypt');

exports.seed = exports.seed = function (knex) {
  return knex('users').del().then(async function () {

    let motDePasse = await bcrypt.hash('123', 10);
    
    return knex('users').insert([
      { 
        Nom: 'souhail',
        Prenom: 'elghiouane',
        Email: 'admin@gmail.com', 
        MotDePasse: motDePasse,
        type: 'candidat'
      } ,
      {
        Nom: 'abdelbast',
        Prenom: 'mohamed',
        Email: 'abdo@gmail.com', 
        MotDePasse: motDePasse,
        type: 'formateur'
      },
      {
        Nom: 'hassan',
        Prenom: 'alaoui',
        Email: 'hassan@gmail.com', 
        MotDePasse: motDePasse,
        type: 'candidat'
      }
    ]);
    
  });
};

