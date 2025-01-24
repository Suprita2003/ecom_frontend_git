import React from 'react'
import { GoSearch } from "react-icons/go";

export default function Searchbar() {
  return (
    <>
      <div className="search-container" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', borderRadius: '5px' }}>
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          style={{
            width: '25%',
            // padding: '10px',
            border: 'black 1px solid',
            borderRadius: '5px',
            outline: 'none',
            marginRight: '10px',
            position: 'absolute',
            zIndex: '0',
          }}
        />
        <GoSearch
          style={{
            color: 'black',
            fontSize: '24px',
            cursor: 'pointer',
            bottom: '5px',
            left: '98.2%',
            position: 'relative',
            zIndex: '2',
            padding: '6px',
            borderBottomRightRadius: '5px',
            borderTopRightRadius: '5px',
            backgroundColor: 'rgba(255, 166, 0, 0.721)',
          }}
        />
      </div>
    
    </>
  )
}
