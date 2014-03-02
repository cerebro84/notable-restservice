var restify = require('restify');
var mongojs = require('mongojs');

var serverAddress = '127.0.0.1';
var serverPort = '8080';

var restServer = restify.createServer({
	name : "noteAble"
});

restServer.use(restify.queryParser());
restServer.use(restify.bodyParser());
restServer.use(restify.CORS());

var connection_string = '127.0.0.1:27017/noteAble'
var db = mongojs(connection_string, ['noteAble']);
var todos = db.collection('todos');

var PATH = '/users/';
restServer.get({path : PATH+':userName/todos/', version:'0.0.1'}, findUserTodos);
restServer.get({path : PATH+':userName/todos/:todoId', version:'0.0.1'}, findUserTodo);
restServer.post({path : PATH+':userName/todos/', version:'0.0.1'}, postNewUserTodo);
restServer.del({path : PATH+':userName/todos/:todoId', version:'0.0.1'}, deleteUserTodo);
restServer.del({path : PATH+':userName/todos/', version:'0.0.1'}, deleteAllUserTodos);

function deleteUserTodo(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    todos.removeOne({_id:mongojs.ObjectId(req.params.todoId)} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(204);
            return next();      
        } else{
            return next(err);
        }
    })
}

function deleteAllUserTodos(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    todos.remove({userName: req.params.userName} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(204);
            return next();      
        } else{
            return next(err);
        }
    })
}

function postNewUserTodo(req , res , next){
    var todo = {};
    todo.title = req.params.title;
    todo.content = req.params.content;
    todo.location = req.params.location;
    todo.userName = req.params.userName;
    todo.postedOn = new Date();
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    todos.save(todo , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(201 , todo);
            return next();
        }else{
            return next(err);
        }
    });
}
 

function findUserTodos(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    todos.find({userName:req.params.userName}).limit(20).sort({postedOn : -1} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(200 , success);
            return next();
        }else{
            return next(err);
        }
 
    });
}

function findUserTodo(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    todos.findOne({_id:mongojs.ObjectId(req.params.todoId)} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(200 , success);
            return next();
        }
        return next(err);
    })
}

restServer.listen(serverPort, serverAddress, function() {
	console.log('%s in ascolto su %s', restServer.name, restServer.url);
});