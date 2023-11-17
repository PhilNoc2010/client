import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Jokes = (props) => {
    const [joke, setJoke] = useState("Is this thing on?")
    const [myVoice, setMyVoice] = useState("")
    // const [allVoices, setAllVoices] = useState(null)

    let tts = window.speechSynthesis
    let voices = []
    let filteredVoices = []

    // useEffect(() => {
    //     console.log("generating voice list from jokes useeffect")
    //     voices = tts.getVoices()
    //     const filteredVoices = voices.filter((voice) => {
    //         //filters the list of languages for english adjacent in order to manage the size of the list
    //         return voice.name.includes("English")
    //     })
    //     setAllVoices(filteredVoices)
    // },[])

    function populateVoices() {
        console.log("generating voice list from populate voice function")
        voices = tts.getVoices()
        filteredVoices = voices.filter((voice) => {
        //filters the list of languages for english adjacent in order to manage the size of the list
            return voice.name.includes("English")
        })
        // setAllVoices(filteredVoices)
    }

    populateVoices();

    function tellJoke(e) {
        e.preventDefault()
        let randomJoke = ""

        randomJoke = axios.get("http://localhost:8000/api/randomjoke")
            .then(res => {
                randomJoke = res.data[0].setup + " " + res.data[0].punchline

                props.talkTracker(true)
                const toSpeak = new SpeechSynthesisUtterance(randomJoke)

                filteredVoices.forEach((voice) => {
                    //get the correct voice object based on the chosen voice
                    if (voice.name === myVoice) {
                        toSpeak.voice = voice
                    }
                })
                tts.speak(toSpeak)

                toSpeak.onend = (e) => {
                    // reset the flag to indicate that the animation should stop because the talking has finished
                    console.log('the bot spoke for ', e.elapsedTime / 1000, "seconds")
                    props.talkTracker(false)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div>
            <h3>Click the button to hear the robot tell a joke</h3>
            {JSON.stringify(joke)}
            {JSON.stringify(myVoice)}
            <form onSubmit={tellJoke}>
                <div>
                    <label htmlFor="joke">Enter a Joke Here</label>
                    <input type='text' onChange={(e) => setJoke(e.target.value)} value={joke} placeholder='Enter your joke here' />
                </div>
                <div>
                    <label htmlFor='voice'>Choose a voice:</label>
                    <select name="voices" id="voice" onChange={(e) => setMyVoice(e.target.value)} value={myVoice}>
                        {filteredVoices ?
                            filteredVoices.map((voice, i) => {
                                return <option key={i} value={voice.name}>{voice.name}</option>
                            }) : <option value="">Options Loading</option>
                        }
                    </select>
                </div>
                <button>Tell a Joke</button>
            </form>

        </div>
    )
}

export default Jokes