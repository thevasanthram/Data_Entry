const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const DataSchema = require('./DataSchema');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('resources'));

const db = mongoose
  .connect(
    'mongodb+srv://admin:admin@dataentry.bclsrir.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(console.log('Database connection established'))
  .catch((err) => {
    console.log(err);
  });

const Options = {
  'UNDER BODY': {
    'RADIATOR SUPPORT': ['A1A', 'A1B', 'A1C', 'A1D'],
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
    'LOWER BACK': ['A4A', 'A4B', 'A4C', 'A4D'],
  },

  'RH MAIN BODY': {
    'A-PILLAR - RH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'C-PILLAR - RH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'B-PILLAR - RH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'BACK DOOR OPENING - RH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'FRONT DOOR OPENING - RH': ['C2A', 'C2B', 'C2C', 'C2D'],
    'QUARTER - RH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'REAR DOOR OPENING - RH': ['C3A', 'C3B', 'C3C', 'C3D'],
    'ROCKER PANEL SIDE - RH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'ROOF SIDE - RH': ['C4A', 'C4B', 'C4C', 'C4D'],
    COWL: ['C1A', 'C1B', 'C1C', 'C1D'],
  },

  'LH MAIN BODY': {
    'A-PILLAR - LH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'C-PILLAR - LH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'B-PILLAR - LH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'BACK DOOR OPENING - LH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'FRONT DOOR OPENING - LH': ['C2A', 'C2B', 'C2C', 'C2D'],
    'QUARTER - LH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'REAR DOOR OPENING - LH': ['C3A', 'C3B', 'C3C', 'C3D'],
    'ROCKER PANEL SIDE - LH': ['C4A', 'C4B', 'C4C', 'C4D'],
    'ROOF SIDE - LH': ['C4A', 'C4B', 'C4C', 'C4D'],
    COWL: ['C1A', 'C1B', 'C1C', 'C1D'],
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
    'REAR DOOR OUTER - LH': ['D3A', 'D3B', 'D3C', 'D3D'],
    'REAR DOOR INNER - LH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'BACK DOOR OUTER': ['D4A', 'D4B', 'D4C', 'D4D'],
    'BACK DOOR INNER': ['D4A', 'D4B', 'D4C', 'D4D'],
  },

  'RH SHELL BODY MAIN-LINE': {
    'FENDER - RH': ['D3A', 'D3B', 'D3C', 'D3D'],
    'HOOD S/A OUTER': ['D1A', 'D1B', 'D1C', 'D1D'],
    'HOOD S/A INNER': ['D2A', 'D2B', 'D2C', 'D2D'],
    'FRONT DOOR OUTER - RH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'FRONT DOOR INNER - RH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR OUTER - RH': ['D4A', 'D4B', 'D4C', 'D4D'],
    'REAR DOOR INNER - RH': ['D4A', 'D4B', 'D4C', 'D4D'],
  },

  'LH SHELL BODY MAIN-LINE': {
    'FENDER - LH': ['D1A', 'D1B', 'D1C', 'D1D'],
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
let selectedBodyNumberGlobal = '';
let selectedCategoryGlobal = '';
let selectedSubCategoryGlobal = '';

app.get('/', (req, res) => {
  res.render(path.join(__dirname, '/views/home.ejs'));
});

app.post('/login', (req, res) => {
  username = req.body.username;
  const password = req.body.password;

  if (username == 'Administrator') {
    res.redirect('/administrator');
  } else {
    res.redirect('/follower');
  }
});

app.get('/follower', (req, res) => {
  res.render(path.join(__dirname, '/views/follower.ejs'), { username });
});

app.post('/firstlayer', (req, res) => {
  try {
    enteredBodyNumber = req.body.bodyNumber;
    bodyNumberOptions = Object.keys(Options);
    res.render(path.join(__dirname, '/views/firstLayer.ejs'), {
      username,
      bodyNumberOptions: bodyNumberOptions,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post('/selectcategory', (req, res) => {
  try {
    selectedBodyNumberGlobal = req.body.selectedBodyNumber;
    const categoryOptions = Options[selectedBodyNumberGlobal];
    let ShortlistedCategoryOptions = Object.keys(categoryOptions);

    res.render(path.join(__dirname, '/views/secondLayer.ejs'), {
      username,
      selectedBodyNumberGlobal,
      ShortlistedCategoryOptions,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post('/selectsubcategory', (req, res) => {
  try {
    selectedCategoryGlobal = req.body.selectedCategoryOption;

    var SubCategoryOptions = Options[selectedBodyNumberGlobal];
    SubCategoryOptions = SubCategoryOptions[selectedCategoryGlobal];

    ShortlistedSubCategoryOptions = SubCategoryOptions;

    res.render(path.join(__dirname, '/views/subCategory.ejs'), {
      selectedCategoryGlobal,
      ShortlistedSubCategoryOptions,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post('/handlesave', (req, res) => {
  try {
    selectedSubCategoryGlobal = req.body.ShortlistedSubCategoryOption;

    // console.log('selectedBodyNumber:', selectedBodyNumberGlobal);
    // console.log('selectedCategory: ', selectedCategoryGlobal);
    // console.log('selectedSubCategory: ', selectedSubCategoryGlobal);

    res.render(path.join(__dirname, '/views/handleSave.ejs'));
  } catch (err) {
    console.log(err);
  }
});

app.post('/store', async (req, res) => {
  const handlesave = req.body.handlesave;
  if (handlesave == 'yes') {
    await DataSchema.create({
      optionChosen: selectedBodyNumberGlobal,
      categoryChosen: selectedCategoryGlobal,
      subCategoryChosen: selectedSubCategoryGlobal,
    });

    res.render(path.join(__dirname, '/views/result.ejs'));
  } else {
    res.redirect('/follower');
  }
});

app.get('/administrator', async (req, res) => {
  const Data = await DataSchema.find();
  // console.log(Data);

  res.render(path.join(__dirname, '/views/statistics.ejs'), { data: Data });
});

app.post('/delete', async (req, res) => {
  const deleteOption = req.body.optionChosen;
  const deleteCategoryChosen = req.body.categoryChosen;
  const deleteSubCategoryChosen = req.body.subCategoryChosen;
  await DataSchema.deleteOne({
    optionChosen: deleteOption,
    categoryChosen: deleteCategoryChosen,
    subCategoryChosen: deleteSubCategoryChosen,
  });

  res.redirect('/administrator');
});

app.post('/visualization', async (req, res) => {
  const column = req.body.chosenColumn;

  const Data = await DataSchema.find();

  const columnData = [];
  for (let i = 0; i < Data.length; i++) {
    columnData.push(Data[i].optionChosen);
  }

  let uniquevalues = new Set(columnData);
  uniquevalues = Array.from(uniquevalues);

  // creating an object with unique values for counting occurrence
  let columnDataObj = {};
  for (let i = 0; i < uniquevalues.length; i++) {
    columnDataObj[`${uniquevalues[i]}`] = 0;
  }

  //counting each unique values occurrence
  for (let i = 0; i < columnData.length; i++) {
    columnDataObj[`${columnData[i]}`]++;
  }

  let occurrence = Object.values(columnDataObj);

  res.render(path.join(__dirname, '/views/chart.ejs'), {
    xvalues: uniquevalues,
    yvalues: occurrence,
  });
});

app.listen(8000, () => {
  console.log(
    'Data Entry tool running on port 8000. Go to Browser and search for localhost:8000 to open.'
  );
});
