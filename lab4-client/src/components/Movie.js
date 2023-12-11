import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getPoster } from "../http/dbAPI";
import classes from "./components.module.css";

const Movie = ({movie, ...props}) => {

    const [image, setImage] = useState()

    useEffect(()=>{
        async function a(){
            let img = await getPoster(movie.posterUrl)
            setImage(img)
        }
        a();
    },[movie])
    
    return(
        <NavLink key={'/Movie/'+movie.id} style={{textDecoration: 'none', color:'#282828'}} to = {'/movie/'+movie.id}>
                <div className = {classes.movieBlock}>
                    <img src = {image} className={classes.moviePoster}/>
                    <div className = {classes.movieDescription}>
                        <h1>{movie.name}</h1>
                        <h2>Duration: {movie.duration}</h2>
                        <h2>Country: {movie.country}</h2>
                        <h2>Duration: {movie.duration}</h2>
                    </div>
                    <p>
                        {movie.rating} ★
                    </p>
                </div>
        </NavLink>
    )
}

export default Movie