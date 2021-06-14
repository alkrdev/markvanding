import React, { useEffect, useState } from "react";

import { Router } from "react-router";
import { Route } from "react-router-dom";
import { createBrowserHistory } from "history";


import LoginForm from "./components/loginform"
import Overview from "./components/overview";
import Startmachine from "./components/startmachine";
import Maintenance from "./components/maintenance";
import Machinepark from "./components/machinepark";
import Showmachine from "./components/showmachine";

const history = createBrowserHistory();

function App() {

  const storedJwt = localStorage.getItem("token");
  const [allowNav, setAllowNav] = useState({})
  const windowWidth = window.innerWidth;

  const [submitted, setSubmitted] = useState(false)
  const [selectedTime, setSelectedtime] = useState({})

  const [stillgoingMachines, setStillgoingMachines] = useState([])
  const [expiredMachines, setExpiredMachines] = useState([])
  const [activeMachines, setActiveMachines] = useState([])
  const [inactiveMachines, setInactiveMachines] = useState([])
  const [inactivePumps, setInactivePumps] = useState([])
  const [allPumps, setAllPumps] = useState([])
  const [allMachines, setAllMachines] = useState([])
  const [shownMachine, setShownMachine] = useState([])
  const [notes, setNotes] = useState([])
  const [hours, setHours] = useState(-1)
  const [days, setDays] = useState(-1)
  
  const machine = localStorage.getItem("machine")
  const pump = localStorage.getItem("pump")


  function slide(){
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    //Toggle Nav
    nav.classList.toggle("nav-active");
    
    //Animate Links
    navLinks.forEach(function(link, index){
      link.classList.toggle("nav-active-li");
      if(link.style.animation){
        link.style.animation = "";
      }
      else{
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`
      }
    });

    //Animate Burger
    burger.classList.toggle("toggle");
  }

  const HandleNavClick = function(event, stage, text) {
    event.preventDefault();
    if (allowNav == false) {
      return;
    }
    history.push(stage)
    var array = event.target.parentNode.parentNode.children


    for (const line of array) {
      var anchor = line.children[0];
      anchor.style.color = "rgb(233, 233, 233)"
    }

    for (const line of array) {
      var anchor = line.children[0];

      if (anchor.innerHTML.toLowerCase() == text.toLowerCase()) {
        anchor.style.color = "rgb(235, 101, 45)"
        break
      }
    }

    if (windowWidth <= 1280) slide();
 }


    
  //   if (windowWidth <= 1280) slide();
  // }

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
      setHours(1)
    } else {
      now = new Date(value);
      setDays(1)
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

    fetch("http://10.10.51.36:5000/updatemachine", {
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
     

    fetch("http://10.10.51.36:5000/updatepump", {
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
     

    fetch("http://10.10.51.36:5000/updatepump", {
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
     

    fetch("http://10.10.51.36:5000/updatemachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempMachine)
    })
  }


  useEffect(function() 
  {

    if (storedJwt !== null && storedJwt !== "") {
      console.log("LOGGED IN, PUSHED TO CHOOSE")
      setAllowNav(true)
      history.push("/overview")
    } else if (storedJwt == null || storedJwt == "") {
      console.log("NOT LOGGED IN, PUSHED TO LOG IN")
      setAllowNav(false)
      history.push("/")
    }

    document.querySelectorAll(".nav-links")[0].children[0].children[0].style.color = "rgb(235, 101, 45)"
    var hasstarted = localStorage.getItem("hasstarted")
    if (hasstarted == "true") {
      console.log("Hej")
      setSubmitted(true)
    }

    fetch("http://10.10.51.36:5000/activemachines")
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        setActiveMachines(json)
        setStillgoingMachines(json.filter(x => new Date() < new Date(x.time)))
        setExpiredMachines(json.filter(x => new Date() > new Date(x.time)))
      }).catch((error) => {
        console.log(error);
      });

      fetch("http://10.10.51.36:5000/inactivemachines")
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        setInactiveMachines(json)     
      }).catch((error) => {
        console.log(error);
      });

      fetch("http://10.10.51.36:5000/inactivepumps")
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        setInactivePumps(json)     
      }).catch((error) => {
        console.log(error);
      });

      fetch("http://10.10.51.36:5000/allpumps")
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        setAllPumps(json)     
      }).catch((error) => {
        console.log(error);
      });

      fetch("http://10.10.51.36:5000/allmachines")
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
    <Router history={history}>
      {submitted ? (
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

          console.log(startMachine)
          
          // Make new array with the old data from tempdatamachines, and add "tempMachine" to it
          setActiveMachines(activeMachines => [...activeMachines, startMachine])

          // Removes active machine from dropdown menu
          setInactiveMachines(inactiveMachines.filter(machine => startMachine.id != machine.id))

          // Removes active pump from dropdown menu
          setInactivePumps(inactivePumps.filter(pump => startMachine.pumpname != pump.name))

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
              <input name="timeremaining" defaultValue={hours} onChange={(event) => {
                TimeChanged(event)
              }} type="time" size="50"></input>
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
      ) : <>
        <header>
          <nav>
            <div className="logo">
              <h1>Markvanding</h1>
            </div>
            <ul className="nav-links">
              <li>
                <a href="" onClick={(e) => HandleNavClick(e, "overview", "OVERSIGT")}>OVERSIGT</a>
              </li>
              <li>
                <a href="" onClick={(e) => HandleNavClick(e, "startmachine", "START VANDING")}>START VANDING</a>
              </li>
              <li>
                <a href="" onClick={(e) => HandleNavClick(e, "maintenance", "VEDLIGEHOLDELSE")}>VEDLIGEHOLDELSE</a>
              </li>
              <li>
                <a href="" onClick={(e) => HandleNavClick(e, "machinepark", "MASKINPARK")}>MASKINPARK</a>
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
          <Route exact path="/">
              <LoginForm />
          </Route>        
          <Route path="/overview">
            <Overview activePumps={activePumps} stopMachine={StopMachine} stopPump={StopPump} expiredMachines={expiredMachines} stillgoingMachines={stillgoingMachines}/>
          </Route>
          <Route path="/startmachine">
            <Startmachine setSubmitted={setSubmitted} activeMachines={activeMachines} inactivePumps={inactivePumps} inactiveMachines={inactiveMachines} updatePump={UpdatePump} setSubmitted={setSubmitted}/>
          </Route>
          <Route path="/maintenance">
            <Maintenance allMachines={allMachines} setSubmitted={setSubmitted} setShownMachine={setShownMachine} setNotes={setNotes}/>
          </Route>
          <Route path="/machinepark">
            <Machinepark allPumps={allPumps} allMachines={allMachines} setSubmitted={setSubmitted}/>
          </Route>
          <Route path="/showmachine">            
            <Showmachine shownMachine={shownMachine} notes={notes} history={history}/>
          </Route>
        </main>
      </>}
    </Router>
  );
}

export default App;
