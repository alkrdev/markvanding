import React, {useEffect, useState} from 'react';

function Addmachines({allPumps, allMachines}){
  const [machine, setMachine] = useState("")
  const [pump, setPump] = useState("")

  const [currentPump, setCurrentPump] = useState({
    name: "",
    number: "",
    startcode: "",
    stopcode: ""
  })
  const [currentMachine, setCurrentMachine] = useState({
  })

  const RemoveMachine = () => {
    if (machine) {
      if(machine.active == 1) {
        alert("Du kan ikke slette en aktiv maskine")
        return
      }

      fetch("http://10.10.60.161:5000/removemachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(machine)
      })
      window.location.href = "/"
    }
    else {
      alert("Ingen maskine valgt")
    }
  }

  const RemovePump = () => {
    if(pump) {
      if(pump.active == 1) {
        alert("Du kan ikke slette en aktiv pumpe")
        return
      }

      fetch("http://10.10.60.161:5000/removepump", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pump)
      })
      window.location.href = "/"
    }
    else {
      alert("Ingen pumpe valgt")
    }
  }

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
        <button className="createandupdatebuttons" type="submit">OPRET</button>
      </form>

      <form id="createmachine" onSubmit={function(event){
        event.preventDefault();
        createMachine();
      }}>
        <h2>Opret maskine</h2>
        <label>Maskine nr. </label>
        <input type="text" id="createmachineid" name="createmachineid"></input><br></br>
        <button className="createandupdatebuttons" type="submit">OPRET</button>
      </form>

      <form id="editpump" onSubmit={function(event){
        event.preventDefault();
        updatePump();
      }}>
        <h2>Find/Rediger pumpe</h2>
        <input type="text" id="findeditpumpname" name="findeditpumpname"></input><br></br>
        <button type="button" className="createandupdatebuttons" onClick={() => findEditPump()}>FIND PUMPE</button><br></br>
        <label>Pumpe navn </label>
        <input type="text" id="editpumpname" name="editpumpname" required></input><br></br>
        <label>Pumpe nummer </label>
        <input type="text" id="editpumpnumber" name="editpumpnumber" required></input><br></br>
        <label>Pumpe startcode </label>
        <input type="text" id="editpumpstartcode" name="editpumpstartcode" required></input><br></br>
        <label>Pumpe stopcode </label>
        <input type="text" id="editpumpstopcode" name="editpumpstopcode" required></input><br></br>
        <button className="createandupdatebuttons" type="submit">OPDATER</button>
      </form>

      <div className="removeselector" id="removepump">
          <label htmlFor="">Slet pumpe</label>
          <br></br>
          <select name="chosenpump" id="chosenpump" onChange={function(event){
            var options = event.target.children;
            var option = options[event.target.selectedIndex];

            setPump(allPumps.find((pump) => {
              return pump.id == option.dataset.id
            }));
          }}>
            <option selected disabled hidden></option>
            {allPumps.map(function(element) {
              return <option key={element.id} data-id={element.id}>{element.name}</option>
            })}
          </select>
          <form onSubmit={
            function(event){
              event.preventDefault()
              RemovePump()
            }
          }>
          <button className="createandupdatebuttons" type="submit">FJERN PUMPE</button>
        </form>
      </div>

      <div className="removeselector" id="removemachine">
          <label htmlFor="">Slet maskine</label>
          <br></br>
          <select name="chosenmachine" id="chosenmachine" onChange={function(event){
            var options = event.target.children;
            var option = options[event.target.selectedIndex];

            setMachine(allMachines.find((machine) => {
              return machine.id == option.dataset.id
            }));
          }}>
            <option selected disabled hidden></option>
            {allMachines.map(function(element) {
              return <option key={element.id} data-id={element.id}>{element.id}</option>
            })}
          </select>
          <form onSubmit={
            function(event){
              event.preventDefault()
              RemoveMachine()}
          }>
            <button className="createandupdatebuttons" type="submit">FJERN MASKINE</button>
          </form>
        </div>
      <form>

      </form>
    </div>
  )


}

export default Addmachines;