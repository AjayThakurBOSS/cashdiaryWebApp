import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { AUTH_HEADERS } from '../../api/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSubscriptionData } from '../../redux/actions/userSubscriptionAction';
import { BASE } from '../../api/endpoints';

const UserSubscription = () => {
const dispatch = useDispatch()
  const userSubsccriptionData = useSelector((state) => state)
  console.log("userSubsccriptionData:--", userSubsccriptionData)

  // useEffect(() => {
  //   dispatch(fetchUserSubscriptionData())
  // },[]) 

    let countDuration = 180;
    const [timeLeft, setTimeLeft] = useState(countDuration);

    const startDate = new Date()
    const startDate1 = new Date()
    const StartDateISO = startDate.toISOString()
    startDate.setDate(startDate.getDate() + 180);
    const endDate  = startDate.toISOString()
    const endDate2 = startDate.toDateString()
    console.log(`Start Date:- ${StartDateISO}, End Date:- ${endDate}`)
    const endDate1 = new Date(endDate2)
    
    console.log(`Start Date1:- ${startDate1}, End Date1:- ${endDate1}`)
    const timeDifference =endDate1.getTime() - startDate1.getTime() 
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24); 

    const PostUserSubscription = () => {
      axios.post(BASE + `/UserSubscription`,
      {
        startDate: startDate,
        endDate: endDate
      },
      { headers: { ...AUTH_HEADERS } }
      )
      .then((response) => {
        console.log("Use Subscription Post Responsre:- ",response)
      })
    }
    PostUserSubscription()

  

  return (
    <div>{daysDifference}</div>
  )
}



export default UserSubscription