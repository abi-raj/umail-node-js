let cron = require('node-cron');
const express = require('express');
const cors = require('cors');
const app = express();
const fstore = require('./fb_connect');
const sendMail = require('./send_mail');
app.use(express.json());
app.use(cors());
const allTasks = {};





function checkAndDo(data,doc){
    if (data.time.type === 'sec') {
        console.log('secon');
        const task = cron.schedule('1,30 * * * * *', () => {
            console.log('Task in seconds');
           sendMail(data.message);
        


        }, {
            scheduled: false,
            timezone: "Asia/Kolkata"
        }, );
        task.start();
        allTasks[doc.id]={status:true,task:task}

    } else if (data.time.type === 'week') {
        const arr = data.time.value.split(' ');
        const hour = arr[0].split(':')[0];
        const min = arr[0].split(':')[1];
        const day = arr[1];
        const task = cron.schedule(('0 '+min+' '+hour+' * * '+day), () => {
            console.log('Task in weeks');
            sendMail(data.message);
        }, {
            scheduled: false,
            timezone: "Asia/Kolkata"
        }, );
        task.start();
    
        allTasks[doc.id]={status:true,task:task}


    } else if (data.time.type === 'month') {
        const arr = data.time.value.split(' ');
        const hour = arr[0].split(':')[0];
        const min = arr[0].split(':')[1];
        const date = arr[1];
        
        const task = cron.schedule(('0 '+min+' '+hour+' '+ date+' * *'), () => {
            console.log('Task in months');
            sendMail(data.message);
        }, {
            scheduled: false,
            timezone: "Asia/Kolkata"
        }, );

        task.start();
      
        allTasks[doc.id]={status:true,task:task}


    } else if (data.time.type === 'year') {
        const arr = data.time.value.split(' ');
        const hour = arr[0].split(':')[0];
        const min = arr[0].split(':')[1];
        const date = arr[1].split('-')[0];
        const month = arr[1].split('-')[1];

        const task = cron.schedule(('0 '+min+' '+hour+' '+date+' '+month+' *'), () => {
            console.log('Task in years');
            sendMail(data.message);
        }, {
            scheduled: false,
            timezone: "Asia/Kolkata"
        }, );
        task.start();
    
        allTasks[doc.id]={status:true,task:task}

    }
}

fstore.collection('RecMails').onSnapshot(
    (qs) => {
        qs.forEach((doc) => {
            const data = doc.data();
            if (!allTasks[doc.id]) { //if new
                
             checkAndDo(data,doc);
            }

            else if(allTasks[doc.id].status !== data.status){
                if(data.status===true){
                    
                    checkAndDo(data,doc);
                }
                else if (data.status===false){
                    console.log('stopping');
                    allTasks[doc.id].status=false;
                    allTasks[doc.id].task = allTasks[doc.id].task.stop();
                }
            }

        });
    }
);


app.get('/', (req, res) => {

    res.json({
        message: "Go Float Yourself"
    })

})

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log('up and runnin on ');
})