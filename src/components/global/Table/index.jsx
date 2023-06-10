// Packages:
import React from 'react'
import styled from 'styled-components'


// Styles:
const Wrapper = styled.div`
  width: 100%;
  border: 1px solid #999999;
  border-bottom: none;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 2rem;
  border-bottom: 1px solid #999999;
`

const Column = styled.div``


// Functions:
const Table = ({ id, rows, columnWidth, style }) => (
  <Wrapper style={ style }>
    { rows.map((row, index) => {
      if (row.length === 0) return <React.Fragment key={`${ id }-r-${ index }`}></React.Fragment>
      return (
        <Row key={`${ id }-r-${ index }`} style={{ backgroundColor: index % 2 === 0 ? '#F6F6F6' : '#E0E0E0' }}>
          { row.map((column, _index) =>
            <Column key={`${ id }-r-${ index }-c-${ _index }`} style={{ width: columnWidth ?? `${ 100 / row.length }%` }}>{ column }</Column>
          )}
        </Row>
      )}
    )}
  </Wrapper>
)


// Exports:
export default Table
