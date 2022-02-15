import React from "react"
import { useRouter } from 'next/router'

const Header = () => {

    const router = useRouter();

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
      router.push(stage)
      var array = event.target.parentNode.parentNode.children
  
  
      for (const line of array) {
        var anchor = line.children[0];
  
        if (anchor.innerHTML.toLowerCase() === text.toLowerCase()) {
          anchor.style.color = "rgb(235, 101, 45)"
          continue;
        } 
        anchor.style.color = "rgb(233, 233, 233)"
      }
  
      if (window.innerWidth <= 1280) slide();
    }



    return (         
        <header>
          <nav id="nav">
            <div className="logo">
              <h1>Markvanding</h1>
            </div>
            <ul className="nav-links">
              <li>
                <button style={{color: "rgb(235, 101, 45)"}} onClick={(e) => HandleNavClick(e, "overview", "OVERSIGT")}>OVERSIGT</button>
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
    )
}

export default Header;