####This is my first attempt to build a rest service with Node.js using restify and MongoDB. The aim is to build a rest service for a todo application.

You can test todo creation with curl using:
```
curl -i -X POST -H "Content-Type: application/json" -d '{"title":"Deploy NoteAble to Openshift" , "description":"Dont forget to deploy this nodejs+restify project to Openshift" , "location":"My desktop"}' http://127.0.0.1:8080/users/cerebro84/todos
```

You can test massive deletion using:
```
curl -i -X DELETE  http://127.0.0.1:8080/users/cerebro84/todos
```



