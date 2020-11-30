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
  console.log(body.kurssi)
  if (body.kurssi==undefined){
    return res.status(400).json({
      error: 'Tallennettava tieto puuttuu!'
    })
  } else {
  db.query('INSERT INTO kurssi(kurssi,aloituspvm) VALUES($1,$2) RETURNING kurssiid',[body.kurssi,body.aloituspvm],(err,result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })}
})

// muutetaan kurssi
app.put('/:id', (req, res, next) => {
  const body = req.body
  console.log(body)
  if (body.kurssi == undefined || body.aloituspvm == undefined){  // tietoa ei välitetty
    return res.status(400).json({
      error: 'Muutettava tieto puuttuu!'
    })
  } else {
    db.query('UPDATE kurssi SET kurssi=$1,aloituspvm=$2 WHERE kurssiid=$3',[body.kurssi,body.aloituspvm,req.params.id],(err,result) => {
      if (err) {
        return next(err)
      }
      res.send(result.rows)
  })}
})

// poistetaan kurssi
app.delete('/:id', (req, res, next) => {
  db.query('DELETE FROM kurssi WHERE kurssiid=$1',[req.params.id],(err,result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
})

// app.post('/', (req, res) => {
//     res.send('Hello World! POST')
//   })

// app.put('/', (req, res) => {
//     res.send('Hello World! PUT')
//   })

// --------------------------Älä kommentoi pois ------------------------------------------------------

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

