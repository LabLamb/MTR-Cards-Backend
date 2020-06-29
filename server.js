const schedule = require('node-schedule'),
    app = require('express')(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    apiClient = require('./api-client')

app.get(`/`, (req, res) => {
    res.send(`Please visit: <br><a href="https://github.com/LabLamb/MTR-Cards-Backend">https://github.com/LabLamb/MTR-Cards-Backend</a><br> for more info.`)
})

http.listen(process.env.PORT || 3000)

io.on('connection', socket => {
    console.log(`${socket.id} connected.`)
})

var job = schedule.scheduleJob('*/10 * * * * *', () => {
    console.log(`This job should be running every 10 seconds.`);
    apiClient.fetchMTRTime()
    .then(res => {
        io.of(`/`).emit(`Yeun Long`, res.data)
    })
    .catch(err => {
        console.log(err)
    })
});