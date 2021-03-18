import React, { useEffect, useState } from 'react';
import Overview from './components/overview';
import Phonenumbers from './components/phonenumbers';
import Startmachine from './components/startmachine';
import Maintenance from './components/maintenance';
import Addmachines from './components/addmachines';
import Showmachine from './components/showmachine';

function App() {

  const windowWidth = window.innerWidth;

  const [stage, setStage] = useState("overview")
  const [submitted, setSubmitted] = useState(false)
  const [startMachine, setStartmachine] = useState({})
  const [selectedTime, setSelectedtime] = useState({})

  const [activeMachines, setActiveMachines] = useState([])
  const [activePumps, setActivePumps] = useState([])
  const [inactiveMachines, setInactiveMachines] = useState([])
  const [inactivePumps, setInactivePumps] = useState([])
  const [allPumps, setAllPumps] = useState([])
  const [allMachines, setAllMachines] = useState([])
  const [shownMachine, setShownMachine] = useState([])


  function slide(){
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    //Toggle Nav
    nav.classList.toggle('nav-active');
    
    //Animate Links
    navLinks.forEach(function(link, index){
      link.classList.toggle('nav-active-li');
      if(link.style.animation){
        link.style.animation = '';
      }
      else{
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`
      }
    });

    //Animate Burger
    burger.classList.toggle('toggle');
  }

  function HandleClick(navbar) {
    switch (navbar) {
      case "overview":
        setStage("overview")
        break;
      case "startmachine":
        setStage("startmachine")
        break;
      case "phonenumber":
        setStage("phonenumber")
        break;
      case "maintenance":
        setStage("maintenance")
        break;
      case "addmachine":
        setStage("addmachine")
        break;
      default:
        break;
    }

    
    if (windowWidth <= 1280) slide();
  }

  function chooseTime(event, time) {

    var tabcontent = document.getElementsByClassName("tabcontent");
    var tablinks = document.getElementsByClassName("tablinks");
    var choosetime = document.getElementById('choosetime');

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
/*
  function formatDate(date, format) {
    const months = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const map = {
        dd: date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),  
        mm: months[date.getMonth()],
        t: date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        m: date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }

    return format.replace(/dd|mm|t|m/gi, matched => map[matched])
  }
  
  function formatTime(date, format) {
    const map = {
        hh: date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),  
        mm: date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        ss: date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
    }

    return format.replace(/hh|mm|ss/gi, matched => map[matched])
  }
  */
  
  function TimeChanged(event){
    const {name, value} = event.target
    
    var now = new Date();

    if (name === "timeremaining") {
      var hours = parseInt(value.slice(0, 2))
      var minutes = parseInt(value.slice(3))

      now.setHours(now.getHours() + hours)
      now.setMinutes(now.getMinutes() + minutes)
      console.log(now)
    } else {
      now = new Date(value);
    }
    console.log(now)
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

    fetch("http://10.10.60.161:5000/updatemachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempMachine)
    })
  }

  function UpdatePump(pump){

    // Set date of machine to selected date
     var tempPump = {...pump}
     
     tempPump.active = 1;
     

    fetch("http://10.10.60.161:5000/updatepump", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempPump)
    })
  }

  function StopPump(pump){

    // Set date of machine to selected date
     var tempPump = {...pump}
     
     tempPump.active = 0;
     

    fetch("http://10.10.60.161:5000/updatepump", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempPump)
    })
  }

  function StopMachine(machine){

    // Set date of machine to selected date
     var tempMachine = {...machine}
    
     tempMachine.pumpname = null
     tempMachine.time = null
     tempMachine.active = 0
     

    fetch("http://10.10.60.161:5000/updatemachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempMachine)
    })
  }


  useEffect(function() 
  {
    fetch("http://10.10.60.161:5000/activemachines")
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        setActiveMachines(json)     
      }).catch((error) => {
        console.log(error);
      });

      fetch("http://10.10.60.161:5000/activepumps")
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        setActivePumps(json)     
      }).catch((error) => {
        console.log(error);
      });

      fetch("http://10.10.60.161:5000/inactivemachines")
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        setInactiveMachines(json)     
      }).catch((error) => {
        console.log(error);
      });

      fetch("http://10.10.60.161:5000/inactivepumps")
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        setInactivePumps(json)     
      }).catch((error) => {
        console.log(error);
      });

      fetch("http://10.10.60.161:5000/allpumps")
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        setAllPumps(json)     
      }).catch((error) => {
        console.log(error);
      });

      fetch("http://10.10.60.161:5000/allmachines")
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        setAllMachines(json)
      }).catch((error) => {
        console.log(error);
      });

  }, [])



  return (
    <div className="App">
      {submitted ? (
        <form onSubmit={function(event) {
          var months = {
            "Jan": "January",
            "Feb": "February",
            "Mar": "March",
            "Apr": "April",
            "Maj": "May",
            "Jun": "June",
            "Jul": "July",
            "Aug": "August",
            "Sep": "September",
            "Oct": "October",
            "Nov": "November",
            "Dec": "December"
          }

          // Prevents default behavior (Getting put at another site)
          event.preventDefault();

          startMachine.time = selectedTime;

          /*
          // Set time to whatever the user picked
          tempMachine["time"] = selectedTime.replace("T", " "); // Temp value, not correct
          console.log(tempMachine.time)

          //"October 13, 2014 11:13:00"
          //"06 Mar 03:24"

          console.log(tempMachine.time)
          //06 Mar 03:24

          tempMachine.time += ":00";

          console.log(tempMachine.time)
          //06 Mar 03:24:00

          var tempTime = tempMachine.time.split(" ");

          tempTime.push(new Date().getFullYear());

          console.log(tempTime)
          //06 Mar 03:24:00 2021

          tempMachine.time = months[tempTime[1]] + " " + tempTime[0] + " " + tempTime[3] + " " + tempTime[2];

          console.log(tempMachine.time)
          //Mar 06 2021 03:24:00
 
          
          var newDate = new Date(tempMachine.time)

          var timeDiff = newDate.getTime() - new Date().getTime()

          
          var hours = Math.floor(timeDiff / 3.6e6);
          
          var minutes = Math.floor((timeDiff % 3.6e6) / 6e4);
          
          var seconds = Math.floor((timeDiff % 6e4) / 1000)
          
          tempMachine.time = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
          */
          
          // var returned = formatTime(newDate, "hh:mm:ss")

          
          // Make new array with the old data from tempdatamachines, and add "tempMachine" to it
          setActiveMachines(activeMachines => [...activeMachines, startMachine])

          // Removes active machine from dropdown menu
          setInactiveMachines(inactiveMachines.filter(machine => startMachine.id != machine.id))

          // Removes active pump from dropdown menu
          setInactivePumps(inactivePumps.filter(pump => startMachine.pumpname != pump.name))

          UpdateMachine(startMachine);
          
          // Set current stage to "overview", and set "Submitted" hook to false

          setSubmitted(false);
          window.location.href = "/"
        }}>
          <div id="choosetime">
            <div className="tab">
              <button type="button" className="tablinks" onClick={(event) => chooseTime(event, 'timeremaining')}>Tid tilbage</button>
              <button type="button" className="tablinks" onClick={(event) => chooseTime(event, 'date')}>Klokkeslæt</button>
            </div>

            <div id="timeremaining" className="tabcontent">
              <h3>Tid tilbage</h3>
              <input name="timeremaining" onChange={(event) => TimeChanged(event)} type="time" size="50"></input>
              <br></br>
              <button type="submit" className="choosetimesubmit">START</button>
            </div>

            <div id="date" className="tabcontent">
              <h3>Klokkeslæt</h3>
              <input name="date" onChange={(event) => TimeChanged(event)} type="datetime-local" min={new Date().toISOString().slice(0, 16)} size="50"></input>
              <br></br>
              <button type="submit" className="choosetimesubmit">START</button>
            </div>
          </div>
        </form>
      ) : <>
        <header>
          <nav>
            <div className="logo">
              <h1>Markvanding</h1>
            </div>
            <ul className="nav-links">
              <li>
                <a href="#" onClick={() => HandleClick("overview")}>OVERSIGT</a>
              </li>
              <li>
                <a href="#" onClick={() => HandleClick("startmachine")}>START VANDING</a>
              </li>
              <li>
                <a href="#" onClick={() => HandleClick("phonenumber")}>TELEFONNUMRE</a>
              </li>
              <li>
                <a href="#" onClick={() => HandleClick("maintenance")}>VEDLIGEHOLDELSE</a>
              </li>
              <li>
                <a href="#" onClick={() => HandleClick("addmachine")}>TILFØJ/REDIGER <br></br> MASKINER/PUMPER</a>
              </li>
            </ul>
            <div className="burger" onClick={slide}>
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
          </nav>
        </header>
        
        <main>
        {
          stage === "overview" ? (
            <Overview activeMachines={activeMachines} activePumps={activePumps} stopMachine={StopMachine} stopPump={StopPump}/>
          ) : stage === "startmachine" ? (
            <Startmachine setSubmitted={setSubmitted} setStartmachine={setStartmachine} activeMachines={activeMachines} inactivePumps={inactivePumps} inactiveMachines={inactiveMachines} updatePump={UpdatePump}/>
          ) : stage === "phonenumber" ? (
            <Phonenumbers  allPumps={allPumps}/>
          ) : stage === "maintenance" ? (
            <Maintenance allMachines={allMachines} setSubmitted={setSubmitted} setStage={setStage} setShownMachine={setShownMachine}/>
          ) : stage === "addmachine" ? (
            <Addmachines allPumps={allPumps} allMachines={allMachines}/>
          ) : stage === "showmachine" ? (
            <Showmachine shownMachine={shownMachine} setStage={setStage}/>
          ) : <></>
        }
      </main>
      </>}
    </div>
  );
}

export default App;
