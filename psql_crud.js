const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'admin',
  port: 5432,
});

pool.query(
  `SELECT FROM pg_database WHERE datname = 'data_entry_systems'`,
  (error, results) => {
    if (error) {
      throw error;
    } else {
      if (results.rowCount == 0) {
        pool.query(`CREATE DATABASE data_entry_systems`, (err, res) => {
          if (err) {
            throw error;
          } else {
            console.log('database created');
            let dbConnectedPool = new Pool({
              user: 'postgres',
              host: 'localhost',
              database: 'data_entry_systems',
              password: 'admin',
              port: 5432,
            });

            dbConnectedPool.query(
              `CREATE TABLE IF NOT EXISTS defect_table(body_number int , category char(30 )) `,
              (err, result) => {
                if (err) {
                  throw err;
                } else {
                  console.log('executed dbConnected Pool');
                  console.log(result);
                }
              }
            );
          }
        });
      }
    }
  }
);
