import React from "react";
import classes from "./components.module.css";


const ModelInput = ({children, ...props}) => {
    return(
        <div className={classes.modelInput}>
            {children}
        </div>
    )
}

export default ModelInput