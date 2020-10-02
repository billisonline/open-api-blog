import React from "react";
// @ts-ignore
import classes from './Spinner.module.css';

function Spinner () {
    return (

        <div style={{zoom: 0.25}} className={classes['lds-ring']}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Spinner;