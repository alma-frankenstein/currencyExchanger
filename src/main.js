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

      let rates = response.conversion_rates;
      const rateByCode = codeToRate(rates, targetCurrency); // test, returns num

      const converted = converter(usdAmount, rateByCode);
      console.log(response);
      if (rateByCode != 0) {
        $('.showOutput').text(`${usdAmount} USD converts to ${converted} ${targetCurrency}`);
      } else {
        $('.showOutput').text("Please enter a valid country code");
      }
    }
  });
});