const express = require('express');
const path = require('path');
const Pool = require('pg').Pool;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./resources'));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'admin',
  port: 5432,
});
console.log(
  'Please, wait for Database confirmation message. Start, once you receive'
);
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
    'B-PILLAR - RH MB': ['C4A', 'C4B', 'C4C', 'C4D'],
    'A-PILLAR - RH MB': ['C4A', 'C4B', 'C4C', 'C4D'],
    'COWL-RH MB': ['C1A', 'C1B', 'C1C', 'C1D'],
    'C-PILLAR - RH MB': ['C4A', 'C4B', 'C4C', 'C4D'],
    'BACK DOOR OPENING - RH MB': ['C4A', 'C4B', 'C4C', 'C4D'],
    'FRONT DOOR OPENING - RH MB': ['C2A', 'C2B', 'C2C', 'C2D'],
    'QUARTER - RH MB': ['C4A', 'C4B', 'C4C', 'C4D'],
    'REAR DOOR OPENING - RH MB': ['C3A', 'C3B', 'C3C', 'C3D'],
    'ROCKER PANEL SIDE - RH MB': ['C4A', 'C4B', 'C4C', 'C4D'],
    'ROOF SIDE - RH MB': ['C4A', 'C4B', 'C4C', 'C4D'],
  },

  'LH MAIN BODY': {
    'B-PILLAR - LH MB': ['C4A', 'C4B', 'C4C', 'C4D'],
    'A-PILLAR - LH MB': ['C4A', 'C4B', 'C4C', 'C4D'],
    'COWL-LH MB': ['C1A', 'C1B', 'C1C', 'C1D'],
    'C-PILLAR - LH MB': ['C4A', 'C4B', 'C4C', 'C4D'],
    'BACK DOOR OPENING - LH MB': ['C4A', 'C4B', 'C4C', 'C4D'],
    'FRONT DOOR OPENING - LH MB': ['C2A', 'C2B', 'C2C', 'C2D'],
    'QUARTER - LH MB': ['C4A', 'C4B', 'C4C', 'C4D'],
    'REAR DOOR OPENING - LH MB': ['C3A', 'C3B', 'C3C', 'C3D'],
    'ROCKER PANEL SIDE - LH MB': ['C4A', 'C4B', 'C4C', 'C4D'],
    'ROOF SIDE - LH MB': ['C4A', 'C4B', 'C4C', 'C4D'],
  },

  'RH SHELL BODY SUB-LINE': {
    'HOOD S/A OUTER - RH SBSA': ['D1A', 'D1B', 'D1C', 'D1D'],
    'HOOD S/A INNER - RH SBSA': ['D2A', 'D2B', 'D2C', 'D2D'],
    'FRONT DOOR OUTER - RH SBSA': ['D3A', 'D3B', 'D3C', 'D3D'],
    'FRONT DOOR INNER - RH SBSA': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR OUTER - RH SBSA': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR INNER - RH SBSA': ['D4A', 'D4B', 'D4C', 'D4D'],
  },

  'LH SHELL BODY SUB-LINE': {
    'FRONT DOOR OUTER - LH SBSA': ['D1A', 'D1B', 'D1C', 'D1D'],
    'FRONT DOOR INNER - LH SBSA': ['D2A', 'D2B', 'D2C', 'D2D'],
    'BACK DOOR OUTER - LH SBSA': ['D4A', 'D4B', 'D4C', 'D4D'],
    'BACK DOOR INNER - LH SBSA': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR OUTER - LH SBSA': ['D3A', 'D3B', 'D3C', 'D3D'],
    'REAR DOOR INNER - LH SBSA': ['D4A', 'D4B', 'D4C', 'D4D'],
  },

  'RH SHELL BODY MAIN-LINE': {
    'FENDER - RH SBML': [1, 2, 3, 4, 5, 6, 7],
    'HOOD S/A OUTER SBML': ['D1A', 'D1B', 'D1C', 'D1D'],
    'HOOD S/A INNER SBML': ['D2A', 'D2B', 'D2C', 'D2D'],
    'FRONT DOOR OUTER - RH SBML': ['D4A', 'D4B', 'D4C', 'D4D'],
    'FRONT DOOR INNER - RH SBML': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR OUTER - RH SBML': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR INNER - RH SBML': ['D4A', 'D4B', 'D4C', 'D4D'],
  },

  'LH SHELL BODY MAIN-LINE': {
    'FENDER - LH SBML': [1, 2, 3, 4, 5, 6, 7],
    'FRONT DOOR OUTER - LH SBML': ['D2A', 'D2B', 'D2C', 'D2D'],
    'FRONT DOOR INNER - LH SBML': ['D3A', 'D3B', 'D3C', 'D3D'],
    'REAR DOOR OUTER - LH SBML': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR INNER - LH SBML': ['D4A', 'D4B', 'D4C', 'D4D'],
    'BACK DOOR OUTER SBML': ['D4A', 'D4B', 'D4C', 'D4D'],
    'BACK DOOR INNER SBML': ['D4A', 'D4B', 'D4C', 'D4D'],
  },

  'RH SIDE MEMBER': {
    'A-PILLAR - RH SM': ['D1A', 'D1B', 'D1C', 'D1D'],
    'C-PILLAR - RH SM': ['D4A', 'D4B', 'D4C', 'D4D'],
    'B-PILLAR - RH SM': ['D2A', 'D2B', 'D2C', 'D2D'],
    'BACK DOOR OPENING - RH SM': ['D4A', 'D4B', 'D4C', 'D4D'],
    'FRONT DOOR OPENING - RH SM': ['D3A', 'D3B', 'D3C', 'D3D'],
    'QUARTER - RH SM': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR OPENING - RH SM': ['D4A', 'D4B', 'D4C', 'D4D'],
    'ROCKER PANEL SIDE - RH SM': ['D4A', 'D4B', 'D4C', 'D4D'],
    'ROOF SIDE - RH SM': ['D4A', 'D4B', 'D4C', 'D4D'],
  },

  'LEFT SIDE MEMBER': {
    'A-PILLAR - LH SM': ['D1A', 'D1B', 'D1C', 'D1D'],
    'C-PILLAR - LH SM': ['D4A', 'D4B', 'D4C', 'D4D'],
    'B-PILLAR - LH SM': ['D2A', 'D2B', 'D2C', 'D2D'],
    'BACK DOOR OPENING - LH SM': ['D4A', 'D4B', 'D4C', 'D4D'],
    'FRONT DOOR OPENING - LH SM': ['D3A', 'D3B', 'D3C', 'D3D'],
    'QUARTER - LH SM': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR OPENING - LH SM': ['D4A', 'D4B', 'D4C', 'D4D'],
    'ROCKER PANEL SIDE - LH SM': ['D4A', 'D4B', 'D4C', 'D4D'],
    'ROOF SIDE - LH SM': ['D4A', 'D4B', 'D4C', 'D4D'],
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
      (currentDate.getDate() <= 9
        ? '0' + Number(currentDate.getDate())
        : Number(currentDate.getDate()));

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
      (currentDate.getDate() <= 9
        ? '0' + Number(currentDate.getDate())
        : Number(currentDate.getDate()));

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

    res.render(path.join(__dirname, '/views/thirdLayer.ejs'), {
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
    const defectObj = req.body.defectObj;
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
      (currentDate.getDate() <= 9
        ? '0' + Number(currentDate.getDate())
        : Number(currentDate.getDate()));

    const time =
      String(currentDate.getHours()) +
      ':' +
      String(currentDate.getMinutes()) +
      ':' +
      String(currentDate.getSeconds());

    Object.keys(defectObj).map((i) => {
      defectCategory = i.split('_')[0];
      subDefectCategory = i.split('_')[1];
      tempSubDefectCategory[subDefectCategory] = defectObj[i];
      if (filledDefects.hasOwnProperty(defectCategory)) {
        temp = filledDefects[defectCategory];
        temp[subDefectCategory] = defectObj[i];
        filledDefects[defectCategory] = temp;
        temp = {};
      } else {
        filledDefects[defectCategory] = tempSubDefectCategory;
      }
      tempSubDefectCategory = {};
    });

    console.log('filledDefects:', filledDefects);

    let dbConnectedPool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'data_entry_systems',
      password: 'admin',
      port: 5432,
    });

    let messageObject = {};

    async function messageObjectCreator(
      propertyName,
      correspondingZone,
      defectNameSubDefectName
    ) {
      messageObject[propertyName][correspondingZone] = [
        defectNameSubDefectName,
      ];
    }

    async function messageObjectModifier(
      propertyName,
      correspondingZone,
      defectNameSubDefectName
    ) {
      messageObject[propertyName][correspondingZone].push(
        defectNameSubDefectName
      );
    }

    // storing the defects or modifying
    Object.keys(filledDefects).map((defectName) => {
      Object.keys(filledDefects[defectName]).map(async (subDefectName) => {
        // checking whether already record exists with same aspects
        let result = await dbConnectedPool.query(
          `SELECT * FROM defect_table WHERE body_number=${enteredBodyNumber} AND category='${selectedCategory}' AND subcategory='${selectedSubCategory}' AND defect='${defectName}' AND subdefect='${subDefectName}'`
        );
        if (result.rows.length == 0) {
          // block to save defects record for the first time
          console.log(
            `INSERT INTO defect_table (body_number,mode,category,subcategory,defect,subdefect,zones,date,time,username) VALUES (${enteredBodyNumber},'${mode}','${selectedCategory}','${selectedSubCategory}','${defectName}','${subDefectName}',ARRAY['${filledDefects[
              defectName
            ][subDefectName].join(`','`)}'],'${date}','${time}','${username}');`
          );
          const newRecord = await dbConnectedPool.query(
            `INSERT INTO defect_table (body_number,mode,category,subcategory,defect,subdefect,zones,date,time,username) VALUES (${enteredBodyNumber},'${mode}','${selectedCategory}','${selectedSubCategory}','${defectName}','${subDefectName}',ARRAY['${filledDefects[
              defectName
            ][subDefectName].join(`','`)}'],'${date}','${time}','${username}');`
          );
          if (!messageObject['Newly Saved Zones']) {
            messageObject['Newly Saved Zones'] = {};
            filledDefects[defectName][subDefectName].map(async (singleZone) => {
              if (!messageObject['Newly Saved Zones'][singleZone]) {
                // creating the zone for the first time
                // messageObject['Newly Saved Zones'][singleZone] = [
                //   `${defectName} -> ${subDefectName}`,
                // ];
                await messageObjectCreator(
                  'Newly Saved Zones',
                  singleZone,
                  `${defectName} -> ${subDefectName}`
                );
              } else {
                // adding the defect & subdefect in the same existing zone in the newly created zone property
                // messageObject['Newly Saved Zones'][singleZone].push(
                //   `${defectName} -> ${subDefectName}`
                // );
                await messageObjectModifier(
                  'Newly Saved Zones',
                  singleZone,
                  `${defectName} -> ${subDefectName}`
                );
              }
            });
          }
        } else {
          // block to modify existing defect records
          // console.log('result:', result.rows);
          let temp = result.rows[0].zones;
          // console.log('Existing ZONES: ', temp);
          temp.push(...filledDefects[defectName][subDefectName]);
          // console.log(
          //   'New ZONES: ',
          //   filledDefects[defectName][subDefectName]
          // );
          let tempSet = new Set(temp);
          let updatedZones = Array.from(tempSet);
          // console.log('Updated ZONES: ', updatedZones);

          console.log(
            `UPDATE defect_table SET zones=ARRAY['${filledDefects[defectName][
              subDefectName
            ].join(
              `','`
            )}'],date='${date}',time='${time}',username='${username}' WHERE body_number=${enteredBodyNumber} AND category='${selectedCategory}' AND subcategory='${selectedSubCategory}' AND defect='${defectName}' AND subdefect='${subDefectName}'`
          );

          const updateRecord = await dbConnectedPool.query(
            `UPDATE defect_table SET zones=ARRAY['${filledDefects[defectName][
              subDefectName
            ].join(
              `','`
            )}'],date='${date}',time='${time}',username='${username}' WHERE body_number=${enteredBodyNumber} AND category='${selectedCategory}' AND subcategory='${selectedSubCategory}' AND defect='${defectName}' AND subdefect='${subDefectName}'`
          );

          // getting the modified zones
          filledDefects[defectName][subDefectName].map(
            async (singleFilledDefectZone) => {
              if (result.rows[0].zones.includes(singleFilledDefectZone)) {
                // code for Existing Zones in messageObject
                if (!messageObject['Already Saved Zones']) {
                  messageObject['Already Saved Zones'] = {};
                  if (
                    !messageObject['Already Saved Zones'][
                      singleFilledDefectZone
                    ]
                  ) {
                    // messageObject['Already Saved Zones'][singleFilledDefectZone] = [
                    //   `${defectName} -> ${subDefectName}`,
                    // ];

                    await messageObjectCreator(
                      'Already Saved Zones',
                      singleFilledDefectZone,
                      `${defectName} -> ${subDefectName}`
                    );
                  }
                } else {
                  if (
                    !messageObject['Already Saved Zones'][
                      singleFilledDefectZone
                    ]
                  ) {
                    // messageObject['Already Saved Zones'][singleFilledDefectZone] = [
                    //   `${defectName} -> ${subDefectName}`,
                    // ];

                    await messageObjectCreator(
                      'Already Saved Zones',
                      singleFilledDefectZone,
                      `${defectName} -> ${subDefectName}`
                    );
                  } else {
                    // messageObject['Already Saved Zones'][
                    //   singleFilledDefectZone
                    // ].push(`${defectName} -> ${subDefectName}`);

                    await messageObjectModifier(
                      'Already Saved Zones',
                      singleFilledDefectZone,
                      `${defectName} -> ${subDefectName}`
                    );
                  }
                }
              } else {
                // code for Creating zones in messageObject
                if (!messageObject['Newly Saved Zones']) {
                  messageObject['Newly Saved Zones'] = {};
                  if (
                    !messageObject['Newly Saved Zones'][singleFilledDefectZone]
                  ) {
                    // messageObject['Newly Saved Zones'][
                    //   singleFilledDefectZone
                    // ] = [`${defectName} -> ${subDefectName}`];

                    await messageObjectCreator(
                      'Newly Saved Zones',
                      singleFilledDefectZone,
                      `${defectName} -> ${subDefectName}`
                    );
                  }
                } else {
                  if (
                    !messageObject['Newly Saved Zones'][singleFilledDefectZone]
                  ) {
                    // messageObject['Newly Saved Zones'][
                    //   singleFilledDefectZone
                    // ] = [`${defectName} -> ${subDefectName}`];

                    await messageObjectCreator(
                      'Newly Saved Zones',
                      singleFilledDefectZone,
                      `${defectName} -> ${subDefectName}`
                    );
                  } else {
                    messageObject['Newly Saved Zones'][
                      singleFilledDefectZone
                    ].push(`${defectName} -> ${subDefectName}`);

                    await messageObjectModifier(
                      'Newly Saved Zones',
                      singleFilledDefectZone,
                      `${defectName} -> ${subDefectName}`
                    );
                  }
                }
              }
            }
          );
        }
      });
    });

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

    setTimeout(() => {
      res.send(
        JSON.stringify({
          status: 'success',
          data: messageObject,
        })
      );
    }, 3000);
    // console.log('messageObject -> without timeOUT', messageObject);

    // res.redirect('/redirectedfirstlayer');
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

app.post('/reportDataProvider', async (req, res) => {
  try {
    const queryReceiver = req.body.querySender;
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;

    let dbConnectedPool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'data_entry_systems',
      password: 'admin',
      port: 5432,
    });

    let queryResult = {
      UB: [],
      MB: [],
      'SB SA': [],
      'SB ML': [],
      SM: [],
    };

    let bodyNumberData = [];

    for (let [key, value] of Object.entries(queryReceiver)) {
      for (let j = 0; j < value.length; j++) {
        result = await dbConnectedPool.query(value[j]);
        let fetchedRows = result.rows;
        let defectsCount = 0;
        for (let k = 0; k < fetchedRows.length; k++) {
          if (
            Date.parse(fetchedRows[k].date) <= Date.parse(toDate) &&
            Date.parse(fetchedRows[k].date) >= Date.parse(fromDate)
          ) {
            defectsCount += fetchedRows[k].zones.length;
            bodyNumberData.push(fetchedRows[k].body_number);
          }
        }
        queryResult[key].push(defectsCount);
      }
    }

    res.end(
      JSON.stringify({
        status: 'success',
        uniqueBodyNumberData: Array.from(new Set(bodyNumberData)),
        data: queryResult,
      })
    );
  } catch (err) {
    console.log(err);
  }
});

