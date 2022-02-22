const axios = require("axios")
const cheerio = require("cheerio")

module.exports.getAvesis = async function (university, teacher) {
    const url = `https://avesis.${university}.edu.tr/${teacher}/dokumanlar`
	const list = []
    const { data } = await axios.get(url).catch(err => err);
	if (!data) return `Couldn't reach ${url} check the url!`;
    const $ = cheerio.load(data)
    $('div[class="ac-item"]').each(function(i, elem){
		const head =  $(elem).find('div.item-head > div')
		const body =  $(elem).find('div.item-body')
		const linkSuffix = body.find('a.btn.btn-warning.btn-sm').attr('href')
        list.push({
			title : head.find('div.col-md-8.col-xs-3 > span').text().trim(),
			type: head.find('div.col-md-2.col-xs-4 > span').text().trim(),
			date: head.find('div.col-md-2.col-xs-5 > span').text().trim(),
			description: body.text().trim(),
			link: `https://avesis.${university}.edu.tr${linkSuffix}`,
		})
    });
	return list
}

