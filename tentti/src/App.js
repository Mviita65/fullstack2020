import React, { useEffect,useReducer } from 'react';
import { useState } from 'react'
import './oma.css';
import cathead from './img/cathead.jpg';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import BuildIcon from '@material-ui/icons/Build';
import Axios from 'axios';
import uuid from 'react-uuid';

const initialData = 
  [{
    uuid: uuid(),
    tentti: "TENTTI A",
    kysymykset: [
      {
        uuid: uuid(),
        kysymys: "Mitä kuuluu?",
        vaihtoehdot: [
          {
            uuid: uuid(),
            teksti: "Kiitos hyvää, entä sinulle?",
            valittu: 0,
            korrekti: 1
          },
          {
            uuid: uuid(),
            teksti: "Siinähän se!",
            valittu: 0,
            korrekti: 0
          },
          {
            uuid: uuid(),
            teksti: "Mitäs siinä kyselet, hoida omat asias!",
            valittu: 0,
            korrekti: 0
          }
        ]
      },
      {
        uuid: uuid(),
        kysymys: "Miten työpäivä meni?",
        vaihtoehdot: [
          {
            uuid: uuid(),
            teksti: "Kiitos, uni maistui!",
            valittu: 0,
            korrekti: 0
          },
          {
            uuid: uuid(),
            teksti: "Pelastin maailman!",
            valittu: 0,
            korrekti: 0
          },
          {
            uuid: uuid(),
            teksti: "Kuis ittelläs?",
            valittu: 0,
            korrekti: 0
          },
          {
            uuid: uuid(),
            teksti: "Tein töitä palkkani edestä.",
            valittu: 0,
            korrekti: 1
          }
        ]
      },
      {
        uuid: uuid(),
        kysymys: "Suomi on?",
        vaihtoehdot: [
          {
            uuid: uuid(),
            teksti: "Itsenäinen muista riippumaton tasavalta!",
            valittu: 0,
            korrekti: 0
          },
          {
            uuid: uuid(),
            teksti: "Kuningaskunta!",
            valittu: 0,
            korrekti: 0
          },
          {
            uuid: uuid(),
            teksti: "Yksi EU:n jäsenvaltioista!",
            valittu: 0,
            korrekti: 1
          }
        ]
      }
    ]
  }]


function Vaihtoehdot(props) { // näytölle kysymysten vaihtoehdot ja reagointi jos merkitään vastaukseksi

return <section>
    {props.hallinta ? props.data.vaihtoehdot.map((item, veIndex) =>           // jos hallinta valittu
      <div key={item.uuid} className="vastaus">
        <input type="checkbox" checked={item.korrekti} onChange={(event) => { // voidaan muuttaa mikä on oikea vaihtoehto
          props.dispatch({ type: "OIKEA_VAIHDETTU", 
            data: { checked: event.target.checked, tenttiIndex: props.tenttiIndex, kyIndex: props.kysymysIndex, veIndex: veIndex } })}}></input>
        <input type="text" value={item.teksti} onChange={(event) =>{          // voidaan muotoilla vaihtoehdon tekstiä
          props.dispatch({ type: "VAIHTOEHTO_NIMETTY", 
            data: { teksti: event.target.value, tenttiIndex: props.tenttiIndex, kyIndex: props.kysymysIndex, veIndex: veIndex } })}}> 
        </input> <button className="delButton" onClick={()=>{               // voidaan poistaa vaihtoehto
            props.dispatch({type: "VAIHTOEHTO_POISTETTU", data:{ tenttiIndex: props.tenttiIndex, kyIndex: props.kysymysIndex, veIndex: veIndex }})
        }}><DeleteTwoToneIcon /></button> {!props.hallinta && item.valittu && item.korrekti ? <img alt="cathead" src={cathead}/> : ""}
      </div>):                                                                // muu kuin hallintatila
      props.naytaVastaukset ? props.data.vaihtoehdot.map((item, veIndex) =>   // oikeiden vastausten näyttö valittu: valintoja ei voi muuttaa 
        <div key={item.uuid} className="vastaus">
          <input type="checkbox" checked={item.valittu} readOnly></input>            
          <input type="checkbox" checked={item.korrekti} readOnly></input>
          {item.teksti} {item.valittu && item.korrekti ? <img alt="cathead" src={cathead}/> : ""}
      </div>) :
        props.data.vaihtoehdot.map((item, veIndex) =>                         // tentti menossa (vastaukset poissa)
          <div key={item.uuid} className="vastaus">
            <input type="checkbox" checked={item.valittu} onChange={(event) => {  // vaihtoehto voidaan valita vastaukseksi tai poistaa
              props.dispatch({type: "VASTAUS_VAIHDETTU", 
                data:{checked: event.target.checked, tenttiIndex: props.tenttiIndex, kyIndex: props.kysymysIndex, veIndex: veIndex} })}}></input> 
            {item.teksti}
        </div>)}
        {props.hallinta ? <div className="add"><span className="add-ve" onClick={()=>{  // jos hallintatila, voi lisätä uuden vaihtoehdon
          props.dispatch({type: "VAIHTOEHTO_LISATTY", 
            data:{tenttiIndex: props.tenttiIndex, kyIndex: props.kysymysIndex} })}}>+</span></div> : ""}
  </section>
}

