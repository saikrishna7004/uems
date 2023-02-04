const axios = require('axios')
axios.get('https://finalspaceapi.com/api/v0/character/?limit=2').then(d=>{
    console.log(d.data)
})