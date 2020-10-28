import React from 'react'
import {useState} from 'react'
import './oma.css';

function App() {


const [listaA,setListaA]=useState(["Jukka","Pekka","Kalle","Saara","Katriina","Susanna","Antti"])
const [listaB,setListaB]=useState(["Jorma","Jaakko","Antti"])
const [valittu,setValittu]=useState("")
const [naytaLajittelu,setNaytaLajittelu]=useState(0)


const lajittelu = (lista) => {
  let kopioListaA = []
  console.log(kopioListaA)
  let kopioListaB = []
  console.log(kopioListaB)
  switch (lista){
    case "A":{
      kopioListaA = [...listaA]
      kopioListaA.sort()
      setListaA(kopioListaA)
      console.log(kopioListaA)
      break;
    }
    case "B":{
      kopioListaB = [...listaB]
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
  // let i = 0
  let uusiListaA = []
  let uusiListaB = []
  switch (lista){
    case "listaA":{   
      uusiListaB = [...listaB]  // listaA:n ollessa kysymyksessä kopidaan B siirrettävän lisäystä varten  
      if (mihin==="toRight"){       // ollaan siirtämässä listalta A listalle B
        // let pituus = listaA.length    // kuinka monta nimeä on listassa
        // for (i = 0; i < pituus; i++){ // käydään lista läpi
        //   if (i !== index) {            // jos kyseessä ei ole siirrettävän indeksi
        //     uusiListaA.push(listaA[i])  // kerätään nimi listalle
        //   } else {
        //     siirrettava = listaA[i]     // jos on kyseessä siirrettävä indeksi otetaan nimi talteen
        //   }
        // }
        siirrettava = listaA[index] // otetaan merkitty siirrettäväksi
        uusiListaA = listaA.filter((item,Aindex)=>Aindex!==index)  // muista tehdään uusilista
        uusiListaB.push(siirrettava)    // lisätään talteen otettu nimi listalle B
        setListaA(uusiListaA)           // päivitetään lista A
        setListaB(uusiListaB)           // päivitetaan lista B
        break;
      }
      break;
    }
    case "listaB":{                     // sama kuin yllä, mutta nyt siirto listalta B listalle A
      uusiListaA = [...listaA]
      if (mihin==="toLeft"){
        siirrettava = listaB[index]
        uusiListaB = listaB.filter((item,Bindex)=>Bindex!==index) // muista tehdään uusilista
        uusiListaA.push(siirrettava)
        setListaA(uusiListaA)
        setListaB(uusiListaB)
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

const suodata = (lista) =>{
  console.log("Suodatus")
  let suodatusehto = prompt("Anna merkkijonon alku?")
  let eka = suodatusehto.slice(0,1).toUpperCase()
  suodatusehto = eka.concat(suodatusehto.substring(1)) // suodatusehto ensimmäinen merkki suuraakkoseksi
  console.log(suodatusehto)
  let suodatettuLista = []
  switch (lista){
    case "A": {
      suodatettuLista = listaA.filter(item => item.startsWith(suodatusehto))
      console.log(suodatettuLista)
      break;    
    }
    case "B": {
      suodatettuLista = listaB.filter(item => item.startsWith(suodatusehto))
      console.log(suodatettuLista)
      break;
    }
    default: {
      break;
    }
  }
}

  return (
    <div className="grid-container">
      <div className="grid-lista">
        <header>List_A 
          <span onClick={()=>{lajittelu("A")}}> | sort </span>
          <span onClick={()=>{suodata("A")}}> | filter </span>
        </header>
        {listaA.map((item,index)=>
        <div className="lista-item" tabIndex={index} key={index} 
          onClick={()=>{merkitse("listaA",index)}}>{listaA[index]}
        </div>)}
      </div>
      <div className="grid-siirrot">
        <div className="siirrot-item" 
          onClick={()=>{siirra("toRight")}}>»
        </div>
        <div className="siirrot-item" 
          onClick={()=>{siirra("toLeft")}}>«
        </div>
      </div>
      <div className="grid-lista">
        <header>List_B 
          <span onClick={()=>{lajittelu("B")}}> | sort </span>
          <span onClick={()=>{suodata("B")}}> | filter </span>
        </header>
        {listaB.map((item,index)=>
        <div className="lista-item" tabIndex={index} key={index} 
          onClick={()=>{merkitse("listaB",index)}}>{listaB[index]}
        </div>)}
      </div>
    </div>
  );
}

export default App;
