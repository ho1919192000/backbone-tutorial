var log = console.log;

Backbone.on('event', function() {log('Handled Backbone event')})
Backbone.trigger('event');

/*on(), off(), and trigger()*/
var ourObject = {};

//Mixin -> Backbone.Events can give any object the ability to bind and trigger custom events.
_.extend(ourObject, Backbone.Events);
log(ourObject);

ourObject.on('dance', function(arg1, arg2) {
	log('We triggered ' + arg1 + ' and ' + arg2);
})

//Trigger the custom event
ourObject.trigger('dance', 'this', 'that');

//Compare with jQuery
$( document ).on( "myCustomEvent", {
    foo: "bar"
}, function( event, arg1, arg2 ) {
    console.log( event.data.foo ); // "bar" -> second par can be access from event.data
    console.log( arg1 );           // "bim"
    console.log( arg2 );           // "baz"
});
 
$( document ).trigger( "myCustomEvent", [ "bim", "baz" ] );// arg pass within an arry
log('');

/*Namespacing*/
ourObject = {};

//Mixin
_.extend(ourObject, Backbone.Events);

//Separate function
function dancing(msg1, msg2) { log('We started ' + msg1 +' and ' + msg2) };

// Add namespaced custom events
ourObject.on('dance:tap', dancing);
ourObject.on('dance:break', dancing);

// Trigger the custom events
ourObject.trigger('dance:tap', 'tap dancing' , 'Fun!');
ourObject.trigger('dance:break', 'break dancing', 'Cool!');
log('');
/*All event*/
ourObject = {};
_.extend(ourObject, Backbone.Events);
function dancing(msg1, msg2) {log('We started ' + msg1 +' and ' + msg2)};

ourObject.on('all', function(eventName, arg) {
	log('The name of the event passed was: ' + eventName + ' and arg: ' + arg);
})

// This time each event will be caught with a catch 'all' event listener
ourObject.trigger("dance:tap", "tap dancing. Yeah!");
ourObject.trigger("dance:break", "break dancing. Yeah!");
ourObject.trigger("dance", "break dancing. Yeah!");
log('');
/*Off Event*/
ourObject = {};
_.extend(ourObject, Backbone.Events);
function dancing(msg1, msg2) { log('We started ' + msg1 +' and ' + msg2) };

// Add namespaced custom events
ourObject.on('dance:tap', dancing);
ourObject.on('dance:break', dancing);

log('Before remove tap event:')
// Trigger the custom events
ourObject.trigger('dance:tap', 'tap dancing' , 'Fun!');
ourObject.trigger('dance:break', 'break dancing', 'Cool!');

// Removes event bound to the object
ourObject.off('dance:tap');

log('After remove tap event:')
ourObject.trigger('dance:tap', 'whatever', 'go home...');
ourObject.trigger('dance:break', 'keep dancing break', 'never sleep!');
log('');


/*Bound or Remove all Events at once*/
ourObject = {};
_.extend(ourObject, Backbone.Events);

function dancing (msg) { console.log("We are dancing. " + msg); }
function jumping (msg) { console.log("We are jumping. " + msg); }

// Add two listeners to the same event
ourObject.on('move', dancing);
ourObject.on('move', jumping);

// Trigger the events. Both listeners are called.
ourObject.trigger('move', 'Yeah!');

//Removes specified listener
ourObject.off('move', dancing);
log('After reomved specified listener:');
//Trigger the events again. One listener left
ourObject.trigger('move', 'Yeah, jump, jump');
log('');
/*Trigger Event*/
ourObject = {};
_.extend(ourObject, Backbone.Events);

function doAction(action, duration) {
	log('We are ' + action + ' for ' + duration);
}

//Add event listeners
ourObject.on('dance', doAction);
ourObject.on('jump', doAction);
ourObject.on('skip', doAction);

//Passing multiple arguments to single event
ourObject.trigger('dance', 'dancing', '5 minutes');

//Passing multiple argument to mutiple events
ourObject.trigger('dance jump skip', 'on fire', '15 minutes');
log('');
/*listenTo() and stopListening()*/
let a = _.extend({}, Backbone.Events),
    b = _.extend({}, Backbone.Events),
    c = _.extend({}, Backbone.Events);

//add listeners to A for events on B and C
a.listenTo(b, 'anything', function(event){log('anything happened')});
a.listenTo(c, 'everything', function(event){log('everything happened')});

//trigger an event
b.trigger('anything');

//stop listening
a.stopListening();

//A does not receive these events
b.trigger('anything');
c.trigger('everything');
log('');

log('/*listenTo() vs on() and stopListening() vs off()*/');
/*listenTo() vs on() and stopListening() vs off()*/
let view = new Backbone.View();
b = _.extend({}, Backbone.Events);

view.listenTo(b, 'all', function(){ log(true) });
b.trigger('anything');

view.listenTo(b, 'all', function(){ log(false) });
view.remove();
b.trigger('anything');






























