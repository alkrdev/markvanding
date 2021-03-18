function Maintenance({allMachines, setStage, setShownMachine}){

  const HandleClick = (machine) => {

    setShownMachine(machine)
    setStage("showmachine")

  }

  return(
    <div id="maintenance">
      {allMachines.map((machine) => {
      return(
        <button className="maintenanceboxes" onClick={() => {HandleClick(machine)}}>
            {machine.id}
        </button>
      )
    })}
    </div>
  )


}

export default Maintenance;