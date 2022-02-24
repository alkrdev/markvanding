import React from 'react';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

function Machine({ query }) {

    const [machine, setMachine] = useState({})

    const HandleClick = () => {
        router.push("/maintenance")
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
            machineid : machine.id,
            time : time,
            note : note.value
        }

        fetch("http://remote.kkpartner.dk:3001/createnote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tempNote)
        })
        window.location.href = "/maintenance"
    }

    const RemoveNote = (note) => {
        if (note) {

            fetch("http://remote.kkpartner.dk:3001/removenote", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            }, body: JSON.stringify(note)
            })
            window.location.href = "/maintenance"
        }
        else {
            alert("Ingen note fundet. Dette burde ikke kunne lade sig gøre. Kontakt KKPartner med det samme")
        }
    }

    useEffect(() => {
        fetch("/api/machines/" + query.mid).then(res => res.json()).then(json => setMachine(json))
    }, [])

    var datePart = new Date(machine.time).toLocaleString("da-DK", {
        month: "short", day: "numeric"
    });
    var timePart = new Date(machine.time).toLocaleTimeString("da-DK", {
        hour: "numeric", minute: "numeric"
    }).replace("." , ":")

    return(
        <div id="shownmachine">
            <button id="backbutton" onClick={HandleClick}>Tilbage</button>
            <div id="allmachineattributes">
                <div className="machineattributes">
                    <h1 className="showmachineh1">Maskine nr.</h1>
                    <p>{machine ? machine.id : "Fejl"}</p>
                </div>
                <div className="machineattributes">
                    <h1 className="showmachineh1">Pumpe navn</h1>
                    <p>{machine ? machine.pumpname == null ? "Ingen pumpe" : machine.pumpname : "Fejl"}</p>
                </div>
                <div className="machineattributes">
                    <h1 className="showmachineh1">Tid tilbage</h1>
                    <p>
                        {machine ? machine.time == null ? "Ingen tid" : datePart + " " + timePart : "Fejl"}
                    </p>
                </div>
                <div className="machineattributes">
                    <h1 className="showmachineh1">Aktivitet</h1>
                    <p>{machine ? machine.active === 0 ? "Inaktiv" : "Aktiv" : "Fejl"}</p>
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
                    <table className="tables" id="tablenotes">
                        <colgroup>
                            <col style={{width: "10%"}}></col>
                            <col style={{width: "30%"}}></col>
                            <col style={{width: "50%"}}></col>
                            <col style={{width: "10%"}}></col>
                        </colgroup>
                        <thead>
                            <tr>
                            <th>Maskine nr.</th>
                            <th>Oprettet dato</th>
                            <th>Note</th>
                            <th>Slet note</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                        </tbody>
                    </table> 
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    return {
        props: { query: context.query }, // will be passed to the page component as props
    }
}
export default Machine;