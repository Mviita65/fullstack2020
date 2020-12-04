import React, { useEffect,useReducer } from 'react';
import { useState } from 'react'
import './oma.css';
import cathead from './img/cathead.jpg';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import BuildIcon from '@material-ui/icons/Build';
import Axios from 'axios';
import uuid from 'react-uuid';
import BarExample from './components/chart.js';
import ConfirmDialog from './components/confirmDialog.js';

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
            vaihtoehto: "Kiitos hyvää, entä sinulle?",
            valittu: 0,
            korrekti: 1
          },
          {
            uuid: uuid(),
            vaihtoehto: "Siinähän se!",
            valittu: 0,
            korrekti: 0
          },
          {
            uuid: uuid(),
            vaihtoehto: "Mitäs siinä kyselet, hoida omat asias!",
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
            vaihtoehto: "Kiitos, uni maistui!",
            valittu: 0,
            korrekti: 0
          },
          {
            uuid: uuid(),
            vaihtoehto: "Pelastin maailman!",
            valittu: 0,
            korrekti: 0
          },
          {
            uuid: uuid(),
            vaihtoehto: "Kuis ittelläs?",
            valittu: 0,
            korrekti: 0
          },
          {
            uuid: uuid(),
            vaihtoehto: "Tein töitä palkkani edestä.",
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
            vaihtoehto: "Itsenäinen muista riippumaton tasavalta!",
            valittu: 0,
            korrekti: 0
          },
          {
            uuid: uuid(),
            vaihtoehto: "Kuningaskunta!",
            valittu: 0,
            korrekti: 0
          },
          {
            uuid: uuid(),
            vaihtoehto: "Yksi EU:n jäsenvaltioista!",
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
        <input type="text" value={item.vaihtoehto} onChange={(event) =>{          // voidaan muotoilla vaihtoehdon tekstiä
          props.dispatch({ type: "VAIHTOEHTO_NIMETTY", 
            data: { vaihtoehto: event.target.value, tenttiIndex: props.tenttiIndex, kyIndex: props.kysymysIndex, veIndex: veIndex } })}}> 
        </input> <button className="delButton" onClick={()=>{                 // voidaan poistaa vaihtoehto
          if (window.confirm("Poistetaanko vaihtoehto ("+props.data.vaihtoehdot[veIndex].vaihtoehto+")?")){
            props.dispatch({type: "VAIHTOEHTO_POISTETTU", data:{ tenttiIndex: props.tenttiIndex, kyIndex: props.kysymysIndex, veIndex: veIndex }})
          }
        }}><DeleteTwoToneIcon /></button> {!props.hallinta && item.valittu && item.korrekti ? <img alt="cathead" src={cathead}/> : ""}
      </div>):                                                                // muu kuin hallintatila
      props.vastaukset ? props.data.vaihtoehdot.map((item, veIndex) =>        // oikeiden vastausten näyttö valittu: valintoja ei voi muuttaa 
        <div key={item.uuid} className="vastaus">
          <input type="checkbox" checked={item.valittu} readOnly></input>            
          <input type="checkbox" checked={item.korrekti} readOnly></input>
          {item.vaihtoehto} {item.valittu && item.korrekti ? <img alt="cathead" src={cathead}/> : ""}
      </div>) :
        props.data.vaihtoehdot.map((item, veIndex) =>                         // tentti menossa (vastaukset poissa)
          <div key={item.uuid} className="vastaus">
            <input type="checkbox" checked={item.valittu} onChange={(event) => {  // vaihtoehto voidaan valita vastaukseksi tai poistaa
              props.dispatch({type: "VASTAUS_VAIHDETTU", 
                data:{checked: event.target.checked, tenttiIndex: props.tenttiIndex, kyIndex: props.kysymysIndex, veIndex: veIndex} })}}></input> 
            {item.vaihtoehto}
        </div>)}
        {props.hallinta ? <div className="add"><span className="add-ve" onClick={()=>{  // jos hallintatila, voi lisätä uuden vaihtoehdon
          props.dispatch({type: "VAIHTOEHTO_LISATTY", 
            data:{tenttiIndex: props.tenttiIndex, kyIndex: props.kysymysIndex} })}}>+</span></div> : ""}
  </section>
}

const TallennaKysymys = async(event,props,kysymysIndex) => {
  let id = props.data.kysymykset[kysymysIndex].kysymysid
  let body = {
    kysymys: event.target.value,
    kysymys_aihe_id: props.data.kysymykset[kysymysIndex].kysymys_aihe_id
  } 
  try {
    let result = await Axios.put("http://localhost:4000/kysymys/"+id,body)
    props.dispatch({ type: "KYSYMYS_NIMETTY", 
    data: {kysymys: body.kysymys, tenttiIndex: props.tenttiIndex, kyIndex: kysymysIndex} })
  } catch (exception) {
    console.log(exception)
 }
}


