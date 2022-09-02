console.log(Date.parse('2022-9-2'));

console.log(Date.parse('2022-09-02'));

if (Date.parse('2022-09-5') > Date.parse('2022-09-2')) {
  console.log('first is greater than second');
}
