import {
    muutaVaihtoehtoTeksti,
    muutaVaihtoehtoArvo,
    vastausAnnettu,
    lisaaVaihtoehto,
    poistaVaihtoehto
  } from './dataManipulation.js'
import cathead from './img/cathead.jpg'
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

function Vaihtoehdot(props) { // näytölle kysymysten vaihtoehdot ja reagointi jos merkitään vastaukseksi

    return <section>
        {props.hallinta ? props.data.vaihtoehdot.map((item, veIndex) =>           // jos hallinta valittu
          <div key={item.vaihtoehtoid} className="vastaus">
            <input type="checkbox" checked={item.korrekti} onChange={(event) => { // voidaan muuttaa mikä on oikea vaihtoehto
                muutaVaihtoehtoArvo(event,props,veIndex)}}></input>
            <input type="text" value={item.vaihtoehto} onChange={(event) =>{          // voidaan muotoilla vaihtoehdon tekstiä
                muutaVaihtoehtoTeksti(event,props,veIndex)}}> 
            </input> <button className="delButton" onClick={()=>{                 // voidaan poistaa vaihtoehto
              if (window.confirm("Poistetaanko vaihtoehto ("+props.data.vaihtoehdot[veIndex].vaihtoehto+")?")){
                poistaVaihtoehto(props,veIndex)
              }
            }}><DeleteTwoToneIcon /></button> {!props.hallinta && item.valittu && item.korrekti ? <img alt="cathead" src={cathead}/> : ""}
          </div>):                                                                // muu kuin hallintatila
          props.vastaukset ? props.data.vaihtoehdot.map((item, veIndex) =>        // oikeiden vastausten näyttö valittu: valintoja ei voi muuttaa 
            <div key={item.vaihtoehtoid} className="vastaus">
              <input type="checkbox" checked={item.valittu} readOnly></input>            
              <input type="checkbox" checked={item.korrekti} readOnly></input>
              {item.vaihtoehto} {item.valittu && item.korrekti ? <img alt="cathead" src={cathead}/> : ""}
            </div>) :
            props.data.vaihtoehdot.map((item, veIndex) =>                         // tentti menossa (vastaukset poissa)
              <div key={item.vaihtoehtoid} className="vastaus">
                <input type="checkbox" checked={item.valittu} onChange={(event) => {  // vaihtoehto voidaan valita vastaukseksi tai poistaa
                  vastausAnnettu(event,props,veIndex)}}>
                </input> {item.vaihtoehto}
              </div>)}
            {props.hallinta ? <div className="add"><span className="add-ve" onClick={()=>{  // jos hallintatila, voi lisätä uuden vaihtoehdon
              lisaaVaihtoehto(props)}}> + </span></div> : ""}
      </section>
    }

    export default Vaihtoehdot