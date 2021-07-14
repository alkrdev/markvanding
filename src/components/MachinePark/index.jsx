import React, {useEffect, useState} from 'react';
import { withRouter } from "react-router";

import Machines from "./Machines.jsx"
import Pumps from "./Pumps.jsx"
import Modals from "./Modals.jsx"

function MachinePark({ machines, pumps }){

  const [currentPump, setCurrentPump] = useState({
    name: "",
    number: "",
    startcode: "",
    stopcode: ""
  })
  const [currentMachine, setCurrentMachine] = useState({})
  
  const validatePump = (name, number) => {
    var re = new RegExp("[0-9]{8}$")

    if (number.value.length !== 8) {
      alert("Nummeret skal være 8 cifre langt!")
      return;
    }
    if (re.test(number.value.toString()) === false) {
      alert("Nummeret må kun være tal")
      return;
    }

    // Variables for name (na), and number (nu)
    // Checks if name and number already exists
    var na = pumps.some(a => a.name === name.value)
    var nu = pumps.some(a => a.number === number.value)

    // If name or number exists, make an alert with the problem, and return out / stop the function
    if (name.value !== currentPump.name){
      if (na === true){
        alert("Pumpens navn findes allerede")
        return;
      }
    }
    
    if (number.value !== currentPump.number){
      if (nu === true){
        alert("Pumpens tlf nummer findes allerede")
        return;
      }
    }
    
    return true;
  }

  return(
    
    <div>
      <Pumps pumps={pumps} setCurrentPump={setCurrentPump}/>
      <Machines machines={machines} setCurrentMachine={setCurrentMachine}/>    
      
      <Modals currentPump={currentPump} currentMachine={currentMachine} validatePump={validatePump} machines={machines} />
    </div>
  )
}

export default withRouter(MachinePark);