import React from "react";


class Row extends React.Component{
    render(){
        let {children} = this.props
        return(
            <div style={{flexDirection:"row", display:"flex"}}> 
                {children}
            </div>
        )
    }
}

Row.defaultProps = {
    children:'empty row'
}

export default Row