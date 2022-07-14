import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import EditNote from "../../components/EditNote"
import DeleteNote from "../../components/DeleteNote"
import Header from "../../components/Header"

function Machine({ query }) {
    const [machine, setMachine] = useState({})
    const [note, setNote] = useState("")
    const [notes, setNotes] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [passNote, setPassNote] = useState({})
    const maxCharacters = 190

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
            setNote("")
        })
    }

    const ShowNote = (note) => {
        setPassNote(note)
        setShowModal(true)
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
        <div>
            <Header />
            <div className="flex m-auto flex-col">
                <button className="w-24 bg-gray-900 rounded-md text-white text-lg no-underline p-2 border-none m-6" onClick={HandleClick}>Tilbage</button>
                <div className="flex flex-row flex-wrap justify-center m-auto">
                    <div className="flex flex-wrap flex-col w-64 justify-center m-2 border-black border-0 border-solid">
                        <h1 className="border-black border-0 border-solid">Maskine nr.</h1>
                        <p className="text-xl pt-2 pb-2">{machine ? machine.id : "Fejl"}</p>
                    </div>
                    <div className="flex flex-wrap flex-col w-64 justify-center m-2 border-black border-0 border-solid">
                        <h1 className="border-black border-0 border-solid">Pumpe navn</h1>
                        <p className="text-xl pt-2 pb-2">{machine ? machine.pumpname == null ? "Ingen pumpe" : machine.pumpname : "Fejl"}</p>
                    </div>
                    <div className="flex flex-wrap flex-col w-64 justify-center m-2 border-black border-0 border-solid">
                        <h1 className="border-black border-0 border-solid">Tid tilbage</h1>
                        <p className="text-xl pt-2 pb-2">{machine ? machine.time == null ? "Ingen tid" : datePart + " " + timePart : "Fejl"}</p>
                    </div>
                    <div className="flex flex-wrap flex-col w-64 justify-center m-2 border-black border-0 border-solid">
                        <h1 className="border-black border-0 border-solid">Aktivitet</h1>
                        <p className="text-xl pt-2 pb-2">{machine ? machine.active == 0 ? "Inaktiv" : "Aktiv" : "Fejl"}</p>
                    </div>
                </div>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        CreateNote()
                    }}>
                        <h2 className="border-b-2 border-black mt-6">Tilføj vedligeholdelses note til maskine</h2>
                        <div className="flex justify-center items-stretch gap-x-5 mt-4">
                            <input className="text-lg bg-gray-200 rounded border border-solid border-black" type="text" required onChange={(e) => {
                                if (!(e.target.value.length < maxCharacters)) alert("Du må ikke skrive mere end " + maxCharacters +  " karakterer")
                                
                                setNote(e.target.value)                                
                            
                            }} value={note}></input>
                            <button className="bg-gray-900 rounded-md text-white text-lg no-underline p-2 border-none" type="submit">Opret note</button>
                        </div>
                        
                    </form>
                    <div id="shownotes" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "50px", alignItems: "center", marginTop: "20px" }}>
                        {notes ? notes.map((note, index) => {
                            var time = new Date(note.time).toLocaleString("da-DK" , {month: "short", day: "numeric", year: "numeric"})
                            return (
                                <div key={index} style={{ width: "300px", minHeight: "130px", borderRadius: "12px", background: "whitesmoke", display: "flex", overflow: "hidden" }}>
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", width: "250px", gap: "20px" }}>
                                        <div style={{ textAlign: "start", display: "flex", flexDirection: "column", gap: "6px", marginLeft: "10px", marginTop: "10px" }}>
                                            <div style={{ color: "gray" }}>Dato</div>
                                            <div>{time}</div>
                                        </div>
                                        <div style={{ textAlign: "start", display: "flex", flexDirection: "column", gap: "6px", marginLeft: "10px", marginBottom: "10px" }}>
                                            <div style={{ color: "gray" }}>Note</div>
                                            <div>{note.note}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <button onClick={() => {ShowNote(note)}} style={{ display: "flex", width: "60px", height: "50%", background: "orange", fontSize: "24px", alignItems: "center", justifyContent: "center" }}><img src="https://icons-for-free.com/iconfiles/png/512/draw+edit+pen+pencil+text+write+icon-1320162307919760358.png" style={{ width: "28px" }}/></button>
                                        <button onClick={() => {
                                            setPassNote(note)
                                            setShowDeleteModal(true)
                                        }} style={{ width: "60px", height: "50%", background: "red", fontSize: "24px" }}>X</button>
                                    </div>
                                </div>
                            )
                        }) : <></>}
                </div>
            </div>

            
            {showModal ? <EditNote notes={notes} passNote={passNote} setShowModal={setShowModal} setNotes={setNotes} machine={machine} setMachine={setMachine}/> : <></>}
            {showDeleteModal ? <DeleteNote notes={notes} setNotes={setNotes} machine={machine} setShowDeleteModal={setShowDeleteModal} passNote={passNote} setMachine={setMachine}/> : <></>}
        </div>
    )
}

export async function getServerSideProps(context) {

    return {
        props: { query: context.query }, // will be passed to the page component as props
    }
}
export default Machine;