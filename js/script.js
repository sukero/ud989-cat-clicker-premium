$(() => {

	let model = {
		currentCat: null,
		adminStat: false,
		add(obj) {
			this.data.push(obj);
		},
		data: [
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
			]
	};

	let octopus = {
		getAllCats() {
			return model.data;
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
		},
		addCat(newCat) {
			model.add(newCat);
			viewOfList.render();
		},
		changeAdminStat() {
			model.adminStat = !model.adminStat;
		},
		init() {
			// set the current cat to the first cat
			model.currentCat = model.data[0];

			// initialize the views
			viewOfList.init();
			viewOfDisplay.init();
			viewOfAdmin.init();
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
			this.catslist.html('');

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

	let viewOfAdmin = {
		init() {
			// pointers
			this.adminBtn = $('#adminBtn');
			this.adminForm = $('#adminForm');
			this.saveBtn = $('#save');

			// hide the form at first
			this.adminForm.hide();

			// click the admin button, show the form
			this.adminBtn.on('click', () => {
				this.adminForm.toggle();
				octopus.changeAdminStat();
			});

			// click the save button, add new cat to the model
			this.adminForm.submit((e) => {

				e.preventDefault();

				this.nameVal = $('#name').val();
				this.srcVal = $('#src').val();
				this.hitsVal = $('#hits').val();

				let newCat = {
					name: this.nameVal,
					src: this.srcVal,
					hits: this.hitsVal
				};

				octopus.addCat(newCat);


				this.nameVal = $('#name').val('');
				this.srcVal = $('#src').val('');
				this.hitsVal = $('#hits').val('');
			});
		}
	}

	octopus.init();

});