app.post('/majorDefectDetail', async (req, res) => {
  try {
    const majorDefectsInAllGroup = req.body.majorDefectsInAllGroup;
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    // console.log(majorDefectsInAllGroup);

    function filter(fetchedRows, defectName) {
      const defectObject = {
        Surface: {
          Dent: 0,
          Bump: 0,
          Burrs: 0,
          Spatters: 0,
          Others: 0,
        },
        'Body Fitting': {
          'Body Fitting 1': 0,
          'Body Fitting 2': 0,
          'Body Fitting Others': 0,
        },
        'Missing & Wrong Part': {
          'Missing Part': 0,
          'Wrong Part': 0,
        },
        Welding: {
          'Welding Part 1': 0,
          'Welding Part 2': 0,
          'Welding Part 3': 0,
          'Welding Part Others': 0,
        },
        'Water Leak': {
          'Water Leak 1': 0,
          'Water Leak 2': 0,
          'Water Leak Others': 0,
        },
      };

      let tempDataStoringObj = defectObject[defectName];

      fetchedRows.map((record) => {
        if (
          Date.parse(record.date) <= Date.parse(toDate) &&
          Date.parse(record.date) >= Date.parse(fromDate)
        ) {
          tempDataStoringObj[record.subdefect] += record.zones.length;
        }
      });

      return tempDataStoringObj;
    }

    async function dataFetcher(groupCode) {
      let dbConnectedPool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'data_entry_systems',
        password: 'admin',
        port: 5432,
      });

      switch (groupCode) {
        case 'UB':
          const data1 = await dbConnectedPool.query(
            `SELECT * FROM defect_table WHERE category='UNDER BODY' and defect='${majorDefectsInAllGroup['UB']}';`
          );
          const data1response = filter(
            data1.rows,
            majorDefectsInAllGroup['UB']
          );
          // console.log('dataUB', data1response);
          return data1response;
        case 'MB':
          const data2 = await dbConnectedPool.query(
            `SELECT * FROM defect_table WHERE (category='LH MAIN BODY' or category='RH MAIN BODY') and defect='${majorDefectsInAllGroup['MB']}'`
          );
          const data2response = filter(
            data2.rows,
            majorDefectsInAllGroup['MB']
          );
          // console.log('dataMB', data2response);
          return data2response;
        case 'SB SA':
          const data3 = await dbConnectedPool.query(
            `SELECT * FROM defect_table WHERE (category='LH SHELL BODY SUB-LINE' or category='RH SHELL BODY SUB-LINE') and defect='${majorDefectsInAllGroup['SB SA']}'`
          );
          const data3response = filter(
            data3.rows,
            majorDefectsInAllGroup['SB SA']
          );
          // console.log('dataSB SA', data3response);
          return data3response;
        case 'SB ML':
          const data4 = await dbConnectedPool.query(
            `SELECT * FROM defect_table WHERE (category='LH SHELL BODY MAIN-LINE' or category='RH SHELL BODY MAIN-LINE') and defect='${majorDefectsInAllGroup['SB ML']}'`
          );
          const data4reponse = filter(
            data4.rows,
            majorDefectsInAllGroup['SB ML']
          );
          // console.log('dataSB ML', data4reponse);
          return data4reponse;
        case 'SM':
          const data5 = await dbConnectedPool.query(
            `SELECT * FROM defect_table WHERE (category='LEFT SIDE MEMBER' or category='RH SIDE MEMBER') and defect='${majorDefectsInAllGroup['SM']}'`
          );
          const data5response = filter(
            data5.rows,
            majorDefectsInAllGroup['SM']
          );
          // console.log('dataSM', data5response);
          return data5response;
        default:
          break;
      }
    }

    let majorDefectsDataInAllGroup = {
      UB: await dataFetcher('UB'),
      MB: await dataFetcher('MB'),
      'SB SA': await dataFetcher('SB SA'),
      'SB ML': await dataFetcher('SB ML'),
      SM: await dataFetcher('SM'),
    };

    // console.log(majorDefectsDataInAllGroup);

    let response = {
      status: 'success',
      data: majorDefectsDataInAllGroup,
    };

    res.send(JSON.stringify(response));
  } catch (err) {
    console.log(err);
  }
});

