import React, {useState} from 'react';
import cathead from './img/cathead.jpg'

const Register = ({luoTunnus,register,setRegister}) => {
    
    const [firstname, setFirstname] = useState("");
    const [surename, setSurename] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verify, setVerify] = useState("");
    const [valinta,setValinta] = useState(false);
    const [role, setRole] = useState("");
    
    const evaluate =async(e) => {
        e.preventDefault()

        setRole("oppilas")
        if (valinta) {
            setRole("opettaja")
        }
     
        if(password === verify) {

          const uusiKayttaja = 
            {
                firstname : firstname,
                surename : surename,
                username : username,
                password : password,
                role : role
            }

          luoTunnus(e, uusiKayttaja);
        }
    }
    
    return (
        <div className="grid-item"><br/>
        <section className="kysymys">
            Rekisteröidy
        <br></br>
        <form className="vastaus" onSubmit={e => evaluate(e)}>
            Etunimi:<br/> <input onChange={e=> setFirstname(e.target.value)} value={firstname}/> 
            <br/>Sukunimi:<br/> <input onChange={e=> setSurename(e.target.value)} value={surename}/>
            <br/>Sähköposti:<br/> <input onChange={e=> setUsername(e.target.value)} value={username} required/> 
            <br/>Salasana:<br/> <input onChange={e=> setPassword(e.target.value)} type="password" value={password} required />
            <br/>Salasana uudelleen:<br/> <input onChange={e=> setVerify(e.target.value)} type="password" value={verify} required/> {password!=="" && password===verify ? <img alt="cathead" src={cathead}/> : ""}
            <br/>Olen opettaja: <input type="checkbox" onChange={e=> setValinta(e.target.checked)} value={valinta}/>
            <br/><br/><input className="button" type="submit" /> <button className="button" onClick={e=>setRegister(false)}>Paluu</button><br/>
        </form>
        </section>
        </div>
    )}


export default Register;