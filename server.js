const schedule = require('node-schedule'),
    app = require('express')(),
    http = require('http').createServer(app),
    socket = require('socket.io')

app.get(`/`, (req, res) => {
    res.send(`Please visit: <br><a href="https://github.com/LabLamb/MTR-Cards-Backend">https://github.com/LabLamb/MTR-Cards-Backend</a><br> for more info.`)
})

http.listen(process.env.PORT || 3000)

var job = schedule.scheduleJob('*/10 * * * * *', () => {
    console.log(`This job should be running every 10 seconds.`);
});