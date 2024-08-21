const sqliteConnection = require('../../sqlite');

const createUsers = require('./createusers');

async function migrationRun(){
  const schemas = [
    createUsers
  ].join('');

  sqliteConnection()
    .then(db => db.execute(schemas))
    .catch(error => console.error(error));
}

module.exports = migrationRun;