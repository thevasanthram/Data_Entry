const { json } = require('body-parser');
const express = require('express');
const { type } = require('os');
const path = require('path');
const { user } = require('pg/lib/defaults');
const Pool = require('pg').Pool;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('resources'));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'admin',
  port: 5432,
});
console.log('Wait few seconds for database connection');
// creating database and tables if not exists
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
            let dbConnectedPool = new Pool({
              user: 'postgres',
              host: 'localhost',
              database: 'data_entry_systems',
              password: 'admin',
              port: 5432,
            });

            dbConnectedPool.query(
              `CREATE TABLE IF NOT EXISTS defect_table(body_number int , mode varchar (8) , category varchar(30), subcategory varchar(30), defect varchar(20), subdefect varchar(20), zones text[], date varchar(10), time varchar(8), username varchar(30));`,
              (err, result) => {
                if (err) {
                  throw err;
                } else {
                  console.log('Defect Table Created');
                }
              }
            );

            dbConnectedPool.query(
              `CREATE TABLE IF NOT EXISTS body_number_table(body_number int , status varchar(10) , date varchar(10), time varchar(8), username varchar(30));`,
              (err, result) => {
                if (err) {
                  throw err;
                } else {
                  console.log('Body Number Table Created');
                }
              }
            );
          }
        });
      } else {
        console.log('Database connection established');
      }
    }
  }
);

