import React, { useState } from 'react';
import styles from "./modal.module.css"

const CreatePump = (props) => {
    const [pump, setPump] = useState({
        name: "",
        number: "",
        startcode: "",
        stopcode: ""
    })

    const createPump = () =>{    
        var valid = true;

        var re = new RegExp("[0-9]{8}$")

        if (pump.number.length !== 8) {
            alert("Nummeret skal være 8 cifre langt!")
            valid = false;
        }

        if (re.test(pump.number.toString()) === false) {
            alert("Nummeret må kun være tal")
            valid = false;
        }


        if (!valid) return;
    
        // Temporary pump object that gets sent to the server to insert into the database
        var tempPump = {
            name: pump.name,
            number: pump.number,
            active: 0,
            startcode: pump.startcode,
            stopcode: pump.stopcode
        } 
        
        // // Sends tempPump to server
        // fetch("http://remote.kkpartner.dk:3001/createpump", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(tempPump)
        // })

        console.log(tempPump)
        
        // RELOAD?
    }

    return (        
        <div className={styles.modal}>
            <form className={styles.modalforms + " " + styles.createpumpmodal} onSubmit={function(event){
                event.preventDefault();
                createPump();
            }}>
                <h1 className={styles.createpumpmodaltext}>Opret ny pumpe</h1>
                <div className={styles.createpumpmodallabelbox}>
                    <input type="text" className={styles.createpumpmodalinputs} onChange={(e) => setPump({...pump, ["name"]: e.target.value})} placeholder="Navn" required></input>
                    <input type="text" className={styles.createpumpmodalinputs} onChange={(e) => setPump({...pump, ["number"]: e.target.value})} placeholder="Nummer" required></input>
                    <input type="text" className={styles.createpumpmodalinputs} onChange={(e) => setPump({...pump, ["startcode"]: e.target.value})} placeholder="Startkode" required></input>
                    <input type="text" className={styles.createpumpmodalinputs} onChange={(e) => setPump({...pump, ["stopcode"]: e.target.value})} placeholder="Stopkode" required></input>
                </div>
                <div className={styles.modalbuttonbox + " " + styles.createmodalbuttonbox}>
                    <button className={styles.cancelmodalbutton} type="button" onClick={() => props.setShowingModal(false)}>Anuller</button>
                    <button className={styles.modalbuttons + " " + styles.updatemodalbutton} type="submit">Gem</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePump;