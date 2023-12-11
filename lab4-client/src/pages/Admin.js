import React, {useContext, useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import Container from '../components/Containers';
import { Context } from '..';
import AdminHeader from '../components/AdminHeader';
import { getAdminData, getMovieGenres } from '../http/dbAPI';
import { NavLink } from 'react-router-dom';
import AdminMovie from '../adminSubpages/AdminMovie';
import AdminUser from '../adminSubpages/AdminUser';
import AdminReview from '../adminSubpages/AdminReview';
import AdminGenre from '../adminSubpages/AdminGenre';
import Button from '../components/Button';

const Admin =observer(() => {

    const [model, setModel] = useState('movies')
    const [objects, setObjects] = useState()
    const [renderObjects, setRender] = useState (false)
    const [dialogContent, setDialog] = useState ()

    const [movies, setMovies] = useState()
    const [users, setUsers] = useState()
    const [genres, setGenres] = useState()

    async function loadData(){
        let data = await getAdminData(model)
        let users = await getAdminData('users')
        let movies = await getAdminData('movies')
        let genres = await getAdminData('genres')
        setMovies(movies)
        setGenres(genres)
        setUsers(users)
        setObjects(data)
    }

    useEffect(()=>{
        document.getElementById('dialog').close()
        refresh();

    },[model])

    useEffect(()=>{
        setRender(true)
    }, [objects])

    const click = (type) => {
        setModel(type);
    }

    const refresh = async () =>{
        document.getElementById('dialog').close()
        setRender(false)
        await loadData();    
    }

    const createNewEmpty = ()=>{
        let object={}
        if(model=='movies'){
            setDialog(<AdminMovie object={object} refresh={refresh} genreList={genres} mode='create'/>)
        }
        else if(model=='users'){
            setDialog(<AdminUser object={object} refresh={refresh} mode='create'/>)
        }
        else if(model=='reviews'){
            setDialog(<AdminReview object={object} refresh={refresh} users={users} movies={movies} mode='create'/>)
        }
        else{
            setDialog(<AdminGenre object={object} refresh={refresh}  mode='create'/>)
        }
        document.getElementById('dialog').show()
    }

    return (
        <Container>
            <AdminHeader onclick={click}/>
            <h1>Admin panel</h1>
            <dialog id='dialog'>{dialogContent}<button onClick={()=>{document.getElementById('dialog').close()}}>Back</button></dialog>
            <Button onClick={createNewEmpty}>Create new {model}</Button>
            <div id='objectsSet'>
                {objects && renderObjects && objects.map(object=>{
                    if(model=='movies'){
                        return <AdminMovie genreList = {genres} object={object} refresh={refresh} />
                    }
                    else if(model=='users'){
                        return <AdminUser object={object} refresh={refresh} />
                    }
                    else if(model=='reviews'){
                        return <AdminReview object={object} users={users} movies={movies} refresh={refresh} />
                    }
                    else{
                        return <AdminGenre object={object} refresh={refresh} />
                    }
                })}

            </div>
        </Container>
    );
});

export default Admin;