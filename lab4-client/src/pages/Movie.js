import React, {useContext, useEffect, useState} from 'react';
import {NavLink, useLocation, useHistory, useParams} from "react-router-dom";
import Container from '../components/Containers';
import {login, registration} from "../http/userAPI";
import classes from '../components/components.module.css';
import { observer } from 'mobx-react-lite';
import {Context} from "../index";
import { getMovie , getMovieGenres, getPoster, getMovieReviews, sendReview} from '../http/dbAPI';
import Review from '../components/Review';
import Form from '../components/Form';

const Movie = observer(({params, ...props}) => {

    const {user} = useContext(Context)

    const [movieId, setId] = useState()
    const [image, setImage] = useState()
    const [movie, setMovie] = useState()
    const [genres, setGenres] = useState()
    const [reviews, setReviews] = useState()
    const [rate, setRate] = useState()
    const [text, setText] = useState()
    const {id} = useParams()

    const send = () => {
        if(rate && text)
        {
            sendReview(user.user.id, movie.id, rate, text)
        }
        else{
            alert('Enter all data')
        }
    }

    useEffect(()=>{
        setId(id)
    },[])

    useEffect(()=>{
        async function loadD(){
            if(movieId){
                let rev = await getMovieReviews(movieId)
                let mov = await getMovie(movieId)
                let gen = await getMovieGenres(movieId)
                setMovie(mov)
                setGenres(gen)
                setReviews(rev)
            }
        }
        loadD()
    },[movieId])

    useEffect(()=>{
        async function loadP(){
            if(movie){
                let img = await getPoster(movie.posterUrl)
                setImage(img)
            }
        }
        loadP()
    },[movie])

    return (
        <Container>
            <h1>{movie && movie.name}</h1>
            <div className = {classes.movieFirstBlock}>
                <img src = {image} className = {classes.moviePoster}/>
                <ul className = {classes.movieStats} type="square">
                    <li>
                        Country: {movie && movie.country}
                    </li>

                    <li>
                        Duration: {movie && movie.duration}
                    </li>
                    <li>
                        Genres: 
                        {genres && genres.map(genre=>
                            <span style={{fontSize: "10pt"}}>{genre.name}</span>
                        )}
                    </li>
                </ul>
                <p>
                    {movie && movie.rating}(IMDb) ★
                </p>

            </div>
            <h2>
                Reviews
            </h2>
            
            {user.isAuth?
            (
                <Form method = "post" className = {classes.reviewBlock} style={{width: '950px', marginBottom: '30px', backgroundColor:'#2a62ab'}}>
                    <h3>
                    Your review
                    </h3>
                    <br/>
                    Rating
                    <input type="range" max="5" min="1" id="rating" name="rating" list="ratings" title="Rating" onChange={e=>setRate(e.target.value)}/>
                    <datalist id="ratings">
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                        <option value="5"></option>
                    </datalist>
                    <br/>
                    <br/>
                    <br/>
                    <input name = "text" type="text" draggable="false" className = {classes.reviewText} style={{width: '940px', height: '100px'}} onChange={e=>setText(e.target.value)}/>
                    <button onClick={send}>Submit</button>
                </Form>
            ):
                <form method = "post"className = {classes.reviewBlock} style={{width: '950px', marginBottom: '30px', backgroundColor:'#2a62ab'}}>
                    <h3>
                        To make review you have to login or create new profile
                    </h3>
                </form>
            }

            {reviews && reviews.map(review=>
                <Review review={review}/>                
            )}
        </Container>
    );
});

export default Movie;
