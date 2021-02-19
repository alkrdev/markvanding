import React, { useEffect, useState } from 'react';

function Overview({activeMachines}) {

  useEffect(function() 
  {
  }, [])

  return (
    <table id="overview">
      <thead>
        <tr>
          <th>Maskine nr.</th>
          <th>Pumpe Navn</th>
          <th>Mark Navn</th>
          <th>Færdig tid (Resterende T:MIN)</th>
        </tr>
      </thead>
      <tbody>
        {data.map(function(data)
        {
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
