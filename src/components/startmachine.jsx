import React, { useState } from 'react';

function Startmachine({setSubmitted, pumps, machines}){
  const [checked, setChecked] = useState(false)
  const [machine, setMachine] = useState("")
  const [pump, setPump] = useState("")

  function sendStartSMS(pumpnumber, pumpstartcode){
    fetch("http://remote.kkpartner.dk:3001/sendsms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        number: pumpnumber,
        message: pumpstartcode
      })
    })
  }  

  function UpdatePump(pump){

    // Set date of machine to selected date
     var tempPump = {...pump}
     
     tempPump.active = 1;
     

    fetch("http://remote.kkpartner.dk:3001/updatepump", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempPump)
    })
  }

  return(
      <form className="select" id="formstartmachine" onSubmit={function(event){
        // Prevents default behavior (Getting put at another site)
        event.preventDefault();

        // Check if Checkbox is true or false
        if(!checked) return;

        // Checks if a machine and pump is selected
        if(machine && pump){
          // MAKE MACHINE OBJECT
          UpdatePump(pump)
          
          // // // UDFYLD RIGTIG DATA TIL SMS
          // var pumpnumber = "45" + pump.number
          // var pumpstartcode = pump.startcode
          // sendStartSMS(pumpnumber, pumpstartcode)
          
          // Sets "Submitted" hook to true
          localStorage.setItem("machine", machine)
          localStorage.setItem("pump", pump.name)
          localStorage.setItem("hasstarted", "true")
          setSubmitted(true)
        };
      }}>
        <div id="choosemachine">
          <label htmlFor="chosenmachine">Vælg en maskine</label>
          <br></br>
          <select name="chosenmachine" id="chosenmachine" defaultValue="blank" onChange={function(event){
            setMachine(event.target.value);
          }}>
            <option value="blank" disabled hidden></option>
            {machines.filter(machine => machine.active == 0).map((element) => <option key={element.id}>{element.id}</option>)}
          </select>
        </div>
  
        <br></br>
  
        <div id="choosepump">
          <label htmlFor="">Vælg en pumpe</label>
          <br></br>
          <select name="chosenpump" id="chosenpump" defaultValue="blank" onChange={function(event){
            var options = event.target.children;
            var option = options[event.target.selectedIndex];

            var correctPump = pumps.find((pump) => {
              return pump.id == option.dataset.id && pump.active == 0
            })
            setPump(correctPump);
          }}>
            <option value="blank" disabled hidden></option>
            {pumps.filter(pump => pump.active == 0).map(function(element) {
              return <option key={element.id} data-id={element.id}>{element.name}</option>
            })}
          </select>
        </div>
  
        <br></br>
    
        <div id="checkboxtext">
          <h2>Tjek følgene</h2>
          </div>
          <p id="checks">1. Hydrant åben <br></br>2. Maskine er sat i gear <br></br>3. Slange korrekt placeret <br></br>4. Aflæs tiden <br></br>5. Dyse valg korrekt</p>
          <label className="container">Jeg har tjekket overstående
            <input onChange={() => setChecked(!checked)} type="checkbox"></input>
            <span className="checkmark"></span>
          </label>
    
        <button type="submit" id="buttonstartmachine">START VANDING</button>

      </form>
  );

}

export default Startmachine;