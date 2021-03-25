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
        var active
        if(machine.active == 1) {
          active = "Aktiv"
        }
        else{
          active = "Inaktiv"
        }
      return(
        <button className="maintenanceboxes" onClick={() => {HandleClick(machine)}}>
            <div>
              <h1 id="machineid">
                {machine.id}
              </h1>
              <p id="active">
                {active}
              </p>
            </div>
        </button>
      )
    })}
    </div>
  )


}

export default Maintenance;