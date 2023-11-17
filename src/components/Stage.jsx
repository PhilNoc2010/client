import laughbot0 from '../assets/laughbot-0.jpg'
import laughbot1 from '../assets/laughbot-1.png'
import laughbot2 from '../assets/laughbot-2.png'
import React from 'react'
import { useState, useEffect } from 'react'

const Stage = (props) => {

    const [laughbotFrames, setLaughBotFrames] = useState([laughbot0, laughbot1, laughbot2])
    const [frameNum, setFrameNum] = useState(0)

    const [stateInterval, setStateInterval] = useState(0)

    useEffect(() => {
        if (props.talkFlag === true) {
            startBot()
        } else if (props.talkFlag === false ){
            stopBot()
        }
    }, [props.talkFlag])

    let frame = 0

    //animate the bot without using state variables until the end
    function animateBot() {
        if (frame >= laughbotFrames.length - 1) {
            frame--
        } else {
            frame++
        }
        setFrameNum(frame)
    }

    const startBot = () => {
        setStateInterval(setInterval(() => {
            animateBot()
        }, 500))
    }

    const stopBot = () => {
        clearInterval(stateInterval)
        setFrameNum(0)
    }

    return (
        <div>
            <img src={laughbotFrames[frameNum]} style={{ width: "40%" }} alt="laughbot" />
            {/* <p><button onClick={startBot} >Start</button></p>
            <p><button onClick={stopBot} >Stop</button></p>
            <p><button onClick={animateBot}>click to animate</button></p>
            <p><button onClick={() => { setFrameNum(0) }}>reset animation</button></p> */}

            {/* <p>Robot is Talking: {JSON.stringify(props.talkFlag)}</p> */}
        </div>
    )
}

export default Stage