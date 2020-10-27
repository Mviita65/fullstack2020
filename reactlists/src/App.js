import React from 'react'
import {useState} from 'react'
import './oma.css';

function App() {


const [listaA,setListaA]=useState(["Jukka","Pekka","Kalle","Saara","Katriina","Susanna"])
const [listaB,setListaB]=useState(["Jorma","Jaakko","Antti"])
// const [listaB,setListaB]=useState(["This list has no items"])
const [valittu,setValittu]=useState("")


const lajittelu = (lista) => {
  switch (lista){
    case "A":{
      let kopioListaA = [...listaA]
      kopioListaA.sort()
      setListaA(kopioListaA)
      // setLajiteltu(!lajiteltu)
      console.log(kopioListaA)
      break;
    }
    case "B":{
      let kopioListaB = [...listaB]
      kopioListaB.sort()
      setListaB(kopioListaB)
      // setLajiteltu(!lajiteltu)
      console.log(kopioListaB)
      break;
    } 
    default:{
      console.log("Logiikkavirhe listalajittelussa!")
      break;
    }
  }
}

const merkitse = (lista,index) => {
  let listanNimi = lista
  let listanIndex = index
  let merkitty=`${listanNimi}[${listanIndex}]`
  setValittu(merkitty)
  console.log(merkitty)
}

const siirra = (mihin) =>{
  let lista = valittu.slice(0,6)
  let index = Number(valittu.slice(7,8))
  let siirrettava = ""
  let i = 0
  console.log(lista)
  console.log(index)
  switch (lista){
    case "listaA":{
      let uusiListaA = []
      let uusiListaB = [...listaB]    
      if (mihin==="toRight"){
        console.log("Siirrä "+valittu+" B listalle")
        let pituus = listaA.length
        for (i = 0; i < pituus+1; i++){
          if (i !== index) {           
            uusiListaA.push(listaA[i])
            setListaA(uusiListaA)
          } else {
            siirrettava = listaA[i]
          }
        }
        uusiListaB.push(siirrettava)
        setListaB(uusiListaB)
        break;
      }
      break;
    }
    case "listaB":{
      let uusiListaA = [...listaA]
      let uusiListaB = []
      if (mihin==="toLeft"){
        console.log("Siirrä "+valittu+" A listalle") 
        let pituus = listaB.length
        for (i = 0; i < pituus+1; i++){
          if (i !== index) {           
            uusiListaB.push(listaB[i])
            setListaB(uusiListaB)
          } else {
            siirrettava = listaB[i]
          }
        }
        uusiListaA.push(siirrettava)
        setListaA(uusiListaA)
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
        <header>List_A <span onClick={()=>{lajittelu("A")}}>| sort</span></header>
        {listaA.map((item,index)=><div className="lista-item" key={index} onClick={()=>{merkitse("listaA",index)}}>{listaA[index]}</div>)}
      </div>
      <div className="grid-siirrot">
         <div className="siirrot-item" onClick={()=>{siirra("toRight")}}>»</div>
         <div className="siirrot-item" onClick={()=>{siirra("toLeft")}}>«</div>
     </div>
      <div className="grid-lista">
        <header>List_B <span onClick={()=>{lajittelu("B")}}>| sort</span></header>
        {listaB.map((item,index)=><div className="lista-item" key={index} onClick={()=>{merkitse("listaB",index)}}>{listaB[index]}</div>)}
      </div>
    </div>
  );
}

export default App;
