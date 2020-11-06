import React, { useEffect } from 'react';
import { useState } from 'react'
import './oma.css';


function Vaihtoehdot(props) { // näytölle kysymysten vaihtoehdot ja reagointi jos merkitään vastaukseksi

  const merkittyVastaukseksi = (event, props, veIndex) => {
     props.vastausVaihtui(event, props, veIndex)
  }

  return <section>{props.naytaVastaukset ? props.data.vaihtoehdot.map((item, veIndex) =>
    <div key={veIndex} className="vastaus"><input type="checkbox" checked={item.valittu}></input><input type="checkbox" checked={item.korrekti}></input> {item.teksti}</div>) :
    props.data.vaihtoehdot.map((item, veIndex) =>
      <div key={veIndex} className="vastaus"><input type="checkbox" checked={item.valittu} onChange={(event) => { merkittyVastaukseksi(event, props, veIndex) }}></input> {item.teksti}</div>)}
  </section>
}

function Tentti(props) {  //näytölle tentin kysymykset ja kutsuu Vaihtoehdot näyttäämään kysymysten vaihtoehdot

 return <section>{props.data.kysymykset.map((item, kysymysIndex) =>
    <div key={kysymysIndex} className="kysymys">{item.kysymys} <Vaihtoehdot vastausVaihtui={props.vastausVaihtui} tenttiIndex={props.tenttiIndex} kysymysIndex={kysymysIndex} 
    kysymysIndex={kysymysIndex} data={props.data.kysymykset[kysymysIndex]} naytaVastaukset={props.naytaVastaukset} setNaytaVastaukset={props.setNaytaVastaukset}/>
    </div>)}<div><span className="button" onClick={()=>props.setNaytaVastaukset(1)}>Näytä vastaukset</span></div></section>
}

function App() {

  const [data, setData] = useState([])
  const [dataAlustettu, setDataAlustettu] = useState(false)
  const [tentit, setTentit] = useState(0)
  const [tietoa, setTietoa] = useState(0)
  const [poistu, setPoistu] = useState(0)
  const [naytaVastaukset, setNaytaVastaukset] = useState(0)
  const [aktiivinen, setAktiivinen] = useState(0)

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

  const vastausVaihtui = (event,props,veIndex) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[props.tenttiIndex].kysymykset[props.kysymysIndex].vaihtoehdot[veIndex].valittu = event.target.checked
    setData(syväKopio)
  }

  return (
    <div className="grid-container">
      <nav className="sovellusvalikko">
        <span className="s-nav-item" onClick={e => { setTentit(1); setTietoa(0); setNaytaVastaukset(0) }}>TENTIT </span>
        <span className="s-nav-item" onClick={e => { setTentit(0); setTietoa(1) }}>TIETOA SOVELLUKSESTA </span>
        <span className="s-nav-item-right" onClick={e => { setPoistu(1); setTentit(0)}}>POISTU </span>
      </nav>
      {poistu ? <section>Sovelluksen toiminta on päättynyt!</section> :
        tentit ?
          <div className="grid-item">
            <nav className="tenttivalikko">
              {data.map((item,index) => <span className="t-nav-item" onClick={()=>{
                vaihdaTentti(index); setNaytaVastaukset(0)}}>{item.tentti}</span>)}
            </nav>
          </div> : tietoa ? <section>Tietoa sovelluksesta</section> :""}
              {(tentit && !poistu) ? <Tentti vastausVaihtui={vastausVaihtui} data={data[aktiivinen]} tenttiIndex={aktiivinen} naytaVastaukset={naytaVastaukset} setNaytaVastaukset={setNaytaVastaukset}/> : ""}
    </div>
  )
}
export default App;
