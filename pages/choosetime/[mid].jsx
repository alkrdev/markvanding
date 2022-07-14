import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

const ChooseTime = () => {
  const [selectedTime, setSelectedtime] = useState({})
  const [selectedTimeType, setSelectedTimeType] = useState("")
  const [machineWithoutTime, setMachineWithoutTime] = useState({})

  const router = useRouter();
  
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

    useEffect(() => {
    }, [selectedTime])

    useEffect(() => {

      fetch("/api/machines/" + router.query.mid)
      .then(res => res.json())
      .then(json => setMachineWithoutTime(json))

    }, [router.isReady])

    return (
      <form onSubmit={function(event) {  
        event.preventDefault();
        
        machineWithoutTime.time = selectedTime  
        

        fetch("/api/machines/" + machineWithoutTime.id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(machineWithoutTime)
        }).then(res => res).then(() => {
              router.push("/overview")
            })

        
      }}>
        <div id="choosetime">
          <div className="tab overflow-hidden m-auto flex border-none b-white">
            <button type="button" className="bg-[#1a1a4e] cursor-pointer p-5 text-2xl flex-grow transition duration-300 m-1 hover:bg-[#1a1a4eb9] focus:bg-white focus:text-black" onClick={() => setSelectedTimeType("timeremaining")}>Tid tilbage</button>
            <button type="button" className="bg-[#1a1a4e] cursor-pointer p-5 text-2xl flex-grow transition duration-300 m-1 hover:bg-[#1a1a4eb9] focus:bg-white focus:text-black" onClick={() => setSelectedTimeType("date")}>Klokkeslæt</button>
          </div>
          <h1 className="text-2xl m-5">MANGLER TID: {machineWithoutTime.pumpname}</h1>
          {selectedTimeType == "timeremaining" ? 
          <div id="timeremaining" className="flex flex-col items-center m-auto bg-slate-300 h-fit w-9/12">
            <h3 className="text-4xl m-5">Tid tilbage</h3>
            <input className="text-2xl m-5" name="timeremaining" defaultValue="00:00" required onChange={(event) => TimeChanged(event)} type="time" size="50"></input>
            <button type="submit" className="bg-[#1a1a4e] rounded-md text-3xl p-5 m-5">START</button>
          </div> 
          : selectedTimeType == "date" ?
          <div id="date" className="flex flex-col items-center m-auto bg-slate-300 h-fit w-9/12">
            <h3 className="text-4xl m-5">Klokkeslæt</h3>
            <input className="text-2xl m-5" name="date" required onChange={(event) => TimeChanged(event)} type="datetime-local" min={new Date().toISOString().slice(0, 16)} size="50"></input>
            <button type="submit" className="bg-[#1a1a4e] rounded-md text-3xl p-5 m-5">START</button>
          </div> : <></>}
        </div>
    </form>
    )
}

export default ChooseTime;