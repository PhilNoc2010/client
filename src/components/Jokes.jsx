import React from 'react'
import { useState, useEffect } from 'react'

const Jokes = (props) => {
    const [joke, setJoke] = useState("Is this thing on?")
    const [myVoice, setMyVoice] = useState("")
    const [allVoices, setAllVoices] = useState(null)

    //create a state variable to track if the bot should be animating or not
    const [botFlag, setBotFlag] = useState(false)

    let tts = window.speechSynthesis
    let voices = []

    useEffect(() => {
        voices = tts.getVoices()
        const filteredVoices = voices.filter((voice) => {
            //filters the list of languages for english adjacent in order to manage the size of the list
            return voice.name.includes("English")
        })
        setAllVoices(filteredVoices)
    },[])

    populateVoices();

    function populateVoices(){
        voices = tts.getVoices();
    }


    function tellJoke(e) {
        e.preventDefault()

        // set a flag to indicate that the animation should start
        setBotFlag(true)
        console.log('robot is talking', JSON.stringify(botFlag))
        props.talkTracker(botFlag)

        const toSpeak = new SpeechSynthesisUtterance(joke)
        voices.forEach((voice) => {
            //get the correct voice object based on the chosen voice
            if (voice.name === myVoice){
                toSpeak.voice = voice
            }
        })
        tts.speak(toSpeak)

        // reset the flag to indicate that the animation should stop

        setBotFlag(!botFlag)
        console.log('robot is still talking', JSON.stringify(botFlag))
        props.talkTracker(botFlag)
    }

  return (
    <div>
        <h3>Click the button to hear the robot tell a joke</h3>
        {JSON.stringify(joke)}
        <form onSubmit={tellJoke}>
            <label htmlFor="joke">Enter a Joke Here</label>
            <input type='text' onChange={(e) => setJoke(e.target.value)} value={joke} placeholder='Enter your joke here'/>
            <label htmlFor='voice'>Choose a voice</label>
            <select name="voices" id="voice" onChange={(e) => setMyVoice(e.target.value)} value={myVoice}>
                {allVoices ?
                    allVoices.map((voice, i) => {
                        return <option key={i} value={voice.name}>{voice.name}</option>
                    }) :  <option value="">Options Loading</option>
                }
            </select>
            <button>Tell a Joke</button>
        </form>
        <button onClick={() => {setBotFlag(!botFlag)}}>Trigger State</button>
        <p>Talk State is Triggered: {JSON.stringify(botFlag)}</p>

    </div>
  )
}

export default Jokes