function Overviewexpired ({expiredMachines, activePumps, stopMachine, stopPump}) {
    
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
                <th>Stop Vanding</th>
            </tr>
            </thead>
            <tbody>
            {expiredMachines.map(function(machine)
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
                    <td>{machine["id"]}</td>
                    <td>{machine["pumpname"]}</td>
                    <td>{time}</td>
                    <td id="stopwateringbutton" onClick={(event) => {

                        var answer = window.confirm("Hvis du vil stoppe vanding tryk OK")
                        
                        if (!answer === true) return;

                        //var pumpnumber = "+45" + pump.number
                        //var pumpstopcode = pump.stopcode
                        //sendStopSMS(pumpnumber, pumpstopcode)
                        
                        stopMachine(machine)
                        stopPump(pump)
                        window.location.href="/"
                    }}>
                    <p id="stopwateringbuttontext">S</p></td>
                </tr>
                )
            })}
            </tbody>
        </table>
        </div>
    )
}
export default Overviewexpired