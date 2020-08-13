const knex = require("knex");
var path = require("path");
var dotEnvPath = path.resolve("./.env");
require("dotenv").config({ path: dotEnvPath });

const knexfile = require("../knexfile.js");
console.log(process.env.NODE_ENV);
const environment = process.env.NODE_ENV || "development"; //SET TO process.env.DB_ENV to run test suites

module.exports = knex(knexfile["testing"]);
