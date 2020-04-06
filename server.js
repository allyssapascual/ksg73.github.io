'use strict';

const express = require('express');
const app = express();
const lm = require('./linksdatabase')

app.use(express.static('client', { extensions: ['html'] }));

async function getLinks(req, res) {
  res.json(await lm.listLinks());
}

async function postLink(req, res) {
  const link = await lm.addLink(req.body.inst, req.body.link, req.body.country);
  res.json(link);
}

function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.get('api/link', asyncWrap(getLinks));
app.post('api/link', express.json(), asyncWrap(postLink));

app.listen(8080);
