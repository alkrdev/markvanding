import React from 'react';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

function Machine({ query }) {
    const [machine, setMachine] = useState({})
    const [note, setNote] = useState("")
    const [notes, setNotes] = useState([])

    const router = useRouter();

    const HandleClick = () => {
        router.push("/maintenance")
    }
    
    const CreateNote = () => {
        if (note == "") return;  

        fetch(`/api/machines/note/${machine.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: note
            })
        }).then(res => res.json()).then(json => {
            setNotes(json.maintenances)
            setMachine(json)
        })
    }

    const DeleteNote = (note) => {
        fetch(`/api/machines/note/${machine.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                id: note.id
            })
        }).then(res => res.json()).then(json => {            
            setNotes(json.maintenances)
            setMachine(json)
        })
    }

    useEffect(() => {
        fetch("/api/machines/" + query.mid)
            .then(res => res.json())
            .then(json => {
                setNotes(json.maintenances)
                setMachine(json)
            })
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
                    event.target.reset();
                    CreateNote()
                }}>
                    <h2 id="createnotetext">Tilføj vedligeholdelses note til maskine</h2>
                    <label>Note:</label>
                    <input id="createnoteinput" type="text" required onChange={(e) => setNote(e.target.value)}></input>
                    <button id="createnotebutton" type="submit">Opret note</button>
                </form>
                <div id="shownotes">
                    {notes ? notes.map((note, index) => {
                        return <div key={index}>
                            <div>{note.note}</div>
                            <button onClick={() => DeleteNote(note)}>X</button>
                        </div>
                    }) : <></>}
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