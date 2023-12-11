import React, {useContext, useEffect, useState} from 'react';
import {NavLink, useLocation, useHistory} from "react-router-dom";
import Container from '../components/Containers';
import {login, registration} from "../http/userAPI";
import {Context} from "../index";
import { observer } from 'mobx-react-lite';
import { getMovies , getGenres, getFilteredMovies} from '../http/dbAPI';
import Movie from '../components/Movie';
import classes from '../components/components.module.css';
import Form from '../components/Form';
import Button from '../components/Button';
import Input from '../components/Input';

const Movies = observer(() => {

    const [movieList,setMovies] = useState()
    const [genreList, setGenres] = useState()
    const [rfrom, setRfrom] = useState(0)
    const [rto, setRto] = useState(10)
    var filterGenres = []

    const filter = async ()=>{
      let {movies} = await getFilteredMovies(filterGenres, rfrom, rto);
      setMovies(movies);
      clearFilter();
    }

    const reset = async ()=>{
      let {movies} = await getMovies();
      setMovies(movies);
      clearFilter();
    }

    const clearFilter = () => {
      let inputs = document.getElementsByName('genreCheck')
      for(var i=0;i< inputs.length ; i++){
        inputs[i].checked = false
      }
    }

    const checkPriceInput = (func, e, type)=>{
      console.log(e)

      let value = parseInt(e.target.value)

      if((value>10 && value != 10) || value<0 || (type=='to'?value<rfrom:value>rto)){
        document.getElementsByName(`r${type}`)[0].style.backgroundColor = 'red'
      }
      else
      {
        document.getElementsByName(`r${type}`)[0].style.backgroundColor = 'white'
      }

      func(value)
    }

    const changeGenreList = async (e)=>{
      if(!e.target.checked){
        filterGenres = filterGenres.filter(genre=>genre!=e.target.value)
      }
      else
      {
        filterGenres = [e.target.value, ...filterGenres]
      }

      console.log(filterGenres)
    }

    useEffect(()=>{
      async function loadData () {
        let {movies} =  await getMovies()
        let {genres} =  await getGenres()
        setMovies(movies)
        setGenres(genres)
      }
      loadData();
    },[])

    return (
      <Container>
        <div id='movieList' style={{flexDirection:'row',display:'flex'}}>
          <div style={{flexDirection:'column',display:'flex',margin:'0px 0px 0px 100px'}}>
            {movieList && movieList.map(movie => <Movie movie = {movie}/>)}
            </div>
        <Form>
          <div class="priceFilter">
              <span class="detailTextDark">Rating</span>
              <div class="inputBlock">
                  <span class="inputDescription">from:</span> 
                  <Input type="number" name="rfrom" id="filterInput" step = '0.01' value={rfrom} onChange={(e)=>{checkPriceInput(setRfrom, e, 'from')}}/>
              </div>
              <div class="inputBlock">
                  <span class="inputDescription">to:</span>
                  <Input type="number" name="rto" id="filterInput" step = '0.01' value={rto} onChange={(e)=>{checkPriceInput(setRto, e, 'to')}}/>
              </div>
          </div>
          <div class="formatFilter">
              <span class="detailTextDark">Genres</span>
              {genreList && genreList.map(genre =>
              <div class="inputBlock">
                <input type="checkbox" onChange={e=>changeGenreList(e)} value={genre.id} name='genreCheck'/>
                <span class="inputGenre">{genre.name}</span>
              </div>  
                
              )}
              
          </div>
          <div class="inputBlock">
              <Button id="filterButton" onClick={filter}>Filter</Button>
              <Button  id="filterButton" onClick={reset}>Reset</Button>
          </div>
      </Form>
        </div>
      </Container>  
      
    );
});

export default Movies;
