import React from "react";
import { useState } from "react"
import { withRouter } from "react-router";

const LoginForm = ({history}) => {
    const [email, setEmail] = useState("")
    const [pass, setPassword] = useState("")
    const [error, setError] = useState("")

    const HandleLogin = (e) => {
        e.preventDefault();

        fetch("http://remote.kkpartner.dk:3001/auth", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept" : "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: pass
            })
        })
        .then(res => {
            history.push("/overview")
        })
    }
    
    return (
        <main>
            <div className="imgcontainer">
            </div>
            <form onSubmit={HandleLogin} method="post" className="flexCenteredColumn">
                <label>{error}</label> 
                <div id="loginform">
                    <label><b>Email</b>
                        <input type="text" name={email} onChange={(e) => { setEmail(e.target.value) }} required></input>
                    </label>    

                    <label><b>Kode</b>
                        <input type="password" name={pass} onChange={(e) => { setPassword(e.target.value) }} required></input>
                    </label>

                    <button id="loginbutton" type="submit">Log ind</button>          
                </div>
            </form>
        </main>
    )
}

export default withRouter(LoginForm);