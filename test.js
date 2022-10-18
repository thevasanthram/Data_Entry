let dataFetcher = {
  _1234: 'yes',
};

if (!dataFetcher['_' + '1234']) {
  console.log('not present');
} else {
  console.log('present');
}
