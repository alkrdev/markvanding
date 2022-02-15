import React, { useEffect, useState } from 'react';

import Header from "./../components/Header";

const overview = () => {
  const [machines, setMachines] = useState([])
  const [pumps, setPumps] = useState([])

  const sendStopSMS = (pumpnumber, pumpStopcode) => {
    // fetch("http://remote.kkpartner.dk:3001/sendsms", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ 
    //     number: pumpnumber,
    //     message: pumpStopcode
    //   })
    // })
  }

  const StopMachine = (machine, pump) => {
    // fetch("http://remote.kkpartner.dk:3001/stopmachine", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     machineid: machine.id,
    //     pumpid: pump.id
    //   })
    // })
  }

  useEffect(() => {
    fetch("/api/machines").then(res => res.json()).then(json => setMachines(json))
    fetch("/api/pumps").then(res => res.json()).then(json => setPumps(json))
  }, [])

  return (
    <React.Fragment>
      <Header />      
        <h1 className="tablelabel">Færdige vandinger</h1>
        {machines ? machines.filter(machine => new Date() > new Date(machine.time) && machine.active == 1).map(function(machine) {
            var time = new Date(machine["time"]).toLocaleString("da-DK", {
                dateStyle: "medium",
                timeStyle: "short"
            });
            
            var pump = pumps.find((pump) => pump.name === machine.pumpname && pump.active == 1)

            return (
            <tr key={machine["id"]}>
                <td style={{background: "#DF4848"}}>{machine["id"]}</td>
                <td>{machine["pumpname"]}</td>
                <td>{time}</td>
                <td id="stopwateringbutton" onClick={(event) => {

                    var confirmed = window.confirm("Er du sikker på at du vil stoppe vanding?")
                    
                    if (!confirmed === true) return;

                    stopMachine(machine.id, pump.id)
                    window.location.href="/overview"
                }}>
                <h4>FJERN</h4></td>
            </tr>
            )
        }) : <></>}

        <h1 className="tablelabel">Aktive vandinger</h1>
        {machines ? machines.filter(machine => new Date() < new Date(machine.time) && machine.active == 1).map(function(machine) {
          var time = new Date(machine["time"]).toLocaleString("da-DK", {
              dateStyle: "medium",
              timeStyle: "short"
          });
          
          var pump = pumps.find((pump) => pump.name === machine.pumpname && pump.active == 1)

          return (
              <tr key={machine["id"]}>
                  <td style={{background: "#42CB6B"}}>{machine["id"]}</td>
                  <td>{machine["pumpname"]}</td>
                  <td>{time}</td>
                  <td id="stopwateringbutton" onClick={(event) => {

                      var confirmed = window.confirm("Er du sikker på at du vil stoppe vanding?")
                      
                      if (!confirmed === true) return;

                      // var pumpnumber = "+45" + pump.number
                      // var pumpstopcode = pump.stopcode
                      // sendStopSMS(pumpnumber, pumpstopcode)
                      
                      stopMachine(machine.id, pump.id)

                      setTimeout(() => {  window.location.href="/overview" }, 1000);

                  }}>
                      <h4>STOP</h4>
                  </td>
              </tr>
          )
        }) : <></>}
    </React.Fragment>      
  )
}

export default overview;
