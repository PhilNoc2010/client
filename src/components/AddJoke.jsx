import React from 'react'
import { useState } from 'react'
import axios from 'axios'


const AddJoke = (props) => {
    //state variable to hold returned errors
    const [errors, setErrors] = useState([])

    //state variables to hold form inputs
    const [setup, setSetup] = useState("")
    const [punchline, setPunchline] = useState("")

    const submitHander = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/jokes", {
            setup,
            punchline
        })
        .then(res => {
            console.log(res.data)
            setSetup("")
            setPunchline("")
            setErrors([])
        })
        .catch(err => {
            console.log(err)
            //display errors to the user
            const errorRes = err.response.data.errors
            const errorArr = []
            for (const key of Object.keys(errorRes)) {
                errorArr.push(errorRes[key].message)
            }
            setErrors(errorArr)
        })

    }

  return (
    <div>AddJoke

        {errors.map((err, i) => <p key={i} style={{color:"lightred", fontWeight:"bold" }}>{err}</p>)}
        <p>For "One-Liner" Jokes, enter all information in the Punchline Field</p>
        <form onSubmit={submitHander} autoComplete="off">
            <div>
                <label htmlFor="setup">Joke Setup:</label>
                <input type="text" id="setup" name="setup" placeholder="Joke Setup" onChange={(e) => setSetup(e.target.value)} value={setup} size="40"/>
            </div>
            <div>
                <label htmlFor="punchline">Punchline:</label>
                <input type="text" id="punchline" name="punchline" placeholder="Punchline goes here" onChange={(e) => setPunchline(e.target.value)} value={punchline} size="40"/>
            </div>
            <button>Add Joke to DB</button>
        </form>
    </div>
  )
}

export default AddJoke