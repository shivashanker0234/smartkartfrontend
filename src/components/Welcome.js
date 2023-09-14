import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
    const navigate= useNavigate();
    const handler=()=>{
    navigate("/home")
    }
  return (
    <div>
      Welcome User 
      <button onClick={handler}>Home</button>
    </div>
  )
}

export default Welcome
