import {React, useContext} from "react";
import {Context} from "../index";
import classes from './components.module.css';
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";

const AdminHeader = observer(({onclick, ...props}) => {

    return (
        <div className={classes.header}>
            <nav className={classes.headerBlock}>
                <button className={classes.ah} onClick={() => onclick('movies')}>Movies</button>
                <button className={classes.ah} onClick={() => onclick('users')}>Users</button>
                <button className={classes.ah} onClick={() => onclick('genres')}>Genres</button>
                <button className={classes.ah} onClick={() => onclick('reviews')}>Review</button>
            </nav>
        </div>
    );
})
 
export default AdminHeader;