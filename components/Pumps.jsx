import React, { useState, useEffect } from 'react';

import styles from "./pumps.module.css"

const Pumps = (props) => {
    const [pumps, setPumps] = useState([]) 
    
    const setInactivePump = (id) => {    
        // fetch("http://remote.kkpartner.dk:3001/setinactivepump", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({ id })
        // })
        // RELOAD?
    }
  
    useEffect(() => {
      fetch("/api/pumps").then(res => res.json()).then(json => setPumps(json))
    }, [])

    return (
        
        <React.Fragment>
            <h1>Pumper</h1>
            <div className={styles.pumpContainer}>              
                {pumps ? pumps.map(function(pump) {
                    return (
                        <div className={styles.pump} key={pump["id"]}>
                            <div>{pump["name"]}</div>
                            <div>{pump["number"]}</div>
                            <div>{pump["startcode"]}</div>
                            <div>{pump["stopcode"]}</div>
                            <div onClick={() => {
                                props.setCurrentPump(pump)
                                props.setShowingModal(true)
                            }}>
                                <img src="https://icons-for-free.com/iconfiles/png/512/draw+edit+pen+pencil+text+write+icon-1320162307919760358.png" alt="" style={{width: 24}}></img>
                            </div>
                            <div id="setinactive" onClick={() => {
                                var answer = window.confirm("Hvis du vil sætte " + pump.name + " til Inaktiv")
                        
                                if (!answer === true) return;
                                setInactivePump(pump["id"])
                            }}>Gør Inaktiv</div>
                        </div>
                    )
                }) : <></>} 
            </div>  
        </React.Fragment>
    )
}

export default Pumps;