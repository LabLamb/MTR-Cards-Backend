const schedule = require('node-schedule')

var job = schedule.scheduleJob('*/10 * * * * *', () => {
    console.log('The answer to life, the universe, and everything!');
});

// job.invoke()