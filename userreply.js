'use strict';

const uuid = require('uuid-random');
const sqlite = require('sqlite');

async function init() {
  const db = await sqlite.open('./database.sqlite', { verbose: true });
  await db.migrate({ migrationsPath: './db' });
  return db;
}

const dbConn = init();

async function listMessages() {
  const people = await db.all('SELECT * FROM Person');
 console.log('all person', JSON.stringify(people, null, 2));
}

async function addMessage(name, ques, velo, col, lord, lang) {
  const db = await dbConn;

  const id = uuid();
  await db.run('INSERT INTO useranswer VALUES (?,?,?,?,?,?,?)', [id, name, ques, velo, col, lord, lang]);
  console.log(id, name, ques, velo, col, lord, lang);
}

module.exports = {
  listMessages,
  addMessage,
};
