import Axios from 'axios';
import '../oma.css';
import Kysymykset from './kysymykset.js';
import React, { useEffect } from 'react';
import strings from './merkkijonot';


const Tenttivalikko = ({tenttiData,setTenttiData,aktiivinenKayttaja, setDataAlustettu,
  dispatch, vastaukset, setVastaukset, hallinta, setHallinta, kaaviot, setKaaviot,setTentit,setTietoa,setAktiivinenTentti,lang
}) => {

  const fetchTenttiData = async () => {
    try {
      let tenttitiedot = []
      let result = await Axios.get("http://localhost:4000/tentti")
      if (result.data.length > 0){
        for (var i = 0; i < result.data.length; i++){
          let tenttitieto = {
            tenttiid : result.data[i].tenttiid,
            tentti : result.data[i].tentti,
            minimipisteet: result.data[i].minimipisteet,
            julkaisupvm: new Intl.DateTimeFormat(lang).format(new Date(result.data[i].julkaisupvm)),
            // julkaisupvm: new Date(result.data[i].julkaisupvm).toLocaleDateString(),
            kurssiid: result.data[i].kurssiid,
            kurssi: result.data[i].kurssi,
            etunimi: result.data[i].etunimi,
            sukunimi: result.data[i].sukunimi,
            kayttajaid: result.data[i].kayttajaid,
            sahkoposti: result.data[i].sahkoposti,
            kysymykset: []
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

  const fetchTenttiKysymykset = async (tenttiid) => {
    let tenttiTieto = JSON.parse(JSON.stringify(tenttiData))
    try {
      let result = await Axios.get("http://localhost:4000/kysymys/tentti/"+tenttiid)
      let kysymykset = result.data
      if (kysymykset.length>0){
        for (var j = 0; j < kysymykset.length; j++){ // käydään läpi noudetut tentin kysymykset
          kysymykset[j].vaihtoehdot = []
          let vaihtoehdot = await Axios.get("http://localhost:4000/vaihtoehto/kysymys/"+kysymykset[j].kysymysid)
          kysymykset[j].vaihtoehdot = vaihtoehdot.data  
          let vastaukset = await Axios.get("http://localhost:4000/kayttaja/"+aktiivinenKayttaja+"/kysymys/"+kysymykset[j].kysymysid)
            if (kysymykset[j].vaihtoehdot.length>0){
              for (var k = 0; k < kysymykset[j].vaihtoehdot.length; k++){  // käydään läpi noudetut kysymyksen vaihtoehdot
                kysymykset[j].vaihtoehdot[k].valittu = false               // käyttäjän vastaukset alustetaan falsella
                if (vastaukset.data.length>0){                                            
                  for (var l = 0; l < vastaukset.data.length; l++){                       // käydään läpi onko käyttäjä valinnut vaihtoehdon oikeaksi
                    if (kysymykset[j].vaihtoehdot[k].vaihtoehtoid === vastaukset.data[l].vastaus_vaihtoehto_id) {
                      kysymykset[j].vaihtoehdot[k].valittu = true
                    }
                  }
                }  
              } 
            }        
        }
        for (var i = 0; i< tenttiTieto.length; i++){
          if (tenttiTieto[i].tenttiid === tenttiid){
            tenttiTieto[i].kysymykset = kysymykset
          }
        }
        setTenttiData(tenttiTieto)
        console.log(tenttiTieto)
      }
    } catch(execption) {
      console.log(execption)
    }   
  }

  return (
    <div className="grid-item">{strings.tenttivalinta}
        {tenttiData.map((item, index) =>
            <div key={index} className="kysymys">
                <span className="t-nav-item" onClick={() =>{
                  fetchTenttiKysymykset(item.tenttiid);
            }}>{item.tentti} ({item.kurssi})</span> <br/>
              <span className="vastaus"> ● {item.julkaisupvm}, {strings.minimi} {item.minimipisteet}p., {item.etunimi} {item.sukunimi}</span>
            </div>
        )}
    </div>
  )
}

export default Tenttivalikko