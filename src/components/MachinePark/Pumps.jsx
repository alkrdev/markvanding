import React from "react";

const Pumps = ({ allPumps, setCurrentPump }) => {
    const setInactivePump = (data) => {
        var tempPump = {}
        tempPump.id = data

        fetch("http://remote.kkpartner.dk:3001/setinactivepump", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tempPump)
        })
        window.location.href = "/machinepark"
    }
    return (
        <React.Fragment>
            <div className="machineparktableheaders">
                <h1 className="machineparktableheaderstext">Pumper</h1>
                <h1 className="machineparktableheadersplus" onClick={() => {
                var modal = document.getElementById("modal4")
                modal.style.display ="block"
                }}>+</h1>
            </div>
            <table className="machineparktables" id="tablemachineparkpumps">
                <colgroup>
                    <col style={{width: "25%"}}></col>
                    <col style={{width: "25%"}}></col>
                    <col style={{width: "20%"}}></col>
                    <col style={{width: "20%"}}></col>
                    <col style={{width: "10%"}}></col>
                </colgroup>
                <thead>
                    <tr>
                        <th>Navn</th>
                        <th>Nummer</th>
                        <th>Startkode</th>
                        <th>Stopkode</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {allPumps.map(function(data) {
                        return (
                        <tr key={data["id"]}>
                            <td>{data["name"]}</td>
                            <td>{data["number"]}</td>
                            <td>{data["startcode"]}</td>
                            <td>{data["stopcode"]}</td>
                            <td onClick={() => {
                            setCurrentPump(data)
                            var modal = document.getElementById("modal1")
                            modal.style.display = "block"
                            }}>
                            <img src="https://icons-for-free.com/iconfiles/png/512/draw+edit+pen+pencil+text+write+icon-1320162307919760358.png" alt="" style={{width: 24}}></img>
                            </td>
                            <td id="setinactive" onClick={() => {
                                var answer = window.confirm("Hvis du vil sætte " + data.name + " til Inaktiv")
                        
                                if (!answer === true) return;
                                setInactivePump(data["id"])
                            }}>Gør Inaktiv</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
     
        </React.Fragment>
    )
}

export default Pumps;