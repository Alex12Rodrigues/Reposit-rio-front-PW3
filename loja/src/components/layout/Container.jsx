import React from "react";

import style from './Container.module.css'

const Container = (props) =>{

    return(
        <div >
            {props.children}
        </div>
    )
}

export default Container

