'use strict';

const express = require('express');
const app = express();
const lm = require('./linksboard')

app.use(express.static('client', { extensions: ['html'] }));

async function postLink(req, res) {
  const link = await lm.addLink(req.body);
  res.json(link);
}

function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.post('api/link', express.json(), asyncWrap(postLink));

app.listen(8080);
