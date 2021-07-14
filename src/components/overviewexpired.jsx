function Overviewexpired ({expiredMachines, activePumps, stopMachine}) {
    
    return (
        <div>
            <h1 className="tablelabel">Færdige vandinger</h1>
            <table className="tables" id="tableoverview">
                <colgroup>
                    <col style={{width: "10%"}}></col>
                    <col style={{width: "24%"}}></col>
                    <col style={{width: "45%"}}></col>
                    <col style={{width: "10%"}}></col>
                </colgroup>
            <thead>
            <tr>
                <th>Maskine nr.</th>
                <th>Pumpe Navn</th>
                <th>Færdig</th>
                <th>Fjern Vanding</th>
            </tr>
            </thead>
            <tbody>
            {expiredMachines.map(function(machine)
            {
                var time = new Date(machine["time"]).toLocaleString("da-DK", {
                dateStyle: "medium",
                timeStyle: "short"
                });
                
                var pump = activePumps.find((pum) => pum.name === machine.pumpname)

                return (
                <tr key={machine["id"]}>
                    <td style={{background: "#DF4848"}}>{machine["id"]}</td>
                    <td>{machine["pumpname"]}</td>
                    <td>{time}</td>
                    <td id="stopwateringbutton" onClick={(event) => {

                        var answer = window.confirm("Hvis du vil stoppe vanding tryk OK")
                        
                        if (!answer === true) return;

                        console.log(machine["id"])
                        console.log(pump.id)
                        stopMachine(machine["id"], pump.id)
                        window.location.href="/overview"
                    }}>
                    <h4>FJERN</h4></td>
                </tr>
                )
            })}
            </tbody>
        </table>
        </div>
    )
}
export default Overviewexpired