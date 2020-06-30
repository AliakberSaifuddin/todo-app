import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom'
import { baseUrl } from '../shared/baseUrl';
import { isAuthenticated} from  '../shared/checkAuth'

class Register extends Component{

    constructor(props){
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            error : "",
            successfull: false
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
    //    alert("current state is: "+JSON.stringify(this.state));
        // event.preventDefault();
        const _this = this;

            const Register = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
            
            return fetch(baseUrl + "users/register", {
                method: "POST",
                body: JSON.stringify(Register),
                headers: {
                    "Content-Type": "application/json"
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
            .then((response) => { alert("Registration Successfull") 
                                  _this.setState({..._this.state, successfull : true})})
            .catch((error)=>{ console.log("Post Todo : ", error.message);
                                _this.setState({..._this.state, error : error.message})
                            })
    }

    render(){
        if(isAuthenticated()){
            return <Redirect to="/todos" />
        }
        if(this.state.successfull){
            return <Redirect to="/login" />
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 ml-auto mr-auto">
                        <h4>Register</h4>
                        <Form onSubmit={this.handleSubmit}>
                            {this.state.error ? <h4 class="alert alert-danger">{this.state.error}</h4> : <div></div>}
                            <FormGroup>
                                <Label for="name">Email</Label>
                                <Input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange} placeholder="name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handleInputChange} placeholder="email" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleInputChange} placeholder="password" />
                            </FormGroup>
                            <FormGroup check row>
                                <Button color="success">Submit</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register