function Kysymykset(props) {  //näytölle tentin kysymykset ja kutsuu Vaihtoehdot näyttäämään kysymysten vaihtoehdot

  return <section>
    {props.hallinta ? props.data.kysymykset.map((item, kysymysIndex) =>     // jos hallinta valittu
      <div key={item.uuid} className="kysymys">
        <input type="text" value={item.kysymys} onChange={(event) =>{       // kysymystä voidaan muotoilla
          props.dispatch({ type: "KYSYMYS_NIMETTY", 
            data: {kysymys: event.target.value, tenttiIndex: props.tenttiIndex, kyIndex: kysymysIndex} })}}>
        </input> <button className="delButton" onClick={()=>{               // kysymys voidaan poistaa
          props.dispatch({type: "KYSYMYS_POISTETTU", data:{ tenttiIndex: props.tenttiIndex, kyIndex: kysymysIndex } })
        }}><DeleteTwoToneIcon /></button> 
        <Vaihtoehdot dispatch={props.dispatch} tenttiIndex={props.tenttiIndex} kysymysIndex={kysymysIndex} 
          data={props.data.kysymykset[kysymysIndex]} naytaVastaukset={props.naytaVastaukset} setNaytaVastaukset={props.setNaytaVastaukset} hallinta={props.hallinta} setHallinta={props.setHallinta}
        />
      </div>):                                                              // tentti menossa
      props.data.kysymykset.map((item, kysymysIndex) =>
        <div key={item.uuid} className="kysymys">{item.kysymys}
        <Vaihtoehdot dispatch={props.dispatch} tenttiIndex={props.tenttiIndex} kysymysIndex={kysymysIndex} 
          data={props.data.kysymykset[kysymysIndex]} naytaVastaukset={props.naytaVastaukset} setNaytaVastaukset={props.setNaytaVastaukset} hallinta={props.hallinta} setHallinta={props.setHallinta}
        />
    </div>)}
    {props.hallinta ? <div className="add"><span className="add-item" onClick={()=>{  // jos hallintatila, voi lisätä uuden kysymyksen
      props.dispatch({type: "KYSYMYS_LISATTY", data:{tenttiIndex: props.tenttiIndex}})}}> + </span>
    </div> : ""}
    <div>
      {props.hallinta ? "" : <span className="button" onClick={()=>         // jos tentti menossa, voi valita tai piilottaa oikeiden vastausten näytön
        props.setNaytaVastaukset(!props.naytaVastaukset)}>Vastaukset</span>}
    </div>
  </section>
}

