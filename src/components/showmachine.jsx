import React, { useEffect, useState } from 'react';

function Showmachine({shownMachine, setStage, notes}) {

    const HandleClick = () => {
        setStage("maintenance")
    }
    
    const CreateNote = () => {
        var note = document.getElementById("createnoteinput")
        
        var time = new Date()

        time = time.toLocaleString("da-DK", {
            dateStyle: "short",
            timeStyle: "medium"
        });
          
        var tempTime = time.split(" ");
        var date = tempTime[0].split(".")
        tempTime[0] = date[2] + "-" + date[1] + "-" + date[0]
        time = tempTime.join(" ");

        var tempNote = {
            machineid : shownMachine.id,
            time : time,
            note : note.value
        }

        fetch("http://10.10.60.161:5000/createnote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tempNote)
        })
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
            <div id="allaboutnotes">
                <form onSubmit={(event) => {
                    event.preventDefault()
                    CreateNote()
                }}>
                    <h2 id="createnotetext">Tilføj vedligeholdelses note til maskine</h2>
                    <label>Note:</label>
                    <input id="createnoteinput" type="text" required></input>
                    <button id="createnotebutton" type="submit">Opret note</button>
                </form>
                <div id="shownotes">
                    
                </div>
            </div>
        </div>
    )
}
export default Showmachine;