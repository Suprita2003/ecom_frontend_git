import React from 'react'
import './Footer.css'
import hs from '../../Assets/hs.png'
import { GrInstagram } from "react-icons/gr";
import { FaPinterestP } from "react-icons/fa6";
import { AiOutlineWhatsApp } from "react-icons/ai";
const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-logo'>
        <img src={hs} alt='' width={'70px'} height={'70px'}/>
        <p className='footer-logo-para'>Shop Here</p>
      </div>
      {/* <div className='footer-center'> */}
      <ul className='footer-links'>
        <li>Company</li>
        <li>Products</li>
        <li>Office</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className='footer-social-icon'>
        <div className='footer-icons-container'>
        <GrInstagram color='white' size={25}/>
        </div>
        <div className='footer-icons-container'>
        <FaPinterestP color='white' size={25}/>
        </div>
        <div className='footer-icons-container'>
        <AiOutlineWhatsApp color='white' size={25}/>
        </div>
      </div>
      <div className='footer-copyright'>
        <hr/>
        <p>Copyright@2025-All Right Reserved</p>
      </div>
      {/* </div> */}
    </div>
  )
}

export default Footer
