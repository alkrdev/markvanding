import React, {useEffect, useState} from 'react';

function Addmachines({allPumps}){

  function showPump(){
    var findPumpName = document.getElementById("findpumpname");
    var editPumpName = document.getElementById("editpumpname");
    var editPumpNumber = document.getElementById("editpumpnumber");
    var editPumpStartCode = document.getElementById("editpumpstartcode");
    var editPumpStopCode = document.getElementById("editpumpstopcode");
  
  allPumps.map(function(pump)
    {
      if(findPumpName.value == pump["name"]){
        editPumpName.value = pump["name"]
        editPumpNumber.value = pump["number"]
        editPumpStartCode.value = pump["startcode"]
        editPumpStopCode.value = pump["stopcode"]
      }
      else{
        console.log("Test")
      }
    })
      
  }

  return(
    <div>
      <form id="createpump" onSubmit={function(event){
        event.preventDefault();
      }}>
        <h2>Opret pumpe</h2>
        <label>Pumpe navn </label>
        <input type="text" id="createpumpname" name="createpumpname"></input><br></br>
        <label>Pumpe nummer </label>
        <input type="text" id="createpumpnumber" name="createpumpnumber"></input><br></br>
        <label>Startkode </label>
        <input type="text" id="createpumpstartcode" name="createpumpstartcode"></input><br></br>
        <label>Stopkode </label>
        <input type="text" id="createpumpstopcode" name="createpumpstopcode"></input><br></br>
        <button className="createandupdatebuttons" type="submit">Opret</button>
      </form>
      <form id="editpump" onSubmit={function(event){
        event.preventDefault();
        
      }}>
        <h2>Find/Rediger pumpe</h2>
        <input type="text" id="findpumpname" name="findpumpname"></input><br></br>
        <button type="button" className="createandupdatebuttons" onClick={() => showPump()}>Find pumpe</button><br></br>
        <label>Pumpe navn </label>
        <input type="text" id="editpumpname" name="editpumpname"></input><br></br>
        <label>Pumpe nummer </label>
        <input type="text" id="editpumpnumber" name="editpumpnumber"></input><br></br>
        <label>Pumpe startcode </label>
        <input type="text" id="editpumpstartcode" name="editpumpstartcode"></input><br></br>
        <label>Pumpe stopcode </label>
        <input type="text" id="editpumpstopcode" name="editpumpstopcode"></input><br></br>
        <button className="createandupdatebuttons" type="submit">Opdater</button>
      </form>
      <form>

      </form>
    </div>
  )


}

export default Addmachines;