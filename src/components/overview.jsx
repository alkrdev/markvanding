import React, { useEffect, useState } from 'react';

function Overview({activeMachines, activePumps}) {

  useEffect(function() 
  {
  }, [])

  return (
    <table id="overview">
      <colgroup>
        <col style={{width: "10%"}}></col>
        <col style={{width: "20%"}}></col>
        <col style={{width: "40%"}}></col>
        <col style={{width: "15%"}}></col>
        <col style={{width: "5%"}}></col>
      </colgroup>
      <thead>
        <tr>
          <th>Maskine nr.</th>
          <th>Pumpe Navn</th>
          <th>Færdig</th>
          <th>Status</th>
          <th>Stop</th>
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
              <td>"status"</td>
              <td>
                <div data-machineid={machine.id} data-pumpid={pump.id} onClick={(event) => {
                  const { machineid, pumpid } = event.target.dataset

                  // IT NEVER HAPPENED
                }}></div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default Overview;
