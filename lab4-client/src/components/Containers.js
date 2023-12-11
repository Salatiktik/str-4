import {React, useContext} from "react";
import {Context} from "../index";
import classes from './components.module.css';


const Container = ({children, ...props}) => {
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    );
}
 
export default Container;