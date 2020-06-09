const express = require('express')
const app = express()

const middlewareBefore = (req, res, next) => {
    console.log('middleware before')
    next()
}

const middlewareAfter = (req, res, next) => {
    next()
    console.log('middleware after')
}

const auth = (req, res, next) => {
    if(req.query.admin === 'true') {
        req.admin = true
        next()
        return
    }

    res.send('no auth')
}

const logger = (req, res, next) => {
    console.log(req.originalUrl)
    next()
}

app.use(middlewareBefore)
app.use(logger)
app.use(middlewareAfter)


app.get('/', (req, res) => {
    res.send('home page')
})

app.get('/users',auth, (req, res) => {
    console.log(`user is admin = ${req.admin}`)
    res.send('users page')
})


app.listen(3000)