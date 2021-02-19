import React, { useEffect, useState } from 'react';

function Overview({activeMachines}) {

  useEffect(function() 
  {
  }, [])

  return (
    <table id="overview">
      <colgroup>
        <col style={{width: "10%"}}></col>
        <col style={{width: "20%"}}></col>
        <col style={{width: "40%"}}></col>
        <col style={{width: "20%"}}></col>
      </colgroup>
      <thead>
        <tr>
          <th>Maskine nr.</th>
          <th>Pumpe Navn</th>
          <th>Færdig</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {activeMachines.map(function(machine)
        {
          var time = new Date(machine["time"]).toLocaleString("da-DK", {
            dateStyle: "medium",
            timeStyle: "short"
          });

          console.log(machine["time"])
          
          return (
            <tr key={machine["id"]}>
              <td>{machine["id"]}</td>
              <td>{machine["pumpname"]}</td>
              <td>{time}</td>
              <td>"status"</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default Overview;
