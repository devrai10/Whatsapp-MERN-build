//importing
import express from 'express'
import mongoose from 'mongoose'
import dbMessages from './dbMessages.js'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
//app config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: '1068333',
    key: 'b5d7f4e9a4b2642719f3',
    secret: '082b5e1d6578b6e5b04a',
    cluster: 'ap2',
    encrypted: true
});

//middlewares
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

//DB config
const connection_url = 'mongodb+srv://admin:123@cluster0.x6kzs.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open', () => {
    console.log('db is connected');
    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();


    changeStream.on('change', (change) => {

        console.log(change);
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {

                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received,

                });
        }

        else {
            console.log('Error triggering Pusher')
        }
    });
});


//api routes
app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(`new message created : \n ${data}`)
        }
    })
})

//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));