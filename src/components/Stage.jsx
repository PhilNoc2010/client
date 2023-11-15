import laughbot0 from '../assets/laughbot-0.jpg'
import laughbot1 from '../assets/laughbot-1.png'
import laughbot2 from '../assets/laughbot-2.png'
import React from 'react'
import { useState } from 'react'

const Stage = (props) => {

    const [laughbotFrames, setLaughBotFrames] = useState([laughbot0, laughbot1, laughbot2])
    const [frameNum, setFrameNum] = useState(0)

    const [botTalking, setBotTalking] = useState(false)

    const [stateInterval, setStateInterval] = useState(0)

    let frame = 0

    //animate the bot without using state variables until the end
    function animateBot(){
        if (frame >= laughbotFrames.length-1) {
                    frame--
                }else {
                    frame++
                }
        setFrameNum(frame)
    }

    const startBot = () => {
        setStateInterval(setInterval(() => {
            animateBot()
        }, 1000))

    }

    const stopBot = () => {
        clearInterval(stateInterval)
        setFrameNum(0)
    }

  return (
    <div>On Stage
        <img src={laughbotFrames[frameNum]} style={{height:"500px"}} alt="laughbot" />
        {/* <button onClick={startBot} >Start</button>
        <button onClick={stopBot} >Stop</button>
        <button onClick={animateBot}>click to animate</button> */}
        <button onClick={() => {setFrameNum(0)}}>reset animation</button>

        <p>Robot is Talking: {JSON.stringify(props.talkFlag)}</p>
    </div>
  )
}

export default Stage