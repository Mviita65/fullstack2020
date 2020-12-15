import React, {useState} from 'react';

const Login = ({handleSubmit}) => {
    
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
        <div className="">
        <br></br>
        <form className="" onSubmit={e => doSubmit(e)}>
            Käyttäjätunnus: <input onChange={e=> setUsername(e.target.value)} value={username}/> 
            <br></br>Salasana: <input onChange={e=> setPassword(e.target.value)} type="password" value={password} />
            <br></br><input type="submit" />
        </form>
        </div>
    )}


export default Login;