import React, { Component } from "react";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem }  from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { isAuthenticated} from  '../shared/checkAuth'
import { baseUrl } from '../shared/baseUrl';

class Header extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }

      handleLogout = () => {
        return fetch(baseUrl + "users/logout", {
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
        .then((response) => { localStorage.removeItem("loggedIn")
                               })
        .catch((error)=>console.log("Post Todo : ", error.message))
    }

    updateLogin = () => {
        this.props.authenticator(false);
    }

    render(){
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}></NavbarToggler>
                        <NavbarBrand className="mr-auto" href="/">
                            TODO App
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            
                                { !isAuthenticated() ? 
                                    <Nav navbar className="ml-auto">
                                        <NavItem>
                                            <NavLink className="nav-link" to="/login">
                                                <span className="fa fa-home fa-lg"></span>Login
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to='/register'>
                                                <span className="fa fa-info fa-lg"></span> Register
                                                </NavLink>
                                        </NavItem>
                                    </Nav>
                                        : 
                                    <Nav className="ml-auto" navbar>    
                                        <NavItem>
                                            <NavLink className="nav-link"  to="" >
                                                <span className="fa fa-user fa-lg"></span>Hey! { JSON.parse(localStorage.getItem("user")).name }
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link"  to="logout" >
                                                <span className="fa fa-info fa-lg"></span> LogOut
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                }
                        </Collapse>
                    </div>  
                </Navbar>
            </React.Fragment> 
        );
    }
}

export default Header;