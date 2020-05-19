require('custom-env').env(true)
const express = require('express')
const app = express()
const hbs = require('hbs')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')


require('./models/db')

app.use(passport.initialize())
require('./auth/localeStrategy')
require('./auth/jwtStrategy')
app.use(cors())
app.use(express.static('static'))
app.use(express.static('upload'))
app.set('view engine', 'hbs')
app.set('views', './views/pages')
app.use(fileUpload({
    limits: {fileSize: 50 * 1024 * 1024},
}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
hbs.registerPartials(__dirname + '/views/partials')


app.use('/', require('./routes/router'))
app.use('/admin', require('./routes/admin-router'))
app.use('/api', require('./routes/api-router'))

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`)
})
