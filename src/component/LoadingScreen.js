import React, { useState } from 'react'

const LoadingScreen = () => {
	const [text, setText] = useState("Please Wait Untill The Class Opens");
	const animation = () => {
		setInterval(() => {
			if(text === "Please Wait Untill The Class Opens"){
				setText("Please Wait Untill The Class Opens.")
			}
			else if(text === "Please Wait Untill The Class Opens."){
				setText("Please Wait Untill The Class Opens..")
			}
			else if(text === "Please Wait Untill The Class Opens.."){
				setText("Please Wait Untill The Class Opens...")
			}
			else if(text === "Please Wait Untill The Class Opens..."){
				setText("Please Wait Untill The Class Opens")
			}
		}, 500);
	}
	// animation()
  return (
	<div className='loading flex justify-center items-center text-5xl'>{ text }</div>
  )
}

export default LoadingScreen