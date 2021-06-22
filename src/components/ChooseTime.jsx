import React, { useState } from "react";

const ChooseTime = ({ setInactiveMachines, inactiveMachines, setInactivePumps, inactivePumps, setSubmitted }) => {

  const [hours, setHours] = useState(-1)
  const [days, setDays] = useState(-1)
  const [selectedTime, setSelectedtime] = useState({})
  
  const machine = localStorage.getItem("machine")
  const pump = localStorage.getItem("pump")
  

  function chooseTime(event, time) {

    var tabcontent = document.getElementsByClassName("tabcontent");
    var tablinks = document.getElementsByClassName("tablinks");
    var choosetime = document.getElementById("choosetime");

    for (var i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    var children = choosetime.children;

    if (time === "timeremaining")
    {
      children[1].style.display = "block"
    } else
    {
      children[2].style.display = "block"
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

      setHours(1)
    } else {
      now = new Date(value);
      setDays(1)
    }
    
    //Tue Feb 16 2021 10:25:00 GMT+0100 (Central European Standard Time)
    setSelectedtime(now)
  }

  function UpdateMachine(updatedMachine){

    // Set date of machine to selected date
     var tempMachine = {...updatedMachine}
     
     tempMachine.time = selectedTime.toLocaleString("da-DK", {
       dateStyle: "short",
       timeStyle: "medium"
     });
     
     var tempTime = tempMachine.time.split(" ");

     var date = tempTime[0].split(".")
     tempTime[0] = date[2] + "-" + date[1] + "-" + date[0]
     tempMachine.time = tempTime.join(" ");

    fetch("http://remote.kkpartner.dk:3001/updatemachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempMachine)
    })
  }

    return (
        <form onSubmit={function(event) {
            var startMachine = {
              id: machine,
              pumpname: pump,
              time: "2000-01-01 00:00:00",
              active: 1
            }
  
            // Prevents default behavior (Getting put at another site)
            event.preventDefault();
  
            if (hours === -1 && days === -1) {
              alert("Du skal vælge en tid")
              return;
            }
  
            startMachine.time = selectedTime;
  
            // Removes active machine from dropdown menu
            setInactiveMachines(inactiveMachines.filter(machine => startMachine.id !== machine.id))
  
            // Removes active pump from dropdown menu
            setInactivePumps(inactivePumps.filter(pump => startMachine.pumpname !== pump.name))
  
            UpdateMachine(startMachine);
            
            // Set current stage to "overview", and set "Submitted" hook to false
  
            localStorage.setItem("pump", "")
            localStorage.setItem("machine", "")
            localStorage.setItem("hasstarted", "false")
            setSubmitted(false);
            window.location.href = "/"
          }}>
            <div id="choosetime">
              <div className="tab">
                <button type="button" className="tablinks" onClick={(event) => chooseTime(event, "timeremaining")}>Tid tilbage</button>
                <button type="button" className="tablinks" onClick={(event) => chooseTime(event, "date")}>Klokkeslæt</button>
              </div>
              <div id="timeremaining" className="tabcontent">
                <h3>Tid tilbage</h3>
                <input name="timeremaining" defaultValue={hours} onChange={(event) => TimeChanged(event)} type="time" size="50"></input>
                <br></br>
                <button type="submit" className="choosetimesubmit">START</button>
              </div>
              <div id="date" className="tabcontent">
                <h3>Klokkeslæt</h3>
                <input name="date" defaultValue={days} onChange={(event) => TimeChanged(event)} type="datetime-local" min={new Date().toISOString().slice(0, 16)} size="50"></input>
                <br></br>
                <button type="submit" className="choosetimesubmit">START</button>
              </div>
            </div>
        </form>
    )
}

export default ChooseTime;