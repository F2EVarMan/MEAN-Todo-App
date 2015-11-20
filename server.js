var express = require("express");
var app = express();
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');



mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                    
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());




// define model =================
    var Todo = mongoose.model('Todo', {
        text : String
    });
//api

app.get('/api/todos',function(req,res){

  //查找 数据 得到全部todos
  Todo.find(function(err,todos){
    if(err){
      res.send(err);
    }else{
      res.json(todos);
    }
  })

})


//创建todo 并返回所有todo
app.post('/api/todos',function(req,res){

  Todo.create({
    text:req.body.text,
    done: false
  },function(err,todo){
    if(err){
      res.send(err);
    }

    Todo.find(function(err,todos){
      if(err){
        res.send(err);
      }else{
        res.json(todos)
      }
    })

  })
})

//删除 todo
app.delete('/api/todos/:todo_id',function(req,res){


  Todo.remove({
    _id:req.params.todo_id
  },function(err,todo){
    if(err){
      res.send(err)
    }

    Todo.find(function(err,todos){
      if(err){
        res.send(err)
      }else{
        res.json(todos)
      }
    })
  })

})




app.get("*",function(req,res){
  res.sendfile('./public/index.html')
})


app.listen(8888);
