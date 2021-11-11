import axios from 'axios'
import dotenv from 'dotenv'
//const axios = require('axios')

const result = dotenv.config()
console.log(result)
const token = process.env.BARER_TOKEN
console.log(token)


const url = "http://api.coincap.io/v2/assets/amp"

const x = 0
let y = 0
let currentPrices = []
let currentZero = 0
let current59 = 59

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

do {
    let myVar = setInterval(function () { timer() }, 1000);

    function timer() {
        getRequest()
        averageCheckerWithDefence()
        y++

    }
    function stopFunction() {
        clearInterval(myVar);
    }

} while (x > 0);



function averageChecker(x, y) {
    // currentPrices[0]
    // currentPrices[59]
    var percDiff = 100 * Math.abs((x - y) / ((x + y) / 2));
    console.log(percDiff)
    if (currentPrices[currentZero] < currentPrices[current59]) {
        console.log("Increase")
    } else {
        console.log("decrease")
    }
}

function averageCheckerWithDefence() {

    if (y > 60) {
        if (currentPrices[currentZero] === "error" || currentPrices[current59] === "error") {
            currentZero++
            current59++
        } else {
            averageChecker(currentPrices[currentZero], currentPrices[current59])
            currentZero++
            current59++

        }
    } else {
        console.log("It is not time")
    }
}