function reducer(state, action) {
  let syväKopio = JSON.parse(JSON.stringify(state))
  switch (action.type) {      
    case "INIT_DATA":
      return action.data
    case "TENTTI_NIMETTY":
      syväKopio[action.data.tenttiIndex].tentti = action.data.newTenttiNimi.toUpperCase();
      return syväKopio
    case "TENTTI_POISTETTU":
      syväKopio.splice(action.data.tenttiIndex,1)
      return syväKopio
    case "TENTTI_LISATTY":
      let uudetTentit = syväKopio.concat(action.data.lisays)
      syväKopio = uudetTentit
      return syväKopio  
    case "KYSYMYS_NIMETTY":
      syväKopio[action.data.tenttiIndex].kysymykset[action.data.kyIndex].kysymys = action.data.kysymys
      return syväKopio
    case "KYSYMYS_POISTETTU":
      if (window.confirm("Poistetaanko kysymys ("+syväKopio[action.data.tenttiIndex].kysymykset[action.data.kyIndex].kysymys+") vastausvaihtoehtoineen?")){
        syväKopio[action.data.tenttiIndex].kysymykset.splice(action.data.kyIndex,1)
      }
      return syväKopio
    case "KYSYMYS_LISATTY":
      let uusiKysymys = [{
        uuid: uuid(),
        kysymys: "",
        vaihtoehdot: []
      }]
      let uudetKysymykset = syväKopio[action.data.tenttiIndex].kysymykset.concat(uusiKysymys)
      syväKopio[action.data.tenttiIndex].kysymykset = uudetKysymykset
      return syväKopio
    case "VAIHTOEHTO_NIMETTY":
      syväKopio[action.data.tenttiIndex].kysymykset[action.data.kyIndex].vaihtoehdot[action.data.veIndex].teksti = action.data.teksti
      return syväKopio
    case "VAIHTOEHTO_POISTETTU":
      if (window.confirm("Poistetaanko vaihtoehto ("+syväKopio[action.data.tenttiIndex].kysymykset[action.data.kyIndex].vaihtoehdot[action.data.veIndex].teksti+")?")){
        syväKopio[action.data.tenttiIndex].kysymykset[action.data.kyIndex].vaihtoehdot.splice(action.data.veIndex,1)
      }
      return syväKopio
    case "VAIHTOEHTO_LISATTY":
      let uusiVaihtoehto = [{
        uuid: uuid(),
        teksti: "",
        valittu: 0,
        korrekti: 0
      }]
      let uudetVaihtoehdot = syväKopio[action.data.tenttiIndex].kysymykset[action.data.kyIndex].vaihtoehdot.concat(uusiVaihtoehto)
      syväKopio[action.data.tenttiIndex].kysymykset[action.data.kyIndex].vaihtoehdot = uudetVaihtoehdot
      return syväKopio
    case "VASTAUS_VAIHDETTU":
      syväKopio[action.data.tenttiIndex].kysymykset[action.data.kyIndex].vaihtoehdot[action.data.veIndex].valittu = action.data.checked
      return syväKopio
    case "OIKEA_VAIHDETTU":
      syväKopio[action.data.tenttiIndex].kysymykset[action.data.kyIndex].vaihtoehdot[action.data.veIndex].korrekti = action.data.checked
      return syväKopio
    default:
      throw new Error();
  }
}

