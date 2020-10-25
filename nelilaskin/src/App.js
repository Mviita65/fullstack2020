import React from 'react';
import {useState} from 'react'
// import logo from './logo.svg';
import './oma.css';

function App() {

  const [nakyma,setNakyma]=useState("0")
   
  const nayta = (painallus) => {
    switch(painallus){
      case "C":{
        setNakyma(String(0))
        break;
      }
      case "=":{
        try {
          eval(nakyma)
        } catch (e) {
          if (e instanceof SyntaxError){
            setNakyma("Error")
            break;
          } 
        }
        let x = eval(nakyma)
        setNakyma(String(x))
        break;
      }
      case "poista":{
        let naytto = String(nakyma)
        if (naytto !== "Error"){
          let pituus = naytto.length - 1
          let uusiNaytto = naytto.slice(0,pituus)
          setNakyma(uusiNaytto)
          break;
        }
        break;
      }
      default:{
        if (nakyma === "Error"){
          setNakyma(painallus)
          break;
        }
        if (nakyma === "0"){
          setNakyma(painallus)
          break;
        } else {
          let naytto = String(nakyma)
          let uusiNaytto = naytto.concat(painallus)
          setNakyma(uusiNaytto)
          break;
        }
      }
    }
  }


  return (
    <div>
      <div className="grid-container"> 
        <header>Nelilaskin</header>
        <div className="screen">{nakyma}</div>
        <div className="grid-item" onClick={()=>nayta(1)}>1</div>
        <div className="grid-item" onClick={()=>nayta(2)}>2</div>
        <div className="grid-item" onClick={()=>nayta(3)}>3</div>
        <div className="grid-item" onClick={()=>nayta(4)}>4</div>
        <div className="grid-item" onClick={()=>nayta(5)}>5</div>
        <div className="grid-item" onClick={()=>nayta(6)}>6</div>
        <div className="grid-item" onClick={()=>nayta(7)}>7</div>
        <div className="grid-item" onClick={()=>nayta(8)}>8</div>
        <div className="grid-item" onClick={()=>nayta(9)}>9</div>
        <div className="grid-item" onClick={()=>nayta(0)}>0</div>
        <div className="grid-item" onClick={()=>nayta("+")}>+</div>
        <div className="grid-item" onClick={()=>nayta("-")}>-</div>
        <div className="grid-item" onClick={()=>nayta("*")}>*</div>
        <div className="grid-item" onClick={()=>nayta("/")}>/</div>
        <div className="grid-item" onClick={()=>nayta("=")}>=</div>
        <div className="grid-item" onClick={()=>nayta(".")}>.</div>
        <div className="grid-item" onClick={()=>nayta("(")}>(</div>
        <div className="grid-item" onClick={()=>nayta(")")}>)</div>
        <div className="grid-item" onClick={()=>nayta("poista")}>«</div>
        <div className="grid-itemC" onClick={()=>nayta("C")}>C</div>
        <footer>© Mika Viitaniemi 2020</footer>
      </div>
    </div>
  );
}

export default App;
