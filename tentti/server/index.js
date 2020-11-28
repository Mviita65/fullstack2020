const cors = require('cors')
const express = require('express')
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 4000

const db = require('./db')
const { response } = require('express')

// kurssit
app.get('/', (req, res, next) => {
  db.query('SELECT * FROM kurssi', (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
})

// kurssin tentit = tenttivalikko
app.get('/kurssi/:id', (req, res, next) => {
  db.query('SELECT * FROM tentti WHERE tenttiid IN (SELECT kurssi_tentti_id FROM kurssitentti WHERE kurssi_kurssi_id = $1)', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
})

// tentin kaikki kysymykset
app.get('/tentti/:id', (req, res, next) => {
  db.query('SELECT kysymys,kysymysid FROM kysymys WHERE kysymysid IN (SELECT tkysymys_kysymys_id FROM tenttikysymys WHERE tkysymys_tentti_id = $1)', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
})

// yhden kysymyksen vaihtoehdot
app.get('/kysymys/:id', (req, res, next) => {
  db.query('SELECT vaihtoehto, valinta, vaihtoehto_kysymys_id FROM vaihtoehto WHERE vaihtoehto_kysymys_id IN (SELECT tkysymys_kysymys_id FROM tenttikysymys WHERE tkysymys_kysymys_id = $1)', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
})

// oppilaan true vastaus/vastaukset kysymykseen
app.get('/kayttaja/:id/kysymys/:id2', (req, res, next) => {
  db.query('SELECT vastaus,vastaus_vaihtoehto_id,vastaus_kayttaja_id FROM vastaus WHERE vastaus_kayttaja_id = $1 AND vastaus_vaihtoehto_id IN (SELECT vaihtoehtoid FROM vaihtoehto WHERE vaihtoehto_kysymys_id = $2)', [req.params.id,req.params.id2],(err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
})

// lisätään uusi kurssi
app.post('/', (req, res, next) => {
  const body = req.body
  if (!body){
    return res.status(400).json({
      error: 'Tallennettava tieto puuttuu!'
    })
  }
  db.query('INSERT INTO kurssi VALUES $body',(err,result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
})

app.post('/', (req, res) => {
    res.send('Hello World! POST')
  })

app.put('/', (req, res) => {
    res.send('Hello World! PUT')
  })
  
app.delete('/', (req, res) => {
      res.send('Hello World! DELETE')
    })
      
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

