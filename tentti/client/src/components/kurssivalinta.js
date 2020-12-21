import Axios from 'axios';
import React, { useEffect } from 'react';

const Kurssivalikko = ({aktiivinenKurssi,setAktiivinenKurssi,kurssiData,setKurssiData}) => {

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
          setKurssiData(kurssitiedot)
        }
      }
    }
    catch (exception) {
      console.log(exception)
    }
  };

  useEffect(fetchKurssiData, [])

  return (
    <div className="grid-item"><br/>
        {kurssiData.map((item, index) =>
            <div key={item.kurssiid} className="kysymys">
                <span onClick={() =>{
                    setAktiivinenKurssi(item.kurssiid)
                }}>{item.kurssi}
                </span>
            </div>
        )}
    </div>
  )
}

export default Kurssivalikko