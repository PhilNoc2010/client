import laughbot0 from '../assets/laughbot-0.jpg'
import laughbot1 from '../assets/laughbot-1.png'
import laughbot2 from '../assets/laughbot-2.png'
import React from 'react'
import { useState } from 'react'

const Stage = () => {

    const [laughbotFrames, setLaughBotFrames] = useState([laughbot0, laughbot1, laughbot2])
    const [frameNum, setFrameNum] = useState(0)

    let myInterval = null
    let counter = 0

    function animateBot() {
        // setFrameNum(frameNum + 1)
        // if (frameNum >= laughtbotFrames.length-1) {
        //     setFrameNum(frameNum - 1)
        // }

    }

    function startBot()  {
        console.log("starting bot counter")
        myInterval = setInterval(() => {
            setFrameNum(frameNum+1)
            if (frameNum >= laughbotFrames.length -1){
                setFrameNum(frameNum-1)
            }
            console.log('framenum', frameNum)
        }, 1000);
    }

    function stopBot() {
        console.log("stopped bot")
        return () => clearInterval(myInterval)
    }

  return (
    <div>On Stage
        <img src={laughbotFrames[frameNum]} style={{height:"500px"}} alt="laughbot" />
        {/* <button onClick={(e) => animateBot()} >Animate</button> */}
        <button onClick={startBot} >Start</button>
        <button onClick={stopBot} >Stop</button>
    </div>
  )
}

export default Stage