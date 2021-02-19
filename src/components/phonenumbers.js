import React, {useState} from 'react';

function Phonenumbers({allPumps}) {

  const [data, setData] = useState([]);

  return (
    <table id="phonenumbers">
      <thead>
        <tr>
          <th>Pumpe Navn</th>
          <th>Pumpe Nummer</th>
          <th>Startkode</th>
          <th>Stopkode</th>
        </tr>
      </thead>
      <tbody>
        {allPumps.map(function(data)
        {
          return (
            <tr key={data["id"]}>
              <td>{data["name"]}</td>
              <td>{data["number"]}</td>
              <td>{data["startcode"]}</td>
              <td>{data["stopcode"]}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default Phonenumbers;
