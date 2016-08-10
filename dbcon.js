var pg = require('pg');

const Pool = require('pg-pool');
const url = require('url')

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');
const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
};

const pool = new Pool(config);

pg.defaults.ssl = true;
// pg.connect(process.env.DATABASE_URL, function(err, client) {
//     if (err) throw err;
//       console.log('Connected to postgres! Getting schemas...');

//      client.query('SELECT table_schema,table_name FROM information_schema.tables;').on('row', function(row) {console.log(JSON.stringify(row));});});
module.exports.pool = pool;
