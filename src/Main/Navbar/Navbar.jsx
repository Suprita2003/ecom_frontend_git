import React from 'react'
import './Navbar.css'
import hs from '../../Assets/hs.png'
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import Searchbar from './Searchbar'
import cart from '../../Assets/cart.png'

export default function Navbar() {
    const {isSignedIn} = useUser();

  return (
    <div className='navbar'>
        <div className='navleft'>
            <img src={hs} alt="" width='50px' height='50px'/>
            <h1>Happy Shopping</h1>
        </div>

        <div className='navcenter'>
            <Searchbar/>
        </div>

        <div className="navright">   
          <div className='cart'>
            <a href='/cart'> <img src={cart} alt="" width='30px' height='30px'/> </a>
          </div>
          <div className='user'>
            {isSignedIn ? (
            <UserButton postSignOutRedirectUri="/"/>
          ) : ( <SignInButton mode ="modal"/> )}
          </div>
      </div>
      </div>
  )
}
