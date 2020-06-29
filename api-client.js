const axios = require('axios');

module.exports = {
    fetchMTRTime: fetchMTRTime
}

async function fetchMTRTime() {
    return axios.get("https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=WRL&sta=YUL")
}