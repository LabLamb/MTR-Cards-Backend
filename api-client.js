const axios = require('axios');

module.exports = {
  fetchMTRTime: fetchMTRTime,
};

function fetchMTRTime(line, station) {
  return axios.get(
    `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${station}`,
  );
}
