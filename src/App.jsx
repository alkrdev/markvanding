import React, { useEffect, useState } from "react";

import { Router } from "react-router";
import { Route } from "react-router-dom";
import { createBrowserHistory } from "history";


import LoginForm from "./components/LoginForm"
import Overview from "./components/Overview";
import Startmachine from "./components/StartMachine";
import Maintenance from "./components/Maintenance";
import Machinepark from "./components/MachinePark/index";
import Showmachine from "./components/ShowMachine";
import ChooseTime from "./components/ChooseTime";

const history = createBrowserHistory();

function App() {

  const storedJwt = localStorage.getItem("token");
  const [allowNav, setAllowNav] = useState({})
  const windowWidth = window.innerWidth;

  const [submitted, setSubmitted] = useState(false)

  const [stillgoingMachines, setStillgoingMachines] = useState([])
  const [expiredMachines, setExpiredMachines] = useState([])
  const [inactiveMachines, setInactiveMachines] = useState([])
  const [inactivePumps, setInactivePumps] = useState([])
  const [allMachines, setAllMachines] = useState([])
  const [shownMachine, setShownMachine] = useState([])
  const [notes, setNotes] = useState([])



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
    if (allowNav === false) {
      return;
    }
    history.push(stage)
    var array = event.target.parentNode.parentNode.children


    for (const line of array) {
      var anchor = line.children[0];

      if (anchor.innerHTML.toLowerCase() === text.toLowerCase()) {
        anchor.style.color = "rgb(235, 101, 45)"
        continue;
      } 
      anchor.style.color = "rgb(233, 233, 233)"
    }

    if (windowWidth <= 1280) slide();
  }


  useEffect(function() 
  {

    if (storedJwt !== null && storedJwt !== "") {
      //console.log("LOGGED IN")
      setAllowNav(true)
      document.getElementById("nav").style.display = "flex";
      history.push("/overview")
    } else if (storedJwt === null || storedJwt === "") {
      //console.log("NOT LOGGED IN")
      setAllowNav(false)
      document.getElementById("nav").style.display = "none";
      history.push("/")
    }

    document.querySelectorAll(".nav-links")[0].children[0].children[0].style.color = "rgb(235, 101, 45)"

    var hasstarted = localStorage.getItem("hasstarted")
    if (hasstarted === "true") {
      setSubmitted(true)
    }

    fetch("http://remote.kkpartner.dk:3001/activemachines")
      .then((data) => data.json())
      .then((json) => {
        setStillgoingMachines(json.filter(x => new Date() < new Date(x.time)))
        setExpiredMachines(json.filter(x => new Date() > new Date(x.time)))
      })
      .catch((error) => console.log(error));

    fetch("http://remote.kkpartner.dk:3001/inactivemachines")
      .then((data) => data.json())
      .then((json) => setInactiveMachines(json))
      .catch((error) => console.log(error));

    fetch("http://remote.kkpartner.dk:3001/inactivepumps")
      .then((data) => data.json())
      .then((json) => setInactivePumps(json))
      .catch((error) => console.log(error));

    fetch("http://remote.kkpartner.dk:3001/allmachines")
      .then((data) => data.json())
      .then((json) => setAllMachines(json))
      .catch((error) => console.log(error));  
    }, [storedJwt])

  return (
    <Router history={history}>
      {submitted ? (
        <ChooseTime setInactiveMachines={setInactiveMachines} inactiveMachines={inactiveMachines} setInactivePumps={setInactivePumps} inactivePumps={inactivePumps} setSubmitted={setSubmitted} />
      ) : <>
        <header>
          <nav id="nav">
            <div className="logo">
              <h1>Markvanding</h1>
            </div>
            <ul className="nav-links">
              <li>
                <button onClick={(e) => HandleNavClick(e, "overview", "OVERSIGT")}>OVERSIGT</button>
              </li>
              <li>
                <button onClick={(e) => HandleNavClick(e, "startmachine", "START VANDING")}>START VANDING</button>
              </li>
              <li>
                <button onClick={(e) => HandleNavClick(e, "maintenance", "VEDLIGEHOLDELSE")}>VEDLIGEHOLDELSE</button>
              </li>
              <li>
                <button onClick={(e) => HandleNavClick(e, "machinepark", "MASKINPARK")}>MASKINPARK</button>
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
            <Overview expiredMachines={expiredMachines} stillgoingMachines={stillgoingMachines}/>
          </Route>
          <Route path="/startmachine">
            <Startmachine setSubmitted={setSubmitted} inactivePumps={inactivePumps} inactiveMachines={inactiveMachines} />
          </Route>
          <Route path="/maintenance">
            <Maintenance allMachines={allMachines} setSubmitted={setSubmitted} setShownMachine={setShownMachine} setNotes={setNotes}/>
          </Route>
          <Route path="/machinepark">
            <Machinepark allMachines={allMachines} />
          </Route>
          <Route path="/showmachine">            
            <Showmachine shownMachine={shownMachine} notes={notes} history={history} setNotes={setNotes}/>
          </Route>
        </main>
      </>}
    </Router>
  );
}

export default App;
