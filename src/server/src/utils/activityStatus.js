exports.findMode = (arr) => {
  let obj = {};

  arr.forEach(number => {
    if (!obj[number]) {
      obj[number] = 1
    } else {
      obj[number] += 1
    }
  });

  const maxValue = Math.max(...Object.values(obj))
  const asArray = Object.entries(obj);
  const filtered = asArray.filter(([key, value]) => value === maxValue);
  const modesAsInt = filtered.map((a) => parseInt(a[0]))

  return modesAsInt
}
