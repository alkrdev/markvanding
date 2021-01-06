import React, { useEffect, useState } from 'react';

function Overview() {

  const [data, setData] = useState([
    {machinenumber: 2, pumpname: "Åtte 2", fieldname: "Københ. 2", timeremaining: "00:14"},
    {machinenumber: 3, pumpname: "Fold. 2", fieldname: "Dover 2", timeremaining: "01:17"},
    {machinenumber: 5, pumpname: "Dover 2", fieldname: "Københ. 4", timeremaining: "02:01"},
    {machinenumber: 8, pumpname: "Fold. 1", fieldname: "Åtte 1", timeremaining: "11:25"},
    {machinenumber: 7, pumpname: "Københ. 1", fieldname: "Åtte 3", timeremaining: "12:14"},
    {machinenumber: 9, pumpname: "Københ. 2", fieldname: "Dover 3", timeremaining: "16:58"}]);

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
            <tr key={data["machinenumber"]}>
              <td>{data["machinenumber"]}</td>
              <td>{data["pumpname"]}</td>
              <td>{data["fieldname"]}</td>
              <td>{data["timeremaining"]}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default Overview;
