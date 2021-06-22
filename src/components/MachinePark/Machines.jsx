import React from "react";

const Machines = ({ allMachines, setCurrentMachine }) => {


    return(
        <React.Fragment>             
            <div className="machineparktableheaders">
                <h1 className="machineparktableheaderstext">Maskiner</h1>
                <h1 className="machineparktableheadersplus" onClick={() => {
                    var modal = document.getElementById("modal5")
                    modal.style.display = "block"
                }}>+</h1>
            </div>
            <table className="machineparktables" id="tablemachineparkmachines">
                <colgroup>
                <col style={{width: "25%"}}></col>
                <col style={{width: "25%"}}></col>
                <col style={{width: "25%"}}></col>
                <col style={{width: "15%"}}></col>
                <col style={{width: "10%"}}></col>
                </colgroup>
                <thead>
                <tr>
                    <th>Maskine nr.</th>
                    <th>Model</th>
                    <th>Dyse størrelse</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {allMachines.map(function(data) {
                    return (
                    <tr key={data["id"]}>
                        <td>{data["id"]}</td>
                        <td>{data["model"]}</td>
                        <td>{data["nozzle"]}</td>
                        <td></td>
                        <td onClick={(event) => {
                            setCurrentMachine(allMachines.find(x => x.id === data.id))

                            var modal = document.getElementById("modal2")
                            modal.style.display = "block"
                        }}>
                        <img src="https://icons-for-free.com/iconfiles/png/512/draw+edit+pen+pencil+text+write+icon-1320162307919760358.png" alt="" style={{width: 24}}></img>
                        </td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
      
        </React.Fragment>
    )
}

export default Machines;