import Axios from 'axios';


const muutaKysymys = async(event,props,kysymysIndex) => {
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
  
  const muutaVaihtoehtoTeksti = async(event,props,veIndex) => {
    let id = props.data.vaihtoehdot[veIndex].vaihtoehtoid
    let body = {
      vaihtoehto: event.target.value,
      korrekti: props.data.vaihtoehdot[veIndex].korrekti,
      vaihtoehto_kysymys_id: props.data.kysymysid
    } 
    try {
      let result = await Axios.put("http://localhost:4000/vaihtoehto/"+id,body)
      props.dispatch({ type: "VAIHTOEHTO_NIMETTY", 
        data: { vaihtoehto: body.vaihtoehto, tenttiIndex: props.tenttiIndex, kyIndex: props.kysymysIndex, veIndex: veIndex } })
    } catch (exception) {
      console.log(exception)
    }
  }

  const muutaVaihtoehtoArvo = async(event,props,veIndex) => {
    let id = props.data.vaihtoehdot[veIndex].vaihtoehtoid
    let body = {
      vaihtoehto: props.data.vaihtoehdot[veIndex].vaihtoehto,
      korrekti: event.target.checked,
      vaihtoehto_kysymys_id: props.data.kysymysid
    } 
    try {
      let result = await Axios.put("http://localhost:4000/vaihtoehto/"+id,body)
      props.dispatch({ type: "OIKEA_VAIHDETTU", 
        data: { korrekti: body.korrekti, tenttiIndex: props.tenttiIndex, kyIndex: props.kysymysIndex, veIndex: veIndex } })
    } catch (exception) {
      console.log(exception)
    }
  }

  const vastausAnnettu = async(event,props,veIndex) => {
    let kayttajaid = "8"
    let vastausid = "0"
    let body = {
      vastaus: event.target.checked,
      vastauspvm: new Date(Date.now()).toISOString(),
      vastaus_vaihtoehto_id: props.data.vaihtoehdot[veIndex].vaihtoehtoid,
      vastaus_kayttaja_id: kayttajaid,
      vastaus_tentti_id: props.tenttiid
    }
    try {
      if (body.vastaus) {
        let result = await Axios.post("http://localhost:4000/vastaus",body)
      } else {
        let result2 = await Axios.get("http://localhost:4000/kayttaja/"+kayttajaid+"/tentti/"+props.tenttiid+"/vaihtoehto/"+body.vastaus_vaihtoehto_id)
        vastausid = result2.data[0].vastausid
        let poistoresult = await Axios.delete("http://localhost:4000/vastaus/"+vastausid)
      }
    } catch (exception) {
        console.log(exception)
    }
    props.dispatch({type: "VASTAUS_VAIHDETTU", 
      data:{valittu: body.vastaus, tenttiIndex: props.tenttiIndex, kyIndex: props.kysymysIndex, veIndex: veIndex} })
  }
  
  const lisaaTentti = async(dispatch,aktiivinenKurssi) => {
    var uusiTenttiNimi = prompt("Anna uuden tentin nimi?", "");
    if (uusiTenttiNimi !== null && uusiTenttiNimi !== ""){
      let body = {
        tentti: uusiTenttiNimi.toUpperCase(),
      }
      try {
        let result = await Axios.post("http://localhost:4000/tentti",body)
        let tenttiId = result.data[0].tenttiid
        let body2 = {
          kurssi_kurssi_id: aktiivinenKurssi,
          kurssi_tentti_id: tenttiId
        }
        let result2 = await Axios.post("http://localhost:4000/kurssitentti",body2)
        let uusiTentti = {
          tenttiid: tenttiId,
          tentti: body.tentti,
          kysymykset: []
        }
        dispatch({type: "TENTTI_LISATTY", data:{lisays: uusiTentti}})
      } catch (exception) {
          console.log(exception)
      }
    }
  }
  
  const lisaaKysymys = async(props) => {
    let body = {
      kysymys: "",
      kysymys_aihe_id: 0
    } 
    try {
      let result = await Axios.post("http://localhost:4000/kysymys",body)
      let id = result.data[0].kysymysid
      let body2 = {
        tkysymys_kysymys_id: id,
        tkysymys_tentti_id: props.data.tenttiid
      }
      let result2 = await Axios.post("http://localhost:4000/tenttikysymys",body2)
      props.dispatch({type: "KYSYMYS_LISATTY", 
        data:{tenttiIndex: props.tenttiIndex, kysymysid: body2.tkysymys_kysymys_id}})
    } catch (exception) {
      console.log(exception)
    }
  }

  const lisaaVaihtoehto = async(props) => {
     let body = {
      vaihtoehto: "",
      korrekti: false,
      vaihtoehto_kysymys_id: props.data.kysymysid
    } 
    try {
      let result = await Axios.post("http://localhost:4000/vaihtoehto/kysymys/"+props.data.kysymysid,body)
      let vaihtoehtoid = result.data[0].vaihtoehtoid
      props.dispatch({type: "VAIHTOEHTO_LISATTY", 
        data:{tenttiIndex: props.tenttiIndex, kyIndex: props.kysymysIndex, vaihtoehtoid: vaihtoehtoid} })
    } catch (exception) {
      console.log(exception)
    }
  }

  const poistaKysymysTentilta = async(props,kysymysIndex) => {
    let kysymysid = props.data.kysymykset[kysymysIndex].kysymysid
    let tenttiid = props.data.tenttiid
    try {
      let result = await Axios.delete("http://localhost:4000/tenttikysymys/"+kysymysid+"/tentti/"+tenttiid)
      props.dispatch({type: "KYSYMYS_POISTETTU", 
        data:{ tenttiIndex: props.tenttiIndex, kyIndex: kysymysIndex } })
    } catch (exception) {
      console.log(exception)
    }
  }

  const poistaVaihtoehto = async(props,veIndex) => {
    let id = props.data.vaihtoehdot[veIndex].vaihtoehtoid
    try {
      let result = await Axios.delete("http://localhost:4000/vaihtoehto/"+id)
      props.dispatch({type: "VAIHTOEHTO_POISTETTU", 
        data:{ tenttiIndex: props.tenttiIndex, kyIndex: props.kysymysIndex, veIndex: veIndex }})
    } catch (exception) {
      console.log(exception)
    }
  }

  export {muutaKysymys,muutaVaihtoehtoTeksti,muutaVaihtoehtoArvo,vastausAnnettu,lisaaTentti,lisaaKysymys,lisaaVaihtoehto,poistaKysymysTentilta,poistaVaihtoehto}
  