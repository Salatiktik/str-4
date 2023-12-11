import React, { useState , useEffect} from "react";
import classes from "./components.module.css";

import { getMovie , getMovieGenres, getPoster, getMovieReviews, getUser} from '../http/dbAPI';

const Review = ({review, ...props}) => {

    const [author, setAuthor] = useState()
    const [movie, setMovie] = useState()

    useEffect(()=>{
        async function loadAuthorsMovies(){
            let aut = await getUser(review.userId)
            console.log(aut)
            let mov = await getMovie(review.movieId)
            setAuthor(aut)
            setMovie(mov)
        }
        loadAuthorsMovies()
    },[])

    return(
        <div className = {classes.reviewBlock} style={{width: '950px', marginBottom: '30px'}}>
            <span className = {classes.reviewRate} style={{left: '910px'}}>{review.rate} ★</span>
            <h3>
                {author && author.email}:<h3>{movie && movie.name}</h3>
            </h3>
            <span className = {classes.reviewsDate}>{review.date.substring(0,10)}</span>
            <textarea readonly draggable="false" className = {classes.reviewText} style={{width: '940px', height: '100px'}}>{review.text}</textarea> 
        </div>
    )
}

export default Review