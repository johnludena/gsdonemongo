import ReactDOM from 'react-dom'
import React from 'react'
import Backbone from 'backbone'
import TodoMainView from './TodoMainView'
import {TodoModel} from './models'
import {TodoCollection} from './models'


const app = function() {

    var todoColl = new TodoCollection()

    todoColl.fetch()

	ReactDOM.render(<TodoMainView todoColl={todoColl} />, document.querySelector('.container'))
}

app()