import React, {useState} from 'react';

function Phonenumbers() {

  const [data, setData] = useState([
    {machinenumber: 1, pumpname: "Bom", phonenumber: 61542121, startcode: "T"},
    {machinenumber: 2, pumpname: "Dover", phonenumber: 61741817, startcode: "T"},
    {machinenumber: 3, pumpname: "Egeris Nord", phonenumber: 42181163, startcode: "T"},
    {machinenumber: 4, pumpname: "Egeris Syd", phonenumber: 42181162, startcode: "T"},
    {machinenumber: 5, pumpname: "Grænsevej", phonenumber: 54557199, startcode: "T"},
    {machinenumber: 6, pumpname: "Hjerrild", phonenumber: 60489986, startcode: "Tx"},
    {machinenumber: 7, pumpname: "Kongeåvej", phonenumber: 51765105, startcode: "T"},
    {machinenumber: 8, pumpname: "Langtofte", phonenumber: 54557795, startcode: "T"},
    {machinenumber: 9, pumpname: "Nyvej", phonenumber: 42188548, startcode: "T"},
    {machinenumber: 10, pumpname: "Sønderskov", phonenumber: 22984242, startcode: "Tt"},
    {machinenumber: 11, pumpname: "Vesterlundgaard", phonenumber: 60487449, startcode: "T"},
    {machinenumber: 12, pumpname: "Ågård", phonenumber: 42181161, startcode: "T"}]);

  return (
    <table id="phonenumbers">
      <thead>
        <tr>
          <th>Pumpenavn</th>
          <th>Telefonnummer</th>
          <th>Startkode</th>
        </tr>
      </thead>
      <tbody>
        {data.map(function(data)
        {
          return (
            <tr key={data["machinenumber"]}>
              <td>{data["pumpname"]}</td>
              <td>{data["phonenumber"]}</td>
              <td>{data["startcode"]}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default Phonenumbers;
