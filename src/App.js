import React, { useEffect, useState } from 'react';
import Overview from './components/overview';
import Phonenumbers from './components/phonenumbers';
import Startmachine from './components/startmachine';
import Maintenance from './components/maintenance';

function App() {
  const [stage, setStage] = useState("overview");

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

  function HandleClick(nav) {
    switch (nav) {
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
      default:
        break;

    }
  }
  return (
    <div className="App">
      
      <header>
        <nav>
          <div className="logo">
            <h1>Markvanding</h1>
          </div>
          <ul className="nav-links">
            <li>
              <a href="#" onClick={() => HandleClick("overview")}>Oversigt</a>
            </li>
            <li>
              <a href="#" onClick={() => HandleClick("startmachine")}>Opret Timer</a>
            </li>
            <li>
              <a href="#" onClick={() => HandleClick("phonenumber")}>Telefon numre</a>
            </li>
            <li>
              <a href="#" onClick={() => HandleClick("maintenance")}>Vedligeholdelse</a>
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
        {/* {stage === 1 ? <Overview /> : <></>} */}
        {/* <Overview /> */}

        {
          stage === "overview" ? (
            <Overview /> 
          ) : stage === "startmachine" ? (
            <Startmachine />
          ) : stage === "phonenumber" ? (
            <Phonenumbers />
          ) : stage === "maintenance" ? (
            <Maintenance />
          ) : <></>
        };

      </main>
    </div>
  );
}

export default App;
