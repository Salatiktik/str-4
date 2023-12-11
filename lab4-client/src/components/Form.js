import React from "react";
import classes from "./components.module.css"


const Form = ({children, method, type, ...props}) => {
    return(
        <form className={classes.form} method={method} onSubmit={(event)=>{event.preventDefault();}}> 
            {children}
        </form>
    )
}

export default Form