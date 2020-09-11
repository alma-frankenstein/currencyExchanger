export function codeToRate(codeMap, code) {
  // let rates =   {
  // "USD": 1,
  // "AED": 3.6721,
  // "ARS": 74.7683,
  // "AUD": 1.3749,
  // "BGN": 1.6514,
  // "BRL": 5.3035,
  // "BSD": 1.0000,
  // "CAD": 1.3164,
  // "CHF": 0.9096,
  // "CLP": 767.1974,
  // "CNY": 6.8366,
  // "COP": 3656.5238,
  // "CZK": 22.4416,
  // "DKK": 6.2870,
  // "DOP": 58.2602,
  // };
  if (code.toUpperCase() in codeMap) {
    let rate = codeMap[code];
    return rate;
  } else {
    return 0;
    // return "We can't match that country code";
  }
}


// export function converter(inputAmount, conversionRate) {
//   let output = inputAmount * conversionRate;
//   return output;
// }
