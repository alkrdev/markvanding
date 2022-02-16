import React, { useState } from 'react';
import styles from "./modal.module.css"

const UpdatePump = (props) => {  
    const [pump, setPump] = useState(props.currentPump)  

    const updatePump = () => {
        var valid = true;
        
        var re = new RegExp("[0-9]{8}$")
    
        if (number.value.length !== 8) {
          alert("Nummeret skal være 8 cifre langt!")
          valid = false;
        }
        if (re.test(number.value.toString()) === false) {
          alert("Nummeret må kun være tal")
          valid = false;
        }

        if (!valid) return;

        // fetch("http://remote.kkpartner.dk:3001/updatepump", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(pump)
        // })
        

        // RELOAD ?
    }

    return (
        
        <div className={styles.modal}>
            <form className={styles.modalforms + " " + styles.pumpmodal} onSubmit={function(event){
                event.preventDefault();
                updatePump();
            }}>
                <div className={styles.modallabelbox}>
                    <label>
                        Navn <input type="text" className={styles.bigmodalinputs + " " + styles.editpumpname} defaultValue={props.currentPump.name} onChange={(e) => setPump({...pump, ["name"]: e.target.value})} required></input>
                    </label>
                    <label>
                        Nummer <input type="text" className={styles.modalinputs + " " + styles.editpumpnumber} defaultValue={props.currentPump.number} onChange={(e) => setPump({...pump, ["number"]: e.target.value})} required></input>
                    </label>
                    <label>
                        Startcode <input type="text" className={styles.modalinputs + " " + styles.editpumpstartcode} defaultValue={props.currentPump.startcode} onChange={(e) => setPump({...pump, ["startcode"]: e.target.value})} required></input>
                    </label>
                    <label>
                        Stopcode <input type="text" className={styles.modalinputs + " " + styles.editpumpstopcode} defaultValue={props.currentPump.stopcode} onChange={(e) => setPump({...pump, ["stopcode"]: e.target.value})} required></input>
                    </label>
                </div>

                <button className={styles.removemodalbutton + " " + styles.removepumpbutton} type="button" onClick={function(event){
                    event.preventDefault();
                }}>Slet Pumpe</button>

                <div className={styles.modalbuttonbox}>
                    <button className={styles.cancelmodalbutton} type="button" onClick={() => props.setShowingModal(false)}>Anuller</button>
                    <button className={styles.modalbuttons + " " + styles.updatemodalbutton} type="submit">Gem</button>
                </div>
            </form>
        </div>
    )
}

export default UpdatePump;