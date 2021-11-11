import axios from 'axios'
//const axios = require('axios')

const url = "http://api.coincap.io/v2/assets/amp"

// axios({
//     method: 'post',
//     url: '/login',
//     data: {
//       firstName: 'Finn',
//       lastName: 'Williams'
//     }
//   });

axios.get(url).then(function (response) {
    // handle success
    console.log("wooho")
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log("ohshit")
    console.log(error);
  })