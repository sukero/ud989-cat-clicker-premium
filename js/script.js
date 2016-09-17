$(() => {

	let model = {
		data() {
			return [
				{
					name: 'cat',
					src: 'img/cat1.jpg'
				},
				{
					name: 'purr',
					src: 'img/cat2.jpg'
				},
				{
					name: 'meow',
					src: 'img/cat3.jpg'
				},
				{
					name: 'claws',
					src: 'img/cat4.jpg'
				}
			];	
		},
		catBeenChosen() { 
			$('.cat-btn').on('click', (event) => {
				let catName = event.target.text();
				for (let elem of model.data()) {
					if (elem.name === catName) {
						return elem.src;
					}
				}
			});
		}
	};

	let octopus = {
		getAllCats() {
			return model.data();
		},
		getCurrCat() {
			return model.catBeenChosen();
		},
		showCurrCatHits() {

		},
		init() {
			viewOfList.init();
			viewOfDisplay.init();
		}
	};

	let viewOfList = {
		init() {
			this.catslist = $('#catslist');
			let catsInfo = octopus.getAllCats();
			for (let catInfo of catsInfo) {
				let catBtns = $('<button />').text(catInfo.name).addClass('cat-btn');
				catBtns.appendTo(this.catslist);
			}
		}
	};

	let viewOfDisplay = {
		init() {
			let currCatSrc = octopus.getCurrCat();
			$('#showarea .catpic').attr('src', currCatSrc);
		}
	};

	octopus.init();

});

