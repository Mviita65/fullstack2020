import Axios from 'axios';
import '../oma.css';
import React, { useEffect } from 'react';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

const Tenttivalikko = ({tenttiData,setTenttiData,hallinta,setHallinta}) => {

  const fetchTenttiData = async () => {
    try {
      let tenttitiedot = []
      let result = await Axios.get("http://localhost:4000/tentti")
      if (result.data.length > 0){
        for (var i = 0; i < result.data.length; i++){
          let tenttitieto = {
            tenttiid : result.data[i].tenttiid,
            tentti : result.data[i].tentti,
            kurssiid: result.data[i].kurssiid,
            kurssi: result.data[i].kurssi
          }
          tenttitiedot = tenttitiedot.concat(tenttitieto)
        }
        setTenttiData(tenttitiedot)
        return
      }
    }
    catch (exception) {
      console.log(exception)
    }
  };

  useEffect(fetchTenttiData)

  return (
    <div className="grid-item"><br/>{hallinta? "TENTTIHALLINTA": "TENTTIVALINTA"}
        {tenttiData.map((item, index) =>
            <div key={item.tenttiid} className="kysymys">
                <span className="t-nav-item" onClick={() =>{
               }}>{item.tentti}, {item.kurssi} 
                </span>
                {hallinta && item.kurssiid===null? <button className="delButton"><DeleteTwoToneIcon /></button>:""}
            </div>
        )}
    </div>
  )
}

export default Tenttivalikko