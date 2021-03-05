import React, {useEffect, useState} from 'react';

function Addmachines({allPumps}){

  const [currentPump, setCurrentPump] = useState({
    name: "",
    number: "",
    startcode: "",
    stopcode: ""
  })

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

    var tempPump = {
      id: currentPump.id,
      name: name.value,
      number: number.value,
      active: 0,
      startcode: startcode.value,
      stopcode: stopcode.value
    }

    fetch("http://192.168.1.70:5000/updatepump", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempPump)
    })
    
  }

  const createPump = () =>{
    var name = document.getElementById("createpumpname")
    var number = document.getElementById("createpumpnumber")
    var startcode = document.getElementById("createpumpstartcode")
    var stopcode = document.getElementById("createpumpstopcode")

    var tempPump = {
      name: name.value,
      number: number.value,
      active: 0,
      startcode: startcode.value,
      stopcode: stopcode.value
    } 
  
    fetch("http://192.168.1.70:5000/createpump", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempPump)
    })
  
  }

  const createMachine = () =>{
    var id = document.getElementById("createmachineid")

    var tempMachine = {
      id: id.value,
      active: 0
    } 
  
    fetch("http://192.168.1.70:5000/createmachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempMachine)
    })
  
  }

  const findRemovePump = () => {
    var findPumpName = document.getElementById("findremovepumpname");
    var removePumpName = document.getElementById("removepumpname")
    
    var pump = allPumps.find((pump) => {
      return pump["name"] === findPumpName.value;
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

    fetch("http://192.168.1.70:5000/removepump", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempPump)
    })
  }

  const findRemoveMachine = () => {
    var findPumpName = document.getElementById("findremovepumpname");
    var removePumpName = document.getElementById("removepumpname")
    
    var pump = allPumps.find((pump) => {
      return pump["name"] === findPumpName.value;
    })

    if (pump) {
      setCurrentPump(pump)
      removePumpName.value = pump.name
    } else {
      alert("Pumpen findes ikke, har du skrevet det rigtigt?")
    }
    
  }

  const removePump = () =>{
    var tempMachine = {
      id: currentPump.id,
    } 

    fetch("http://192.168.1.70:5000/removemachine", {
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
        window.location.href = "/"
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
        <button id="createPumpButton" type="submit">Opret</button>
      </form>

      <form id="createmachine" onSubmit={function(event){
        event.preventDefault();
        createMachine();
        window.location.href = "/"
      }}>
        <h2>Opret maskine</h2>
        <label>Maskine nr. </label>
        <input type="text" id="createmachineid" name="createmachineid"></input><br></br>
        <button id="createmachinebutton" type="submit">Opret</button>
      </form>

      <form id="editpump" onSubmit={function(event){
        event.preventDefault();
        updatePump();
        window.location.href = "/"
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
        <button id="updatePumpButton" type="submit">Opdater</button>
      </form>

      <form id="removepump" onSubmit={function(event){
        event.preventDefault();
        removePump();
        window.location.href = "/"
      }}>
        <h2>Find/Rediger pumpe</h2>
        <input type="text" id="findremovepumpname" name="findremovepumpname"></input><br></br>
        <button type="button" className="createandupdatebuttons" onClick={() => findRemovePump()}>Find pumpe</button><br></br>
        <label>Pumpe navn </label>
        <input type="text" id="removepumpname" name="removepumpname" required></input><br></br>
        <button id="removepumpbutton" type="submit">Slet</button>
      </form>

      <form id="removemachine" onSubmit={function(event){
        event.preventDefault();
        removeMachine();
        window.location.href = "/"
      }}>
        <h2>Find/Rediger pumpe</h2>
        <input type="text" id="findremovemachineid" name="findremovemachineid"></input><br></br>
        <button type="button" className="createandupdatebuttons" onClick={() => findRemovePump()}>Find pumpe</button><br></br>
        <label>Pumpe navn </label>
        <input type="text" id="removepumpname" name="removepumpname" required></input><br></br>
        <button id="removepumpbutton" type="submit">Slet</button>
      </form>

      <form>

      </form>
    </div>
  )


}

export default Addmachines;