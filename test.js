function generateRandomColor() {
  let maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  if (colorSet.includes(randColor)) {
    generateRandomColor();
  } else {
    return `#${randColor.toUpperCase()}`;
  }
}

var colorSet = [];
const iterator = [1, 2, 3, 4, 5];
iterator.map((el) => {
  colorSet.push(generateRandomColor());
});

console.log(colorSet);
