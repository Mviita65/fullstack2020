import React, { useEffect } from 'react';
import { useState } from 'react'
import './oma.css';
import cathead from './img/cathead.jpg';


function Vaihtoehdot(props) { // näytölle kysymysten vaihtoehdot ja reagointi jos merkitään vastaukseksi

  const merkittyVastaukseksi = (event, props, veIndex) => {
     props.vastausVaihtui(event, props, veIndex)
  }

  const vaihdettuOikea = (event,props,veIndex) => {
    props.oikeaVaihtui(event, props, veIndex)
  }

  const muutettuVaihtoehto = (event,props,veIndex) => {
    props.muutaVaihtoehto(event,props,veIndex)
  }

return <section>
    {props.hallinta ? props.data.vaihtoehdot.map((item, veIndex) =>
      <div key={veIndex} className="vastaus">
        <input type="checkbox" checked={item.valittu}></input>
        <input type="checkbox" checked={item.korrekti} onChange={(event) => {
          vaihdettuOikea(event, props, veIndex) }}></input>
        <input type="text" value={item.teksti} onChange={(event) =>{
          muutettuVaihtoehto(event, props, veIndex) }}> 
        </input> <button className="delButton" onClick={()=>{

        }}>poista</button> {item.valittu && item.korrekti ? <img alt="cathead" src={cathead}/> : ""}
    </div>):
      props.naytaVastaukset ? props.data.vaihtoehdot.map((item, veIndex) =>
        <div key={veIndex} className="vastaus">
          <input type="checkbox" checked={item.valittu}></input>
          <input type="checkbox" checked={item.korrekti}></input>
          {item.teksti} 
          {item.valittu && item.korrekti ? 
            <img alt="cathead" src={cathead}/> : ""}
      </div>) :
        props.data.vaihtoehdot.map((item, veIndex) =>
          <div key={veIndex} className="vastaus">
            <input type="checkbox" checked={item.valittu} onChange={(event) => {
              merkittyVastaukseksi(event, props, veIndex) }}></input> 
            {item.teksti}
        </div>)}
  </section>
}

function Tentti(props) {  //näytölle tentin kysymykset ja kutsuu Vaihtoehdot näyttäämään kysymysten vaihtoehdot

 return <section>
   {props.data.kysymykset.map((item, kysymysIndex) =>
    <div key={kysymysIndex} className="kysymys">{item.kysymys} 
      {props.hallinta ? <span>
        <button className="changeButton" onClick={()=>{props.muutaKysymys(props.tenttiIndex, kysymysIndex)}}>muuta kysymys</button>
        <button className="delButton" onClick={()=>{props.poistaKysymys(props.tenttiIndex, kysymysIndex)}}>poista</button></span> :""}
        <Vaihtoehdot vastausVaihtui={props.vastausVaihtui} tenttiIndex={props.tenttiIndex} kysymysIndex={kysymysIndex} 
          kysymysIndex={kysymysIndex} data={props.data.kysymykset[kysymysIndex]} naytaVastaukset={props.naytaVastaukset} setNaytaVastaukset={props.setNaytaVastaukset} hallinta={props.hallinta} setHallinta={props.setHallinta} muutaVaihtoehto={props.muutaVaihtoehto} oikeaVaihtui={props.oikeaVaihtui} poistaVaihtoehto={props.poistaVaihtoehto} lisaaVaihtoehto={props.lisaaVaihtoehto}/>
    </div>)}
    <div>{props.hallinta ? <span className="t-nav-item" onClick={()=>{
      props.lisaaKysymys(props.tenttiIndex)}}> + </span> : ""}
    </div>
    <div>
      <span className="button" onClick={()=>props.setNaytaVastaukset(!props.naytaVastaukset)}>Vastaukset</span>
    </div>
  </section>
}

