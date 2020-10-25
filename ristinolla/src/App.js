import React from 'react';
import {useEffect, useState} from 'react';
// import logo from './logo.svg';
import './oma.css';

function App() {

  const [ruutu1,setRuutu1]=useState("") // ruutu tyhjä tai merkitty joko X tai O
  const [ruutu2,setRuutu2]=useState("")
  const [ruutu3,setRuutu3]=useState("")
  const [ruutu4,setRuutu4]=useState("")
  const [ruutu5,setRuutu5]=useState("")
  const [ruutu6,setRuutu6]=useState("")
  const [ruutu7,setRuutu7]=useState("")
  const [ruutu8,setRuutu8]=useState("")
  const [ruutu9,setRuutu9]=useState("")
  const [vuoro,setVuoro]=useState(0)    // vuoro 0=X ja 1=O
  const [gameOver,setGameOver]=useState(0)  // 0=peli kesken tai 1=peli pelattu
  const [siirrot, setSiirrot]=useState(0)   // saa arvoksi pelin siirtojen määrän, maksimi on 9
  

  const tyhjenna = () => {  // arvot asetetaan alkuarvoiksi (=nappi "Aloita uusi")
    setRuutu1("")
    setRuutu2("")
    setRuutu3("")
    setRuutu4("")
    setRuutu5("")
    setRuutu6("")
    setRuutu7("")
    setRuutu8("")
    setRuutu9("")
    setVuoro(0)
    setGameOver(0)
    setSiirrot(0)
  }

  const tarkista = () => {  // tarkistetaan onko voittoriviä (8 kpl) vai päättyikö ratkaisemattomaan
    if (ruutu1 !== "" && ruutu1 === ruutu2 && ruutu2 === ruutu3){
      alert("Onnea "+ruutu1+" voitto tuli!")
      setGameOver(1)
    } 
    else if (ruutu1 !== "" && ruutu1 === ruutu5 && ruutu5 === ruutu9){
      alert("Onnea "+ruutu1+" voitto tuli!")
      setGameOver(1)
    } 
    else if (ruutu1 !== "" && ruutu1 === ruutu4 && ruutu4 === ruutu7){
      alert("Onnea "+ruutu1+" voitto tuli!")
      setGameOver(1)
    }
    else if (ruutu3 !== "" && ruutu3 === ruutu5 && ruutu5 === ruutu7){
      alert("Onnea "+ruutu3+" voitto tuli!")
      setGameOver(1)
    } 
    else if (ruutu3 !== "" && ruutu3 === ruutu6 && ruutu6 === ruutu9){
      alert("Onnea "+ruutu3+" voitto tuli!")
      setGameOver(1)
    } 
    else if (ruutu2 !== "" && ruutu2 === ruutu5 && ruutu5 === ruutu8){
      alert("Onnea "+ruutu2+" voitto tuli!")
      setGameOver(1)
    } 
    else if (ruutu4 !== "" && ruutu4 === ruutu5 && ruutu5 === ruutu6){
      alert("Onnea "+ruutu4+" voitto tuli!")
      setGameOver(1)
    } 
    else if (ruutu7 !== "" && ruutu7 === ruutu8 && ruutu8 === ruutu9){
      alert("Onnea "+ruutu7+" voitto tuli!")
      setGameOver(1)
    } 
    else if (siirrot === 9){
      alert("Tasapeli, ei voittajaa!")
    }
  }

  useEffect(        // vuoron vaihtuessa tarkistetaan mikä on pelitilanne tehdyn siirron jälkeen
    tarkista,
  [vuoro])

  const merkitse = (paikka) => {  // tyhjän ruudun klikkauksen jälkeen ruudun arvoksi vuoroa vastaava luku
    let ruutu = paikka
    let laskuri = siirrot
    console.log(laskuri)
    switch (ruutu){
      case 1:{
        if (ruutu1 === "" && gameOver === 0){   // ehtona ruutu tyhjä ja peli on kesken
          if (vuoro === 0){
            setRuutu1("X")
            setVuoro(1)
          } else {
            setRuutu1("O")
            setVuoro(0)
          }
          laskuri++                             // merkitään laskuriin tehty onnistunut siirto
          setSiirrot(laskuri)
        }
        break;
      }
      case 2:{
        if (ruutu2 === "" && gameOver === 0){
          if (vuoro === 0){
            setRuutu2("X")
            setVuoro(1)
          } else {
            setRuutu2("O")
            setVuoro(0)
          }
          laskuri++
          setSiirrot(laskuri)
        }
        break;
      }
      case 3:{
        if (ruutu3 === "" && gameOver === 0){
          if (vuoro === 0){
            setRuutu3("X")
            setVuoro(1)
          } else {
            setRuutu3("O")
            setVuoro(0)
          }
          laskuri++
          setSiirrot(laskuri)
        }
        break;
      }
      case 4:{
        if (ruutu4 === "" && gameOver === 0){
          if (vuoro === 0){
            setRuutu4("X")
            setVuoro(1)
          } else {
            setRuutu4("O")
            setVuoro(0)
          }
          laskuri++
          setSiirrot(laskuri)
        }
        break;
      }
      case 5:{
        if (ruutu5 === "" && gameOver === 0){
          if (vuoro === 0){
            setRuutu5("X")
            setVuoro(1)
          } else {
            setRuutu5("O")
            setVuoro(0)
          }
          laskuri++
          setSiirrot(laskuri)
        }
        break;
      }
      case 6:{
        if (ruutu6 === "" && gameOver === 0){
          if (vuoro === 0){
            setRuutu6("X")
            setVuoro(1)
          } else {
            setRuutu6("O")
            setVuoro(0)
          }
          laskuri++
          setSiirrot(laskuri)
        }
        break;
      }
      case 7:{
        if (ruutu7 === "" && gameOver === 0){
          if (vuoro === 0){
            setRuutu7("X")
            setVuoro(1)
          } else {
            setRuutu7("O")
            setVuoro(0)
          }
          laskuri++
          setSiirrot(laskuri)
        }
        break;
      }
      case 8:{
        if (ruutu8 === "" && gameOver === 0){
          if (vuoro === 0){
            setRuutu8("X")
            setVuoro(1)
          } else {
            setRuutu8("O")
            setVuoro(0)
          }
          laskuri++
          setSiirrot(laskuri)
        }
        break;
      }
      case 9:{
        if (ruutu9 === "" && gameOver === 0){
          if (vuoro === 0){
            setRuutu9("X")
            setVuoro(1)
          } else {
            setRuutu9("O")
            setVuoro(0)
          }
          laskuri++
          setSiirrot(laskuri)
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  // JSX eli tässä on ruudulla näkyvät kilkkeet ja tieto mitä proseduuria kutsutaan kun peliruutua klikataan
  // ja mitä tehdään kun klikataan nappia "Aloita uusi"
  return (
    <div>
      <br/>
      <div className="grid-container"> 
        <header>Ristinolla</header>
        <div className="grid-item" onClick={()=>merkitse(1)}>{ruutu1}</div>
        <div className="grid-item" onClick={()=>merkitse(2)}>{ruutu2}</div>
        <div className="grid-item" onClick={()=>merkitse(3)}>{ruutu3}</div>
        <div className="grid-item" onClick={()=>merkitse(4)}>{ruutu4}</div>
        <div className="grid-item" onClick={()=>merkitse(5)}>{ruutu5}</div>
        <div className="grid-item" onClick={()=>merkitse(6)}>{ruutu6}</div>
        <div className="grid-item" onClick={()=>merkitse(7)}>{ruutu7}</div>
        <div className="grid-item" onClick={()=>merkitse(8)}>{ruutu8}</div>
        <div className="grid-item" onClick={()=>merkitse(9)}>{ruutu9}</div>
        <footer>Mika Viitaniemi</footer>
      </div> 
      <p><button onClick={()=>tyhjenna()}>Aloita uusi</button></p>
    </div>
  );
}

export default App;
