import React, { useState } from 'react'
import SearchContext from './SearchContext'

const SearchState = (props) => {
    const [modalOpen, setModalOpen] = useState(true)
  return (
    
    <SearchContext.Provider value={{modalOpen, setModalOpen}}>
      {props.children}
    </SearchContext.Provider>

  )
}

export default SearchState