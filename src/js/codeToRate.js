export function codeToRate(codeMap, code) {
  if (code.toUpperCase() in codeMap) {
    let rate = codeMap[code.toUpperCase()];
    return rate;
  } else {
    return 0;
  }
}
