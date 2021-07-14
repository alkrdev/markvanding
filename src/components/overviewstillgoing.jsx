function Overviewstillgoing({machines, pumps, stopMachine, sendStopSMS}) {
    return (
    <div>
        <h1 className="tablelabel">Aktive vandinger</h1>
        <table className="tables" id="tableoverview">
        <colgroup>
            <col style={{width: "10%"}}></col>
            <col style={{width: "25%"}}></col>
            <col style={{width: "45%"}}></col>
            <col style={{width: "10%"}}></col>
        </colgroup>
        <thead>
            <tr>
            <th>Maskine nr.</th>
            <th>Pumpe Navn</th>
            <th>Færdig</th>
            <th>Stop Vanding</th>
            </tr>
        </thead>
        <tbody>
            {machines.filter(machine => new Date() < new Date(machine.time) && machine.active == 1).map(function(machine)
            {
            var time = new Date(machine["time"]).toLocaleString("da-DK", {
                dateStyle: "medium",
                timeStyle: "short"
            });
            
            var pump = pumps.find((pump) => pump.name === machine.pumpname && pump.active == 1)

            return (
                <tr key={machine["id"]}>
                    <td style={{background: "#42CB6B"}}>{machine["id"]}</td>
                    <td>{machine["pumpname"]}</td>
                    <td>{time}</td>
                    <td id="stopwateringbutton" onClick={(event) => {

                        var confirmed = window.confirm("Er du sikker på at du vil stoppe vanding?")
                        
                        if (!confirmed === true) return;

                        // var pumpnumber = "+45" + pump.number
                        // var pumpstopcode = pump.stopcode
                        // sendStopSMS(pumpnumber, pumpstopcode)
                        
                        stopMachine(machine.id, pump.id)

                        setTimeout(() => {  window.location.href="/overview" }, 1000);

                    }}>
                        <h4>STOP</h4>
                    </td>
                </tr>
            )
            })}
        </tbody>
        </table>
    </div>
    )
}

export default Overviewstillgoing;