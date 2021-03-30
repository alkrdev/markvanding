import { useState, useEffect } from "react"

function Maintenance({allMachines, setStage, setShownMachine, setNotes}){

  const HandleClick = (machine) => {

    setShownMachine(machine)
    setStage("showmachine")

  }

  useEffect(function() 
  {
    fetch("http://10.10.60.161:5000/getnotes")
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        setNotes(json)     
      }).catch((error) => {
        console.log(error);
      });
  }, [])

  return(
    <div id="maintenance">
      <h1 id="maintenancetext">Tryk på en boks for at tilgå maskinen</h1>
      {allMachines.map((machine) => {
        var color
        var active
        var pumpname
        var time
        if(machine.active == 1) {
          active = "Aktiv"
          pumpname = machine.pumpname
          time = new Date(machine["time"]).toLocaleString("da-DK", {
            dateStyle: "medium",
            timeStyle: "short"
        });
        }
        else{
          active = "Inaktiv"
          pumpname = "Ingen pumpe"
          time = "Ingen tid"
        }
      return(
        <button id="maintenanceboxes" onClick={() => {HandleClick(machine)}}>
            <div>
              <h1 id="machineid">
                {machine.id}
              </h1>
              <div id="hid-box">
                <p id="active">
                  {active}
                </p>
                <div id="maintenanceboxhover">
                  <p className="maintenanceboxheading">
                    Pumpenavn
                  </p>
                  <h3 className="maintenanceboxtext">
                    {pumpname}
                  </h3>
                  <p className="maintenanceboxheading">
                    Stop tidspunkt
                  </p>
                  <h3 className="maintenanceboxtext">
                    {time}
                  </h3>
                </div>
              </div>
            </div>
        </button>
      )
    })}
    </div>
  )


}

export default Maintenance;