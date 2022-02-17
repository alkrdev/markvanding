import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Header from "./../components/Header";
import ChooseTime from "./../components/ChooseTime"

const overview = () => {
  const [machines, setMachines] = useState([])
  const [pumps, setPumps] = useState([])

  const router = useRouter();

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
      {machineWithoutTime != undefined ? <ChooseTime machineWithoutTime={machineWithoutTime} /> : 
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
            <div key={machine["id"]}>
                <div style={{background: "#DF4848"}}>{machine["id"]}</div>
                <div>{machine["pumpname"]}</div>
                <div>{time}</div>
                <div id="stopwateringbutton" onClick={(event) => {

                    var confirmed = window.confirm("Er du sikker på at du vil stoppe vanding?")
                    
                    if (!confirmed === true) return;

                    stopMachine(machine)
                    router.push("/overview")
                }}>
                <h4>FJERN</h4></div>
            </div>
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
              <div key={machine["id"]}>
                  <div style={{background: "#42CB6B"}}>{machine["id"]}</div>
                  <div>{machine["pumpname"]}</div>
                  <div>{time}</div>
                  <div id="stopwateringbutton" onClick={(event) => {

                      var confirmed = window.confirm("Er du sikker på at du vil stoppe vanding?")
                      
                      if (!confirmed === true) return;

                      // var pumpnumber = "+45" + pump.number
                      // var pumpstopcode = pump.stopcode
                      // sendStopSMS(pumpnumber, pumpstopcode)
                      
                      stopMachine(machine)
                      router.push("/overview")

                  }}>
                      <h4>STOP</h4>
                  </div>
              </div>
          )
        }) : <></>}
        
      </React.Fragment>} 
    </React.Fragment>  
  )
}

export async function getServerSideProps(context) {
  const resMachines = await fetch("http://localhost:3002/api/machines")
  const machines = await resMachines.json();

  const resPumps = await fetch("http://localhost:3002/api/pumps")
  const pumps = await resPumps.json();


  return {
    props: { machines: machines, pumps: pumps }, // will be passed to the page component as props
  }
}

export default overview;
