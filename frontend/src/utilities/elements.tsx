import React, {Fragment} from "react";

const nl2br = (text: string) => {
    return text.split('\n').map((item, key) => {
        return <Fragment key={key}>{item}<br/></Fragment>
    });
}

export {
    nl2br,
}