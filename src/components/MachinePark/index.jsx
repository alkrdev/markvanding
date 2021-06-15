import React, {useEffect, useState} from 'react';
import { withRouter } from "react-router";

import Machines from "./Machines.jsx"
import Pumps from "./Pumps.jsx"
import Modals from "./Modals.jsx"

function MachinePark({ allMachines }){

  const [currentPump, setCurrentPump] = useState({
    name: "",
    number: "",
    startcode: "",
    stopcode: ""
  })
  const [currentMachine, setCurrentMachine] = useState({})
  
  const [allPumps, setAllPumps] = useState([])

  
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
    var na = allPumps.some(a => a.name === name.value)
    var nu = allPumps.some(a => a.number === number.value)

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

  useEffect(() => {
    let mounted = true;
    fetch("http://remote.kkpartner.dk:3001/allpumps")
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        if (mounted) {

          setAllPumps(json)   
        }  
      }).catch((error) => {
        console.log(error);
      });
  }, [])

  return(
    
    <div>
      <Pumps allPumps={allPumps} setCurrentPump={setCurrentPump}/>
      <Machines allMachines={allMachines} setCurrentMachine={setCurrentMachine}/>    
      
      <Modals currentPump={currentPump} currentMachine={currentMachine} validatePump={validatePump} allMachines={allMachines} />
    </div>
  )
}

export default withRouter(MachinePark);