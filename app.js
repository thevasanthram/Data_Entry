const express = require('express');
var mod = require('nested-property');
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
              `CREATE TABLE IF NOT EXISTS defect_table(body_number int , mode varchar (8) , category varchar(30), subcategory varchar(30), defect varchar(20), subdefect varchar(20), zone int, defectCount int, date varchar(10), time varchar(8), username varchar(30));`,
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
    'RH APRON': ['1', '2', '3', '4'],
    'LH APRON': ['5', '6', '7', '8'],
    'FRONT FLOOR TOP SIDE': ['9', '10', '11', '12'],
    'FRONT FLOOR BOTTOM SIDE': ['13', '14', '15', '16'],
    'CENTER FLOOR TOP SIDE': ['17', '18', '19', '20'],
    'CENTER FLOOR BOTTOM SIDE': ['21', '22', '23', '24'],
    'REAR FLOOR TOP SIDE': ['25', '26', '27', '28'],
    'REAR FLOOR BOTTOM SIDE': ['29', '30', '31', '32'],
    'DASH OUTER': ['33', '34', '35', '36'],
    'DASH INNER': ['37', '38', '39', '40'],
    'RADIATOR SUPPORT': ['41', '42', '43', '44'],
    'LOWER BACK': ['45', '46', '47', '48'],
  },

  'RH MAIN BODY': {
    'B-PILLAR - RH MB': ['49', '50', '51', '52'],
    'A-PILLAR - RH MB': ['53', '54', '55', '56'],
    'COWL - RH MB': ['57', '58', '59', '60'],
    'C-PILLAR - RH MB': ['61', '62', '63', '64'],
    'BACK DOOR OPENING - RH MB': ['65', '66', '67', '68'],
    'FRONT DOOR OPENING - RH MB': ['69', '70', '71', '72'],
    'QUARTER - RH MB': ['73', '74', '75', '76'],
    'REAR DOOR OPENING - RH MB': ['77', '78', '79', '80'],
    'ROCKER PANEL SIDE - RH MB': ['81', '82', '83', '84'],
    'ROOF SIDE - RH MB': ['85', '86', '87', '88'],
  },

  'LH MAIN BODY': {
    'B-PILLAR - LH MB': ['89', '90', '91', '92'],
    'A-PILLAR - LH MB': ['93', '94', '95', '96'],
    'COWL - LH MB': ['97', '98', '99', '100'],
    'C-PILLAR - LH MB': ['101', '102', '103', '104'],
    'BACK DOOR OPENING - LH MB': ['105', '106', '107', '108'],
    'FRONT DOOR OPENING - LH MB': ['109', '110', '111', '112'],
    'QUARTER - LH MB': ['113', '114', '115', '116'],
    'REAR DOOR OPENING - LH MB': ['117', '118', '119', '120'],
    'ROCKER PANEL SIDE - LH MB': ['121', '122', '123', '124'],
    'ROOF SIDE - LH MB': ['125', '126', '127', '128'],
  },

  'RH SHELL BODY SUB-LINE': {
    'HOOD SA OUTER - RH SBSA': ['129', '130', '133', '134'],
    'HOOD SA INNER - RH SBSA': ['135', '136', '137', '138'],
    'FRONT DOOR OUTER - RH SBSA': ['139', '140', '141', '142'],
    'FRONT DOOR INNER - RH SBSA': ['143', '144', '145', '146'],
    'REAR DOOR OUTER - RH SBSA': ['147', '148', '149', '150'],
    'REAR DOOR INNER - RH SBSA': ['151', '152', '153', '154'],
  },

  'LH SHELL BODY SUB-LINE': {
    'FRONT DOOR OUTER - LH SBSA': ['155', '156', '157', '158'],
    'FRONT DOOR INNER - LH SBSA': ['159', '160', '161', '162'],
    'BACK DOOR OUTER - LH SBSA': ['163', '164', '165', '166'],
    'BACK DOOR INNER - LH SBSA': ['167', '168', '169', '170'],
    'REAR DOOR OUTER - LH SBSA': ['171', '172', '173', '174'],
    'REAR DOOR INNER - LH SBSA': ['175', '176', '177', '178'],
  },

  'RH SHELL BODY MAIN-LINE': {
    'FENDER - RH SBML': ['179', '180', '181', '182', '183', '184', '185'],
    'HOOD SA OUTER - RH SBML': ['186', '187', '188', '189'],
    'HOOD SA INNER - RH SBML': ['190', '191', '192', '193'],
    'FRONT DOOR OUTER - RH SBML': ['194', '195', '196', '197'],
    'FRONT DOOR INNER - RH SBML': ['198', '199', '200', '201'],
    'REAR DOOR OUTER - RH SBML': ['202', '203', '204', '205'],
    'REAR DOOR INNER - RH SBML': ['206', '207', '208', '209'],
  },

  'LH SHELL BODY MAIN-LINE': {
    'FENDER - LH SBML': ['500', '501', '502', '503', '504', '505', '506'],
    'FRONT DOOR OUTER - LH SBML': [
      '507',
      '508',
      '509',
      '510',
      '511',
      '512',
      '513',
      '514',
      '515',
      '516',
      '517',
      '518',
      '519',
      '520',
      '521',
      '522',
      '523',
    ],
    'FRONT DOOR INNER - LH SBML': [
      '524',
      '525',
      '526',
      '527',
      '528',
      '529',
      '530',
      '531',
      '532',
      '533',
      '534',
      '535',
      '536',
      '537',
      '538',
    ],
    'REAR DOOR OUTER - LH SBML': [
      '539',
      '540',
      '541',
      '542',
      '543',
      '544',
      '545',
      '546',
      '547',
      '548',
      '549',
      '550',
      '551',
      '552',
      '553',
      '554',
    ],
    'REAR DOOR INNER - LH SBML': [
      '555',
      '556',
      '557',
      '558',
      '559',
      '560',
      '561',
      '562',
      '563',
      '564',
      '565',
      '566',
      '567',
      '568',
    ],
    'BACK DOOR OUTER - LH SBML': [
      '569',
      '570',
      '571',
      '572',
      '573',
      '574',
      '575',
      '576',
      '577',
      '578',
      '579',
      '580',
      '581',
      '582',
      '583',
      '584',
    ],
    'BACK DOOR INNER - LH SBML': [
      '585',
      '586',
      '587',
      '588',
      '589',
      '590',
      '591',
      '592',
      '593',
      '594',
      '595',
      '596',
      '597',
      '598',
      '599',
      '600',
      '601',
    ],
  },

  'RH SIDE MEMBER': {
    'A-PILLAR - RH SM': [
      '800',
      '801',
      '802',
      '803',
      '804',
      '805',
      '806',
      '807',
      '808',
      '809',
      '810',
      '811',
    ],
    'C-PILLAR - RH SM': ['822', '823', '824', '825', '826'],
    'B-PILLAR - RH SM': [
      '812',
      '813',
      '814',
      '815',
      '816',
      '817',
      '818',
      '819',
      '820',
      '821',
    ],
    'BACK DOOR OPENING - RH SM': [
      '851',
      '852',
      '853',
      '854',
      '855',
      '856',
      '857',
      '858',
      '859',
      '860',
      '861',
      '862',
      '863',
      '864',
      '865',
    ],
    'FRONT DOOR OPENING - RH SM': [
      '827',
      '828',
      '829',
      '830',
      '831',
      '832',
      '833',
      '834',
      '835',
      '836',
      '837',
      '838',
    ],
    'QUARTER - RH SM': [
      '866',
      '867',
      '868',
      '869',
      '870',
      '871',
      '872',
      '873',
      '874',
      '875',
      '876',
      '877',
      '878',
      '879',
      '880',
      '881',
      '882',
    ],
    'REAR DOOR OPENING - RH SM': [
      '839',
      '840',
      '841',
      '842',
      '843',
      '844',
      '845',
      '846',
      '847',
      '848',
      '849',
      '850',
    ],
    'ROCKER PANEL SIDE - RH SM': ['888', '889', '890', '891', '892', '893'],
    'ROOF SIDE - RH SM': ['883', '884', '885', '886', '887'],
  },

  'LH SIDE MEMBER': {
    'A-PILLAR - LH SM': [
      '700',
      '701',
      '702',
      '703',
      '704',
      '705',
      '706',
      '707',
      '708',
      '709',
      '710',
    ],
    'C-PILLAR - LH SM': ['722', '723', '724', '725', '726'],
    'B-PILLAR - LH SM': [
      '712',
      '713',
      '714',
      '715',
      '716',
      '717',
      '718',
      '719',
      '720',
      '721',
    ],
    'BACK DOOR OPENING - LH SM': [
      '751',
      '752',
      '753',
      '754',
      '755',
      '756',
      '757',
      '758',
      '759',
      '760',
      '761',
      '762',
      '763',
      '764',
      '765',
    ],
    'FRONT DOOR OPENING - LH SM': [
      '727',
      '728',
      '729',
      '730',
      '731',
      '732',
      '733',
      '734',
      '735',
      '736',
      '737',
      '738',
    ],
    'QUARTER - LH SM': [
      '766',
      '767',
      '768',
      '769',
      '770',
      '771',
      '772',
      '773',
      '774',
      '775',
      '776',
      '777',
      '778',
      '779',
      '780',
      '781',
      '782',
    ],
    'REAR DOOR OPENING - LH SM': [
      '739',
      '740',
      '741',
      '742',
      '743',
      '744',
      '745',
      '746',
      '747',
      '748',
      '749',
      '750',
    ],
    'ROCKER PANEL SIDE - LH SM': ['791', '792', '793', '794', '795', '796'],
    'ROOF SIDE - LH SM': [
      '783',
      '784',
      '785',
      '786',
      '787',
      '788',
      '789',
      '790',
    ],
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

    console.log(`${categoryId}_${subcategoryId}`);

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

    Object.keys(defectObj).map((defect) => {
      let defectArray = defect.split('_');
      defectArray[2] = `_${defectArray[2]}`;
      mod.set(filledDefects, defectArray.join('.'), defectObj[defect]);
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

    async function storeManager() {
      // storing the defects or modifying
      await Promise.all(
        Object.keys(filledDefects).map(async (defectName) => {
          await Promise.all(
            Object.keys(filledDefects[defectName]).map(
              async (subDefectName) => {
                await Promise.all(
                  Object.keys(filledDefects[defectName][subDefectName]).map(
                    async (zone) => {
                      const result = await dbConnectedPool.query(
                        `SELECT * FROM defect_table WHERE body_number=${enteredBodyNumber} AND category='${selectedCategory}' AND subcategory='${selectedSubCategory}' AND defect='${defectName}' AND subdefect='${subDefectName}' AND zone = ${zone.replace(
                          '_',
                          ''
                        )}`
                      );
                      if (result.rows.length == 0) {
                        mod.set(
                          messageObject,
                          `Newly Saved Zone.${zone}.${defectName}.${subDefectName}`,
                          filledDefects[defectName][subDefectName][zone]
                        );
                        // block to save defects record for the first time
                        console.log(
                          `INSERT INTO defect_table (body_number,mode,category,subcategory,defect,subdefect,zone,defectCount,date,time,username) VALUES (${enteredBodyNumber},'${mode}','${selectedCategory}','${selectedSubCategory}','${defectName}','${subDefectName}',${zone.replace(
                            '_',
                            ''
                          )},${
                            filledDefects[defectName][subDefectName][zone]
                          },'${date}','${time}','${username}');`
                        );
                        await dbConnectedPool.query(
                          `INSERT INTO defect_table (body_number,mode,category,subcategory,defect,subdefect,zone,defectCount,date,time,username) VALUES (${enteredBodyNumber},'${mode}','${selectedCategory}','${selectedSubCategory}','${defectName}','${subDefectName}',${zone.replace(
                            '_',
                            ''
                          )},${
                            filledDefects[defectName][subDefectName][zone]
                          },'${date}','${time}','${username}');`
                        );
                      } else {
                        // block to modify existing defect records
                        mod.set(
                          messageObject,
                          `Overwritten Zone.${zone}.${defectName}.${subDefectName}`,
                          filledDefects[defectName][subDefectName][zone]
                        );

                        console.log(
                          `UPDATE defect_table SET defectCount=${
                            filledDefects[defectName][subDefectName][zone]
                          },date='${date}',time='${time}',username='${username}' WHERE body_number=${enteredBodyNumber} AND category='${selectedCategory}' AND subcategory='${selectedSubCategory}' AND defect='${defectName}' AND subdefect='${subDefectName}' AND zone=${zone.replace(
                            '_',
                            ''
                          )}`
                        );

                        await dbConnectedPool.query(
                          `UPDATE defect_table SET defectCount=${
                            filledDefects[defectName][subDefectName][zone]
                          },date='${date}',time='${time}',username='${username}' WHERE body_number=${enteredBodyNumber} AND category='${selectedCategory}' AND subcategory='${selectedSubCategory}' AND defect='${defectName}' AND subdefect='${subDefectName}' AND zone=${zone.replace(
                            '_',
                            ''
                          )}`
                        );
                      }
                    }
                  )
                );
              }
            )
          );
        })
      );

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
    }

    storeManager().then(() => {
      res.send(
        JSON.stringify({
          status: 'success',
          data: messageObject,
        })
      );
    });
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
      res.render(path.join(__dirname, '/views/adminLaundingPage.ejs'), {
        username,
      });
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
    const defectMode = req.body.mode;

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
            Date.parse(fetchedRows[k].date) >= Date.parse(fromDate) &&
            defectMode == fetchedRows[k].mode
          ) {
            defectsCount += fetchedRows[k].defectcount;
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
    const defectMode = req.body.mode;
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
          Date.parse(record.date) >= Date.parse(fromDate) &&
          defectMode == record.mode
        ) {
          tempDataStoringObj[record.subdefect] += record.defectcount;
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
    const defectMode = req.body.mode;

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
          if (result.length != 0) {
            result.map((singleRecord, index) => {
              if (
                Date.parse(singleRecord.date) <= Date.parse(toDate) &&
                Date.parse(singleRecord.date) >= Date.parse(fromDate) &&
                defectMode == singleRecord.mode
              ) {
                let path =
                  groupCode +
                  '.' +
                  singleRecord.subcategory +
                  '.' +
                  '_' +
                  singleRecord.zone;
                mod.set(responseObject, path, singleRecord.defectcount);
              }
            });
          } else {
            responseObject[groupCode] = {};
          }
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
    const defectMode = req.body.mode;

    let dbConnectedPool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'data_entry_systems',
      password: 'admin',
      port: 5432,
    });

    let dataFetcher = {};

    const records = await dbConnectedPool.query(`SELECT * FROM defect_table`);
    records.rows.map((record) => {
      if (
        Date.parse(record.date) <= Date.parse(toDate) &&
        Date.parse(record.date) >= Date.parse(fromDate) &&
        defectMode == record.mode
      ) {
        switch (record.category) {
          case 'UNDER BODY':
            mod.set(
              dataFetcher,
              [
                'UB',
                record.subcategory,
                record.defect,
                record.subdefect,
                '_' + String(record.body_number),
                '_' + record.zone,
              ].join('.'),
              record.defectcount
            );
            break;

          case 'RH MAIN BODY':
            mod.set(
              dataFetcher,
              [
                'MB',
                record.subcategory,
                record.defect,
                record.subdefect,
                '_' + String(record.body_number),
                '_' + record.zone,
              ].join('.'),
              record.defectcount
            );
            break;

          case 'LH MAIN BODY':
            mod.set(
              dataFetcher,
              [
                'MB',
                record.subcategory,
                record.defect,
                record.subdefect,
                '_' + String(record.body_number),
                '_' + record.zone,
              ].join('.'),
              record.defectcount
            );
            break;

          case 'RH SHELL BODY SUB-LINE':
            mod.set(
              dataFetcher,
              [
                'SBSA',
                record.subcategory,
                record.defect,
                record.subdefect,
                '_' + String(record.body_number),
                '_' + record.zone,
              ].join('.'),
              record.defectcount
            );
            break;

          case 'LH SHELL BODY SUB-LINE':
            mod.set(
              dataFetcher,
              [
                'SBSA',
                record.subcategory,
                record.defect,
                record.subdefect,
                '_' + String(record.body_number),
                '_' + record.zone,
              ].join('.'),
              record.defectcount
            );
            break;

          case 'RH SHELL BODY MAIN-LINE':
            mod.set(
              dataFetcher,
              [
                'SBML',
                record.subcategory,
                record.defect,
                record.subdefect,
                '_' + String(record.body_number),
                '_' + record.zone,
              ].join('.'),
              record.defectcount
            );
            break;

          case 'LH SHELL BODY MAIN-LINE':
            mod.set(
              dataFetcher,
              [
                'SBML',
                record.subcategory,
                record.defect,
                record.subdefect,
                '_' + String(record.body_number),
                '_' + record.zone,
              ].join('.'),
              record.defectcount
            );
            break;

          case 'RH SIDE MEMBER':
            mod.set(
              dataFetcher,
              [
                'SM',
                record.subcategory,
                record.defect,
                record.subdefect,
                '_' + String(record.body_number),
                '_' + record.zone,
              ].join('.'),
              record.defectcount
            );
            break;

          case 'LH SIDE MEMBER':
            mod.set(
              dataFetcher,
              [
                'SM',
                record.subcategory,
                record.defect,
                record.subdefect,
                '_' + String(record.body_number),
                '_' + record.zone,
              ].join('.'),
              record.defectcount
            );
            break;

          default:
            mod.set(
              dataFetcher,
              [
                record.category,
                record.subcategory,
                record.defect,
                record.subdefect,
                '_' + String(record.body_number),
                '_' + record.zone,
              ].join('.'),
              record.defectcount
            );
            break;
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

app.post('/colorMap', async (req, res) => {
  try {
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    const defectMode = req.body.mode;

    let dbConnectedPool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'data_entry_systems',
      password: 'admin',
      port: 5432,
    });

    const groupCode = {
      'UNDER BODY': 'UB',
      'RH MAIN BODY': 'MB',
      'LH MAIN BODY': 'MB',
      'LH SHELL BODY SUB-LINE': 'SBSA',
      'RH SHELL BODY SUB-LINE': 'SBSA',
      'LH SHELL BODY MAIN-LINE': 'SBML',
      'RH SHELL BODY MAIN-LINE': 'SBML',
      'LH SIDE MEMBER': 'SM',
      'RH SIDE MEMBER': 'SM',
    };

    let dataFetcher = {};

    const records = await dbConnectedPool.query(`SELECT * FROM defect_table`);
    records.rows.map((record, index) => {
      if (
        Date.parse(record.date) <= Date.parse(toDate) &&
        Date.parse(record.date) >= Date.parse(fromDate) &&
        defectMode == record.mode
      ) {
        try {
          if (
            dataFetcher[groupCode[record.category]][record.subcategory][
              record.defect
            ][record.subdefect]['_' + String(record.zone)]
          ) {
            dataFetcher[groupCode[record.category]][record.subcategory][
              record.defect
            ][record.subdefect]['_' + String(record.zone)] +=
              record.defectcount;
          } else {
            mod.set(
              dataFetcher,
              [
                groupCode[record.category],
                record.subcategory,
                record.defect,
                record.subdefect,
                '_' + record.zone,
              ].join('.'),
              record.defectcount
            );
          }
        } catch {
          mod.set(
            dataFetcher,
            [
              groupCode[record.category],
              record.subcategory,
              record.defect,
              record.subdefect,
              '_' + record.zone,
            ].join('.'),
            record.defectcount
          );
        }
      }
    });
    // console.log('color Map dataFetcher', dataFetcher);

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
  try {
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    const defectMode = req.body.mode;
    const defectName = req.body.defectName;
    const subDefectList = req.body.subDefectList;
    let dbConnectedPool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'data_entry_systems',
      password: 'admin',
      port: 5432,
    });

    const groupCode = {
      'RH MAIN BODY': 'MB',
      'LH MAIN BODY': 'MB',
      'LH SHELL BODY SUB-LINE': 'SBSA',
      'RH SHELL BODY SUB-LINE': 'SBSA',
      'LH SHELL BODY MAIN-LINE': 'SBML',
      'RH SHELL BODY MAIN-LINE': 'SBML',
      'LH SIDE MEMBER': 'SM',
      'RH SIDE MEMBER': 'SM',
    };

    let dataFetcher = {};

    Object.keys(Options).map((category) => {
      ['LH', 'RH'].map((side) => {
        Object.keys(Options[category]).map((subCategory) => {
          subDefectList.map((subDefect) => {
            let categoryName = category.replace('LH ', '').replace('RH ', '');
            let subCategoryCleaner = subCategory
              .replace(groupCode[category], '')
              .replace('LH', '')
              .replace('RH', '');
            let subCategoryName = subCategoryCleaner.slice(
              0,
              subCategoryCleaner.length - 4
            );
            mod.set(
              dataFetcher,
              [categoryName, side, subCategoryName, subDefect].join('.'),
              0
            );
          });
        });
      });
    });

    // deleting Under Body
    delete dataFetcher['UNDER BODY'];

    const records = await dbConnectedPool.query(
      `SELECT * FROM defect_table WHERE (NOT category='UNDER BODY') AND defect='${defectName}'`
    );

    records.rows.map((record) => {
      if (
        Date.parse(record.date) <= Date.parse(toDate) &&
        Date.parse(record.date) >= Date.parse(fromDate) &&
        defectMode == record.mode
      ) {
        let side = record.category.split(' ')[0];
        let categoryNameParts = record.category.split(' ');
        categoryNameParts.shift();
        let categoryName = categoryNameParts.join(' ');
        let subCategoryCleaner = record.subcategory
          .replace(groupCode[record.category], '')
          .replace(side, '');
        let subCategoryName = subCategoryCleaner.slice(
          0,
          subCategoryCleaner.length - 4
        );

        // console.log('side: ', side);
        // console.log('categoryName: ', categoryName);
        // console.log('subCategoryName: ', subCategoryName);

        try {
          if (
            dataFetcher[categoryName][side][subCategoryName][record.subdefect]
          ) {
            dataFetcher[categoryName][side][subCategoryName][
              record.subdefect
            ] += record.defectcount;
          } else {
            mod.set(
              dataFetcher,
              [categoryName, side, subCategoryName, record.subdefect].join('.'),
              record.defectcount
            );
          }
        } catch {
          mod.set(
            dataFetcher,
            [categoryName, side, subCategoryName, record.subdefect].join('.'),
            record.defectcount
          );
        }
      }
    });

    // console.log('data Fetcher: ', dataFetcher);

    res.send(
      JSON.stringify({
        status: 'success',
        data: dataFetcher,
      })
    );
  } catch (err) {
    console.log(err);
  }
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