function App() {

  const [dataAlustettu, setDataAlustettu] = useState(false)
  const [state, dispatch] = useReducer(reducer, [])
  const [tentit, setTentit] = useState(1)
  const [tietoa, setTietoa] = useState(0)
  const [poistu, setPoistu] = useState(0)
  const [naytaVastaukset, setNaytaVastaukset] = useState(0)
  const [aktiivinen, setAktiivinen] = useState(null)
  const [hallinta, setHallinta] = useState(0)
  

  useEffect(() => {

  const createData = async () => {
    try {
      let result = await Axios.post("http://localhost:3001/tentit",initialData)
      dispatch({type: "INIT_DATA", data: initialData})
      setDataAlustettu(true)
    } catch (exception) {
      alert("Tietokannan alustaminen epäonnistui!")
    }
  }

  const fetchData = async () => {
    try {
      let result = await Axios.get("http://localhost:3001/tentit")
      if (result.data.length>0){
        dispatch({type: "INIT_DATA", data: result.data})
        setDataAlustettu(true)
      } else {
        throw("Nyt pitää data kyllä alustaa!")
      }
    }
    catch(execption){
      console.log(execption)
      createData()
    }
  }
    fetchData();
  }, [])

  useEffect(() => {

    const updateData = async () => {

      try {
        let result = await Axios.put("http://localhost:3001/tentit", state)
      } catch (exception) {
        console.log(exception)
      }
    }

    if (dataAlustettu) {
      updateData();
    }  

  }, [state])

  const vaihdaTentti = (index) => {
    setAktiivinen(index)
  }

  const lisaaTentti = () => {
    var uusiTenttiNimi = prompt("Anna uuden tentin nimi?", "");
    if (uusiTenttiNimi !== null && uusiTenttiNimi !== ""){
     let uusiTentti = [{
        uuid: uuid(),
        tentti: uusiTenttiNimi.toUpperCase(),
        kysymykset: []
     }]
     dispatch({type: "TENTTI_LISATTY", data:{lisays: uusiTentti}})
    }
  }

  const poistaTentti = (index) => {
    let paluu = null
    if (window.confirm("Poistetaanko tentti ("+state[index].tentti+") kysymyksineen?")){
      dispatch({type: "TENTTI_POISTETTU", data:{ tenttiIndex: index} })
    } else {
      paluu = index   // tenttiä ei poistettu, palautetaan tentin indeksi
    }
    return paluu      // tentti poistettu, palautetaan null (=siirrytään tenttivalikkoon)
  }

  return (
    <div className="grid-container">
      <nav className="sovellusvalikko">
        <span className="s-nav-item" onClick={e => { setAktiivinen(null); setTentit(1); setTietoa(0); setNaytaVastaukset(0) }}>TENTIT </span>
        <span className="s-nav-item" onClick={e => { setTentit(0); setTietoa(1) }}>TIETOA SOVELLUKSESTA </span>
        <span className="s-nav-item" onClick={e => { setHallinta(!hallinta) }}><BuildIcon fontSize="small"/> </span>
        <span className="s-nav-item-right" onClick={e => { setPoistu(1); setTentit(0)}}>POISTU </span>
      </nav>
      {poistu ? <section className="vastaus">Sovelluksen toiminta on päättynyt!</section> :
        tentit ?
          <div className="grid-item">
            <nav className="tenttivalikko">
              {aktiivinen==null ? state.map((item,index) => <span className="t-nav-item" key={item.uuid} onClick={()=>{
                vaihdaTentti(index); setNaytaVastaukset(0)}}>{item.tentti}</span>) : 
                  hallinta && aktiivinen!=null ? <span><input type="text" value={state[aktiivinen].tentti} onChange={(event) =>{
                    dispatch({type:"TENTTI_NIMETTY", data:{newTenttiNimi: event.target.value, tenttiIndex: aktiivinen}}) }}></input> <button className="delButton" onClick={()=>{
                    setAktiivinen(poistaTentti(aktiivinen))}}><DeleteTwoToneIcon /></button>  
                  </span> : 
                    state[aktiivinen].tentti}
              {hallinta && aktiivinen==null ? <span className="add-item" onClick={() =>{
                lisaaTentti()}}> + </span> : ""}
            </nav>
          </div> : tietoa ? <section className="vastaus">{window.open("https://www.youtube.com/watch?v=sAqnNWUD79Q","_self")}</section> :""}
              {(aktiivinen!=null && !poistu && !tietoa) ? 
              <Kysymykset dispatch={dispatch} data={state[aktiivinen]} tenttiIndex={aktiivinen} naytaVastaukset={naytaVastaukset} setNaytaVastaukset={setNaytaVastaukset} hallinta={hallinta} setHallinta={setHallinta} 
              /> : ""}
    </div>
  )
}
export default App;
