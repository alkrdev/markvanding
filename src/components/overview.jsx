import React, { useEffect, useState } from 'react';
import Overviewstillgoing from './OverviewStillGoing';
import Overviewexpired from './OverviewExpired';

const Overview = ({ expiredMachines, stillgoingMachines }) => {
  const [activePumps, setActivePumps] = useState([])

  const sendStopSMS = (pumpnumber, pumpStopcode) => {
    fetch("http://remote.kkpartner.dk:3001/sendsms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        number: pumpnumber,
        message: pumpStopcode
      })
    })
  }

  const StopPump = (pump) => {

    // Set date of machine to selected date
     var tempPump = {...pump}
     
     tempPump.active = 0;
     

    fetch("http://remote.kkpartner.dk:3001/updatepump", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempPump)
    })
  }

  
  const StopMachine = (machine) => {
    // Set date of machine to selected date
     var tempMachine = {...machine}
    
     tempMachine.pumpname = null
     tempMachine.time = null
     tempMachine.active = 0
     

    fetch("http://remote.kkpartner.dk:3001/updatemachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempMachine)
    })
  }

  useEffect(function() 
  { 
    fetch("http://remote.kkpartner.dk:3001/activepumps")
    .then((data) => data.json())
    .then(function(json) {
      setActivePumps(json)     
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  if (expiredMachines !== 0) {
    return (
      <div>
        <Overviewexpired expiredMachines = {expiredMachines} activePumps = {activePumps} StopMachine = {StopMachine} StopPump = {StopPump}/>
        <Overviewstillgoing stillgoingMachines = {stillgoingMachines} activePumps = {activePumps} StopMachine = {StopMachine} StopPump = {StopPump} sendStopSMS={sendStopSMS}/>
      </div>
    )
  }

  return (
    <Overviewstillgoing stillgoingMachines = {stillgoingMachines} activePumps = {activePumps} StopMachine = {StopMachine} StopPump = {StopPump} sendStopSMS={sendStopSMS}/>
  )
}

export default Overview;
