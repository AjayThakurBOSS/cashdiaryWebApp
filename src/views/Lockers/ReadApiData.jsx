import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AUTH_HEADERS } from '../../api/endpoints'
import { useState, useEffect } from 'react'

const ReadApiData = () => {
    const [data, setData] = useState([])

    function getData(){
        axios.get('https://103.150.136.244/api/Locker',
        {headers: { ...AUTH_HEADERS}})
        .then((res) => {
            setData(res.data)
        })
    }

  return (
    <div>ReadApiData</div>
  )
}

export default ReadApiData