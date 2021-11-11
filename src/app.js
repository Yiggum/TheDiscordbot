import 'axios'
//const axios = require('axios')

const url = "api.coincap.io/v2/assets/amp"

// axios({
//     method: 'post',
//     url: '/login',
//     data: {
//       firstName: 'Finn',
//       lastName: 'Williams'
//     }
//   });

axios.get(url)