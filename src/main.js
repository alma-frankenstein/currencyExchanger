import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { converter } from "./js/converter";
import { codeToRate } from "./js/codeToRate";


$(document).ready(function() {
  $('#inputAmount').click(function() {
    const usdAmount = $('#amount').val();
    const targetCurrency = $('#target').val();

    $('#amount').val("");
    $('#target').val("");

  
    let request = new XMLHttpRequest();
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;


    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      } // else {
      //   const error = JSON.parse(this.responseText);

      //   returnError(error);
      // }
    };

    request.open("GET", url, true);
    request.send();

    // function returnError(error) {
    //   let message = error.result;
    //   $('.showErrors').text(`Error: ${message}`);
    // }

    function getElements(response) {
      // $('.showInput').text(`You inputted ${usdAmount}`);
      // replace lated with parsed obj, response.conversion_rates
      // let rates =   {
      //   "USD": </li
      //   "AED": </li
      //   "ARS": </li
      //   "AUD": </li
      //   "BGN": </li
      //   "BRL": </li
      //   "BSD": </li
      //   "CAD": </li
      //   "CHF": </li
      //   "CLP": </li
      //   "CNY": </li
      //   "COP": </li
      //   "CZK": </li
      //   "DKK": </li
      //   "DOP": </li
      // };
      let rates = response.conversion_rates;
      const rateByCode = codeToRate(rates, targetCurrency); // test, returns num

      const converted = converter(usdAmount, rateByCode);
      console.log("target currency " + targetCurrency);
      console.log(response);
      console.log("rates map " + rates);
      console.log("rate by code " + rateByCode);
      // $('.showAED').text(`The rate to AED is ${response.conversion_rates.AED}. Output of converted is ${converted} `);
      if (rateByCode != 0) {
        $('.showOutput').text(`${usdAmount} USD converts to ${converted} ${targetCurrency}`);
      } else {
        $('.showOutput').text("Please enter a valid country code");
      }
    }
  });
});



// const city = $('#location').val();
// $('#location').val("");

//     let request = new XMLHttpRequest();
//     const url = `https://v6.exchangerate-api.com/v6/{process.env.API_KEY}/latest/USD`;

//     request.onreadystatechange = function() {
//       if (this.readyState === 4 && this.status === 200) {
//         const response = JSON.parse(this.responseText);
//         getElements(response);
//       }
//     };

//     request.open("GET", url, true);
//     request.send();

//     // function getElements(response) {
//       // $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
//       // $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
//     }
//   });
// });