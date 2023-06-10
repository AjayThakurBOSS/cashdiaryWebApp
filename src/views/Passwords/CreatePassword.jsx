import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { AUTH_HEADERS } from '../../api/endpoints'
import { PASSWORD_LOCKER } from '../../api/endpoints'
import { useNavigate, Link } from 'react-router-dom'



const CreatePassword = () => {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [loginId, setLoginId] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Button Clicked')
        axios.post('http://103.150.136.244/api/PasswordLocker', {
            name: name,
            url : url,
            loginId: loginId,
            password: password,
            lastUpdate: (new Date).toISOString()
        },
        {headers: { ...AUTH_HEADERS} },
       
        )
        .then(() => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            navigate("/read");
           })
    }

  return (
    <>
        <form className='lockerForm'>
            <div className='formfields'>
                <div className='form-control'>
                    <label htmlFor='name'>Password Name</label>
                    <input type='text' id='name' name='name' onChange={(e) => setName(e.target.value)} ></input>
                    
                </div >

                <div className='form-control'>
                    <label htmlFor='lockerNumber'>URL</label>
                    <input type="text"  id='lockerNumber' name='lockerNumber' onChange={(e) => setUrl(e.target.value)}></input>
                   
                </div>

                <div className='form-control'>
                    <label htmlFor='pin'>Login Id</label>
                    <input type="text"  id='pin' name='pin' onChange={(e) => setLoginId(e.target.value)} ></input>
                  
                </div>

                <div className='form-control'>
                    <label htmlFor='comments'>password</label>
                    <input type="text"  id='comments' name='comments' onChange={(e) => setpassword(e.target.value)} ></input>
                    
                </div>

                <div className='form-control'>
                    <label htmlFor='lastUpdarted'>Last Updated </label>
                    <input type="date"  id='lastUpdarted' name='lastUpdarted' ></input>
                    
                </div>

                
            </div>
            <Link to="/read">
            <button type='submit' className='submitButton' onClick={handleSubmit}>Submit</button>     
            </Link>
            </form>
    </>
  )
}

export default CreatePassword
