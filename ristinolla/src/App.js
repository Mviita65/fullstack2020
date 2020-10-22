import React from 'react';
import {useEffect, useState} from 'react';
// import logo from './logo.svg';
import './oma.css';

function App() {

  const [ruutu1,setRuutu1]=useState("")
  const [ruutu2,setRuutu2]=useState("")
  const [ruutu3,setRuutu3]=useState("")
  const [ruutu4,setRuutu4]=useState("")
  const [ruutu5,setRuutu5]=useState("")
  const [ruutu6,setRuutu6]=useState("")
  const [ruutu7,setRuutu7]=useState("")
  const [ruutu8,setRuutu8]=useState("")
  const [ruutu9,setRuutu9]=useState("")
  const [vuoro,setVuoro]=useState(0)

  const tyhjenna = () => {
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
  }

  const tarkista = () => {
    if (ruutu1 !== "" && ruutu1 === ruutu2 && ruutu2 === ruutu3){
         alert("Onnea "+ruutu1+" voitto tuli!")
    } 
    if (ruutu1 !== "" && ruutu1 === ruutu5 && ruutu5 === ruutu9){
      alert("Onnea "+ruutu1+" voitto tuli!")
    } 
    if (ruutu1 !== "" && ruutu1 === ruutu4 && ruutu4 === ruutu7){
      alert("Onnea "+ruutu1+" voitto tuli!")
    }
    if (ruutu3 !== "" && ruutu3 === ruutu5 && ruutu5 === ruutu7){
      alert("Onnea "+ruutu3+" voitto tuli!")
    } 
    if (ruutu3 !== "" && ruutu3 === ruutu6 && ruutu6 === ruutu9){
      alert("Onnea "+ruutu3+" voitto tuli!")
    } 
    if (ruutu2 !== "" && ruutu2 === ruutu5 && ruutu5 === ruutu8){
      alert("Onnea "+ruutu2+" voitto tuli!")
    } 
    if (ruutu4 !== "" && ruutu4 === ruutu5 && ruutu5 === ruutu6){
      alert("Onnea "+ruutu4+" voitto tuli!")
    } 
    if (ruutu7 !== "" && ruutu7 === ruutu8 && ruutu8 === ruutu9){
      alert("Onnea "+ruutu7+" voitto tuli!")
    } 
  }

  useEffect(
    tarkista,
  [vuoro])

  const merkitse = (paikka) => {
    let ruutu = paikka
    switch (ruutu){
      case 1:{
        if (ruutu1 === ""){
          if (vuoro === 0){
            setRuutu1("X")
            setVuoro(1)
          } else {
            setRuutu1("O")
            setVuoro(0)
          }
        }
        break;
      }
      case 2:{
        if (ruutu2 === ""){
          if (vuoro === 0){
            setRuutu2("X")
            setVuoro(1)
          } else {
            setRuutu2("O")
            setVuoro(0)
          }
        }
        break;
      }
      case 3:{
        if (ruutu3 === ""){
          if (vuoro === 0){
            setRuutu3("X")
            setVuoro(1)
          } else {
            setRuutu3("O")
            setVuoro(0)
          }
        }
        break;
      }
      case 4:{
        if (ruutu4 === ""){
          if (vuoro === 0){
            setRuutu4("X")
            setVuoro(1)
          } else {
            setRuutu4("O")
            setVuoro(0)
          }
        }
        break;
      }
      case 5:{
        if (ruutu5 === ""){
          if (vuoro === 0){
            setRuutu5("X")
            setVuoro(1)
          } else {
            setRuutu5("O")
            setVuoro(0)
          }
        }
        break;
      }
      case 6:{
        if (ruutu6 === ""){
          if (vuoro === 0){
            setRuutu6("X")
            setVuoro(1)
          } else {
            setRuutu6("O")
            setVuoro(0)
          }
        }
        break;
      }
      case 7:{
        if (ruutu7 === ""){
          if (vuoro === 0){
            setRuutu7("X")
            setVuoro(1)
          } else {
            setRuutu7("O")
            setVuoro(0)
          }
        }
        break;
      }
      case 8:{
        if (ruutu8 === ""){
          if (vuoro === 0){
            setRuutu8("X")
            setVuoro(1)
          } else {
            setRuutu8("O")
            setVuoro(0)
          }
        }
        break;
      }
      case 9:{
        if (ruutu9 === ""){
          if (vuoro === 0){
            setRuutu9("X")
            setVuoro(1)
          } else {
            setRuutu9("O")
            setVuoro(0)
          }
        }
        break;
      }
      default: break;
    }
  }

  return (
    <div>
      <br/>
      <div class="grid-container">
        <header>Ristinolla</header>
        <div class="grid-item" onClick={()=>merkitse(1)}>{ruutu1}</div>
        <div class="grid-item" onClick={()=>merkitse(2)}>{ruutu2}</div>
        <div class="grid-item" onClick={()=>merkitse(3)}>{ruutu3}</div>
        <div class="grid-item" onClick={()=>merkitse(4)}>{ruutu4}</div>
        <div class="grid-item" onClick={()=>merkitse(5)}>{ruutu5}</div>
        <div class="grid-item" onClick={()=>merkitse(6)}>{ruutu6}</div>
        <div class="grid-item" onClick={()=>merkitse(7)}>{ruutu7}</div>
        <div class="grid-item" onClick={()=>merkitse(8)}>{ruutu8}</div>
        <div class="grid-item" onClick={()=>merkitse(9)}>{ruutu9}</div>
        <footer>Mika Viitaniemi</footer>
      </div> 
      <p><button onClick={()=>tyhjenna()}>Aloita uusi</button></p>
    </div>
  );
}

export default App;
