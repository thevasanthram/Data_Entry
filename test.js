// const Pool = require('pg').Pool;

// let dbConnectedPool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'data_entry_systems',
//   password: 'admin',
//   port: 5432,
// });

// async function checker() {
//   const response = await dbConnectedPool.query('SELECT * FROM defect_table');
//   console.log(response.rows[1].zones[0]);
// }

// console.log('1');

// checker();

let array = ['A3A', 'A2A', 'A3A'];

// // ARRAY['A3A','A3A','A3A']
// // ARRAY[A3A,A3A,A3A]

// console.log(
//   (array = array.map((el) => {
//     el = `'${el}'`;
//   }))
// );

console.log(`'${array.join(`','`)}'`);
