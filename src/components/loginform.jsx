import React from "react";
import { useState, useEffect } from "react"
import { withRouter } from "react-router";



const LoginForm = ({history}) => {
    const [email, setEmail] = useState("")
    const [pass, setPassword] = useState("")
    const [error, setError] = useState("")

    const HandleLogin = (e) => {
        e.preventDefault();

        fetch("http://10.10.51.36:5000/auth", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: pass
            })
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if (json.error === "wrongdetails") {
                setError("Email eller Kode er forkert")
            } else if (json.error === "missingdetails") {
                setError("Venligst udfyld begge felter") 
            } else {
                localStorage.setItem('token', json.token);
                history.push("/overview")
            }
        })
    }
    
    return (
        <main>
            <div className="imgcontainer">
            </div>
            <form onSubmit={HandleLogin} method="post" className="flexCenteredColumn">
                <label>{error}</label> 
                <div id="loginform">
                    <label><b>Brugernavn</b>
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