import React from 'react'
import {useState} from 'react'
import './oma.css';

function App() {


const [listaA,setListaA]=useState(["Jukka","Pekka","Kalle","Saara","Katriina","Susanna"])
const [listaB,setListaB]=useState(["Jorma","Jaakko","Antti"])
const [valittu,setValittu]=useState("")


const lajittelu = (lista) => {
  switch (lista){
    case "A":{
      let kopioListaA = [...listaA]
      kopioListaA.sort()
      setListaA(kopioListaA)
      console.log(kopioListaA)
      break;
    }
    case "B":{
      let kopioListaB = [...listaB]
      kopioListaB.sort()
      setListaB(kopioListaB)
      console.log(kopioListaB)
      break;
    } 
    default:{
      console.log("Logiikkavirhe listalajittelussa!")
      break;
    }
  }
}

const merkitse = (lista,index) => { // tekee listasta ja indeksista merkkijonon esim. listaA[0]
  let listanNimi = lista
  let listanIndex = index
  let merkitty=`${listanNimi}[${listanIndex}]`
  setValittu(merkitty)
  console.log(merkitty)
}

const siirra = (mihin) =>{
  let lista = valittu.slice(0,6) // saa merkkijonon alusta kuusi merkkiä esim. listaA
  let index = Number(valittu.slice(7,8)) // saa merkkijonosta indexin esim. 0
  let siirrettava = ""
  let i = 0
  switch (lista){
    case "listaA":{   
      let uusiListaA = []
      let uusiListaB = [...listaB]  // listaA:n ollessa kysymyksessä kopidaan B siirrettävän lisäystä varten  
      if (mihin==="toRight"){       // ollaan siirtämässä listalta A listalle B
        let pituus = listaA.length    // kuinka monta nimeä on listassa
        for (i = 0; i < pituus+1; i++){ // käydään lista läpi
          if (i !== index) {            // jos kyseessä ei ole siirrettävän indeksi
            uusiListaA.push(listaA[i])  // kerätään nimi listalle
          } else {
            siirrettava = listaA[i]     // jos on kyseessä siirrettävä indeksi otetaan nimi talteen
          }
        }
        uusiListaB.push(siirrettava)    // lisätään talteen otettu nimi listalle B
        setListaA(uusiListaA)           // päivitetään lista A
        setListaB(uusiListaB)           // päivitetaan lista B
        break;
      }
      break;
    }
    case "listaB":{                     // sama kuin yllä, mutta nyt siirto listalta B listalle A
      let newListaA = [...listaA]
      let newListaB = []
      if (mihin==="toLeft"){
        let pituus = listaB.length
        for (i = 0; i < pituus+1; i++){
          if (i !== index) {           
            newListaB.push(listaB[i])
          } else {
            siirrettava = listaB[i]
          }
        }
        newListaA.push(siirrettava)
        setListaA(newListaA)
        setListaB(newListaB)
        break;
      }
      break;
    } 
    default:{
      console.log("Logiikkavirhe siirtosuunnassa!")
      break;
    }
  }
}

  return (
    <div className="grid-container">
      <div className="grid-lista">
        <header>List_A 
          <span onClick={()=>{lajittelu("A")}}> | sort </span>
          <span> | filter </span>
        </header>
        {listaA.map((item,index)=>
        <div className="lista-item" key={index} onClick={()=>{
          merkitse("listaA",index)}}>{listaA[index]}
        </div>)}
      </div>
      <div className="grid-siirrot">
        <div className="siirrot-item" onClick={()=>{
          siirra("toRight")}}>»
        </div>
        <div className="siirrot-item" onClick={()=>{
          siirra("toLeft")}}>«
        </div>
      </div>
      <div className="grid-lista">
        <header>List_B 
          <span onClick={()=>{lajittelu("B")}}> | sort </span>
          <span> | filter </span>
        </header>
        {listaB.map((item,index)=>
        <div className="lista-item" key={index} onClick={()=>{
          merkitse("listaB",index)}}>{listaB[index]}
        </div>)}
      </div>
    </div>
  );
}

export default App;