const Options = {
  'UNDER BODY': {
    'RH APRON': ['A2A', 'A2B', 'A2C', 'A2D'],
    'LH APRON': ['A3A', 'A3B', 'A3C', 'A3D'],
    'FRONT FLOOR TOP SIDE': ['A4A', 'A4B', 'A4C', 'A4D'],
    'FRONT FLOOR BOTTOM SIDE': ['A4A', 'A4B', 'A4C', 'A4D'],
    'CENTER FLOOR TOP SIDE': ['A4A', 'A4B', 'A4C', 'A4D'],
    'CENTER FLOOR BOTTOM SIDE': ['A4A', 'A4B', 'A4C', 'A4D'],
    'REAR FLOOR TOP SIDE': ['A4A', 'A4B', 'A4C', 'A4D'],
    'REAR FLOOR BOTTOM SIDE': ['A4A', 'A4B', 'A4C', 'A4D'],
    'DASH OUTER': ['A4A', 'A4B', 'A4C', 'A4D'],
    'DASH INNER': ['A4A', 'A4B', 'A4C', 'A4D'],
    'RADIATOR SUPPORT': ['A1A', 'A1B', 'A1C', 'A1D'],
    'LOWER BACK': ['A4A', 'A4B', 'A4C', 'A4D'],
  },

  'RH MAIN BODY': {
    'B-PILLAR - RH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'A-PILLAR - RH': ['C4A', 'C4B', 'C4C', 'C4D'],
    COWL: ['C1A', 'C1B', 'C1C', 'C1D'],
    'C-PILLAR - RH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'BACK DOOR OPENING - RH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'FRONT DOOR OPENING - RH': ['C2A', 'C2B', 'C2C', 'C2D'],
    'QUARTER - RH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'REAR DOOR OPENING - RH': ['C3A', 'C3B', 'C3C', 'C3D'],
    'ROCKER PANEL SIDE - RH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'ROOF SIDE - RH': ['C4A', 'C4B', 'C4C', 'C4D'],
  },

  'LH MAIN BODY': {
    'B-PILLAR - LH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'A-PILLAR - LH': ['C4A', 'C4B', 'C4C', 'C4D'],
    COWL: ['C1A', 'C1B', 'C1C', 'C1D'],
    'C-PILLAR - LH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'BACK DOOR OPENING - LH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'FRONT DOOR OPENING - LH': ['C2A', 'C2B', 'C2C', 'C2D'],
    'QUARTER - LH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'REAR DOOR OPENING - LH': ['C3A', 'C3B', 'C3C', 'C3D'],
    'ROCKER PANEL SIDE - LH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'ROOF SIDE - LH': ['C4A', 'C4B', 'C4C', 'C4D'],
  },

  'RH SHELL BODY SUB-LINE': {
    'HOOD S/A OUTER': ['D1A', 'D1B', 'D1C', 'D1D'],
    'HOOD S/A INNER': ['D2A', 'D2B', 'D2C', 'D2D'],
    'FRONT DOOR OUTER - RH': ['D3A', 'D3B', 'D3C', 'D3D'],
    'FRONT DOOR INNER - RH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR OUTER - RH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR INNER - RH': ['D4A', 'D4B', 'D4C', 'D4D'],
  },

  'LH SHELL BODY SUB-LINE': {
    'FRONT DOOR OUTER - LH': ['D1A', 'D1B', 'D1C', 'D1D'],
    'FRONT DOOR INNER - LH': ['D2A', 'D2B', 'D2C', 'D2D'],
    'BACK DOOR OUTER': ['D4A', 'D4B', 'D4C', 'D4D'],
    'BACK DOOR INNER': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR OUTER - LH': ['D3A', 'D3B', 'D3C', 'D3D'],
    'REAR DOOR INNER - LH': ['D4A', 'D4B', 'D4C', 'D4D'],
  },

  'RH SHELL BODY MAIN-LINE': {
    'FENDER - RH': [1, 2, 3, 4, 5, 6, 7],
    'HOOD S/A OUTER': ['D1A', 'D1B', 'D1C', 'D1D'],
    'HOOD S/A INNER': ['D2A', 'D2B', 'D2C', 'D2D'],
    'FRONT DOOR OUTER - RH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'FRONT DOOR INNER - RH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR OUTER - RH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR INNER - RH': ['D4A', 'D4B', 'D4C', 'D4D'],
  },

  'LH SHELL BODY MAIN-LINE': {
    'FENDER - LH': [1, 2, 3, 4, 5, 6, 7],
    'FRONT DOOR OUTER - LH': ['D2A', 'D2B', 'D2C', 'D2D'],
    'FRONT DOOR INNER - LH': ['D3A', 'D3B', 'D3C', 'D3D'],
    'REAR DOOR OUTER - LH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR INNER - LH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'BACK DOOR OUTER': ['D4A', 'D4B', 'D4C', 'D4D'],
    'BACK DOOR INNER': ['D4A', 'D4B', 'D4C', 'D4D'],
  },

  'RH SIDE MEMBER': {
    'A-PILLAR - RH': ['D1A', 'D1B', 'D1C', 'D1D'],
    'C-PILLAR - RH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'B-PILLAR - RH': ['D2A', 'D2B', 'D2C', 'D2D'],
    'BACK DOOR OPENING - RH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'FRONT DOOR OPENING - RH': ['D3A', 'D3B', 'D3C', 'D3D'],
    'QUARTER - RH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR OPENING - RH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'ROCKER PANEL SIDE - RH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'ROOF SIDE - RH': ['D4A', 'D4B', 'D4C', 'D4D'],
  },

  'LEFT SIDE MEMBER': {
    'A-PILLAR - LH': ['D1A', 'D1B', 'D1C', 'D1D'],
    'C-PILLAR - LH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'B-PILLAR - LH': ['D2A', 'D2B', 'D2C', 'D2D'],
    'BACK DOOR OPENING - LH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'FRONT DOOR OPENING - LH': ['D3A', 'D3B', 'D3C', 'D3D'],
    'QUARTER - LH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR OPENING - LH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'ROCKER PANEL SIDE - LH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'ROOF SIDE - LH': ['D4A', 'D4B', 'D4C', 'D4D'],
  },
};

let username = ' ';

let enteredBodyNumber = 0;
let mode = 'online';
let selectedCategory = '';
let selectedSubCategory = '';
let defectBodyNumberStatus = '';

app.get('/', (req, res) => {
  try {
    res.render(path.join(__dirname, '/views/home.ejs'));
  } catch (err) {
    console.log(err);
  }
});

app.post('/login', (req, res) => {
  try {
    username = req.body.username;
    const password = req.body.password;

    if (username == 'Administrator') {
      res.redirect('/filter');
    } else {
      res.redirect('/follower');
    }
  } catch (err) {
    console.log(err);
  }
});

app.get('/follower', (req, res) => {
  try {
    res.render(path.join(__dirname, '/views/follower.ejs'), { username });
  } catch (err) {
    console.log(err);
  }
});

