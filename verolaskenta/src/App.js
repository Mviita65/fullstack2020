import React from 'react';
import logo from './logo.svg';
import {useState} from 'react';
import './App.css';

function App() {

  const [nappulat,setNappulat]=useState(["Jarno","Pekka","Matti","Simo","Saara"])
  const [osaNappulat,setOsaNappulat]=useState([])

  const nappulaPainettu = (index) => {
    console.log("Nappula painettu!"+index)
    let uusiLista = nappulat.concat([nappulat[index]])
    setNappulat(uusiLista)
  }

  const painikePainettu = () => {
    // let listaJossaVainJarnot = nappulat.filter(item=>item=="Jarno") tämä toimii jos ei ole enempää koodia, jos enemmän koodia aaltosulkeet tai sitten tämäkin kuin alla
    let listaJossaVainJarnot = nappulat.filter(item=>{return item=="Jarno"})
    setOsaNappulat(listaJossaVainJarnot)
  }

  const nimiMuuttui = (event,index) =>{
    let uusiLista = [...nappulat]
    uusiLista[index] = event.target.value
    console.log(event.target.value)
    setNappulat(uusiLista)
  }
  
  //JSX
  return (
    <div>
      {nappulat.map((nappula,index)=><input key={index} onChange={(event)=>nimiMuuttui(event,index)} value={nappula}></input>)}
      {/* {nappulat.map((nappula,index)=><button key={index} onClick={()=>nappulaPainettu(index)}>{nappula}</button>)}
      <button onClick={painikePainettu}>Näytä vain Jarnot</button><br/>
      {osaNappulat.length==0 ? "Ei ole vielä suodatettu Jarnoja":osaNappulat.map((nappula,index)=><button key={index} onClick={()=>nappulaPainettu(index)}>{nappula}</button>)} */}
    </div>
  );
}

export default App;