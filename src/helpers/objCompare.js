const objCompare = (a, b) => {
  if (JSON.stringify(a) === JSON.stringify(b)) {
    return true;
  }
  return false;
};

export default objCompare;
