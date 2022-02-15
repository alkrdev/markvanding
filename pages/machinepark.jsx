import React, {useEffect, useState} from 'react';

import Header from "../components/Header"


function MachinePark(){

  const [currentPump, setCurrentPump] = useState({
    name: "",
    number: "",
    startcode: "",
    stopcode: ""
  })
  const [currentMachine, setCurrentMachine] = useState({})

  
  const [machines, setMachines] = useState([])
  const [pumps, setPumps] = useState([])

  const RemoveMachine = () => {    
    if (currentMachine) {
      if(currentMachine.active === 1) {
        alert("Du kan ikke slette en aktiv maskine")
        return
      }

      fetch("http://remote.kkpartner.dk:3001/removemachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(currentMachine)
      })
      window.location.href = "/machinepark"
    }
    else {
      alert("Ingen maskine valgt")
    }
  }

  const UpdateMachine = () =>{    
    if (currentMachine.active === 1) {
      alert("Du kan ikke rette en aktiv maskine")
      return;
    }

    var tempMachine = {...currentMachine}

    tempMachine.model = model;

    fetch("http://remote.kkpartner.dk:3001/editmachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempMachine)
    })
    CloseAllModals();
    window.location.href = "/machinepark" 
    
  }

  const RemovePump = () => {
    if(currentPump) {
      if(currentPump.active === 1) {
        alert("Du kan ikke slette en aktiv pumpe")
        return
      }

      fetch("http://remote.kkpartner.dk:3001/removepump", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(currentPump)
      })
      window.location.href = "/machinepark"
    }
    else {
      alert("Ingen pumpe valgt")
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

    fetch("http://remote.kkpartner.dk:3001/updatepump", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempPump)
    })
    window.location.href = "/machinepark"
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
    fetch("http://remote.kkpartner.dk:3001/createpump", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempPump)
    })
    window.location.href = "/machinepark"
  }

  const createMachine = () =>{
    var id = document.getElementById("createmachineid")

    var re = new RegExp(/^[0-9]+$/)

    if (re.test(id.value.toString()) === false) {
      alert("Nummeret må kun være tal")
      return;
    }

    var nu = machines.some(a => a.id === id.value)
    
    if (nu === true) {
      alert("Maskine nummeret findes allerede")
      return;
    }

    var tempMachine = {
      id: id.value,
      active: 0
    } 
  
    fetch("http://remote.kkpartner.dk:3001/createmachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempMachine)
    })
    window.location.href="/machinepark"
  }

  const CloseAllModals = () => {
    var modals = document.querySelectorAll(".modal")
    for (let i = 0; i < modals.length; i++) {
      const modal = modals[i];
      modal.style.display = "none"      
    }
  }
  
  const validatePump = (name, number) => {
    var re = new RegExp("[0-9]{8}$")

    if (number.value.length !== 8) {
      alert("Nummeret skal være 8 cifre langt!")
      return;
    }
    if (re.test(number.value.toString()) === false) {
      alert("Nummeret må kun være tal")
      return;
    }

    // Variables for name (na), and number (nu)
    // Checks if name and number already exists
    var na = pumps.some(a => a.name === name.value)
    var nu = pumps.some(a => a.number === number.value)

    // If name or number exists, make an alert with the problem, and return out / stop the function
    if (name.value !== currentPump.name){
      if (na === true){
        alert("Pumpens navn findes allerede")
        return;
      }
    }
    
    if (number.value !== currentPump.number){
      if (nu === true){
        alert("Pumpens tlf nummer findes allerede")
        return;
      }
    }
    
    return true;
  }

  
  const setInactivePump = (data) => {
    var tempPump = {}
    tempPump.id = data

    fetch("http://remote.kkpartner.dk:3001/setinactivepump", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tempPump)
    })
    window.location.href = "/machinepark"
  }

  useEffect(() => {
    fetch("/api/machines").then(res => res.json()).then(json => setMachines(json))
    fetch("/api/pumps").then(res => res.json()).then(json => setPumps(json))
  }, [])

  const SpecificStyles = {
    pump: {        
      width: "300px",
      height: "200px",
    },
    machine: {        
      width: "300px",
      height: "200px",
    },
    pumpContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
    },
    machineContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
    }
  }

  return(    
    <div>
      <Header /> 
      
            <h1>Pumper</h1>
            <div style={SpecificStyles.pumpContainer}>              
              {pumps ? pumps.map(function(data) {
                  return (
                      <div style={SpecificStyles.pump} key={data["id"]}>
                          <div>{data["name"]}</div>
                          <div>{data["number"]}</div>
                          <div>{data["startcode"]}</div>
                          <div>{data["stopcode"]}</div>
                          <div onClick={() => {
                              setCurrentPump(data)
                              var modal = document.getElementById("modal1")
                              modal.style.display = "block"
                          }}>
                          <img src="https://icons-for-free.com/iconfiles/png/512/draw+edit+pen+pencil+text+write+icon-1320162307919760358.png" alt="" style={{width: 24}}></img>
                          </div>
                          <div id="setinactive" onClick={() => {
                              var answer = window.confirm("Hvis du vil sætte " + data.name + " til Inaktiv")
                      
                              if (!answer === true) return;
                              setInactivePump(data["id"])
                          }}>Gør Inaktiv</div>
                      </div>
                  )
              }) : <></>} 
            </div>  

            <h1>Maskiner</h1>
            <div style={SpecificStyles.machineContainer}>              
              {machines ? machines.map(machine => {
                  return (
                  <div style={SpecificStyles.machine} key={machine["id"]}>
                      <div>{machine["id"]}</div>
                      <div>{machine["model"]}</div>
                      <div>{machine["nozzle"]}</div>
                      <div></div>
                      <div onClick={(event) => {
                          setCurrentMachine(machines.find(x => x.id === machine.id))

                          var modal = document.getElementById("modal2")
                          modal.style.display = "block"
                      }}>
                          <img src="https://icons-for-free.com/iconfiles/png/512/draw+edit+pen+pencil+text+write+icon-1320162307919760358.png" alt="" style={{width: 24}}></img>
                      </div>
                  </div>
                  )
              }) : <></>}
            </div>
      
        <React.Fragment>
            <div className="modal" id="modal1">
                <form className ="modalforms" id="pumpmodal" onSubmit={function(event){
                    event.preventDefault();
                    updatePump();
                }}>
                    <div className="modallabelbox">
                    <label htmlFor="editpumpname">
                    <span>Navn</span><input type="text" className="bigmodalinputs" id="editpumpname" name="editpumpname" defaultValue={currentPump.name} required></input><br></br>
                    </label>
                    <label htmlFor="editpumpnumber">
                    <span>Nummer</span><input type="text" className="modalinputs" id="editpumpnumber" name="editpumpnumber" defaultValue={currentPump.number} required></input><br></br>
                    </label>
                    <label htmlFor="editpumpstartcode">
                    <span>Startcode</span><input type="text" className="modalinputs" id="editpumpstartcode" name="editpumpstartcode" defaultValue={currentPump.startcode} required></input><br></br>
                    </label>
                    <label htmlFor="editpumpstopcode">
                    <span>Stopcode</span><input type="text" className="modalinputs" id="editpumpstopcode" name="editpumpstopcode" defaultValue={currentPump.stopcode} required></input><br></br>
                    </label>
                    </div>

                    <span className="removemodalbuttonspan"></span>

                    <button className="removemodalbutton" id="removepumpbutton" type="button" onClick={function(event){
                    event.preventDefault();
                    CloseAllModals();
                    var modal3 = document.getElementById("modal3")
                    modal3.style.display = "block"
                    }}>Slet Pumpe</button>

                    <div className="modalbuttonbox">
                    <button className="cancelmodalbutton" type="button" onClick={CloseAllModals}>Anuller</button>
                    <button className="modalbuttons" id="updatemodalbutton" type="submit">Gem</button>
                    </div>
                </form>
            </div>
            <div className="modal" id="modal2">
                <form className ="modalforms" id="machinemodal" onSubmit={function(event){
                    event.preventDefault();
                    UpdateMachine();
                }}>
                    <div className="modallabelbox">
                    <label htmlFor="editmachineid">
                        <span>Maskine nr.</span><input type="test" readOnly={true} className="bigmodalinputs" id="editmachineid" name="editmachineid" defaultValue={currentMachine.id} required></input><br></br>
                    </label>
                    <label htmlFor="editmachinemodel">
                    <span>Model</span><input type="text" className="modalinputs" id="editmachinemodel" name="editmachinemodel" onChange={e => setModel(e.target.value)} defaultValue={currentMachine.model}></input><br></br>
                    </label>
                    </div>
                    <span className="removemodalbuttonspan"></span><button className="removemodalbutton" id="removemachinebutton" type="button" onClick={function(event){
                        event.preventDefault();
                        var modal = document.getElementById("modal2")
                        modal.style.display = "none"
                        var modal6 = document.getElementById("modal6")
                        modal6.style.display = "block"
                    }}>Slet Maskine</button>
                    <div className="modalbuttonbox">
                    <button className="cancelmodalbutton" type="button" onClick={CloseAllModals}>Anuller</button>
                    <button className="modalbuttons" id="updatemodalbutton" type="submit">Gem</button>
                    </div>
                </form>
            </div>
            <div className="modal" id="modal3">
                <form className ="modalforms" id="removepumpmodal" onSubmit={function(event){
                    event.preventDefault();
                    RemovePump();
                }}>
                    <h1 className="labelremovemodal">Slet {currentPump.name}?</h1>
                    <div className="modalbuttonbox">
                    <button className="cancelmodalbutton" id="cancelpumpmodal" type="button" onClick={CloseAllModals}>Anuller</button>
                    <button className="removemodalbutton" id="removepumpmodalbutton" type="submit">Slet Pumpe</button>
                    </div>
                </form>
            </div>
            <div className="modal" id="modal4">
                <form className ="modalforms" id="createpumpmodal" onSubmit={function(event){
                    event.preventDefault();
                    createPump();
                }}>
                    <h1 id="createpumpmodaltext">Opret ny pumpe</h1>
                    <div id="createpumpmodallabelbox">
                    <input type="text" className="bigmodalinputs" id="createpumpname" name="createpumpname" placeholder="Navn" required></input><br></br>
                    <input type="text" className="createpumpmodalinputs" id="createpumpnumber" name="createpumpnumber" placeholder="Nummer" required></input><br></br>
                    <input type="text" className="createpumpmodalinputs" id="createpumpstartcode" name="createpumpstartcode" placeholder="Startkode" required></input><br></br>
                    <input type="text" className="createpumpmodalinputs" id="createpumpstopcode" name="createpumpstopcode" placeholder="Stopkode" required></input><br></br>
                    </div>
                    <div className="modalbuttonbox" id="createpumpmodalbuttonbox">
                    <button className="cancelmodalbutton" id="closemodalbutton" type="button" onClick={CloseAllModals}>Anuller</button>
                    <button className="modalbuttons" id="updatemodalbutton" type="submit">Gem</button>
                    </div>
                </form>
            </div>
            <div className="modal" id="modal5">
                <form className ="modalforms" id="createmachinemodal" onSubmit={function(event){
                event.preventDefault();
                createMachine();
                }}>
                <h1 id="createmachinemodaltext">Opret ny maskine</h1>
                    <input type="text" className="modalinputs" id="createmachineid" name="createmachineid" placeholder="Nr" required></input><br></br>
                    <div className="modalbuttonbox" id="createpumpmodalbuttonbox">
                    <button className="cancelmodalbutton" id="closemodalbutton" type="button" onClick={CloseAllModals}>Anuller</button>
                    <button className="modalbuttons" id="updatemodalbutton" type="submit">Gem</button>
                </div>
                </form>
            </div>
            <div className="modal" id="modal6">
                <form className ="modalforms" id="removemachinemodal" onSubmit={function(event){
                    event.preventDefault();
                    RemoveMachine();
                }}>
                    <h1 className="labelremovemodal">Slet maskine {currentMachine.id}?</h1>
                    <div className="modalbuttonbox">
                    <button className="cancelmodalbutton" id="cancelmachinemodal" type="button" onClick={CloseAllModals}>Anuller</button>
                    <button className="removemodalbutton" id="removemachinemodalbutton" type="submit">Slet Maskine</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    </div>
  )
}

export default MachinePark;