function App() {

  const [data, setData] = useState([])
  const [dataAlustettu, setDataAlustettu] = useState(false)
  const [tentit, setTentit] = useState(0)
  const [tietoa, setTietoa] = useState(0)
  const [poistu, setPoistu] = useState(0)
  const [naytaVastaukset, setNaytaVastaukset] = useState(0)
  const [aktiivinen, setAktiivinen] = useState(null)
  const [hallinta, setHallinta] = useState(0)

  const initialData = [
    {
      tentti: "TENTTI A",
      kysymykset: [
        {
          kysymys: "Mitä kuuluu?",
          vaihtoehdot: [
            { teksti: "Kiitos hyvää, entä sinulle?", valittu: 0, korrekti: 1 },
            { teksti: "Siinähän se!", valittu: 0, korrekti: 0 },
            { teksti: "Mitäs siinä kyselet, hoida omat asias!", valittu: 0, korrekti: 0 }]
        },
        {
          kysymys: "Miten nukuit?",
          vaihtoehdot: [
            { teksti: "Kiitos, uni maistui!", valittu: 0, korrekti: 1 },
            { teksti: "Kiitos, hyvin!", valittu: 0, korrekti: 1 },
            { teksti: "Kyljelläni!", valittu: 0, korrekti: 1 },
            { teksti: "Mikään ylläolevista vaihtoehdoista ei toteutunut.", valittu: 0, korrekti: 1 }]
        },
        {
          kysymys: "Suomi on?",
          vaihtoehdot: [
            { teksti: "Itsenäinen muista riippumaton tasavalta!", valittu: 0, korrekti: 0 },
            { teksti: "Kuningaskunta!", valittu: 0, korrekti: 0 },
            { teksti: "Yksi EU:n jäsenvaltioista!", valittu: 0, korrekti: 1 }]
        }]
    },
    {
      tentti: "TENTTI B",
      kysymykset: [
        {
          kysymys: "Mikä maksaa?",
          vaihtoehdot: [
            { teksti: "Buginen koodi?", valittu: 0, korrekti: 1 },
            { teksti: "Elämä!", valittu: 0, korrekti: 1 },
            { teksti: "Vilkas mielikuvitus", valittu: 0, korrekti: 0 }]
        },
        {
          kysymys: "Miten työpäivä meni?",
          vaihtoehdot: [
            { teksti: "Kiitos, uni maistui!", valittu: 0, korrekti: 0 },
            { teksti: "Kiitos, hyvin!", valittu: 0, korrekti: 1 },
            { teksti: "Pelastin maailman!", valittu: 0, korrekti: 0 },
            { teksti: "Mikään ylläolevista vaihtoehdoista ei toteutunut.", valittu: 0, korrekti: 0 }]
        }]
    },
    {
      tentti: "TENTTI C",
      kysymykset: [
        {
          kysymys: "Kuis hurisee?",
          vaihtoehdot: [
            { teksti: "Kiitos hyvin, entä sinulla?", valittu: 0, korrekti: 1 },
            { teksti: "Siinähän se!", valittu: 0, korrekti: 0 },
            { teksti: "Mitäs siinä kyselet, hoida omat asias!", valittu: 0, korrekti: 0 }]
        },
        {
          kysymys: "Miten yö meni?",
          vaihtoehdot: [
            { teksti: "Kiitos, uni maistui!", valittu: 0, korrekti: 1 },
            { teksti: "Kiitos, hyvin!", valittu: 0, korrekti: 1 },
            { teksti: "Kyljelläni!", valittu: 0, korrekti: 1 },
            { teksti: "Mikään ylläolevista vaihtoehdoista ei täsmää.", valittu: 0, korrekti: 1 }]
        },
        {
          kysymys: "Teorian ja käytännön ero?",
          vaihtoehdot: [
            { teksti: "Teoria on sitä kun kaikki on tiedossa, mutta mitään ei saada toimimaan.", valittu: 0, korrekti: 1 },
            { teksti: "Käytäntö on sitä kun kaikki pelittää, mutta kukaan ei osaa kertoa miksi.", valittu: 0, korrekti: 1 }]
        },
        {
          kysymys: "Ruotsi on?",
          vaihtoehdot: [
            { teksti: "Tasavalta!", valittu: 0, korrekti: 0 },
            { teksti: "Kuningaskunta!", valittu: 0, korrekti: 1 },
            { teksti: "Norjan naapurimaa!", valittu: 0, korrekti: 1 }]
        }]
    }]

  useEffect(() => {

    let jemma = window.localStorage;
    let tempData = JSON.parse(jemma.getItem("data"))
    if (tempData == null) {
      jemma.setItem("data", JSON.stringify(initialData))
      tempData = initialData
    }
    setData(tempData);
    setDataAlustettu(true)
  }, [])

  useEffect(() => {
    if (dataAlustettu) {
      window.localStorage.setItem("data", JSON.stringify(data))
    }
  }, [data])

  const vaihdaTentti = (index) => {
    setAktiivinen(index)
  }

  const lisaaTentti = () => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    var uusiTenttiNimi = prompt("Anna uuden tentin nimi?", "");
    if (uusiTenttiNimi !== null && uusiTenttiNimi !== ""){
     let uusiTentti = [{
        tentti: uusiTenttiNimi.toUpperCase(),
        kysymykset: []
     }]
     var uudetTentit = syväKopio.concat(uusiTentti)
     setData(uudetTentit)
    }
  }

  const lisaaKysymys = (teIndex) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    var uusiKysymysNimi = prompt("Anna uusi kysymys?", "");
    if (uusiKysymysNimi !== null && uusiKysymysNimi !== ""){
     let uusiKysymys = [{
        kysymys: uusiKysymysNimi,
        vaihtoehdot: []
     }]
     var uudetKysymykset = syväKopio[teIndex].kysymykset.concat(uusiKysymys)
     syväKopio[teIndex].kysymykset = uudetKysymykset 
     setData(syväKopio)
    }
  }

  const lisaaVaihtoehto = (teIndex, kyIndex) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    var uusiVeNimi = prompt("Anna uusi kysymys?", "");
    if (uusiVeNimi !== null && uusiVeNimi !== ""){
     let uusiVaihtoehto = [{
        teksti: uusiVeNimi,
        valittu: [0],
        korrekti: [0]
     }]
     var uudetVaihtoehdot = syväKopio[teIndex].kysymykset[kyIndex].vaihtoehdot.concat(uusiVaihtoehto)
     syväKopio[teIndex].kysymykset[kyIndex].vaihtoehdot = uudetVaihtoehdot 
     setData(syväKopio)
    }
  }

  const muutaTentti = (index) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    var uusiTenttiNimi = prompt("Anna tentille uusi nimi?", "");
    if (uusiTenttiNimi !== null && uusiTenttiNimi !== ""){
      syväKopio[index].tentti = uusiTenttiNimi.toUpperCase()
    }
    setData(syväKopio) 
  }

  const muutaKysymys = (teIndex,kyIndex) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    var uusiKysymysNimi = prompt("Muotoile uusi kysymys?", "");
    if (uusiKysymysNimi !== null && uusiKysymysNimi !== ""){
      syväKopio[teIndex].kysymykset[kyIndex].kysymys = uusiKysymysNimi
    }
    setData(syväKopio) 
  }

  const poistaTentti = (index) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio.splice(index,1)
    setData(syväKopio)
  }

  const poistaKysymys = (teIndex,kyIndex) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[teIndex].kysymykset.splice(kyIndex,1)
    setData(syväKopio)
  }

  const poistaVaihtoehto = (teIndex,kyIndex,veIndex) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[teIndex].kysymykset[kyIndex].vaihtoehdot[veIndex].splice(veIndex,1)
    setData(syväKopio)
  }

  const vastausVaihtui = (event,props,veIndex) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[props.tenttiIndex].kysymykset[props.kysymysIndex].vaihtoehdot[veIndex].valittu = event.target.checked
    setData(syväKopio)
  }
  
  const oikeaVaihtui = (event,props,veIndex) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[props.tenttiIndex].kysymykset[props.kysymysIndex].vaihtoehdot[veIndex].korrekti = event.target.checked
    setData(syväKopio) 
  }

  const muutaVaihtoehto = (event,props,veIndex) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[props.tenttiIndex].kysymykset[props.kysymysIndex].vaihtoehdot[veIndex].teksti = event.target.value
    setData(syväKopio) 
  }

  return (
    <div className="grid-container">
      <nav className="sovellusvalikko">
        <span className="s-nav-item" onClick={e => { setAktiivinen(null); setTentit(1); setTietoa(0); setNaytaVastaukset(0) }}>TENTIT </span>
        <span className="s-nav-item" onClick={e => { setTentit(0); setTietoa(1) }}>TIETOA SOVELLUKSESTA </span>
        <span className="s-nav-item" onClick={e => { setHallinta(!hallinta) }}> </span>
        <span className="s-nav-item-right" onClick={e => { setPoistu(1); setTentit(0)}}>POISTU </span>
      </nav>
      {poistu ? <section className="vastaus">Sovelluksen toiminta on päättynyt!</section> :
        tentit ?
          <div className="grid-item">
            <nav className="tenttivalikko">
              {aktiivinen==null ? data.map((item,index) => <span className="t-nav-item" key={index} onClick={()=>{
                vaihdaTentti(index); setNaytaVastaukset(0)}}>{item.tentti}</span>) : 
                data[aktiivinen].tentti} {hallinta && aktiivinen!=null? <span><button className="changeButton" onClick={()=>{muutaTentti(aktiivinen)}}>muuta nimi</button> <button className="delButton" onClick={()=>{poistaTentti(aktiivinen); setAktiivinen(null)}}>poista</button></span> : ""}
              {hallinta && aktiivinen==null ? <span className="t-nav-item" onClick={() =>{ 
                lisaaTentti()}}> + </span> : ""}
            </nav>
          </div> : tietoa ? <section className="vastaus">Tietoa sovelluksesta</section> :""}
              {(aktiivinen!=null && !poistu) ? <Tentti vastausVaihtui={vastausVaihtui} data={data[aktiivinen]} tenttiIndex={aktiivinen} naytaVastaukset={naytaVastaukset} setNaytaVastaukset={setNaytaVastaukset} hallinta={hallinta} setHallinta={setHallinta} muutaKysymys={muutaKysymys} poistaKysymys={poistaKysymys} lisaaKysymys={lisaaKysymys} muutaVaihtoehto={muutaVaihtoehto} oikeaVaihtui={oikeaVaihtui} poistaVaihtoehto={poistaVaihtoehto} lisaaVaihtoehto={lisaaVaihtoehto} /> : ""}
    </div>
  )
}
export default App;
