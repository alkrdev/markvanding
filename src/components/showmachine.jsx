import React, { useEffect, useState } from 'react';

function Showmachine({shownMachine, setStage}) {

    const HandleClick = () => {
        setStage("maintenance")
    }
    


    return(
        <div id="shownmachine">
            <button id="backbutton" onClick={HandleClick}>Tilbage</button>
            <div id="allmachineattributes">
                <div className="machineattributes">
                    <h1>Maskine nr.</h1>
                    <p>{shownMachine.id}</p>
                </div>
                <div className="machineattributes">
                    <h1>Pumpe navn</h1>
                    <p>{shownMachine.pumpname == null ? "Ingen pumpe" : shownMachine.pumpname}</p>
                </div>
                <div className="machineattributes">
                    <h1>Tid tilbage</h1>
                    <p>
                        {shownMachine.time == null ? "Ingen tid" : new Date(shownMachine["time"]).toLocaleString("da-DK", {
                            dateStyle: "medium",
                            timeStyle: "short"
                        })}
                    </p>
                </div>
                <div className="machineattributes">
                    <h1>Aktivitet</h1>
                    <p>{shownMachine.active == 0 ? "Inaktiv" : "Aktiv"}</p>
                </div>
            </div>
        </div>
    )
}
export default Showmachine;