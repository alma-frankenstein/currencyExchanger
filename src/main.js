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
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showInput').text(`You inputted ${usdAmount}`);
      // replace lated with parsed obj
      let rates =   {
        "USD": 1,
        "AED": 3.6721,
        "ARS": 74.7683,
        "AUD": 1.3749,
        "BGN": 1.6514,
        "BRL": 5.3035,
        "BSD": 1.0000,
        "CAD": 1.3164,
        "CHF": 0.9096,
        "CLP": 767.1974,
        "CNY": 6.8366,
        "COP": 3656.5238,
        "CZK": 22.4416,
        "DKK": 6.2870,
        "DOP": 58.2602,
        };
      const converted = converter(usdAmount,3); //for testing
      const cadRate = codeToRate(rates, "CAD"); // test, should return 1.31

      console.log(targetCurrency);
      console.log(response);
      console.log(converted);
      console.log(cadRate);
      $('.showAED').text(`The rate to AED is ${response.conversion_rates.AED}. Output of converted is ${converted} `);
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