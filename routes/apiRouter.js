let Router = require('express').Router;
const apiRouter = Router()

let Todo = require('../db/schema.js').Todo

apiRouter.get('/todos', function(request, response){
  Todo.find({}, function(err, records){
      if(err) {
        console.log(err)
        response.json({
          error: err
        })
      }
      else {
        response.json(records)
      }
      
  })
})

apiRouter.post('/todos', function(request,response){
  let newTodo = new Todo(request.body)
  newTodo.save(function(err){
    // If error exits, console log it and send it to client
    if (err) {
      console.log(err)
      response.send(err)
    }

    // Else, send response with newRecord
    else {
      response.json(newTodo)
    }
    
  })
})


// apiRouter.get('/todos',function(request,response) {
//   //first argument gives the criteria (WHICH msgs do i want)
//   Msg.find({},function(err,records) {
//     response.json(records)
//   })
// })  

// apiRouter.post('/messages',function(request,response) {
//   let newRecord = new Msg(request.body)
//   newRecord.save(function(err) {
//     if (err) {
//       console.log(err)
//       response.send(err)
//     }
//     else {
//       response.json(newRecord)
//     }
//   })
// })

module.exports = apiRouter