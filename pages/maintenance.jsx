import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router';
import Header from "./../components/Header";
import cookie from "cookie-cutter"

function Maintenance({ machineProps }) {
  const router = useRouter();
  const [machines, setMachines] = useState(machineProps)

  const HandleClick = (machine) => {
    router.push("/machine/" + machine.id)
  }

  useEffect(() => {
    var bool = cookie.get("loggedin")
    if (bool && bool == "true") {
      return
    } else {
      router.push("/")
    }
  }, [])

  return (
    <React.Fragment>
      <Header />
      <div className="mt-12 flex flex-row justify-center flex-wrap">
        <h1 className="-m-4 absolute text-2xl">Tryk på en boks for at tilgå maskinen</h1>
        {machines ? machines.map((machine) => {
          var data = machine.active == 1 ? {
            color: "#42CB6B",
            active: "Aktiv",
            pumpname: machine.pumpname,
            time: new Date(machine["time"]).toLocaleString("da-DK", {
              dateStyle: "medium",
              timeStyle: "short"
            })
          } : {
            color: "#DF4848",
            active: "Inaktiv",
            pumpname: "Ingen pumpe",
            time: "Ingen tid",
          }
          return (
              <button key={machine.id} className="group flex flex-col justify-center items-center w-64 h-64 m-12 text-white text-6xl bg-[#1a1a4e] overflow-hidden rounded-3xl" onClick={() => { HandleClick(machine) }}>
                  <h1 className="text-[64px] mt-[65%] group-hover:-mt-[30%] ease-out duration-300">
                    {machine.id}
                  </h1>
                  <div className="relative bg-red-600 h-full w-64 top-[25%]" style={{ background: data.color }}>
                    <p className="p-2 text-[24px]">
                      {data.active}
                    </p>
                    <div id="text-left">
                      <p className="text-base text-gray-600 w-full">
                        Pumpenavn
                      </p>
                      <h3 className="text-xl mb-5">
                        {data.pumpname}
                      </h3>
                      <p className="text-base text-gray-600 w-full">
                        Stop tidspunkt
                      </p>
                      <h3 className="text-xl mb-5">
                        {data.time}
                      </h3>
                    </div>
                  </div>
              </button>
          )
        }) : <></>}
      </div>
    </React.Fragment>
  )


}

export async function getServerSideProps() {
  var machineResponse = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/machines")
  var machines = await machineResponse.json()

  return {
    props: { 
      machineProps: machines,
    },
  }
}

export default Maintenance;