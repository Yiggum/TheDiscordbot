import axios from 'axios'
import dotenv from 'dotenv'
//const axios = require('axios')

const result = dotenv.config()
console.log(result)
const token = process.env.BARER_TOKEN
console.log(token)


const url = "http://api.coincap.io/v2/assets/amp"

const x = 0
let mainLoopTimer = 0
let currentPrices = []
let currentZero = 0
let current59 = 59
let arrayOfPriceObjects = []

function getRequest() {
    axios.get(url,{
        headers: {
            Authorization: 'Bearer ' + token    
        }
    }).then(function (response) {
        // handle success
        //console.log("wooho")
        //console.log(response.data.data)
        currentPrices.push(parseFloat(response.data.data.priceUsd))
        //console.log(currentPrices);
    })
        .catch(function (error) {
            // handle error
            //console.log("ohshit")
            console.log(error)
            currentPrices.push("error");
        })
}
// main loop for pricechecker
do {
    let myVar = setInterval(function () { timer() }, 1000);

    function timer() {
        getRequest()
        averageCheckerWithDefence()
        console.log(arrayOfPriceObjects)
        mainLoopTimer++

    }
    function stopFunction() {
        clearInterval(myVar);
    }

} while (x > 0);


// console logs rolling average over the past min
function rollingAverageChecker(x, y) {
    // currentPrices[0]
    // currentPrices[59]
    var percDiff = 100 * Math.abs((x - y) / ((x + y) / 2));
    console.log(percDiff)
    if (currentPrices[currentZero] < currentPrices[current59]) {
        console.log("Increase")
        
        arrayOfPriceObjects.push(new PriceEntity(percDiff, "increase"))
    } else {
        console.log("decrease")
        
        arrayOfPriceObjects.push(new PriceEntity(percDiff, "decrease"))
    }
}
// if errors check 
function averageCheckerWithDefence() {

    if (mainLoopTimer > 60) {
        if (currentPrices[currentZero] === "error" || currentPrices[current59] === "error") {
            currentZero++
            current59++
        } else {
            rollingAverageChecker(currentPrices[currentZero], currentPrices[current59])
            currentZero++
            current59++

        }
    } else {
        console.log("It is not time")
    }
}

/*
TODO make a rolling min average function 
Where after the first min it totals up currentPrices[0]-[60]
states whether increase or decrease
*/

// function minuetAverage(){
//     if (Number.isInteger(mainLoopTimer / 60)){
//         for(i = 0; i< currentPrices.length; i++){
//             currentPrices[i]
//         }
//     }
// }


class PriceEntity {
    constructor(price, upOrDown) {
        this.percentageDifference = price;
        this.upOrDown = upOrDown;
      }
}

