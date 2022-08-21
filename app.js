const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const DataSchema = require('./DataSchema');
const { time } = require('console');

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
let selectedCategory = '';
let selectedSubCategory = '';
let defectArea = '';

let Data;

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
      res.redirect('/administrator');
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

app.post('/firstlayer', (req, res) => {
  try {
    enteredBodyNumber = req.body.bodyNumber;
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
    selectedCategory = req.body.selectedCategory;
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

app.post('/selectsubcategory', (req, res) => {
  try {
    selectedSubCategory = req.body.selectedSubCategory;

    var SubCategoryOptions = Options[selectedCategory];
    SubCategoryOptions = SubCategoryOptions[selectedSubCategory];

    ShortlistedSubCategoryOptions = SubCategoryOptions;

    res.render(path.join(__dirname, '/views/thirdLayer.ejs'), {
      username,
      enteredBodyNumber,
      selectedCategory,
      selectedSubCategory,
      ShortlistedSubCategoryOptions,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post('/receive-thirdLayer-temp', (req, res) => {
  res.send('Page under construction');
});

app.post('/handlesave', (req, res) => {
  try {
    defectArea = req.body.defectAreaChosen;

    res.render(path.join(__dirname, '/views/handleSave.ejs'));
  } catch (err) {
    console.log(err);
  }
});

app.post('/store', async (req, res) => {
  try {
    const handlesave = req.body.handlesave;

    if (handlesave == 'yes') {
      const currentdate = new Date();
      const date =
        String(currentdate.getFullYear()) +
        '-' +
        (currentdate.getMonth() + 1 <= 9
          ? '0' + Number(currentdate.getMonth() + 1)
          : Number(currentdate.getMonth() + 1)) +
        '-' +
        String(currentdate.getDate());

      const time =
        String(currentdate.getHours()) +
        ':' +
        String(currentdate.getMinutes()) +
        ':' +
        String(currentdate.getSeconds());

      await DataSchema.create({
        bodyNumber: enteredBodyNumber,
        categoryChosen: selectedCategory,
        subCategoryChosen: selectedSubCategory,
        defectArea: defectArea,
        date: date,
        time: time,
        username: username,
      });

      res.render(path.join(__dirname, '/views/result.ejs'));
    } else {
      enteredBodyNumber = 0;
      selectedCategory = '';
      selectedSubCategory = '';
      selectedSubCategoryGlobal = '';
      res.redirect('/follower');
    }
  } catch (err) {
    console.log(err);
  }
});

app.get('/administrator', async (req, res) => {
  try {
    if (username == 'Administrator') {
      Data = await DataSchema.find();
      res.render(path.join(__dirname, '/views/admin.ejs'), { username });
    } else {
      res.redirect('/');
    }
  } catch (err) {
    console.log(err);
  }
});

app.get('/lookup', async (req, res) => {
  try {
    Data = await DataSchema.find();
    if (username == 'Administrator') {
      res.render(path.join(__dirname, '/views/lookup.ejs'), {
        data: Data,
        username,
      });
    } else {
      res.redirect('/');
    }
  } catch (err) {
    console.log(err);
  }
});

app.get('/filtering', async (req, res) => {
  try {
    // console.log(Data);

    if (username == 'Administrator') {
      res.render(path.join(__dirname, '/views/filtering.ejs'), {
        username,
      });
    } else {
      res.redirect('/');
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/filtered-result', (req, res) => {
  try {
    if (username == 'Administrator') {
      const fromDateCondition = req.body.fromDateCondition;
      const toDateCondition = req.body.toDateCondition;
      const chartCondition = req.body.chartCondition;

      // console.log(fromDateCondition, toDateCondition);
      res.send('Page under construction');
    } else {
      res.redirect('/');
    }
  } catch (err) {
    console.log(err);
  }
});

app.get('/visualization', (req, res) => {
  try {
    if (username == 'Administrator') {
      res.render(path.join(__dirname, '/views/statistics.ejs'), { data: Data });
    } else {
      res.redirect('/');
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/delete', async (req, res) => {
  try {
    if (username == 'Administrator') {
      const deleteBodyNumber = req.body.bodyNumber;
      const deleteCategoryChosen = req.body.categoryChosen;
      const deleteSubCategoryChosen = req.body.subCategoryChosen;
      const deleteDefectArea = req.body.defectArea;
      const deleteDate = req.body.date;
      const deleteTime = req.body.time;
      const deleteUsername = req.body.username;

      // console.log(deleteOption, deleteCategoryChosen, deleteSubCategoryChosen);

      await DataSchema.deleteOne({
        bodyNumber: deleteBodyNumber,
        categoryChosen: deleteCategoryChosen,
        subCategoryChosen: deleteSubCategoryChosen,
        defectArea: deleteDefectArea,
        date: deleteDate,
        time: deleteTime,
        username: deleteUsername,
      });

      res.redirect('/lookup');
    } else {
      res.redirect('/');
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/visualization', async (req, res) => {
  try {
    if (username == 'Administrator') {
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
    } else {
      res.redirect('/');
    }
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
