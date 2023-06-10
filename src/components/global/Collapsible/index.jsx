// Packages:
import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'



// Imports:
import {
  ChevronDown,
  Minus
} from 'lucide-react'


// Constants:
import { FLEX } from '../../../styles/snippets'
import COLORS from '../../../styles/colors'


// Styles:
const Wrapper = styled.div``

const Header = styled.div`
  ${ FLEX }
  justify-content: space-between;
  width: 100%;
  height: 3rem;
  padding: 0 2rem;
  color: #FFFFFF;
  background-color: #002857;

  /* color: ${ props => props.isOpen ? '#FFFFFF' : COLORS.PRIMARY };
  background-color: ${ props => props.isOpen ? COLORS.PRIMARY : '#ECECEC' }; */
  cursor: pointer;
  transition: all 0.25s ease;
`

const Title = styled.div`
display: flex;
flex-direction: row;
align-items: space-between;
justify-content: space-between !important;
  font-size: 1.1rem;
  font-weight: 500;
  user-select: none;
  width: 100%;
  padding-right: 1rem;
`

const MainArea = styled.div`
  width: 100%;
  background: #FFFFFF;
  overflow: hidden;
  transition: all 0.25s ease;
`


// Functions:
const Collapsible = ({  title, isHighlighted, title1, children }) => {
  // Ref:
  let containerRef = useRef()

  // State:
  const [ height, setHeight ] = useState(null)
  const [ isOpen, setIsOpen ] = useState(false)

  // Effects:
  useEffect(() => {
    if (containerRef.current) setHeight(`${ containerRef.current.getBoundingClientRect().height }px`)
  }, [ children ])
  
  
  // Return:
  return (
    <Wrapper style={{ marginBottom: isOpen ? '1rem' : '0.1rem' }}>
      <Header isOpen={ isOpen } onClick={ () => setIsOpen(!isOpen) }>
        <Title style={{ color: isHighlighted ? isOpen ? 'inherit' : '#E11C1C' : 'inherit' }}>
          
          <div>{ title }</div> <div>{ title1}</div>
          
           </Title>
        {
          isOpen ?
            <Minus /> :
            <ChevronDown />
        }
      </Header>
      <MainArea style={{
        maxHeight: isOpen ? height ?? '15rem': '0',
        border: isOpen ? '1px solid rgb(153, 153, 153)' : '1px solid rgba(153, 153, 153, 0)'
      }}>
        <div ref={ containerRef } style={{ width: '100%', height: '100%', padding: '1rem' }}>
          { children }
        </div>
      </MainArea>
    </Wrapper>
  )
}


// Exports:
export default Collapsible
