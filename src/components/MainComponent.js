import React, { Component } from "react"
import Login from './LoginComponent'
import Register from './RegisterComponent'
import Todo from './TodoComponent'
import Header from './HeaderComponent'
import Logout from './LogoutComponent'
import Footer from './FooterComponent'
import { Switch, Route, BrowserRouter} from 'react-router-dom'

class Main extends Component {

    constructor(props) {
      super(props);
      console.log(props);
      this.state = {
          isLogin : false
      }
    }

    authenticator = (val) => {
        this.setState({
            isLogin: val
        })
    }

    render(){
        return(
            <BrowserRouter> 
                <Header isLogin={this.state.isLogin}/>
                    <Switch>
                        <Route path="/login" component={ ()=><Login authenticator={this.authenticator}/> } />
                        <Route path="/register" component={ Register } />
                        <Route path="/todos" component={ Todo } />
                        <Route path="/logout" component={ ()=><Logout authenticator={this.authenticator}/> } />
                        <Route path="/" component={ ()=><Login authenticator={this.authenticator}/> } />
                    </Switch>
                <Footer />
            </BrowserRouter>
        );
    }
    
}

export default Main;
  