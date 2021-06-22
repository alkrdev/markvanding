import React, { useEffect, useState } from 'react';
import Overviewstillgoing from './OverviewStillGoing';
import Overviewexpired from './OverviewExpired';
import { withRouter } from "react-router";

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

  const StopMachine = (machine, pump) => {
    fetch("http://remote.kkpartner.dk:3001/stopmachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        machineid: machine.id,
        pumpid: pump.id
      })
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

  return (
    <div>
      {expiredMachines.length > 0 ? 
      <Overviewexpired expiredMachines = {expiredMachines} activePumps = {activePumps} StopMachine = {StopMachine} /> : <></>}
      <Overviewstillgoing stillgoingMachines = {stillgoingMachines} activePumps = {activePumps} StopMachine = {StopMachine}  sendStopSMS={sendStopSMS}/>
    </div>   
  )
}

export default withRouter(Overview);
