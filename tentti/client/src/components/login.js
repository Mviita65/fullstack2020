import React, {useState} from 'react';

const Login = ({handleSubmit,register,setRegister}) => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const doSubmit =async(e) => {
        e.preventDefault()
        const userdata = 
            {
                username : username,
                password : password
            };

        handleSubmit(e, userdata);
    }
    
    return (
        <div className="grid-item"><br/>
        <section className="kysymys">
            Kirjaudu sähköpostiosoitteella
        <br/>
        <form className="vastaus" onSubmit={e => doSubmit(e)}>
            Käyttäjätunnus: <input onChange={e=> setUsername(e.target.value)} value={username} required/> 
            <br/>Salasana: <input onChange={e=> setPassword(e.target.value)} type="password" value={password} required />
            <br/><br/><input className="button" type="submit" /><br/>
        </form>
        </section>
        <section className="kysymys">
            Rekisteröidy 
        <br/>
        <div className="vastaus">
            Et ole vielä rekisteröinyt sähköpostia käyttäjätiliksi? <br/><br/>
            <button className="button" onClick={e => {setRegister(true)}}>
            Luo tili</button><br/>
        </div>
        </section>
        </div>
    )}


export default Login;