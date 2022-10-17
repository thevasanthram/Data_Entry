const Pool = require('pg').Pool;

const dbConnectedPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'admin',
  port: 5432,
});

try {
  const response = dbConnectedPool.query(
    `CREATE TABLE IF NOT EXISTS defect_table(body_number int , mode varchar (8) , category varchar(30), subcategory varchar(30), defect varchar(20), subdefect varchar(20), zone int, defectCount int, date varchar(10), time varchar(8), username varchar(30));`,
    (error, result) => {
      if (error) {
        console.log('error', error);
      } else {
        console.log('result', result);
      }
    }
  );
} catch {}
