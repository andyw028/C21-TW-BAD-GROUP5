import express from 'express'

const app = express()
const PORT = 8080

app.get('/', (req, res) => {
    res.redirect('/index.html')
})

app.listen(PORT, () => {
    console.log(`[INFO] Server Listening at ${PORT}`)
})
