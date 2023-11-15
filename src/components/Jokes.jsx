import React from 'react'
import { useState, useEffect } from 'react'

const Jokes = (props) => {
    const [joke, setJoke] = useState("Is this thing on?")
    const [myVoice, setMyVoice] = useState("")
    const [allVoices, setAllVoices] = useState(null)

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
        voices = tts.getVoices()
    }

    function tellJoke(e) {
        e.preventDefault()

        props.talkTracker(true)
        const toSpeak = new SpeechSynthesisUtterance(joke)

        voices.forEach((voice) => {
            //get the correct voice object based on the chosen voice
            if (voice.name === myVoice){
                toSpeak.voice = voice
            }
        })
        tts.speak(toSpeak)

        toSpeak.onend = (e) => {
            // reset the flag to indicate that the animation should stop because the talking has finished
            console.log('the bot spoke for ', e.elapsedTime/1000, "seconds")
            props.talkTracker(false)
        }
    }

  return (
    <div>
        <h3>Click the button to hear the robot tell a joke</h3>
        {JSON.stringify(joke)}
        {JSON.stringify(myVoice)}
        <form onSubmit={tellJoke}>
            <div>
            <label htmlFor="joke">Enter a Joke Here</label>
            <input type='text' onChange={(e) => setJoke(e.target.value)} value={joke} placeholder='Enter your joke here'/>
            </div>
            <div>
            <label htmlFor='voice'>Choose a voice</label>
            <select name="voices" id="voice" onChange={(e) => setMyVoice(e.target.value)} value={myVoice}>
                {allVoices ?
                    allVoices.map((voice, i) => {
                        return <option key={i} value={voice.name}>{voice.name}</option>
                    }) :  <option value="">Options Loading</option>
                }
            </select>
            </div>
            <button>Tell a Joke</button>
        </form>

    </div>
  )
}

export default Jokes