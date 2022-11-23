const obj = [
  {
    id: 1,
  },
  {
    id: 5,
  },
  {
    id: 2,
  },
];

console.log(obj.sort((r1, r2) => (r1.id > r2.id ? 1 : r1.id < r2.id ? -1 : 0)));
