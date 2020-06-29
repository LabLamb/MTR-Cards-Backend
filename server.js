const schedule = require('node-schedule'),
    app = require('express')(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    apiClient = require('./api-client'),
    mtrStationsAcronyms = require('./stations'),
    mtrLinesAcronyms = require('./lines')

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