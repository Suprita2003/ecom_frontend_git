import React from 'react'
import './Navbar.css'
import hs from '../../Assets/hs.png'
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import Searchbar from './Searchbar'
import cart from '../../Assets/cart.png'
// import { GoSearch } from "react-icons/go";

export default function Navbar() {
    const {isSignedIn} = useUser();


    // const getCartCount = () => {
    //   if (!cart || !cart.products) return 0; 
    
    //   return cart.products.reduce((item) => item + item.quantity);
    // };

  return (
    <div className='navbar'>
        <div className='navleft'>
            <img src={hs} alt="" width='50px' height='50px'/>
            <a href='/home' className='navhome'><h1>Happy Shopping</h1></a>
        </div>

        <div className='navcenter'>
            <Searchbar/>
        </div>

        <div className="navright">   
          <div className="carticon">
            <a href='/cart'> <img src={cart} alt="" width='30px' height='30px'/> </a>
            {/* <div className='navcartcount'>{getCartCount()}</div> */}
          </div>
          <div className='user'>
            {isSignedIn ? (
            <UserButton postSignOutRedirectUri="/" />
          ) : ( <SignInButton mode ="modal" /> )}
          </div>
      </div>
      </div>
  )
}
