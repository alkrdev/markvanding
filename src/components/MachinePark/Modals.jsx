import React, {useState} from "react";
import { withRouter } from "react-router";

const Modals = ({ currentPump, currentMachine, validatePump, allMachines, history }) => {
    const [model, setModel] = useState({})

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
    
        var nu = allMachines.some(a => a.id === id.value)
        
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
    


    return(
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
    )
}

export default withRouter(Modals);