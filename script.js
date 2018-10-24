			let log = console.log;

			/*
			(Part 15) More Model Events and listenTo event

			1. clone(); => make a hard copy of an object

			2. hasChanged() => check a model is change or not

			3. changedAttributes() => display what has been changed

			4. previous() => check a previous value of a attr

			5. previousAttributes() => show all previous values of an Object 
			 */

			let Student = Backbone.Model.extend();

			let st1 = new Student({
				name: 'John',
				school: 'University of Denver',
				age: '19'
			});

			let st2 = st1.clone();

			let View = Backbone.View.extend({
				el: '#content',
				model: st2,
				template: _.template($('#each').html()),
				initialize: function() {
					this.render();
				},
				render: function() {
					this.$el.html(this.template(this.model.toJSON()));


					/*if (this.model.hasChanged()) {
						log('st2.hasChanged(): ' + st2.hasChanged());
						log(this.model.changedAttributes());
						log(`this.model.previous('name') => ` + this.model.previous('name'));
						log(`this.model.previous('age') => ` + this.model.previous('age'));
						log(`this.model.previousAttributes()`);
						log(this.model.previousAttributes());
					} else {
						log('Value not changed.');
					}*/

					this.listenTo(this.model, 'change', this.update);
				},
				update: function() {
					log('Something Change');
					this.$el.html(this.template(this.model.toJSON()));
				}
			});

			let view = new View();

			st2.set({
				name: 'Kelly',
				age: 10,
				team: 'US'
			});