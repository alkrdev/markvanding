function Maintenance({allMachines}){

  const handleClick = () => {}

  return(
    <div id="maintenance">
      {allMachines.map((machine) => {
      return(
        <div className="maintenanceboxes" onClick={handleClick}>
            {machine.id}
        </div>
      )
    })}
    </div>
  )


}

export default Maintenance;