app.post('/majorSubDefectDetail', async (req, res) => {
  try {
    const majorSubDefectsInAllGroup = req.body.majorSubDefectsInAllGroup;
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;

    async function dataFetcher(groupCode, subDefectName) {
      let dbConnectedPool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'data_entry_systems',
        password: 'admin',
        port: 5432,
      });

      switch (groupCode) {
        case 'UB':
          const data1 = await dbConnectedPool.query(
            `SELECT * FROM defect_table WHERE category='UNDER BODY' and subdefect='${subDefectName}';`
          );
          return data1.rows;
        case 'MB':
          const data2 = await dbConnectedPool.query(
            `SELECT * FROM defect_table WHERE (category='LH MAIN BODY' or category='RH MAIN BODY') and subdefect='${subDefectName}'`
          );
          return data2.rows;
        case 'SB SA':
          const data3 = await dbConnectedPool.query(
            `SELECT * FROM defect_table WHERE (category='LH SHELL BODY SUB-LINE' or category='RH SHELL BODY SUB-LINE') and subdefect='${subDefectName}'`
          );
          return data3.rows;
        case 'SB ML':
          const data4 = await dbConnectedPool.query(
            `SELECT * FROM defect_table WHERE (category='LH SHELL BODY MAIN-LINE' or category='RH SHELL BODY MAIN-LINE') and subdefect='${subDefectName}'`
          );
          return data4.rows;
        case 'SM':
          const data5 = await dbConnectedPool.query(
            `SELECT * FROM defect_table WHERE (category='LEFT SIDE MEMBER' or category='RH SIDE MEMBER') and subdefect='${subDefectName}'`
          );
          return data5.rows;
        default:
          break;
      }
    }

    let responseObject = {};
    async function responseGenerator() {
      await Promise.all(
        Object.keys(majorSubDefectsInAllGroup).map(async (groupCode) => {
          let result = await dataFetcher(
            groupCode,
            Object.keys(majorSubDefectsInAllGroup[groupCode])[0]
          );
          responseObject[groupCode] = {};
          result.map((singleRecord) => {
            if (
              Date.parse(singleRecord.date) <= Date.parse(toDate) &&
              Date.parse(singleRecord.date) >= Date.parse(fromDate)
            ) {
              responseObject[groupCode][singleRecord.subcategory] =
                singleRecord.zones;
            }
          });
        })
      );
    }
    responseGenerator().then(() => {
      res.send(
        JSON.stringify({
          status: 'success',
          data: responseObject,
        })
      );
    });
  } catch (err) {
    console.log(err);
  }
});

