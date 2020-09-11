import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import { converter } from "./js/converter";
import { codeToRate } from "./js/codeToRate";

$(document).ready(function () {
  $("#inputAmount").click(function () {
    const usdAmount = $("#amount").val();
    const targetCurrency = $("#target").val();

    $("#amount").val("");
    $("#target").val("");

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

    promise.then(
      function (response) {
        const exResponse = JSON.parse(response);
        let rates = exResponse.conversion_rates;
        const rateByCode = codeToRate(rates, targetCurrency);
        const converted = converter(usdAmount, rateByCode);

        if (rateByCode != 0) {
          $(".showOutput").text(`${usdAmount} USD converts to ${converted} ${targetCurrency}`);
        } else {
          $(".showOutput").text("Please enter a valid country code");
        }
      }, function (error) {
        const errorResponse = JSON.parse(error);
        $(".showErrors").text(`error: ${errorResponse.error}`);
      }
    );
  });
});
