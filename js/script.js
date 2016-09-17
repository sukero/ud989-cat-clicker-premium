$(() => {

	let model = {
		addHits(currCatName) {
			for (let elem of this.data()) {
				if (elem.name === currCatName) {
					elem.hits++;
					console.log(elem);
				}
			}
		},
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
		getAllCats() {
			return model.data();
		},
		getCatDetail(key, refer, get) {
			for (let elem of octopus.getAllCats()) {
				if (elem[key] === refer) {
					return elem[get];
				}
			}
		},
		addCatHits(currCatName) {
			model.addHits(currCatName);
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
			let currCatSrc = octopus.getAllCats()[0].src;
			$('#showarea .catpic').attr('src', currCatSrc);
			viewOfDisplay.render();
			viewOfDisplay.showHits();
		},
		render() {

			$('.cat-btn').on('click', (e) => {
				let catName = $(e.target).text();
				let currCatSrc = octopus.getCatDetail('name', catName, 'src');
				$('#showarea .catpic').attr('src', currCatSrc);
			});

		},
		showHits() {
			this.counterShow = $('#counterShow');

			this.counterShow.text(0);

			$('.cat-btn').on('click', (e) => {
				let catName = $(e.target).text();

				octopus.addCatHits(catName);

				let currCatHits = octopus.getCatDetail('name', catName, 'hits');

				this.counterShow.text(currCatHits);

				// test
				for (let elem of model.data()) {
					console.log(elem.hits);
				}
			});
		}
	};

	octopus.init();

});