app.post('/bodyNumber', (req, res) => {
  try {
    const enteredBodyNumberValue = req.body.enteredBodyNumberValue;

    let dbConnectedPool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'data_entry_systems',
      password: 'admin',
      port: 5432,
    });

    // console.log(
    //   `SELECT * FROM body_number_table WHERE body_number=${enteredBodyNumberValue};`
    // );

    let currentDate = new Date();

    const date =
      String(currentDate.getFullYear()) +
      '-' +
      (currentDate.getMonth() + 1 <= 9
        ? '0' + Number(currentDate.getMonth() + 1)
        : Number(currentDate.getMonth() + 1)) +
      '-' +
      String(currentDate.getDate());

    dbConnectedPool.query(
      `SELECT * FROM body_number_table WHERE body_number=${enteredBodyNumberValue} and date ='${date}';`,
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          if (result.rows.length == 0) {
            let response = {
              status: 'success',
              data: [],
            };

            // console.log(JSON.stringify(response));

            res.send(JSON.stringify(response));
          } else {
            let response = {
              status: 'success',
              data: result.rows,
            };

            // console.log(JSON.stringify(response));

            res.end(JSON.stringify(response));
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.post('/passcar', (req, res) => {
  try {
    let dbConnectedPool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'data_entry_systems',
      password: 'admin',
      port: 5432,
    });

    let currentDate = new Date();

    const date =
      String(currentDate.getFullYear()) +
      '-' +
      (currentDate.getMonth() + 1 <= 9
        ? '0' + Number(currentDate.getMonth() + 1)
        : Number(currentDate.getMonth() + 1)) +
      '-' +
      String(currentDate.getDate());

    const time =
      String(currentDate.getHours()) +
      ':' +
      String(currentDate.getMinutes()) +
      ':' +
      String(currentDate.getSeconds());

    bodyNumber = req.body.bodyNumber;
    bodyNumberStatus = req.body.bodyNumberStatus;

    console.log(bodyNumber, bodyNumberStatus);

    if (bodyNumberStatus == 'newBodyNumber') {
      console.log(
        `INSERT INTO body_number_table (body_number,status,date,time,username) VALUES (${req.body.bodyNumber},'No Defect','${date}','${time}','${username}')`
      );
      dbConnectedPool.query(
        `INSERT INTO body_number_table (body_number,status,date,time,username) VALUES (${req.body.bodyNumber},'No Defect','${date}','${time}','${username}')`,
        (error, result) => {
          if (error) {
            throw error;
          } else {
            // console.log('New Body Number', result);
          }
        }
      );
    }

    let response = {
      status: 'success',
    };

    res.end(JSON.stringify(response));
  } catch (err) {
    console.log(err);
  }
});

app.post('/firstlayer', (req, res) => {
  try {
    if (Object.keys(req.body).length > 0) {
      enteredBodyNumber = req.body.bodyNumber;
      defectBodyNumberStatus = req.body.bodyNumberStatus;
    }

    bodyNumberOptions = Object.keys(Options);
    res.render(path.join(__dirname, '/views/firstLayer.ejs'), {
      username,
      enteredBodyNumber,
      bodyNumberOptions: bodyNumberOptions,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post('/secondlayer', (req, res) => {
  try {
    if (Object.keys(req.body).length > 0) {
      selectedCategory = req.body.selectedCategory;
      // mode = req.body.connectionMode;
    }
    const categoryOptions = Options[selectedCategory];
    let ShortlistedCategoryOptions = Object.keys(categoryOptions);

    res.render(path.join(__dirname, '/views/secondLayer.ejs'), {
      username,
      enteredBodyNumber,
      selectedCategory,
      ShortlistedCategoryOptions,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post('/thirdlayer', (req, res) => {
  try {
    if (Object.keys(req.body).length > 0) {
      selectedSubCategory = req.body.selectedSubCategory;
    }

    console.log(selectedSubCategory);

    var SubCategoryOptions = Options[selectedCategory];
    SubCategoryOptions = SubCategoryOptions[selectedSubCategory];

    ShortlistedSubCategoryOptions = SubCategoryOptions;

    const defectObject = {
      surface: {
        name: 'Surface',
        subdefects: {
          dent: 'Dent',
          bump: 'Bump',
          burrs: 'Burrs',
          spatters: 'Spatters',
          others: 'Others',
        },
      },
      bodyFitting: {
        name: 'Body Fitting',
        subdefects: {
          'body-fitting-1': 'Body Fitting 1',
          'body-fitting-2': 'Body Fitting 2',
          'body-fitting-others': 'Body Fitting Others',
        },
      },
      missingWrongPart: {
        name: 'Missing & Wrong Part',
        subdefects: {
          'missing-part': 'Missing Part',
          'wrong-part': 'Wrong Part',
        },
      },
      welding: {
        name: 'Welding',
        subdefects: {
          'welding-part-1': 'Welding Part 1',
          'welding-part-2': 'Welding Part 2',
          'welding-part-3': 'Welding Part 3',
          'welding-part-others': 'Welding Part Others',
        },
      },
      waterLeak: {
        name: 'Water Leak',
        subdefects: {
          'water-leak-1': 'Water Leak 1',
          'water-leak-2': 'Water Leak 2',
          'water-leak-others': 'Water Leak Others',
        },
      },
    };

    let categoryId = selectedCategory.replaceAll(' ', '_');
    let subcategoryId = selectedSubCategory.replaceAll(' ', '');

    console.log(categoryId, subcategoryId);

    res.render(path.join(__dirname, '/views/thirdLayer copy.ejs'), {
      username,
      enteredBodyNumber,
      selectedCategory,
      selectedSubCategory,
      defectObject,
      ShortlistedSubCategoryOptions,
      categoryId,
      subcategoryId,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post('/receive-thirdLayer-temp', async (req, res) => {
  try {
    let filledDefects = {};
    let tempSubDefectCategory = {};
    let defectCategory, subDefectCategory;
    let currentDate = new Date();

    const date =
      String(currentDate.getFullYear()) +
      '-' +
      (currentDate.getMonth() + 1 <= 9
        ? '0' + Number(currentDate.getMonth() + 1)
        : Number(currentDate.getMonth() + 1)) +
      '-' +
      String(currentDate.getDate());

    const time =
      String(currentDate.getHours()) +
      ':' +
      String(currentDate.getMinutes()) +
      ':' +
      String(currentDate.getSeconds());

    for (let i in req.body) {
      defectCategory = i.split('_')[0];
      subDefectCategory = i.split('_')[1];
      tempSubDefectCategory[subDefectCategory] = req.body[i];
      if (filledDefects.hasOwnProperty(defectCategory)) {
        temp = filledDefects[defectCategory];
        temp[subDefectCategory] = req.body[i];
        filledDefects[defectCategory] = temp;
        temp = {};
      } else {
        filledDefects[defectCategory] = tempSubDefectCategory;
      }
      tempSubDefectCategory = {};
    }

    let dbConnectedPool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'data_entry_systems',
      password: 'admin',
      port: 5432,
    });

    for (let i in filledDefects) {
      let subdefects = filledDefects[i];
      for (let j in subdefects) {
        console.log(
          `INSERT INTO defect_table (body_number,mode,category,subcategory,defect,subdefect,zones,date,time,username) VALUES (${enteredBodyNumber},'${mode}','${selectedCategory}','${selectedSubCategory}','${i}','${j}',ARRAY[${subdefects[j]}],'${date}','${time}','${username}');`
        );
        dbConnectedPool.query(
          `INSERT INTO defect_table (body_number,mode,category,subcategory,defect,subdefect,zones,date,time,username) VALUES (${enteredBodyNumber},'${mode}','${selectedCategory}','${selectedSubCategory}','${i}','${j}',ARRAY[${subdefects[j]}],'${date}','${time}','${username}');`,
          (error, result) => {
            if (error) {
              // console.log(filledDefects);
              console.log(error);
            }
          }
        );
      }
    }

    console.log(defectBodyNumberStatus);

    if (defectBodyNumberStatus == 'newBodyNumber') {
      console.log(
        `INSERT INTO body_number_table (body_number,status,date,time,username) VALUES (${enteredBodyNumber},'Defect','${date}','${time}','${username}')`
      );
      dbConnectedPool.query(
        `INSERT INTO body_number_table (body_number,status,date,time,username) VALUES (${enteredBodyNumber},'Defect','${date}','${time}','${username}')`,
        (error, result) => {
          if (error) {
            throw error;
          } else {
            // console.log('New Body Number', result);
          }
        }
      );
      defectBodyNumberStatus = 'existingBodyNumber';
    } else if (defectBodyNumberStatus == 'existingBodyNumber') {
      console.log(
        `UPDATE body_number_table SET time='${time}' WHERE body_number = '${enteredBodyNumber}' and date='${date}';`
      );
      dbConnectedPool.query(
        `UPDATE body_number_table SET time='${time}' WHERE body_number = '${enteredBodyNumber}' and date='${date}';`,
        (error, result) => {
          if (error) {
            throw error;
          } else {
            // console.log('Body Number Modified', result);
          }
        }
      );
    }

    res.redirect('/redirectedfirstlayer');
  } catch (err) {
    console.log(err);
  }
});

app.get('/redirectedfirstlayer', (req, res) => {
  try {
    bodyNumberOptions = Object.keys(Options);
    res.render(path.join(__dirname, '/views/redirectedFirstLayer.ejs'), {
      username,
      enteredBodyNumber,
      bodyNumberOptions: bodyNumberOptions,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/administrator', async (req, res) => {
  try {
    if (username == 'Administrator') {
      res.render(path.join(__dirname, '/views/admin.ejs'), { username });
    } else {
      res.redirect('/');
    }
  } catch (err) {
    console.log(err);
  }
});

app.get('/filter', async (req, res) => {
  try {
    if (username == 'Administrator') {
      res.render(path.join(__dirname, '/views/filtering.ejs'), { username });
    } else {
      res.send('Enter as Administrator mode');
    }
  } catch (err) {
    console.log(err);
  }
});

// app.get('/lookup', async (req, res) => {
//   try {
//     Data = await DataSchema.find();
//     if (username == 'Administrator') {
//       res.render(path.join(__dirname, '/views/lookup.ejs'), {
//         data: Data,
//         username,
//       });
//     } else {
//       res.redirect('/');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get('/filtering', async (req, res) => {
//   try {
//     // console.log(Data);

//     if (username == 'Administrator') {
//       res.render(path.join(__dirname, '/views/filtering.ejs'), {
//         username,
//       });
//     } else {
//       res.redirect('/');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post('/delete', async (req, res) => {
//   try {
//     if (username == 'Administrator') {
//       const deleteBodyNumber = req.body.bodyNumber;
//       const deleteCategoryChosen = req.body.categoryChosen;
//       const deleteSubCategoryChosen = req.body.subCategoryChosen;
//       const deleteDefectArea = req.body.defectArea;
//       const deleteDate = req.body.date;
//       const deleteTime = req.body.time;
//       const deleteUsername = req.body.username;

//       // console.log(deleteOption, deleteCategoryChosen, deleteSubCategoryChosen);

//       await DataSchema.deleteOne({
//         bodyNumber: deleteBodyNumber,
//         categoryChosen: deleteCategoryChosen,
//         subCategoryChosen: deleteSubCategoryChosen,
//         defectArea: deleteDefectArea,
//         date: deleteDate,
//         time: deleteTime,
//         username: deleteUsername,
//       });

//       res.redirect('/lookup');
//     } else {
//       res.redirect('/');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post('/visualization', async (req, res) => {
//   try {
//     if (username == 'Administrator') {
//       const column = req.body.chosenColumn;

//       const Data = await DataSchema.find();

//       const columnData = [];
//       for (let i = 0; i < Data.length; i++) {
//         columnData.push(Data[i].optionChosen);
//       }

//       let uniquevalues = new Set(columnData);
//       uniquevalues = Array.from(uniquevalues);

//       // creating an object with unique values for counting occurrence
//       let columnDataObj = {};
//       for (let i = 0; i < uniquevalues.length; i++) {
//         columnDataObj[`${uniquevalues[i]}`] = 0;
//       }

//       //counting each unique values occurrence
//       for (let i = 0; i < columnData.length; i++) {
//         columnDataObj[`${columnData[i]}`]++;
//       }

//       let occurrence = Object.values(columnDataObj);

//       res.render(path.join(__dirname, '/views/chart.ejs'), {
//         xvalues: uniquevalues,
//         yvalues: occurrence,
//       });
//     } else {
//       res.redirect('/');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

app.get('/logout', (req, res) => {
  try {
    username = '';
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

app.listen(8000, () => {
  console.log(
    'Data Entry tool running on port 8000. Go to Browser and search for localhost:8000 to open.'
  );
});