function Kysymykset(props) {  //näytölle tentin kysymykset ja kutsuu Vaihtoehdot näyttämään kysymysten vaihtoehdot

  return <section>
    {props.hallinta ? props.data.kysymykset.map((item, kysymysIndex) =>     // jos hallinta valittu
      <div key={item.uuid} className="kysymys">
        <input type="text" value={item.kysymys} onChange={(event) =>{       // kysymystä voidaan muotoilla
          TallennaKysymys(event,props,kysymysIndex)}}>
        </input> <button className="delButton" onClick={()=>{               // kysymys voidaan poistaa
          if (window.confirm("Poistetaanko kysymys ("+props.data.kysymykset[kysymysIndex].kysymys+") vastausvaihtoehtoineen?")){          
            props.dispatch({type: "KYSYMYS_POISTETTU", data:{ tenttiIndex: props.tenttiIndex, kyIndex: kysymysIndex } })
          }
        }}><DeleteTwoToneIcon /></button> 
        <Vaihtoehdot dispatch={props.dispatch} tenttiIndex={props.tenttiIndex} kysymysIndex={kysymysIndex} 
          data={props.data.kysymykset[kysymysIndex]} vastaukset={props.vastaukset} setVastaukset={props.setVastaukset} hallinta={props.hallinta} setHallinta={props.setHallinta}
        />
      </div>):                                                              // tentti menossa
      props.data.kysymykset.map((item, kysymysIndex) =>
        <div key={item.uuid} className="kysymys">{item.kysymys}
        <Vaihtoehdot dispatch={props.dispatch} tenttiIndex={props.tenttiIndex} kysymysIndex={kysymysIndex} 
          data={props.data.kysymykset[kysymysIndex]} vastaukset={props.vastaukset} setVastaukset={props.setVastaukset} hallinta={props.hallinta} setHallinta={props.setHallinta}
        />
    </div>)}
    {props.hallinta ? <div className="add"><span className="add-item" onClick={()=>{  // jos hallintatila, voi lisätä uuden kysymyksen
      props.dispatch({type: "KYSYMYS_LISATTY", data:{tenttiIndex: props.tenttiIndex}})}}> + </span>
    </div> : ""}
    <div>
      {props.hallinta ? "" : <div><span className="button" onClick={()=>         // jos tentti menossa, voi valita tai piilottaa oikeiden vastausten näytön
        props.setVastaukset(!props.vastaukset)}>Vastaukset</span> <span className="button" onClick={()=>{         // jos tentti menossa, voi valita tai piilottaa oikeiden vastausten näytön
          props.setKaaviot(1)}}>Kaaviot</span></div> }
    </div>
  </section>
}
//UI-softan tilahallinta tänne
function reducer(state, action) {
  let syväKopio = JSON.parse(JSON.stringify(state))
  switch (action.type) {      
    case "INIT_DATA":
      return action.data
    case "KYSYMYS_NIMETTY":
      syväKopio[action.data.tenttiIndex].kysymykset[action.data.kyIndex].kysymys = action.data.kysymys
      return syväKopio
    case "KYSYMYS_POISTETTU":
      syväKopio[action.data.tenttiIndex].kysymykset.splice(action.data.kyIndex,1)
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
    case "VAIHTOEHTO_NIMETTY":
      syväKopio[action.data.tenttiIndex].kysymykset[action.data.kyIndex].vaihtoehdot[action.data.veIndex].vaihtoehto = action.data.vaihtoehto
      return syväKopio
    case "VAIHTOEHTO_POISTETTU":
      syväKopio[action.data.tenttiIndex].kysymykset[action.data.kyIndex].vaihtoehdot.splice(action.data.veIndex,1)
      return syväKopio
    case "VAIHTOEHTO_LISATTY":
      let uusiVaihtoehto = [{
        uuid: uuid(),
        vaihtoehto: "",
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
  const [vastaukset, setVastaukset] = useState(0)
  const [aktiivinen, setAktiivinen] = useState(null)
  const [hallinta, setHallinta] = useState(0)
  const [kaaviot, setKaaviot] = useState(0)
  const [vahvista, setVahvista] = useState(0)


  useEffect(() => {

  const createData = async () => {
    try {
      let result = await Axios.post("http://localhost:3001/tentit/",initialData)
      // let kurssiid = 1
      // let kayttajaid = 8  // oppilas
      // let result = await Axios.post()
      dispatch({type: "INIT_DATA", data: initialData})
      setDataAlustettu(true)
    } catch (exception) {
      alert("Tietokannan alustaminen epäonnistui!")
    }
  }

  const fetchData = async () => { // hakee yhden kurssin tenttien tiedot ja yhden käyttäjän antamat vastaukset kurssin tenttien kysymyksiin
    try {
      // let result = await Axios.get("http://localhost:3001/tentit/")
      let kurssiid = 1
      let kayttajaid = 8 // oppilas eli vastaukset yhdeltä oppilaalta
      let result = await Axios.get("http://localhost:4000/kurssi/"+kurssiid)
      if (result.data.length>0){
        for (var i = 0; i < result.data.length; i++){       // käydään läpi noudetun kurssin tentit
          result.data[i].kysymykset = []
          let kysymykset = await Axios.get("http://localhost:4000/kysymys/tentti/"+result.data[i].tenttiid)
          result.data[i].kysymykset = kysymykset.data
          if (result.data[i].kysymykset.length>0){
            for (var j = 0; j < result.data[i].kysymykset.length; j++){ // käydään läpi noudetut tentin kysymykset
              result.data[i].kysymykset[j].vaihtoehdot = []
              let vaihtoehdot = await Axios.get("http://localhost:4000/vaihtoehto/kysymys/"+result.data[i].kysymykset[j].kysymysid)
              result.data[i].kysymykset[j].vaihtoehdot = vaihtoehdot.data  
              let vastaukset = await Axios.get("http://localhost:4000/kayttaja/"+kayttajaid+"/kysymys/"+result.data[i].kysymykset[j].kysymysid)
              if (result.data[i].kysymykset[j].vaihtoehdot.length>0){
                for (var k = 0; k < result.data[i].kysymykset[j].vaihtoehdot.length; k++){  // käydään läpi noudetut kysymyksen vaihtoehdot
                  result.data[i].kysymykset[j].vaihtoehdot[k].valittu = false               // käyttäjän vastaukset alustetaan falsella
                  if (vastaukset.data.length>0){                                            
                    for (var l = 0; l < vastaukset.data.length; l++){                       // käydään läpi onko käyttäjä valinnut vaihtoehdon oikeaksi
                      if (result.data[i].kysymykset[j].vaihtoehdot[k].vaihtoehtoid === vastaukset.data[l].vastaus_vaihtoehto_id) {
                        result.data[i].kysymykset[j].vaihtoehdot[k].valittu = true
                      }
                    }
                  }  
                }
              }        
            }
          }
        }
        console.log(result.data)
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
        <span className="s-nav-item" onClick={e => {
           setAktiivinen(null); setTentit(1); setTietoa(0); setVastaukset(0); setKaaviot(0);
        }}>TENTIT </span>
        <span className="s-nav-item" onClick={e => { 
          setTentit(0); setTietoa(1) 
        }}>TIETOA SOVELLUKSESTA </span>
        <span className="s-nav-item" onClick={e => { 
          setHallinta(!hallinta) 
        }}><BuildIcon fontSize="small"/> </span>
        <span className="s-nav-item-right" onClick={e => {
          setPoistu(1); setTentit(0); setKaaviot(0);
        }}>POISTU </span>
      </nav>
      {poistu ? <section className="vastaus">Sovelluksen toiminta on päättynyt!</section> :
        tentit ?
          <div className="grid-item">
            <nav className="tenttivalikko">
              {aktiivinen==null ? state.map((item,index) => <span className="t-nav-item" key={item.uuid} onClick={()=>{
                vaihdaTentti(index); setVastaukset(0)}}>{item.tentti}</span>) : 
                  hallinta && aktiivinen!=null ? <span><input type="text" value={state[aktiivinen].tentti} onChange={(event) =>{
                    dispatch({type:"TENTTI_NIMETTY", data:{newTenttiNimi: event.target.value, tenttiIndex: aktiivinen}}) }}></input> <button className="delButton" onClick={()=>{
                     setAktiivinen(poistaTentti(aktiivinen))
                    }}><DeleteTwoToneIcon /></button> 
                  </span> : 
                    state[aktiivinen].tentti}
              {hallinta && aktiivinen==null ? <span className="add-item" onClick={() =>{
                lisaaTentti()}}> + </span> : ""}
            </nav>
          </div> : tietoa ? 
          <section className="vastaus">{window.open("https://www.youtube.com/watch?v=sAqnNWUD79Q","_self")}</section> :""}
          {(aktiivinen!=null && !poistu && !tietoa && !kaaviot) ? 
            <Kysymykset dispatch={dispatch} data={state[aktiivinen]} tenttiIndex={aktiivinen} 
              vastaukset={vastaukset} setVastaukset={setVastaukset} hallinta={hallinta} setHallinta={setHallinta}
              kaaviot={kaaviot} setKaaviot={setKaaviot}
            /> : (kaaviot) ? 
              <section className="charts">
                <BarExample otsikot={['kriminologia', 'scientologia', 'psykologia', 'ornitologia']} tiedot={[5,22,10,10]} tyyppi={"Pistejakauma aihealueittain"} valinta={"Doughnut"}/>
                <BarExample otsikot={['kriminologia', 'scientologia', 'psykologia', 'ornitologia']} tiedot={[5,22,10,10]} tyyppi={"Aihealueiden pisteet"} valinta={"Bar"}/>
                <span className="button" onClick={()=>{setKaaviot(0)}}>Paluu</span>
              </section>: ""}
    </div>
  )
}
export default App;
