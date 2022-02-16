import React, { useState } from 'react';
import styles from "./modal.module.css"

const UpdateMachine = (props) => {
    const [model, setModel] = useState("")

    const updateMachine = () =>{    
        if (props.currentMachine.active === 1) {
            alert("Du kan ikke rette en aktiv maskine")
            return;
        }

        var tempMachine = {...props.currentMachine}

        tempMachine.model = model

        // fetch("http://remote.kkpartner.dk:3001/editmachine", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(tempMachine)
        // })

        // RELOAD?        
    }

    return (
        
        <div className={styles.modal}>
            <form className={styles.modalforms + " " + styles.machinemodal} onSubmit={function(event){
                event.preventDefault();
                updateMachine();
            }}>
                <div className={styles.modallabelbox}>
                    <label>
                        Maskine nr.<input type="test" readOnly={true} className={styles.bigmodalinputs + " " + styles.editmachineid} value={props.currentMachine.id} required></input>
                    </label>
                    <label>
                        Model <input type="text" className={styles.modalinputs + " " + styles.editmachinemodel} onChange={e => setModel(e.target.value)} defaultValue={props.currentMachine.model}></input>
                    </label>
                </div>

                <button className={styles.removemodalbutton + " " + styles.removemachinebutton} type="button">Slet Maskine</button>

                <div className={styles.modalbuttonbox}>
                    <button className={styles.cancelmodalbutton} type="button" onClick={() => props.setShowingModal(false)}>Anuller</button>
                    <button className={styles.modalbuttons + " " + styles.updatemodalbutton} type="submit">Gem</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateMachine;