import axios from 'axios'
//const axios = require('axios')

const url = "http://api.coincap.io/v2/assets/amp"

const x = 0
let currentPrices = []

function getRequest(){
    axios.get(url).then(function (response) {
    // handle success
    console.log("wooho")
    console.log(response.data.data)
    currentPrices.push(response.data.data.priceUsd)
    console.log(currentPrices);
    })
    .catch(function (error) {
    // handle error
    console.log("ohshit")
    console.log(error)
    currentPrices.push("error");
    })
}

do {
    let myVar = setInterval(function(){ timer() }, 1000);

    function timer() {
    getRequest()
    }
    function stopFunction() {
        clearInterval(myVar);
    }
 
 } while (x > 0);



 



