import React from 'react'
import { useState, useEffect } from 'react'

const Jokes = () => {
    const [joke, setJoke] = useState("Is this thing on?")
    const [myVoice, setMyVoice] = useState("")
    const [allVoices, setAllVoices] = useState(null)

    let tts = window.speechSynthesis
    let voices = []

    useEffect(() => {
        voices = tts.getVoices()
        console.log(voices)
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
        console.log("telling joke using", myVoice)
        let toSpeak = new SpeechSynthesisUtterance(joke)
        voices.forEach((voice) => {
            //get the correct voice object based on the chosen voice
            if (voice.name === myVoice){
                toSpeak.voice = voice
            }
        })
        tts.speak(toSpeak)
    }

  return (
    <div>
        <h3>Click the button to hear the robot tell a joke</h3>
        {JSON.stringify(joke)}
        {JSON.stringify(myVoice)}
        <form onSubmit={tellJoke}>
            <label htmlFor="joke">Enter a Joke Here</label>
            <input type='text' onChange={(e) => setJoke(e.target.value)} value={joke} placeholder='Enter your joke here'/>
            <label htmlFor='voice'>Choose a voice</label>
            <select name="voices" id="voice" onChange={(e) => setMyVoice(e.target.value)} value={myVoice}>
                {allVoices ?
                    allVoices.map((voice, i) => {
                        console.log("entering Ternary")
                        return <option key={i} value={voice.name}>{voice.name}</option>
                    })
                     :  <option>Options Loading</option>
                }
            </select>
            <button>Tell a Joke</button>
        </form>

    </div>
  )
}

export default Jokes