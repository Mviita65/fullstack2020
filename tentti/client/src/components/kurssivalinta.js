import Axios from 'axios';
import '../oma.css';
import React, { useEffect } from 'react';

const Kurssivalikko = ({
  aktiivinenKurssi,setAktiivinenKurssi,
  kurssiData,setKurssiData,
  kurssiDataIndex,setKurssiDataIndex,
  tentit,setTentit}) => {

  const fetchKurssiData = async () => {
    try {
      let kurssitiedot = []
      let result = await Axios.get("http://localhost:4000/kurssi")
      if (result.data.length > 0){
        for (var i = 0; i < result.data.length; i++){
          let kurssitieto = {
            kurssiid : result.data[i].kurssiid,
            kurssi : result.data[i].kurssi,
            aloituspvm : result.data[i].aloituspvm
          }
          kurssitiedot = kurssitiedot.concat(kurssitieto)
        }
        setKurssiData(kurssitiedot)
        return
      }
    }
    catch (exception) {
      console.log(exception)
    }
  };

  useEffect(fetchKurssiData)

  return (
    <div className="grid-item"><br/>KURSSIVALINTA:
        {kurssiData.map((item, index) =>
            <div key={item.kurssiid} className="kysymys">
                <span className="t-nav-item" onClick={() =>{
                    setAktiivinenKurssi(item.kurssiid); // valitun kurssin tenttien tietojen hakua varten
                    setKurssiDataIndex(index) // valitun kurssin tietoja varten 
                    setTentit(1);     // tenttinäyttö päälle kurssin valinnan jälkeen
                }}>{item.kurssi}
                </span>
            </div>
        )}
    </div>
  )
}

export default Kurssivalikko