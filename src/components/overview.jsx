import React from 'react';
import Overviewstillgoing from './OverviewStillgoing';
import Overviewexpired from './OverviewExpired';
import { withRouter } from "react-router";

const Overview = ({ machines, pumps }) => {

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

  return (
    <div>
      
      <Overviewexpired machines={machines} pumps={pumps} StopMachine = {StopMachine} />
      <Overviewstillgoing machines={machines} pumps={pumps} StopMachine = {StopMachine} sendStopSMS={sendStopSMS}/>
    </div>   
  )
}

export default withRouter(Overview);
