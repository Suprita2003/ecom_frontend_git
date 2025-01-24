import React, { useState } from 'react'
import './Navbar2.css'
import LocationTracker from './Location'
import ModalSidebar from './Sidebar'

export default function Navbar2() {
  
  return (
    <div className='navbar2'>
    <div className='nav2left'>
      <ModalSidebar/>
    </div> 

    <div className='nav2right'>
    <LocationTracker />
    </div>
    </div>
  )
}

