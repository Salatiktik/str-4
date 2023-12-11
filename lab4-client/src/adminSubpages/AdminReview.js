import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import classes from "../components/components.module.css"
import ModelInput from "../components/ModelInput";
import { deleteReview, createReview, updateReview } from "../http/dbAPI";

const AdminReview = ({object, refresh, mode, movies, users, ...props}) => {

    const [text, setText] = useState()
    const [authorId, setAuthorId] = useState(users[0].id)
    const [movieId, setMovieId] = useState(movies[0].id)
    const [rate, setRate] = useState(1)
    const [date, setDate] = useState()
    const [render, setRender] = useState(false)


    const deleteR = () => {
        deleteReview(object.id)
        alert('Review was deleted')
        refresh()
    }

    const create = async () => {

        if(text == undefined||date==undefined){
             alert('Enter all values')
        }
        else{
            await createReview(text, rate, authorId, movieId, date)
            alert('Review was created')
            refresh()
        }
    }

    const saveR = async  () => {
        await updateReview(object.id, text, rate, authorId, movieId, date)
        alert('Review was saved')
    }

    useEffect(()=>{
        async function setData(){
            setText(object.text)
            setAuthorId(object.userId)
            setMovieId(object.movieId)
            setRate(object.rate)
            if(object.date)
            {
                setDate(object.date.substring(0,10))
            }
        }
        setData();
        setRender(true)
    },[])

    return(
        <ModelInput>
            {object.id}
            <input type='date' defaultValue={date} onChange={(e)=>{setDate(e.target.value)}} placeholder='date'/>
            <input type = 'text' value = {text} onChange={(e)=>setText(e.target.value)} placeholder="text"/>
            <select onChange={(e)=>{setRate(e.target.value)}}>
                <option value={1} selected={rate==1}>1</option>
                <option value={2} selected={rate==2}>2</option>
                <option value={3} selected={rate==3}>3</option>
                <option value={4} selected={rate==4}>4</option>
                <option value={5} selected={rate==5}>5</option>
            </select>
            <select onChange={(e)=>{setAuthorId(e.target.value)}} id='author'>
            <option disabled selected value> -- select an option -- </option>
                {render && users && users.map(user=><option value={user.id} selected={authorId==user.id}>{user.email}</option>)}
            </select>
            <select onChange={(e)=>{setMovieId(e.target.value)}}>
            <option disabled selected value> -- select an option -- </option>
                {render && movies && movies.map(movie=><option value={movie.id} selected={movieId==movie.id}>{movie.name}</option>)}
            </select>
            {
                mode=='create'?(
                    <Button onClick={e => create(e)}>Create new</Button>
                ):
                (
                    <div style={{width:'350px'}}>
                        <Button onClick={e => saveR(e)}>Save</Button>
                        <Button onClick={e => deleteR(e)}>Delete</Button>

                    </div>
                    
                )
            }
        </ModelInput>
    )
}

export default AdminReview