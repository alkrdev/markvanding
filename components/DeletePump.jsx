import React from 'react';
import styles from "./modal.module.css"

const DeletePump = (props) => {
    
    const RemovePump = () => {
      if(props.currentPump) {
        if(props.currentPump.active === 1) {
          alert("Du kan ikke slette en aktiv pumpe")
          return
        }
  
        // fetch("http://remote.kkpartner.dk:3001/removepump", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify(props.currentPump)
        // })

        // RELOAD?
      }
      else {
        alert("Ingen pumpe valgt")
      }
    }


    return (
        <div className={styles.modal}>
            <form className={styles.modalforms + " " + styles.removepumpmodal} onSubmit={function(event){
                event.preventDefault();
                RemovePump();
            }}>
                <h1 className={styles.labelremovemodal}>Slet {props.currentPump.name}?</h1>
                <div className={styles.modalbuttonbox}>
                    <button className={styles.cancelmodalbutton + " " + styles.cancelpumpmodal} type="button" onClick={() => props.setShowingModal(false)}>Anuller</button>
                    <button className={styles.removemodalbutton + " " + styles.removepumpmodalbutton} type="submit">Slet Pumpe</button>
                </div>
            </form>
        </div>
    )
}

export default DeletePump;