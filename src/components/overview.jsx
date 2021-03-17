import React, { useEffect, useState } from 'react';

function Overview({activeMachines, activePumps, stopMachine, stopPump}) {

  function sendStopSMS(pumpnumber, pumpstopcode){
    fetch("http://10.10.60.161:5000/sendsms", {
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

  return (
    <table id="overview" className="sortable">
      <colgroup>
        <col style={{width: "10%"}}></col>
        <col style={{width: "24%"}}></col>
        <col style={{width: "45%"}}></col>
        <col style={{width: "10%"}}></col>
      </colgroup>
      <thead>
        <tr>
          <th>Maskine nr.</th>
          <th>Pumpe Navn</th>
          <th>Færdig</th>
          <th>Stop Vanding</th>
        </tr>
      </thead>
      <tbody>
        {activeMachines.map(function(machine)
        {
          var time = new Date(machine["time"]).toLocaleString("da-DK", {
            dateStyle: "medium",
            timeStyle: "short"
          });
          
          var pump = activePumps.find((pum) => {
            return pum.name == machine.pumpname
          })

          return (
            <tr key={machine["id"]}>
              <td>{machine["id"]}</td>
              <td>{machine["pumpname"]}</td>
              <td>{time}</td>
              <td id="stopwateringbutton" onClick={(event) => {

                  var answer = window.confirm("Hvis du vil stoppe vanding tryk OK")
                  
                  if (!answer === true) return;

                  //var pumpnumber = "+45" + pump.number
                  //var pumpstopcode = pump.stopcode
                  //sendStopSMS(pumpnumber, pumpstopcode)
                  
                  stopMachine(machine)
                  stopPump(pump)
                  window.location.href="/"
                }}>
              <p id="stopwateringbuttontext">S</p></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default Overview;
