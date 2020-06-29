const schedule = require('node-schedule'),
    app = require('express')(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    apiClient = require('./api-client')

const mtrStationsAcronyms = {
    "AEL": {
        "HOK": "Hong Kong",
        "KOW": "Kowloon",
        "TSY": "Tsing Yi",
        "AIR": "Airport",
        "AWE": "AsiaWorld Expo"
    },
    "TCL": {
        "HOK": "Hong Kong",
        "KOW": "Kowloon",
        "OLY": "Olympic",
        "NAC": "Nam Cheong",
        "LAK": "Lai King",
        "TSY": "Tsing Yi",
        "SUN": "Sunny Bay",
        "TUC": "Tung Chung"
    },
    "WRL": {
        "HUH": "Hung Hom",
        "ETS": "East Tsim Sha Tsui",
        "AUS": "Austin",
        "NAC": "Nam Cheong",
        "MEF": "Mei Foo",
        "TWW": "Tsuen Wan West",
        "KSR": "Kam Sheung Road",
        "YUL": "Yuen Long",
        "LOP": "Long Ping",
        "TIS": "Tin Shui Wai",
        "SIH": "Siu Hong",
        "TUM": "Tuen Mun"
    },
    "TKL": {
        "NOP": "North Point",
        "QUB": "Quarry Bay",
        "YAT": "Yau Tong",
        "TIK": "Tiu Keng Leng",
        "TKO": "Tseung Kwan O",
        "LHP": "LOHAS Park",
        "HAH": "Hang Hau",
        "POA": "Po Lam"
    }
}

const mtrLinesAcronyms = {
    "AEL": "Airport Express",
    "TCL": "Tung Chung Line",
    "WRL": "West Rail Line",
    "TKL": "Tseung Kwan O Line"
}

app.get(`/Lines`, (req, res) => {
    res.send(mtrLinesAcronyms)
})

app.get(`/Stations/:Line`, (req, res) => {
    res.send(mtrStationsAcronyms[req.params[`Line`]])
})

app.get(`*`, (req, res) => {
    res.send(`Please visit: <br><a href="https://github.com/LabLamb/MTR-Cards-Backend">https://github.com/LabLamb/MTR-Cards-Backend</a><br> for more info.`)
})

http.listen(process.env.PORT || 3000)

io.on('connection', socket => {
    console.log(`${socket.id} connected.`)
})

var job = schedule.scheduleJob('*/10 * * * * *', () => {
    for (let line in mtrLinesAcronyms) {
        for (let station in mtrStationsAcronyms[line]) {
            apiClient.fetchMTRTime(`${line}`, `${station}`)
                .then(res => {
                    io.of(`/`).emit(`${line}_${station}_UPDATE`, res.data)
                })
                .catch(err => {
                    console.log(err)
                    io.of(`/`).emit(`${line}_${station}_UPDATE`, `Something went wrong.`)
                })
        }
    }
});