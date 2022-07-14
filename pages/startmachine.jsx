import React, { useEffect, useState } from 'react';
import Header from "./../components/Header";
import { useRouter } from 'next/router';
import cookie from "cookie-cutter"

import ChooseTime from "."

function Startmachine({machineProps, pumpProps}) {
  const [checked, setChecked] = useState(false)
  const [waterCheck, setWaterCheck] = useState(false)
  const [currentMachine, setCurrentMachine] = useState("")
  const [currentPump, setCurrentPump] = useState("")
  const [pumps, setPumps] = useState(pumpProps)
  const [machines, setMachines] = useState(machineProps)
  const [showChoose, setShowChoose] = useState(false)

  const router = useRouter();

  // function sendStartSMS(pumpnumber, pumpstartcode){
  //   fetch("http://remote.kkpartner.dk:3001/sendsms", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ 
  //       number: pumpnumber,
  //       message: pumpstartcode
  //     })
  //   })
  // }  


  useEffect(() => {    
    var bool = cookie.get("loggedin")
    if (bool && bool == "true") {
      return
    } else {
      router.push("/")
    }
  }, [])

  return(
    <React.Fragment>
      {showChoose && currentMachine ? <ChooseTime machine={currentMachine} /> : <>
       
        <Header />

        <form className="select mt-8" id="formstartmachine" onSubmit={(event) => {
          // Prevents default behavior (Getting put at another site)
          event.preventDefault();

          // Check if Checkbox is true or false
          if(!checked) return;

          // Check if a machine and pump is selected
          if(currentMachine && currentPump){

            if(!waterCheck) {
              fetch("/api/machines/start/" + currentMachine.id, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(currentPump)
              }).then(res => res).then(() => {
                router.push("/overview")
              })
            } 
            else {
              fetch("/api/machines/start/" + currentMachine.id, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(currentPump)
              }).then(res => res.json()).then(json => {
                setMachines(json)
                router.push("/choosetime/" + currentMachine.id)
              })
            }

                        
          };
        }}>
        <div className="text-center border-[#1a1a4e] sm:w-3/4 md:w-1/2 lg:w-1/3 border-solid border-2 m-auto">
          <label htmlFor="chosenmachine">Vælg en maskine</label>
          <br></br>
          <select name="chosenmachine" id="chosenmachine" className="bg-[#1a1a4e] text-white p-2 w-full text-2xl uppercase" defaultValue="blank" onChange={function(event){
            var correctMachine = machines.find((machine) => {
              return machine.id == event.target.value
            })
            setCurrentMachine(correctMachine);
          }}>
            <option value="blank" disabled hidden></option>
            {machines ? machines.filter(machine => !machine.active).map((element) => <option key={element.id} value={element.id}>{element.id}</option>) : <></>}
          </select>
        </div>

        <br></br>

        <div className="text-center border-[#1a1a4e] sm:w-3/4 md:w-1/2 lg:w-1/3 border-solid border-2 m-auto">
          <label htmlFor="">Vælg en pumpe</label>
          <br></br>
          <select name="chosenpump" id="chosenpump" className="bg-[#1a1a4e] text-white p-2 w-full text-2xl uppercase" defaultValue="blank" onChange={function(event){
            var options = event.target.children;
            var option = options[event.target.selectedIndex];

            var correctPump = pumps.find((pump) => {
              return pump.id == option.dataset.id && pump.active == 0
            })
            setCurrentPump(correctPump);
          }}>
            <option value="blank" disabled hidden></option>
            {pumps ? pumps.filter(pump => !pump.active).map(function(element) {
              return <option key={element.id} data-id={element.id}>{element.name}</option>
            }) : <></>}
          </select>
        </div>

        <br></br>

        <div className="text-center text-lg mb-4">
          <h2>Tjek følgende</h2>
        </div>
        <ol className="m-auto text-2xl p-1 border-2 border-[#1a1a4e] mb-4 sm:w-3/4 md:w-1/2 lg:w-1/3">
          <li>1. Hydrant åben</li>
          <li>2. Maskine er sat i gear</li>
          <li>3. Slange korrekt placeret</li>
          <li>4. Aflæs tiden</li>
          <li>5. Dyse valg korrekt</li>
        </ol>
        <label className="checkBoxContainer group flex items-center justify-center cursor-pointer text-2xl m-auto gap-1">Jeg har tjekket overstående
          <input className="hidden" onChange={() => setChecked(!checked)} type="checkbox"></input>
          <span className="checkmark group-hover:bg-[#777]"></span>
        </label>
        <label className="checkBoxContainer group flex items-center justify-center cursor-pointer text-2xl m-auto gap-1 mt-5">Vælg tid med det samme
          <input className="hidden" onChange={() => setWaterCheck(!waterCheck)} type="checkbox"></input>
          <span className="checkmark group-hover:bg-[#777]"></span>
        </label>
          

        <button type="submit" className="bg-[#1a1a4e] p-4 rounded-md text-white text-3xl mt-8 hover:border-none hover:bg-slate-500">START VANDING</button>

        </form>
       </>}

    </React.Fragment>
  );

}

export async function getServerSideProps() {
  var machineResponse = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/machines")
  var machines = await machineResponse.json()

  var pumpResponse = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/pumps")
  var pumps = await pumpResponse.json()

  return {
    props: { 
      machineProps: machines,
      pumpProps: pumps
    },
  }
}

export default Startmachine;