var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://<dbuser>:<dbpassword>@mlab.com:xxx');

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});
var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

model.exports = function (app) {
    app.get('/todo', function (req, res) {
        // get data from mongodb and pass it to view
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', {
                todos: data
            });
        })

    });
    app.post('/todo', urlencodedParser, function (req, res) {
        // get data from the view and add it to mongodb
        var newTodo = Todo(req.bady).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item', function (req, res) {
        // delet the requested item from mongodb
        Todo.find({
            item: req.params.item.replace(/\-/g, " ")
        }).remove(function (err.data) {
            if (err
                throw err;)
                res.json(data);
        });
    });
};
