import React from "react";
import { Redirect} from 'react-router-dom'

export default (props) => {
    
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    props.authenticator(false)
    return(
        <Redirect to="/" />
    );
}