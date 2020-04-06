'use strict';
const config = require('./config');
const Postgres = require('pg').Client;

const sql = new Postgres(config);
sql.connect();

async function listLinks() {
  const q = 'SELECT * FROM continenttable;';
  const result = await sql.query(q);
  return result.rows;
}

async function getCountryId(country) {
  const q = 'SELECT cou_id FROM countrytable WHERE cou_name = $1;';
  const result = await sql.query(q, [country]);
  return result.rows[0];
}

async function addLink(inst, link, country) {
  const q = 'INSERT INTO linktable (lin_inst, lin_url, cou_id) VALUES ($1, $2, $3);';
  await sql.query(q, [inst], [link], getCountryId(country));
  return listLinks();
}
