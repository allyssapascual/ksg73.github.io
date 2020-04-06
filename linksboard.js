'use strict';
const config = require('./config');
const Postgres = require('pg').Client;

const sql = new Postgres(config);
sql.connect();
