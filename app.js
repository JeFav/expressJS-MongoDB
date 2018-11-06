const app = require('express')()
const bodyParser = require('body-parser')
const Articles = require('./articles')
const mongoDbClient = require('./mongo.connector')

mongoDbClient.init()
    .then(client => {
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use('/articles', Articles)

        app.get('/', (req, res) => {
            res.send('Hello world !')
        })

        app.listen(9999, () => {
            console.log('App listening on port 9999')
        })
    })
    .catch(err => { throw err })

