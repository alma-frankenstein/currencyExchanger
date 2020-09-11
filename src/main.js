import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#submitButton').click(function() {

    let amount = $("#inputNum").val();

    $("#returnNum").text(amount);
    console.log(amount);
    $("#returnNum").show();
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