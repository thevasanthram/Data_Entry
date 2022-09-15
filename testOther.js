let obj = {
  property: [1, 2, 3],
};

console.log('Before Obj:', obj);

obj['newProperty'] = {};

obj['newProperty']['innerProperty'] = [4, 5, 6];

console.log('After Obj:', obj);
