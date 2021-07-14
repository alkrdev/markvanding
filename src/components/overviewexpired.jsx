function Overviewexpired ({ machines, pumps, stopMachine}) {
    
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
            {machines.filter(machine => new Date() > new Date(machine.time) && machine.active == 1).map(function(machine)
            {
                var time = new Date(machine["time"]).toLocaleString("da-DK", {
                    dateStyle: "medium",
                    timeStyle: "short"
                });
                
                var pump = pumps.find((pump) => pump.name === machine.pumpname && pump.active == 1)

                return (
                <tr key={machine["id"]}>
                    <td style={{background: "#DF4848"}}>{machine["id"]}</td>
                    <td>{machine["pumpname"]}</td>
                    <td>{time}</td>
                    <td id="stopwateringbutton" onClick={(event) => {

                        var confirmed = window.confirm("Er du sikker på at du vil stoppe vanding?")
                        
                        if (!confirmed === true) return;

                        stopMachine(machine.id, pump.id)
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