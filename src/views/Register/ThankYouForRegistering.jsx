import React from 'react'

const ThankYouForRegistering = () => {
    const radius = 20;
    const strokeWidth = 4;
    const diameter = radius * 2 + strokeWidth;
    const viewBox = `0 0 ${diameter} ${diameter}`;

  return (
    <div> 
        <h1>Registration Successful!</h1>
        <svg viewBox={viewBox} width='200px' height='200px' >
      <circle cx={radius + strokeWidth / 2} cy={radius + strokeWidth / 2} r={radius} stroke="green" strokeWidth={strokeWidth} fill="transparent" />
      <path fill="green" d="M16,20.3c-0.4,-0.4 -0.4,-1 0,-1.4l6.3,-6.3c0.4,-0.4 1,-0.4 1.4,0l14,14c0.4,0.4 1,0.4 1.4,0l3.5,-3.5c0.4,-0.4 1,-0.4 1.4,0c0.4,0.4 0.4,1 0,1.4l-18,18c-0.2,0.2 -0.4,0.3 -0.7,0.3c-0.2,0 -0.5,-0.1 -0.7,-0.3l-9.5,-9.5z"/>
    </svg>
    <p>Your registration has been submitted successfully.</p>
   
    </div>
  )
}

export default ThankYouForRegistering
