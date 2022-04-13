'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ur = require('./userreply');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/client'));
app.use(express.json());

// routes

async function getMessages(req, res) {
  res.json(await ur.listMessages());
}

async function postMessage(req, res) {
  const ans = await ur.addMessage(req.body.name, req.body.quest, req.body.col, req.body.velo, req.body.lord, req.body.langs);
  res.json(ans);
}
// wrap async function for express.js error handling
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.post('/api', express.json(), asyncWrap(postMessage));
app.get('/api', asyncWrap(getMessages));


app.listen(8080, function () {
  console.log('Server started on port 8080');
});
