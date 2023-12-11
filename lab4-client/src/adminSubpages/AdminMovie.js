import React, { useEffect, useState } from "react";

import Button from "../components/Button";
import classes from "../components/components.module.css"
import ModelInput from "../components/ModelInput";
import { deleteMovie, createMovie, updateMovie, getMovieGenres, getPoster } from "../http/dbAPI";

const AdminMovie = ({object, refresh, mode, genreList, ...props}) => {

    const [name, setName] = useState()
    const [country, setCountry] = useState()
    const [duration, setDuration] = useState()
    const [poster, setPoster] = useState()
    const [rate, setRate] = useState()
    const [genres, setGenres] = useState()
    const [render, setRender] = useState(false)


    const deleteM = () => {
        deleteMovie(object.id)
        alert('Movie was deleted')
        refresh()
    }

    const create = async () => {

        if(name == undefined||country==undefined||duration==undefined||poster==undefined||rate==undefined){
             alert('Enter all values')
             console.log(name, country, duration, poster, rate, genres)
        }
        else{
            await createMovie(name, country, duration, poster, rate, genres)
            alert('Movie was created')
            refresh()
        }
    }

    const updateGenres = (e) =>{
        let ids = []
        console.log(Array(...e.target.selectedOptions))
        Array(...e.target.selectedOptions).map(option => ids.push(option.value))
        setGenres(ids)
        console.log(ids)
    }

    const save = async  () => {
        console.log(genres)
        await updateMovie(object.id, name, country, duration, poster, rate, genres)
        alert('Movie was saved')
    }

    useEffect(()=>{
        async function setData(){
            setName(object.name)
            setCountry(object.country)
            setRate(object.rating)
            setDuration(object.duration)
            let img = await getPoster(object.posterUrl)
            console.log(img)
            setPoster(img)
            if(mode!='create'){
                let g = await getMovieGenres(object.id)
                let ids = []
                console.log(g)
                g.map(gu=>ids.push(gu.id))
                setGenres(ids)
            }
            else{
                setGenres([])
            }
        }
        setData();
        
    },[])

    useEffect(()=>{
        if(genres && genreList){
            setRender(true)
        }
    },[genres])

    return(
        <ModelInput>
            {object.id}
            <input type = 'text' value = {name} onChange={(e)=>setName(e.target.value)} placeholder="name"/>
            <input type = 'text' value = {country} onChange={(e)=>setCountry(e.target.value)} placeholder="country"/>
            <input type="file" name="myImage" accept="image/jpeg" onChange={(e)=>setPoster(e.target.files[0])} placeholder='poster'/>
            <input type = 'time' value = {duration} onChange={(e)=>setDuration(e.target.value)} placeholder="time"/>
            <input type = 'number' min='0' max='10' value = {rate} onChange={(e)=>setRate(e.target.value)} placeholder="rate"/>
            <select onChange={(e)=>{updateGenres(e)}} id='author' multiple>
            <option disabled value> -- select an options -- </option>
                {render && (genres||genres==[]) && genreList && genreList.map(genre=><option value={genre.id} selected={genres.includes(genre.id)}>{genre.name}</option>)}
            </select>
            {
                mode=='create'?(
                    <Button onClick={e => create(e)}>Create new</Button>
                ):
                (
                    <div style={{width:'350px'}}>
                        <Button onClick={e => save(e)}>Save</Button>
                        <Button onClick={e => deleteM(e)}>Delete</Button>

                    </div>
                    
                )
            }
        </ModelInput>
    )
}

export default AdminMovie