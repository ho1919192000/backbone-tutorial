/*Backbone RESTful Persistence with Fetching models*/
let log = console.log;


let Todo = Backbone.Model.extend({
	defaults: {
		title:'',
		completed: false
	}
});

let TodosCollection = Backbone.Collection.extend({
	model: Todo,
	url: '/todos'
});

let todos = new TodosCollection();
todos.fetch();// sends HTTP GET to /todos

let todo2 = todos.get(2);
todo2.set('title', 'go fishing');
todo2.save();// sends HTTP PUT to /todos/2

todos.create({title: 'Try out code samples'});// sends HTTP POST to /todos and adds to collection

todo2.destory();// sends HTTP DELETE to /todos/2 and removes from collection

let todo = new Todo({title: 'Do Destiny 2 mission'});
log(todo.destory());// Calling destroy on a Model will return false if the model isNew:

/*Option*/
let todo3 = todos.get(3);
todo3.clear().set({title: 'Studying PHP', completed: false});
todo3.save();
/*Save partial using PATCH*/
todo3.save({title: 'Workout instead'}, {patch: true});
log(this.syncArgs.method);// 'patch'


