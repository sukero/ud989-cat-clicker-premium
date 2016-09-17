$(() => {
	let $cat = $('.cat'),
		$catpic = $('.catpic'),
		$catshowPic = $('.cat-show .catpic'),
		$counterShow = $('#counterShow');

	let counter = 0;
	$counterShow.text(counter);


	// 给每只猫创建自己的计数器
	$catpic.attr('self-counter', 0);

	$cat.on('click', (e) => {

		// 更改图片
		$catshowPic.attr('src', e.target.src);

		// 更改自己的计数器
		let selfCounter = e.target.getAttribute('self-counter');
		selfCounter++;
		e.target.setAttribute('self-counter', selfCounter);

		// 更改大计数器
		$counterShow.text(e.target.getAttribute('self-counter'));
	});
});