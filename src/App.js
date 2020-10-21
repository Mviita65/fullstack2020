import React from 'react';
import {useState} from 'react'
// import logo from './logo.svg';
// import './App.css';

function App() {

  const [nakyma,setNakyma]=useState(0)
   
  const nayta = (painallus) => {
    switch(painallus){
      case "C":{
        setNakyma(String(0))
        break;
      }
      case "=":{
        let x = eval(nakyma)
        setNakyma(String(x))
        break;
      }
      default:{
        if (nakyma == 0){
          setNakyma(painallus)
        } else {
          let naytto = String(nakyma)
          let uusiNaytto = naytto.concat(painallus)
          setNakyma(uusiNaytto)
        }
        break;
      }
    }
  }


  return (
    <div>
      <p>{nakyma}</p>
      <p>
        <button onClick={()=>nayta(0)}>0</button>
        <button onClick={()=>nayta(1)}>1</button>
        <button onClick={()=>nayta(2)}>2</button>
        <button onClick={()=>nayta(3)}>3</button>
        <button onClick={()=>nayta(4)}>4</button>
        <button onClick={()=>nayta("(")}>(</button>
        <br/>
        <button onClick={()=>nayta(5)}>5</button>
        <button onClick={()=>nayta(6)}>6</button>
        <button onClick={()=>nayta(7)}>7</button>
        <button onClick={()=>nayta(8)}>8</button>
        <button onClick={()=>nayta(9)}>9</button>
        <button onClick={()=>nayta(")")}>)</button>
        <br/>
        <button onClick={()=>nayta("+")}>+</button>
        <button onClick={()=>nayta("-")}>-</button>
        <button onClick={()=>nayta("*")}>*</button>
        <button onClick={()=>nayta("/")}>/</button>
        <button onClick={()=>nayta("=")}>=</button>
        <button onClick={()=>nayta("C")}>C</button>
      </p>
    </div>
  );
}

export default App;
