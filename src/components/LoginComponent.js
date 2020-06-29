import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom'
import { baseUrl } from '../shared/baseUrl';
import { isAuthenticated} from  '../shared/checkAuth'

class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            error : ""
        }
        this.handleInputChange = this.handleInputChange.bind();
        this.handleSubmit = this.handleSubmit.bind();
    }

    handleInputChange = (event) => {
    
        this.setState({
          [event.target.name]: event.target.value
        });        
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
        console.log("current state is: "+JSON.stringify(this.state));
        alert("current state is: "+JSON.stringify(this.state));
        // event.preventDefault();
        const _this = this;

            const login = {
                email: this.state.email,
                password: this.state.password
            }
            
            return fetch(baseUrl + "users/login", {
                method: "POST",
                body: JSON.stringify(login),
                withCredentials: true,                    
                credentials: 'same-origin', // credentials moved to here fixed the issue
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Cache': 'no-cache'
                }
            })
            .then(response => { 
                if(response.ok){
                    return response;
                }
                else{
                    // response.status means error code (300, 400, 404) samjhe :)
                    var error = new Error("Error " + response.status + ": " + response.statusText);
                    console.log(response);
                    console.log(error.response);
                    error.response = response;
                    throw error;            
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then((response) => { localStorage.setItem("loggedIn", "true");
                                    _this.setState({error : ""})
                                 })
            .catch((error)=>{ console.log("Post Todo : ", error.message);
                                _this.setState({..._this.state, error : error.message})
                            })
    }

    render(){
        if(isAuthenticated()){
            this.props.authenticator(isAuthenticated());
            return <Redirect to="/todos" />
        }
        return(
            <Form onSubmit={this.handleSubmit}>
                <h4 class="alert alert-danger">{this.state.error}</h4>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="email" />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="password" />
                </FormGroup>
                <FormGroup check row>
                    <Button>Submit</Button>
                </FormGroup>
            </Form>
        );
    }
}

export default Login

