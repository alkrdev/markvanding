function Overviewstillgoing({stillgoingMachines, activePumps, stopMachine, stopPump, sendStopSMS}) {
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
            {stillgoingMachines.map(function(machine)
            {
            var time = new Date(machine["time"]).toLocaleString("da-DK", {
                dateStyle: "medium",
                timeStyle: "short"
            });
            
            var pump = activePumps.find((pum) => {
                return pum.name == machine.pumpname
            })

            return (
                <tr key={machine["id"]}>
                    <td style={{background: "#42CB6B"}}>{machine["id"]}</td>
                    <td>{machine["pumpname"]}</td>
                    <td>{time}</td>
                    <td id="stopwateringbutton" onClick={(event) => {

                        var answer = window.confirm("Hvis du vil stoppe vanding tryk OK")
                        
                        if (!answer === true) return;

                        var pumpnumber = "+45" + pump.number
                        var pumpstopcode = pump.stopcode
                        //sendStopSMS(pumpnumber, pumpstopcode)
                        
                        stopMachine(machine)
                        stopPump(pump)

                        setTimeout(() => {  window.location.href="/" }, 1000);

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