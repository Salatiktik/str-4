import {React, useContext} from "react";
import {Context} from "../index";
import classes from './components.module.css';
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Button from "./Button";

const Header = observer(() => {
    const {user} = useContext(Context)

    console.log(user)

    const logout = ()=>{
        localStorage.setItem('token','')
        user.setIsAuth(false)
        user.setUser({})
    }

    return (
        <div className={classes.header}>
            <nav className={classes.headerBlock}>
                <NavLink className={classes.link} to={"/"}>Home</NavLink>
                <NavLink className={classes.link} to={"/Movies"}>Movies</NavLink>
            </nav>
            
            {user.isAuth?(
                <nav className={classes.headerBlock}>
                    <div>
                        Hi, {user.email}
                    </div>
                    <button onClick={logout}>Logout</button>
                </nav>
            ):
            (
                <nav className={classes.headerBlock}>
                    <NavLink className={classes.link} to={"/login"}>Login</NavLink>
                    <NavLink className={classes.link} to={"/reg"}>Sign up</NavLink>
                </nav>
            )
            }
        </div>
    );
})
 
export default Header;