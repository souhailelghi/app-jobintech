exports.up = function(knex) {
  return knex.schema
    .createTable('Users', function(table) {
      table.increments('ID').primary();
      table.string('Nom', 50);
      table.string('Prenom', 50);
      table.string('Email', 100);
      table.string('MotDePasse', 255);
      table.enum('type', ['candidat', 'formateur','recruteur']).notNullable();
    })
    .createTable('Candidat', function(table) {
      table.increments('ID').primary();
      table.integer('UserID').unsigned().unique();
      table.string('CV', 255);
      table.foreign('UserID').references('Users.ID');
    })
    .createTable('Competence', function(table) {
      table.increments('ID').primary();
      table.integer('CandidatID').unsigned();
      table.string('Langage', 50);
      table.string('Framework', 50);
      table.string('Niveau', 20);
      table.foreign('CandidatID').references('Candidat.ID');
    })
    .createTable('Offre', function(table) {
      table.increments('ID').primary();
      table.string('Titre', 100);
      table.text('Description');
      table.decimal('Salaire', 10, 2);
      table.string('Lieu', 100);
    })
    .createTable('Postulation', function(table) {
      table.increments('ID').primary();
      table.integer('CandidatID').unsigned();
      table.integer('OffreID').unsigned();
      table.date('DatePostulation');
      table.string('Statut', 50);
      table.text('Feedback');
      table.foreign('CandidatID').references('Candidat.ID');
      table.foreign('OffreID').references('Offre.ID');
    })
    .createTable('Formateur', function(table) {
      table.increments('ID').primary();
      table.integer('UserID').unsigned().unique();
      table.string('DomaineExpertise', 100);
      table.foreign('UserID').references('Users.ID');
    })
    .createTable('Evaluation', function(table) {
      table.increments('ID').primary();
      table.integer('CandidatID').unsigned();
      table.integer('FormateurID').unsigned();
      table.integer('Note');
      table.text('Commentaire');
      table.date('DateEvaluation');
      table.foreign('CandidatID').references('Candidat.ID');
      table.foreign('FormateurID').references('Formateur.ID');
    })
    .createTable('Recruteur', function(table) {
      table.increments('ID').primary();
      table.integer('UserID').unsigned().unique();
      table.string('NomEntreprise', 100);
      table.foreign('UserID').references('Users.ID');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Recruteur')
    .dropTableIfExists('Evaluation')
    .dropTableIfExists('Formateur')
    .dropTableIfExists('Postulation')
    .dropTableIfExists('Offre')
    .dropTableIfExists('Competence')
    .dropTableIfExists('Candidat')
    .dropTableIfExists('Users');
};
