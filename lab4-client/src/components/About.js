import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./components.module.css"
import Row from "./Row";


const About = ({children, onClick, ...props}) => {

    const [joke, setJoke] = useState()
    const [gif, setGif] = useState()

    useEffect(()=>{
        async function loadJoke(){
            let {data} = await axios.get('https://geek-jokes.sameerkumar.website/api?format=json')
            setJoke(data.joke)
        }
        async function loadGif(){
            let {data} = await axios.get('https://yesno.wtf/api')
            setGif(data.image)
        }
        loadJoke()
        loadGif()
    },[])

    return(
        <div>
            <div class = {classes.pageText}>
            <Row>{joke}</Row>
            <img src={gif}></img>
            <Row>
                <img src = {require('../static/da.png')} height="250px" style={{margin:'0px 50px 0px 0px'}}/>
                Logo of the company is the symbol of culter. Soft lines are like flowing of our lifes, where everything matters. We try to fill people lifes with happiness, love and fun. In our cinema everybody can feel home!
            </Row>
            <p width="700px">Our cinema was built by ancient people. Many time this place was recovered: 1892, 1960, 2000 and 2023. And now over than 200 people work here. You can watch last video we make.</p>
            </div>
            
        </div>
    )
}

export default About