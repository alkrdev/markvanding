import React, { useState } from "react"
import { useRouter } from 'next/router'
import cookie from "cookie-cutter"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter(); 

    return (   
      <>
        <header>
          <nav className="flex min-h-[8vh] justify-around items-center bg-[#1a1a4e] uppercase">
            <div className="text-gray-300 uppercase text-xl">
              <h1>Markvanding</h1>
            </div>
            
            <ul className={isOpen == true ? "justify-around w-3/5 z-10 h-24 md:flex showMenuNav" : "hidden justify-around w-3/5 z-10 h-24 md:flex"}>
              <li className={"text-gray-300 flex mx-1 items-center flex-grow justify-center w-full cursor-pointer h-full hover:bg-indigo-900 "} onClick={(e) => router.push("../overview")}>OVERSIGT</li>
              <li className={"text-gray-300 flex mx-1 items-center flex-grow justify-center w-full cursor-pointer h-full hover:bg-indigo-900 "} onClick={(e) => router.push("../startmachine")}>START VANDING</li>
              <li className={"text-gray-300 flex mx-1 items-center flex-grow justify-center w-full cursor-pointer h-full hover:bg-indigo-900 "} onClick={(e) => router.push("../maintenance")}>VEDLIGEHOLDELSE</li>
              <li className={"text-gray-300 flex mx-1 items-center flex-grow justify-center w-full cursor-pointer h-full hover:bg-indigo-900 "} onClick={(e) => router.push("../machinepark")}>MASKINPARK</li>
              <li className={"text-gray-300 flex mx-1 items-center flex-grow justify-center w-full cursor-pointer h-full hover:bg-indigo-900 "} style={{color: "red"}} onClick={() => {
                cookie.set("loggedin", false)
                router.push("/")
              }}>LOG UD</li>
            </ul>
            <div className="cursor-pointer block md:hidden" onClick={() => {setIsOpen(prev => !prev)}}>
              <div className={`w-6 h-1 bg-gray-300 m-1 transition duration-300 ${isOpen ? "transform rotate-45" : ""}`}></div>
              <div className={`w-6 h-1 bg-gray-300 m-1 transition duration-300 ${isOpen ? "opacity-0" : ""}`}></div>
              <div className={`w-6 h-1 bg-gray-300 m-1 transition duration-300 ${isOpen ? "transform rotate-135" : ""}`}></div>
            </div>
          </nav>
          <style>{`
            .hideMenuNav {
              display: none;
            }
            .showMenuNav {
              display: block;
              position: absolute;
              width: 100%;
              height: 40vh;
              top: 8vh;
              left: 0;
              background: #1a1a4e;
              z-index: 10;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              align-items: center;
            }
          `}</style>
        </header>
      </>      

    )
}

export default Header;