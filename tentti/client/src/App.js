import React, { useEffect,useReducer } from 'react';
import { useState } from 'react'
import './oma.css';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import BuildIcon from '@material-ui/icons/Build';
import Axios from 'axios'
import Login from './components/login'
import Register from './components/register'
import {
  muutaTentti,
  lisaaTentti,
  poistaTenttiKurssilta,
} from './components/dataManipulation.js';
import initialData from './components/initialData.js'
import Kurssivalikko from './components/kurssivalinta.js'
import reducer from './components/reducer.js';
import Kysymykset from './components/kysymykset.js';
import ChartExample from './components/chart.js';
import ConfirmDialog from './components/confirmDialog.js';


function App() {

  const versio = "versio 0.52"
  const [dataAlustettu, setDataAlustettu] = useState(false)
  const [state, dispatch] = useReducer(reducer, [])
  const [tentit, setTentit] = useState(0)
  const [tietoa, setTietoa] = useState(0)
  const [teksti, setTeksti] = useState("")
  const [vastaukset, setVastaukset] = useState(0)
  const [aktiivinenTentti, setAktiivinenTentti] = useState(null)
  const [aktiivinenKurssi, setAktiivinenKurssi] = useState(null)
  const [aktiivinenKayttaja, setAktiivinenKayttaja] = useState(null)
  const [hallinta, setHallinta] = useState(0)
  const [kaaviot, setKaaviot] = useState(0)
  const [vahvista, setVahvista] = useState(0)
  const [authToken, setAuthToken] = useState("")
  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)
  const [kurssiData, setKurssiData] = useState([])
  const [kurssiDataIndex, setKurssiDataIndex] = useState(null)

  useEffect(() => {

  // const createData = async () => {
  //   try {
  //     let result = await Axios.post("http://localhost:3001/tentit/",initialData)
  //     dispatch({type: "INIT_DATA", data: initialData})
  //     setDataAlustettu(true)
  //   } catch (exception) {
  //     alert("Tietokannan alustaminen epäonnistui!")
  //   }
  // }

  const fetchKurssiData = async () => { // hakee yhden kurssin tenttien tiedot ja yhden käyttäjän antamat vastaukset kurssin tenttien kysymyksiin
    if (aktiivinenKurssi) {
    try {
      // let result = await Axios.get("http://localhost:3001/tentit/")
      let kurssiid = aktiivinenKurssi
      let kayttajaid = aktiivinenKayttaja // oppilas eli vastaukset yhdeltä oppilaalta
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
        result.data = []
        dispatch({type: "INIT_DATA", data: result.data})
        throw("Nyt pitää data kyllä alustaa!")
      }
    }
    catch(execption){
      console.log(execption)
      // createData()
    }
  }
}
    fetchKurssiData();   
  }, [aktiivinenKayttaja,aktiivinenKurssi])

  // useEffect(() => {
    
    // const updateData = async () => {
    //   try {
    //      let result = await Axios.put("http://localhost:3001/tentit", state)
    //   } catch (exception) {
    //     console.log(exception)
    //   }
    // }

    // if (dataAlustettu) {
    //   updateData();
    // }  

  // }, [state])

  let headers = {
    headers: { Authorization: `FrontKey ${authToken}`},
  }

  const userHook = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setAuthToken(user.token)
    }
  }

  useEffect(userHook, [])

 
  const tarkistaLogin = async(e, userdata) => {
    e.preventDefault();
    try {
      let kayttaja = await Axios.post("http://localhost:4000/login", userdata)
      if (kayttaja.lenght === 0){
        console.log("Invalid username of password")
        return
      }
      console.log(kayttaja)
      setLogin(true)
      setAktiivinenKayttaja(kayttaja.data.id) 
    } catch (exception) {
      console.log(exception)
    }
  }

  const luoTunnus = async(e, uusiKayttaja) => {
    e.preventDefault();
    
    try {
      let kayttaja = await Axios.post("http://localhost:4000/register", uusiKayttaja)
      if (kayttaja.lenght === 0){
        console.log("missä mättää?")
        return
      }
      console.log(kayttaja)
      setRegister(false)
      setAktiivinenKayttaja(kayttaja.data.id)  
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>{login? <section className="grid-container">
      <nav className="sovellusvalikko">
        <span className="s-nav-item" onClick={e => {
          setTentit(0);setAktiivinenTentti(null);setAktiivinenKurssi(null);
          <Kurssivalikko aktiivinenKurssi={aktiivinenKurssi} setAktiivinenKurssi={setAktiivinenKurssi} kurssiData={kurssiData} setKurssiData={setKurssiData} />
        }}>KURSSIT </span>
        {kurssiDataIndex !== null ? <span className="s-nav-item" onClick={e => {
           setAktiivinenKurssi(null);setAktiivinenTentti(null); setTentit(1); setTietoa(0); setVastaukset(0); setKaaviot(0);
        }}>TENTIT </span>:<span>TENTIT </span>}
        <span className="s-nav-item" onClick={e => { 
          setTentit(0); setTietoa(1) 
        }}>TIETOA SOVELLUKSESTA </span>
        <span className="s-nav-item" onClick={e => { 
          setHallinta(!hallinta) 
        }}><BuildIcon fontSize="small"/> </span>
        <span className="s-nav-item-right" onClick={e => {      // POISTU toiminto tässä !!!!!!!!
          setTentit(0); setKaaviot(0); setLogin(false); setAktiivinenKayttaja(null); setAktiivinenKurssi(null);
          window.localStorage.removeItem('loggedAppUser');
          window.location.reload();
        }}>POISTU </span>  
      </nav> 
        {aktiivinenKurssi === null && !tentit? 
        <section className="grid-container">
           <Kurssivalikko aktiivinenKurssi={aktiivinenKurssi} setAktiivinenKurssi={setAktiivinenKurssi} kurssiData={kurssiData} setKurssiData={setKurssiData} tentit={tentit} setTentit={setTentit} kurssiDataIndex={kurssiDataIndex} setKurssiDataIndex={setKurssiDataIndex}/>
        </section> 
        : tentit?
        <div className="grid-item"> {kurssiData[kurssiDataIndex].kurssi}
          <nav className="tenttivalikko">
            {aktiivinenTentti==null ? 
            state.map((item,index) => 
            <span className="t-nav-item" key={item.tenttiid} onClick={()=>{
                setAktiivinenTentti(index); setVastaukset(0)}}>{item.tentti}
            </span>) 
            : hallinta && aktiivinenTentti!=null ? 
            <span><input type="text" value={state[aktiivinenTentti].tentti} onChange={(event) =>{
              muutaTentti(dispatch, event, state[aktiivinenTentti], aktiivinenTentti) }}>
              </input> <button className="delButton" onClick={()=>{
                if (window.confirm("Poistetaanko tentti ("+state[aktiivinenTentti].tentti+") kurssilta?")){
                  poistaTenttiKurssilta(dispatch,state[aktiivinenTentti],aktiivinenTentti,aktiivinenKurssi)
                  setAktiivinenTentti(null)      
                }}}><DeleteTwoToneIcon /></button> 
            </span> : state[aktiivinenTentti].tentti}
            {hallinta && aktiivinenTentti==null ? <span className="add-item" onClick={() =>{
              var uusiTenttiNimi = prompt("Anna uuden tentin nimi?", "");
              if (uusiTenttiNimi !== null && uusiTenttiNimi !== ""){
                lisaaTentti(dispatch,uusiTenttiNimi,aktiivinenKurssi)}}
              }> + </span> : ""}
          </nav>
        </div>
        : tietoa ? 
        <section className="vastaus">{window.open("https://www.youtube.com/watch?v=sAqnNWUD79Q","_self")}</section> :""}
        {(aktiivinenTentti!=null && !tietoa && !kaaviot) ? 
          <Kysymykset dispatch={dispatch} data={state[aktiivinenTentti]} tenttiIndex={aktiivinenTentti}
              vastaukset={vastaukset} setVastaukset={setVastaukset} hallinta={hallinta} setHallinta={setHallinta} kaaviot={kaaviot} setKaaviot={setKaaviot}/> 
          : (kaaviot) ? 
          <section className="charts">
            <ChartExample otsikot={['kriminologia', 'scientologia', 'psykologia', 'ornitologia']} tiedot={[5,22,10,10]} tyyppi={"Pistejakauma aihealueittain"} valinta={"Doughnut"}/>
            <ChartExample otsikot={['kriminologia', 'scientologia', 'psykologia', 'ornitologia']} tiedot={[5,22,10,10]} tyyppi={"Aihealueiden pisteet"} valinta={"Bar"}/>
                <span className="button" onClick={()=>{setKaaviot(0)}}>Paluu</span>
          </section>: "" }
      </section>
      :register ? 
      <section className="grid-container">
        <nav className="sovellusvalikko">KURSSITENTIT - TERVETULOA<span className="s-nav-item-right">{versio}</span></nav>
        <Register luoTunnus={luoTunnus} register={register} setRegister={setRegister}/>
      </section>
      :<section className="grid-container">
        <nav className="sovellusvalikko">KURSSITENTIT - TERVETULOA <span className="s-nav-item-right">{versio}</span></nav>
        <Login handleSubmit={tarkistaLogin} register={register} setRegister={setRegister}/>
      </section>}
    </div>
  )
}
export default App;
