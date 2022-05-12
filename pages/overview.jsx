import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Header from "./../components/Header";

import machinestyles from "./../components/machines.module.css"
import pumpstyles from "./../components/pumps.module.css"
import Head from "next/head";


const Overview = () => {
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

  const stopMachine = (machine) => {
    fetch("/api/machines/stop/" + machine.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(machine)
    }).then(res => res.json()).then(json => setMachines(json))
  }

  useEffect(() => {
    fetch("/api/machines").then(res => res.json()).then(json => setMachines(json))
    fetch("/api/pumps").then(res => res.json()).then(json => setPumps(json))
  }, [])

  return (
      <React.Fragment>
        <Header />      
        <h1 className={machinestyles.tableLabel}>Færdige vandinger</h1>
        <div className={machinestyles.machineContainer}>

          {machines ? machines.filter(machine => new Date() > new Date(machine.time) && machine.active == 1).map(function(machine) {
                var datePart = new Date(machine["time"]).toLocaleString("da-DK", {
                  month: "short", day: "numeric"
                });
                var timePart = new Date(machine["time"]).toLocaleTimeString("da-DK", {
                  hour: "numeric", minute: "numeric"
                }).replace("." , ":")


                return (
                <div className={machinestyles.machine} key={machine["id"]}>
                  <div className={machinestyles.mainContainer}>
                    <div style={{height: "198px"}} className={machinestyles.dataContainer}>
                      <div>
                        <div className={machinestyles.header}>Maskine</div>
                        <div>{machine["id"]}</div>
                      </div>
                      <div>
                        <div className={machinestyles.header}>Pumpe</div>
                        <div>{machine["pumpname"]}</div>
                      </div>
                      <div>
                        <div className={machinestyles.header}>Færdig</div>
                        <div>{datePart + " " + timePart}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: "#DF4848", height: "200px", width: "80px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <div style={{ position: "absolute" }}>Inaktiv</div>
                    <div style={{ background: "darkorange" }} id="stopwateringbutton" onClick={(event) => {
                      var confirmed = window.confirm("Er du sikker på at du vil stoppe vanding?")
                      
                      if (!confirmed === true) return;

                      stopMachine(machine)
                      router.push("/overview")
                    }}>
                      <h4>FJERN</h4>
                    </div>
                  </div>
                </div>
                )
            }) : <></>}
        </div>

        <h1 className={machinestyles.tableLabel}>Aktive vandinger</h1>
        <div className={pumpstyles.pumpContainer}>
          {machines ? machines.filter(machine => new Date() < new Date(machine.time) && machine.active == 1).map(function(machine) {
            var datePart = new Date(machine["time"]).toLocaleString("da-DK", {
              month: "short", day: "numeric"
            });
            var timePart = new Date(machine["time"]).toLocaleTimeString("da-DK", {
              hour: "numeric", minute: "numeric"
            }).replace("." , ":")
            
            return (
                <div className={machinestyles.machine} key={machine["id"]}>
                  <div className={machinestyles.mainContainer}>
                    <div style={{height: "198px"}} className={machinestyles.dataContainer}>
                      <div>
                        <div className={machinestyles.header}>Maskine</div>
                        <div>{machine["id"]}</div>
                      </div>
                      <div>
                        <div className={machinestyles.header}>Pumpe</div>
                        <div>{machine["pumpname"]}</div>
                      </div>
                      <div>
                        <div className={machinestyles.header}>Færdig</div>
                        <div>{datePart + " " + timePart}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{background: "#42CB6B", height: "200px", width: "80px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <div style={{position: "absolute"}}>Aktiv</div>
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
                </div>
            )
          }) : <></>}
        </div>
          
      </React.Fragment>
  )
}

export default Overview;
