import React, { Component } from "react"
import { ListGroup, ListGroupItem, Button, Input } from 'reactstrap';
import { fetchTodos, updateStatus, removeTodo, postTodo } from '../redux/ActionCreators';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    console.log(state)
    return{
      Todos: state.Todos
    }
}

const mapDispatchToProps = dispatch => ({
    fetchTodos: () => { dispatch(fetchTodos())},
    updateStatus: (id, status) => {dispatch(updateStatus(id, status))},
    removeTodo: (id) => {dispatch(removeTodo(id))},
    postTodo : (task, status) => {dispatch(postTodo(task, status))}
})

function TodoList ({todo, handleStatus, removeTodo}){
    return (
            todo.status ? 
                <ListGroupItem>
                    <div className="row">
                        <div className="col-md-3 ml-auto text-right"><Button color="white" onClick={ ()=>{handleStatus(todo._id, !todo.status)} } ><span className="fa fa-check-square-o"></span></Button></div>
                        <div className="col-md-4 o text-center"><h5 className="crossed-line">{todo.task}</h5></div>
                        <div className="col-md-3 mr-auto"><Button color="white" onClick={ ()=>{removeTodo(todo._id)} } ><span className="fa fa-trash-o"></span></Button></div>
                    </div>                    
                </ListGroupItem>
                : 
                <ListGroupItem>
                    <div className="row">
                        <div className="col-md-3 ml-auto text-right"><Button color="white" onClick={ ()=>{handleStatus(todo._id, !todo.status)} } ><span className="fa fa-square-o"></span></Button></div>
                        <div className="col-md-4 o text-center"><h5 className="crossed-line">{todo.task}</h5></div>
                        <div className="col-md-3 mr-auto"><Button color="white" onClick={ ()=>{removeTodo(todo._id)} } ><span className="fa fa-trash-o"></span></Button></div>
                    </div>   
                </ListGroupItem>          
            
    )
}

class Todo extends Component{
    constructor(props){
        super(props);
        this.state={
            task: ""
        }
    }

    componentWillMount(){
        this.props.fetchTodos();
    }

    handleStatus = (id, status) => {
        this.props.updateStatus(id, status);
    }
    
    handleInputKey = (event) => {
        if(event.key === "Enter"){

            this.props.postTodo(this.state.task, false);
            this.setState({
                task: ""
            })
        }
    }

    handleInputChange = (event) => {
        console.log(event.target.value);
        this.setState({
            task: event.target.value
        })
    }

    render(){
        console.log("in Component");
        console.log(this.props);
        if(this.props.Todos.isLoading){
            return(
                <div>
                    <h4>Loading Todos List</h4>
                </div>
            )
        }
        else
        if(this.props.Todos.errMess){
            return(
                <div>
                    <h4>Error {this.props.Todos.errMess}</h4>
                </div>
            )
        }
        else{
            const todoList = this.props.Todos.todos.map((todo, idx)=>{
                return <TodoList todo={todo} handleStatus={this.handleStatus} removeTodo={this.props.removeTodo} key={idx} />
            });
            return (
                <div>
                    <div className="row input-handler">
                        <div className="col-md-1 ml-auto text-right"><i class="fa fa-pencil-square" aria-hidden="true"></i></div>
                        <div className="col-md-4 mr-auto">
                            <Input type="text" placeholder="TODO" value={this.state.task} name="task"
                                onKeyUp={this.handleInputKey}
                                onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <ListGroup>
                        {todoList}
                    </ListGroup>
                </div>                
            )
        }
    }
}
    
export default connect(mapStateToProps,mapDispatchToProps)(Todo);