app.post('/pareto', async (req, res) => {
  try {
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;

    let dbConnectedPool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'data_entry_systems',
      password: 'admin',
      port: 5432,
    });

    const records = await dbConnectedPool.query(`SELECT * FROM defect_table`);

    let dataFetcher = {};

    records.rows.map((record) => {
      if (
        Date.parse(record.date) <= Date.parse(toDate) &&
        Date.parse(record.date) >= Date.parse(fromDate)
      ) {
        if (!dataFetcher[`${record.category}_${record.subcategory}`]) {
          // block to create new carPart in object
          dataFetcher[`${record.category}_${record.subcategory}`] = {};

          if (
            !dataFetcher[`${record.category}_${record.subcategory}`][
              record.defect
            ]
          ) {
            // block to create new defectName in carPart
            dataFetcher[`${record.category}_${record.subcategory}`][
              record.defect
            ] = {};

            if (
              !dataFetcher[`${record.category}_${record.subcategory}`][
                record.defect
              ][record.subdefect]
            ) {
              // block to create new subDefectName in defectName
              dataFetcher[`${record.category}_${record.subcategory}`][
                record.defect
              ][record.subdefect] = {};

              if (
                !dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number]
              ) {
                // block to create new bodyNumber in subDefectName
                dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number] = record.zones;
              } else {
                // block to modify values of existing bodyNumber in subDefectName
                let tempArray = [
                  ...dataFetcher[`${record.category}_${record.subcategory}`][
                    record.defect
                  ][record.subdefect][record.body_number],
                  ...record.zones,
                ];

                let tempSet = new Set(tempArray);

                dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number] = Array.from(tempSet);
              }
            } else {
              // block to modify values of existing subDefectName in defectName

              if (
                !dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number]
              ) {
                // block to create new bodyNumber in subDefectName
                dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number] = record.zones;
              } else {
                // block to modify values of existing bodyNumber in subDefectName
                let tempArray = [
                  ...dataFetcher[`${record.category}_${record.subcategory}`][
                    record.defect
                  ][record.subdefect][record.body_number],
                  ...record.zones,
                ];

                let tempSet = new Set(tempArray);

                dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number] = Array.from(tempSet);
              }
            }
          } else {
            // block to change values of existing defectName property inside car part

            if (
              !dataFetcher[`${record.category}_${record.subcategory}`][
                record.defect
              ][record.subdefect]
            ) {
              // block to create new subDefectName in defectName
              dataFetcher[`${record.category}_${record.subcategory}`][
                record.defect
              ][record.subdefect] = {};

              if (
                !dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number]
              ) {
                // block to create new bodyNumber in subDefectName
                dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number] = record.zones;
              } else {
                // block to modify values of existing bodyNumber in subDefectName
                let tempArray = [
                  ...dataFetcher[`${record.category}_${record.subcategory}`][
                    record.defect
                  ][record.subdefect][record.body_number],
                  ...record.zones,
                ];

                let tempSet = new Set(tempArray);

                dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number] = Array.from(tempSet);
              }
            } else {
              // block to modify values of existing subDefectName in defectName

              if (
                !dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number]
              ) {
                // block to create new bodyNumber in subDefectName
                dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number] = record.zones;
              } else {
                // block to modify values of existing bodyNumber in subDefectName
                let tempArray = [
                  ...dataFetcher[`${record.category}_${record.subcategory}`][
                    record.defect
                  ][record.subdefect][record.body_number],
                  ...record.zones,
                ];

                let tempSet = new Set(tempArray);

                dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number] = Array.from(tempSet);
              }
            }
          }
        } else {
          // block to modify values of existing carPart in Object

          if (
            !dataFetcher[`${record.category}_${record.subcategory}`][
              record.defect
            ]
          ) {
            // block to create new defectName in carPart
            dataFetcher[`${record.category}_${record.subcategory}`][
              record.defect
            ] = {};

            if (
              !dataFetcher[`${record.category}_${record.subcategory}`][
                record.defect
              ][record.subdefect]
            ) {
              // block to create new subDefectName in defectName
              dataFetcher[`${record.category}_${record.subcategory}`][
                record.defect
              ][record.subdefect] = {};

              if (
                !dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number]
              ) {
                // block to create new bodyNumber in subDefectName
                dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number] = record.zones;
              } else {
                // block to modify values of existing bodyNumber in subDefectName
                let tempArray = [
                  ...dataFetcher[`${record.category}_${record.subcategory}`][
                    record.defect
                  ][record.subdefect][record.body_number],
                  ...record.zones,
                ];

                let tempSet = new Set(tempArray);

                dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number] = Array.from(tempSet);
              }
            } else {
              // block to modify values of existing subDefectName in defectName

              if (
                !dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number]
              ) {
                // block to create new bodyNumber in subDefectName
                dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number] = record.zones;
              } else {
                // block to modify values of existing bodyNumber in subDefectName
                let tempArray = [
                  ...dataFetcher[`${record.category}_${record.subcategory}`][
                    record.defect
                  ][record.subdefect][record.body_number],
                  ...record.zones,
                ];

                let tempSet = new Set(tempArray);

                dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number] = Array.from(tempSet);
              }
            }
          } else {
            // block to change values of existing defectName property inside car part

            if (
              !dataFetcher[`${record.category}_${record.subcategory}`][
                record.defect
              ][record.subdefect]
            ) {
              // block to create new subDefectName in defectName
              dataFetcher[`${record.category}_${record.subcategory}`][
                record.defect
              ][record.subdefect] = {};

              if (
                !dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number]
              ) {
                // block to create new bodyNumber in subDefectName
                dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number] = record.zones;
              } else {
                // block to modify values of existing bodyNumber in subDefectName
                let tempArray = [
                  ...dataFetcher[`${record.category}_${record.subcategory}`][
                    record.defect
                  ][record.subdefect][record.body_number],
                  ...record.zones,
                ];

                let tempSet = new Set(tempArray);

                dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number] = Array.from(tempSet);
              }
            } else {
              // block to modify values of existing subDefectName in defectName

              if (
                !dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number]
              ) {
                // block to create new bodyNumber in subDefectName
                dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number] = record.zones;
              } else {
                // block to modify values of existing bodyNumber in subDefectName
                let tempArray = [
                  ...dataFetcher[`${record.category}_${record.subcategory}`][
                    record.defect
                  ][record.subdefect][record.body_number],
                  ...record.zones,
                ];

                let tempSet = new Set(tempArray);

                dataFetcher[`${record.category}_${record.subcategory}`][
                  record.defect
                ][record.subdefect][record.body_number] = Array.from(tempSet);
              }
            }
          }
        }
      }
    });
    // console.log('dataFetcher', dataFetcher);

    let response = {
      message: 'success',
      data: dataFetcher,
    };

    res.send(JSON.stringify(response));
  } catch (err) {
    console.log(err);
  }
});

app.post('/individualSummaryReport', async (req, res) => {
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;
  const majorDefectName = req.body.majorDefectName;
  const minorDefectsList = req.body.minorDefectsList;

  let dbConnectedPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'data_entry_systems',
    password: 'admin',
    port: 5432,
  });

  // queryList = {
  //   'SIDE MEMBER':{
  //     'RIGHT': ,
  //     'LEFT': ,
  //   }
  // }

  // let queryResult = {
  //   ''
  // }
});

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
