import React from 'react'
import {useState} from 'react'
import './oma.css';

function App() {

  const [korotusProsentti, setKorotusProsentti] = useState(0)
  const [veroProsentti, setVeroProsentti] = useState(20.00)
  const [bruttoJaNetto, setBruttoJaNetto] = useState([])
  const [naytaTunnit, setNaytaTunnit] = useState(1)
  const [naytaBrutto, setNaytaBrutto] = useState(0)
  const [naytaNetto, setNaytaNetto] = useState(0)
  
  
  const [kkPalkat,setKkPalkat] = useState([
    {kk: "Tammikuu", palkka: 1000},
    {kk: "Helmikuu", palkka: 500},
    {kk: "Maaliskuu", palkka: 0},
    {kk: "Huhtikuu", palkka: 2500},
    {kk: "Toukokuu", palkka: 750},
    {kk: "Kesäkuu", palkka: 2000},
    {kk: "Heinäkuu", palkka: 3000},
    {kk: "Elokuu", palkka: 1000},
    {kk: "Syyskuu", palkka: 500},
    {kk: "Lokakuu", palkka: 1000},
    {kk: "Marraskuu", palkka: 2000},
    {kk: "Joulukuu", palkka: 500}
  ])

  const [tyot,setTyot] = useState([
    {paiva: "Maanantai", tunnit: 6},
    {paiva: "Tiistai", tunnit: 9},
    {paiva: "Keskiviikko", tunnit: 10},
    {paiva: "Torstai", tunnit: 9},
    {paiva: "Perjantai", tunnit: 6},
    {paiva: "Lauantai", tunnit: 0},
    {paiva: "Sunnuntai", tunnit: 0}
  ]);

  const paivitaTunnit = (index, value) =>{
    let uudetTunnit = [...tyot]
    if (value >= 0){
      uudetTunnit[index].tunnit = Number(value)
    }
    setTyot(uudetTunnit)
  }

  const paivatJaTunnitJaKa = () =>{
      let laskuri = 0
      let tunnit = 0
      let keskiarvo = 0
      let palautus = ""
      tyot.forEach ((item,index)=> {
        if (tyot[index].tunnit > 0){
          laskuri++
          tunnit = tunnit + tyot[index].tunnit
        }
      })
      if (laskuri > 0){
        keskiarvo = Math.round(tunnit/laskuri*10)/10
      }
      palautus = `Työpäivät ${laskuri} kpl, tunnit ${tunnit} h ja k.a./tehty päivä ${keskiarvo}`
      return palautus
  }

  const minJaMax = () =>{
    let min = 0
    let max = 0
    let palautus = ""
    tyot.forEach ((item,index)=> {
      if (tyot[index].tunnit > max){
        max = tyot[index].tunnit
      }
      if (tyot[index].tunnit !== 0){
        if (min === 0){
          min = tyot[index].tunnit
        } else if (tyot[index].tunnit < min){
          min = tyot[index].tunnit
        }
      }
    })
    palautus = `Lyhin työpäivä ${min} h ja pisin työpäivä ${max} h`
    return palautus
  }

  // ----------------------- kkPalkkaFunktiot ------------------------------

  const paivitaPalkka = (index, value) =>{
    let uudetPalkat = [...kkPalkat]
    if (value >= 0){
      uudetPalkat[index].palkka = Number(value)
    }
    setKkPalkat(uudetPalkat)
  }

  const ajaKorotus = (e) =>{
    e.preventDefault()
    let uudetPalkat = [...kkPalkat]
    let kerroin = (100 + korotusProsentti) / 100
    uudetPalkat.forEach ((item,index)=> {
      uudetPalkat[index].palkka = Math.round((kkPalkat[index].palkka * kerroin)*100)/100
    })
    setKkPalkat(uudetPalkat)  
  }

  const laskeNetto = (e) =>{
    e.preventDefault()
    let newBruttoJaNetto = [...kkPalkat]
    newBruttoJaNetto.forEach ((item,index)=>{
      newBruttoJaNetto[index].netto = Math.round((kkPalkat[index].palkka - kkPalkat[index].palkka * veroProsentti/100)*100)/100
    })
    setBruttoJaNetto(newBruttoJaNetto)
  }

  const Tunnit = () =>{
    return <section>
      <header>Viikonpäivä/tehdyt tunnit</header>
        {tyot.map((item,index)=><div className="grid-item" key={index}>{tyot[index].paiva}<input type="number" step=".25" onChange={e => paivitaTunnit(index,e.target.value)} value={tyot[index].tunnit} ></input></div>)}
      <footer>{paivatJaTunnitJaKa()}<br/>{minJaMax()}</footer>
    </section>
  }

  const Brutto = () => {
    return <section>
      <header>Kuukausipalkat</header>
      {kkPalkat.map((item,index)=><div className="grid-item" key={index}>{kkPalkat[index].kk}<input type="number" step=".01" onChange={e => paivitaPalkka(index,e.target.value)} value={kkPalkat[index].palkka} ></input></div>)}
      <form className="grid-item" onSubmit={e => ajaKorotus(e)}>
        Anna korotusprosentti:
        <input type="number" onChange={e => setKorotusProsentti(Number(e.target.value))} value={korotusProsentti}/>
        <p><button type="submit">Aja korotus</button></p>
      </form>
      <footer><br></br></footer>
    </section>
  }

  const Netto = () =>{
    return <section>
      <header>Laske nettopalkka</header>
      <form className="grid-item" onSubmit={e => laskeNetto(e)}>
        Anna veroprosentti:
        <input type="number" step=".01" onChange={e => setVeroProsentti(Number(e.target.value))} value={veroProsentti}/>
        <p><button type="submit">Laske netto</button></p>
        {bruttoJaNetto.map((item,index)=><div className="grid-item" key={index}>
          <b>{bruttoJaNetto[index].kk}</b> brutto: {bruttoJaNetto[index].palkka} netto: {bruttoJaNetto[index].netto}
        </div>)}
      </form>
    </section>

  }

  return (
    <div className="grid-container">
      <nav>
        <span onClick={e => {setNaytaTunnit(1);setNaytaBrutto(0);setNaytaNetto(0)}}>Tunnit </span>
        <span onClick={e => {setNaytaBrutto(1);setNaytaTunnit(0);setNaytaNetto(0)}}>| Brutto </span>
        <span onClick={e => {setNaytaNetto(1);setNaytaTunnit(0);setNaytaBrutto(0)}}>| Netto</span></nav>
      <section>
        {naytaTunnit ? <Tunnit/> : naytaBrutto ? <Brutto/> : <Netto/>}
      </section>
    </div>
  )
}

export default App;
