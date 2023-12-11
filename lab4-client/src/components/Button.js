import React from "react";
import classes from "./components.module.css"


const Button = ({children, onClick, ...props}) => {
    return(
        <button className={classes.button} onClick={onClick}> 
            {children}
        </button>
    )
}

export default Button