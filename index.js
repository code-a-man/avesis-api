const axios = require('axios');
const cheerio = require('cheerio');

module.exports.getDocuments = async function({ university, teacher, limit = Infinity, html = false }) {
	if (limit <= 0) return 'Limit can\'t be below 1!';
	const url = `https://avesis.${university}.edu.tr/${teacher}/dokumanlar`;
	const list = [];
	const { data } = await axios.get(url).catch(err => err);
	if (!data) return `Couldn't reach ${url} check the url!`;
	const $ = cheerio.load(data);
	const imgSuffix = $('#header > div > div > div.logo-wrapper > div > a > img').attr('src');
	const teacherObject = {
		name : $('#header > div > div > div.logo-wrapper > div > h1').text().trim(),
		img : `https://avesis.${university}.edu.tr${imgSuffix}`,
	};
	$('div[class="ac-item"]').each(function(i, elem) {
		const head = $(elem).find('div.item-head > div');
		const body = $(elem).find('div.item-body');
		const button = body.find('a[class="btn btn-warning btn-sm"]');
		const locked = $(elem).find('div.item-body > a.btn.btn-warning.btn-sm > span > i').hasClass('fa fa-lock');
		// ? Remove buttons from html
		$(elem).find('a').each(function() {
			if (!$(this).hasClass('btn btn-warning btn-sm')) return $(this).replaceWith(`\n${$(this)}`);
			$(this).replaceWith('');
		});
		$(elem).find('img').each(function() { $(this).replaceWith('');	});
		const object = {
			title : head.find('div.col-md-8.col-xs-3 > span').text().trim(),
			type: head.find('div.col-md-2.col-xs-4 > span').text().trim(),
			date: head.find('div.col-md-2.col-xs-5 > span').text().trim(),
			description: html ? body.html().trim().replace(/\s+/g, ' ') : body.text().trim(),
		};
		if (button) {
			object.link = `https://avesis.${university}.edu.tr${button.attr('href')}`;
			object.filename = button.text().replace(/\n/g, '').trim();
			object.fileExt = object.filename.split('.').pop();
			object.locked = locked;
		}
		list.push(object);
		// ? cheerio .each() loop breaks with "return false;"
		if (list.length === limit) return false;
	});
	return { teacher: teacherObject, list };
};

