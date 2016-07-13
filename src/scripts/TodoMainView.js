import React from 'react'
import Backbone from 'backbone'
import {TodoModel} from './models'


const TodoMainView = React.createClass({ 
    getInitialState: function(){ 
        return{
            todoColl: this.props.todoColl
        }
    },
    
    componentWillMount: function(){
        this.props.todoColl.on('sync', () => { 
            this.setState({
                todoColl: this.state.todoColl
               
            })
        })
        Backbone.Events.on('addTodo', (payload) => {
            this.state.todoColl.add({
                todo: payload
            })
            console.log('payload>>>', payload)
            console.log('collection state is now>>>', this.state.todoColl)
        })
    },

    render: function() { 
        return (
            <div id="inner-container">
                <TodoAdd _addTodoFunc={this._addTodo} />
                <TodoList todoColl={this.state.todoColl} />
            </div>
            )
    }
})

const TodoAdd = React.createClass({

    _handleTodoAdd: function(e) {
        if (e.keyCode === 13) {
            var value = e.target.value
            Backbone.Events.trigger('addTodo', value)
            
            // Create new todo from Backbone model and pass value in body
            var newTodo = new TodoModel({
                todo: value
            })

            // Save new todo to database
            newTodo.save()

            e.target.value = ""

        }
    },

    render: function() {
        return (
            <input id="user-input" placeholder="Enter your task" onKeyDown={this._handleTodoAdd} />
            )
    }
})

const TodoList = React.createClass({

    _getTodoComponent: function(todoColl) {
        return todoColl.map((mod,i) => <SingleTodo key={i} todoModel={mod} />) 
    },

    render: function() {
        return (
            <div id="todo-list">
                {this._getTodoComponent(this.props.todoColl)} 
            </div>
            )
    }
})

const SingleTodo = React.createClass({

   getInitialState: function() {
        return ({
            class: 'undone'
        })
   },

   _markComplete: function(){
        if (this.state.class === "undone") {
            this.setState({class:'done'})
        }
        else {
            this.setState({class:'undone'})
        }
   },

    // _destroyTodo: function() {
    //     this.props.todoModel.destroy() 
    // },

    render: function() {

        return (
            
                <div className={this.state.class}>
                    
                    {/*<button onClick={this._destroyTodo}>X</button>*/}
                    <input className="todo-check" type="checkbox" onClick={this._markComplete} />
                    <span className="todo">{this.props.todoModel.get('name')}</span>
                    
                </div>
            )
    }
})


export default TodoMainView 