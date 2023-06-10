// Packages:
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// import LockerForm from '../../../views/Lockers/LockerForm'

// Imports:
import { Search } from 'lucide-react'


// Styles:
import { FLEX } from '../../../styles/snippets'

const Wrapper = styled.div`
  ${ FLEX }
  justify-content: space-between;
  width: 100%;
  height: 2rem;
  margin-bottom: 1.5rem;
`

const SearchWrapper = styled.div`
  padding: 0.25rem;
  border: 1px solid #999999;
`

const SearchBox = styled.input`
  border: none;
  outline: none;
`


// Functions:
const AuthTopbar = ({ data, setData, searchKey }, props) => {
  // State:
  const [ searchValue, setSearchValue ] = useState('')
  // const [components, setComponents] = useState(["Sample Component"]); 
    
  //   function addComponent() { 
      
  //     setComponents([...components, "Sample Component"]) 
      
  //   } 
    
  // Effects:
  useEffect(() => {
    if (searchValue.trim().length === 0) setData(data)
    else setData(data.filter(dataElement => dataElement[searchKey].toLowerCase().includes(searchValue)))
  }, [ searchValue ])
  
  // Return:
  return (
    <>
    <Wrapper>
      <SearchWrapper>
        <SearchBox
          type='text'
          value={ searchValue }
          onInput={ e => setSearchValue(e.currentTarget.value.toLowerCase()) }
        />
        <Search size='1rem' style={{ marginTop: '-0.1rem', margin: '0 0.5rem' }} />
      </SearchWrapper>
      {/* <button  style={{ userSelect: 'none', cursor: 'pointer' }} onClick={addComponent} >Add New Record</button> */}
      
    </Wrapper>
    {/* <div>
    {
      components.map((item, i) => <LockerForm text={item}/> )
    }
  </div> */}

    </>
  )
}


// Exports:
export default AuthTopbar
