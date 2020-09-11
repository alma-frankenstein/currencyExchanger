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

  //////////////////////////////
//     let request = new XMLHttpRequest();
//     const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;


//     request.onreadystatechange = function() {
//       if (this.readyState === 4 && this.status === 200) {
//         const response = JSON.parse(this.responseText);
//         getElements(response);
//       } 
//     };

//     request.open("GET", url, true);
//     request.send();

//     function getElements(response) {

//       let rates = response.conversion_rates;
//       const rateByCode = codeToRate(rates, targetCurrency); // test, returns num

//       const converted = converter(usdAmount, rateByCode);
//       console.log(response);
//       if (rateByCode != 0) {
//         $('.showOutput').text(`${usdAmount} USD converts to ${converted} ${targetCurrency}`);
//       } else {
//         $('.showOutput').text("Please enter a valid country code");
//       }
//     }
//   });
// });
/////////////////////////////////////////////
  let promise = new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;
    request.onload = function () {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(request.response);
      }
    };
    request.open("GET", url, true);
    request.send();
  });

  promise.then(function (response) {
      const exResponse = JSON.parse(response);

      let rates = exResponse.conversion_rates;
      const rateByCode = codeToRate(rates, targetCurrency); 
      const converted = converter(usdAmount, rateByCode);
      console.log(exResponse);

      if (rateByCode != 0) {
        $('.showOutput').text(`${usdAmount} USD converts to ${converted} ${targetCurrency}`);
      } else {
        $('.showOutput').text("Please enter a valid country code");
      }}, function(error) {
    const errorResponse = JSON.parse(error);
    console.log(errorResponse);
    $(".showErrors").text(`error: ${errorResponse.error}`);
  });
  });
});


//     promise.then(function (response) {
//       const astResponse = JSON.parse(response);
//       let astArray = astResponse.near_earth_objects["2015-09-08"];
//       getDistEarth(astArray);
//       console.log(`${getDistEarth(astArray)}`);
//       $(".showDist").text(`${getDistEarth(astArray)}`);
//     }, function(error) {
//       const astResponse = JSON.parse(error);
//       console.log(astResponse);
//       $(".showDist").text(`error: ${astReponse.error_message}`);
//     });

//   });
// });
