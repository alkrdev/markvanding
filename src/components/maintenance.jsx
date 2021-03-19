import { useState, useEffect } from "react"

function Maintenance({allMachines, setStage, setShownMachine}){

  const HandleClick = (machine) => {

    setShownMachine(machine)
    setStage("showmachine")

  }

  const [notes, setNotes] = useState({})

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
      return(
        <button className="maintenanceboxes" onClick={() => {HandleClick(machine)}} notes={notes}>
            {machine.id}
        </button>
      )
    })}
    </div>
  )


}

export default Maintenance;