import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { converter } from "./js/converter";

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
      const converted = converter(usdAmount,3); //for testing

      console.log(targetCurrency);
      console.log(response);
      console.log(converted);
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