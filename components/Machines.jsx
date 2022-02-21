import React, { useState, useEffect } from 'react';

import styles from "./machines.module.css"

const Machines = (props) => {  
    const [machines, setMachines] = useState([])
  
    useEffect(() => {
      fetch("/api/machines").then(res => res.json()).then(json => setMachines(json))
    }, [])

    return (
        <React.Fragment>         

            <h1>Maskiner</h1>
            <div className={styles.machineContainer}>              
                {machines ? machines.map(machine => {
                    return (
                    <div className={styles.machine} key={machine["id"]}>
                        <div>{machine["id"]}</div>
                        <div>{machine["model"]}</div>
                        <div>{machine["nozzle"]}</div>
                        <div></div>
                        <div onClick={(event) => {
                            props.setShowingModal(true)
                            props.setCurrentMachine(machines.find(x => x.id === machine.id))
                        }}>
                            <img src="https://icons-for-free.com/iconfiles/png/512/draw+edit+pen+pencil+text+write+icon-1320162307919760358.png" alt="" style={{width: 24}}></img>
                        </div>
                    </div>
                    )
                }) : <></>}
            </div>
        </React.Fragment>
    )
}

export default Machines