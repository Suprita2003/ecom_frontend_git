import React from 'react'
import './Navbar2.css'
import LocationTracker from './Location'
// import { IoLocationSharp } from "react-icons/io5";
// import { View } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";

export default function Navbar2() {

  
  return (
    <div className='navbar2'>
    <div className='nav2left'>
     <ul className='nav2ul'>
        <li>All</li>
        <li>Men</li>
        <li>Women</li>
    </ul>   
    </div> 

    <div className='nav2right'>
    <LocationTracker />
    </div>
    </div>
  )
}

