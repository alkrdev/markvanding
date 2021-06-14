import React, { useEffect, useState } from 'react';
import Overviewstillgoing from './overviewstillgoing';
import Overviewexpired from './overviewexpired';

function Overview({stopMachine, stopPump, setSubmitted, expiredMachines, stillgoingMachines}) {
  const [activePumps, setActivePumps] = useState([])


  function sendStopSMS(pumpnumber, pumpstopcode){
    fetch("http://10.10.51.36:5000/sendsms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        number: pumpnumber,
        message: pumpstopcode
      })
    })
  }

  useEffect(function() 
  { 
    fetch("http://10.10.51.36:5000/activepumps")
    .then(function(data) {
      return data.json();
    })
    .then(function(json) {
      setActivePumps(json)     
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  if (expiredMachines != 0) {
    return (
      <div>
        <Overviewexpired expiredMachines = {expiredMachines} activePumps = {activePumps} stopMachine = {stopMachine} stopPump = {stopPump}/>
        <Overviewstillgoing stillgoingMachines = {stillgoingMachines} activePumps = {activePumps} stopMachine = {stopMachine} stopPump = {stopPump} sendStopSMS={sendStopSMS}/>
      </div>
    )
  }

  return (
    <Overviewstillgoing stillgoingMachines = {stillgoingMachines} activePumps = {activePumps} stopMachine = {stopMachine} stopPump = {stopPump} sendStopSMS={sendStopSMS}/>
  )
}

export default Overview;
