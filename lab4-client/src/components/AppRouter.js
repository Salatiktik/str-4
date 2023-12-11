import React, {useContext} from 'react';
import { Route, Navigate, Router, Routes} from 'react-router-dom'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Home from '../pages/Home';
import Movies from '../pages/Movies'
import Auth from '../pages/Auth';
import Movie from '../pages/Movie';
import Admin from '../pages/Admin';

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    console.log(user)
    return (
        <Routes>
            {user.isAuth?
            (
                <Route path='/admin' element={<Admin/>}/>
            ):
            (
                <Route />
            )
            }
            <Route path='/' element={<Home/>}/>
            <Route path='/movies' element={<Movies/>}/>
            <Route path='/movie/:id' element={<Movie/>}/>
            <Route path='/login' element={<Auth/>}/>
            <Route path='/reg' element={<Auth/>}/>
        </Routes>
    );
});

export default AppRouter;