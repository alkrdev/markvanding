import React, { useState } from "react"
import styles from "./modal.module.css"

const CreateMachine = (props) => {
  const [machine, setMachine] = useState({
    id: -1,
    model: "",
    nozzle: ""
  })

  const createMachine = () =>{    
      var re = new RegExp(/^[0-9]+$/)
  
      if (re.test(machine.id.toString()) === false) {
        alert("Nummeret må kun være tal")
        return;
      }
  
      // var nu = machines.some(a => a.id === id)
      
      // if (nu === true) {
      //   alert("Maskine nummeret findes allerede")
      //   return;
      // }
  
      var tempMachine = {
        pumpname: undefined,
        time: undefined,
        active: 0,
        nozzle: machine.nozzle,
        model: machine.model
      } 
    
      var temp
      var tempMachines = [...props.machines]
      fetch("/api/machines" + props.currentMachine.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tempMachine)
      }).then(
        tempMachines.push(tempMachine),
        props.setMachines(tempMachines),
        temp = {...props.showingModal},
        temp.createmachine = false,
        props.setShowingModal(temp)
      )
    }

    return (        
        <div className={styles.modal}>
            <form className={styles.createmachinemodal + " " + styles.modalforms} onSubmit={(event) => {
                event.preventDefault();
                createMachine();
            }}>
            <h1 className={styles.createmachinemodaltext}>Opret ny maskine</h1>
            <input type="text" className={styles.createmodalinputs} onChange={(e) => setMachine({...machine, ["id"]: e.target.value})} placeholder="Nr" required></input>
            <input type="text" className={styles.createmodalinputs} onChange={(e) => setMachine({...machine, ["model"]: e.target.value})} placeholder="Model" required></input>
            <input type="text" className={styles.createmodalinputs} onChange={(e) => setMachine({...machine, ["nozzle"]: e.target.value})} placeholder="Dyse" required></input>
            <div className={styles.createmodalbuttonbox + " " + styles.modalbuttonbox} style={{ marginTop: "20px" }}>
                <button className={styles.cancelmodalbutton} type="button" onClick={() => {
                  var temp = {...props.showingModal}
                  temp.createmachine = false
                  props.setShowingModal(temp)
                }}>Anuller</button>
                <button className={styles.modalbuttons + " " + styles.updatemodalbutton} type="submit">Gem</button>
            </div>
            </form>
        </div>
    )
}

export default CreateMachine