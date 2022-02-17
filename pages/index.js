import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import ChooseTime from "./../components/ChooseTime";

import Header from "./../components/Header";

function Home() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  const [pass, setPassword] = useState("")
  const [error, setError] = useState("")
  const [machines, setMachines] = useState([])
  const [loading, setLoading] = useState(true)

  const router = useRouter();

  const HandleLogin = (e) => {
      e.preventDefault();

      // fetch("http://remote.kkpartner.dk:3001/auth", {
      //     method: "POST",
      //     headers: {
      //         "Content-type": "application/json",
      //         "Accept" : "application/json"
      //     },
      //     credentials: 'include',
      //     body: JSON.stringify({
      //         email: email,
      //         password: pass
      //     })
      // })
      // .then(res => {
      // })
      
      router.push("/overview")
  }




  useEffect(function() 
  {    
    var hasstarted = localStorage.getItem("hasstarted")
    if (hasstarted === "true") {
      setSubmitted(true)
    }
    fetch("/api/machines").then(res => res.json()).then(json => { setLoading(false); setMachines(json) })
  }, [])

  var machineWithoutTime = machines.find(machine => machine.pumpname && machine.time == null)

  return (
    <React.Fragment>
      {machineWithoutTime == undefined && !loading ? <React.Fragment>
        <Header />
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
      </React.Fragment> : <ChooseTime machineWithoutTime={machineWithoutTime} />}
    </React.Fragment>
  );
}

export default Home;
