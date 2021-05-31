import React, { useEffect, useState } from 'react';
import Overviewstillgoing from './overviewstillgoing';
import Overviewexpired from './overviewexpired';

function Overview({activeMachines, activePumps, stopMachine, stopPump, setSubmitted, expiredMachines, stillgoingMachines}) {


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
