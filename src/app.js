import axios from 'axios'
//const axios = require('axios')

const url = "http://api.coincap.io/v2/assets/amp"

const x = 0
let y = 0
let currentPrices = []
let currentZero = 0
let current59 = 59

function getRequest(){
    axios.get(url).then(function (response) {
    // handle success
    console.log("wooho")
    console.log(response.data.data)
    currentPrices.push(parseFloat(response.data.data.priceUsd))
    console.log(currentPrices);
    })
    .catch(function (error) {
    // handle error
    console.log("ohshit")
    console.log(error.data)
    currentPrices.push("error");
    })
}

do {
    let myVar = setInterval(function(){ timer() }, 1000);

    function timer() {
    getRequest()
    averageCheckerWithDefence()
    y++
    
    }
    function stopFunction() {
        clearInterval(myVar);
    }
 
 } while (x > 0);



 function averageChecker(x, y){
    // currentPrices[0]
    // currentPrices[59]
    var percDiff =  100 * Math.abs( (x - y) / ( (x+y)/2 ) );
    console.log("test")
    console.log(percDiff)
}
 
function averageCheckerWithDefence(){
   if (y> 60){
        if(currentPrices[currentZero] === "error" || currentPrices[current59] === "error"){
            currentZero++
            current59++
        } else {
            averageChecker(currentPrices[currentZero],currentPrices[current59])
            currentZero++
            current59++
            console.log("Current 0 = " + currentZero)
            console.log("Current 59 = " + current59)
        }
    } else {
        console.log("It is not time")
}
}



//  function reportingGetRequest(){
//     axios.get(url).then(function (response) {
//     // handle success
//     console.log("wooho")
//     console.log(response.data.data)
//     currentPrices.push(response.data.data.priceUsd)
//     console.log(currentPrices);
//     averageChecker(currentPrices[0],currentPrices[59])
//     x++
//     })
//     .catch(function (error) {
//     // handle error
//     console.log("ohshit")
//     console.log(error)
//     currentPrices.push("error");
//     })
// }

// do {
//     let myVar = setInterval(function(){ timer() }, 1000);

//     function timer() {
//     reportingGetRequest()
//     }
//     function stopFunction() {
//         clearInterval(myVar);
//     }
 
//  } while (x > 59);