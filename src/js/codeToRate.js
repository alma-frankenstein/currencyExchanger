export function codeToRate(codeMap, code) {
  if (code.toUpperCase() in codeMap) {
    let rate = codeMap[code];
    return rate;
  } else {
    return 0;
  }
}
