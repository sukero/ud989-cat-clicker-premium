$(() => {

	let model = {
		currentCat: null,
		data() {
			return [
				{
					name: 'cat',
					src: 'img/cat1.jpg',
					hits: 0
				},
				{
					name: 'purr',
					src: 'img/cat2.jpg',
					hits: 0

				},
				{
					name: 'meow',
					src: 'img/cat3.jpg',
					hits: 0

				},
				{
					name: 'claws',
					src: 'img/cat4.jpg',
					hits: 0

				}
			];	
		}
	};

	let octopus = {
		init() {
			// set the current cat to the first cat
			model.currentCat = model.data()[0];

			// initialize the views
			viewOfList.init();
			viewOfDisplay.init();
		},
		getAllCats() {
			return model.data();
		},
		getCurrCat() {
			return model.currentCat;
		},
		setCurrCat(cat) {
			model.currentCat = cat;
		},
		addHits() {
			model.currentCat.hits++;
			viewOfDisplay.render();
		}
	};

	let viewOfList = {
		init() {
			this.catslist = $('#catslist');
			this.render();
		},
		render() {
			// get cats
			let cats = octopus.getAllCats();

			// empty the cat list

			// loop over the cats
			for (let cat of cats) {

				// make a list of buttons and set their text
				let btn = $('<button />');
				btn.text(cat.name);
				btn.addClass('cat-btn');

				// on click, setCurrentCat and render the ViewOfDisplay
				// use closure-in-a-loop
				btn.on('click', ((catCopy) => {
					return () => {
						octopus.setCurrCat(catCopy);
						viewOfDisplay.render();
					}
				})(cat));

				// add btns to the list
				btn.appendTo(this.catslist);
			}
		}
	};

	let viewOfDisplay = {
		init() {

			// store pointers
			this.catPicElem = $('#catpic');
			this.counterElem = $('#counter');
			this.catNameElem = $('#catname');

			// on click, add the current cat's hits
			this.catPicElem.on('click', () => {
				octopus.addHits();
			});

			viewOfDisplay.render();
		},
		render() {

			let currentCat = octopus.getCurrCat();
			this.counterElem.text(currentCat.hits);
			this.catNameElem.text(currentCat.name);
			this.catPicElem.attr('src', currentCat.src);

		}
	};

	octopus.init();

});

