import React, {useState} from 'react';

const Register = ({handleSubmit}) => {
    
    const [firstname, setFirstname] = useState("");
    const [surename, setSurename] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    
    const doSubmit =async(e) => {
        const evaluate = () =>{
            
        }

        e.preventDefault()
        const userdata = 
            {
                firstname : firstname,
                surename : surename,
                username : username,
                password : password,
                role : role
            };

        handleSubmit(e, userdata);
    }
    
    return (
        <div className="">
        <br></br>
        <form className="" onSubmit={e => doSubmit(e)}>
            Etunimi: <input onChange={e=> setFirstname(e.target.value)} value={firstname}/> 
            <br/>Sukunimi: <input onChange={e=> setSurename(e.target.value)} value={surename}/>
            <br/>Sähköposti(=käyttäjätunnus): <input onChange={e=> setUsername(e.target.value)} value={username}/> 
            <br/>Salasana: <input onChange={e=> setPassword(e.target.value)} type="password" value={password} />
            <br/>Salasana(check): <input onChange={e=> setCheck(e.target.value)} value={check}/>
            <br/>Käyttäjärooli: <input onChange={e=> setRole(e.target.value)} value={role}/>
            <br/><input type="submit" />
        </form>
        </div>
    )}


export default Register;