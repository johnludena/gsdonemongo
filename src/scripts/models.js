import React from 'react'
import Backbone from 'backbone'

export const TodoModel = Backbone.Model.extend({ 
    url: '/api/todos'
})

export const TodoCollection = Backbone.Collection.extend({
	model: TodoModel,
	url: '/api/todos' 
})
