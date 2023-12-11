import React from "react";
import classes from "./components.module.css";


const Input = ({type, placeholder="", onChange, value, ...props}) => {
    return(
        <input name={props.name} className = {classes.input} type={type} placeholder={placeholder} onChange={onChange} value={value} />
    )
}

export default Input