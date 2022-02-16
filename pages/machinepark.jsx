import React, {useEffect, useState} from 'react';

import Header from "../components/Header"

import Pumps from "../components/Pumps"
import Machines from "../components/Machines"

import CreateMachine from "../components/CreateMachine"
import UpdateMachine from "../components/UpdateMachine"
import DeleteMachine from "../components/DeleteMachine"

import CreatePump from "../components/CreatePump"
import UpdatePump from "../components/UpdatePump"
import DeletePump from "../components/DeletePump"


const MachinePark = () => {
  const [currentMachine, setCurrentMachine] = useState({})
  const [showingModal, setShowingModal] = useState(false)
  const [currentPump, setCurrentPump] = useState({
    name: "",
    number: "",
    startcode: "",
    stopcode: ""
  })

  return (
    <div>
      <Header />
      <Pumps setCurrentPump={setCurrentPump} setShowingModal={setShowingModal}/>
      <Machines setCurrentMachine={setCurrentMachine} setShowingModal={setShowingModal}/>

      {showingModal ? <React.Fragment>
        <CreatePump    setShowingModal={setShowingModal} />
        <UpdatePump    setShowingModal={setShowingModal} currentPump={currentPump}/>
        <DeletePump    setShowingModal={setShowingModal} currentPump={currentPump}/>

        <CreateMachine setShowingModal={setShowingModal} />
        <UpdateMachine setShowingModal={setShowingModal} currentMachine={currentMachine}/>
        <DeleteMachine setShowingModal={setShowingModal} currentMachine={currentMachine}/>
      </React.Fragment> : <></>}
    </div>
  )
}

export default MachinePark;