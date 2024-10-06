import React from 'react'
import "./SearchBar.css"
const SearchBar = () => {
  return (
    <div className="search-bar">
        <form className="search-form d-flex align-items-center"
        method="post"
        action="#"
        >
            <div>
              <input type="text" name="query" placeholder="Search" title="Enter search keyword" style={{backgroundColor: "white"}}/>
            </div>
            <button type="submit" title='Search'> 
                <i className="bi bi-search" style={{color: 'black'}}></i>
                
            </button>
        </form>
    </div>
  )
}


export default SearchBar