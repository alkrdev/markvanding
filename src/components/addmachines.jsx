import React, {useEffect, useState} from 'react';

function Addmachines({allPumps, allMachines}){

  const [currentPump, setCurrentPump] = useState({
    name: "",
    number: "",
    startcode: "",
    stopcode: ""
  })
  const [currentMachine, setCurrentMachine] = useState({
  })

  const validatePump = (name, number) => {
    var re = new RegExp("[0-9]{8}$")

    if (number.value.length !== 8) {
      alert("Nummeret skal være 8 cifre langt!")
      return;
    }
    if (re.test(number.value.toString()) == false) {
      alert("Nummeret må kun være tal")
      return;
    }

    // Variables for name (na), and number (nu)
    // Checks if name and number already exists
    var na = allPumps.some(a => a.name === name.value)
    var nu = allPumps.some(a => a.number === number.value)

    // If name or number exists, make an alert with the problem, and return out / stop the function
    if (name.value !== currentPump.name){
      if (na == true){
        alert("Pumpens navn findes allerede")
        return;
      }
    }
    
    if (number.value !== currentPump.number){
      if (nu == true){
        alert("Pumpens tlf nummer findes allerede")
        return;
      }
    }
    
    if (re.test(number.value.toString()) == true) alert("Eyyy det virker");
    return true;
  }

  const findEditPump = () => {
    var findPumpName = document.getElementById("findeditpumpname");
    
    var name = document.getElementById("editpumpname");
    var number = document.getElementById("editpumpnumber");
    var startcode = document.getElementById("editpumpstartcode")
    var stopcode = document.getElementById("editpumpstopcode")

    var pump = allPumps.find((pump) => {
      return pump["name"] === findPumpName.value;
    })

    if (pump) {
      setCurrentPump(pump)
      name.value = pump.name
      number.value = pump.number
      startcode.value = pump.startcode
      stopcode.value = pump.stopcode
    } else {
      alert("Pumpen findes ikke, har du skrevet det rigtigt?")
    }
    
  }

  const updatePump = () =>{
    var name = document.getElementById("editpumpname");
    var number = document.getElementById("editpumpnumber");
    var startcode = document.getElementById("editpumpstartcode")
    var stopcode = document.getElementById("editpumpstopcode")

    var result = validatePump(name, number)
    if (result !== true) return;

    var tempPump = {
      id: currentPump.id,
      name: name.value,
      number: number.value,
      active: 0,
      startcode: startcode.value,
      stopcode: stopcode.value
    }

    fetch("http://10.10.60.161:5000/updatepump", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempPump)
    })
    window.location.href = "/"
  }

  const createPump = () =>{
    var name = document.getElementById("createpumpname")
    var number = document.getElementById("createpumpnumber")
    var startcode = document.getElementById("createpumpstartcode")
    var stopcode = document.getElementById("createpumpstopcode")

    var result = validatePump(name, number)
    if (result !== true) return;

    // Temporary pump object that gets sent to the server to insert into the database
    var tempPump = {
      name: name.value,
      number: number.value,
      active: 0,
      startcode: startcode.value,
      stopcode: stopcode.value
    } 
  
    // Sends tempPump to server
    fetch("http://10.10.60.161:5000/createpump", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempPump)
    })
    window.location.href = "/"
  }

  const createMachine = () =>{
    var id = document.getElementById("createmachineid")

    var re = new RegExp(/^[0-9]+$/)

    if (re.test(id.value.toString()) == false) {
      alert("Nummeret må kun være tal")
      return;
    }

    var nu = allMachines.some(a => a.id == id.value)
    
    if (nu == true) {
      alert("Maskine nummeret findes allerede")
      return;
    }

    if (re.test(id.value.toString()) == true) alert("Eyyy det virker");

    var tempMachine = {
      id: id.value,
      active: 0
    } 
  
    fetch("http://10.10.60.161:5000/createmachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempMachine)
    })
    window.location.href="/"
  }

  const findRemovePump = () => {
    var findPumpName = document.getElementById("findremovepumpname");
    var removePumpName = document.getElementById("removepumpname")
    
    var pump = allPumps.find((pump) => {
      return pump["name"] == findPumpName.value;
    })

    if (pump) {
      setCurrentPump(pump)
      removePumpName.value = pump.name
    } else {
      alert("Pumpen findes ikke, har du skrevet det rigtigt?")
    }
    
  }

  const removePump = () =>{
    var tempPump = {
      id: currentPump.id,
    } 

    fetch("http://10.10.60.161:5000/removepump", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempPump)
    })
  }

  const findRemoveMachine = () => {
    var findMachineId = document.getElementById("findremovemachineid");
    var removeMachineId = document.getElementById("removemachineid")

    var machine = allMachines.find((machine) => {
      return machine["id"] == findMachineId.value;
    })


    if (machine) {
      setCurrentMachine(machine)
      removeMachineId.value = machine.id
    } else {
      alert("Maskinen findes ikke, har du skrevet det rigtigt?")
    }
    
  }

  const removeMachine = () =>{
    var tempMachine = {
      id: currentMachine.id,
    } 

    fetch("http://10.10.60.161:5000/removemachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempMachine)
    })
  }

  return(
    <div>
      <form id="createpump" onSubmit={function(event){
        event.preventDefault();
        createPump();
      }}>
        <h2>Opret pumpe</h2>
        <label>Pumpe navn </label>
        <input type="text" id="createpumpname" name="createpumpname"></input><br></br>
        <label>Pumpe nummer </label>
        <input type="text" id="createpumpnumber" name="createpumpnumber"></input><br></br>
        <label>Startkode </label>
        <input type="text" id="createpumpstartcode" name="createpumpstartcode"></input><br></br>
        <label>Stopkode </label>
        <input type="text" id="createpumpstopcode" name="createpumpstopcode"></input><br></br>
        <button className="createandupdatebuttons" type="submit">Opret</button>
      </form>

      <form id="createmachine" onSubmit={function(event){
        event.preventDefault();
        createMachine();
      }}>
        <h2>Opret maskine</h2>
        <label>Maskine nr. </label>
        <input type="text" id="createmachineid" name="createmachineid"></input><br></br>
        <button className="createandupdatebuttons" type="submit">Opret</button>
      </form>

      <form id="editpump" onSubmit={function(event){
        event.preventDefault();
        updatePump();
      }}>
        <h2>Find/Rediger pumpe</h2>
        <input type="text" id="findeditpumpname" name="findeditpumpname"></input><br></br>
        <button type="button" className="createandupdatebuttons" onClick={() => findEditPump()}>Find pumpe</button><br></br>
        <label>Pumpe navn </label>
        <input type="text" id="editpumpname" name="editpumpname" required></input><br></br>
        <label>Pumpe nummer </label>
        <input type="text" id="editpumpnumber" name="editpumpnumber" required></input><br></br>
        <label>Pumpe startcode </label>
        <input type="text" id="editpumpstartcode" name="editpumpstartcode" required></input><br></br>
        <label>Pumpe stopcode </label>
        <input type="text" id="editpumpstopcode" name="editpumpstopcode" required></input><br></br>
        <button className="createandupdatebuttons" type="submit">Opdater</button>
      </form>

      <form id="removepump" onSubmit={function(event){
        event.preventDefault();
        removePump();
        window.location.href = "/"
      }}>
        <h2>Find/Slet pumpe</h2>
        <input type="text" id="findremovepumpname" name="findremovepumpname"></input><br></br>
        <button type="button" className="createandupdatebuttons" onClick={() => findRemovePump()}>Find pumpe</button><br></br>
        <label>Pumpe navn </label>
        <input type="text" id="removepumpname" name="removepumpname" disabled="disabled" required></input><br></br>
        <button className="createandupdatebuttons" type="submit">Slet</button>
      </form>

      <form id="removemachine" onSubmit={function(event){
        event.preventDefault();
        removeMachine();
        window.location.href = "/"
      }}>
        <h2>Find/Slet maskine</h2>
        <input type="text" id="findremovemachineid" name="findremovemachineid"></input><br></br>
        <button type="button" className="createandupdatebuttons" onClick={() => findRemoveMachine()}>Find maskine</button><br></br>
        <label>Maskine nr. </label>
        <input type="text" id="removemachineid" name="removemachineid" disabled="disabled" required></input><br></br>
        <button className="createandupdatebuttons" type="submit">Slet</button>
      </form>

      <form>

      </form>
    </div>
  )


}

export default Addmachines;