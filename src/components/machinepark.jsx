import React, {useEffect, useState} from 'react';

function Addmachines({allPumps, allMachines}){

  const [currentPump, setCurrentPump] = useState({
    name: "",
    number: "",
    startcode: "",
    stopcode: ""
  })
  const [currentMachine, setCurrentMachine] = useState({})
  const [nozzle, setNozzle] = useState({})
  const [model, setModel] = useState({})

  const RemoveMachine = () => {    
    const [allPumps, setAllPumps] = useState([])
    if (currentMachine) {
      if(currentMachine.active == 1) {
        alert("Du kan ikke slette en aktiv maskine")
        return
      }

      fetch("http://remote.kkpartner.dk:3001/removemachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(currentMachine)
      })
      window.location.href = "/"
    }
    else {
      alert("Ingen maskine valgt")
    }
  }

  const EditMachine = (newmachine) => {
    if(currentMachine.active == 1) {
      alert("Du kan ikke redigere en aktiv maskine")
      return
    }

    fetch("http://remote.kkpartner.dk:3001/editmachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newmachine)
    })
  }

  const UpdateMachine = () =>{

    if(currentMachine.active == 1) {
      alert("Du kan ikke redigere en aktiv maskine")
      return
    }

    fetch("http://remote.kkpartner.dk:3001/updatemachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currentMachine)
    })
   window.location.href = "/"
  }

  const RemovePump = () => {
    if(currentPump) {
      if(currentPump.active == 1) {
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

    if(currentPump.active == 1) {
      alert("Du kan ikke redigere en aktiv pumpe")
      return
    }

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
    fetch("http://remote.kkpartner.dk:3001/createpump", {
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
    window.location.href="/"
  }

  const closeModal = () => {
    var modal = document.getElementById("modal")
    modal.style.display = "none"
    var modal = document.getElementById("modal2")
    modal.style.display = "none"
    var modal = document.getElementById("modal3")
    modal.style.display = "none"
    var modal = document.getElementById("modal4")
    modal.style.display = "none"
    var modal = document.getElementById("modal5")
    modal.style.display = "none"
    var modal = document.getElementById("modal6")
    modal.style.display = "none"
  }

  return(
    <div>
      <div className="machineparktableheaders">
      <h1 className="machineparktableheaderstext">Pumper</h1>
      <h1 className="machineparktableheadersplus" onClick={() => {
        var modal = document.getElementById("modal4")
        modal.style.display ="block"
      }}>+</h1>
      </div>
      <table className="machineparktables" id="tablemachineparkpumps">
        <colgroup>
        <col style={{width: "25%"}}></col>
        <col style={{width: "25%"}}></col>
        <col style={{width: "20%"}}></col>
        <col style={{width: "20%"}}></col>
        <col style={{width: "10%"}}></col>
        </colgroup>
        <thead>
           <tr>
             <th>Navn</th>
             <th>Nummer</th>
             <th>Startkode</th>
             <th>Stopkode</th>
             <th></th>
           </tr>
        </thead>
        <tbody>
          {allPumps.map(function(data) {
            return (
              <tr key={data["id"]}>
                <td>{data["name"]}</td>
                <td>{data["number"]}</td>
                <td>{data["startcode"]}</td>
                <td>{data["stopcode"]}</td>
                <td onClick={() => {
                  setCurrentPump(data)
                  var modal = document.getElementById("modal")
                  var name = document.getElementById("editpumpname")
                  var number = document.getElementById("editpumpnumber")
                  var startcode = document.getElementById("editpumpstartcode")
                  var stopcode = document.getElementById("editpumpstopcode")
                  name.value = data.name
                  number.value = data.number
                  startcode.value = data.startcode
                  stopcode.value = data.stopcode
                  modal.style.display = "block"
                    }}>
                  <img src="https://icons-for-free.com/iconfiles/png/512/draw+edit+pen+pencil+text+write+icon-1320162307919760358.png" style={{width: 24}}></img>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      
      <div className="machineparktableheaders">
      <h1 className="machineparktableheaderstext">Maskiner</h1>
      <h1 className="machineparktableheadersplus" onClick={() => {
        var modal = document.getElementById("modal5")
        modal.style.display = "block"
      }}>+</h1>
      </div>
      <table className="machineparktables" id="tablemachineparkmachines">
        <colgroup>
        <col style={{width: "25%"}}></col>
        <col style={{width: "25%"}}></col>
        <col style={{width: "25%"}}></col>
        <col style={{width: "15%"}}></col>
        <col style={{width: "10%"}}></col>
        </colgroup>
        <thead>
           <tr>
             <th>Maskine nr.</th>
             <th>Model</th>
             <th>Dyse størrelse</th>
             <th></th>
             <th></th>
           </tr>
        </thead>
        <tbody>
          {allMachines.map(function(data) {
            return (
              <tr key={data["id"]}>
                <td>{data["id"]}</td>
                <td>{data["model"]}</td>
                <td>{data["nozzle"]}</td>
                <td></td>
                <td onClick={(event) => {
                  setCurrentMachine(allMachines.find(x => x.id === data.id))

                  var modal = document.getElementById("modal2")
                  modal.style.display = "block"
                }}>
                  <img src="https://icons-for-free.com/iconfiles/png/512/draw+edit+pen+pencil+text+write+icon-1320162307919760358.png" style={{width: 24}}></img>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="modal" id="modal">
        <form className ="modalforms" id="pumpmodal" onSubmit={function(event){
            event.preventDefault();
            updatePump();
          }}>
            <div className="modallabelbox">
              <label for="editpumpname">
              <span>Navn</span><input type="text" className="bigmodalinputs" id="editpumpname" name="editpumpname" required></input><br></br>
              </label>
              <label for="editpumpnumber">
              <span>Nummer</span><input type="text" className="modalinputs" id="editpumpnumber" name="editpumpnumber" required></input><br></br>
              </label>
              <label for="editpumpstartcode">
              <span>Startcode</span><input type="text" className="modalinputs" id="editpumpstartcode" name="editpumpstartcode" required></input><br></br>
              </label>
              <label for="editpumpstopcode">
              <span>Stopcode</span><input type="text" className="modalinputs" id="editpumpstopcode" name="editpumpstopcode" required></input><br></br>
              </label>
            </div>
            <span className="removemodalbuttonspan"></span><button className="removemodalbutton" id="removepumpbutton" type="button" onClick={function(event){
              event.preventDefault();
              var modal = document.getElementById("modal")
              modal.style.display = "none"
              var modal3 = document.getElementById("modal3")
              modal3.style.display = "block"
            }}>Slet Pumpe</button>
            <div className="modalbuttonbox">
              <button className="cancelmodalbutton" type="button" onClick={() => {closeModal()}}>Anuller</button>
              <button className="modalbuttons" id="updatemodalbutton" type="submit">Gem</button>
            </div>
        </form>
      </div>
      <div className="modal" id="modal2">
        <form className ="modalforms" id="machinemodal" onSubmit={function(event){
            event.preventDefault();

            var newDetails = {...currentMachine}

            newDetails.model = model;
            newDetails.nozzle = nozzle;

            EditMachine(newDetails);
          }}>
            <div className="modallabelbox">
              <label for ="editmachineid">
                <span>Maskine nr.</span><input type="test" readOnly="true" className="bigmodalinputs" id="editmachineid" name="editmachineid" value={currentMachine.id} required></input><br></br>
              </label>
              <label for="editmachinemodel">
              <span>Model</span><input type="text" className="modalinputs" id="editmachinemodel" name="editmachinemodel" defaultValue={currentMachine.model} onChange={e => setModel(e.target.value)}></input><br></br>
              </label>
              <label for="editmachinenozzle">
              <span>Dyse</span><input type="text" className="modalinputs" id="editmachinenozzle" name="editmachinenozzle" defaultValue={currentMachine.nozzle} onChange={e => setNozzle(e.target.value)}></input><br></br>
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
              <button className="cancelmodalbutton" type="button" onClick={() => {closeModal()}}>Anuller</button>
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
              <button className="cancelmodalbutton" id="cancelmachinemodal" type="button" onClick={() => {closeModal()}}>Anuller</button>
              <button className="removemodalbutton" id="removemachinemodalbutton" type="submit">Slet Maskine</button>
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
              <button className="cancelmodalbutton" id="cancelpumpmodal" type="button" onClick={() => {closeModal()}}>Anuller</button>
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
              <button className="cancelmodalbutton" id="closemodalbutton" type="button" onClick={() => {closeModal()}}>Anuller</button>
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
                <button className="cancelmodalbutton" id="closemodalbutton" type="button" onClick={() => {closeModal()}}>Anuller</button>
                <button className="modalbuttons" id="updatemodalbutton" type="submit">Gem</button>
            </div>
        </form>
      </div>
    </div>

    // <div id="allforms">
    //   <form className ="forms" id="createpump" onSubmit={function(event){
    //     event.preventDefault();
    //     createPump();
    //   }}>
    //     <h2>Opret pumpe</h2>
    //     <label>Pumpe navn </label>
    //     <input type="text" id="createpumpname" name="createpumpname"></input><br></br>
    //     <label>Pumpe nummer </label>
    //     <input type="text" id="createpumpnumber" name="createpumpnumber"></input><br></br>
    //     <label>Startkode </label>
    //     <input type="text" id="createpumpstartcode" name="createpumpstartcode"></input><br></br>
    //     <label>Stopkode </label>
    //     <input type="text" id="createpumpstopcode" name="createpumpstopcode"></input><br></br>
    //     <button className="createandupdatebuttons" type="submit">OPRET</button>
    //   </form>

    //   <form className ="forms" id="createmachine" onSubmit={function(event){
    //     event.preventDefault();
    //     createMachine();
    //   }}>
    //     <h2>Opret maskine</h2>
    //     <label>Maskine nr. </label>
    //     <input type="text" id="createmachineid" name="createmachineid"></input><br></br>
    //     <button className="createandupdatebuttons" type="submit">OPRET</button>
    //   </form>

    //   <form className ="forms" id="editpump" onSubmit={function(event){
    //     event.preventDefault();
    //     updatePump();
    //   }}>
    //     <h2>Find/Rediger pumpe</h2>
    //     <input type="text" id="findeditpumpname" name="findeditpumpname"></input><br></br>
    //     <button type="button" className="createandupdatebuttons" onClick={() => findEditPump()}>FIND PUMPE</button><br></br>
    //     <label>Pumpe navn </label>
    //     <input type="text" id="editpumpname" name="editpumpname" required></input><br></br>
    //     <label>Pumpe nummer </label>
    //     <input type="text" id="editpumpnumber" name="editpumpnumber" required></input><br></br>
    //     <label>Pumpe startcode </label>
    //     <input type="text" id="editpumpstartcode" name="editpumpstartcode" required></input><br></br>
    //     <label>Pumpe stopcode </label>
    //     <input type="text" id="editpumpstopcode" name="editpumpstopcode" required></input><br></br>
    //     <button className="createandupdatebuttons" type="submit">OPDATER</button>
    //   </form>


    //   <form className="forms" onSubmit={
    //     function(event){
    //       event.preventDefault()
    //       RemovePump()
    //     }
    //   }>
    //     <div className="removeselector" id="removepump">
    //       <label htmlFor="">Slet pumpe</label>
    //       <br></br>
    //       <select name="chosenpump" id="chosenpump" onChange={function(event){
    //         var options = event.target.children;
    //         var option = options[event.target.selectedIndex];

    //         setPump(allPumps.find((pump) => {
    //           return pump.id == option.dataset.id
    //         }));
    //       }}>
    //         <option selected disabled hidden></option>
    //         {allPumps.map(function(element) {
    //           return <option key={element.id} data-id={element.id}>{element.name}</option>
    //         })}
    //       </select>
          
    //       <button className="createandupdatebuttons" type="submit">FJERN PUMPE</button>
    //     </div>
    //   </form>

    //   <form className="forms" onSubmit={
    //     function(event){
    //       event.preventDefault()
    //       RemoveMachine()}
    //   }>
    //     <div className="removeselector" id="removemachine">
    //       <label htmlFor="">Slet maskine</label>
    //       <br></br>
    //       <select name="chosenmachine" id="chosenmachine" onChange={function(event){
    //         var options = event.target.children;
    //         var option = options[event.target.selectedIndex];

    //         setMachine(allMachines.find((machine) => {
    //           return machine.id == option.dataset.id
    //         }));
    //       }}>
    //         <option selected disabled hidden></option>
    //         {allMachines.map(function(element) {
    //           return <option key={element.id} data-id={element.id}>{element.id}</option>
    //         })}
    //       </select>
          
    //         <button className="createandupdatebuttons" type="submit">FJERN MASKINE</button>
          
    //     </div>
    //   </form>
    // </div>
  )


}

export default Addmachines;