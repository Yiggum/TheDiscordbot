import axios from 'axios'
import dotenv from 'dotenv'
//const axios = require('axios')

const result = dotenv.config()
console.log(result)
const token = process.env.BEARER_TOKEN
console.log(token)


const url = "http://api.coincap.io/v2/assets/amp"

const x = 0
let mainLoopTimer = 0
let currentPrices = []
let currentZero = 0
let current59 = 59
let priceEntityObjects = []

function getRequest() {
    axios.get(url, {
        headers: { Authorization: 'Bearer ' + token }
    }
    )
        .then(function (response) {
            currentPrices.push(parseFloat(response.data.data.priceUsd))

        })
        .catch(function (error) {
            console.log(error)
            currentPrices.push("error");
        })
}
// main loop for pricechecker
do {
    let myVar = setInterval(function () { timer() }, 500);

    function timer() {
        getRequest()
        priceEntityMaker()
        mainLoopTimer++
        console.log(priceEntityObjects)

    }
    function stopFunction() {
        clearInterval(myVar);
    }

} while (x > 0);




// if errors check 
function priceEntityMaker() {

    if (mainLoopTimer > 60) {
        if (currentPrices[currentZero] === "error" || currentPrices[current59] === "error") {
            currentZero++
            current59++
        } else {

            if (currentPrices[currentZero] < currentPrices[current59]) {
                console.log("Increase")

                priceEntityObjects.push(new PriceEntity("increase", currentPrices[current59], currentPrices[currentZero]))
            } else {
                console.log("decrease")

                priceEntityObjects.push(new PriceEntity("decrease", currentPrices[current59], currentPrices[currentZero]))
            }
            currentZero++
            current59++

        }
    } else if (!mainLoopTimer % 300){
        if (currentPrices[0] < currentPrices[current59]) {
            console.log("Increase")

            priceEntityObjects.push(new PriceEntity("increase", currentPrices[current59], currentPrices[0], "5 MINS"))
        } else {
            console.log("decrease")

            priceEntityObjects.push(new PriceEntity("decrease", currentPrices[current59], currentPrices[0], "5 MINS"))
        }
    }else {
        console.log("1 min buffer")
    }
}


class PriceEntity {
    constructor(upOrDown, currentPrice, priceOneMinuteAgo, interval) {
        this.upOrDown = upOrDown;
        this.currentPrice = currentPrice;
        this.previousPrice = priceOneMinuteAgo;
        this.percentageDifference = 100 * Math.abs((priceOneMinuteAgo - currentPrice) / ((priceOneMinuteAgo + currentPrice) / 2))
        this.interval = interval
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

