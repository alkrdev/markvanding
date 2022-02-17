import React, { useState } from "react";

const ChooseTime = ({ machineWithoutTime }) => {
  const [selectedTime, setSelectedtime] = useState({})
  const [selectedTimeType, setSelectedTimeType] = useState("")
  
  

  function chooseTime(event, time) {

    var tabcontent = document.getElementsByClassName("tabcontent");
    var tablinks = document.getElementsByClassName("tablinks");

    for (var i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }


    event.currentTarget.className += " active";
  }
  
  function TimeChanged(event){
    const {name, value} = event.target
    
    var now = new Date();

    if (name === "timeremaining") {
      var hours = parseInt(value.slice(0, 2))
      var minutes = parseInt(value.slice(3))

      now.setHours(now.getHours() + hours)
      now.setMinutes(now.getMinutes() + minutes)
    } else {
      now = new Date(value);
    }
    
    //Tue Feb 16 2021 10:25:00 GMT+0100 (Central European Standard Time)
    setSelectedtime(now)
  }


    return (
        <form onSubmit={function(event) {  
            // Prevents default behavior (Getting put at another site)
            event.preventDefault();
            
            // var tempTime = selectedTime.toLocaleString("da-DK", {
            //   dateStyle: "short",
            //   timeStyle: "medium"
            // }).split(" ");

            // var date = tempTime[0].split(".")
            // tempTime[0] = date[2] + "-" + date[1] + "-" + date[0]

            // var correctValue = tempTime.join(" ")

            
            machineWithoutTime.time = selectedTime
            

            fetch("/api/machines/" + machineWithoutTime.id, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(machineWithoutTime)
            })
            
            // Set current stage to "overview", and set "Submitted" hook to false
  
            localStorage.setItem("pump", "")
            localStorage.setItem("machine", "")
            localStorage.setItem("hasstarted", "false")
            // RELOAD?
          }}>
            <div id="choosetime">
              <div className="tab">
                <button type="button" className="tablinks" onClick={() => setSelectedTimeType("timeremaining")}>Tid tilbage</button>
                <button type="button" className="tablinks" onClick={() => setSelectedTimeType("date")}>Klokkeslæt</button>
              </div>
              {selectedTimeType == "timeremaining" ? <div id="timeremaining" className="tabcontent">
                <h3>Tid tilbage</h3>
                <input name="timeremaining" required onChange={(event) => TimeChanged(event)} type="time" size="50"></input>
                <br></br>
                <button type="submit" className="choosetimesubmit">START</button>
              </div> 
              : selectedTimeType == "date" ?
              <div id="date" className="tabcontent">
                <h3>Klokkeslæt</h3>
                <input name="date" required onChange={(event) => TimeChanged(event)} type="datetime-local" min={new Date().toISOString().slice(0, 16)} size="50"></input>
                <br></br>
                <button type="submit" className="choosetimesubmit">START</button>
              </div> : <></>}
            </div>
        </form>
    )
}

export default ChooseTime;