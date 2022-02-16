import React, { useState } from "react"
import styles from "./modal.module.css"

const CreateMachine = (props) => {
    const [id, setId] = useState(-1)

    const createMachine = () =>{    
        var re = new RegExp(/^[0-9]+$/)
    
        if (re.test(id.toString()) === false) {
          alert("Nummeret må kun være tal")
          return;
        }
    
        // var nu = machines.some(a => a.id === id)
        
        // if (nu === true) {
        //   alert("Maskine nummeret findes allerede")
        //   return;
        // }
    
        var tempMachine = {
          id,
          active: 0
        } 
      
        fetch("/api/machine", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(tempMachine)
        })
        
        // RELOAD?
    }

    return (        
        <div className={styles.modal}>
            <form className={styles.createmachinemodal + " " + styles.modalforms} onSubmit={function(event){
                event.preventDefault();
                createMachine();
            }}>
            <h1 className={styles.createmachinemodaltext}>Opret ny maskine</h1>
            <input type="text" className={styles.createmachineid + " " + styles.modalinputs} onChange={(e) => setId(e.target.value)} placeholder="Nr" required></input>
            <div className={styles.createmodalbuttonbox + " " + styles.modalbuttonbox}>
                <button className={styles.cancelmodalbutton} type="button" onClick={() => props.setShowingModal(false)}>Anuller</button>
                <button className={styles.modalbuttons + " " + styles.updatemodalbutton} type="submit">Gem</button>
            </div>
            </form>
        </div>
    )
}

export default CreateMachine