import React, { useState } from "react";
import "./Siedbar.css";
import { UserButton,useUser } from "@clerk/clerk-react";
import { MdDensitySmall } from "react-icons/md";

export default function ModalSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, user } = useUser(); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app-container">
      <button className="open-sidebar-btn" onClick={toggleSidebar}>
      <MdDensitySmall />All
      </button>

      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}>
          <div className="modal-sidebar" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleSidebar}>
              &times;
            </button>

{/* USER NAME DISPALY*/}
            <div className="user" style={{display: "flex", alignItems: "center",justifyContent: "center"}}>
      {isSignedIn ? (
        <>
        <UserButton postSignOutRedirectUri="/" /> 
          <span style={{ marginLeft: '10px',fontSize: '20px',fontWeight: 'bold'}}>
            Hello, {user?.fullName || user?.firstName || 'User'}
          </span>
          
        </>
      ) : (
        <SignInButton mode="modal" /> 
      )}
    </div>

            <ul>
              <li style={{ fontWeight: "bold" }}>Trending</li>
              <li>Best Sellers</li>
              <li>New Releases</li>
              <li>Movers and Shakers</li>

              <hr/>

              <li style={{ fontWeight: "bold" }}>Shop by Category</li>
              <li>Mobiles,Computers</li>
              <li>Men's Fashion</li>
              <li>Women's Fashion</li>

              <hr />

              <li style={{ fontWeight: "bold" }}>Help & Settings</li>
              <li>Your Account</li>
              <li>Customer Service</li>
              <li>About Us</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
