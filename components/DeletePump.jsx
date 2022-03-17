import React from 'react';
import styles from "./modal.module.css"

const DeletePump = (props) => {
    
    const RemovePump = () => {

      console.log(props.currentPump.id)
      if(props.currentPump) {
        if(props.currentPump.active == 1) {
          alert("Du kan ikke slette en aktiv pumpe")
          return
        }
  
        var temp
        var tempPumps
        fetch("/api/pumps/" + props.currentPump.id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
        }).then(
          tempPumps = [...props.pumps.filter(x => x.id != props.currentPump.id)],
          props.setPumps(tempPumps),
          temp = {...props.showingModal},
          temp.deletepump = false,
          props.setShowingModal(temp),
          )
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
                    <button className={styles.cancelmodalbutton + " " + styles.cancelpumpmodal} type="button" onClick={() => {
                      var temp = {...props.showingModal}
                      temp.deletepump = false
                      temp.pump = true
                      props.setShowingModal(temp)
                    }}>Anuller</button>
                    <button className={styles.removemodalbutton + " " + styles.removepumpmodalbutton} type="submit">Slet Pumpe</button>
                </div>
            </form>
        </div>
    )
}

export default DeletePump;