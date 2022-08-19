const chromeLauncher = require('chrome-launcher');

chromeLauncher
  .launch({
    startingUrl: 'http://localhost:8000/',
  })
  .then((chrome) => {
    console.log(`Chrome debugging port running on ${chrome.port}`);
  });
